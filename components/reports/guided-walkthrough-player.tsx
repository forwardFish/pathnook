'use client';

import { useEffect, useRef, useState } from 'react';
import { ActionEngine, PlaybackEngine, type PlaybackSnapshotState } from '@/lib/family/deck-playback';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PlaybackPayload = {
  deckId: number;
  reportId: number;
  status: string;
  tier: string;
  walkthroughVisibility: string;
  voiceGuidanceDefault: boolean;
  autoplayAllowed: boolean;
  slides: Array<{
    id: number;
    slideIndex: number;
    title: string;
    slideType: string;
    body: Record<string, unknown>;
    notes: Record<string, unknown>;
    actions: Array<{
      id: number;
      actionIndex: number;
      actionType: string;
      narrationText: string;
      payload: Record<string, unknown>;
    }>;
  }>;
  latestSnapshot?: {
    id?: number;
    currentSlideIndex: number;
    currentActionIndex: number;
    playbackState: 'idle' | 'playing' | 'paused' | 'stopped';
    voiceEnabled: boolean;
  } | null;
};

type Props = {
  playback: PlaybackPayload;
  snapshotEndpoint?: string | null;
  readOnly?: boolean;
};

function renderBodyValue(value: unknown) {
  if (typeof value === 'string' || typeof value === 'number') {
    return <p className="text-sm text-gray-700">{String(value)}</p>;
  }

  if (Array.isArray(value)) {
    return (
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
            {typeof item === 'object' && item !== null ? (
              Object.entries(item as Record<string, unknown>).map(([key, nestedValue]) => (
                <p key={key}>
                  <span className="font-medium text-gray-900">{key}: </span>
                  {typeof nestedValue === 'string' || typeof nestedValue === 'number'
                    ? String(nestedValue)
                    : JSON.stringify(nestedValue)}
                </p>
              ))
            ) : (
              <p>{String(item)}</p>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (value && typeof value === 'object') {
    return (
      <div className="space-y-1 text-sm text-gray-700">
        {Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => (
          <p key={key}>
            <span className="font-medium text-gray-900">{key}: </span>
            {typeof nestedValue === 'string' || typeof nestedValue === 'number'
              ? String(nestedValue)
              : JSON.stringify(nestedValue)}
          </p>
        ))}
      </div>
    );
  }

  return null;
}

export function GuidedWalkthroughPlayer({ playback, snapshotEndpoint, readOnly = false }: Props) {
  const engineRef = useRef<PlaybackEngine | null>(null);
  const [snapshot, setSnapshot] = useState<PlaybackSnapshotState>(
    playback.latestSnapshot || {
      currentSlideIndex: 0,
      currentActionIndex: 0,
      playbackState: 'idle',
    }
  );
  const [voiceEnabled, setVoiceEnabled] = useState(
    playback.latestSnapshot?.voiceEnabled ?? playback.voiceGuidanceDefault
  );
  const [supportsSpeech, setSupportsSpeech] = useState(false);

  useEffect(() => {
    const engine = new PlaybackEngine(
      playback.slides.map((slide) => ({
        id: slide.id,
        slideIndex: slide.slideIndex,
        title: slide.title,
        actions: slide.actions.map((action) => ({
          id: action.id,
          actionIndex: action.actionIndex,
        })),
      }))
    );

    if (playback.latestSnapshot) {
      engine.restore(playback.latestSnapshot);
    }
    engineRef.current = engine;
  }, [playback]);

  useEffect(() => {
    setSupportsSpeech(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  async function persist(nextSnapshot: PlaybackSnapshotState, nextVoiceEnabled = voiceEnabled) {
    setSnapshot(nextSnapshot);
    if (!snapshotEndpoint || readOnly) {
      return;
    }

    await fetch(snapshotEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...nextSnapshot,
        voiceEnabled: nextVoiceEnabled,
        snapshotJson: {
          slideIndex: nextSnapshot.currentSlideIndex,
          actionIndex: nextSnapshot.currentActionIndex,
        },
      }),
    }).catch(() => null);
  }

  const currentSlide = playback.slides[snapshot.currentSlideIndex] || playback.slides[0];
  const currentAction = currentSlide?.actions[snapshot.currentActionIndex] || null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Guided Walkthrough</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-700">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-orange-100 px-3 py-1 font-medium text-orange-700">
              Tier {playback.tier}
            </span>
            <span>Review step {snapshot.currentSlideIndex + 1} of {playback.slides.length}</span>
            <span>{playback.walkthroughVisibility === 'static_only' ? 'Static-only playback' : 'Interactive playback'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => persist(engineRef.current?.start() || snapshot)}>
              Start
            </Button>
            <Button size="sm" variant="outline" onClick={() => persist(engineRef.current?.pause() || snapshot)}>
              Pause
            </Button>
            <Button size="sm" variant="outline" onClick={() => persist(engineRef.current?.resume() || snapshot)}>
              Resume
            </Button>
            <Button size="sm" variant="outline" onClick={() => persist(engineRef.current?.stop() || snapshot)}>
              Stop
            </Button>
            <Button size="sm" variant="outline" onClick={() => persist(engineRef.current?.prevSlide() || snapshot)}>
              Previous slide
            </Button>
            <Button size="sm" variant="outline" onClick={() => persist(engineRef.current?.nextAction() || snapshot)}>
              Next action
            </Button>
            <Button size="sm" variant="outline" onClick={() => persist(engineRef.current?.nextSlide() || snapshot)}>
              Next slide
            </Button>
            <Button
              size="sm"
              variant={voiceEnabled ? 'default' : 'outline'}
              onClick={() => {
                if (!supportsSpeech) {
                  setVoiceEnabled(false);
                  persist(snapshot, false);
                  return;
                }
                const nextValue = !voiceEnabled;
                setVoiceEnabled(nextValue);
                persist(snapshot, nextValue);
              }}
            >
              {supportsSpeech
                ? voiceEnabled
                  ? 'Voice guidance on'
                  : 'Voice guidance off'
                : 'Voice guidance unavailable'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{currentSlide?.title || 'Walkthrough unavailable'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentSlide ? (
            <>
              <div className="grid gap-3">
                {Object.entries(currentSlide.body || {}).map(([key, value]) => (
                  <div key={key} className="rounded-2xl border border-gray-200 p-4">
                    <p className="mb-2 text-sm font-medium uppercase tracking-[0.14em] text-gray-500">
                      {key}
                    </p>
                    {renderBodyValue(value)}
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Current action</p>
                <p className="mt-2">{currentAction?.narrationText || 'No active action for this slide yet.'}</p>
                {!supportsSpeech ? (
                  <p className="mt-2 text-xs text-gray-500">
                    Browser TTS is unavailable here, so walkthrough playback stays in visual explanation mode.
                  </p>
                ) : null}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-600">No playable slide is available for this deck.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
