import { z } from 'zod';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import { getBillingPlanByPriceId } from '@/lib/payments/catalog';
import { createHostedCheckoutSession } from '@/lib/payments/creem';

const bodySchema = z.object({
  priceId: z.string().min(1),
});

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const team = await getTeamForUser();
  if (!team) {
    return Response.json({ error: 'Team not found.' }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const result = bodySchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: 'priceId is required.' }, { status: 400 });
  }

  const plan = getBillingPlanByPriceId(result.data.priceId);
  if (!plan) {
    return Response.json({ error: 'Unknown priceId.' }, { status: 400 });
  }

  const session = await createHostedCheckoutSession({
    team,
    priceId: result.data.priceId,
  });

  return Response.json({
    mode: session.mode,
    checkoutUrl: session.checkoutUrl,
    sessionId: session.sessionId,
    priceId: result.data.priceId,
    planType: session.planType,
  });
}
