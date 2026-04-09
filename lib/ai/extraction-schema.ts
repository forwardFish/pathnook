import { z } from 'zod';

export const evidenceAnchorSchema = z.object({
  pageId: z.number().int().positive(),
  pageNo: z.number().int().positive(),
  problemNo: z.string().min(1),
  previewLabel: z.string().min(1),
});

export const canonicalProblemItemSchema = z.object({
  problemNo: z.string().min(1),
  problemText: z.string().min(1),
  studentWork: z.string().min(1),
  teacherMark: z.enum(['correct', 'wrong', 'partial', 'unknown']),
  modelIsCorrect: z.boolean().nullable(),
  itemConfidence: z.number().min(0).max(1),
  evidenceAnchor: evidenceAnchorSchema,
});

export const canonicalExtractionPageSchema = z.object({
  pageId: z.number().int().positive(),
  pageNo: z.number().int().positive(),
  sourceName: z.string().min(1),
  detectedLanguage: z.string().min(2).default('en'),
  pageConfidence: z.number().min(0).max(1),
  qualityFlags: z.object({
    blurry: z.boolean(),
    rotated: z.boolean(),
    dark: z.boolean(),
    lowContrast: z.boolean(),
  }),
  items: z.array(canonicalProblemItemSchema).min(1),
});

export const labeledProblemItemSchema = canonicalProblemItemSchema.extend({
  labels: z
    .array(
      z.object({
        code: z.string().min(1),
        severity: z.enum(['low', 'med', 'high']),
        labelConfidence: z.number().min(0).max(1),
      })
    )
    .min(1),
  rationale: z.string().min(1),
});

export const canonicalExtractionBundleSchema = z.object({
  runId: z.number().int().positive(),
  engine: z.enum(['demo', 'openai', 'mathpix']),
  modelVersion: z.string().min(1),
  pages: z.array(canonicalExtractionPageSchema).min(1),
  labeledItems: z.array(labeledProblemItemSchema).min(1),
  overallConfidence: z.number().min(0).max(1),
  requiresReview: z.boolean(),
  reviewReason: z.string().nullable(),
});

export type EvidenceAnchor = z.infer<typeof evidenceAnchorSchema>;
export type CanonicalProblemItem = z.infer<typeof canonicalProblemItemSchema>;
export type CanonicalExtractionPage = z.infer<typeof canonicalExtractionPageSchema>;
export type LabeledProblemItem = z.infer<typeof labeledProblemItemSchema>;
export type CanonicalExtractionBundle = z.infer<typeof canonicalExtractionBundleSchema>;
