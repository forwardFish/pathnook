import 'server-only';

import { and, desc, eq, inArray } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
  analysisRuns,
  billingEntitlements,
  billingEvents,
  billingProviderAccounts,
  billingWebhookEvents,
  reports,
  subscriptions,
  teamMembers,
  teams,
} from '@/lib/db/schema';
import { BILLING_PLANS, isRecurringPlanType, type BillingPlanType } from './catalog';

export type BillingSnapshot = {
  activePlanType: 'free' | BillingPlanType;
  planName: string | null;
  subscriptionStatus: string;
  reportCredits: number;
  unlockedReportIds: number[];
  accessibleReportIds: number[];
  lockedReportIds: number[];
  currentPeriodEndsAt: string | null;
  plans: typeof BILLING_PLANS;
  portalAvailable: boolean;
};

export const BILLING_COMPAT_READ_ORDER = [
  'billing_entitlements + billing_provider_accounts',
  'subscriptions + billing_events',
  'teams.stripeCustomerId / stripeSubscriptionId / stripeProductId / planName / subscriptionStatus',
] as const;

type BillingProjectionRow = {
  planType: string;
  status: string;
  reportCredits: number;
  unlockedReportIds: number[];
  currentPeriodEndsAt: Date | null;
  providerCustomerId: string | null;
};

type ProviderAccountProjection = {
  providerCustomerId: string | null;
};

function normalizeUnlockedReportIds(ids: number[]) {
  return Array.from(
    new Set(ids.filter((id) => Number.isInteger(id) && id > 0))
  ).sort((left, right) => right - left);
}

function getPlanName(planType: 'free' | BillingPlanType) {
  if (planType === 'free') {
    return null;
  }

  return BILLING_PLANS.find((plan) => plan.planType === planType)?.name || null;
}

function getRecurringPlanIdsForDb() {
  return BILLING_PLANS.filter((plan) => isRecurringPlanType(plan.planType)).map(
    (plan) => plan.planType
  );
}

function hasRecurringAccess(status: string) {
  return status === 'active' || status === 'trialing' || status === 'scheduled_cancel';
}

function hasRetainedHistoricalAccess(row: BillingProjectionRow) {
  return normalizeUnlockedReportIds(row.unlockedReportIds || []).length > 0;
}

function hasOneTimeAccess(row: BillingProjectionRow) {
  return row.reportCredits > 0 || hasRetainedHistoricalAccess(row) || row.status !== 'expired';
}

async function listUserReportIds(userId: number) {
  const rows = await db
    .select({
      reportId: reports.id,
      createdAt: reports.createdAt,
    })
    .from(reports)
    .innerJoin(analysisRuns, eq(reports.runId, analysisRuns.id))
    .where(eq(analysisRuns.userId, userId))
    .orderBy(desc(reports.createdAt));

  return rows.map((row) => row.reportId);
}

function buildFreeSnapshot(allReportIds: number[]): BillingSnapshot {
  return {
    activePlanType: 'free',
    planName: null,
    subscriptionStatus: 'free',
    reportCredits: 0,
    unlockedReportIds: [],
    accessibleReportIds: [],
    lockedReportIds: allReportIds,
    currentPeriodEndsAt: null,
    plans: BILLING_PLANS,
    portalAvailable: false,
  };
}

function getPortalAvailability(
  providerCustomerId: string | null,
  providerAccounts: ProviderAccountProjection[]
) {
  return (
    Boolean(providerCustomerId) ||
    providerAccounts.some((account) => Boolean(account.providerCustomerId))
  );
}

