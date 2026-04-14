import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/db/queries';
import { listTutorWorkspaceForUser } from '@/lib/family/tutor-workspace';

export default async function TutorWorkspacePage() {
  const user = await getUser();
  if (!user) {
    notFound();
  }

  const items = await listTutorWorkspaceForUser(user.id);

  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div className="flex flex-col gap-4 rounded-3xl bg-[linear-gradient(135deg,#f0fdf4_0%,#ecfeff_50%,#ffffff_100%)] p-6 shadow-sm ring-1 ring-emerald-100 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
            Tutor-ready Share
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">Tutor-ready share foundation</h1>
          <p className="max-w-3xl text-sm text-gray-700">
            This owner-scoped view gives parents a clean place to see which reports are ready
            to share with a tutor, whether a share summary is active, and which focus areas matter most.
          </p>
          <p className="max-w-3xl text-xs uppercase tracking-[0.14em] text-emerald-700">
            Owner-scoped view only. This page does not create a separate tutor login or show
            cross-household data.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/billing">Review Billing</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ready briefs</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-gray-900">
            {items.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active tutor shares</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-gray-900">
            {items.filter((item) => item.shareStatus === 'active').length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Needs follow-up</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-gray-900">
            {items.filter((item) => item.releaseStatus === 'needs_review').length}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <Card key={item.reportId}>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>{item.childNickname}</CardTitle>
                  <p className="mt-1 text-sm text-gray-500">
                    Updated {new Date(item.lastUpdatedAt).toLocaleString()}
                  </p>
                </div>
                <Button asChild variant="outline">
                  <Link href={`/dashboard/reports/${item.reportId}`}>Open Report</Link>
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-medium text-gray-900">Recommended focus</p>
                  <p className="mt-2">{item.recommendedFocus}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-medium text-gray-900">Secondary focus</p>
                  <p className="mt-2">{item.secondaryFocus || 'Not captured yet'}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-medium text-gray-900">Tutor-ready share</p>
                  <p className="mt-2">Status: {item.shareStatus.replace('_', ' ')}</p>
                  {item.activeShareUrl ? (
                    <Button asChild variant="outline" size="sm" className="mt-3">
                      <Link href={item.activeShareUrl}>Open active link</Link>
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-sm text-gray-600">
              Tutor-ready share summaries will appear here after reports are generated and unlocked.
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
