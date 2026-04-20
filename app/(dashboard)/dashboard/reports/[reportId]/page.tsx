import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExportPdfButton } from '@/components/reports/ExportPdfButton';
import { ReportTabsClient } from '@/components/reports/report-tabs-client';
import { getUser } from '@/lib/db/queries';
import { isReportUnlockedForUser } from '@/lib/family/billing';
import { getDeckForReport } from '@/lib/family/decks';
import { getDeepResearchReportForUser } from '@/lib/family/repository';
import { buildDeepResearchReportViewModel } from '@/lib/family/report-read-model';
import {
  getReportLabels,
  localizeParentReport,
  resolveReportLocale,
} from '@/lib/reports/localize';

type PageProps = {
  params: Promise<{ reportId: string }>;
  searchParams: Promise<{ locale?: string; tab?: string }>;
};

const reportTabs = [
  { id: 'diagnosis', label: 'Diagnosis' },
  { id: 'shortest-path', label: 'Shortest Path' },
  { id: 'plan', label: '7-Day Plan' },
  { id: 'output-gates', label: 'Output Gates' },
  { id: 'compare', label: 'Compare' },
] as const;

type ReportTabId = (typeof reportTabs)[number]['id'];

export default async function ReportPage({ params, searchParams }: PageProps) {
  const [{ reportId }, { locale: requestedLocale, tab }, user] = await Promise.all([
    params,
    searchParams,
    getUser(),
  ]);

  if (!user) notFound();

  const deepReport = await getDeepResearchReportForUser(user.id, Number(reportId));
  if (!deepReport) notFound();
  const reportRecord = deepReport.report;

  const isUnlocked = await isReportUnlockedForUser(user.id, Number(reportId));
  const locale = resolveReportLocale(requestedLocale, user.locale || 'en-US');
  const parentReport = localizeParentReport(
    ((reportRecord as any).parentReportJson || {}) as any,
    locale
  );
  const reportViewModel = buildDeepResearchReportViewModel({
    reportId: Number(reportId),
    parentReport,
    labels: parentReport.labels,
    structured: deepReport.structured,
    completedDays: parentReport.completedDays,
  });
  const labels = getReportLabels(locale);
  const deck = isUnlocked ? await getDeckForReport(user.id, Number(reportId)) : null;
  const matchedTab = reportTabs.find((item) => item.id === tab);
  const activeTab = matchedTab?.id ?? 'diagnosis';
  const learnerLabel = (reportRecord as any).child?.nickname || parentReport.childNickname || 'Learner';
  const sourceLabel =
    (reportRecord as any).upload?.sourceType ||
    parentReport.sourceType ||
    null;
  const releaseStatus =
    (reportRecord as any).run?.status === 'needs_review'
      ? 'needs_review'
      : parentReport.releaseStatus || ((reportRecord as any).run?.status === 'done' ? 'completed' : null);
  const reportDate = new Date((reportRecord as any).createdAt || Date.now()).toLocaleDateString();
  const reportHeadline =
    parentReport.summary ||
    parentReport.doThisWeek ||
    parentReport.topFindings?.[0]?.whatToDo ||
    'Review the diagnosis, confirm the shortest path, and decide what to do this week.';
  const localizedTabs: ReadonlyArray<{ id: ReportTabId; label: string }> = [
    { id: 'diagnosis', label: labels.diagnosis || 'Diagnosis' },
    { id: 'shortest-path', label: 'Shortest Path' },
    { id: 'plan', label: labels.sevenDayPlan || '7-Day Plan' },
    { id: 'output-gates', label: 'Output Gates' },
    { id: 'compare', label: 'Compare' },
  ];

  return (
    <section className="space-y-6">
      <section className="panel pad">
        <div className="header-row">
          <div>
            <div className="breadcrumb">
              <Link href="/dashboard/reports" className="current">
                Reports
              </Link>
              <span>/</span>
              <span>{learnerLabel}</span>
              <span>/</span>
              <span>{parentReport.topFindings?.[0]?.title || labels.diagnosisHeadline}</span>
            </div>
            <h2>{`${learnerLabel} diagnosis report`}</h2>
            <p className="muted" style={{ marginTop: 10 }}>
              {reportHeadline} Created {reportDate}
              {sourceLabel ? `. Source: ${sourceLabel}.` : '.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {releaseStatus ? <span className="tag green">{releaseStatus.replace('_', ' ')}</span> : null}
            {isUnlocked ? (
              <ExportPdfButton
                reportId={Number(reportId)}
                label={labels.exportPdf}
                locale={locale}
              />
            ) : null}
            <Link className="btn btn-secondary" href="/dashboard/tutor">
              Share
            </Link>
            {isUnlocked && (!deck || deck.deck.walkthroughVisibility !== 'hidden') ? (
              <Link className="btn btn-secondary" href={`/dashboard/reports/${reportId}/play`}>
                Guided Walkthrough
              </Link>
            ) : null}
            <Link className="btn btn-primary" href="/dashboard/reports">
              Back to Reports
            </Link>
          </div>
        </div>

        {isUnlocked ? (
          <div className="tabs">
            {localizedTabs.map((item) => (
              <div key={item.id} className={`tab ${activeTab === item.id ? 'active' : ''}`}>
                <Link href={`/dashboard/reports/${reportId}?tab=${item.id}`}>{item.label}</Link>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {!isUnlocked ? (
        <section className="panel pad">
          <h3>{labels.fullReportLocked}</h3>
          <p className="subhead">{labels.lockedDescription}</p>
          <div className="bottom-nav">
            <Link className="btn btn-primary" href="/dashboard/billing">
              {labels.goToBilling}
            </Link>
          </div>
        </section>
      ) : (
        <ReportTabsClient
          reportViewModel={reportViewModel}
          activeTab={activeTab}
        />
      )}
    </section>
  );
}
