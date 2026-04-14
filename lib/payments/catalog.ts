export type BillingPlanType = 'one_time' | 'monthly' | 'annual';

export type BillingInterval = 'once' | 'month' | 'year';

export type BillingPlan = {
  planType: BillingPlanType;
  productId: string;
  priceId: string;
  name: string;
  shortName: string;
  description: string;
  unitAmount: number;
  currency: 'usd';
  interval: BillingInterval;
  badge?: string;
  featured?: boolean;
  ctaLabel: string;
  features: string[];
};

function getEnvProductId(
  key: 'one_time' | 'monthly' | 'annual',
  fallback: string
) {
  if (key === 'one_time') {
    return process.env.CREEM_PRODUCT_ONE_TIME_ID || fallback;
  }
  if (key === 'monthly') {
    return process.env.CREEM_PRODUCT_MONTHLY_ID || fallback;
  }
  return process.env.CREEM_PRODUCT_ANNUAL_ID || fallback;
}

export const BILLING_PLANS: BillingPlan[] = [
  {
    planType: 'one_time',
    productId: getEnvProductId('one_time', 'prod_pathnook_one_time'),
    priceId: 'price_fe_one_time',
    name: 'One-Time Diagnosis',
    shortName: 'One-Time',
    description:
      'Unlock one complete Pathnook diagnosis workflow with evidence anchors, next steps, and a parent-ready export.',
    unitAmount: 1900,
    currency: 'usd',
    interval: 'once',
    badge: 'Fastest start',
    ctaLabel: 'Buy One Diagnosis',
    features: [
      'One upload-to-diagnosis software workflow',
      'Evidence-backed parent report with clear decision framing',
      'PDF export and retained report access',
      'Tutor-safe handoff for that completed report',
    ],
  },
  {
    planType: 'monthly',
    productId: getEnvProductId('monthly', 'prod_pathnook_monthly'),
    priceId: 'price_fe_monthly',
    name: 'Parent Weekly',
    shortName: 'Weekly',
    description:
      'Monthly software access for families who want a steady review rhythm and always-on report access.',
    unitAmount: 3900,
    currency: 'usd',
    interval: 'month',
    featured: true,
    badge: 'Most flexible',
    ctaLabel: 'Start Parent Weekly',
    features: [
      'Unlimited report unlocks while the plan is active',
      'Weekly review workflow, reminders, and progress continuity',
      'English and Spanish parent-facing output',
      'Tutor handoff support with the same evidence context',
    ],
  },
  {
    planType: 'annual',
    productId: getEnvProductId('annual', 'prod_pathnook_annual'),
    priceId: 'price_fe_annual',
    name: 'Parent Annual',
    shortName: 'Annual',
    description:
      'Yearly software access for households that want the full Pathnook workflow throughout the year.',
    unitAmount: 29900,
    currency: 'usd',
    interval: 'year',
    badge: 'Founding Price',
    ctaLabel: 'Claim Annual Price',
    features: [
      'Unlimited report unlocks for the full billing year',
      'Best effective price for repeat family review cycles',
      'PDF export, bilingual parent output, and tutor handoff',
      'Keeps the same household dashboard and Freemius billing portal',
    ],
  },
];

export function getBillingPlanByPriceId(priceId: string | null | undefined) {
  if (!priceId) {
    return null;
  }

  return BILLING_PLANS.find((plan) => plan.priceId === priceId) || null;
}

export function getBillingPlanByProductId(productId: string | null | undefined) {
  if (!productId) {
    return null;
  }

  return BILLING_PLANS.find((plan) => plan.productId === productId) || null;
}

export function isRecurringPlanType(
  planType: BillingPlanType | 'free'
): planType is 'monthly' | 'annual' {
  return planType === 'monthly' || planType === 'annual';
}

export function formatBillingInterval(interval: BillingInterval) {
  if (interval === 'once') {
    return 'one-time';
  }

  return interval === 'month' ? 'per month' : 'per year';
}

export function getAnnualSavings() {
  const monthlyPlan = BILLING_PLANS.find((plan) => plan.planType === 'monthly');
  const annualPlan = BILLING_PLANS.find((plan) => plan.planType === 'annual');

  if (!monthlyPlan || !annualPlan) {
    return 0;
  }

  return monthlyPlan.unitAmount * 12 - annualPlan.unitAmount;
}
