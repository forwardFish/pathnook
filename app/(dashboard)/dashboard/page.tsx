import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getChildrenForCurrentUser, getUser } from '@/lib/db/queries';
import { listRecentRunsForUser } from '@/lib/family/repository';

export default async function DashboardPage() {
  const [user, children] = await Promise.all([
    getUser(),
    getChildrenForCurrentUser(),
  ]);
  const recentRuns = user ? await listRecentRunsForUser(user.id, 3) : [];

  const overviewCards = [
    {
      label: 'Children',
      value: children.length,
      description: 'Profiles ready for uploads and weekly review.',
    },
    {
      label: 'Recent Reports',
      value: 0,
      description: 'Diagnosis reports appear as soon as runs finish.',
    },
    {
      label: 'Recent Runs',
      value: recentRuns.length,
      description: 'Queued, running, and completed analysis work appears here.',
    },
  ];

  return (
    <section className="flex-1 space-y-6">
      <div className="pn-surface flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="pn-kicker">Parent Dashboard</p>
          <h1 className="text-3xl font-black tracking-[-0.04em] text-[#111827]">
            {user?.name ? `Welcome back, ${user.name}.` : 'Welcome back.'}
          </h1>
          <p className="text-base leading-8 text-[var(--pn-muted)]">
            Add each child once, then use this dashboard to upload work, review
            diagnoses, and track progress week over week.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/dashboard/children/new">Add Child</Link>
          </Button>
          {children[0] ? (
            <Button asChild variant="outline">
              <Link href={`/dashboard/children/${children[0].id}/upload`}>Start Upload</Link>
            </Button>
          ) : null}
          <Button asChild variant="outline">
            <Link href="/dashboard/general">Parent Account</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {overviewCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[var(--pn-muted)]">
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-[#111827]">{card.value}</p>
              <p className="mt-2 text-sm text-[var(--pn-muted)]">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr,1fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Children</CardTitle>
            <Button asChild variant="outline">
              <Link href="/dashboard/children">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {children.length > 0 ? (
              children.slice(0, 3).map((child) => (
                <div
                  key={child.id}
                  className="flex flex-col gap-3 rounded-[1.25rem] border border-[var(--pn-border)] bg-[linear-gradient(180deg,var(--pn-soft-2)_0%,white_100%)] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-base font-semibold text-[#111827]">{child.nickname}</p>
                    <p className="text-sm text-[var(--pn-muted)]">
                      {child.grade} · {child.curriculum}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline">
                      <Link href={`/dashboard/children/${child.id}`}>Open Profile</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/dashboard/children/${child.id}/upload`}>Upload Work</Link>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.25rem] border border-dashed border-[var(--pn-border)] bg-[var(--pn-soft-2)] p-6 text-sm text-[var(--pn-muted)]">
                No child profiles yet. Create your first child profile so this
                dashboard is ready for uploads and weekly review.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Runs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-[var(--pn-muted-2)]">
            {recentRuns.length > 0 ? (
              recentRuns.map((run) => (
                <div
                  key={run.id}
                  className="rounded-[1.25rem] border border-[var(--pn-border)] bg-[linear-gradient(180deg,var(--pn-soft-2)_0%,white_100%)] p-4"
                >
                  <p className="font-semibold text-[#111827]">Run #{run.id}</p>
                  <p className="mt-1 text-sm text-[var(--pn-muted)]">
                    {run.childNickname} · {run.status.replace('_', ' ')}
                  </p>
                  <Button asChild variant="outline" className="mt-3">
                    <Link href={`/dashboard/runs/${run.id}`}>Open Run</Link>
                  </Button>
                </div>
              ))
            ) : (
              <>
                <div className="rounded-[1.25rem] bg-[linear-gradient(180deg,var(--pn-soft)_0%,white_100%)] p-4">
                  1. Keep child profiles minimal: nickname, grade, curriculum.
                </div>
                <div className="rounded-[1.25rem] bg-[linear-gradient(180deg,#eef2ff_0%,white_100%)] p-4">
                  2. Upload 5-10 pages of work to start the diagnosis lifecycle.
                </div>
                <div className="rounded-[1.25rem] bg-[linear-gradient(180deg,#faf5ff_0%,white_100%)] p-4">
                  3. Review the evidence-backed diagnosis and 7-day plan.
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
