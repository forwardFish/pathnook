import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Math Homework Diagnosis Guide',
  description:
    'Learn how Pathnook helps families review math homework patterns, repeated mistakes, and the next best weekly step.',
  alternates: {
    canonical: '/guides/math-homework-diagnosis'
  }
};

export default function MathHomeworkDiagnosisGuidePage() {
  return (
    <PageShell
      eyebrow="Guide"
      title="How to use Pathnook for math homework diagnosis"
      description="When recent math pages look messy, the first job is to find the recurring bottleneck, not to chase every wrong answer equally."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'Guides', item: absoluteUrl('/guides') },
          {
            name: 'Math Homework Diagnosis',
            item: absoluteUrl('/guides/math-homework-diagnosis')
          }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Start from recent pages with real friction
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          The most useful upload is recent schoolwork where the child is clearly
          getting stuck. That gives Pathnook enough evidence to separate
          repeated breakdowns from one-off slips.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Look for the main pattern before choosing the next step
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Once the pattern is clear, the next question becomes what to focus on
          first this week and what can wait. That is where diagnosis becomes a
          plan instead of more review noise.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/diagnosis" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See diagnosis
          </Link>
          <Link href="/features/7-day-plan" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See the 7-day plan
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
