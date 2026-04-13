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
          Pathnook is an AI learning and growth system that currently starts with
          family learning support. For support, billing questions, refund requests,
          or trust and policy questions, email the team directly.
        </p>

        <div className="mt-8 rounded-3xl bg-slate-50 p-6">
          <p className="text-sm font-medium text-slate-500">Support email</p>
          <a
            href="mailto:support@pathnook.com"
            className="mt-2 inline-block text-lg font-semibold text-slate-950"
          >
            support@pathnook.com
          </a>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Billing flows may be handled through the active payment provider while
            product access, entitlements, and support remain managed by Pathnook.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/pricing"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
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
        </div>
      </div>
    </main>
  );
}
