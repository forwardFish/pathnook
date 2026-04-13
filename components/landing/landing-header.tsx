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
          ? "border-b border-sky-100/80 bg-white/92 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          : "bg-white/72 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Pathnook home">
          <FamilyLogo size="md" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {landingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-base font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="outline" className="rounded-full border-slate-300">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-slate-950 px-6 text-white hover:bg-slate-800"
          >
            <Link href="/sign-up?redirect=dashboard">
              Start a Diagnosis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
          onClick={() => setIsMenuOpen((value) => !value)}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-slate-200 bg-white transition-[max-height,opacity] duration-300 lg:hidden",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
          {landingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 grid gap-3 pt-3">
            <Button asChild variant="outline" className="rounded-full border-slate-300">
              <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-slate-950 text-white hover:bg-slate-800"
            >
              <Link
                href="/sign-up?redirect=dashboard"
                onClick={() => setIsMenuOpen(false)}
              >
                Start a Diagnosis
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
