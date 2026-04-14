import Link from 'next/link';
import { notFound } from 'next/navigation';
import { completeDemoCheckoutAction } from '@/lib/payments/actions';
import { formatBillingInterval, getBillingPlanByPriceId } from '@/lib/payments/catalog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PageProps = {
  searchParams: Promise<{
    priceId?: string;
    session_id?: string;
  }>;
};

export default async function DemoCheckoutPage({ searchParams }: PageProps) {
  const { priceId, session_id: sessionId } = await searchParams;
  const plan = getBillingPlanByPriceId(priceId);

  if (!plan || !sessionId) {
    notFound();
  }

  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
          Demo Checkout
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">
          Review the selected Pathnook plan
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          This sandbox preview mirrors the billing handoff so we can verify
          checkout success and cancel return paths without depending on a live
          merchant account during testing.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <p>{plan.description}</p>
            <p>
              Price: <span className="font-medium">${plan.unitAmount / 100}</span>{' '}
              {formatBillingInterval(plan.interval)}
            </p>
            <p>
              Checkout session: <span className="font-medium">{sessionId}</span>
            </p>
            <p>
              Successful completion should unlock the report path according to the PRD billing
              rules and return the parent to the billing dashboard.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next step</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <form action={completeDemoCheckoutAction} className="space-y-3">
              <input type="hidden" name="priceId" value={plan.priceId} />
              <input type="hidden" name="sessionId" value={sessionId} />
              <Button type="submit" className="w-full">
                Complete Demo Checkout
              </Button>
            </form>

            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/billing?checkout=cancelled">Cancel And Return</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
