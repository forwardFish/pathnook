import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Understand how Pathnook turns recent learning evidence into diagnosis, evidence, and a 7-day action plan for families.',
  alternates: {
    canonical: '/how-it-works'
  }
};

export default function HowItWorksPage() {
  return (
    <PageShell
      title="How Pathnook turns schoolwork into next-step clarity"
      description="Pathnook helps families move from raw pages to diagnosis, evidence, and a weekly plan that is easier to follow through."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'How It Works', item: absoluteUrl('/how-it-works') }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          1. Upload recent learning evidence
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--pn-muted)]">
          Parents upload recent homework, quizzes, tests, and corrections so the
          system can review real learning evidence instead of synthetic examples.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/diagnosis" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See diagnosis
          </Link>
          <Link href="/guides/math-homework-diagnosis" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Read the math diagnosis guide
          </Link>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          2. Turn pages into judgment, not just output
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--pn-muted)]">
          Pathnook groups repeated patterns, distinguishes signal from noise,
          and surfaces the weekly focus with evidence that parents and tutors
          can review together.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/evidence" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Review the evidence layer
          </Link>
          <Link href="/features/weekly-review" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See weekly review
          </Link>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          3. Turn judgment into follow-through
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--pn-muted)]">
          The 7-day plan, tutor-ready summary, and continuity workflow help
          families decide what to do next instead of restarting from scratch
          every week.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/7-day-plan" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Review the 7-day plan
          </Link>
          <Link href="/features/share-with-tutor" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Share with a tutor
          </Link>
          <Link href="/pricing" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            View pricing
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
