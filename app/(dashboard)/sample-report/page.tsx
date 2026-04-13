import Link from "next/link";
import {
  ArrowRight,
  FileSearch,
  Layers3,
  MessageSquareShare,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleSections = [
  {
    title: "Diagnosis",
    body: "A short explanation of the main issue, the secondary issue, and what matters most right now.",
    icon: FileSearch,
  },
  {
    title: "Evidence",
    body: "Every important finding stays attached to real student work so the summary is grounded instead of vague.",
    icon: Layers3,
  },
  {
    title: "This week",
    body: "The weekly plan keeps the family focused on what to do now and what can wait.",
    icon: Target,
  },
  {
    title: "Share",
    body: "A tutor-ready handoff preserves the same context when outside support is useful.",
    icon: MessageSquareShare,
  },
] as const;

export default function SampleReportPage() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[linear-gradient(180deg,#f8fcfb_0%,#ffffff_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
            Sample Report
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            A preview of the Pathnook family review output.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            This public sample shows the structure families can expect:
            grounded diagnosis, evidence-backed findings, clear next steps, and
            a share-safe handoff layer.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {sampleSections.map((section) => {
            const Icon = section.icon;
            return (
              <article
                key={section.title}
                className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex rounded-2xl bg-slate-950 p-3 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                  {section.title}
                </h2>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  {section.body}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-10 text-white">
          <h2 className="text-3xl font-semibold tracking-tight">
            The goal is not just a report. The goal is a clearer next step for
            the family.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            Pathnook starts with family learning support today and keeps the
            story grounded in diagnosis, evidence, weekly guidance, and
            practical follow-through.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full bg-white px-8 text-base text-slate-950 hover:bg-slate-100"
            >
              <Link href="/sign-up?redirect=dashboard">
                Start a diagnosis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-transparent px-8 text-base text-white hover:bg-white/10"
            >
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
