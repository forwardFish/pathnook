import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'For Tutors',
  description:
    'Pathnook helps tutors enter faster with evidence-backed diagnosis, weekly focus, and tutor-ready summaries.',
  alternates: {
    canonical: '/for-tutors'
  }
};

export default function ForTutorsPage() {
  return (
    <PageShell
      title="Pathnook for tutors"
      description="Use tutor-ready summaries and evidence-backed reports to get into context faster and spend less time reconstructing the learning picture from scratch."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'For Tutors', item: absoluteUrl('/for-tutors') }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Start from evidence instead of guesswork
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Reports summarize repeated issues, supporting evidence, and the
          current weekly focus so tutors can enter with context rather than
          re-diagnosing from zero.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/evidence" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See evidence
          </Link>
          <Link href="/features/diagnosis" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Review diagnosis
          </Link>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Use share-with-tutor as the handoff layer
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Parents can share a focused tutor-ready summary that helps a tutor
          quickly understand what matters and what to work on next.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/share-with-tutor" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See tutor sharing
          </Link>
          <Link href="/contact" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Contact Pathnook
          </Link>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Support weekly continuity
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          The goal is not a one-off report. It is continuity across uploads,
          weekly review, and next-best-action decisions.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/weekly-review" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See weekly review
          </Link>
          <Link href="/pricing" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            View pricing
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
