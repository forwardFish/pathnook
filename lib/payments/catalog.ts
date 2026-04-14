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
      'Unlock one evidence-backed family review built to show the real learning bottleneck, the most important next step, and a usable weekly focus.',
    unitAmount: 1900,
    currency: 'usd',
    interval: 'once',
    badge: 'Fastest start',
    ctaLabel: 'Buy One Diagnosis',
    features: [
      'One upload-to-review unlock',
      'Diagnosis tied to real student work',
      'Weekly focus and next-step guidance',
      'Tutor-ready share for that report',
    ],
  },
  {
    planType: 'monthly',
    productId: getEnvProductId('monthly', 'prod_pathnook_monthly'),
    priceId: 'price_fe_monthly',
    name: 'Parent Weekly',
    shortName: 'Weekly',
    description:
      'Monthly access for families who want ongoing weekly clarity, compare, and better follow-through instead of one-off reviews.',
    unitAmount: 2900,
    currency: 'usd',
    interval: 'month',
    featured: true,
    badge: 'Most flexible',
    ctaLabel: 'Start Parent Weekly',
    features: [
      'Ongoing review unlocks while active',
      'Compare each new review with the last one',
      'Clear weekly focus and next best action',
      'Family follow-through with tutor-ready sharing',
    ],
  },
  {
    planType: 'annual',
    productId: getEnvProductId('annual', 'prod_pathnook_annual'),
    priceId: 'price_fe_annual',
    name: 'Parent Annual',
    shortName: 'Annual',
    description:
      'Year-round access for households that already know they want Pathnook as an ongoing family learning workflow.',
    unitAmount: 19900,
    currency: 'usd',
    interval: 'year',
    badge: 'Founding Price',
    ctaLabel: 'Claim Annual Price',
    features: [
      'Ongoing access across the year',
      'Best effective price for repeat use',
      'Compare and continuity over time',
      'Same household dashboard and billing portal',
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
