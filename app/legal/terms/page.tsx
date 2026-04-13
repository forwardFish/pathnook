export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
          Terms
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Pathnook Terms of Service
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
          <p>
            Pathnook currently provides AI-assisted family learning support, billing
            access management, and report unlock workflows through the existing
            household dashboard.
          </p>
          <p>
            Paid access may include one-time unlocks or recurring plans. Access and
            historical entitlement behavior are governed by Pathnook&apos;s local
            product entitlement records, even when payment events originate from a
            third-party billing provider.
          </p>
          <p>
            Families are responsible for maintaining lawful rights to upload and
            review the academic materials they submit to the product.
          </p>
        </div>
      </article>
    </main>
  );
}
