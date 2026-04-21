import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Weekly Review',
  description:
    'See how Pathnook supports weekly learning review, continuity, and better next-step decisions across uploads and follow-through.',
  alternates: {
    canonical: '/features/weekly-review'
  }
};

export default function WeeklyReviewFeaturePage() {
  return (
    <PageShell
      eyebrow="Feature"
      title="Weekly review that keeps continuity visible"
      description="Pathnook is designed so each upload contributes to a clearer weekly picture instead of disappearing as a one-time report."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'Features', item: absoluteUrl('/features/weekly-review') },
          { name: 'Weekly Review', item: absoluteUrl('/features/weekly-review') }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Review progress with the current week in mind
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          The weekly review surface helps families reconnect diagnosis, recent
          evidence, and the current plan so the next action is easier to choose.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/7-day-plan" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See the 7-day plan
          </Link>
          <Link href="/guides/weekly-learning-review" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Read the weekly review guide
          </Link>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Make comparison useful instead of noisy
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Weekly review is strongest when it shows what changed, what held, and
          what still needs attention without forcing parents to reconstruct the
          whole story manually.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/for-parents" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Explore the parent path
          </Link>
          <Link href="/pricing" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            View pricing
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
