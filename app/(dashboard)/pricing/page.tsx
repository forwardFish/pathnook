import Link from 'next/link';
import { Check, ShieldCheck } from 'lucide-react';
import { checkoutAction } from '@/lib/payments/actions';
import { formatBillingInterval, getAnnualSavings } from '@/lib/payments/catalog';
import { getConfiguredBillingPlans } from '@/lib/payments/service';
import { SubmitButton } from './submit-button';

export const revalidate = 3600;

const billingFaq = [
  {
    question: 'When am I charged?',
    answer:
      'One-time access is charged when checkout completes. Monthly and annual subscriptions begin when the Freemius checkout is confirmed.',
  },
  {
    question: 'How do renewals work?',
    answer:
      'Recurring plans renew automatically through Freemius until you cancel. Renewal timing and invoices are managed in the Freemius customer portal.',
  },
  {
    question: 'How do I cancel?',
    answer:
      'Use the Freemius customer portal to cancel recurring billing. Cancellation stops future renewals and your household keeps any historically retained access allowed by the product rules.',
  },
  {
    question: 'Where do I manage billing?',
    answer:
      'Billing records, subscription management, and cancellation all route through the Freemius customer portal.',
  },
  {
    question: 'What is refundable and what is not?',
    answer:
      'Unused one-time diagnosis credits may qualify within the refund window. Once a diagnosis credit has been consumed or a report has already been generated, refunds are generally not available except for duplicate charges, technical failures, billing mistakes, or legal requirements.',
  },
] as const;

export default async function PricingPage() {
  const plans = await getConfiguredBillingPlans();
  const annualSavings = getAnnualSavings();

  return (
    <main className="bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.14),_transparent_28%),linear-gradient(180deg,#fbfffe_0%,#ffffff_34%,#f8fafc_100%)]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
            Pathnook is software for clearer family learning decisions.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-600 sm:text-2xl">
            Choose one diagnosis or ongoing access. Billing, renewal, and
            cancellation are handled through Freemius.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.priceId}
              className={`relative overflow-hidden rounded-[2rem] border bg-white/95 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] ${
                plan.featured
                  ? 'border-emerald-300 ring-2 ring-emerald-200'
                  : 'border-slate-200'
              }`}
            >
              {plan.badge ? (
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                    plan.featured
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {plan.badge}
                </span>
              ) : null}

              <div className="mt-6">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                  {plan.name}
                </h2>
                <p className="mt-3 text-lg leading-8 text-slate-600">{plan.description}</p>
              </div>

              <div className="mt-8 flex items-end gap-3">
                <p className="text-6xl font-semibold tracking-[-0.05em] text-slate-950">
                  ${(plan.unitAmount / 100).toFixed(plan.interval === 'once' ? 0 : 0)}
                </p>
                <p className="pb-2 text-lg text-slate-500">
                  {formatBillingInterval(plan.interval)}
                </p>
              </div>

              {plan.planType === 'annual' ? (
                <p className="mt-3 text-sm font-medium text-emerald-700">
                  Saves ${(annualSavings / 100).toFixed(0)} compared with 12 monthly renewals.
                </p>
              ) : null}

              <ul className="mt-8 space-y-4 text-lg text-slate-700">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-none text-emerald-500" />
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Billing and Trust
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Freemius handles checkout and billing. Pathnook handles product access.
            </h2>
            <div className="mt-8 space-y-4 rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-emerald-600" />
                <p className="text-base leading-7 text-slate-700">
                  Payments are processed by Freemius as Merchant of Record. That
                  includes checkout, billing records, taxes where applicable, and
                  subscription billing.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-emerald-600" />
                <p className="text-base leading-7 text-slate-700">
                  Pathnook manages report entitlements, household access, uploads,
                  diagnosis workflow outputs, and product history inside the app.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-emerald-600" />
                <p className="text-base leading-7 text-slate-700">
                  Subscription management and billing portal access are handled through
                  the Freemius customer portal.
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-emerald-100 bg-emerald-50/80 p-6 text-sm leading-7 text-emerald-900">
              <p className="font-semibold">What each purchase buys</p>
              <p className="mt-2">
                You are purchasing access to Pathnook software workflows and
                locally stored entitlements, not live tutoring hours, school
                placement, guaranteed academic results, or a custom consulting
                engagement.
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
            <h3 className="text-2xl font-semibold text-slate-950">Billing FAQ</h3>
            {billingFaq.map((item) => (
              <article key={item.question} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5">
                <h4 className="text-lg font-semibold text-slate-950">{item.question}</h4>
                <p className="mt-2 text-base leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
            <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              <p className="font-semibold text-slate-950">Need help after purchase?</p>
              <p className="mt-2">
                Use the Freemius billing portal for invoices, renewal control, and
                cancellation. Use Pathnook support for entitlement questions,
                refund review, and product access issues.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/sign-in?redirect=%2Fdashboard%2Fbilling"
                  className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white"
                >
                  Open billing portal
                </Link>
                <Link
                  href="/legal/refunds"
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900"
                >
                  Refund policy
                </Link>
                <Link
                  href="/faq"
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900"
                >
                  Billing FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