export function projectBillingSnapshotFromEntitlements(
  allReportIds: number[],
  entitlementRows: BillingProjectionRow[],
  providerAccounts: ProviderAccountProjection[] = []
): BillingSnapshot | null {
  const activeRecurring =
    entitlementRows.find(
      (row) =>
        (row.planType === 'monthly' || row.planType === 'annual') &&
        hasRecurringAccess(row.status)
    ) || null;

  if (activeRecurring) {
    return {
      activePlanType: activeRecurring.planType as BillingPlanType,
      planName: getPlanName(activeRecurring.planType as BillingPlanType),
      subscriptionStatus: activeRecurring.status,
      reportCredits: 0,
      unlockedReportIds: allReportIds,
      accessibleReportIds: allReportIds,
      lockedReportIds: [],
      currentPeriodEndsAt: activeRecurring.currentPeriodEndsAt
        ? activeRecurring.currentPeriodEndsAt.toISOString()
        : null,
      plans: BILLING_PLANS,
      portalAvailable: getPortalAvailability(
        activeRecurring.providerCustomerId,
        providerAccounts
      ),
    };
  }

  const latestRecurring =
    entitlementRows.find(
      (row) => row.planType === 'monthly' || row.planType === 'annual'
    ) || null;

  if (latestRecurring) {
    const unlockedReportIds = normalizeUnlockedReportIds(
      latestRecurring.unlockedReportIds || []
    ).filter((reportId) => allReportIds.includes(reportId));

    return {
      activePlanType: latestRecurring.planType as BillingPlanType,
      planName: getPlanName(latestRecurring.planType as BillingPlanType),
      subscriptionStatus: latestRecurring.status,
      reportCredits: 0,
      unlockedReportIds,
      accessibleReportIds: unlockedReportIds,
      lockedReportIds: allReportIds.filter((reportId) => !unlockedReportIds.includes(reportId)),
      currentPeriodEndsAt: latestRecurring.currentPeriodEndsAt
        ? latestRecurring.currentPeriodEndsAt.toISOString()
        : null,
      plans: BILLING_PLANS,
      portalAvailable: getPortalAvailability(
        latestRecurring.providerCustomerId,
        providerAccounts
      ),
    };
  }

  const oneTime = entitlementRows.find(
    (row) => row.planType === 'one_time' && hasOneTimeAccess(row)
  );

  if (oneTime) {
    const unlockedReportIds = normalizeUnlockedReportIds(oneTime.unlockedReportIds || []).filter(
      (reportId) => allReportIds.includes(reportId)
    );

    return {
      activePlanType: 'one_time',
      planName: getPlanName('one_time'),
      subscriptionStatus: oneTime.status,
      reportCredits: oneTime.reportCredits,
      unlockedReportIds,
      accessibleReportIds: unlockedReportIds,
      lockedReportIds: allReportIds.filter((reportId) => !unlockedReportIds.includes(reportId)),
      currentPeriodEndsAt: oneTime.currentPeriodEndsAt
        ? oneTime.currentPeriodEndsAt.toISOString()
        : null,
      plans: BILLING_PLANS,
      portalAvailable: getPortalAvailability(oneTime.providerCustomerId, providerAccounts),
    };
  }

  return null;
}

export async function syncBillingProviderAccount(input: {
  teamId: number;
  userId: number;
  provider: 'freemius' | 'creem' | 'stripe' | 'demo';
  providerCustomerId?: string | null;
  providerSubscriptionId?: string | null;
  email?: string | null;
}) {
  if (!input.providerCustomerId && !input.providerSubscriptionId) {
    return null;
  }

  const existing = await db
    .select({
      id: billingProviderAccounts.id,
      providerCustomerId: billingProviderAccounts.providerCustomerId,
      providerSubscriptionId: billingProviderAccounts.providerSubscriptionId,
    })
    .from(billingProviderAccounts)
    .where(
      and(
        eq(billingProviderAccounts.teamId, input.teamId),
        eq(billingProviderAccounts.userId, input.userId),
        eq(billingProviderAccounts.provider, input.provider)
      )
    )
    .limit(1);

  if (existing[0]) {
    const [updated] = await db
      .update(billingProviderAccounts)
      .set({
        providerCustomerId:
          input.providerCustomerId || existing[0].providerCustomerId || null,
        providerSubscriptionId:
          input.providerSubscriptionId || existing[0].providerSubscriptionId || null,
        email: input.email || null,
        updatedAt: new Date(),
      })
      .where(eq(billingProviderAccounts.id, existing[0].id))
      .returning();

    return updated || null;
  }

  const [created] = await db
    .insert(billingProviderAccounts)
    .values({
      teamId: input.teamId,
      userId: input.userId,
      provider: input.provider,
      providerCustomerId: input.providerCustomerId || null,
      providerSubscriptionId: input.providerSubscriptionId || null,
      email: input.email || null,
    })
    .returning();

  return created || null;
}

