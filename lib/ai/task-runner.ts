import { z } from 'zod';
import {
  canonicalExtractionBundleSchema,
  type CanonicalExtractionBundle,
  type CanonicalExtractionPage,
  type LabeledProblemItem,
} from '@/lib/ai/extraction-schema';
import { getReviewDecision } from '@/lib/ai/confidence';
import { getProvider, getProviderConfig } from '@/lib/ai/providers/registry';
import {
  parseModelReference,
  type ModelProviderName,
  type ModelTaskExecutionTrace,
  type ModelTaskRequest,
  type ModelTaskResult,
  type ModelTaskType,
} from '@/lib/ai/providers/base';
import { getTaskPolicy } from '@/lib/ai/task-policy';
import {
  recordAnalysisRunModel,
  recordModelCallFailover,
} from '@/lib/observability/model-runtime';

const extractItemsLooseOutputSchema = z
  .object({
    pages: z.array(z.any()).default([]),
    labeledItems: z.array(z.any()).default([]),
    overallConfidence: z.number().min(0).max(1).optional(),
    requiresReview: z.boolean().optional(),
    reviewReason: z.string().nullable().optional(),
  })
  .passthrough();

function clampConfidence(value: unknown, fallback: number) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return fallback;
  }
  return Math.max(0, Math.min(1, value));
}

