export type TopFinding = {
  code?: string;
  title?: string;
  severity?: string;
  patternType?: string;
  count?: number;
  evidence?: Array<{
    pageId?: number;
    pageNo?: number;
    problemNo?: string;
    previewLabel?: string;
    highlightBox?: {
      x: number;
      y: number;
      width: number;
      height: number;
      label?: string;
    } | null;
  }>;
  whatToDo?: string;
  rationale?: string;
};

export type EvidenceGroup = {
  code?: string;
  displayName?: string;
  description?: string;
  count?: number;
  severity?: string;
  averageConfidence?: number;
  items?: Array<{
    pageId?: number;
    pageNo?: number;
    problemNo?: string;
    previewLabel?: string;
    problemText?: string;
    studentWork?: string;
    rationale?: string;
    labelCodes?: string[];
    teacherMark?: string;
    itemConfidence?: number;
    labelConfidence?: number;
    highlightBox?: {
      x: number;
      y: number;
      width: number;
      height: number;
      label?: string;
    } | null;
  }>;
};

export type DayPlan = {
  day?: number;
  minutes?: number;
  goal?: string;
  practice?: string;
  parentPrompt?: string;
  successSignal?: string;
};

export type DiagnosisAccordionItem = {
  icon?: string;
  symbol?: string;
  title?: string;
  sub?: string;
  noteKey?: string;
  noteValue?: string;
};

export type DiagnosisSummaryCard = {
  icon?: string;
  title?: string;
  main?: string;
  sub?: string;
  right?: string;
  badge?: string;
};

export type DiagnosisView = {
  heading?: string;
  subheading?: string;
  mainConclusion?: string;
  summary?: string;
  chips?: string[];
  confidenceScore?: number;
  confidenceLabel?: string;
  confidenceCopy?: string;
  kpis?: Array<{
    label?: string;
    value?: string;
    copy?: string;
  }>;
  accordionItems?: DiagnosisAccordionItem[];
  skeletonMetrics?: Array<{
    label?: string;
    value?: string;
    copy?: string;
  }>;
  summaryCards?: DiagnosisSummaryCard[];
  insightCards?: Array<{
    title?: string;
    value?: string;
    copy?: string;
  }>;
};

export type ShortestPathPhase = {
  step?: string;
  title?: string;
  tag?: string;
  copy?: string;
  duration?: string;
};

export type ShortestPathView = {
  overviewTitle?: string;
  overviewCopy?: string;
  banner?: string;
  phases?: ShortestPathPhase[];
  currentNode?: string;
  keyLeverage?: string;
  leverageCopy?: string;
  whyFirst?: string;
  whatThisSolves?: string;
  whatWaits?: string;
  communicationFocus?: string;
  communicationItems?: Array<{
    title?: string;
    sub?: string;
    body?: string;
  }>;
};

export type OutputGateView = {
  gateCode?: string;
  title?: string;
  status?: string;
  body?: string;
  whatThisVerifies?: string;
  howToCheck?: string;
};

export type OutputGatesView = {
  title?: string;
  subhead?: string;
  heroTitle?: string;
  heroBody?: string;
  readyCount?: number;
  optionalCount?: number;
  parentRule?: string;
  gates?: OutputGateView[];
  evidenceGroupTitles?: string[];
  reminders?: Array<{
    title?: string;
    body?: string;
  }>;
};

export type CompareSnapshotView = {
  improved?: string;
  stillUneven?: string;
  needsSupport?: string;
  trendPoints?: number[];
  nextSuggestedFocus?: string;
  resumeDecision?: string;
  compareSummary?: string;
};

export type ReviewStateView = {
  releaseStatus?: string | null;
  reviewReason?: string | null;
  reviewBanner?: string | null;
  qualityFlags?: Record<string, unknown>;
};

export type ShareArtifactView = {
  shareSummary?: string;
  tutorSummary?: string;
  resumeCallToAction?: string;
};

export type DeepResearchReportViewModel = {
  reportId: number;
  source: 'structured' | 'legacy';
  parentReport: ParentReport;
  labels: Record<string, string>;
  diagnosis: DiagnosisView;
  shortestPath: ShortestPathView;
  plan: {
    days: DayPlan[];
    guardrail?: string;
    completedDays: number[];
  };
  outputGates: OutputGatesView;
  compare: CompareSnapshotView;
  review: ReviewStateView;
  shareArtifact?: ShareArtifactView;
};

export type ParentReport = {
  summary?: string;
  confidence?: number;
  confidenceBand?: string;
  releaseStatus?: string;
  reviewReason?: string | null;
  reviewBanner?: string | null;
  childNickname?: string;
  grade?: string;
  curriculum?: string;
  sourceType?: string;
  doThisWeek?: string;
  notNow?: string;
  topFindings?: TopFinding[];
  evidenceGroups?: EvidenceGroup[];
  sevenDayPlan?: DayPlan[];
  completedDays?: number[];
  parentNote?: string;
  guardrail?: string;
  locale?: string;
  labels?: Record<string, string>;
  sourceMeta?: Record<string, unknown>;
};

export type EvidenceItem = NonNullable<EvidenceGroup['items']>[number];