export async function syncBillingEntitlement(input: {
  teamId: number;
  userId: number;
  provider: 'freemius' | 'creem' | 'stripe' | 'demo';
  planType: BillingPlanType;
  priceId: string;
  status: string;
  providerCustomerId?: string | null;
  providerSubscriptionId?: string | null;
  checkoutSessionId?: string | null;
  reportCredits: number;
  unlockedReportIds: number[];
  currentPeriodEndsAt?: string | null;
  legacySubscriptionId?: number | null;
}) {
  const existing = await db
    .select({
      id: billingEntitlements.id,
      unlockedReportIds: billingEntitlements.unlockedReportIds,
      providerCustomerId: billingEntitlements.providerCustomerId,
      providerSubscriptionId: billingEntitlements.providerSubscriptionId,
    })
    .from(billingEntitlements)
    .where(
      and(
        eq(billingEntitlements.userId, input.userId),
        eq(billingEntitlements.planType, input.planType)
      )
    )
    .orderBy(desc(billingEntitlements.updatedAt))
    .limit(1);

  const mergedUnlockedReportIds = normalizeUnlockedReportIds([
    ...((existing[0]?.unlockedReportIds as number[] | undefined) || []),
    ...input.unlockedReportIds,
  ]);

  const nextValues = {
    teamId: input.teamId,
    userId: input.userId,
    provider: input.provider,
    planType: input.planType,
    priceId: input.priceId,
    status: input.status,
    providerCustomerId:
      input.providerCustomerId || existing[0]?.providerCustomerId || null,
    providerSubscriptionId:
      input.providerSubscriptionId || existing[0]?.providerSubscriptionId || null,
    checkoutSessionId: input.checkoutSessionId || null,
    reportCredits: input.reportCredits,
    unlockedReportIds: mergedUnlockedReportIds,
    currentPeriodEndsAt: input.currentPeriodEndsAt
      ? new Date(input.currentPeriodEndsAt)
      : null,
    legacySubscriptionId: input.legacySubscriptionId || null,
    updatedAt: new Date(),
  };

  if (existing[0]) {
    const [updated] = await db
      .update(billingEntitlements)
      .set(nextValues)
      .where(eq(billingEntitlements.id, existing[0].id))
      .returning();

    return updated || null;
  }

  const [created] = await db
    .insert(billingEntitlements)
    .values(nextValues)
    .returning();

  return created || null;
}

export async function recordProviderWebhookEvent(input: {
  provider: 'freemius' | 'creem' | 'stripe' | 'demo';
  eventId: string;
  eventType: string;
  payload: Record<string, unknown>;
}) {
  const providerEventKey = `${input.provider}:${input.eventId}`;

  const existing = await db
    .select({ id: billingWebhookEvents.id })
    .from(billingWebhookEvents)
    .where(eq(billingWebhookEvents.providerEventKey, providerEventKey))
    .limit(1);

  if (existing[0]) {
    return false;
  }

  await db.insert(billingWebhookEvents).values({
    provider: input.provider,
    providerEventKey,
    eventId: input.eventId,
    eventType: input.eventType,
    payload: input.payload,
  });

  const legacyExisting = await db
    .select({ id: billingEvents.id })
    .from(billingEvents)
    .where(eq(billingEvents.eventId, input.eventId))
    .limit(1);

  if (!legacyExisting[0]) {
    await db.insert(billingEvents).values({
      source: input.provider,
      eventId: input.eventId,
      eventType: input.eventType,
      payload: input.payload,
    });
  }

  return true;
}

async function applyCreditsToLegacyOneTimeSubscription(userId: number) {
  const rows = await db
    .select()
    .from(subscriptions)
    .where(and(eq(subscriptions.userId, userId), eq(subscriptions.planType, 'one_time')))
    .orderBy(desc(subscriptions.updatedAt))
    .limit(1);

  const subscription = rows[0];
  if (!subscription || subscription.reportCredits <= 0) {
    return subscription || null;
  }

  const reportIds = await listUserReportIds(userId);
  const unlocked = new Set(normalizeUnlockedReportIds(subscription.unlockedReportIds || []));

  for (const reportId of reportIds) {
    if (subscription.reportCredits <= 0) {
      break;
    }

    if (!unlocked.has(reportId)) {
      unlocked.add(reportId);
      subscription.reportCredits -= 1;
    }
  }

  const [updated] = await db
    .update(subscriptions)
    .set({
      reportCredits: subscription.reportCredits,
      unlockedReportIds: normalizeUnlockedReportIds(Array.from(unlocked)),
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.id, subscription.id))
    .returning();

  return updated || subscription;
}

