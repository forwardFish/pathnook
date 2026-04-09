'use server';

import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/queries';
import { applyCheckoutCompletionForUser } from '@/lib/family/billing';
import { createCheckoutSession, createCustomerPortalSession } from './creem';
import { withTeam } from '@/lib/auth/middleware';
import { getBillingPlanByPriceId } from '@/lib/payments/catalog';

function getCurrentPeriodEndIso(interval: 'once' | 'month' | 'year') {
  const now = Date.now();

  if (interval === 'month') {
    return new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString();
  }

  if (interval === 'year') {
    return new Date(now + 365 * 24 * 60 * 60 * 1000).toISOString();
  }

  return null;
}

export const checkoutAction = withTeam(async (formData, team) => {
  const priceId = formData.get('priceId') as string;
  await createCheckoutSession({ team: team, priceId });
});

export const customerPortalAction = withTeam(async (_, team) => {
  const portalSession = await createCustomerPortalSession(team);
  redirect(portalSession.url);
});

export const completeDemoCheckoutAction = withTeam(async (formData) => {
  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
  }

  const priceId = String(formData.get('priceId') || '');
  const sessionId = String(formData.get('sessionId') || '');
  const plan = getBillingPlanByPriceId(priceId);

  if (!plan || !sessionId) {
    redirect('/dashboard/billing?checkout=invalid');
  }

  await applyCheckoutCompletionForUser({
    userId: user.id,
    priceId,
    checkoutSessionId: sessionId,
    provider: 'demo',
    status: plan.planType === 'one_time' ? 'active' : 'active',
    currentPeriodEndsAt: getCurrentPeriodEndIso(plan.interval),
  });

  redirect(`/dashboard/billing?checkout=success&plan=${plan.planType}`);
});
