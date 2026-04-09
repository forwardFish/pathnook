import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExportPdfButton } from '@/components/reports/ExportPdfButton';
import { ReportTabsClient } from '@/components/reports/report-tabs-client';
import { ReportShareClient } from '@/components/reports/report-share-client';
import { DeleteResourceButton } from '@/components/ui/delete-resource-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/db/queries';
import {
  getBillingPaywallSummary,
  getBillingSnapshotForUser,
  isReportUnlockedForUser,
} from '@/lib/family/billing';
import { getReportForUser } from '@/lib/family/repository';
import {
  getReportLabels,
  localizeParentReport,
  resolveReportLocale,
} from '@/lib/reports/localize';

type PageProps = {
  params: Promise<{ reportId: string }>;
  searchParams: Promise<{ locale?: string }>;
};

export default async function ReportPage({ params, searchParams }: PageProps) {
  const [{ reportId }, { locale: requestedLocale }, user] = await Promise.all([
    params,
    searchParams,
    getUser(),
  ]);

  if (!user) {
    notFound();
  }

  const reportRecord = await getReportForUser(user.id, Number(reportId));
  if (!reportRecord) {
    notFound();
  }

  const isUnlocked = await isReportUnlockedForUser(user.id, Number(reportId));
  const locale = resolveReportLocale(requestedLocale, user.locale || 'en-US');
  const parentReport = localizeParentReport(
    ((reportRecord as any).parentReportJson || {}) as any,
    locale
  );
  const labels = getReportLabels(locale);
  const shareLinks = Array.isArray((reportRecord as any).shareLinks)
    ? (reportRecord as any).shareLinks
    : [];
  const paywall = getBillingPaywallSummary(
    await getBillingSnapshotForUser(user.id)
  );

  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
            {labels.parentReport}
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">
            {labels.diagnosisHeadline}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-600">
            {labels.reportIntro}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-2">
            <div className="mb-2 px-2 text-xs font-medium uppercase tracking-[0.14em] text-gray-500">
              {labels.reportLanguage}
            </div>
          <div className="flex gap-2">
              <Button asChild size="sm" variant={locale === 'en-US' ? 'default' : 'outline'}>
                <Link href={`/dashboard/reports/${reportId}?locale=en-US`}>
                  {labels.english}
                </Link>
              </Button>
              <Button asChild size="sm" variant={locale === 'es-US' ? 'default' : 'outline'}>
                <Link href={`/dashboard/reports/${reportId}?locale=es-US`}>
                  {labels.spanish}
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {isUnlocked ? (
              <ExportPdfButton
                reportId={Number(reportId)}
                label={labels.exportPdf}
                locale={locale}
              />
            ) : null}
            <DeleteResourceButton
              endpoint={`/api/reports/${reportId}`}
              label="Delete Report"
              pendingLabel="Deleting report..."
              confirmMessage="Delete this report and revoke any linked tutor share URLs?"
              redirectHref="/dashboard/children"
            />
            <Button asChild variant="outline">
              <Link href="/dashboard">{labels.backToDashboard}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.75fr,1.25fr]">
        <Card>
          <CardHeader>
            <CardTitle>{labels.reportSummary}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">{labels.child}</p>
              <p className="mt-1">{parentReport.childNickname || 'Unknown child'}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">{labels.grade}</p>
              <p className="mt-1">{parentReport.grade || 'Not provided'}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">{labels.sourceType}</p>
              <p className="mt-1">{parentReport.sourceType || 'Upload'}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="font-medium text-gray-900">{labels.confidence}</p>
              <p className="mt-1">
                {typeof parentReport.confidence === 'number'
                  ? `${Math.round(parentReport.confidence * 100)}%`
                  : 'Unavailable'}
              </p>
            </div>
          </CardContent>
        </Card>

        {isUnlocked ? (
          <ReportTabsClient reportId={Number(reportId)} parentReport={parentReport} />
        ) : (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle>{labels.fullReportLocked}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-orange-950">
              <p>{labels.lockedDescription}</p>
              <div className="rounded-2xl bg-white/80 p-4 text-gray-700">
                <p className="font-medium text-gray-900">{labels.preview}</p>
                <p className="mt-2">
                  {parentReport.summary ||
                    labels.diagnosisPreviewUnavailable ||
                    'Diagnosis preview unavailable.'}
                </p>
              </div>
              <p>
                {labels.currentPlan}: {paywall.planName || 'Free setup state'} /{' '}
                {paywall.subscriptionStatus}
              </p>
              <p>
                {labels.remainingCredits}: {paywall.reportCredits}
              </p>
              <Button asChild>
                <Link href={paywall.billingUrl}>{labels.goToBilling}</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {isUnlocked ? (
        <ReportShareClient
          reportId={Number(reportId)}
          initialShareLinks={shareLinks}
          labels={labels}
        />
      ) : null}
    </section>
  );
}
