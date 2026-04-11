export type UploadSourceType =
  | 'homework'
  | 'quiz'
  | 'test'
  | 'correction'
  | 'worksheet';

export type RunStatus =
  | 'queued'
  | 'running'
  | 'needs_review'
  | 'done'
  | 'failed';

export type RunStage =
  | 'queued'
  | 'preprocessing'
  | 'extracting'
  | 'composing'
  | 'review'
  | 'done'
  | 'failed';

export type DeckTier = 'pending' | 'A' | 'B' | 'C' | 'D';

export type DeckStatus =
  | 'draft'
  | 'queued'
  | 'generating'
  | 'gated'
  | 'ready'
  | 'degraded'
  | 'hidden'
  | 'failed';

export type DeckReviewStatus = 'not_requested' | 'pending' | 'approved' | 'rejected';

export type DeckExportStatus = 'idle' | 'queued' | 'ready' | 'failed';

export type DeckPlaybackState = 'idle' | 'playing' | 'paused' | 'stopped';

export type DeckWalkthroughVisibility = 'hidden' | 'static_only' | 'full';

export type DeckSlideStatus = 'draft' | 'ready' | 'regenerated';

export type DeckActionStatus = 'draft' | 'ready' | 'rejected';

export type DeckExportFormat = 'h5' | 'pdf';

export type DeckActionType =
  | 'highlight_evidence'
  | 'focus_panel'
  | 'show_fact'
  | 'advance_note'
  | 'scroll_to_anchor';

export type PageQualityFlags = {
  blurry: boolean;
  rotated: boolean;
  dark: boolean;
  lowContrast: boolean;
  width?: number;
  height?: number;
};

