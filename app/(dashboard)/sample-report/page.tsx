import Link from "next/link";
import {
  ArrowRight,
  FileSearch,
  GitCompareArrows,
  Layers3,
  ListChecks,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleSections = [
  {
    title: "Sample Diagnosis",
    body: "Primary issue, secondary issue, repeated pattern, what not to overreact to, and what matters most this week.",
    icon: FileSearch,
  },
  {
    title: "Skeleton Focus",
    body: "This section shows the skeleton focus, why it matters now, and what to ignore for now so the family does not overreact to surface mistakes.",
    icon: Layers3,
  },
  {
    title: "Sample Evidence",
    body: "Every important finding stays attached to real student work so the diagnosis stays grounded instead of vague.",
    icon: ShieldCheck,
  },
  {
    title: "Shortest Ability Path",
    body: "This section shows what to do first, why it comes first, the current stage goal, and what comes next.",
    icon: GitCompareArrows,
  },
  {
    title: "Sample 7-Day Plan",
    body: "A short weekly plan turns the diagnosis into the next week of action instead of a one-time review.",
    icon: ListChecks,
  },
  {
    title: "Example Output Gate",
    body: "A small task that reveals whether the learning is really holding: gate title, required output, pass condition, and common failure pattern.",
    icon: ShieldCheck,
  },
  {
    title: "Compare / Resume Preview",
    body: "This preview shows what improved, what stayed the same, and what still needs correction so the next review continues instead of restarting.",
    icon: GitCompareArrows,
  },
  {
    title: "Tutor-ready summary",
    body: "A share-safe handoff preserves the same family context when outside support is useful.",
    icon: ArrowRight,
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
            See what a real Pathnook family review looks like before you pay.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            This public sample shows a representative preview of the product
            workflow and report structure: diagnosis, evidence, the shortest
            next path, output checkpoints, and tutor-ready sharing. Actual
            output depends on the quality and relevance of the uploaded
            learning materials.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">
            Representative preview only. The exact report content depends on the
            uploaded learning evidence, the family account history, and the plan
            that unlocks the workflow.
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

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              What families actually receive
            </p>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
              <p>
                A Pathnook report is not just a narrative summary. It is a
                software-generated decision layer that stays tied to the
                evidence the parent uploaded.
              </p>
              <p>
                Each completed run can include a diagnosis summary, evidence
                anchors, suggested next step ordering, and a handoff-safe view
                that another adult can follow without re-reading the raw upload.
              </p>
              <p>
                If no stable downloadable example is available yet, Pathnook
                shows the structure and disclaimers openly instead of pretending
                there is a live sample file.
              </p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Share-safe workflow
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-[1.3rem] border border-slate-200 bg-white p-5">
                <h2 className="text-xl font-semibold text-slate-950">Parents stay in control</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Uploads, interpretation, and any later sharing are controlled
                  by the adult account holder.
                </p>
              </div>
              <div className="rounded-[1.3rem] border border-slate-200 bg-white p-5">
                <h2 className="text-xl font-semibold text-slate-950">Tutors see context, not chaos</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Shared output is designed to preserve the same diagnosis frame,
                  evidence summary, and next-step sequencing.
                </p>
              </div>
            </div>
          </section>
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
                Get started
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
