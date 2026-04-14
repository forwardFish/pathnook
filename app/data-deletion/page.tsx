export default function DataDeletionPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
          Data Deletion
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Request account or data deletion
        </h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
          <p>
            To request deletion of your Pathnook account data, email
            <strong> admin@pathnook.com</strong> and include the account email
            address you use to sign in.
          </p>
          <p>
            If your request concerns privacy-specific handling, you may also use
            the designated privacy contact listed as <strong>privacy@pathnook.com</strong>.
          </p>
          <p>
            Deletion requests may cover account records, uploads, report artifacts,
            and product history, subject to legal, billing, fraud-prevention, or
            audit retention requirements. Billing records maintained by Freemius may
            remain subject to Merchant of Record obligations.
          </p>
          <p>
            Pathnook aims to acknowledge deletion requests within 2 business days
            and explain the expected handling scope.
          </p>
        </div>
      </article>
    </main>
  );
}
