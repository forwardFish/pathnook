import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getChildrenForCurrentUser } from '@/lib/db/queries';

export default async function ChildrenPage() {
  const children = await getChildrenForCurrentUser();

  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
            Child Profiles
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Manage each child&apos;s learning profile
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Keep profiles minimal so uploads, reports, and weekly review stay privacy-conscious.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/children/new">Add Child</Link>
        </Button>
      </div>

      {children.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {children.map((child) => (
            <Card key={child.id}>
              <CardHeader>
                <CardTitle>{child.nickname}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <p>Grade: {child.grade}</p>
                <p>Curriculum: {child.curriculum}</p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline">
                    <Link href={`/dashboard/children/${child.id}`}>Edit Profile</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/dashboard/children/${child.id}/upload`}>Upload Work</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No child profiles yet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-600">
            <p>
              Add your first child now so this household is ready for uploads, reports, and weekly
              review.
            </p>
            <Button asChild>
              <Link href="/dashboard/children/new">Create First Child</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
