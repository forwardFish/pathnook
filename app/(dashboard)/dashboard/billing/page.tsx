import Link from 'next/link';
import { checkoutAction, customerPortalAction } from '@/lib/payments/actions';
import { getUser } from '@/lib/db/queries';
import { getBillingSnapshotForUser } from '@/lib/family/billing';
import { formatBillingInterval, isRecurringPlanType } from '@/lib/payments/catalog';
import { getPortalSupportLabel } from '@/lib/payments/service';
import { FREEMIUS_BILLING_ROLE_LINE, PUBLIC_CONTACT_EMAIL } from '@/lib/site/public-trust';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PageProps = {
  searchParams: Promise<{
    checkout?: string;
    plan?: string;
    portal?: string;
  }>;
};

function getCheckoutMessage(checkout: string | undefined, plan: string | undefined) {
  if (checkout === 'success') {
    if (plan === 'annual') {
      return 'Parent Annual is active. The full report path is unlocked for the year.';
    }

    if (plan === 'monthly') {
      return 'Parent Weekly is active. All current reports should now be unlocked.';
    }

    return 'One-Time Diagnosis credit was applied. The latest locked report unlocks automatically.';
  }

  if (checkout === 'cancelled') {
    return 'Checkout was canceled. Reports stay locked until a payment completes.';
  }

  if (checkout === 'invalid') {
    return 'Checkout could not be completed because the selected billing payload was invalid.';
  }

  if (checkout === 'unavailable') {
    return `Billing is temporarily unavailable. Please try again shortly or contact ${PUBLIC_CONTACT_EMAIL} for help.`;
  }

  return null;
}

export default async function BillingPage({ searchParams }: PageProps) {
  const [user, params] = await Promise.all([getUser(), searchParams]);

  if (!user) {
    return null;
  }

  const snapshot = await getBillingSnapshotForUser(user.id);
  const checkoutMessage = getCheckoutMessage(params.checkout, params.plan);
  const hasRecurringPlan = isRecurringPlanType(snapshot.activePlanType);
  const renewalLabel =
    snapshot.currentPeriodEndsAt ||
    (hasRecurringPlan ? 'Renews in the Freemius portal' : 'Not applicable');
  const portalCta = snapshot.portalAvailable ? getPortalSupportLabel() : 'Open Freemius billing portal';

  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
          Billing
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Billing and account management
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-600">
          {FREEMIUS_BILLING_ROLE_LINE}
        </p>
      </div>

      {checkoutMessage ? (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6 text-sm text-orange-900">{checkoutMessage}</CardContent>
        </Card>
      ) : null}

      {params.portal === 'unavailable' ? (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6 text-sm text-amber-900">
            A Freemius billing portal record is not available for this household
            yet. Complete a live checkout first so billing management can be opened.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Current account snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Current plan</p>
              <p className="mt-1">{snapshot.planName || 'Free setup state'}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Status</p>
              <p className="mt-1">{snapshot.subscriptionStatus}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Renewal or period end</p>
              <p className="mt-1">{renewalLabel}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Unlocked reports</p>
              <p className="mt-1">{snapshot.accessibleReportIds.length}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Historical access retained</p>
              <p className="mt-1">
                {snapshot.accessibleReportIds.length > 0
                  ? 'Yes, previously unlocked items remain visible according to local entitlement rules.'
                  : 'No retained reports yet.'}
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Locked reports</p>
              <p className="mt-1">{snapshot.lockedReportIds.length}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">One-time credits remaining</p>
              <p className="mt-1">{snapshot.reportCredits}</p>
            </div>

            {hasRecurringPlan ? (
              <form action={customerPortalAction}>
                <Button type="submit" variant="outline" className="w-full">
                  {portalCta}
                </Button>
              </form>
            ) : null}

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-medium text-slate-950">Cancellation and support</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                This page is Pathnook billing management. Review local access and
                entitlements here, then open the Freemius billing portal when you
                need invoices, payment-method updates, renewals, or cancellation.
                For refund review, entitlement questions, or access mismatches,
                contact Pathnook directly.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link href="/legal/refunds">Refund policy</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/help">Help center</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available plans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              <p className="font-medium text-slate-950">Freemius billing portal</p>
              <p className="mt-2">
                Renewals, invoices, payment methods, and subscription
                cancellation are handled through Freemius. Pathnook keeps your
                report access, billing history, and plan effects in sync locally
                after payment events arrive.
              </p>
            </div>

            {snapshot.plans.map((plan) => (
              <div key={plan.priceId} className="rounded-2xl border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{plan.name}</p>
                    <p className="mt-1 text-sm text-gray-600">{plan.description}</p>
                  </div>
                  {plan.badge ? (
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">
                      {plan.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm text-gray-700">
                  ${plan.unitAmount / 100}{' '}
                  <span className="text-gray-500">{formatBillingInterval(plan.interval)}</span>
                </p>
                <form action={checkoutAction} className="mt-4">
                  <input type="hidden" name="priceId" value={plan.priceId} />
                  <Button type="submit" className="w-full">
                    {plan.ctaLabel}
                  </Button>
                </form>
              </div>
            ))}

            <Button asChild variant="outline" className="w-full">
              <Link href="/pricing">View Public Pricing</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
