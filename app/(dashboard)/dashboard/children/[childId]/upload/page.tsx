import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadWorkspace } from '@/components/uploads/upload-workspace';
import { getUser } from '@/lib/db/queries';
import { getChildForUser } from '@/lib/family/repository';

type PageProps = {
  params: Promise<{ childId: string }>;
};

export default async function ChildUploadPage({ params }: PageProps) {
  const [{ childId }, user] = await Promise.all([params, getUser()]);

  if (!user) {
    notFound();
  }

  const child = await getChildForUser(user.id, Number(childId));
  if (!child) {
    notFound();
  }

  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
          Upload Intake
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">
          Prepare a diagnosis run for {child.nickname}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-600">
          Upload 5-10 pages from a worksheet, quiz, test, or correction packet. We will check page
          count and quality before sending the run into the async analysis lifecycle.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr,0.55fr]">
        <UploadWorkspace childId={child.id} childNickname={child.nickname} />

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>What we validate before a run starts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <div className="rounded-2xl bg-gray-50 p-4">
              1. Total page count must stay between 5 and 10 pages.
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              2. Each page is checked for blur, darkness, and rotation warnings.
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              3. The run can move into <span className="font-medium">Needs Review</span> instead of
              producing a full report if too many pages are unclear.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
