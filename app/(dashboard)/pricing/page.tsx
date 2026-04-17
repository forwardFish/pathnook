import Link from 'next/link';
import { Check, ShieldCheck } from 'lucide-react';
import { checkoutAction } from '@/lib/payments/actions';
import {
  BILLING_ADD_ONS,
  formatBillingInterval,
  getAnnualSavings,
  getPublicBillingPlanGroups,
} from '@/lib/payments/catalog';
import {
  FREEMIUS_BILLING_ROLE_LINE,
  ONE_TIME_REFUND_WINDOW_DAYS,
  SUBSCRIPTION_REFUND_WINDOW_DAYS,
} from '@/lib/site/public-trust';
import { SubmitButton } from './submit-button';

export const revalidate = 3600;

const billingFaq = [
  {
    question: 'What do seats, subjects, and reviews mean?',
    answer:
      'A seat is one long-term learner identity, a subject slot is one active subject or learning theme, and a review credit is one formal upload-to-diagnosis cycle.',
  },
  {
    question: 'How do renewals work?',
    answer:
      'Starter, Plus, and Family renew automatically through Freemius until you cancel. Annual plans also unlock a higher active-subject ceiling than the monthly version of the same tier.',
  },
  {
    question: 'Where do I manage billing?',
    answer:
      'Start from Pathnook billing management to review local entitlements, then open the Freemius billing portal for invoices, payment methods, renewals, and cancellation.',
  },
  {
    question: 'How do subject slots work?',
    answer:
      'Subject slots represent active tracked subjects or learning themes. Monthly plans can reallocate them by natural month, while annual plans keep a higher continuity ceiling without enabling unlimited switching.',
  },
  {
    question: 'What is refundable and what is not?',
    answer:
      `Unused Single Review credits may be reviewed for refund within ${ONE_TIME_REFUND_WINDOW_DAYS} days of purchase. For recurring plans, refund review is generally limited to the first ${SUBSCRIPTION_REFUND_WINDOW_DAYS} days of the initial billing cycle, subject to actual usage and local law.`,
  },
] as const;

