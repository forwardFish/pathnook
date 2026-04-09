'use client';

import { useMemo, useState } from 'react';
import { FileSearch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageViewer } from '@/components/reports/PageViewer';
import type { EvidenceGroup, EvidenceItem } from '@/components/reports/report-types';

type Props = {
  evidenceGroups: EvidenceGroup[];
  labels?: Record<string, string>;
};

export function EvidenceTab({ evidenceGroups, labels = {} }: Props) {
  const firstItem = useMemo(() => {
    for (const group of evidenceGroups) {
      if (group.items && group.items.length > 0) {
        return group.items[0];
      }
    }
    return null;
  }, [evidenceGroups]);
  const [selectedItem, setSelectedItem] = useState<EvidenceItem | null>(firstItem);

  if (evidenceGroups.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center gap-3 p-6 text-sm text-gray-600">
          <FileSearch className="h-4 w-4" />
          <p>
            {labels.evidenceWillAppear ||
              'Evidence anchors will appear here when the extraction bundle is available.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
      <div className="space-y-4">
        {evidenceGroups.map((group, groupIndex) => (
          <Card key={`${group.code}-${groupIndex}`}>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-3">
                <span>{group.displayName || 'Evidence group'}</span>
                {typeof group.count === 'number' ? (
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    {group.count} {labels.anchors || 'anchors'}
                  </span>
                ) : null}
                {group.severity ? (
                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700">
                    {group.severity}
                  </span>
                ) : null}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">{group.description}</p>
              {(group.items || []).map((item, itemIndex) => {
                const isSelected =
                  selectedItem?.pageId === item.pageId &&
                  selectedItem?.problemNo === item.problemNo;
                return (
                  <button
                    key={`${item.pageId}-${item.problemNo}-${itemIndex}`}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-orange-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-900">
                      <span>
                        {labels.page || 'Page'} {item.pageNo}
                      </span>
                      <span>{item.problemNo}</span>
                      {item.previewLabel ? (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                          {item.previewLabel}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm text-gray-700">
                      {item.problemText ||
                        labels.problemTextUnavailable ||
                        'Problem text unavailable.'}
                    </p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl bg-gray-50 p-3">
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">
                          {labels.studentWork || 'Student work'}
                        </p>
                        <p className="mt-2 text-sm text-gray-700">{item.studentWork}</p>
                      </div>
                      <div className="rounded-2xl bg-gray-50 p-3">
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">
                          {labels.whyItMatters || 'Why it matters'}
                        </p>
                        <p className="mt-2 text-sm text-gray-700">{item.rationale}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      <PageViewer item={selectedItem} labels={labels} />
    </div>
  );
}
