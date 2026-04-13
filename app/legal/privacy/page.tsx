export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
          Privacy
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Pathnook Privacy Policy
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
          <p>
            Pathnook stores account, billing, and learning workflow data needed to
            operate the product, support families, and maintain access controls.
          </p>
          <p>
            Payment processing may be performed by the active billing provider. Only
            the billing and account identifiers needed to complete transactions,
            manage subscriptions, and reconcile entitlements are shared.
          </p>
          <p>
            Parent-facing reports, uploads, and child learning artifacts remain part
            of the Pathnook product workflow and are not sold to third parties.
          </p>
        </div>
      </article>
    </main>
  );
}
