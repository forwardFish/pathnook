'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteResourceButton } from '@/components/ui/delete-resource-button';
import { Textarea } from '@/components/ui/textarea';

type ReportHistoryItem = {
  id: number;
  runId: number;
  createdAt: string;
  summary: string;
  topFinding: string;
  compareSummary: string;
  parentNote: string;
  completedDays: number[];
};

type Props = {
  items: ReportHistoryItem[];
};

export function ReportHistoryClient({ items }: Props) {
  const [reports, setReports] = useState(items);
  const [saveError, setSaveError] = useState('');
  const [isPending, startTransition] = useTransition();

  function updateNote(reportId: number, parentNote: string) {
    setReports((current) =>
      current.map((item) => (item.id === reportId ? { ...item, parentNote } : item))
    );
  }

  function saveNote(reportId: number) {
    const report = reports.find((item) => item.id === reportId);
    if (!report) {
      return;
    }

    startTransition(async () => {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ parentNote: report.parentNote }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setSaveError(payload.error || 'Unable to save note.');
        return;
      }

      setReports((current) =>
        current.map((item) =>
          item.id === reportId
            ? {
                ...item,
                parentNote: payload.parentReportJson?.parentNote || '',
              }
            : item
        )
      );
      setSaveError('');
    });
  }

  return (
    <div className="space-y-4">
      {reports.length > 0 ? (
        reports.map((report) => (
          <Card key={report.id}>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle>Report #{report.id}</CardTitle>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href={`/dashboard/reports/${report.id}`}>Open Report</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-medium text-gray-900">Top Finding</p>
                  <p className="mt-1">{report.topFinding}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-medium text-gray-900">Weekly Compare</p>
                  <p className="mt-1">{report.compareSummary}</p>
                </div>
              </div>

              <p className="text-sm text-gray-700">{report.summary}</p>

              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-900">Parent Review Note</p>
                <Textarea
                  className="mt-3 min-h-28"
                  value={report.parentNote}
                  onChange={(event) => updateNote(report.id, event.target.value)}
                  placeholder="Write what felt easier this week, what stayed sticky, and what to try next."
                />
                <div className="mt-3 flex flex-wrap gap-3">
                  <Button type="button" onClick={() => saveNote(report.id)} disabled={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Note'
                    )}
                  </Button>
                  <p className="text-xs text-gray-500">
                    Completed days: {(report.completedDays || []).join(', ') || 'none yet'}
                  </p>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <DeleteResourceButton
                    endpoint={`/api/reports/${report.id}`}
                    label="Delete Report"
                    pendingLabel="Deleting report..."
                    confirmMessage="Delete this report and revoke any linked tutor share URLs?"
                    onDeleted={() =>
                      setReports((current) => current.filter((item) => item.id !== report.id))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="p-6 text-sm text-gray-600">
            The weekly review timeline will appear after the first completed report.
          </CardContent>
        </Card>
      )}

      {saveError ? (
        <Card className="border-red-200">
          <CardContent className="p-4 text-sm text-red-700">{saveError}</CardContent>
        </Card>
      ) : null}
    </div>
  );
}
