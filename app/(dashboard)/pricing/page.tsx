import { Check, ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import { checkoutAction } from '@/lib/payments/actions';
import {
  formatBillingInterval,
  getAnnualSavings,
} from '@/lib/payments/catalog';
import { getConfiguredBillingPlans } from '@/lib/payments/service';
import { SubmitButton } from './submit-button';

export const revalidate = 3600;

const proofPoints = [
  'Evidence-backed diagnosis',
  'Hosted secure checkout',
  'PDF export and tutor handoff',
  'EN / ES parent report output',
];

const comparisonRows = [
  {
    label: 'Diagnosis unlock',
    one_time: '1 report',
    monthly: 'Unlimited while active',
    annual: 'Unlimited for 12 months',
  },
  {
    label: 'Parent weekly review flow',
    one_time: 'Included for that report',
    monthly: 'Included',
    annual: 'Included',
  },
  {
    label: 'PDF export',
    one_time: 'Included',
    monthly: 'Included',
    annual: 'Included',
  },
  {
    label: 'Tutor handoff workspace',
    one_time: 'Single-report handoff',
    monthly: 'Included',
    annual: 'Included',
  },
  {
    label: 'Best fit',
    one_time: 'First diagnosis',
    monthly: 'Ongoing weekly usage',
    annual: 'Year-round household workflow',
  },
];

export default async function PricingPage() {
  const plans = await getConfiguredBillingPlans();
  const annualSavings = getAnnualSavings();

  return (
    <main className="bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_28%),linear-gradient(180deg,#fffdf9_0%,#ffffff_28%,#fff9ef_100%)]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-5 py-2 text-sm font-semibold text-orange-700 shadow-sm backdrop-blur">
            <Wallet className="h-4 w-4" />
            Pathnook Pricing
          </div>
          <h1 className="mt-8 text-5xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
            Choose the Pathnook plan that matches your family workflow.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-600 sm:text-2xl">
            Start with one diagnosis, stay monthly for a weekly parent rhythm, or lock in the
            annual Pathnook workflow for ongoing family learning support.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-700">
            {proofPoints.map((point) => (
              <span
                key={point}
                className="rounded-full border border-slate-200 bg-white/85 px-4 py-2 shadow-sm"
              >
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.priceId}
              className={`relative overflow-hidden rounded-[2rem] border bg-white/95 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] ${
                plan.featured
                  ? 'border-orange-300 ring-2 ring-orange-200'
                  : 'border-slate-200'
              }`}
            >
              {plan.badge ? (
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                    plan.featured
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {plan.badge}
                </span>
              ) : null}

              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                    {plan.name}
                  </h2>
                  <p className="mt-3 text-lg leading-8 text-slate-600">{plan.description}</p>
                </div>
                {plan.planType === 'annual' ? (
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      Save
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-emerald-900">
                      ${annualSavings}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex items-end gap-3">
                <p className="text-6xl font-semibold tracking-[-0.05em] text-slate-950">
                  ${plan.unitAmount / 100}
                </p>
                <p className="pb-2 text-lg text-slate-500">
                  {formatBillingInterval(plan.interval)}
                </p>
              </div>

              {plan.planType === 'annual' ? (
                <p className="mt-3 text-sm font-medium text-emerald-700">
                  Founding price. Equivalent to about ${Math.round(plan.unitAmount / 12) / 100}
                  /month.
                </p>
              ) : null}

              <ul className="mt-8 space-y-4 text-lg text-slate-700">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-none text-orange-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <form action={checkoutAction} className="mt-8">
                <input type="hidden" name="priceId" value={plan.priceId} />
                <SubmitButton label={plan.ctaLabel} featured={Boolean(plan.featured)} />
              </form>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-white/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr,1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
              Billing Strategy
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              A simple plan ladder for the parent journey.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The pricing model is intentionally narrow: a low-friction first purchase, a monthly
              weekly-review plan, and a founding annual plan for committed households.
            </p>
            <div className="mt-8 space-y-4 rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-emerald-600" />
                <p className="text-base leading-7 text-slate-700">
                  Checkout is handled through the active billing provider, which keeps card
                  handling outside the core app and preserves a managed billing portal path
                  for subscription management.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 text-orange-500" />
                <p className="text-base leading-7 text-slate-700">
                  One-time purchases convert into report credits. Monthly and annual purchases
                  unlock all current reports while the subscription is active.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  <th className="px-6 py-4 font-semibold">Included</th>
                  <th className="px-6 py-4 font-semibold">One-Time</th>
                  <th className="px-6 py-4 font-semibold">Weekly</th>
                  <th className="px-6 py-4 font-semibold">Annual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-base text-slate-700">
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td className="px-6 py-4 font-medium text-slate-950">{row.label}</td>
                    <td className="px-6 py-4">{row.one_time}</td>
                    <td className="px-6 py-4">{row.monthly}</td>
                    <td className="px-6 py-4">{row.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8">
            <p className="text-lg font-semibold text-slate-950">When to choose One-Time</p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Best for a first upload, a single exam review, or a parent who wants to see the full
              diagnosis quality before committing to a recurring plan.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8">
            <p className="text-lg font-semibold text-slate-950">When to choose Parent Weekly</p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Best for families who upload regularly and want reminder-driven weekly reviews
              without locking into a yearly commitment yet.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8">
            <p className="text-lg font-semibold text-slate-950">When to choose Parent Annual</p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Best for year-round usage, multiple subjects over time, and households that already
              know they want the full workflow at the best effective price.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