function safeText(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function safeProblemNo(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function normalizeTeacherMark(
  value: unknown
): 'correct' | 'wrong' | 'partial' | 'unknown' {
  return value === 'correct' || value === 'wrong' || value === 'partial' || value === 'unknown'
    ? value
    : 'unknown';
}

function buildPlaceholderProblemItem(page: {
  id: number;
  pageNumber: number;
  previewLabel: string;
}) {
  return {
    problemNo: String(page.pageNumber),
    problemText: `Representative review item from ${page.previewLabel}`,
    studentWork: 'Manual review needed from uploaded page artifact.',
    teacherMark: 'unknown' as const,
    modelIsCorrect: null,
    itemConfidence: 0.42,
    evidenceAnchor: {
      pageId: page.id,
      pageNo: page.pageNumber,
      problemNo: String(page.pageNumber),
      previewLabel: page.previewLabel,
    },
  };
}

function normalizeProblemItem(
  candidate: Record<string, unknown> | undefined,
  page: {
    id: number;
    pageNumber: number;
    previewLabel: string;
  },
  fallbackIndex: number
) {
  const placeholder = buildPlaceholderProblemItem(page);
  const candidateAnchor =
    candidate?.evidenceAnchor && typeof candidate.evidenceAnchor === 'object'
      ? (candidate.evidenceAnchor as Record<string, unknown>)
      : undefined;
  const problemNo = safeProblemNo(
    candidate?.problemNo ?? candidateAnchor?.problemNo,
    String(fallbackIndex + 1)
  );

  return {
    problemNo,
    problemText: safeText(
      candidate?.problemText,
      placeholder.problemText
    ),
    studentWork: safeText(
      candidate?.studentWork,
      placeholder.studentWork
    ),
    teacherMark: normalizeTeacherMark(candidate?.teacherMark),
    modelIsCorrect:
      typeof candidate?.modelIsCorrect === 'boolean' || candidate?.modelIsCorrect === null
        ? candidate.modelIsCorrect
        : null,
    itemConfidence: clampConfidence(candidate?.itemConfidence, placeholder.itemConfidence),
    evidenceAnchor: {
      pageId: page.id,
      pageNo: page.pageNumber,
      problemNo,
      previewLabel: page.previewLabel,
    },
  };
}

function normalizeExtractItemsOutput(args: {
  rawOutput: z.infer<typeof extractItemsLooseOutputSchema>;
  pages: Array<{
    id: number;
    pageNumber: number;
    previewLabel: string;
    sourceName: string;
    qualityFlags: {
      blurry: boolean;
      rotated: boolean;
      dark: boolean;
      lowContrast: boolean;
    };
  }>;
}) {
  const normalizedPages: CanonicalExtractionPage[] = args.pages.map((page, pageIndex) => {
    const candidate = args.rawOutput.pages.find((item, index) => {
      if (!item || typeof item !== 'object') {
        return index === pageIndex;
      }

      const record = item as Record<string, unknown>;
      return record.pageId === page.id || record.pageNo === page.pageNumber || index === pageIndex;
    }) as Record<string, unknown> | undefined;

    const candidateItems = Array.isArray(candidate?.items) ? candidate.items : [];
    const normalizedItems =
      candidateItems.length > 0
        ? candidateItems.map((item, itemIndex) =>
            normalizeProblemItem(
              item && typeof item === 'object' ? (item as Record<string, unknown>) : undefined,
              page,
              itemIndex
            )
          )
        : [buildPlaceholderProblemItem(page)];

    return {
      pageId: page.id,
      pageNo: page.pageNumber,
      sourceName: page.sourceName,
      detectedLanguage: safeText(candidate?.detectedLanguage, 'en'),
      pageConfidence: clampConfidence(candidate?.pageConfidence, 0.45),
      qualityFlags: page.qualityFlags,
      items: normalizedItems,
    };
  });

  const normalizedLabeledItems: LabeledProblemItem[] = normalizedPages.map((page, pageIndex) => {
    const primaryItem = page.items[0];
    const candidate = Array.isArray(args.rawOutput.labeledItems)
      ? (args.rawOutput.labeledItems[pageIndex] as Record<string, unknown> | undefined)
      : undefined;
    const candidateLabels = Array.isArray(candidate?.labels) ? candidate.labels : [];
    const normalizedLabels: LabeledProblemItem['labels'] =
      candidateLabels.length > 0
        ? candidateLabels
            .map((label) => (label && typeof label === 'object' ? (label as Record<string, unknown>) : null))
            .filter(Boolean)
            .slice(0, 2)
            .map((label, labelIndex) => ({
              code: safeText(label?.code, labelIndex === 0 ? 'incomplete_reasoning' : 'careless_slip'),
              severity:
                label?.severity === 'low' || label?.severity === 'med' || label?.severity === 'high'
                  ? label.severity
                  : ('med' as const),
              labelConfidence: clampConfidence(label?.labelConfidence, labelIndex === 0 ? 0.68 : 0.52),
              role:
                label?.role === 'secondary' && labelIndex > 0
                  ? ('secondary' as const)
                  : ('primary' as const),
            }))
        : [
            {
              code: 'incomplete_reasoning',
              severity: 'med' as const,
              labelConfidence: 0.68,
              role: 'primary' as const,
            },
          ];

    return {
      ...primaryItem,
      labels: normalizedLabels,
      rationale: safeText(
        candidate?.rationale,
        `This placeholder diagnostic item summarizes follow-up work needed for ${page.sourceName} page ${page.pageNo}.`
      ),
    };
  });

  const overallConfidence =
    typeof args.rawOutput.overallConfidence === 'number'
      ? clampConfidence(args.rawOutput.overallConfidence, 0.5)
      : Number(
          (
            normalizedPages.reduce((sum, page) => sum + page.pageConfidence, 0) /
            Math.max(1, normalizedPages.length)
          ).toFixed(2)
        );

  return {
    pages: normalizedPages,
    labeledItems: normalizedLabeledItems,
    overallConfidence,
    requiresReview:
      typeof args.rawOutput.requiresReview === 'boolean'
        ? args.rawOutput.requiresReview
        : overallConfidence < 0.55,
    reviewReason:
      args.rawOutput.reviewReason === null || typeof args.rawOutput.reviewReason === 'string'
        ? args.rawOutput.reviewReason ?? null
        : null,
  };
}

function normalizeTaskError(error: unknown) {
  if (error instanceof Error) {
    const extra = error as Error & { code?: string; status?: number };
    return {
      errorType: extra.code || 'model_task_error',
      errorMessage: extra.message,
      statusCode: extra.status,
    };
  }

  return {
    errorType: 'unknown_model_task_error',
    errorMessage: String(error),
  };
}

function buildExtractItemsRequest(args: {
  pages: Array<{
    id: number;
    pageNumber: number;
    sourceName: string;
    previewLabel: string;
    qualityFlags: {
      blurry: boolean;
      rotated: boolean;
      dark: boolean;
      lowContrast: boolean;
    };
  }>;
}): ModelTaskRequest {
  return {
    taskType: 'extract-items',
    schemaName: 'canonical-extraction-bundle',
    systemPrompt:
      'Return compact JSON only. Build synthetic placeholder extraction data from page descriptors. Do not provide real homework answers.',
    developerPrompt:
      'Include a pages array and a labeledItems array. One labeled item minimum. Use short placeholder text when content is unavailable.',
    inputPayload: {
      task: 'Create a placeholder extraction bundle from page descriptors.',
      pages: args.pages.map((page) => ({
        pageId: page.id,
        pageNo: page.pageNumber,
        sourceName: page.sourceName,
        previewLabel: page.previewLabel,
        qualityFlags: page.qualityFlags,
      })),
    },
    temperature: 0.1,
  };
}

async function runModelTaskWithFallback<T>(args: {
  runId: number;
  taskRequest: ModelTaskRequest;
  outputSchema: z.ZodType<T>;
}): Promise<{ result: ModelTaskResult<T>; trace: ModelTaskExecutionTrace }> {
  const policy = getTaskPolicy(args.taskRequest.taskType);
  const candidateRefs = [policy.primaryModel, ...policy.fallbackModels];
  const attempts: ModelTaskExecutionTrace['attempts'] = [];
  let previousFailedAttempt: ModelTaskExecutionTrace['attempts'][number] | null = null;
  let lastError: unknown = null;

  for (const [attemptIndex, modelRef] of candidateRefs.entries()) {
    const { provider, model } = parseModelReference(modelRef);
    const providerInstance = await getProvider(provider);
    const providerConfig =
      provider === 'custom' ? null : await getProviderConfig(provider as Extract<ModelProviderName, 'openai' | 'moonshot'>);

    if (attemptIndex > 0 && previousFailedAttempt) {
      await recordModelCallFailover({
        runId: args.runId,
        taskType: args.taskRequest.taskType,
        fromRunModelId: previousFailedAttempt.recordId || null,
        fromProviderName: previousFailedAttempt.provider,
        fromModelName: previousFailedAttempt.model,
        toProviderName: provider,
        toModelName: model,
        errorType: previousFailedAttempt.errorType || null,
        errorMessage: previousFailedAttempt.errorMessage || null,
        metadata: {
          fromAttemptIndex: previousFailedAttempt.attemptIndex,
          toAttemptIndex: attemptIndex,
        },
      });
    }

    if (!providerInstance.isConfigured()) {
      const skippedAttempt = {
        attemptIndex,
        provider,
        model,
        status: 'skipped' as const,
        latencyMs: 0,
        finishReason: 'provider_unavailable',
        errorType: 'provider_unavailable',
        errorMessage: `${provider} is not configured for this environment.`,
      };
      const recordedAttempt = await recordAnalysisRunModel({
        runId: args.runId,
        providerConfigId: providerConfig?.configId ?? null,
        taskType: args.taskRequest.taskType,
        attemptIndex,
        providerName: provider,
        modelName: model,
        status: skippedAttempt.status,
        finishReason: skippedAttempt.finishReason,
        latencyMs: 0,
        usage: undefined,
        metadata: {
          errorType: skippedAttempt.errorType,
          errorMessage: skippedAttempt.errorMessage,
        },
      });
      attempts.push({
        ...skippedAttempt,
        recordId: recordedAttempt.id,
      });
      previousFailedAttempt = attempts[attempts.length - 1];
      lastError = new Error(skippedAttempt.errorMessage);
      continue;
    }

    try {
      const taskResult = await providerInstance.runTask<unknown>({
        ...args.taskRequest,
        model,
        temperature: policy.temperature ?? args.taskRequest.temperature,
      });
      const parsedOutput = args.outputSchema.parse(taskResult.output);
      const recordedAttempt = await recordAnalysisRunModel({
        runId: args.runId,
        providerConfigId: providerConfig?.configId ?? null,
        taskType: args.taskRequest.taskType,
        attemptIndex,
        providerName: provider,
        modelName: model,
        status: 'success',
        finishReason: taskResult.finishReason || 'stop',
        latencyMs: taskResult.latencyMs ?? null,
        usage: taskResult.usage,
        metadata: {},
      });
      const successAttempt = {
        attemptIndex,
        provider,
        model,
        status: 'success' as const,
        latencyMs: taskResult.latencyMs ?? 0,
        finishReason: taskResult.finishReason,
        usage: taskResult.usage,
        recordId: recordedAttempt.id,
      };
      attempts.push(successAttempt);

      return {
        result: {
          ...taskResult,
          output: parsedOutput,
          provider,
          model,
        },
        trace: {
          taskType: args.taskRequest.taskType,
          selectedProvider: provider,
          selectedModel: model,
          fallbackApplied: attemptIndex > 0,
          attempts,
        },
      };
    } catch (error) {
      const normalizedError = normalizeTaskError(error);
      const failedRecord = await recordAnalysisRunModel({
        runId: args.runId,
        providerConfigId: providerConfig?.configId ?? null,
        taskType: args.taskRequest.taskType,
        attemptIndex,
        providerName: provider,
        modelName: model,
        status: 'failed',
        finishReason: 'error',
        latencyMs: null,
        usage: undefined,
        metadata: {
          errorType: normalizedError.errorType,
          errorMessage: normalizedError.errorMessage,
          statusCode: normalizedError.statusCode ?? null,
        },
      });
      attempts.push({
        attemptIndex,
        provider,
        model,
        status: 'failed',
        latencyMs: 0,
        finishReason: 'error',
        errorType: normalizedError.errorType,
        errorMessage: normalizedError.errorMessage,
        recordId: failedRecord.id,
      });
      previousFailedAttempt = attempts[attempts.length - 1];
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`All model attempts failed for task ${args.taskRequest.taskType}.`);
}

export async function runExtractItemsTask(args: {
  runId: number;
  pages: Array<{
    id: number;
    pageNumber: number;
    previewLabel: string;
    sourceName: string;
    storagePath: string;
    qualityFlags: {
      blurry: boolean;
      rotated: boolean;
      dark: boolean;
      lowContrast: boolean;
    };
  }>;
}) {
  const { result, trace } = await runModelTaskWithFallback({
    runId: args.runId,
    taskRequest: buildExtractItemsRequest({
      pages: args.pages,
    }),
    outputSchema: extractItemsLooseOutputSchema,
  });

  const normalizedOutput = normalizeExtractItemsOutput({
    rawOutput: result.output,
    pages: args.pages,
  });

  const reviewDecision =
    typeof normalizedOutput.requiresReview === 'boolean'
      ? {
          requiresReview: normalizedOutput.requiresReview,
          reviewReason: normalizedOutput.reviewReason,
        }
      : getReviewDecision(normalizedOutput.pages, normalizedOutput.overallConfidence);

  const bundle: CanonicalExtractionBundle = canonicalExtractionBundleSchema.parse({
    runId: args.runId,
    engine: result.provider,
    modelVersion: result.model,
    ...normalizedOutput,
    requiresReview: reviewDecision.requiresReview,
    reviewReason: reviewDecision.reviewReason,
  });

  return {
    bundle,
    trace,
  };
}
