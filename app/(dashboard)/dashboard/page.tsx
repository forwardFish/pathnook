import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { getChildrenForCurrentUser, getUser } from '@/lib/db/queries';
import { FAMILY_EDU_DEMO_MODE } from '@/lib/family/config';
import { listRecentRunsForUser, listReportsForUser } from '@/lib/family/repository';

const prototypeMembers = [
  {
    displayName: 'Alex Chen',
    gradeLabel: 'Grade 6',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    currentFocus: 'math word problems and setup mistakes',
  },
  {
    displayName: 'Mia Chen',
    gradeLabel: 'Grade 4',
    avatarUrl:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    currentFocus: 'reading fluency and passage recall',
  },
  {
    displayName: 'Ethan Chen',
    gradeLabel: 'Grade 8',
    avatarUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    currentFocus: 'equations, transfer, and written reasoning',
  },
] as const;

export default async function DashboardPage() {
  const user = await getUser();
  const [children, reports, recentRuns] = await Promise.all([
    getChildrenForCurrentUser(),
    user ? listReportsForUser(user.id, 6) : [],
    user ? listRecentRunsForUser(user.id, 4) : [],
  ]);

  const selectedChild = children[0] || null;
  const latestReport = reports[0] || null;
  const latestRun = recentRuns[0] || null;
  const displayMembers = prototypeMembers.map((prototype, index) => {
    const child = children[index] ?? null;
    const usePrototypeIdentity = FAMILY_EDU_DEMO_MODE || !child;

    return {
      child,
      href: child ? `/dashboard/children/${child.id}` : '/dashboard/children',
      displayName: usePrototypeIdentity ? prototype.displayName : child.nickname,
      gradeLabel: usePrototypeIdentity ? prototype.gradeLabel : child.grade,
      avatarUrl: prototype.avatarUrl,
      currentFocus: prototype.currentFocus,
    };
  });
  const selectedDisplayMember = displayMembers[0] ?? null;

  const promptChips = [
    'What changed compared with the last diagnosis?',
    'Is this a concept issue or an execution issue?',
    "Help me respond to my child's question today.",
    'Based on this worksheet, what should we do next?',
  ];

  const composerActions = [
    'Upload worksheet or test',
    'Attach image or PDF',
    'Continue latest conversation',
  ];

  return (
    <section className="space-y-6">
      <section className="overview-focus-header">
        <div>
          <div className="breadcrumb">
            <span className="current">Overview</span>
            <span>/</span>
            <span>AI Learning Workspace</span>
          </div>
          <h1>Talk to Pathnook</h1>
          <p className="muted overview-focus-lead">
            Start with one child, describe what happened, or upload learning materials. Everything
            else is just there to help you continue faster.
          </p>
        </div>
      </section>

      <section className="overview-members overview-members-compact">
        <div className="section-kicker">Select a member</div>
        <div className="member-chip-row compact-row">
          {displayMembers.map((member, index) => (
            <Link
              key={member.displayName}
              href={member.href}
              className={`member-chip compact ${index === 0 ? 'active' : ''}`}
            >
              <img className="avatar" src={member.avatarUrl} alt={member.displayName} />
              <div className="member-chip-body">
                <div className="member-chip-name">{member.displayName}</div>
                <div className="member-chip-grade">{member.gradeLabel}</div>
              </div>
            </Link>
          ))}

          <Link href="/dashboard/children/new" className="member-chip compact member-chip-add">
            <div className="member-chip-add-icon">+</div>
            <div className="member-chip-add-text">Add Member</div>
          </Link>
        </div>
      </section>

      <section className="panel pad overview-chat-only-panel">
        <div className="overview-chat-only-top">
          <div>
            <div className="soft-badge">Selected member / {selectedDisplayMember?.displayName || 'Alex Chen'}</div>
            <h2 className="overview-chat-only-title">What do you want help with today?</h2>
            <p className="overview-chat-only-copy">
              You can share today&apos;s learning feedback, describe a problem your child asked
              about, or upload homework, worksheets, screenshots, and test papers.
            </p>
          </div>
          <Link
            className="btn btn-primary"
            href={selectedChild ? `/dashboard/children/${selectedChild.id}/upload` : '/dashboard/children/new'}
          >
            <Plus className="h-4 w-4" />
            <span>New Diagnosis</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overview-chat-only-prompts">
          {promptChips.map((chip) => (
            <button key={chip} type="button" className="prompt-chip">
              {chip}
            </button>
          ))}
        </div>

        <div className="composer-card composer-card-large">
          <div className="composer-head composer-head-strong">
            <div>
              <div className="composer-title">AI chat</div>
              <div className="composer-context">
                Everything you send here will stay linked to {selectedDisplayMember?.displayName || 'Alex Chen'}.
              </div>
            </div>
          </div>

          <textarea
            className="composer-textarea composer-textarea-large"
            defaultValue=""
            placeholder="Example: Alex said he understood fractions yesterday, but today he got confused again when the wording changed. I want to know whether this is a concept issue, an execution issue, or a transfer issue."
          />

          <div className="composer-tools-row">
            {composerActions.map((action) => (
              <button key={action} type="button" className="quick-action minimal">
                {action}
              </button>
            ))}
          </div>

          <div className="composer-footer composer-footer-strong">
            <div className="composer-note">
              Supports images, PDFs, worksheets, screenshots, and learning notes.
            </div>
            <Link
              href={selectedChild ? `/dashboard/children/${selectedChild.id}/upload` : '/dashboard/children/new'}
              className="btn btn-primary btn-large"
            >
              Send to Pathnook
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="overview-hint-row">
        <Link href={latestRun ? `/dashboard/runs/${latestRun.id}` : '/dashboard/children'} className="hint-card">
          <div className="hint-kicker">Continue</div>
          <div className="hint-title">Latest unfinished thread</div>
          <div className="hint-copy">
            {latestRun
              ? `Resume ${latestRun.childNickname}'s ${latestRun.statusMessage || latestRun.stage}.`
              : 'Resume Alex’s fraction comparison from 2 hours ago.'}
          </div>
        </Link>
        <Link
          href={latestReport ? `/dashboard/reports/${latestReport.id}` : '/dashboard/reports'}
          className="hint-card"
        >
          <div className="hint-kicker">Recent report</div>
          <div className="hint-title">
            {latestReport?.topFinding || 'Latest diagnosis ready for review'}
          </div>
          <div className="hint-copy">
            Open the latest report without leaving the current workflow.
          </div>
        </Link>
        <Link
          href={selectedChild ? `/dashboard/children/${selectedChild.id}` : '/dashboard/children'}
          className="hint-card"
        >
          <div className="hint-kicker">Current context</div>
          <div className="hint-title">
            {selectedDisplayMember ? `${selectedDisplayMember.displayName} / ${selectedDisplayMember.gradeLabel}` : 'Alex Chen / Grade 6'}
          </div>
          <div className="hint-copy">
            {selectedDisplayMember
              ? `Current focus: ${selectedDisplayMember.currentFocus}.`
              : 'Current focus: math word problems and setup mistakes.'}
          </div>
        </Link>
      </section>
    </section>
  );
}
