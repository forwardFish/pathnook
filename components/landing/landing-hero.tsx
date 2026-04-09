"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  FileOutput,
  Languages,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const workflowSteps = [
  "Upload 5 to 10 pages from homework, quizzes, or corrections.",
  "Review the diagnosis, evidence anchors, and weekly action plan.",
  "Export the parent report as PDF or hand the brief to a tutor.",
];

const highlightCards = [
  { label: "Report language", value: "EN / ES toggle", icon: Languages },
  { label: "Release gate", value: "Admin-reviewed", icon: ShieldCheck },
  { label: "Tutor handoff", value: "Owner-scoped share", icon: UsersRound },
  { label: "Export", value: "PDF aligned to page copy", icon: FileOutput },
];

export function LandingHero() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-16 sm:pb-24"
      data-testid="landing-hero"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#dbeafe_0%,rgba(255,255,255,0)_42%),radial-gradient(circle_at_80%_18%,rgba(251,146,60,0.16),rgba(255,255,255,0)_28%),linear-gradient(180deg,#f8fbff_0%,#ffffff_72%)]" />
      <div className="absolute inset-x-0 top-28 mx-auto h-72 max-w-5xl rounded-full bg-sky-200/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr,0.98fr] lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center rounded-full border border-sky-200 bg-white/85 px-5 py-2.5 text-base font-medium text-sky-900 shadow-sm">
            <BadgeCheck className="mr-2 h-4 w-4 text-sky-600" />
            Family-owned diagnosis workflow
          </div>

          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-[5.6rem] lg:leading-[0.98]">
            Turn a messy stack of math pages into an
            <span className="bg-[linear-gradient(135deg,#0f766e_0%,#2563eb_48%,#f97316_100%)] bg-clip-text text-transparent">
              {" "}evidence-backed family action plan
            </span>
            .
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600 lg:mx-0 lg:text-2xl">
            FamilyEducation helps parents upload recent work, surface repeated
            error patterns, export bilingual reports, and hand off a concise
            brief to the tutor without losing the evidence trail.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:items-start">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-slate-950 px-8 text-base text-white hover:bg-slate-800 sm:w-auto"
            >
              <Link href="/sign-up?redirect=dashboard" data-testid="hero-primary-cta">
                Try a Diagnosis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-slate-300 bg-white/90 px-8 text-base text-slate-900 hover:bg-slate-50 sm:w-auto"
            >
              <Link href="/pricing" data-testid="hero-secondary-cta">
                See Pricing
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="w-full rounded-full px-6 text-base text-slate-700 hover:bg-white/80 sm:w-auto"
            >
              <Link href="#how-it-works" data-testid="hero-tertiary-cta">
                See How It Works
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {workflowSteps.map((step) => (
              <div
                key={step}
                className="rounded-3xl border border-white/90 bg-white/80 p-5 text-base leading-7 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur"
              >
                {step}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: "easeOut" }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-sky-100 bg-white/88 p-5 shadow-[0_28px_110px_rgba(37,99,235,0.18)] backdrop-blur">
            <div className="rounded-[1.6rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-sky-200">
                    Family workflow preview
                  </p>
                  <p className="mt-1 text-xl font-medium">Diagnosis release board</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-200">
                  Ready for export
                </span>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr,0.95fr]">
                <div className="space-y-3 rounded-[1.4rem] bg-white/6 p-4">
                  <div className="rounded-2xl bg-white px-4 py-3 text-slate-900">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-700">
                      Child snapshot
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      Repeated regrouping errors
                    </p>
                    <p className="mt-2 text-base leading-7 text-slate-600">
                      Four evidence anchors across pages 2 and 4. Weekly plan
                      suggests a 10 minute place-value reset before new work.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-sky-500/15 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-sky-200">
                        Evidence
                      </p>
                      <p className="mt-2 text-2xl font-semibold">4 anchors</p>
                      <p className="mt-1 text-base text-slate-200">
                        Overlay-ready page references
                      </p>
                    </div>
                    <div className="rounded-2xl bg-orange-400/15 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-orange-100">
                        This week
                      </p>
                      <p className="mt-2 text-2xl font-semibold">7 day plan</p>
                      <p className="mt-1 text-base text-slate-200">
                        Family action steps
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.4rem] bg-white p-4 text-slate-900">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Release checklist
                  </p>
                  <div className="mt-4 space-y-3">
                    {highlightCards.map((card) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={card.label}
                          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                        >
                          <div className="rounded-2xl bg-slate-950 p-2 text-white">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-base font-medium text-slate-900">
                              {card.label}
                            </p>
                            <p className="mt-1 text-base text-slate-600">
                              {card.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-3 top-20 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-lg">
            Weekly review ready
          </div>
          <div className="absolute -right-4 bottom-10 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-700 shadow-lg">
            PDF export in selected language
          </div>
        </motion.div>
      </div>
    </section>
  );
}
