'use client';

import { useState, useTransition } from 'react';
import { CheckCircle2, Loader2, NotebookPen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DayPlan } from '@/components/reports/report-types';

type Props = {
  reportId: number;
  sevenDayPlan: DayPlan[];
  guardrail?: string;
  initialCompletedDays?: number[];
  labels?: Record<string, string>;
};

export function PlanTab({
  reportId,
  sevenDayPlan,
  guardrail,
  initialCompletedDays = [],
  labels = {},
}: Props) {
  const [completedDays, setCompletedDays] = useState<number[]>(initialCompletedDays);
  const [saveError, setSaveError] = useState('');
  const [isPending, startTransition] = useTransition();

  function toggleDay(day: number) {
    startTransition(async () => {
      const nextCompletedDays = completedDays.includes(day)
        ? completedDays.filter((item) => item !== day)
        : [...completedDays, day].sort((left, right) => left - right);

      const response = await fetch(`/api/reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ completedDays: nextCompletedDays }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setSaveError(payload.error || labels.unableToSaveDayProgress || 'Unable to save day progress.');
        return;
      }

      setCompletedDays(payload.parentReportJson?.completedDays || nextCompletedDays);
      setSaveError('');
    });
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{labels.sevenDayPlan || '7-Day Plan'}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sevenDayPlan.map((day) => {
            const isDone = typeof day.day === 'number' && completedDays.includes(day.day);
            return (
              <div key={day.day} className="rounded-2xl border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.14em] text-orange-600">
                      {labels.day || 'Day'} {day.day}
                    </p>
                    <p className="mt-2 text-base font-medium text-gray-900">{day.goal}</p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant={isDone ? 'default' : 'outline'}
                    onClick={() => typeof day.day === 'number' && toggleDay(day.day)}
                    disabled={isPending || typeof day.day !== 'number'}
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isDone ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        {labels.done || 'Done'}
                      </>
                    ) : (
                      labels.markDone || 'Mark Done'
                    )}
                  </Button>
                </div>
                <p className="mt-2 text-sm text-gray-700">{day.practice}</p>
                <p className="mt-3 text-xs text-gray-500">
                  {labels.parentPromptLabel || 'Parent prompt'}: {day.parentPrompt}
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  {labels.successSignalLabel || 'Success signal'}: {day.successSignal}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {saveError ? (
        <Card className="border-red-200">
          <CardContent className="p-4 text-sm text-red-700">{saveError}</CardContent>
        </Card>
      ) : null}

      <Card>
        <CardContent className="flex items-start gap-3 p-6 text-sm text-gray-700">
          <NotebookPen className="mt-0.5 h-4 w-4 text-orange-600" />
          <p>
            {guardrail ||
              labels.practiceCoachingGuardrail ||
              'Use the plan for practice coaching, not direct homework answers.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
