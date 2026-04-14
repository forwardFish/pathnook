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
        <p className="mt-4 text-sm leading-7 text-slate-500">
          Effective date: April 14, 2026
        </p>

        <div className="mt-8 space-y-8 text-base leading-8 text-slate-600">
          <section>
            <h2 className="text-2xl font-semibold text-slate-950">1. Policy approach</h2>
            <p className="mt-3">
              Pathnook uses a consumptive-usage approach. Refund eligibility may
              depend on whether a diagnosis credit, generated report, or recurring
              plan benefit has already been consumed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">2. One-time diagnosis purchases</h2>
            <p className="mt-3">
              Unused one-time diagnosis credits may qualify for review within the
              applicable refund window. Once a diagnosis has been completed, a
              report has been generated, or the credit has otherwise been consumed,
              refunds are generally not available except in cases of duplicate
              charge, technical failure, billing error, or legal requirement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">3. Subscription plans</h2>
            <p className="mt-3">
              Monthly and annual plans renew automatically until canceled. Limited
              refund review may be available during the first billing cycle when the
              service was not materially usable as described. After a recurring plan
              has already provided substantial access or historical continuity,
              refunds are generally not granted for elapsed billing periods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">4. Exceptions</h2>
            <p className="mt-3">
              We may review refunds outside the standard rule for duplicate charges,
              technical failures that blocked normal use, obvious billing mistakes,
              unauthorized charges that are confirmed after review, or where refund
              is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">5. How to request a refund</h2>
            <p className="mt-3">
              Email <strong>admin@pathnook.com</strong> with the purchase email,
              order date, and a short description of the issue. If the payment was
              processed through Freemius, review and fulfillment may involve
              coordination with Freemius as Merchant of Record. Pathnook aims to
              reply within 2 business days.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
