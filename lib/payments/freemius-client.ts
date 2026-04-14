import { BILLING_CYCLE, Freemius, type PurchaseData } from '@freemius/sdk';
import { getBillingPlanByPriceId, type BillingPlan, type BillingPlanType } from './catalog';

function readRequiredEnv(name: string) {
  const value = process.env[name];
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function readBooleanEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    return false;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}

export function isFreemiusConfigured() {
  return Boolean(
    readRequiredEnv('FREEMIUS_PRODUCT_ID') &&
      readRequiredEnv('FREEMIUS_API_KEY') &&
      readRequiredEnv('FREEMIUS_SECRET_KEY') &&
      readRequiredEnv('FREEMIUS_PUBLIC_KEY')
  );
}

export function getFreemiusClientOrThrow() {
  const productId = readRequiredEnv('FREEMIUS_PRODUCT_ID');
  const apiKey = readRequiredEnv('FREEMIUS_API_KEY');
  const secretKey = readRequiredEnv('FREEMIUS_SECRET_KEY');
  const publicKey = readRequiredEnv('FREEMIUS_PUBLIC_KEY');

  if (!productId || !apiKey || !secretKey || !publicKey) {
    throw new Error(
      'Freemius is not configured. Set FREEMIUS_PRODUCT_ID, FREEMIUS_API_KEY, FREEMIUS_SECRET_KEY, and FREEMIUS_PUBLIC_KEY.'
    );
  }

  return new Freemius({
    productId,
    apiKey,
    secretKey,
    publicKey,
  });
}

export function isFreemiusSandboxMode() {
  return readBooleanEnv('FREEMIUS_SANDBOX_MODE');
}

function getPricingIdFromEnv(planType: BillingPlanType) {
  switch (planType) {
    case 'one_time':
      return readRequiredEnv('FREEMIUS_PRICING_ONE_TIME_ID');
    case 'monthly':
      return readRequiredEnv('FREEMIUS_PRICING_MONTHLY_ID');
    case 'annual':
      return readRequiredEnv('FREEMIUS_PRICING_ANNUAL_ID');
    default:
      return null;
  }
}

export function getFreemiusPricingIdForPlan(plan: BillingPlan) {
  return getPricingIdFromEnv(plan.planType);
}

export function getFreemiusPricingIdByPriceId(priceId: string) {
  const plan = getBillingPlanByPriceId(priceId);
  if (!plan) {
    return null;
  }

  return getFreemiusPricingIdForPlan(plan);
}

export function getInternalPlanByFreemiusPricingId(pricingId: string | null | undefined) {
  if (!pricingId) {
    return null;
  }

  return (
    (['one_time', 'monthly', 'annual'] as BillingPlanType[])
      .map((planType) => {
        const internalPlan = getBillingPlanByPriceId(
          planType === 'one_time'
            ? 'price_fe_one_time'
            : planType === 'monthly'
              ? 'price_fe_monthly'
              : 'price_fe_annual'
        );

        return internalPlan && getFreemiusPricingIdForPlan(internalPlan) === pricingId
          ? internalPlan
          : null;
      })
      .find(Boolean) || null
  );
}

export function getInternalPlanFromFreemiusPurchase(
  purchase: Pick<PurchaseData, 'pricingId' | 'billingCycle'>,
  fallbackPriceId?: string | null
) {
  const fromPricing = getInternalPlanByFreemiusPricingId(purchase.pricingId);
  if (fromPricing) {
    return fromPricing;
  }

  const fallbackPlan = getBillingPlanByPriceId(fallbackPriceId);
  if (fallbackPlan) {
    return fallbackPlan;
  }

  if (purchase.billingCycle === BILLING_CYCLE.MONTHLY) {
    return getBillingPlanByPriceId('price_fe_monthly');
  }

  if (purchase.billingCycle === BILLING_CYCLE.YEARLY) {
    return getBillingPlanByPriceId('price_fe_annual');
  }

  return getBillingPlanByPriceId('price_fe_one_time');
}
