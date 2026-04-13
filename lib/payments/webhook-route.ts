import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { teamMembers } from '@/lib/db/schema';
import { getTeamByStripeCustomerId } from '@/lib/db/queries';
import { processBillingWebhookEvent } from '@/lib/family/billing';
import {
  getBillingPlanByPriceId,
  getBillingPlanByProductId,
  isRecurringPlanType,
} from '@/lib/payments/catalog';
import {
  normalizeBillingWebhookPayload,
  verifyBillingWebhookSignature,
} from '@/lib/payments/service';

type CreemWebhookEvent = {
  id?: string;
  eventType?: string;
  object?: Record<string, unknown>;
};

function asObject(value: unknown) {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : null;
}

function getObjectId(value: unknown) {
  const object = asObject(value);
  if (!object) {
    return typeof value === 'string' ? value : null;
  }

  return typeof object.id === 'string' ? object.id : null;
}

function getMetadata(value: unknown) {
  const object = asObject(value);
  const metadata = asObject(object?.metadata);
  return metadata || {};
}

function getProductId(value: Record<string, unknown>) {
  return getObjectId(value.product);
}

function getCustomerId(value: Record<string, unknown>) {
  return getObjectId(value.customer);
}

function getSubscriptionId(value: Record<string, unknown>) {
  return getObjectId(value.subscription) || getObjectId(value);
}

function getStatusFromEvent(
  eventType: string,
  value: Record<string, unknown>,
  priceId: string
) {
  const plan = getBillingPlanByPriceId(priceId);
  if (!plan || !isRecurringPlanType(plan.planType)) {
    return 'active';
  }

  const rawStatus = typeof value.status === 'string' ? value.status : null;
  if (rawStatus) {
    return rawStatus;
  }

  switch (eventType) {
    case 'subscription.trialing':
      return 'trialing';
    case 'subscription.canceled':
      return 'canceled';
    case 'subscription.expired':
      return 'expired';
    case 'subscription.paused':
      return 'paused';
    case 'subscription.scheduled_cancel':
      return 'scheduled_cancel';
    case 'subscription.past_due':
      return 'unpaid';
    default:
      return 'active';
  }
}

function getCurrentPeriodEndsAt(value: Record<string, unknown>) {
  const candidates = [value.currentPeriodEndDate, value.current_period_end_date];

  for (const candidate of candidates) {
    if (candidate instanceof Date) {
      return candidate.toISOString();
    }

    if (typeof candidate === 'string' && candidate) {
      return new Date(candidate).toISOString();
    }
  }

  return null;
}

function getUserIdFromMetadata(metadata: Record<string, unknown>) {
  const rawValue =
    metadata.userId || metadata.referenceId || metadata.internal_customer_id;
  const userId = Number(rawValue);
  return Number.isInteger(userId) && userId > 0 ? userId : null;
}

async function getTeamOwnerUserId(teamId: number) {
  const rows = await db
    .select({ userId: teamMembers.userId })
    .from(teamMembers)
    .where(eq(teamMembers.teamId, teamId))
    .limit(1);

  return rows[0]?.userId || null;
}

async function resolveUserId(
  metadata: Record<string, unknown>,
  customerId: string | null
) {
  const metadataUserId = getUserIdFromMetadata(metadata);
  if (metadataUserId) {
    return metadataUserId;
  }

  if (!customerId) {
    return null;
  }

  const team = await getTeamByStripeCustomerId(customerId);
  if (!team) {
    return null;
  }

  return getTeamOwnerUserId(team.id);
}

export async function handlePrimaryBillingWebhook(request: NextRequest) {
  if (
    process.env['FAMILY_EDU_DEMO_MODE'] === '1' ||
    !process.env.CREEM_WEBHOOK_SECRET
  ) {
    const payload = (await request.json().catch(() => null)) as
      | (CreemWebhookEvent & { userId?: number; priceId?: string })
      | null;
    const object = asObject(payload?.object) || {};
    const userId = Number(object.userId || payload?.userId);
    const priceId = String(object.priceId || payload?.priceId || '');

    if (!Number.isInteger(userId) || !getBillingPlanByPriceId(priceId)) {
      return NextResponse.json(
        { error: 'Demo webhook requires userId and a supported priceId.' },
        { status: 400 }
      );
    }

    const result = await processBillingWebhookEvent({
      source: 'demo',
      eventId: String(payload?.id || `demo_event_${Date.now()}`),
      eventType: String(payload?.eventType || 'checkout.completed'),
      payload: payload || {},
      userId,
      priceId,
      checkoutSessionId:
        typeof object.checkoutSessionId === 'string' ? object.checkoutSessionId : null,
      stripeCustomerId:
        typeof object.stripeCustomerId === 'string' ? object.stripeCustomerId : null,
      stripeSubscriptionId:
        typeof object.stripeSubscriptionId === 'string' ? object.stripeSubscriptionId : null,
      status: typeof object.status === 'string' ? object.status : 'active',
      currentPeriodEndsAt:
        typeof object.currentPeriodEndsAt === 'string' ? object.currentPeriodEndsAt : null,
    });

    return NextResponse.json({
      received: true,
      applied: result.applied,
      snapshot: result.snapshot,
    });
  }

  const payloadText = await request.text();
  const signature = request.headers.get('creem-signature');

  if (!verifyBillingWebhookSignature(payloadText, signature)) {
    return NextResponse.json({ error: 'Invalid billing signature.' }, { status: 401 });
  }

  let event: CreemWebhookEvent;

  try {
    event = JSON.parse(payloadText) as CreemWebhookEvent;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const eventType = String(event.eventType || '');
  const object = asObject(event.object);

  if (!eventType || !object) {
    return NextResponse.json({ error: 'Malformed billing webhook event.' }, { status: 400 });
  }

  try {
    const normalized = normalizeBillingWebhookPayload(event as Record<string, unknown>);
    const metadata = getMetadata(object);
    const productId = getProductId(object);
    const plan =
      getBillingPlanByPriceId(normalized.priceId || String(metadata.priceId || '')) ||
      getBillingPlanByProductId(productId);

    if (!plan) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const customerId = getCustomerId(object);
    const userId = await resolveUserId(metadata, customerId);

    if (!userId) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const subscriptionValue =
      eventType === 'checkout.completed' ? asObject(object.subscription) || object : object;

    const result = await processBillingWebhookEvent({
      source: 'creem',
      eventId: normalized.eventId,
      eventType: normalized.eventType,
      payload: event as Record<string, unknown>,
      userId,
      priceId: plan.priceId,
      checkoutSessionId: normalized.checkoutSessionId,
      stripeCustomerId: normalized.providerCustomerId || customerId,
      stripeSubscriptionId:
        normalized.providerSubscriptionId || getSubscriptionId(subscriptionValue),
      status: normalized.status || getStatusFromEvent(eventType, subscriptionValue, plan.priceId),
      currentPeriodEndsAt:
        normalized.currentPeriodEndsAt || getCurrentPeriodEndsAt(subscriptionValue),
    });

    return NextResponse.json({
      received: true,
      applied: result.applied,
      snapshot: result.snapshot,
    });
  } catch (error) {
    console.error('Primary billing webhook processing failed.', error);
    return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 500 });
  }
}
