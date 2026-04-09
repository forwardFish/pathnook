import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChildForm } from '@/components/children/child-form';
import { ReportHistoryClient } from '@/components/children/report-history-client';
import { UploadListClient } from '@/components/children/upload-list-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/db/queries';
import {
  getChildForUser,
  listRecentRunsForUser,
  listReportsForChild,
  listUploadsForChild,
} from '@/lib/family/repository';

type PageProps = {
  params: Promise<{ childId: string }>;
};

export default async function ChildDetailPage({ params }: PageProps) {
  const [{ childId }, user] = await Promise.all([params, getUser()]);

  if (!user) {
    notFound();
  }

  const child = await getChildForUser(user.id, Number(childId));
  if (!child) {
    notFound();
  }

  const [uploads, runs, reportHistory] = await Promise.all([
    listUploadsForChild(user.id, child.id),
    listRecentRunsForUser(user.id, 8),
    listReportsForChild(user.id, child.id, 5),
  ]);
  const childRuns = runs.filter((run) => run.childId === child.id).slice(0, 3);

  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
            Child Profile
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">{child.nickname}</h1>
          <p className="mt-2 text-sm text-gray-600">
            Keep this profile current so uploads, diagnoses, and weekly review all stay correctly
            scoped.
          </p>
        </div>
        <Button asChild>
          <Link href={`/dashboard/children/${child.id}/upload`}>Start Upload</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Edit Child Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <ChildForm mode="edit" child={child} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <div className="rounded-2xl bg-gray-50 p-4">
              Uploads attached: <span className="font-medium">{uploads.length}</span>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              Recent runs: <span className="font-medium">{childRuns.length}</span>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              Privacy note: we intentionally avoid collecting full school or legal-name data.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Uploads</CardTitle>
            <Button asChild variant="outline">
              <Link href={`/dashboard/children/${child.id}/upload`}>New Upload</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <UploadListClient uploads={uploads as any} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Runs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {childRuns.length > 0 ? (
              childRuns.map((run) => (
                <div
                  key={run.id}
                  className="rounded-2xl border border-gray-200 p-4 text-sm text-gray-700"
                >
                  <p className="font-medium text-gray-900">Run #{run.id}</p>
                  <p className="mt-1">{run.status.replace('_', ' ')}</p>
                  <Button asChild variant="outline" className="mt-3">
                    <Link href={`/dashboard/runs/${run.id}`}>Open Run</Link>
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">
                The run lifecycle panel will populate here once you submit an upload.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
            Weekly Review Timeline
          </p>
          <h2 className="text-xl font-semibold text-gray-900">History and parent notes</h2>
          <p className="mt-2 text-sm text-gray-600">
            Compare the latest report with the previous one and capture what changed before the
            next upload.
          </p>
        </div>

        <ReportHistoryClient items={reportHistory as any} />
      </section>
    </section>
  );
}
