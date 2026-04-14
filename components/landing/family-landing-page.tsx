import Link from "next/link";
import {
  BadgeCheck,
  Compass,
  FileSearch,
  GraduationCap,
  Handshake,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { BILLING_PLANS, formatBillingInterval, getAnnualSavings } from "@/lib/payments/catalog";
import { Button } from "@/components/ui/button";

const proofPoints = [
  "Clear diagnosis",
  "Evidence-backed findings",
  "Weekly growth guidance",
] as const;

const heroCards = [
  {
    title: "Diagnosis",
    body: "Main issue, repeated pattern, and what not to overreact to.",
    icon: FileSearch,
  },
  {
    title: "Evidence",
    body: "Real student work tied to every important finding.",
    icon: Layers3,
  },
  {
    title: "This week",
    body: "A weekly focus with clear next steps and what can wait.",
    icon: Target,
  },
  {
    title: "Share",
    body: "Tutor-ready handoff without losing family context.",
    icon: Handshake,
  },
];

const whyUseCards = [
  {
    title: "See clearly",
    body: "Stop guessing what the problem is. See the main issue, the repeated pattern, and what does not need overreaction.",
    icon: Compass,
  },
  {
    title: "Know what to do next",
    body: "Get a weekly focus, not just a list of mistakes. Know what to do now and what to leave for later.",
    icon: Target,
  },
  {
    title: "Keep progress moving",
    body: "Turn one review into steadier follow-through at home and a cleaner tutor handoff when support is needed.",
    icon: GraduationCap,
  },
];

const stageOneCards = [
  "See the main issue, the secondary issue, and what matters most this week.",
  "Keep every important finding attached to real student work.",
  "Get next-step guidance that families can actually use at home.",
  "Carry each review into weekly follow-through instead of a one-time report drop.",
] as const;

const trustCards = [
  "Adults only account creation.",
  "Parent-controlled uploads and sharing.",
  "Secure billing through Freemius.",
  "Clear refund, privacy, and support routes.",
] as const;

const faqItems = [
  {
    question: "What can I upload?",
    answer:
      "Pathnook is designed for recent schoolwork, corrections, quizzes, and homework pages that show where learning is getting stuck.",
  },
  {
    question: "Does Pathnook give the child answers?",
    answer:
      "No. The goal is diagnosis, evidence, and next-step guidance for the family, not shortcut answer generation.",
  },
  {
    question: "Can I share the result with a tutor?",
    answer:
      "Yes. The workflow keeps the evidence and parent context intact when a tutor handoff is useful.",
  },
  {
    question: "What happens if the upload is unclear?",
    answer:
      "Pathnook is designed to surface uncertainty and quality limits instead of pretending weak input is high confidence.",
  },
  {
    question: "Is Pathnook only for math?",
    answer:
      "No. Stage 1 starts with education diagnosis for families, and the public story is broader than a math-only worksheet tool.",
  },
  {
    question: "How does billing work?",
    answer:
      "Secure checkout is powered by Freemius as Merchant of Record. Families can use the Freemius customer portal for subscription management, cancellation, and billing records.",
  },
];

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-slate-600">{body}</p>
    </div>
  );
}

