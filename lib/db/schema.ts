import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  real,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  googleSub: varchar('google_sub', { length: 255 }).unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  is18PlusConfirmed: boolean('is_18plus_confirmed').notNull().default(false),
  country: varchar('country', { length: 100 }).notNull().default('US'),
  timezone: varchar('timezone', { length: 100 })
    .notNull()
    .default('America/Los_Angeles'),
  locale: varchar('locale', { length: 20 }).notNull().default('en-US'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  role: varchar('role', { length: 50 }).notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  invitedBy: integer('invited_by')
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp('invited_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
});

export const children = pgTable('children', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  nickname: varchar('nickname', { length: 100 }).notNull(),
  grade: varchar('grade', { length: 50 }).notNull(),
  curriculum: varchar('curriculum', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const uploads = pgTable('uploads', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  childId: integer('child_id')
    .notNull()
    .references(() => children.id),
  sourceType: varchar('source_type', { length: 50 }).notNull(),
  notes: text('notes'),
  totalPages: integer('total_pages').notNull().default(0),
  status: varchar('status', { length: 30 }).notNull().default('draft'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  submittedAt: timestamp('submitted_at'),
});

export const uploadFiles = pgTable('upload_files', {
  id: serial('id').primaryKey(),
  uploadId: integer('upload_id')
    .notNull()
    .references(() => uploads.id),
  originalName: varchar('original_name', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 120 }).notNull(),
  sizeBytes: integer('size_bytes').notNull().default(0),
  storagePath: text('storage_path').notNull(),
  pageCount: integer('page_count').notNull().default(1),
  previewKind: varchar('preview_kind', { length: 20 }).notNull().default('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const pages = pgTable('pages', {
  id: serial('id').primaryKey(),
  uploadId: integer('upload_id')
    .notNull()
    .references(() => uploads.id),
  uploadFileId: integer('upload_file_id')
    .notNull()
    .references(() => uploadFiles.id),
  pageNumber: integer('page_number').notNull(),
  sourceName: varchar('source_name', { length: 255 }).notNull(),
  storagePath: text('storage_path').notNull(),
  previewLabel: varchar('preview_label', { length: 255 }).notNull(),
  isBlurry: boolean('is_blurry').notNull().default(false),
  isRotated: boolean('is_rotated').notNull().default(false),
  isDark: boolean('is_dark').notNull().default(false),
  qualityScore: integer('quality_score').notNull().default(100),
  qualityFlags: jsonb('quality_flags')
    .$type<Record<string, boolean | number | string>>()
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const analysisRuns = pgTable('analysis_runs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  childId: integer('child_id')
    .notNull()
    .references(() => children.id),
  uploadId: integer('upload_id')
    .notNull()
    .references(() => uploads.id),
  status: varchar('status', { length: 30 }).notNull().default('queued'),
  stage: varchar('stage', { length: 40 }).notNull().default('queued'),
  progressPercent: integer('progress_percent').notNull().default(0),
  estimatedMinutes: integer('estimated_minutes').notNull().default(4),
  statusMessage: text('status_message'),
  overallConfidence: real('overall_confidence'),
  needsReviewReason: text('needs_review_reason'),
  errorMessage: text('error_message'),
  startedAt: timestamp('started_at'),
  finishedAt: timestamp('finished_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  runId: integer('run_id')
    .notNull()
    .references(() => analysisRuns.id),
  parentReportJson: jsonb('parent_report_json')
    .$type<Record<string, unknown>>()
    .notNull(),
  studentReportJson: jsonb('student_report_json')
    .$type<Record<string, unknown>>()
    .notNull(),
  tutorReportJson: jsonb('tutor_report_json')
    .$type<Record<string, unknown>>()
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const problemItems = pgTable('problem_items', {
  id: serial('id').primaryKey(),
  runId: integer('run_id')
    .notNull()
    .references(() => analysisRuns.id),
  pageId: integer('page_id')
    .notNull()
    .references(() => pages.id),
  problemNo: varchar('problem_no', { length: 50 }).notNull(),
  problemText: text('problem_text'),
  studentWork: text('student_work'),
  teacherMark: varchar('teacher_mark', { length: 20 }).notNull().default('unknown'),
  modelIsCorrect: boolean('model_is_correct'),
  itemConfidence: real('item_confidence'),
  evidenceAnchor: jsonb('evidence_anchor')
    .$type<Record<string, unknown>>()
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const errorLabels = pgTable('error_labels', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 80 }).notNull().unique(),
  displayName: varchar('display_name', { length: 120 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const itemErrors = pgTable('item_errors', {
  id: serial('id').primaryKey(),
  itemId: integer('item_id')
    .notNull()
    .references(() => problemItems.id),
  labelId: integer('label_id')
    .notNull()
    .references(() => errorLabels.id),
  severity: varchar('severity', { length: 20 }).notNull().default('med'),
  rationale: text('rationale'),
  confidence: real('confidence'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const shareLinks = pgTable('share_links', {
  id: serial('id').primaryKey(),
  reportId: integer('report_id')
    .notNull()
    .references(() => reports.id),
  token: varchar('token', { length: 120 }).notNull().unique(),
  role: varchar('role', { length: 20 }).notNull().default('tutor'),
  expiresAt: timestamp('expires_at').notNull(),
  revokedAt: timestamp('revoked_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  provider: varchar('provider', { length: 20 }).notNull().default('stripe'),
  planType: varchar('plan_type', { length: 20 }).notNull(),
  priceId: varchar('price_id', { length: 120 }).notNull(),
  status: varchar('status', { length: 30 }).notNull().default('pending'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  checkoutSessionId: text('checkout_session_id').unique(),
  reportCredits: integer('report_credits').notNull().default(0),
  unlockedReportIds: jsonb('unlocked_report_ids')
    .$type<number[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  currentPeriodEndsAt: timestamp('current_period_ends_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const billingEvents = pgTable('billing_events', {
  id: serial('id').primaryKey(),
  source: varchar('source', { length: 20 }).notNull().default('stripe'),
  eventId: varchar('event_id', { length: 150 }).notNull().unique(),
  eventType: varchar('event_type', { length: 120 }).notNull(),
  payload: jsonb('payload')
    .$type<Record<string, unknown>>()
    .notNull(),
  processedAt: timestamp('processed_at').notNull().defaultNow(),
});

// Runtime records now live in Neon on Vercel. The legacy local JSON stores remain
// as documented fallback paths only and are no longer the production source of truth.
export const reminderEvents = pgTable('reminder_events', {
  id: varchar('id', { length: 80 }).primaryKey(),
  kind: varchar('kind', { length: 40 }).notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  reportId: integer('report_id').references(() => reports.id),
  childId: integer('child_id').references(() => children.id),
  deliveryChannel: varchar('delivery_channel', { length: 40 }).notNull(),
  status: varchar('status', { length: 30 }).notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  metadata: jsonb('metadata')
    .$type<Record<string, unknown>>()
    .notNull()
    .default(sql`'{}'::jsonb`),
  dedupeKey: varchar('dedupe_key', { length: 200 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  scheduledFor: timestamp('scheduled_for').notNull().defaultNow(),
  attemptedAt: timestamp('attempted_at'),
});

export const runLifecycleEvents = pgTable('run_lifecycle_events', {
  id: varchar('id', { length: 80 }).primaryKey(),
  runId: integer('run_id')
    .notNull()
    .references(() => analysisRuns.id),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  childId: integer('child_id').references(() => children.id),
  uploadId: integer('upload_id').references(() => uploads.id),
  eventType: varchar('event_type', { length: 40 }).notNull(),
  status: varchar('status', { length: 30 }).notNull(),
  stage: varchar('stage', { length: 40 }).notNull(),
  message: text('message').notNull(),
  metadata: jsonb('metadata')
    .$type<Record<string, unknown>>()
    .notNull()
    .default(sql`'{}'::jsonb`),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const runErrorEvents = pgTable('run_error_events', {
  id: varchar('id', { length: 80 }).primaryKey(),
  runId: integer('run_id')
    .notNull()
    .references(() => analysisRuns.id),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  errorType: varchar('error_type', { length: 40 }).notNull(),
  message: text('message').notNull(),
  metadata: jsonb('metadata')
    .$type<Record<string, unknown>>()
    .notNull()
    .default(sql`'{}'::jsonb`),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const runCostArtifacts = pgTable('run_cost_artifacts', {
  id: varchar('id', { length: 80 }).primaryKey(),
  runId: integer('run_id')
    .notNull()
    .references(() => analysisRuns.id)
    .unique(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  engine: varchar('engine', { length: 20 }).notNull(),
  pageCount: integer('page_count').notNull().default(0),
  labeledItemCount: integer('labeled_item_count').notNull().default(0),
  estimatedInputTokens: integer('estimated_input_tokens').notNull().default(0),
  estimatedOutputTokens: integer('estimated_output_tokens').notNull().default(0),
  estimatedUsd: real('estimated_usd').notNull().default(0),
  status: varchar('status', { length: 30 }).notNull(),
  artifactPath: text('artifact_path'),
  metadata: jsonb('metadata')
    .$type<Record<string, unknown>>()
    .notNull()
    .default(sql`'{}'::jsonb`),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
  subscriptions: many(subscriptions),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
  children: many(children),
  uploads: many(uploads),
  analysisRuns: many(analysisRuns),
  subscriptions: many(subscriptions),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const childrenRelations = relations(children, ({ one }) => ({
  user: one(users, {
    fields: [children.userId],
    references: [users.id],
  }),
}));

export const uploadsRelations = relations(uploads, ({ one, many }) => ({
  user: one(users, {
    fields: [uploads.userId],
    references: [users.id],
  }),
  child: one(children, {
    fields: [uploads.childId],
    references: [children.id],
  }),
  files: many(uploadFiles),
  pages: many(pages),
  runs: many(analysisRuns),
}));

export const uploadFilesRelations = relations(uploadFiles, ({ one, many }) => ({
  upload: one(uploads, {
    fields: [uploadFiles.uploadId],
    references: [uploads.id],
  }),
  pages: many(pages),
}));

export const pagesRelations = relations(pages, ({ one }) => ({
  upload: one(uploads, {
    fields: [pages.uploadId],
    references: [uploads.id],
  }),
  uploadFile: one(uploadFiles, {
    fields: [pages.uploadFileId],
    references: [uploadFiles.id],
  }),
}));

export const analysisRunsRelations = relations(analysisRuns, ({ one, many }) => ({
  user: one(users, {
    fields: [analysisRuns.userId],
    references: [users.id],
  }),
  child: one(children, {
    fields: [analysisRuns.childId],
    references: [children.id],
  }),
  upload: one(uploads, {
    fields: [analysisRuns.uploadId],
    references: [uploads.id],
  }),
  reports: many(reports),
  problemItems: many(problemItems),
}));

export const reportsRelations = relations(reports, ({ one, many }) => ({
  run: one(analysisRuns, {
    fields: [reports.runId],
    references: [analysisRuns.id],
  }),
  shareLinks: many(shareLinks),
}));

export const problemItemsRelations = relations(problemItems, ({ one, many }) => ({
  run: one(analysisRuns, {
    fields: [problemItems.runId],
    references: [analysisRuns.id],
  }),
  page: one(pages, {
    fields: [problemItems.pageId],
    references: [pages.id],
  }),
  itemErrors: many(itemErrors),
}));

export const errorLabelsRelations = relations(errorLabels, ({ many }) => ({
  itemErrors: many(itemErrors),
}));

export const itemErrorsRelations = relations(itemErrors, ({ one }) => ({
  item: one(problemItems, {
    fields: [itemErrors.itemId],
    references: [problemItems.id],
  }),
  label: one(errorLabels, {
    fields: [itemErrors.labelId],
    references: [errorLabels.id],
  }),
}));

export const shareLinksRelations = relations(shareLinks, ({ one }) => ({
  report: one(reports, {
    fields: [shareLinks.reportId],
    references: [reports.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  team: one(teams, {
    fields: [subscriptions.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type Child = typeof children.$inferSelect;
export type NewChild = typeof children.$inferInsert;
export type Upload = typeof uploads.$inferSelect;
export type NewUpload = typeof uploads.$inferInsert;
export type UploadFile = typeof uploadFiles.$inferSelect;
export type NewUploadFile = typeof uploadFiles.$inferInsert;
export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;
export type AnalysisRun = typeof analysisRuns.$inferSelect;
export type NewAnalysisRun = typeof analysisRuns.$inferInsert;
export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;
export type ProblemItem = typeof problemItems.$inferSelect;
export type NewProblemItem = typeof problemItems.$inferInsert;
export type ErrorLabel = typeof errorLabels.$inferSelect;
export type NewErrorLabel = typeof errorLabels.$inferInsert;
export type ItemError = typeof itemErrors.$inferSelect;
export type NewItemError = typeof itemErrors.$inferInsert;
export type ShareLink = typeof shareLinks.$inferSelect;
export type NewShareLink = typeof shareLinks.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type BillingEvent = typeof billingEvents.$inferSelect;
export type NewBillingEvent = typeof billingEvents.$inferInsert;
export type ReminderEvent = typeof reminderEvents.$inferSelect;
export type NewReminderEvent = typeof reminderEvents.$inferInsert;
export type RunLifecycleEventRecord = typeof runLifecycleEvents.$inferSelect;
export type NewRunLifecycleEventRecord = typeof runLifecycleEvents.$inferInsert;
export type RunErrorEventRecord = typeof runErrorEvents.$inferSelect;
export type NewRunErrorEventRecord = typeof runErrorEvents.$inferInsert;
export type RunCostArtifactRecord = typeof runCostArtifacts.$inferSelect;
export type NewRunCostArtifactRecord = typeof runCostArtifacts.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
  CREATE_CHILD = 'CREATE_CHILD',
  UPDATE_CHILD = 'UPDATE_CHILD',
  ARCHIVE_CHILD = 'ARCHIVE_CHILD',
  CREATE_UPLOAD = 'CREATE_UPLOAD',
  SUBMIT_UPLOAD = 'SUBMIT_UPLOAD',
  RETRY_RUN = 'RETRY_RUN',
}
