import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Weekly Learning Review Guide',
  description:
    'Learn how Pathnook supports weekly learning review, continuity, and clearer parent decisions across repeated uploads.',
  alternates: {
    canonical: '/guides/weekly-learning-review'
  }
};

export default function WeeklyLearningReviewGuidePage() {
  return (
    <PageShell
      eyebrow="Guide"
      title="How to run a clearer weekly learning review"
      description="A useful weekly review connects the latest evidence to the current focus, what changed, and what the family should do next."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'Guides', item: absoluteUrl('/guides') },
          {
            name: 'Weekly Learning Review',
            item: absoluteUrl('/guides/weekly-learning-review')
          }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Reconnect evidence, judgment, and action
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Weekly review works when parents can see what held, what changed, and
          what the next step should be without recreating the whole story from
          memory.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Keep the next week small enough to follow through
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          The best review does not expand the plan endlessly. It narrows the
          week down to the highest-value action and makes continuity easier.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/weekly-review" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See weekly review
          </Link>
          <Link href="/features/7-day-plan" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See the 7-day plan
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