async function getLegacyTeamBillingState(userId: number) {
  const rows = await db
    .select({
      stripeCustomerId: teams.stripeCustomerId,
      stripeSubscriptionId: teams.stripeSubscriptionId,
      stripeProductId: teams.stripeProductId,
      planName: teams.planName,
      subscriptionStatus: teams.subscriptionStatus,
    })
    .from(teamMembers)
    .innerJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teamMembers.userId, userId))
    .limit(1);

  return rows[0] || null;
}

async function buildSnapshotFromLegacy(userId: number): Promise<BillingSnapshot> {
  const recurringRows = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, userId),
        inArray(subscriptions.planType, getRecurringPlanIdsForDb())
      )
    )
    .orderBy(desc(subscriptions.updatedAt));

  const recurringSubscription =
    recurringRows.find((subscription) => hasRecurringAccess(subscription.status)) ||
    recurringRows[0] ||
    null;
  const oneTimeSubscription = await applyCreditsToLegacyOneTimeSubscription(userId);
  const legacyTeamBilling = await getLegacyTeamBillingState(userId);
  const allReportIds = await listUserReportIds(userId);

  if (recurringSubscription) {
    const unlockedReportIds = hasRecurringAccess(recurringSubscription.status)
      ? allReportIds
      : normalizeUnlockedReportIds(
          (recurringSubscription.unlockedReportIds as number[] | undefined) || []
        ).filter((reportId) => allReportIds.includes(reportId));

    return {
      activePlanType: recurringSubscription.planType as BillingPlanType,
      planName: getPlanName(recurringSubscription.planType as BillingPlanType),
      subscriptionStatus: recurringSubscription.status,
      reportCredits: 0,
      unlockedReportIds,
      accessibleReportIds: unlockedReportIds,
      lockedReportIds: allReportIds.filter((reportId) => !unlockedReportIds.includes(reportId)),
      currentPeriodEndsAt: recurringSubscription.currentPeriodEndsAt
        ? recurringSubscription.currentPeriodEndsAt.toISOString()
        : null,
      plans: BILLING_PLANS,
      portalAvailable: Boolean(
        recurringSubscription.stripeCustomerId || legacyTeamBilling?.stripeCustomerId
      ),
    };
  }

  const unlockedReportIds = normalizeUnlockedReportIds(
    (oneTimeSubscription?.unlockedReportIds as number[] | undefined) || []
  ).filter((reportId) => allReportIds.includes(reportId));

  if (oneTimeSubscription) {
    return {
      activePlanType: 'one_time',
      planName: getPlanName('one_time'),
      subscriptionStatus: oneTimeSubscription.status,
      reportCredits: oneTimeSubscription.reportCredits,
      unlockedReportIds,
      accessibleReportIds: unlockedReportIds,
      lockedReportIds: allReportIds.filter((reportId) => !unlockedReportIds.includes(reportId)),
      currentPeriodEndsAt: oneTimeSubscription.currentPeriodEndsAt
        ? oneTimeSubscription.currentPeriodEndsAt.toISOString()
        : null,
      plans: BILLING_PLANS,
      portalAvailable: Boolean(
        oneTimeSubscription.stripeCustomerId || legacyTeamBilling?.stripeCustomerId
      ),
    };
  }

  return buildFreeSnapshot(allReportIds);
}

export async function getBillingSnapshotFromEntitlements(userId: number): Promise<BillingSnapshot> {
  const allReportIds = await listUserReportIds(userId);
  const [entitlementRows, providerAccounts] = await Promise.all([
    db
      .select({
        planType: billingEntitlements.planType,
        status: billingEntitlements.status,
        reportCredits: billingEntitlements.reportCredits,
        unlockedReportIds: billingEntitlements.unlockedReportIds,
        currentPeriodEndsAt: billingEntitlements.currentPeriodEndsAt,
        providerCustomerId: billingEntitlements.providerCustomerId,
      })
      .from(billingEntitlements)
      .where(eq(billingEntitlements.userId, userId))
      .orderBy(desc(billingEntitlements.updatedAt)),
    db
      .select({
        providerCustomerId: billingProviderAccounts.providerCustomerId,
      })
      .from(billingProviderAccounts)
      .where(eq(billingProviderAccounts.userId, userId)),
  ]);

  const projected = projectBillingSnapshotFromEntitlements(
    allReportIds,
    entitlementRows,
    providerAccounts
  );

  if (projected) {
    return projected;
  }

  return buildSnapshotFromLegacy(userId);
}
