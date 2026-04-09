import { getUser } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const user = await getUser();
  return Response.json(user);
}
