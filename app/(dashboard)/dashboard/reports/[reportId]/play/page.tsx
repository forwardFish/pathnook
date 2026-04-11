import { notFound } from 'next/navigation';
import { GuidedWalkthroughPlayer } from '@/components/reports/guided-walkthrough-player';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/db/queries';
import { ensureDeckForReport, getDeckPlaybackForUser } from '@/lib/family/deck-service';

type PageProps = {
  params: Promise<{ reportId: string }>;
};

export default async function ReportPlayPage({ params }: PageProps) {
  const [{ reportId }, user] = await Promise.all([params, getUser()]);
  if (!user) {
    notFound();
  }

  let deck = await ensureDeckForReport(user.id, Number(reportId));
  if (!deck) {
    notFound();
  }

  const playback = await getDeckPlaybackForUser(user.id, deck.deck.id);
  if (!playback) {
    notFound();
  }

  if (playback.walkthroughVisibility === 'hidden') {
    return (
      <section className="flex-1 space-y-6 p-4 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Guided Walkthrough is not available for this report yet.</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            This deck is currently in the D-tier hidden state. Keep the report, evidence, and 7-day plan as the main value layer.
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="flex-1 space-y-6 p-4 lg:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
          Guided Walkthrough
        </p>
        <h1 className="text-3xl font-semibold text-gray-900">Visual explanation and review steps</h1>
        <p className="mt-2 text-sm text-gray-600">
          This optional walkthrough sits on top of the main report. Voice guidance stays off by default.
        </p>
      </div>
      <GuidedWalkthroughPlayer
        playback={playback}
        snapshotEndpoint={`/api/decks/${playback.deckId}/snapshot`}
      />
    </section>
  );
}
