import type { CanonicalExtractionBundle, LabeledProblemItem } from '@/lib/ai/extraction-schema';
import { getTaxonomyByCode } from '@/lib/ai/taxonomy';

type ChildSummary = {
  nickname: string;
  grade: string;
  curriculum: string;
};

type UploadSummary = {
  sourceType: string;
};

type DayPlan = {
  day: number;
  minutes: number;
  goal: string;
  practice: string;
  parentPrompt: string;
  successSignal: string;
};

function buildHighlightBox(pageNo: number, problemNo: string) {
  const numericProblem = Number.parseInt(String(problemNo).replace(/\D/g, ''), 10);
  const normalizedIndex = Number.isFinite(numericProblem) && numericProblem > 0
    ? (numericProblem - 1) % 6
    : 0;

  return {
    x: 10,
    y: 14 + normalizedIndex * 13,
    width: 78,
    height: 10,
    label: `Problem ${problemNo} on page ${pageNo}`,
  };
}

function buildPlan(primaryFocus: string, secondaryFocus: string): DayPlan[] {
  return [
    {
      day: 1,
      minutes: 20,
      goal: `Name the pattern behind ${primaryFocus}.`,
      practice: 'Review two worked examples and explain why the method matters.',
      parentPrompt: 'Ask your child to narrate the first step before writing anything.',
      successSignal: 'They can describe the setup in words before solving.',
    },
    {
      day: 2,
      minutes: 20,
      goal: `Slow down the procedure for ${primaryFocus}.`,
      practice: 'Solve two short items while speaking each step out loud.',
      parentPrompt: 'Pause after each line and ask what changed from the line above.',
      successSignal: 'The order of steps stays consistent without guessing.',
    },
    {
      day: 3,
      minutes: 20,
      goal: `Catch slips linked to ${secondaryFocus}.`,
      practice: 'Do one warm-up and two error-correction items from the same skill family.',
      parentPrompt: 'Ask which symbol, sign, or number is easiest to lose when rushing.',
      successSignal: 'Your child can self-correct at least one slip before you point to it.',
    },
    {
      day: 4,
      minutes: 15,
      goal: 'Mix old and new without increasing pressure.',
      practice: 'Use two mixed questions and one short reflection after each answer.',
      parentPrompt: 'Ask which problem felt more stable today and why.',
      successSignal: 'They can compare one strong response and one wobbly response.',
    },
    {
      day: 5,
      minutes: 15,
      goal: `Rehearse ${primaryFocus} in a new context.`,
      practice: 'Try one worksheet-style item and one verbal explanation prompt.',
      parentPrompt: 'Ask how they know they picked the right starting strategy.',
      successSignal: 'They choose the method with less prompting than earlier in the week.',
    },
    {
      day: 6,
      minutes: 15,
      goal: 'Practice checking instead of racing to finish.',
      practice: 'Complete one timed-light practice set with a final check pass.',
      parentPrompt: 'Ask what they check first when they think they are done.',
      successSignal: 'They perform a deliberate final check on signs, units, or notation.',
    },
    {
      day: 7,
      minutes: 15,
      goal: 'Wrap the week with confidence and one small stretch.',
      practice: 'Revisit one earlier mistake and one mixed challenge item.',
      parentPrompt: 'Ask what feels easier now and what still needs one more week.',
      successSignal: 'They can explain one improvement and one next focus area.',
    },
  ];
}

function toSeverity(score: number) {
  if (score < 0.58) {
    return 'high';
  }
  if (score < 0.76) {
    return 'med';
  }
  return 'low';
}

function formatFindingAction(code: string, displayName: string) {
  switch (code) {
    case 'procedure_gap':
      return 'Rebuild the step order with slow, spoken practice before adding harder problems.';
    case 'calculation_slip':
      return 'Keep the same method but add a deliberate final arithmetic check.';
    case 'notation_error':
      return 'Use cleaner written notation and ask your child to name each symbol as they write it.';
    case 'strategy_error':
      return 'Compare two solving strategies and choose the simpler one before starting.';
    case 'concept_gap':
      return 'Use a concrete visual or verbal explanation before returning to the worksheet.';
    default:
      return `Practice ${displayName.toLowerCase()} with short, high-clarity examples before mixed review.`;
  }
}

type GroupedItem = {
  code: string;
  displayName: string;
  description: string;
  rationale: string;
  items: LabeledProblemItem[];
  averageConfidence: number;
  strongestSeverity: 'low' | 'med' | 'high';
};

function groupItems(bundle: CanonicalExtractionBundle): GroupedItem[] {
  const grouped = new Map<string, GroupedItem>();

  for (const item of bundle.labeledItems) {
    for (const label of item.labels) {
      const taxonomy = getTaxonomyByCode(label.code);
      if (!taxonomy) {
        continue;
      }

      const existing = grouped.get(label.code);
      if (!existing) {
        grouped.set(label.code, {
          code: taxonomy.code,
          displayName: taxonomy.displayName,
          description: taxonomy.description,
          rationale: item.rationale,
          items: [item],
          averageConfidence: label.labelConfidence,
          strongestSeverity: label.severity,
        });
        continue;
      }

      existing.items.push(item);
      existing.averageConfidence = Number(
        (
          existing.items.reduce(
            (sum, groupedItem) =>
              sum +
              groupedItem.labels.find((candidate) => candidate.code === label.code)!.labelConfidence,
            0
          ) / existing.items.length
        ).toFixed(2)
      );
      if (
        (existing.strongestSeverity === 'low' && label.severity !== 'low') ||
        (existing.strongestSeverity === 'med' && label.severity === 'high')
      ) {
        existing.strongestSeverity = label.severity;
      }
    }
  }

  return Array.from(grouped.values()).sort((left, right) => {
    if (right.items.length !== left.items.length) {
      return right.items.length - left.items.length;
    }
    return left.averageConfidence - right.averageConfidence;
  });
}

