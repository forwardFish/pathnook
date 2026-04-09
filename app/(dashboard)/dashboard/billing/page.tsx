import Link from 'next/link';
import { checkoutAction, customerPortalAction } from '@/lib/payments/actions';
import { getUser } from '@/lib/db/queries';
import { getBillingSnapshotForUser } from '@/lib/family/billing';
import { formatBillingInterval, isRecurringPlanType } from '@/lib/payments/catalog';
import { getPortalSupportLabel } from '@/lib/payments/creem';
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

  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
          Billing
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Creem billing and unlock status
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-600">
          Payments are hosted by Creem. One-time purchases unlock a diagnosis credit, while the
          recurring plans unlock all current reports and keep the weekly review flow open.
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
            The Creem customer portal is not available yet for this household. Complete a live
            checkout first so a customer record can be created.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Current unlock snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Active plan</p>
              <p className="mt-1">{snapshot.planName || 'Free setup state'}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Subscription status</p>
              <p className="mt-1">{snapshot.subscriptionStatus}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Current period end</p>
              <p className="mt-1">{snapshot.currentPeriodEndsAt || 'Not applicable yet'}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Unlocked reports</p>
              <p className="mt-1">{snapshot.accessibleReportIds.length}</p>
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
                  {getPortalSupportLabel()}
                </Button>
              </form>
            ) : null}

            <p className="text-xs text-gray-500">
              This view is the acceptance source for billing lock and unlock behavior.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available plans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
