import 'server-only';

import { calculateOverallConfidence, getReviewDecision } from '@/lib/ai/confidence';
import { generateDemoExtractionPages, generateDemoLabels } from '@/lib/ai/demo-engine';
import {
  canonicalExtractionBundleSchema,
  type CanonicalExtractionBundle,
} from '@/lib/ai/extraction-schema';
import { extractWithMathpixFallback } from '@/lib/ai/mathpix';
import { extractWithOpenAIVision } from '@/lib/ai/openai-vision';

type PageInput = {
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
};

async function buildDemoBundle(
  runId: number,
  modelVersion: string,
  pages: PageInput[]
): Promise<CanonicalExtractionBundle> {
  const extractedPages = generateDemoExtractionPages(pages);
  const labeledItems = generateDemoLabels(extractedPages);
  const overallConfidence = calculateOverallConfidence(extractedPages, labeledItems);
  const reviewDecision = getReviewDecision(extractedPages, overallConfidence);

  return canonicalExtractionBundleSchema.parse({
    runId,
    engine: 'demo',
    modelVersion,
    pages: extractedPages,
    labeledItems,
    overallConfidence,
    requiresReview: reviewDecision.requiresReview,
    reviewReason: reviewDecision.reviewReason,
  });
}

export async function processRunExtraction(args: {
  runId: number;
  pages: PageInput[];
  preferMathpix?: boolean;
}) {
  const modelVersion = process.env.OPENAI_MODEL_VISION || 'gpt-4.1-mini';
  const fallback = () => buildDemoBundle(args.runId, modelVersion, args.pages);

  const bundle = args.preferMathpix
    ? await extractWithMathpixFallback({
        runId: args.runId,
        fallback,
      })
    : await extractWithOpenAIVision({
        runId: args.runId,
        modelVersion,
        pages: args.pages,
        fallback,
      });

  return canonicalExtractionBundleSchema.parse(bundle);
}
