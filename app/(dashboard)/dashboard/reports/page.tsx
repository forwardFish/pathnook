import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Ellipsis,
  FileSearch,
  Filter,
  Search,
  Share2,
  Sparkles,
} from 'lucide-react';
import { getUser } from '@/lib/db/queries';
import { listReportsDashboardForUser } from '@/lib/family/repository';

function getStatusLabel(status: string | null) {
  if (!status) {
    return 'Draft';
  }

  return status
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getStatusTone(status: string | null) {
  if (status === 'completed') {
    return 'completed';
  }

  if (status === 'needs_review' || status === 'in_review') {
    return 'review';
  }

  return 'draft';
}

function getScoreTone(score: number) {
  if (score >= 85) {
    return 'good';
  }

  if (score >= 80) {
    return 'violet';
  }

  return 'amber';
}

export default async function ReportsPage() {
  const user = await getUser();
  if (!user) {
    notFound();
  }

  const reports = await listReportsDashboardForUser(user.id, 24);
  const visibleReports = reports.slice(0, 4);
  const completedReports = reports.filter((report) => report.releaseStatus === 'completed').length;
  const inReviewReports = reports.filter(
    (report) => report.releaseStatus === 'needs_review' || report.releaseStatus === 'in_review'
  ).length;
  const thisWeekReports = reports.filter((report) => {
    const createdAt = new Date(report.createdAt);
    const now = new Date();
    return now.getTime() - createdAt.getTime() <= 7 * 24 * 60 * 60 * 1000;
  }).length;
  const recentActivity = visibleReports.slice(0, 3);

  const statCards = [
    {
      label: 'Total Reports',
      value: reports.length,
      copy: 'Across all members',
      icon: <FileSearch className="h-4 w-4" />,
    },
    {
      label: 'Completed',
      value: completedReports,
      copy: 'Ready to review',
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
    {
      label: 'In Review',
      value: inReviewReports,
      copy: 'Still being finalized',
      icon: <Filter className="h-4 w-4" />,
    },
    {
      label: 'This Week',
      value: thisWeekReports,
      copy: 'Recently generated',
      icon: <Sparkles className="h-4 w-4" />,
    },
  ];

  return (
    <section className="reports-page-shell space-y-6">
      <section className="panel pad">
        <div className="header-row">
          <div>
            <div className="breadcrumb">
              <span className="current">Reports</span>
              <span>/</span>
              <span>All Reports</span>
            </div>
            <h2>Reports Dashboard</h2>
            <p className="muted" style={{ marginTop: 10, maxWidth: 760 }}>
              View, manage, and review all diagnosis reports across your members.
            </p>
          </div>
          <Link className="btn btn-primary btn-large" href="/dashboard/children">
            New Diagnosis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="reports-stats-grid">
        {statCards.map((item) => (
          <div key={item.label} className="reports-stat-card">
            <div className="reports-stat-top">
              <p className="text-sm font-semibold text-[#64748b]">{item.label}</p>
              <span className="reports-stat-icon">{item.icon}</span>
            </div>
            <p className="reports-stat-value">{item.value}</p>
            <p className="reports-stat-copy">{item.copy}</p>
          </div>
        ))}
      </section>

      <section className="panel pad">
        <div className="header-row">
          <div>
            <h2>All Reports</h2>
            <p className="muted" style={{ marginTop: 10 }}>
              Use this page as the main desktop list for entering the detail flow.
            </p>
          </div>
          <button type="button" className="btn btn-secondary">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </button>
        </div>

        <div className="reports-filters" style={{ marginTop: 18 }}>
          <div className="reports-search-shell">
            <Search className="reports-search-icon h-5 w-5" />
            <input
              readOnly
              value=""
              placeholder="Search report title, member, or subject"
              className="search"
            />
          </div>
          <select className="select">
            <option>All Members</option>
          </select>
          <select className="select">
            <option>All Subjects</option>
          </select>
          <select className="select">
            <option>All Status</option>
          </select>
        </div>

        <div className="reports-table-shell">
          <div className="reports-table-head">
            <div>Report</div>
            <div>Member</div>
            <div>Date</div>
            <div>Status</div>
            <div>Score</div>
            <div />
          </div>

          {visibleReports.length > 0 ? (
            visibleReports.map((report) => {
              const statusTone = getStatusTone(report.releaseStatus);
              const score =
                typeof report.confidence === 'number'
                  ? Math.round(report.confidence * 100)
                  : Math.max(70, 80 + report.completedDays.length);
              const scoreTone = getScoreTone(score);

              return (
                <Link key={report.id} href={`/dashboard/reports/${report.id}`} className="block">
                  <div className="reports-table-row">
                    <div className="report-main">
                      <div className="icon-box">
                        <FileSearch className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="title">
                          {report.topFinding || 'Diagnosis finding not titled yet'}
                        </div>
                        <div className="sub">
                          {report.summary ||
                            'Strong diagnostic signal is present, but the final summary copy is still being finalized.'}
                        </div>
                      </div>
                    </div>

                    <div className="member-mini">
                      <div className="avatar" style={{ display: 'grid', placeItems: 'center', color: 'var(--violet)', fontWeight: 800 }}>
                        {(report.childNickname || 'L').slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <div className="title" style={{ fontSize: 14 }}>
                          {report.childNickname || 'Learner record'}
                        </div>
                        <div className="sub">
                          {report.childGrade || 'Grade not set'} / {report.sourceType || 'Subject pending'}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="title" style={{ fontSize: 14 }}>
                        {new Date(report.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="sub">
                        {new Date(report.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>

                    <div>
                      <span
                        className={`status-pill ${
                          statusTone === 'completed'
                            ? 'completed'
                            : statusTone === 'review'
                              ? 'review'
                              : 'pending'
                        }`}
                      >
                        {getStatusLabel(report.releaseStatus)}
                      </span>
                    </div>

                    <div>
                      <span
                        className={`score-pill ${
                          scoreTone === 'good'
                            ? 'green'
                            : scoreTone === 'violet'
                              ? 'violet'
                              : 'amber'
                        }`}
                      >
                        {score}
                      </span>
                    </div>

                    <div className="actions">
                      <button type="button" className="icon-btn" aria-label="More actions">
                        <Ellipsis className="h-4 w-4" />
                      </button>
                      <button type="button" className="icon-btn" aria-label="Open report">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <button type="button" className="icon-btn" aria-label="Share report">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="reports-table-row">
              <div className="sub">The reports dashboard will populate after the first completed run.</div>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-4 text-sm text-[#64748b] lg:flex-row lg:items-center lg:justify-between">
          <div>
            Showing <strong>{visibleReports.length}</strong> of <strong>{reports.length}</strong> reports
          </div>
          <div className="reports-pager">
            <button type="button" className="pager-btn">
              Previous
            </button>
            <button type="button" className="pager-btn active">
              1
            </button>
            <button type="button" className="pager-btn">
              2
            </button>
            <button type="button" className="pager-btn">
              Next
            </button>
          </div>
        </div>
      </section>

      <section className="reports-lower-grid">
        <div className="panel pad">
          <div className="header-row">
            <div>
              <h2>Recent Activity</h2>
              <p className="muted" style={{ marginTop: 10 }}>
                Latest report actions and updates.
              </p>
            </div>
            <span className="member-section-action">View all</span>
          </div>

          <div className="activity-stack" style={{ marginTop: 18 }}>
            {recentActivity.map((report) => (
              <div key={`activity-${report.id}`} className="activity-item">
                <div className="activity-icon">
                  <FileSearch className="h-4 w-4" />
                </div>
                <div>
                  <div className="title">
                    {report.topFinding || 'Diagnosis finding not titled yet'}
                  </div>
                  <div className="sub">
                    {report.childNickname || 'Learner record'} /{' '}
                    {new Date(report.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    / {getStatusLabel(report.releaseStatus)}
                  </div>
                  <div className="sub" style={{ marginTop: 8 }}>
                    {report.summary ||
                      'Strong progress is visible, but this report still needs a finalized summary.'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel pad">
          <h2>Dashboard rhythm</h2>
          <p className="muted" style={{ marginTop: 12 }}>
            Keep the list, the child state, and the detailed diagnosis flow tightly connected.
          </p>

          <div className="stack" style={{ marginTop: 18 }}>
            <div className="callout">
              <div className="kicker">Best entry point</div>
              <div className="title" style={{ marginTop: 8 }}>
                Open the newest completed report first
              </div>
              <div className="sub" style={{ marginTop: 8 }}>
                Then move into the five-section detail flow to review the diagnosis, shortest path,
                weekly plan, output gates, and compare or resume the decision.
              </div>
            </div>
            <div className="callout">
              <div className="kicker">Parent workflow</div>
              <div className="title" style={{ marginTop: 8 }}>
                Reports / Detail / Child / Tutor
              </div>
              <div className="sub" style={{ marginTop: 8 }}>
                That sequence now matches the `03-reports.html` desktop reference more directly.
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
