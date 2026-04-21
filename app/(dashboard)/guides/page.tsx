import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/marketing/PageShell';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { GUIDE_LINKS, absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Read Pathnook guides about diagnosis, weekly review, repeated learning mistakes, and sharing reports with tutors.',
  alternates: {
    canonical: '/guides'
  }
};

export default function GuidesIndexPage() {
  return (
    <PageShell
      eyebrow="Guides"
      title="Pathnook guides"
      description="Search-focused guides that explain how diagnosis, evidence, weekly review, and tutor handoff work in practice."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: absoluteUrl('/') },
          { name: 'Guides', item: absoluteUrl('/guides') }
        ])}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {GUIDE_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[1.75rem] border border-[var(--pn-border)] bg-white p-6 transition hover:border-[var(--pn-violet)]"
          >
            <div className="text-xl font-black text-[#111827]">{item.label}</div>
            <div className="mt-3 text-base leading-8 text-[var(--pn-muted)]">
              Read how this Pathnook workflow supports diagnosis, follow-through,
              and better weekly learning decisions.
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