export default function PricingPage() {
  const planGroups = getPublicBillingPlanGroups();

  return (
    <main className="pn-page-shell">
      <section className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="pn-kicker">Pricing</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-[#111827] sm:text-6xl lg:text-7xl">
            Choose seats, subjects, and review depth that match your family.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-[var(--pn-muted)] sm:text-2xl">
            Pathnook pricing is now built on three clear units: learning seats,
            active subject slots, and formal review credits.
          </p>
        </div>

        <div className="mt-8 text-center text-sm font-semibold text-[var(--pn-muted-2)]">
          4 public tiers · Seat-based household growth · Active subject control ·
          Review-credit cost guardrail · Secure checkout powered by Freemius
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {planGroups.map((group) => (
            <article
              key={group.planCode}
              className={`relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-white/95 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] ${
                group.featured
                  ? 'border-[#c4b5fd] ring-2 ring-[#e9ddff]'
                  : 'border-[var(--pn-border)]'
              }`}
            >
              {group.badge ? (
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                    group.featured
                      ? 'bg-[var(--pn-soft)] text-[var(--pn-violet)]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {group.badge}
                </span>
              ) : null}

              <div className="mt-6">
                <h2 className="text-3xl font-black tracking-tight text-[#111827]">
                  {group.name}
                </h2>
                <p className="mt-3 text-lg leading-8 text-[var(--pn-muted)]">
                  {group.description}
                </p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--pn-muted-2)]">
                  {group.audience}
                </p>
              </div>

              <div className="mt-6 rounded-[1.4rem] bg-[linear-gradient(180deg,var(--pn-soft-2)_0%,white_100%)] p-4">
                <p className="text-sm font-semibold text-[#111827]">{group.summaryLine}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--pn-muted)]">
                  Add-ons live in the billing center so new families do not need
                  to learn every expansion rule on day one.
                </p>
              </div>

              {group.oneTime ? (
                <div className="mt-6 rounded-[1.4rem] border border-[var(--pn-border)] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--pn-muted-2)]">
                    One-time
                  </p>
                  <div className="mt-2 flex items-end gap-3">
                    <p className="text-5xl font-black tracking-[-0.05em] text-[#111827]">
                      ${(group.oneTime.unitAmount / 100).toFixed(0)}
                    </p>
                    <p className="pb-2 text-sm text-[var(--pn-muted)]">
                      {formatBillingInterval(group.oneTime.interval)}
                    </p>
                  </div>
                  <form action={checkoutAction} className="mt-4">
                    <input type="hidden" name="priceId" value={group.oneTime.priceId} />
                    <SubmitButton label={group.oneTime.ctaLabel} featured={Boolean(group.featured)} />
                  </form>
                </div>
              ) : null}

              {group.monthly ? (
                <div className="mt-6 rounded-[1.4rem] border border-[var(--pn-border)] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--pn-muted-2)]">
                    Monthly
                  </p>
                  <div className="mt-2 flex items-end gap-3">
                    <p className="text-5xl font-black tracking-[-0.05em] text-[#111827]">
                      ${(group.monthly.unitAmount / 100).toFixed(0)}
                    </p>
                    <p className="pb-2 text-sm text-[var(--pn-muted)]">
                      {formatBillingInterval(group.monthly.interval)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-[var(--pn-muted)]">{group.monthly.summaryLine}</p>
                  <form action={checkoutAction} className="mt-4">
                    <input type="hidden" name="priceId" value={group.monthly.priceId} />
                    <SubmitButton label={group.monthly.ctaLabel} featured={Boolean(group.featured)} />
                  </form>
                </div>
              ) : null}

              {group.annual ? (
                <div className="mt-4 rounded-[1.4rem] border border-[var(--pn-soft-border)] bg-[var(--pn-soft-2)]/70 p-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--pn-muted-2)]">
                        Annual
                      </p>
                      <div className="mt-2 flex items-end gap-3">
                        <p className="text-4xl font-black tracking-[-0.05em] text-[#111827]">
                          ${(group.annual.unitAmount / 100).toFixed(0)}
                        </p>
                        <p className="pb-1 text-sm text-[var(--pn-muted)]">
                          {formatBillingInterval(group.annual.interval)}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--pn-violet)]">
                      Save ${(getAnnualSavings(group.planCode === 'single_review' ? 'starter' : group.planCode) / 100).toFixed(0)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--pn-muted)]">{group.annual.summaryLine}</p>
                  <form action={checkoutAction} className="mt-4">
                    <input type="hidden" name="priceId" value={group.annual.priceId} />
                    <SubmitButton label={group.annual.ctaLabel} featured={false} />
                  </form>
                </div>
              ) : null}

              <ul className="mt-8 flex-1 space-y-4 text-base text-[var(--pn-muted-2)]">
                {(group.oneTime || group.monthly || group.annual)?.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-none text-[var(--pn-violet)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--pn-border)]/70 bg-white/60 backdrop-blur">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr,1.05fr] lg:px-8">
          <div>
            <p className="pn-kicker">Billing Strategy</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
              Review credits control AI cost while seats and subjects make family growth clear.
            </h2>
            <div className="mt-8 space-y-4 rounded-[1.75rem] border border-[var(--pn-soft-border)] bg-[linear-gradient(180deg,var(--pn-soft-2)_0%,white_100%)] p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-[var(--pn-violet)]" />
                <p className="text-base leading-7 text-[var(--pn-muted-2)]">
                  Start with Single Review if you want proof first. Move to Starter,
                  Plus, or Family when you need long-term follow-through across
                  more learners and more active subjects.
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
                  Start from Pathnook billing management when you need to review
                  entitlements, renewals, invoices, payment methods, or
                  cancellation.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              <h3 className="text-2xl font-black text-[#111827]">Add-ons in billing management</h3>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--pn-muted)]">
                <div className="rounded-[1.1rem] bg-slate-50 p-4">
                  <p className="font-semibold text-[#111827]">
                    Add seat: +${(BILLING_ADD_ONS.seat.monthly / 100).toFixed(0)} / month or +${(BILLING_ADD_ONS.seat.annual / 100).toFixed(0)} / year
                  </p>
                  <p>{BILLING_ADD_ONS.seat.description}</p>
                </div>
                <div className="rounded-[1.1rem] bg-slate-50 p-4">
                  <p className="font-semibold text-[#111827]">
                    Add subject slot: +${(BILLING_ADD_ONS.subjectSlot.monthly / 100).toFixed(0)} / month or +${(BILLING_ADD_ONS.subjectSlot.annual / 100).toFixed(0)} / year
                  </p>
                  <p>{BILLING_ADD_ONS.subjectSlot.description}</p>
                </div>
                <div className="rounded-[1.1rem] bg-slate-50 p-4">
                  <p className="font-semibold text-[#111827]">Extra review credits</p>
                  <p>
                    {BILLING_ADD_ONS.extraReviewCredits.map((pack) => `$${(pack.unitAmount / 100).toFixed(0)} for ${pack.pack}`).join(' · ')}
                  </p>
                </div>
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
                Open billing management to review local entitlements and launch
                the Freemius billing portal. Use Pathnook support for refund
                review, entitlement questions, and access issues.
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
