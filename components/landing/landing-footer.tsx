"use client";

import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { FamilyLogoStatic } from "@/components/branding/family-logo";
import { landingNavItems, landingSupportEmail } from "./landing-nav";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Public Pricing", href: "/pricing" },
      { label: "Create Account", href: "/sign-up?redirect=dashboard" },
      { label: "Sign In", href: "/sign-in" },
    ],
  },
  {
    title: "Workflow",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "What ships today",
    links: [
      { label: "Bilingual reports", href: "#features" },
      { label: "PDF export", href: "#features" },
      { label: "Tutor handoff", href: "#testimonials" },
      { label: "Weekly review rhythm", href: "#features" },
    ],
  },
];

export function LandingFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-white" data-testid="landing-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 py-16 lg:grid-cols-[1.2fr,1fr,1fr,1fr]">
          <div>
            <FamilyLogoStatic
              size="md"
              textClassName="text-white"
              subtitleClassName="text-slate-400"
            />
            <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
              Upload recent work, inspect the evidence, export the report, and
              share only the approved handoff. The landing should look complete,
              but the promise stays honest.
            </p>
            <a
              href={`mailto:${landingSupportEmail}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              {landingSupportEmail}
            </a>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-slate-300 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            {landingNavItems.map((item) => (
              <Link
                key={`footer-${item.href}`}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <span>Copyright 2026 FamilyEducation. Local acceptance build.</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
