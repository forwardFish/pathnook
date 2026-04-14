import Link from 'next/link';
import {
  FREEMIUS_BILLING_ROLE_LINE,
  PUBLIC_CONTACT_EMAIL,
  PUBLIC_OPERATOR_LINE,
  PUBLIC_OPERATOR_SHORT,
} from '@/lib/site/public-trust';

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
          Contact
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Contact Pathnook
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Pathnook is an AI learning and growth system that currently starts
          with family learning support and structured weekly follow-through.
          This page is the public support, legal, and billing-help hub for the
          service.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-sm font-medium text-slate-500">Operator</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{PUBLIC_OPERATOR_SHORT}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{PUBLIC_OPERATOR_LINE}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-sm font-medium text-slate-500">Unified public inbox</p>
            <a
              href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
              className="mt-2 inline-block text-lg font-semibold text-slate-950"
            >
              {PUBLIC_CONTACT_EMAIL}
            </a>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Use this address for support, refund review, privacy requests,
              billing help, and legal contact. Pathnook aims to reply within 2
              business days.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm font-medium text-slate-500">Billing and subscription help</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {FREEMIUS_BILLING_ROLE_LINE}
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Start from Pathnook billing management if you need to check local
              access, household entitlements, or report history. Open the
              Freemius billing portal from there when you need invoices, payment
              methods, renewals, or cancellation.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm font-medium text-slate-500">Privacy and deletion requests</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Adult account holders can use the same inbox for privacy, export,
              correction, and deletion requests. Pathnook may keep limited
              records when required for billing reconciliation, fraud prevention,
              tax obligations, security review, or legal compliance.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              If your request concerns a charge handled by Freemius, Pathnook may
              coordinate with Freemius as Merchant of Record before confirming the
              final outcome.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/sign-in?redirect=%2Fdashboard%2Fbilling"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
          >
            Open billing management
          </Link>
          <Link
            href="/help"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900"
          >
            Help center
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900"
          >
            View pricing
          </Link>
          <Link
            href="/faq"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900"
          >
            Billing FAQ
          </Link>
          <Link
            href="/legal/privacy"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900"
          >
            Privacy policy
          </Link>
          <Link
            href="/legal/terms"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900"
          >
            Terms
          </Link>
          <Link
            href="/legal/refunds"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900"
          >
            Refund policy
          </Link>
          <Link
            href="/data-deletion"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900"
          >
            Data deletion
          </Link>
        </div>
      </div>
    </main>
  );
}
