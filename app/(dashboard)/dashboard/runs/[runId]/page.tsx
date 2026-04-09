import { notFound } from 'next/navigation';
import { RunProgressClient } from '@/components/runs/run-progress-client';
import { FAMILY_EDU_SUPPORT_EMAIL } from '@/lib/family/config';
import { getUser } from '@/lib/db/queries';
import { getRunForUser } from '@/lib/family/repository';

type PageProps = {
  params: Promise<{ runId: string }>;
};

export default async function RunPage({ params }: PageProps) {
  const [{ runId }, user] = await Promise.all([params, getUser()]);

  if (!user) {
    notFound();
  }

  const run = await getRunForUser(user.id, Number(runId));
  if (!run) {
    notFound();
  }

  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
          Analysis Lifecycle
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">
          Diagnosis run progress
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-600">
          Long-running OCR and analysis work stays here so the dashboard never blocks. This page is
          designed to make queued, running, failed, needs-review, and done states explicit.
        </p>
      </div>

      <RunProgressClient initialRun={run as any} supportEmail={FAMILY_EDU_SUPPORT_EMAIL} />
    </section>
  );
}
