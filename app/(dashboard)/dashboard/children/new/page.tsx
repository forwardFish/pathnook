import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChildForm } from '@/components/children/child-form';

export default function NewChildPage() {
  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
          Add Child
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">
          Create a child learning profile
        </h1>
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Child Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ChildForm mode="create" />
        </CardContent>
      </Card>
    </section>
  );
}
