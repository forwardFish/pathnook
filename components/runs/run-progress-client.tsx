'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertTriangle, CheckCircle2, Loader2, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RunPayload = {
  id: number;
  status: 'queued' | 'running' | 'needs_review' | 'done' | 'failed';
  stage: 'queued' | 'preprocessing' | 'extracting' | 'composing' | 'review' | 'done' | 'failed';
  progressPercent: number;
  estimatedMinutes: number;
  statusMessage: string | null;
  overallConfidence?: number | null;
  needsReviewReason?: string | null;
  errorMessage?: string | null;
  reportId?: number | null;
  child?: { nickname?: string | null; grade?: string | null } | null;
  upload?: { totalPages?: number | null; sourceType?: string | null } | null;
  pageRecords?: Array<{ id: number; pageNumber: number; isBlurry: boolean; isRotated: boolean; isDark: boolean }>;
};

type Props = {
  initialRun: RunPayload;
  supportEmail: string;
};

const stages = [
  { id: 'queued', label: 'Queued' },
  { id: 'preprocessing', label: 'Quality checks' },
  { id: 'extracting', label: 'Evidence extraction' },
  { id: 'composing', label: 'Diagnosis draft' },
  { id: 'review', label: 'Manual review if needed' },
  { id: 'done', label: 'Ready' },
] as const;

function isTerminal(status: RunPayload['status']) {
  return status === 'done' || status === 'failed' || status === 'needs_review';
}

export function RunProgressClient({ initialRun, supportEmail }: Props) {
  const router = useRouter();
  const [run, setRun] = useState(initialRun);
  const [fetchError, setFetchError] = useState('');
  const [isRetryPending, startRetryTransition] = useTransition();

  useEffect(() => {
    if (isTerminal(run.status)) {
      return;
    }

    const timer = window.setInterval(async () => {
      const response = await fetch(`/api/runs/${run.id}`, { cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok) {
        setFetchError(payload.error || 'Unable to refresh run status.');
        return;
      }

      setRun(payload);
      setFetchError('');
    }, 2000);

    return () => window.clearInterval(timer);
  }, [run.id, run.status]);

  function retryRun() {
    startRetryTransition(async () => {
      const response = await fetch(`/api/runs/${run.id}/retry`, {
        method: 'POST',
      });
      const payload = await response.json();
      if (!response.ok) {
        setFetchError(payload.error || 'Retry failed.');
        return;
      }

      setRun(payload);
      setFetchError('');
      router.refresh();
    });
  }

  const qualityIssueCount =
    run.pageRecords?.filter((page) => page.isBlurry || page.isRotated || page.isDark).length || 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-3">
            <span>Run #{run.id}</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                run.status === 'done'
                  ? 'bg-emerald-100 text-emerald-700'
                  : run.status === 'failed'
                    ? 'bg-red-100 text-red-700'
                    : run.status === 'needs_review'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
              }`}
            >
              {run.status.replace('_', ' ')}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
              <span>{run.statusMessage || 'Preparing your diagnosis.'}</span>
              <span>{run.progressPercent}%</span>
            </div>
            <div className="h-3 rounded-full bg-gray-100">
              <div
                className="h-3 rounded-full bg-[linear-gradient(90deg,#f97316_0%,#facc15_100%)] transition-all"
                style={{ width: `${Math.min(100, Math.max(6, run.progressPercent))}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Expected turnaround: about {run.estimatedMinutes} minutes for a typical upload.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
              <p className="font-medium text-gray-900">Child</p>
              <p className="mt-1">{run.child?.nickname || 'Unknown child'}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
              <p className="font-medium text-gray-900">Pages</p>
              <p className="mt-1">{run.upload?.totalPages || 0} pages</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
              <p className="font-medium text-gray-900">Quality flags</p>
              <p className="mt-1">{qualityIssueCount} pages need extra attention</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
              <p className="font-medium text-gray-900">Confidence</p>
              <p className="mt-1">
                {typeof run.overallConfidence === 'number'
                  ? `${Math.round(run.overallConfidence * 100)}%`
                  : 'Pending'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lifecycle steps</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {stages.map((stage, index) => {
            const isActive = run.stage === stage.id;
            const isComplete =
              stages.findIndex((item) => item.id === run.stage) >= index ||
              run.status === 'done';

            return (
              <div
                key={stage.id}
                className={`rounded-2xl border p-4 text-sm ${
                  isActive
                    ? 'border-orange-300 bg-orange-50'
                    : isComplete
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Loader2 className={`h-4 w-4 ${isActive ? 'animate-spin text-orange-500' : 'text-gray-300'}`} />
                  )}
                  <span className="font-medium text-gray-900">{stage.label}</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {fetchError ? (
        <Card className="border-red-200">
          <CardContent className="flex items-start gap-3 p-6 text-sm text-red-700">
            <AlertTriangle className="mt-0.5 h-4 w-4" />
            <p>{fetchError}</p>
          </CardContent>
        </Card>
      ) : null}

      {run.status === 'failed' ? (
        <Card className="border-red-200">
          <CardContent className="space-y-4 p-6">
            <p className="text-sm text-gray-700">
              {run.errorMessage || 'This run failed before the diagnosis could be completed.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={retryRun} disabled={isRetryPending}>
                {isRetryPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Retry Run
                  </>
                )}
              </Button>
              <Button asChild variant="outline">
                <a href={`mailto:${supportEmail}`}>Contact Support</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {run.status === 'needs_review' ? (
        <Card className="border-amber-200">
          <CardContent className="space-y-4 p-6 text-sm text-gray-700">
            <p>
              {run.needsReviewReason ||
                'The upload needs a manual review before the full diagnosis is released.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href={`mailto:${supportEmail}`}>Contact Support</a>
              </Button>
              <Button type="button" onClick={retryRun} disabled={isRetryPending}>
                Re-run After Re-upload
              </Button>
              {run.reportId ? (
                <Button asChild variant="outline">
                  <Link href={`/dashboard/reports/${run.reportId}`}>Preview Draft Report</Link>
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {run.status === 'done' ? (
        <Card className="border-emerald-200">
          <CardContent className="space-y-4 p-6">
            <p className="text-sm text-gray-700">
              The diagnosis is ready. Continue to the report to review the summary, evidence, and
              7-day plan.
            </p>
            <div className="flex flex-wrap gap-3">
              {run.reportId ? (
                <Button asChild>
                  <Link href={`/dashboard/reports/${run.reportId}`}>View Report</Link>
                </Button>
              ) : null}
              <Button asChild variant="outline">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
