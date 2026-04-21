import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Evidence Layer',
  description:
    'Review how Pathnook presents supporting evidence, repeated patterns, and confidence signals behind each learning diagnosis.',
  alternates: {
    canonical: '/features/evidence'
  }
};

export default function EvidenceFeaturePage() {
  return (
    <PageShell
      eyebrow="Feature"
      title="See the evidence behind the judgment"
      description="Pathnook keeps the reasoning visible so families can review patterns, confidence, and the exact evidence behind the weekly focus."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'Features', item: absoluteUrl('/features/evidence') },
          { name: 'Evidence', item: absoluteUrl('/features/evidence') }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Show the pattern, not just the conclusion
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Families need to see why a pattern matters, which pages support it,
          and where uncertainty is still present before they decide what to do
          next.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/diagnosis" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Review diagnosis
          </Link>
          <Link href="/guides/repeated-learning-mistakes" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Read the repeated mistakes guide
          </Link>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Make tutor handoff easier
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          When a tutor joins, the evidence layer helps them enter faster because
          the reasoning, examples, and current focus are already organized.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/share-with-tutor" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See tutor sharing
          </Link>
          <Link href="/for-tutors" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Explore Pathnook for tutors
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
