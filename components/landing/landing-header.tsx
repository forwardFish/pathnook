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
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-5 px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Pathnook home">
          <FamilyLogo size="lg" showSubtitle={false} textClassName="text-[#202643]" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-3 px-8 lg:flex xl:gap-4">
          {landingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="pn-link-chip whitespace-nowrap xl:px-6"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-[1rem] border-[var(--pn-border)] bg-white/90 px-6 text-[15px] font-semibold text-[var(--pn-text)] shadow-[0_14px_34px_rgba(15,23,42,0.05)]"
          >
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button
            asChild
            className="h-12 rounded-[1rem] px-6 text-[15px] font-semibold shadow-[0_18px_44px_rgba(124,58,237,0.28)]"
          >
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
