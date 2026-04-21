import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Repeated Learning Mistakes Guide',
  description:
    'Learn how Pathnook helps families identify repeated learning mistakes, supporting evidence, and the bottleneck behind them.',
  alternates: {
    canonical: '/guides/repeated-learning-mistakes'
  }
};

export default function RepeatedLearningMistakesGuidePage() {
  return (
    <PageShell
      eyebrow="Guide"
      title="How to spot repeated learning mistakes without overreacting"
      description="The goal is not to count every wrong answer equally. It is to see which pattern keeps returning and what that says about the real bottleneck."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'Guides', item: absoluteUrl('/guides') },
          {
            name: 'Repeated Learning Mistakes',
            item: absoluteUrl('/guides/repeated-learning-mistakes')
          }
        ])}
      />

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Separate repeated patterns from sporadic slips
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Some mistakes are just noise. The useful signal is the pattern that
          keeps returning across pages and still blocks progress.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6">
        <h2 className="text-2xl font-black text-[#111827]">
          Use evidence to decide what actually matters this week
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
          Once the repeated pattern is clear, families can choose a weekly focus
          with less guesswork and avoid scattering effort across too many
          issues.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/features/evidence" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            Review the evidence layer
          </Link>
          <Link href="/features/diagnosis" className="inline-flex items-center rounded-full border border-[var(--pn-border)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)] transition hover:border-[var(--pn-violet)]">
            See diagnosis
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
