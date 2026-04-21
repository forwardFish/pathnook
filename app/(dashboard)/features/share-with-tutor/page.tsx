import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Share with Tutor',
  description:
    'See how Pathnook helps parents share an evidence-backed tutor summary without losing the weekly focus and context.',
  alternates: {
    canonical: '/features/share-with-tutor'
  }
};

export default function ShareWithTutorFeaturePage() {
  return (
    <PageShell
      eyebrow="Feature"
      title="Share a tutor-ready summary without losing context"
      description="Pathnook helps parents hand off the diagnosis, evidence, and next-step focus in a form tutors can read quickly and act on."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'Features', item: absoluteUrl('/features/share-with-tutor') },
          {
            name: 'Share with Tutor',
            item: absoluteUrl('/features/share-with-tutor')
          }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Keep the family context visible
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Tutor handoff works better when the report already explains what the
          family is seeing, which pattern matters, and what the current week is
          trying to achieve.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/for-tutors" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Explore the tutor path
          </Link>
          <Link href="/guides/share-with-a-tutor" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Read the sharing guide
          </Link>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Move from handoff to weekly continuity
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Shared summaries are strongest when they connect into weekly review,
          so everyone sees the same focus instead of running separate plans.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/weekly-review" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See weekly review
          </Link>
          <Link href="/contact" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Contact Pathnook
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
