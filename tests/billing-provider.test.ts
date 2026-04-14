import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolveBillingProviderSelection } from '../lib/payments/provider-selection';
import { BILLING_PLANS, getAnnualSavings } from '../lib/payments/catalog';

test('Freemius remains active when it is configured', () => {
  const selection = resolveBillingProviderSelection({
    demoMode: false,
    requested: 'freemius',
    freemiusConfigured: true,
    creemConfigured: true,
    allowCreemFallback: true,
  });

  assert.deepEqual(selection, {
    requested: 'freemius',
    active: 'freemius',
    fallbackApplied: false,
    rollbackEnabled: true,
  });
});

test('Creem rollback only activates when the flag is enabled', () => {
  const selection = resolveBillingProviderSelection({
    demoMode: false,
    requested: 'freemius',
    freemiusConfigured: false,
    creemConfigured: true,
    allowCreemFallback: true,
  });

  assert.deepEqual(selection, {
    requested: 'freemius',
    active: 'creem',
    fallbackApplied: true,
    rollbackEnabled: true,
  });
});

test('Provider selection stays on Freemius shell when rollback is disabled', () => {
  const selection = resolveBillingProviderSelection({
    demoMode: false,
    requested: 'freemius',
    freemiusConfigured: false,
    creemConfigured: true,
    allowCreemFallback: false,
  });

  assert.deepEqual(selection, {
    requested: 'freemius',
    active: 'freemius',
    fallbackApplied: false,
    rollbackEnabled: false,
  });
});

test('Public checkout entrypoints no longer import Creem directly', () => {
  const actionSource = readFileSync(
    new URL('../lib/payments/actions.ts', import.meta.url),
    'utf8'
  );
  const routeSource = readFileSync(
    new URL('../app/api/billing/checkout-session/route.ts', import.meta.url),
    'utf8'
  );

  assert.equal(actionSource.includes("lib/payments/creem"), false);
  assert.equal(routeSource.includes("lib/payments/creem"), false);
});

test('.env.example documents Freemius pricing ids and Pathnook admin email', () => {
  const envSource = readFileSync(new URL('../.env.example', import.meta.url), 'utf8');

  assert.equal(envSource.includes('FREEMIUS_PRICING_ONE_TIME_ID='), true);
  assert.equal(envSource.includes('FREEMIUS_PRICING_MONTHLY_ID='), true);
  assert.equal(envSource.includes('FREEMIUS_PRICING_ANNUAL_ID='), true);
  assert.equal(envSource.includes('SUPPORT_EMAIL=admin@pathnook.com'), true);
});

test('public pricing uses the 1.5.2 Freemius price ladder', () => {
  const oneTime = BILLING_PLANS.find((plan) => plan.planType === 'one_time');
  const monthly = BILLING_PLANS.find((plan) => plan.planType === 'monthly');
  const annual = BILLING_PLANS.find((plan) => plan.planType === 'annual');

  assert.equal(oneTime?.unitAmount, 1900);
  assert.equal(monthly?.unitAmount, 2900);
  assert.equal(annual?.unitAmount, 19900);
  assert.equal(getAnnualSavings(), 14900);
});
