import 'server-only';

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { FamilyMockState } from '@/lib/family/types';

const runtimeRoot = path.join(
  process.cwd(),
  'tasks',
  'runtime',
  'family_local_runtime'
);
const statePath = path.join(runtimeRoot, 'family_mock_state.json');
const uploadsRoot = path.join(runtimeRoot, 'uploads');

function createEmptyState(): FamilyMockState {
  return {
    meta: {
      nextIds: {
        child: 1,
        upload: 1,
        uploadFile: 1,
        page: 1,
        run: 1,
        report: 1,
        activity: 1,
        problemItem: 1,
        errorLabel: 1,
        itemError: 1,
        shareLink: 1,
        subscription: 1,
        billingEvent: 1,
        diagnosisDeck: 1,
        diagnosisSlide: 1,
        diagnosisSlideAction: 1,
        deckExport: 1,
        deckShareSetting: 1,
        deckPlaybackSnapshot: 1,
      },
    },
    auth: {
      parentProfile: null,
    },
    children: [],
    uploads: [],
    uploadFiles: [],
    pages: [],
    runs: [],
    reports: [],
    diagnosisDecks: [],
    diagnosisSlides: [],
    diagnosisSlideActions: [],
    deckExports: [],
    deckShareSettings: [],
    deckPlaybackSnapshots: [],
    problemItems: [],
    errorLabels: [],
    itemErrors: [],
    shareLinks: [],
    subscriptions: [],
    billingEvents: [],
    activityLogs: [],
  };
}

function normalizeState(parsed: Partial<FamilyMockState>): FamilyMockState {
  const empty = createEmptyState();

  return {
    meta: {
      nextIds: {
        ...empty.meta.nextIds,
        ...(parsed.meta?.nextIds || {}),
      },
    },
    auth: {
      parentProfile: parsed.auth?.parentProfile || empty.auth.parentProfile,
    },
    children: parsed.children || [],
    uploads: parsed.uploads || [],
    uploadFiles: parsed.uploadFiles || [],
    pages: parsed.pages || [],
    runs: parsed.runs || [],
    reports: parsed.reports || [],
    diagnosisDecks: parsed.diagnosisDecks || [],
    diagnosisSlides: parsed.diagnosisSlides || [],
    diagnosisSlideActions: parsed.diagnosisSlideActions || [],
    deckExports: parsed.deckExports || [],
    deckShareSettings: parsed.deckShareSettings || [],
    deckPlaybackSnapshots: parsed.deckPlaybackSnapshots || [],
    problemItems: parsed.problemItems || [],
    errorLabels: parsed.errorLabels || [],
    itemErrors: (parsed.itemErrors || []).map((itemError) => ({
      ...itemError,
      isPrimary: itemError.isPrimary ?? true,
    })),
    shareLinks: parsed.shareLinks || [],
    subscriptions: parsed.subscriptions || [],
    billingEvents: parsed.billingEvents || [],
    activityLogs: parsed.activityLogs || [],
  };
}

async function ensureRuntimeDirs() {
  await mkdir(runtimeRoot, { recursive: true });
  await mkdir(uploadsRoot, { recursive: true });
}

export async function getFamilyRuntimePaths() {
  await ensureRuntimeDirs();
  return {
    runtimeRoot,
    statePath,
    uploadsRoot,
  };
}

export async function readFamilyMockState(): Promise<FamilyMockState> {
  await ensureRuntimeDirs();

  try {
    const existing = await readFile(statePath, 'utf8');
    return normalizeState(JSON.parse(existing) as Partial<FamilyMockState>);
  } catch {
    const empty = createEmptyState();
    await writeFile(statePath, JSON.stringify(empty, null, 2), 'utf8');
    return empty;
  }
}

export async function writeFamilyMockState(state: FamilyMockState) {
  await ensureRuntimeDirs();
  await writeFile(statePath, JSON.stringify(state, null, 2), 'utf8');
}

export async function updateFamilyMockState<T>(
  updater: (state: FamilyMockState) => T | Promise<T>
) {
  const state = await readFamilyMockState();
  const result = await updater(state);
  await writeFamilyMockState(state);
  return result;
}
