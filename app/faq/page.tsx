import type { Metadata } from 'next';
import {
  ONE_TIME_REFUND_WINDOW_DAYS,
  SUBSCRIPTION_REFUND_WINDOW_DAYS,
} from '@/lib/site/public-trust';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Pathnook FAQ',
  description:
    'Read common Pathnook questions about billing, diagnosis workflows, refunds, and tutor sharing.',
  alternates: {
    canonical: '/faq'
  }
};

const faqItems = [
  {
    question: 'Who can use Pathnook?',
    answer:
      'Pathnook is designed for parents, guardians, and other authorized adult account holders. Children may not create accounts directly.',
  },
  {
    question: 'What does a purchase unlock?',
    answer:
      'A one-time purchase unlocks one diagnosis workflow. Monthly and annual plans unlock recurring Pathnook software access and report continuity while billing remains active.',
  },
  {
    question: 'Who handles billing?',
    answer:
      'Freemius handles checkout, invoices, recurring billing, and the billing portal as Merchant of Record. Pathnook handles report access, entitlements, product support, and the billing-management page that opens the Freemius portal when billing actions are needed.',
  },
  {
    question: 'How do I cancel a subscription?',
    answer:
      'Recurring plans are canceled through the Freemius billing portal. Cancellation stops future renewals and does not promise retroactive refunds for prior billing periods.',
  },
  {
    question: 'What if I need a refund?',
    answer:
      `Unused one-time credits may be reviewed within ${ONE_TIME_REFUND_WINDOW_DAYS} days of purchase. Recurring-plan refund review is generally limited to the first ${SUBSCRIPTION_REFUND_WINDOW_DAYS} days of the initial billing cycle. After a diagnosis has been completed or recurring access has already been substantially used, refunds are generally limited to duplicate charge, technical failure, billing error, unauthorized charge confirmed after review, or legal requirement.`,
  },
  {
    question: 'Can I share a report with a tutor?',
    answer:
      'Yes. Pathnook is designed to keep the output share-safe so another adult helper can understand the diagnosis context without digging through every original upload.',
  },
] as const;

export default function FaqPage() {
  return (
    <main className="pn-doc-shell">
      <section className="pn-doc-card">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
              }
            }))
          }}
        />
        <p className="pn-kicker">FAQ</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-[#111827]">
          Common Pathnook questions
        </h1>
        <div className="mt-8 space-y-4">
          {faqItems.map((item) => (
            <article key={item.question} className="rounded-[1.4rem] border border-[var(--pn-border)] bg-[linear-gradient(180deg,var(--pn-soft-2)_0%,white_100%)] p-5">
              <h2 className="text-xl font-semibold text-[#111827]">{item.question}</h2>
              <p className="mt-2 text-base leading-8 text-[var(--pn-muted)]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
