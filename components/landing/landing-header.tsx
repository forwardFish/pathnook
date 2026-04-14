"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { FamilyLogo } from "@/components/branding/family-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { landingNavItems } from "./landing-nav";

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "pn-topbar"
          : "bg-white/72 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Pathnook home">
          <FamilyLogo size="md" showSubtitle={false} textClassName="text-[#2f3455]" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-2 px-6 lg:flex xl:gap-3">
          {landingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="pn-link-chip whitespace-nowrap xl:px-5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="outline" className="rounded-[1rem] px-5">
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button asChild className="rounded-[1rem] px-5">
            <Link href="/sign-up?redirect=dashboard">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[var(--pn-border)] bg-white/92 text-[var(--pn-text)] shadow-[0_12px_36px_rgba(15,23,42,0.08)] lg:hidden"
          onClick={() => setIsMenuOpen((value) => !value)}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-[var(--pn-border)] bg-white/95 transition-[max-height,opacity] duration-300 lg:hidden",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
          {landingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1rem] px-4 py-3 text-sm font-semibold text-[var(--pn-muted-2)] transition hover:bg-[var(--pn-soft)] hover:text-[var(--pn-text)]"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 grid gap-3 pt-3">
            <Button asChild variant="outline" className="rounded-[1rem]">
              <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                Log in
              </Link>
            </Button>
            <Button asChild className="rounded-[1rem]">
              <Link
                href="/sign-up?redirect=dashboard"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
