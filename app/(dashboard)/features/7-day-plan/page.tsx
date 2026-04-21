import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: '7-Day Plan',
  description:
    'See how Pathnook turns diagnosis into a 7-day action plan with a weekly focus, practical prompts, and follow-through checkpoints.',
  alternates: {
    canonical: '/features/7-day-plan'
  }
};

export default function SevenDayPlanFeaturePage() {
  return (
    <PageShell
      eyebrow="Feature"
      title="Turn diagnosis into a 7-day action plan"
      description="The Pathnook plan layer turns diagnosis into concrete weekly focus, parent prompts, and success checks that make follow-through easier."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'Features', item: absoluteUrl('/features/7-day-plan') },
          { name: '7-Day Plan', item: absoluteUrl('/features/7-day-plan') }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Focus one week at a time
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          The plan narrows the week down to one focus, one practical next step,
          and a clearer sense of what can wait so families do not overload the
          child.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/how-it-works" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See the full workflow
          </Link>
          <Link href="/for-parents" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Explore the parent path
          </Link>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Build toward continuity, not a one-off report
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Each weekly plan should make the next review clearer, which is why it
          connects naturally into weekly review and later comparison.
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
