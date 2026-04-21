import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Share with a Tutor Guide',
  description:
    'Learn how Pathnook helps parents share a tutor-ready report while keeping the current focus and evidence intact.',
  alternates: {
    canonical: '/guides/share-with-a-tutor'
  }
};

export default function ShareWithTutorGuidePage() {
  return (
    <PageShell
      eyebrow="Guide"
      title="How to share a learning diagnosis with a tutor"
      description="Tutor sharing works best when the evidence, current focus, and practical next step stay visible instead of turning into another disconnected summary."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'Guides', item: absoluteUrl('/guides') },
          {
            name: 'Share with a Tutor',
            item: absoluteUrl('/guides/share-with-a-tutor')
          }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Share the signal, not just the pages
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          A good tutor handoff explains which repeated pattern matters, what the
          family is trying to change this week, and which evidence supports that
          judgment.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Keep the weekly focus aligned
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Shared context is strongest when it flows into the same weekly review
          and next-step plan the family is already using.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/share-with-tutor" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See the share feature
          </Link>
          <Link href="/features/weekly-review" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Review weekly continuity
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
