import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Learning Diagnosis',
  description:
    'See how Pathnook turns recent homework, quizzes, and corrections into a clear diagnosis with evidence and weekly focus.',
  alternates: {
    canonical: '/features/diagnosis'
  }
};

export default function DiagnosisFeaturePage() {
  return (
    <PageShell
      eyebrow="Feature"
      title="Evidence-backed learning diagnosis"
      description="Pathnook turns recent homework, quizzes, and corrections into a diagnosis that distinguishes the main issue from surface-level noise."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'Features', item: absoluteUrl('/features/diagnosis') },
          { name: 'Diagnosis', item: absoluteUrl('/features/diagnosis') }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          What a real diagnosis should answer
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          A real diagnosis clarifies the primary issue, secondary issue, pattern
          versus sporadic mistakes, and what should not be overreacted to this
          week.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/pricing" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            View pricing
          </Link>
          <Link href="/guides/math-homework-diagnosis" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Read the guide
          </Link>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Why diagnosis is different from answer-checking
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Pathnook is not just about whether a question was wrong. It is about
          the pattern behind repeated breakdowns and the most valuable next fix.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/evidence" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See how evidence is shown
          </Link>
          <Link href="/features/7-day-plan" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See how diagnosis becomes a plan
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
