import Link from 'next/link';
import { checkoutAction, customerPortalAction } from '@/lib/payments/actions';
import {
  BILLING_ADD_ONS,
  formatBillingInterval,
  getPublicBillingPlanGroups,
} from '@/lib/payments/catalog';
import { getUser } from '@/lib/db/queries';
import { getBillingSnapshotForUser } from '@/lib/family/billing';
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
    if (plan === 'family') {
      return 'Family is active. The household now has the highest seat, subject, and review-credit ceiling.';
    }

    if (plan === 'plus') {
      return 'Plus is active. Multi-subject tracking, tutor-ready sharing, and deeper review continuity are now unlocked.';
    }

    if (plan === 'starter') {
      return 'Starter is active. The account now has recurring seats, active subject slots, and monthly review credits.';
    }

    return 'Single Review was applied. The next formal diagnosis path can now unlock against the available review credit.';
  }

  if (checkout === 'cancelled') {
    return 'Checkout was canceled. Billing and local entitlements stay unchanged until a payment completes.';
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
  const renewalLabel =
    snapshot.currentPeriodEndsAt ||
    (snapshot.billingMode && snapshot.billingMode !== 'one_time'
      ? 'Renews in the Freemius billing portal'
      : 'Not applicable');
  const portalCta = snapshot.portalAvailable ? getPortalSupportLabel() : 'Open Freemius Billing Portal';
  const planGroups = getPublicBillingPlanGroups();

  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
          Billing
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Pathnook billing center
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

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Current account snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-medium text-gray-900">Current plan</p>
                <p className="mt-1">{snapshot.planName || 'Free setup state'}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-medium text-gray-900">Status</p>
                <p className="mt-1">{snapshot.subscriptionStatus}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-medium text-gray-900">Learning seats</p>
                <p className="mt-1">{snapshot.seatLimit}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-medium text-gray-900">Active subject slots</p>
                <p className="mt-1">{snapshot.subjectSlotLimit}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-medium text-gray-900">Review credits remaining</p>
                <p className="mt-1">{snapshot.reviewCreditsRemaining}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-medium text-gray-900">Renewal or period end</p>
                <p className="mt-1">{renewalLabel}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Subject allocation policy</p>
              <p className="mt-1">{snapshot.subjectAllocationPolicy}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-medium text-gray-900">Accessible reports</p>
                <p className="mt-1">{snapshot.accessibleReportIds.length}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-medium text-gray-900">Historical access retained</p>
                <p className="mt-1">
                  {snapshot.accessibleReportIds.length > 0 ? 'Yes' : 'No retained reports yet'}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-medium text-gray-900">Locked reports</p>
                <p className="mt-1">{snapshot.lockedReportIds.length}</p>
              </div>
            </div>

            {snapshot.portalAvailable ? (
              <form action={customerPortalAction}>
                <Button type="submit" variant="outline" className="w-full">
                  {portalCta}
                </Button>
              </form>
            ) : null}

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-medium text-slate-950">Add-ons available inside billing</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="font-medium text-slate-950">
                    Add seat
                  </p>
                  <p className="mt-1 text-xs leading-6 text-slate-600">
                    +${(BILLING_ADD_ONS.seat.monthly / 100).toFixed(0)} / month or +${(BILLING_ADD_ONS.seat.annual / 100).toFixed(0)} / year
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="font-medium text-slate-950">Add subject slot</p>
                  <p className="mt-1 text-xs leading-6 text-slate-600">
                    +${(BILLING_ADD_ONS.subjectSlot.monthly / 100).toFixed(0)} / month or +${(BILLING_ADD_ONS.subjectSlot.annual / 100).toFixed(0)} / year
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="font-medium text-slate-950">Extra review credits</p>
                  <p className="mt-1 text-xs leading-6 text-slate-600">
                    {BILLING_ADD_ONS.extraReviewCredits.map((pack) => `$${(pack.unitAmount / 100).toFixed(0)} / ${pack.pack}`).join(' · ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-medium text-slate-950">Cancellation and support</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Review local entitlements here, then open the Freemius billing portal
                when you need invoices, payment-method updates, renewals, or cancellation.
                For refund review, entitlement questions, or access mismatches, contact
                Pathnook directly.
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
              <p className="font-medium text-slate-950">Pathnook pricing ladder</p>
              <p className="mt-2">
                Billing now scales by learner seats, active subject slots, and formal
                review credits. Add-ons expand capacity after a household is already on
                a recurring plan.
              </p>
            </div>

            {planGroups.map((group) => (
              <div key={group.planCode} className="rounded-2xl border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{group.name}</p>
                    <p className="mt-1 text-sm text-gray-600">{group.summaryLine}</p>
                  </div>
                  {group.badge ? (
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">
                      {group.badge}
                    </span>
                  ) : null}
                </div>

                {group.oneTime ? (
                  <form action={checkoutAction} className="mt-4 rounded-xl border border-slate-200 p-3">
                    <p className="text-sm font-medium text-slate-950">
                      ${group.oneTime.unitAmount / 100} {formatBillingInterval(group.oneTime.interval)}
                    </p>
                    <input type="hidden" name="priceId" value={group.oneTime.priceId} />
                    <Button type="submit" className="mt-3 w-full">
                      {group.oneTime.ctaLabel}
                    </Button>
                  </form>
                ) : null}

                {group.monthly ? (
                  <form action={checkoutAction} className="mt-4 rounded-xl border border-slate-200 p-3">
                    <p className="text-sm font-medium text-slate-950">
                      ${group.monthly.unitAmount / 100} {formatBillingInterval(group.monthly.interval)}
                    </p>
                    <input type="hidden" name="priceId" value={group.monthly.priceId} />
                    <Button type="submit" className="mt-3 w-full">
                      {group.monthly.ctaLabel}
                    </Button>
                  </form>
                ) : null}

                {group.annual ? (
                  <form action={checkoutAction} className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-sm font-medium text-slate-950">
                      ${group.annual.unitAmount / 100} {formatBillingInterval(group.annual.interval)}
                    </p>
                    <input type="hidden" name="priceId" value={group.annual.priceId} />
                    <Button type="submit" variant="outline" className="mt-3 w-full">
                      {group.annual.ctaLabel}
                    </Button>
                  </form>
                ) : null}
              </div>
            ))}

            <Button asChild variant="outline" className="w-full">
              <Link href="/pricing">View public pricing</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
