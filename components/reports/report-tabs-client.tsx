'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { DiagnosisTab } from '@/components/reports/DiagnosisTab';
import { EvidenceTab } from '@/components/reports/EvidenceTab';
import { PlanTab } from '@/components/reports/PlanTab';
import type { ParentReport } from '@/components/reports/report-types';

type Props = {
  reportId: number;
  parentReport: ParentReport;
};

const tabs = [
  { id: 'diagnosis', label: 'Diagnosis' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'plan', label: '7-Day Plan' },
] as const;

export function ReportTabsClient({ reportId, parentReport }: Props) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('diagnosis');
  const labels = parentReport.labels || {};
  const localizedTabs = [
    { id: 'diagnosis', label: labels.diagnosis || 'Diagnosis' },
    { id: 'evidence', label: labels.evidence || 'Evidence' },
    { id: 'plan', label: labels.sevenDayPlan || '7-Day Plan' },
  ] as const;

  return (
    <div className="space-y-6">
      {parentReport.reviewBanner ? (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex items-start gap-3 p-6 text-sm text-amber-900">
            <AlertTriangle className="mt-0.5 h-4 w-4" />
            <div className="space-y-2">
              <p className="font-medium">{labels.draftReportOnly || 'Draft report only'}</p>
              <p>{parentReport.reviewBanner}</p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {localizedTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? 'border-orange-300 bg-orange-100 text-orange-900'
                : 'border-gray-200 bg-white text-gray-600 hover:border-orange-200 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'diagnosis' ? <DiagnosisTab parentReport={parentReport} /> : null}
      {activeTab === 'evidence' ? (
        <EvidenceTab evidenceGroups={parentReport.evidenceGroups || []} labels={labels} />
      ) : null}
      {activeTab === 'plan' ? (
        <PlanTab
          reportId={reportId}
          sevenDayPlan={parentReport.sevenDayPlan || []}
          guardrail={parentReport.guardrail}
          initialCompletedDays={parentReport.completedDays || []}
          labels={labels}
        />
      ) : null}
    </div>
  );
}
