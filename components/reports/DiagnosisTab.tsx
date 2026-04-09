import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ParentReport } from '@/components/reports/report-types';

type Props = {
  parentReport: ParentReport;
};

export function DiagnosisTab({ parentReport }: Props) {
  const topFindings = parentReport.topFindings || [];
  const isNeedsReview = parentReport.releaseStatus === 'needs_review';
  const labels = parentReport.labels || {};

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>{labels.diagnosis || 'Diagnosis'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700">
            {parentReport.summary ||
              labels.diagnosisSummaryUnavailable ||
              'Diagnosis summary unavailable.'}
          </p>
          {topFindings.map((finding, index) => (
            <div key={`${finding.code || finding.title}-${index}`} className="rounded-2xl border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-medium text-gray-900">{finding.title || 'Finding'}</p>
                {finding.severity ? (
                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700">
                    {finding.severity}
                  </span>
                ) : null}
                {finding.patternType ? (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {finding.patternType}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-gray-700">{finding.whatToDo}</p>
              {finding.rationale ? (
                <p className="mt-2 text-xs text-gray-500">{finding.rationale}</p>
              ) : null}
              {Array.isArray(finding.evidence) && finding.evidence.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {finding.evidence.map((anchor, evidenceIndex) => (
                    <span
                      key={`${anchor.pageId}-${anchor.problemNo}-${evidenceIndex}`}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                    >
                      {labels.page || 'Page'} {anchor.pageNo} / {anchor.problemNo}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{labels.readiness || 'Readiness'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-700">
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="font-medium text-gray-900">{labels.confidence || 'Confidence'}</p>
            <p className="mt-1">
              {typeof parentReport.confidence === 'number'
                ? `${Math.round(parentReport.confidence * 100)}%`
                : labels.unavailable || 'Unavailable'}
            </p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="font-medium text-gray-900">{labels.doThisWeek || 'Do This Week'}</p>
            <p className="mt-1">
              {parentReport.doThisWeek ||
                labels.focusGuidanceUnavailable ||
                'Focus guidance unavailable.'}
            </p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="font-medium text-gray-900">{labels.notNow || 'Not Now'}</p>
            <p className="mt-1">
              {parentReport.notNow ||
                labels.noGuardrailProvided ||
                'No guardrail provided.'}
            </p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="font-medium text-gray-900">
              {labels.releaseStatus || 'Release status'}
            </p>
            <div className="mt-2 flex items-center gap-2">
              {isNeedsReview ? (
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              )}
              <span>
                {isNeedsReview
                  ? labels.needsReview || 'Needs review'
                  : labels.readyForParentReading || 'Ready for parent reading'}
              </span>
            </div>
            {parentReport.reviewReason ? (
              <p className="mt-2 text-xs text-gray-500">{parentReport.reviewReason}</p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
