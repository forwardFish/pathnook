import { BILLING_PLANS, type BillingPlanType } from './catalog';

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

export type BillingProjectionRow = {
  planType: string;
  status: string;
  reportCredits: number;
  unlockedReportIds: number[];
  currentPeriodEndsAt: Date | null;
  providerCustomerId: string | null;
};

export type ProviderAccountProjection = {
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

function hasRecurringAccess(status: string) {
  return status === 'active' || status === 'trialing' || status === 'scheduled_cancel';
}

function hasRetainedHistoricalAccess(row: BillingProjectionRow) {
  return normalizeUnlockedReportIds(row.unlockedReportIds || []).length > 0;
}

function hasOneTimeAccess(row: BillingProjectionRow) {
  return row.reportCredits > 0 || hasRetainedHistoricalAccess(row) || row.status !== 'expired';
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

export { buildFreeSnapshot };
