import Link from 'next/link';
import { Check, ShieldCheck } from 'lucide-react';
import { checkoutAction } from '@/lib/payments/actions';
import { formatBillingInterval, getAnnualSavings } from '@/lib/payments/catalog';
import { getConfiguredBillingPlans } from '@/lib/payments/service';
import {
  FREEMIUS_BILLING_ROLE_LINE,
  ONE_TIME_REFUND_WINDOW_DAYS,
  SUBSCRIPTION_REFUND_WINDOW_DAYS,
} from '@/lib/site/public-trust';
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
      'Recurring plans renew automatically through Freemius until you cancel. Renewal timing, invoices, and payment methods are managed in the Freemius billing portal that you can open from Pathnook billing management.',
  },
  {
    question: 'How do I cancel?',
    answer:
      'Use Pathnook billing management to open the Freemius billing portal when you need to cancel recurring billing. Cancellation stops future renewals and your household keeps any historically retained access allowed by the product rules.',
  },
  {
    question: 'Where do I manage billing?',
    answer:
      'Start from Pathnook billing management to review local access and entitlements. From there you can open the Freemius billing portal for invoices, payment methods, renewals, and cancellation.',
  },
  {
    question: 'What is refundable and what is not?',
    answer:
      `Unused one-time diagnosis credits may be reviewed for refund within ${ONE_TIME_REFUND_WINDOW_DAYS} days of purchase. For recurring plans, refund review is generally limited to the first ${SUBSCRIPTION_REFUND_WINDOW_DAYS} days of the initial billing cycle, subject to actual usage and local law. After a diagnosis credit has been consumed or a recurring plan has already delivered substantial access, refunds are generally limited to duplicate charges, technical failures, billing mistakes, unauthorized charges confirmed after review, or legal requirements.`,
  },
] as const;

export default async function PricingPage() {
  const plans = await getConfiguredBillingPlans();
  const annualSavings = getAnnualSavings();

  return (
    <main className="pn-page-shell">
      <section className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="pn-kicker">Pricing</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-[#111827] sm:text-6xl lg:text-7xl">
            Pathnook is software for clearer family learning decisions.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-[var(--pn-muted)] sm:text-2xl">
            Start with one diagnosis, continue monthly if you want clearer
            weekly decisions, better compare, and steadier follow-through.
          </p>
        </div>

        <div className="mt-8 text-center text-sm font-semibold text-[var(--pn-muted-2)]">
          Evidence-backed diagnosis 路 Clear weekly focus 路 Compare-ready
          follow-through 路 Secure checkout powered by Freemius
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.priceId}
              className={`relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-white/95 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] ${
                plan.featured
                  ? 'border-[#c4b5fd] ring-2 ring-[#e9ddff]'
                  : 'border-[var(--pn-border)]'
              }`}
            >
              {plan.badge ? (
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                    plan.featured
                      ? 'bg-[var(--pn-soft)] text-[var(--pn-violet)]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {plan.badge}
                </span>
              ) : null}

              <div className="mt-6">
                <h2 className="text-3xl font-black tracking-tight text-[#111827]">
                  {plan.name}
                </h2>
                <p className="mt-3 text-lg leading-8 text-[var(--pn-muted)]">
                  {plan.description}
                </p>
              </div>

              <div className="mt-8 flex items-end gap-3">
                <p className="text-6xl font-black tracking-[-0.05em] text-[#111827]">
                  ${(plan.unitAmount / 100).toFixed(plan.interval === 'once' ? 0 : 0)}
                </p>
                <p className="pb-2 text-lg text-[var(--pn-muted)]">
                  {formatBillingInterval(plan.interval)}
                </p>
              </div>

              <div className="mt-3 min-h-[3.5rem]">
                {plan.planType === 'annual' ? (
                  <p className="text-sm font-semibold text-[var(--pn-violet)]">
                    Saves ${(annualSavings / 100).toFixed(0)} compared with 12 monthly renewals.
                  </p>
                ) : null}
                {plan.planType === 'one_time' ? (
                  <p className="text-sm text-[var(--pn-muted)]">
                    Limited early access: first review discount may apply at checkout.
                  </p>
                ) : null}
              </div>

              <ul className="mt-8 flex-1 space-y-4 text-lg text-[var(--pn-muted-2)]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-none text-[var(--pn-violet)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <form action={checkoutAction} className="mt-8 pt-2">
                <input type="hidden" name="priceId" value={plan.priceId} />
                <SubmitButton label={plan.ctaLabel} featured={Boolean(plan.featured)} />
              </form>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--pn-border)]/70 bg-white/60 backdrop-blur">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr,1.05fr] lg:px-8">
          <div>
            <p className="pn-kicker">Billing Strategy</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
              A simple plan ladder for the parent journey.
            </h2>
            <div className="mt-8 space-y-4 rounded-[1.75rem] border border-[var(--pn-soft-border)] bg-[linear-gradient(180deg,var(--pn-soft-2)_0%,white_100%)] p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-[var(--pn-violet)]" />
                <p className="text-base leading-7 text-[var(--pn-muted-2)]">
                  Start with one diagnosis if you want to see the output quality
                  first. Move to monthly if you want weekly compare and
                  follow-through. Choose annual only if you already know you want
                  the full workflow year-round.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-[var(--pn-violet)]" />
                <p className="text-base leading-7 text-[var(--pn-muted-2)]">
                  {FREEMIUS_BILLING_ROLE_LINE}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-[var(--pn-violet)]" />
                <p className="text-base leading-7 text-[var(--pn-muted-2)]">
                  Families are not paying for more schoolwork content. They are
                  paying for clearer judgment, a stronger next step, and steadier
                  weekly follow-through.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-[2rem] border border-[var(--pn-soft-border)] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
            <h3 className="text-2xl font-black text-[#111827]">Billing FAQ</h3>
            {billingFaq.map((item) => (
              <article
                key={item.question}
                className="rounded-[1.4rem] border border-[var(--pn-border)] bg-[linear-gradient(180deg,var(--pn-soft-2)_0%,white_100%)] p-5"
              >
                <h4 className="text-lg font-semibold text-[#111827]">{item.question}</h4>
                <p className="mt-2 text-base leading-7 text-[var(--pn-muted)]">{item.answer}</p>
              </article>
            ))}
            <div className="rounded-[1.4rem] border border-[var(--pn-border)] bg-[linear-gradient(180deg,var(--pn-soft-2)_0%,white_100%)] p-5 text-sm leading-7 text-[var(--pn-muted)]">
              <p className="font-semibold text-[#111827]">Need help after purchase?</p>
              <p className="mt-2">
                Use Pathnook billing management to review local access and open
                the Freemius billing portal for invoices, renewal control,
                payment methods, and cancellation. Use Pathnook support for
                entitlement questions, refund review, and product access issues.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/sign-in?redirect=%2Fdashboard%2Fbilling"
                  className="rounded-[1rem] bg-[linear-gradient(90deg,var(--pn-indigo),var(--pn-violet),var(--pn-fuchsia))] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(124,58,237,0.24)]"
                >
                  Open billing management
                </Link>
                <Link
                  href="/legal/refunds"
                  className="rounded-[1rem] border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-text)]"
                >
                  Refund policy
                </Link>
                <Link
                  href="/faq"
                  className="rounded-[1rem] border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-text)]"
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
