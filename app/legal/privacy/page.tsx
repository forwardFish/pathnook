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
        <p className="mt-4 text-sm leading-7 text-slate-500">
          Effective date: April 14, 2026
        </p>

        <div className="mt-8 space-y-8 text-base leading-8 text-slate-600">
          <section>
            <h2 className="text-2xl font-semibold text-slate-950">1. Operator and eligibility</h2>
            <p className="mt-3">
              This policy applies to Pathnook at www.pathnook.com and the related
              product surfaces operated by <strong>[LEGAL ENTITY NAME]</strong>.
              Pathnook is designed for adult account holders, including parents,
              guardians, and other authorized adults supporting a child&apos;s
              learning workflow. Children may not create accounts directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">2. Information we collect</h2>
            <p className="mt-3">
              We collect account information such as email address, authentication
              records, household membership, and support correspondence. We also
              collect product data such as uploads, diagnosis artifacts, report
              summaries, entitlement records, billing references, device or browser
              logs, and operational security events needed to run the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">3. Child and student-related information</h2>
            <p className="mt-3">
              Pathnook may process learning materials that relate to a child or
              student when an adult account holder uploads that material. The adult
              user is responsible for having the right to upload, review, and share
              the material. We ask users to upload only what is reasonably needed
              for the diagnosis and support workflow.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">4. How we use information</h2>
            <p className="mt-3">
              We use information to create and protect accounts, run diagnosis
              workflows, generate reports, maintain entitlements, support customer
              service, investigate abuse, improve reliability, and comply with legal
              obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">5. AI and model processing</h2>
            <p className="mt-3">
              Pathnook uses AI-assisted processing to analyze uploaded learning
              evidence and produce structured outputs. AI-generated content may be
              probabilistic and should be treated as decision support rather than a
              guaranteed or official educational judgment. Human review, family
              context, and source evidence remain important.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">6. Freemius billing role</h2>
            <p className="mt-3">
              Freemius acts as Merchant of Record for checkout, recurring billing,
              invoicing, and certain payment-related tax operations. To complete a
              purchase, we may share necessary transaction identifiers, account
              email, and product reference information with Freemius. Pathnook does
              not publish full card details inside the application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">7. Retention</h2>
            <p className="mt-3">
              We retain data for as long as needed to operate the service, preserve
              report history, support billing reconciliation, enforce security, and
              comply with legal obligations. Some records may remain longer when
              required for tax, fraud prevention, audit, or dispute handling.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">8. Your rights</h2>
            <p className="mt-3">
              Depending on your location, you may request access, correction,
              deletion, export, or restriction of certain information. You may also
              ask to close your account or withdraw certain marketing preferences.
              Use the data deletion page or contact Pathnook directly for account
              and privacy requests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">9. Security and international processing</h2>
            <p className="mt-3">
              We use reasonable administrative, technical, and organizational
              safeguards such as access control, encrypted transport, least-privilege
              handling, and operational monitoring. Data may be processed in more
              than one jurisdiction depending on infrastructure and service
              providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950">10. Contact</h2>
            <p className="mt-3">
              General support: <strong>admin@pathnook.com</strong>. Privacy
              requests: <strong>privacy@pathnook.com</strong>. For billing records,
              invoices, and subscription management, users may also interact with
              Freemius through the billing portal.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
