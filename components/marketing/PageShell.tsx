import Link from 'next/link';
import type { ReactNode } from 'react';
import { LandingFooter } from '@/components/landing/landing-footer';
import { LandingHeader } from '@/components/landing/landing-header';
import { FEATURE_LINKS, FOOTER_LINKS, GUIDE_LINKS } from '@/lib/seo/site';

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children
}: PageShellProps) {
  return (
    <section className="pn-page-shell flex min-h-screen flex-col">
      <LandingHeader />
      <div className="pt-24 sm:pt-28">
        <main className="pn-doc-shell max-w-[1180px]">
          <section className="pn-doc-card">
            {eyebrow ? <p className="pn-kicker">{eyebrow}</p> : null}
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-[var(--pn-muted)]">
              {description}
            </p>
            <div className="mt-10 grid gap-6">{children}</div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="pn-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--pn-muted)]">
                Feature Paths
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {FEATURE_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-semibold text-[var(--pn-text)] hover:text-[var(--pn-violet)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </article>

            <article className="pn-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--pn-muted)]">
                Guides
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {GUIDE_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-semibold text-[var(--pn-text)] hover:text-[var(--pn-violet)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </article>

            <article className="pn-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--pn-muted)]">
                Public Pages
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {FOOTER_LINKS.slice(0, 6).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-semibold text-[var(--pn-text)] hover:text-[var(--pn-violet)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </article>
          </section>
        </main>
      </div>
      <LandingFooter />
    </section>
  );
}
