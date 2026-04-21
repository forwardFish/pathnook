import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'For Parents',
  description:
    'Pathnook helps parents turn recent learning evidence into diagnosis, evidence, and a 7-day action plan they can actually use.',
  alternates: {
    canonical: '/for-parents'
  }
};

export default function ForParentsPage() {
  return (
    <PageShell
      title="Pathnook for parents"
      description="Built for parents who need clearer judgment, less guessing, and a practical next step after homework, quizzes, and corrections."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'For Parents', item: absoluteUrl('/for-parents') }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          See the real problem, not just the wrong answer
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Pathnook focuses on repeated learning patterns, weekly focus, and what
          not to overreact to, so parents can stop guessing what matters most.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/diagnosis" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See diagnosis
          </Link>
          <Link href="/features/evidence" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See evidence
          </Link>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Get a plan you can actually use this week
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          The plan layer is designed for follow-through: parent prompts, success
          checks, and guidance on what not to push first this week.
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
          Keep continuity week after week
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Parents come back because the system keeps continuity visible: weekly
          review, compare, and a current focus instead of a fresh restart every
          time.
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
