# FamilyEducation Creem Payment Plan

## Pricing

| Plan | Price | Billing | Best fit |
| --- | --- | --- | --- |
| One-Time Diagnosis | $19 | One-time | First report unlock |
| Parent Weekly | $39 | Monthly recurring | Ongoing weekly review cadence |
| Parent Annual | $299 | Yearly recurring | Founding-price annual household workflow |

## Creem Product Setup

Create three Creem products in the dashboard:

1. `One-Time Diagnosis`
   - Billing type: `onetime`
   - Billing period: `once`
   - Price: `1900` cents / `USD`
2. `Parent Weekly`
   - Billing type: `recurring`
   - Billing period: `every-month`
   - Price: `3900` cents / `USD`
3. `Parent Annual`
   - Billing type: `recurring`
   - Billing period: `every-year`
   - Price: `29900` cents / `USD`

Use the same success URL base for all three products:

- `https://your-domain.com/api/creem/checkout`

Register the webhook endpoint:

- `https://your-domain.com/api/creem/webhook`

## Environment Variables

```env
CREEM_API_KEY=creem_test_or_live_key
CREEM_WEBHOOK_SECRET=whsec_or_creem_secret
CREEM_TEST_MODE=1
CREEM_PRODUCT_ONE_TIME_ID=prod_xxx
CREEM_PRODUCT_MONTHLY_ID=prod_xxx
CREEM_PRODUCT_ANNUAL_ID=prod_xxx
BASE_URL=https://your-domain.com
```

## Application Flow

1. Parent chooses a plan on `/pricing` or `/dashboard/billing`.
2. Server action creates a Creem hosted checkout session.
3. Creem redirects back to `/api/creem/checkout` with signed query params.
4. The app verifies the redirect signature, retrieves the checkout from Creem, and applies entitlements.
5. `/api/creem/webhook` keeps subscription state synchronized for renewals, cancelations, scheduled cancel, pause, and expiry.
6. Recurring plans unlock all current reports while active. One-time checkout adds one report credit.

## Access Rules

- `One-Time Diagnosis`
  - Adds one report unlock credit.
  - Best for a single upload or first-time purchase.
- `Parent Weekly`
  - Unlocks all reports while the subscription is active, trialing, or scheduled to cancel at period end.
- `Parent Annual`
  - Same unlock behavior as monthly, but with yearly billing and the founding price.

## Webhook Status Mapping

| Creem event | Local effect |
| --- | --- |
| `checkout.completed` | Initial unlock / first subscription sync |
| `subscription.active` | Sync active recurring status |
| `subscription.paid` | Refresh recurring active status and current period end |
| `subscription.trialing` | Keep recurring access active |
| `subscription.scheduled_cancel` | Keep access until current period end |
| `subscription.canceled` | Mark recurring plan canceled |
| `subscription.paused` | Remove recurring access |
| `subscription.expired` | Remove recurring access |
| `subscription.past_due` | Mark status unpaid |

## Launch Checklist

1. Create the three products in Creem test mode.
2. Fill the three product IDs in `.env`.
3. Run local checkout in test mode with Creem test cards.
4. Expose the webhook locally with ngrok or equivalent and confirm signature verification.
5. Verify:
   - one-time unlock
   - monthly recurring unlock
   - annual recurring unlock
   - cancel return path
   - customer portal access
   - webhook idempotency
6. Switch to live keys, live product IDs, and live webhook registration only after test evidence is green.

## Sources

- [Creem Quickstart](https://docs.creem.io/getting-started/quickstart)
- [Creem Checkout API](https://docs.creem.io/api-reference/endpoint/create-checkout)
- [Creem Return URLs](https://docs.creem.io/learn/checkout-session/return-url)
- [Creem Webhooks](https://docs.creem.io/code/webhooks)
- [Creem Customer Portal](https://docs.creem.io/features/customer-portal)
- [Creem Core SDK](https://docs.creem.io/code/sdks/typescript-core)
