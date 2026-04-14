const faqItems = [
  {
    question: 'Who can use Pathnook?',
    answer:
      'Pathnook is designed for parents, guardians, and other authorized adult account holders. Children may not create accounts directly.',
  },
  {
    question: 'What does a purchase unlock?',
    answer:
      'A one-time purchase unlocks one diagnosis workflow. Monthly and annual plans unlock recurring Pathnook software access and report continuity while billing remains active.',
  },
  {
    question: 'Who handles billing?',
    answer:
      'Freemius handles checkout, invoices, recurring billing, and portal access as Merchant of Record. Pathnook handles report access, entitlements, and product support.',
  },
  {
    question: 'How do I cancel a subscription?',
    answer:
      'Recurring plans are canceled through the Freemius billing portal. Cancellation stops future renewals and does not promise retroactive refunds for prior billing periods.',
  },
  {
    question: 'What if I need a refund?',
    answer:
      'Unused one-time credits may qualify during the refund window. After a diagnosis has been completed or recurring access has already been substantially used, refunds are generally limited to exceptions like duplicate charge, technical failure, billing error, or legal requirement.',
  },
  {
    question: 'Can I share a report with a tutor?',
    answer:
      'Yes. Pathnook is designed to keep the output share-safe so another adult helper can understand the diagnosis context without digging through every original upload.',
  },
] as const;

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">FAQ</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Common Pathnook questions
        </h1>
        <div className="mt-8 space-y-4">
          {faqItems.map((item) => (
            <article key={item.question} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-semibold text-slate-950">{item.question}</h2>
              <p className="mt-2 text-base leading-8 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
