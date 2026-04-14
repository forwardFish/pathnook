import Link from 'next/link';

const helpCards = [
  {
    title: 'Billing and portal help',
    body: 'Use the Freemius billing portal for invoices, payment methods, renewals, and cancellation. Use Pathnook support if local access or entitlements look wrong after purchase.',
    links: [
      { href: '/sign-in?redirect=%2Fdashboard%2Fbilling', label: 'Open billing portal' },
      { href: '/faq', label: 'Read billing FAQ' },
    ],
  },
  {
    title: 'Uploads and diagnosis',
    body: 'Pathnook is software for parents. Upload learning evidence, receive a structured diagnosis, and review the next shortest useful action with the family.',
    links: [
      { href: '/sample-report', label: 'Preview a sample report' },
      { href: '/pricing', label: 'See pricing' },
    ],
  },
  {
    title: 'Trust and account requests',
    body: 'Privacy, refunds, and deletion requests should be easy to find. Use the public trust routes below if you need policy details or want to contact the team.',
    links: [
      { href: '/data-deletion', label: 'Request data deletion' },
      { href: '/contact', label: 'Contact Pathnook' },
    ],
  },
] as const;

export default function HelpPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Help</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Help for billing, diagnosis flow, and trust requests
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Pathnook keeps the public help surface simple: billing through Freemius,
          product access through Pathnook, and clear routes for privacy, refunds,
          and account support.
        </p>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {helpCards.map((card) => (
          <article key={card.title} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">{card.title}</h2>
            <p className="mt-3 text-base leading-8 text-slate-600">{card.body}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {card.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