export type StoredChild = {
  id: number;
  userId: number;
  nickname: string;
  grade: string;
  curriculum: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type StoredUpload = {
  id: number;
  userId: number;
  childId: number;
  sourceType: UploadSourceType;
  notes: string;
  totalPages: number;
  status: 'draft' | 'submitted';
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
};

export type StoredUploadFile = {
  id: number;
  uploadId: number;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
  pageCount: number;
  previewKind: 'image' | 'pdf';
  createdAt: string;
};

export type StoredPage = {
  id: number;
  uploadId: number;
  uploadFileId: number;
  pageNumber: number;
  sourceName: string;
  storagePath: string;
  previewLabel: string;
  isBlurry: boolean;
  isRotated: boolean;
  isDark: boolean;
  qualityScore: number;
  qualityFlags: PageQualityFlags;
  createdAt: string;
};

export type StoredRun = {
  id: number;
  userId: number;
  childId: number;
  uploadId: number;
  status: RunStatus;
  stage: RunStage;
  progressPercent: number;
  estimatedMinutes: number;
  statusMessage: string;
  overallConfidence: number | null;
  needsReviewReason: string | null;
  errorMessage: string | null;
  deckId: number | null;
  deckGenerationStatus: DeckStatus | 'idle';
  deckReviewStatus: DeckReviewStatus;
  deckExportStatus: DeckExportStatus;
  startedAt: string | null;
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StoredReport = {
  id: number;
  runId: number;
  parentReportJson: Record<string, unknown>;
  studentReportJson: Record<string, unknown>;
  tutorReportJson: Record<string, unknown>;
  deckId: number | null;
  deckStatus: DeckStatus | 'idle';
  deckTier: DeckTier;
  walkthroughVisibility: DeckWalkthroughVisibility;
  voiceGuidanceDefault: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StoredDiagnosisDeck = {
  id: number;
  runId: number;
  reportId: number;
  status: DeckStatus;
  tier: DeckTier;
  reviewStatus: DeckReviewStatus;
  walkthroughVisibility: DeckWalkthroughVisibility;
  voiceGuidanceDefault: boolean;
  qualityScore: number | null;
  qualitySummary: Record<string, unknown>;
  sourceFacts: Record<string, unknown>;
  title: string;
  generatedAt: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StoredDiagnosisSlide = {
  id: number;
  deckId: number;
  slideIndex: number;
  slideType: string;
  title: string;
  body: Record<string, unknown>;
  notes: Record<string, unknown>;
  status: DeckSlideStatus;
  createdAt: string;
  updatedAt: string;
};

export type StoredDiagnosisSlideAction = {
  id: number;
  deckId: number;
  slideId: number;
  actionIndex: number;
  actionType: DeckActionType;
  referenceKey: string | null;
  payload: Record<string, unknown>;
  narrationText: string;
  autoplay: boolean;
  status: DeckActionStatus;
  createdAt: string;
  updatedAt: string;
};

export type StoredDeckExport = {
  id: number;
  deckId: number;
  format: DeckExportFormat;
  status: DeckExportStatus | 'processing';
  artifactPath: string | null;
  metadata: Record<string, unknown>;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StoredDeckShareSetting = {
  id: number;
  deckId: number;
  reportId: number;
  allowParentPlayback: boolean;
  allowSharePlayback: boolean;
  defaultVoiceEnabled: boolean;
  maxAutoplayTier: Exclude<DeckTier, 'pending'>;
  createdAt: string;
  updatedAt: string;
};

export type StoredDeckPlaybackSnapshot = {
  id: number;
  deckId: number;
  userId: number | null;
  shareToken: string | null;
  currentSlideIndex: number;
  currentActionIndex: number;
  playbackState: DeckPlaybackState;
  voiceEnabled: boolean;
  snapshotJson: Record<string, unknown>;
  restoredAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StoredProblemItem = {
  id: number;
  runId: number;
  pageId: number;
  problemNo: string;
  problemText: string;
  studentWork: string;
  teacherMark: 'correct' | 'wrong' | 'partial' | 'unknown';
  modelIsCorrect: boolean | null;
  itemConfidence: number;
  evidenceAnchor: {
    pageNo: number;
    problemNo: string;
    previewLabel: string;
  };
  createdAt: string;
};

export type StoredErrorLabel = {
  id: number;
  code: string;
  displayName: string;
  description: string;
  createdAt: string;
};

export type StoredItemError = {
  id: number;
  itemId: number;
  labelId: number;
  severity: 'low' | 'med' | 'high';
  rationale: string;
  confidence: number;
  isPrimary: boolean;
  createdAt: string;
};

export type StoredShareLink = {
  id: number;
  reportId: number;
  token: string;
  role: 'tutor';
  createdAt: string;
  expiresAt: string;
  revokedAt: string | null;
};

export type BillingPlanType = 'one_time' | 'monthly' | 'annual';

export type StoredSubscription = {
  id: number;
  teamId: number;
  userId: number;
  provider: 'creem' | 'stripe' | 'demo';
  planType: BillingPlanType;
  priceId: string;
  status:
    | 'pending'
    | 'active'
    | 'trialing'
    | 'canceled'
    | 'expired'
    | 'paused'
    | 'scheduled_cancel'
    | 'unpaid';
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  checkoutSessionId: string | null;
  reportCredits: number;
  unlockedReportIds: number[];
  currentPeriodEndsAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StoredBillingEvent = {
  id: number;
  source: 'creem' | 'stripe' | 'demo';
  eventId: string;
  eventType: string;
  payload: Record<string, unknown>;
  processedAt: string;
};

export type StoredActivity = {
  id: number;
  userId: number;
  action: string;
  detail: string;
  timestamp: string;
};

export type DemoParentProfile = {
  id: number;
  name: string;
  email: string;
  googleSub: string | null;
  password: string;
  role: 'owner';
  is18PlusConfirmed: boolean;
  country: string;
  timezone: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type IncomingPageDraft = {
  pageNumber: number;
  previewLabel: string;
  qualityFlags: PageQualityFlags;
  storagePath: string;
};

export type IncomingUploadFile = {
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
  pageCount: number;
  previewKind: 'image' | 'pdf';
  pages: IncomingPageDraft[];
};

export type FamilyMockState = {
  meta: {
    nextIds: {
      child: number;
      upload: number;
      uploadFile: number;
      page: number;
      run: number;
      report: number;
      activity: number;
      problemItem: number;
      errorLabel: number;
      itemError: number;
      shareLink: number;
      subscription: number;
      billingEvent: number;
      diagnosisDeck: number;
      diagnosisSlide: number;
      diagnosisSlideAction: number;
      deckExport: number;
      deckShareSetting: number;
      deckPlaybackSnapshot: number;
    };
  };
  auth: {
    parentProfile: DemoParentProfile | null;
  };
  children: StoredChild[];
  uploads: StoredUpload[];
  uploadFiles: StoredUploadFile[];
  pages: StoredPage[];
  runs: StoredRun[];
  reports: StoredReport[];
  diagnosisDecks: StoredDiagnosisDeck[];
  diagnosisSlides: StoredDiagnosisSlide[];
  diagnosisSlideActions: StoredDiagnosisSlideAction[];
  deckExports: StoredDeckExport[];
  deckShareSettings: StoredDeckShareSetting[];
  deckPlaybackSnapshots: StoredDeckPlaybackSnapshot[];
  problemItems: StoredProblemItem[];
  errorLabels: StoredErrorLabel[];
  itemErrors: StoredItemError[];
  shareLinks: StoredShareLink[];
  subscriptions: StoredSubscription[];
  billingEvents: StoredBillingEvent[];
  activityLogs: StoredActivity[];
};
