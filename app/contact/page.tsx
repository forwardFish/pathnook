import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
          Contact
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Contact Pathnook
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Pathnook is an AI learning and growth system that currently starts
          with family learning support and structured weekly follow-through.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-sm font-medium text-slate-500">Operator</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">[LEGAL ENTITY NAME]</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Pathnook runs at <span className="font-medium">www.pathnook.com</span>.
              This public contact structure is provided for product, privacy, and
              billing-support escalation.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-sm font-medium text-slate-500">Product support</p>
            <a
              href="mailto:support@pathnook.com"
              className="mt-2 inline-block text-lg font-semibold text-slate-950"
            >
              support@pathnook.com
            </a>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Typical response time: within 2 business days.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 p-6">
          <p className="text-sm font-medium text-slate-500">Privacy contact</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">privacy@pathnook.com</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Payments are processed by Freemius as Merchant of Record. Pathnook
            manages product access, report entitlements, uploads, and household
            workflow history inside the app.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            For billing and subscription management, please use the Freemius
            customer portal where available, or contact us if you need help
            locating the correct billing record.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/sign-in?redirect=%2Fdashboard%2Fbilling"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
          >
            Open billing portal
          </Link>
          <Link
            href="/faq"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900"
          >
            FAQ
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
