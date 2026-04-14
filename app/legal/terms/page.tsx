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
        <p className="mt-4 text-sm leading-7 text-slate-500">
          Effective date: April 14, 2026
        </p>

        <div className="mt-8 space-y-8 text-base leading-8 text-slate-600">
          <section>
            <h2 className="text-2xl font-semibold text-slate-950">1. Service description</h2>
            <p className="mt-3">
              Pathnook is software for parent-facing family learning support. The
              service may include upload handling, AI-assisted diagnosis, report
              generation, workflow continuity, and billing-linked access control.
              Pathnook is not a school, therapist, law firm, medical provider, or
              official educational authority.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">2. Eligibility and account use</h2>
            <p className="mt-3">
              Accounts may be created only by adults, including parents,
              guardians, or other authorized adults. You must provide accurate
              information, protect your login credentials, and use the product only
              for lawful purposes. Children may not create accounts directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">3. Upload rights and user content</h2>
            <p className="mt-3">
              You represent that you have the right to upload and use the materials
              you submit. You keep ownership of your content, but you grant
              Pathnook the permissions reasonably necessary to host, process,
              analyze, and display that content for the purpose of operating the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">4. AI limitations and no guarantee</h2>
            <p className="mt-3">
              Pathnook outputs are generated with AI-assisted methods and may be
              incomplete, probabilistic, or context-limited. The service does not
              guarantee academic outcomes, admission outcomes, score changes, or any
              official educational result.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">5. One-time and subscription billing</h2>
            <p className="mt-3">
              Paid access may include one-time diagnosis purchases and recurring
              monthly or annual plans. One-time purchases unlock a limited local
              entitlement. Recurring plans renew automatically until canceled and
              keep the associated Pathnook software workflow active while billing
              remains in good standing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">6. Freemius as Merchant of Record</h2>
            <p className="mt-3">
              Freemius acts as Merchant of Record for checkout, certain tax
              collection, invoicing, and subscription billing operations. Billing
              records, invoices, payment methods, and cancellation actions may be
              handled through the Freemius customer portal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">7. Cancellation and portal access</h2>
            <p className="mt-3">
              Users may cancel recurring billing through the Freemius customer
              portal. Cancellation stops future renewals but does not necessarily
              remove historically retained Pathnook access that was already earned
              under local entitlement rules. Users are responsible for canceling
              before the next renewal date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">8. Refunds</h2>
            <p className="mt-3">
              Refunds are governed by the Pathnook Refund Policy, which is
              incorporated into these terms by reference. Eligibility may depend on
              whether diagnosis credits or subscription benefits have already been
              consumed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">9. Prohibited use and termination</h2>
            <p className="mt-3">
              You may not misuse the service, reverse engineer it, upload unlawful
              content, attempt abuse or fraud, or interfere with the platform. We
              may suspend or terminate access for security, abuse, payment risk, or
              material violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">10. Liability and contact</h2>
            <p className="mt-3">
              To the extent permitted by law, Pathnook is not liable for indirect,
              incidental, special, or consequential damages. General support
              inquiries may be sent to <strong>admin@pathnook.com</strong>. Legal
              and privacy contact placeholders may be listed separately where
              required.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
