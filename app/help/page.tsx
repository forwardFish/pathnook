import Link from 'next/link';
import {
  FREEMIUS_BILLING_ROLE_LINE,
  ONE_TIME_REFUND_WINDOW_DAYS,
  PUBLIC_CONTACT_EMAIL,
  SUBSCRIPTION_REFUND_WINDOW_DAYS,
} from '@/lib/site/public-trust';

const helpCards = [
  {
    title: 'Billing management and portal help',
    body: `${FREEMIUS_BILLING_ROLE_LINE} Start from Pathnook billing management to review local access, then open the Freemius billing portal when billing actions are needed.`,
    links: [
      { href: '/sign-in?redirect=%2Fdashboard%2Fbilling', label: 'Open billing management' },
      { href: '/faq', label: 'Read billing FAQ' },
    ],
  },
  {
    title: 'Refunds and charge review',
    body: `Unused one-time diagnosis credits may be reviewed for refund within ${ONE_TIME_REFUND_WINDOW_DAYS} days of purchase. Recurring-plan refund review is generally limited to the first ${SUBSCRIPTION_REFUND_WINDOW_DAYS} days of the initial billing cycle, subject to actual usage and local law.`,
    links: [
      { href: '/legal/refunds', label: 'Read refund policy' },
      { href: `mailto:${PUBLIC_CONTACT_EMAIL}`, label: 'Email Pathnook' },
    ],
  },
  {
    title: 'Uploads, access, and deletion requests',
    body: 'Adult account holders control uploads, diagnosis history, and any later sharing. Use the public trust routes below if you need account correction, deletion, privacy handling, or product-access help.',
    links: [
      { href: '/data-deletion', label: 'Request data deletion' },
      { href: '/contact', label: 'Contact Pathnook' },
    ],
  },
] as const;

const supportFaq = [
  {
    question: 'Where should I start if billing looks wrong?',
    answer:
      'Start with Pathnook billing management. That page shows local plan effects, unlocked access, and links to the Freemius billing portal for invoices, payment methods, renewals, and cancellation.',
  },
  {
    question: 'What if a payment succeeded but access did not update?',
    answer:
      `Email ${PUBLIC_CONTACT_EMAIL} with the purchase email and order details. Pathnook reviews entitlement sync, while Freemius remains the Merchant of Record for payment records and billing operations.`,
  },
  {
    question: 'How do refund reviews work?',
    answer:
      `Refund review depends on actual usage. Unused one-time diagnosis credits may be reviewed within ${ONE_TIME_REFUND_WINDOW_DAYS} days. Recurring plans are generally reviewed only during the first ${SUBSCRIPTION_REFUND_WINDOW_DAYS} days of the initial billing cycle unless a duplicate charge, technical failure, unauthorized charge confirmed after review, or legal requirement applies.`,
  },
  {
    question: 'How do privacy and deletion requests work?',
    answer:
      `Use ${PUBLIC_CONTACT_EMAIL} for privacy, export, correction, or deletion requests. Pathnook may keep limited records where required for billing reconciliation, fraud prevention, tax obligations, security review, or legal compliance.`,
  },
] as const;

export default function HelpPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Help</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Help for billing, access, refunds, and trust requests
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Pathnook keeps the public help surface explicit: Freemius handles
          billing operations, Pathnook handles local access and product support,
          and one public inbox handles support, privacy, refund, and legal
          questions.
        </p>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {helpCards.map((card) => (
          <article key={card.title} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">{card.title}</h2>
            <p className="mt-3 text-base leading-8 text-slate-600">{card.body}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {card.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Support FAQ
        </p>
        <div className="mt-6 space-y-4">
          {supportFaq.map((item) => (
            <article key={item.question} className="rounded-[1.4rem] border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-semibold text-slate-950">{item.question}</h2>
              <p className="mt-2 text-base leading-8 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