export function FamilyLandingPage() {
  const annualSavings = getAnnualSavings();

  return (
    <>
      <main className="overflow-x-clip bg-[linear-gradient(180deg,#f8fcfb_0%,#ffffff_22%,#f9fafb_100%)]">
        <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.14),transparent_22%),linear-gradient(180deg,#f4fffc_0%,rgba(244,255,252,0)_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:px-8">
            <div>
              <div className="inline-flex items-center rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-medium text-teal-800 shadow-sm">
                <BadgeCheck className="mr-2 h-4 w-4" />
                For families who want clearer learning decisions and steadier progress
              </div>
              <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-[5.3rem] lg:leading-[0.98]">
                Pathnook is an{" "}
                <span className="bg-[linear-gradient(135deg,#115e59_0%,#0f766e_36%,#2563eb_70%,#ea580c_100%)] bg-clip-text text-transparent">
                  AI learning and growth system.
                </span>
              </h1>
              <p className="mt-6 max-w-3xl text-2xl leading-9 text-slate-700">
                AI-driven clarity, next-step guidance, and family learning
                follow-through.
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Built for families first, starting with education diagnosis,
                evidence-backed review, and weekly learning guidance.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                Pathnook is software for parents who want clearer learning decisions,
                evidence-backed review, and a steadier weekly follow-through workflow.
              </p>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
                Today, Pathnook focuses on parent-facing family learning support. It
                does not provide direct answer generation for children or replace a
                tutor or school teacher.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {proofPoints.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-slate-950 px-8 text-base text-white hover:bg-slate-800"
                >
                  <Link href="/sign-up?redirect=dashboard">Start a diagnosis</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-slate-300 bg-white px-8 text-base text-slate-900 hover:bg-slate-50"
                >
                  <Link href="/sample-report">View a sample report</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_30px_120px_rgba(15,23,42,0.12)] backdrop-blur">
                <div className="rounded-[1.7rem] border border-slate-200 bg-slate-950 p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.22em] text-teal-200">
                    Family review outcome
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    From confusion to a grounded next step
                  </p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {heroCards.map((card) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={card.title}
                          className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4"
                        >
                          <div className="inline-flex rounded-2xl bg-white px-3 py-3 text-slate-950">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
                          <p className="mt-2 text-base leading-7 text-slate-300">
                            {card.body}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionIntro
              eyebrow="What Pathnook Is"
              title="More than a report tool. The first layer of an AI learning and growth system."
              body="Pathnook does more than summarize schoolwork. It helps families understand what is actually happening in learning, decide what to focus on next, and keep growth moving week by week as a parent-facing software workflow."
            />
          </div>
        </section>

        <section id="why-use" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionIntro
              eyebrow="Why Families Use Pathnook"
              title="A clearer decision layer for home learning support."
              body="The homepage story starts with outcomes: clarity, next-step guidance, and steadier follow-through. Features support that value, but they are not the value by themselves."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {whyUseCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
                  >
                    <div className="inline-flex rounded-2xl bg-teal-600 p-3 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-slate-950">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-base leading-8 text-slate-600">
                      {card.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionIntro
              eyebrow="Stage 1 Value"
              title="What families get today"
              body="Today, Pathnook is intentionally focused on family learning support. The public value is diagnosis, evidence, next-step guidance, and weekly follow-through."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {stageOneCards.map((copy, index) => (
                <article
                  key={copy}
                  className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-base leading-8 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr,1fr] lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
                Proof before pay
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Families should understand the value before pricing becomes the story.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-slate-200">
                <p>
                  Evidence anchors stay attached to the diagnosis instead of being hidden behind generic summary text.
                </p>
                <p>
                  Parents get a weekly focus that is easier to act on than a raw stack of corrections.
                </p>
                <p>
                  Sample output is visible before purchase so the value is clear before billing becomes relevant.
                </p>
                <p>
                  Pricing, refund, privacy, contact, and billing management routes stay visible so trust is not hidden behind checkout.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="mt-8 rounded-full bg-white px-7 text-base text-slate-950 hover:bg-slate-100"
              >
                <Link href="/sample-report">View a sample report</Link>
              </Button>
            </div>

            <div id="trust" className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">
                Built for trust
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Built for trust, not just output
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                The public Pathnook story is software-first, parent-first, and explicit
                about billing, privacy, and support routes.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {trustCards.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border border-white/10 bg-slate-900/70 p-4"
                  >
                    <ShieldCheck className="h-5 w-5 text-emerald-300" />
                    <p className="mt-3 text-base leading-7 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-teal-100 bg-[linear-gradient(135deg,#ecfeff_0%,#f8fafc_100%)] p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
                Stage 2 Bridge
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Pathnook starts with family learning and grows into a learning and growth system.
              </h2>
              <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">
                Today, Pathnook helps families turn schoolwork into diagnosis,
                next steps, and weekly follow-through. Over time, every review
                becomes part of a larger learning and growth system: clearer
                decisions, better next steps, and steadier progress over time.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionIntro
              eyebrow="How Pathnook Works"
              title="A public flow explained in value language."
              body="Start with real schoolwork, get grounded clarity, and carry that clarity into action at home or with extra support."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <article className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  01
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                  Bring in recent schoolwork
                </h3>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  Upload the pages that best represent the current struggle so
                  Pathnook can review the real learning signal.
                </p>
              </article>
              <article className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  02
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                  Get clarity and direction
                </h3>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  See the main issue, the supporting evidence, and the next-step
                  guidance that matters this week.
                </p>
              </article>
              <article className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  03
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                  Use it at home or share it
                </h3>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  Act on the weekly plan yourself or hand off the same grounded
                  context to a tutor when outside support is useful.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="pricing-preview" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
                Pricing
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Simple pricing.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Start with one diagnosis or choose ongoing access. Billing and
                cancellation are handled through Freemius.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {BILLING_PLANS.map((plan) => (
                <article
                  key={plan.priceId}
                  className={`rounded-[1.8rem] border bg-white p-6 shadow-sm ${
                    plan.featured
                      ? "border-emerald-300 ring-2 ring-emerald-200"
                      : "border-slate-200"
                  }`}
                >
                  {plan.badge ? (
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      {plan.badge}
                    </span>
                  ) : null}
                  <h3 className="mt-5 text-2xl font-semibold text-slate-950">{plan.name}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{plan.description}</p>
                  <div className="mt-6 flex items-end gap-2">
                    <p className="text-5xl font-semibold tracking-[-0.04em] text-slate-950">
                      ${plan.unitAmount / 100}
                    </p>
                    <p className="pb-2 text-base text-slate-500">
                      {formatBillingInterval(plan.interval)}
                    </p>
                  </div>
                  {plan.planType === "annual" ? (
                    <p className="mt-2 text-sm font-medium text-emerald-700">
                      Save ${annualSavings / 100} vs monthly.
                    </p>
                  ) : null}
                  <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
                    {plan.features.slice(0, 3).map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button
                      asChild
                      className={`w-full rounded-full ${
                        plan.featured
                          ? "bg-slate-950 text-white hover:bg-slate-800"
                          : "bg-white text-slate-950 border border-slate-300 hover:bg-slate-50"
                      }`}
                      variant={plan.featured ? "default" : "outline"}
                    >
                      <Link href="/pricing">{plan.ctaLabel}</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-slate-300 bg-white px-8 text-base text-slate-900 hover:bg-slate-50"
              >
                <Link href="/contact">Talk to support</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionIntro
              eyebrow="FAQ"
              title="Questions that reinforce positioning, not just upload mechanics."
              body="The FAQ should help families understand scope, trust boundaries, and how the current public workflow fits into the larger Pathnook story."
            />
            <div className="mt-12 grid gap-4">
              {faqItems.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
                >
                  <h3 className="text-xl font-semibold text-slate-950">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-slate-600">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