export function buildReportsFromExtraction(args: {
  bundle: CanonicalExtractionBundle;
  child: ChildSummary;
  upload: UploadSummary;
}) {
  const { bundle, child, upload } = args;
  const groups = groupItems(bundle);
  const primary = groups[0];
  const secondary = groups[1] || groups[0];
  const sevenDayPlan = buildPlan(
    primary?.displayName || 'core math procedure',
    secondary?.displayName || 'error checking'
  );

  const topFindings = groups.slice(0, 3).map((group) => ({
    code: group.code,
    title: group.displayName,
    severity: group.strongestSeverity,
    patternType: group.items.length >= 3 ? 'pattern' : 'sporadic',
    count: group.items.length,
    evidence: group.items.slice(0, 3).map((item) => ({
      pageId: item.evidenceAnchor.pageId,
      pageNo: item.evidenceAnchor.pageNo,
      problemNo: item.evidenceAnchor.problemNo,
      previewLabel: item.evidenceAnchor.previewLabel,
      highlightBox: buildHighlightBox(item.evidenceAnchor.pageNo, item.evidenceAnchor.problemNo),
    })),
    whatToDo: formatFindingAction(group.code, group.displayName),
    rationale: group.rationale,
  }));

  const evidenceGroups = groups.map((group) => ({
    code: group.code,
    displayName: group.displayName,
    description: group.description,
    count: group.items.length,
    averageConfidence: group.averageConfidence,
    severity: group.strongestSeverity,
    items: group.items.map((item) => ({
      pageId: item.evidenceAnchor.pageId,
      pageNo: item.evidenceAnchor.pageNo,
      problemNo: item.evidenceAnchor.problemNo,
      previewLabel: item.evidenceAnchor.previewLabel,
      problemText: item.problemText,
      studentWork: item.studentWork,
      teacherMark: item.teacherMark,
      rationale: item.rationale,
      labelCodes: item.labels.map((label) => label.code),
      itemConfidence: item.itemConfidence,
      labelConfidence: Number(
        (
          item.labels.reduce((sum, label) => sum + label.labelConfidence, 0) /
          Math.max(1, item.labels.length)
        ).toFixed(2)
      ),
      highlightBox: buildHighlightBox(item.evidenceAnchor.pageNo, item.evidenceAnchor.problemNo),
    })),
  }));

  const reportState = bundle.requiresReview ? 'needs_review' : 'ready';
  const confidenceBand = toSeverity(bundle.overallConfidence);
  const summary = primary
    ? `${primary.displayName} is the clearest repeat pattern across this upload, with ${secondary?.displayName || 'secondary slips'} showing up as the next focus area.`
    : 'The upload is structurally processed, but the diagnosis needs more evidence before a stronger conclusion.';

  return {
    parentReportJson: {
      childNickname: child.nickname,
      grade: child.grade,
      curriculum: child.curriculum,
      sourceType: upload.sourceType,
      summary,
      confidence: bundle.overallConfidence,
      confidenceBand,
      releaseStatus: reportState,
      reviewReason: bundle.reviewReason,
      patternSummary: topFindings.map((finding) => ({
        code: finding.code,
        title: finding.title,
        patternType: finding.patternType,
      })),
      topFindings,
      evidenceGroups,
      doThisWeek:
        primary?.displayName
          ? `Start by stabilizing ${primary.displayName.toLowerCase()} before introducing harder mixed practice.`
          : 'Retake the clearest pages and keep practice short and structured this week.',
      notNow:
        'Do not turn this report into direct homework answers or jump to harder packets before the repeated pattern settles.',
      sevenDayPlan,
      completedDays: [],
      releasedWithReviewBanner: bundle.requiresReview,
      reviewBanner:
        bundle.requiresReview && bundle.reviewReason
          ? `Draft report only: ${bundle.reviewReason}`
          : null,
      guardrail: 'This report supports diagnosis and practice planning, not direct homework answers.',
      locale: 'en-US',
    },
    studentReportJson: {
      headline:
        primary?.displayName
          ? `This week we are making ${primary.displayName.toLowerCase()} feel more predictable.`
          : 'This week we are slowing down and making each step clearer.',
      focusAreas: topFindings.map((finding) => finding.title),
      nextSteps: sevenDayPlan.slice(0, 3),
      encouragement:
        'The goal is not speed. The goal is clear steps, cleaner checking, and fewer repeated slips.',
    },
    tutorReportJson: {
      intakeSummary: `${child.nickname} (${child.grade}, ${child.curriculum}) uploaded a ${upload.sourceType} packet for structured diagnosis.`,
      recommendedFocus: primary?.displayName || 'clarity and slower checking',
      secondaryFocus: secondary?.displayName || null,
      evidenceGroups,
      confidence: bundle.overallConfidence,
      releaseStatus: reportState,
      reviewReason: bundle.reviewReason,
      notes:
        bundle.requiresReview
          ? 'Use this as a draft until manual review confirms the weakest evidence anchors.'
          : 'The extraction confidence is strong enough for a first-session tutoring brief.',
    },
  };
}
