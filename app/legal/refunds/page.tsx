export default function RefundsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
          Refunds
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Pathnook Refund Policy
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
          <p>
            Families should contact Pathnook support first for billing questions,
            duplicate charges, or entitlement mismatches.
          </p>
          <p>
            Refund processing may require coordination with the active billing
            provider, but the customer-facing policy and support path remain owned by
            Pathnook.
          </p>
          <p>
            One-time unlock disputes and recurring subscription issues should be sent
            to support@pathnook.com with the account email and purchase date.
          </p>
        </div>
      </article>
    </main>
  );
}
