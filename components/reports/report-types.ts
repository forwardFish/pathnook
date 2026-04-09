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
  goal?: string;
  practice?: string;
  parentPrompt?: string;
  successSignal?: string;
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
  sourceType?: string;
  doThisWeek?: string;
  notNow?: string;
  topFindings?: TopFinding[];
  evidenceGroups?: EvidenceGroup[];
  sevenDayPlan?: DayPlan[];
  completedDays?: number[];
  guardrail?: string;
  locale?: string;
  labels?: Record<string, string>;
};

export type EvidenceItem = NonNullable<EvidenceGroup['items']>[number];
