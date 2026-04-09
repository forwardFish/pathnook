# PRD Traceability Matrix

Status key:
- `Planned`: card and test exist, implementation not started
- `In Progress`: code and evidence are being produced
- `Green`: requirement implemented, verified, agentized, accepted
- `Blocked`: requirement has an explicit blocker recorded

Every Sprint Acceptance Story must audit the rows it owns and fail the sprint if any row remains uncovered or evidence-light.

| Requirement ID | Capability | Route / API / Schema | Story IDs | Test IDs | Expected Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- |
| GOV-001 | Quality contract files | `docs/requirements/*`, `docs/testing/*` | FE-004 FE-005 FE-006 | TC-GOV-001 TC-GOV-002 | document review, traceability audit | Green |
| GOV-002 | Story card contract | `tasks/backlog_v1/**/*.yaml` | FE-003 | TC-GOV-003 | story schema review | Green |
| GOV-003 | Sprint acceptance gate | each sprint acceptance story | FE-007 FE-012 FE-018 FE-024 FE-029 FE-034 FE-041 FE-045 FE-049 | TC-GOV-004 | sprint acceptance report, ship/release/retro closeout | Green |
| GOV-004 | Final program gate | `docs/testing/final_program_acceptance.md` | FE-046 FE-047 FE-048 FE-049 | FP-001 FP-002 | final evidence pack, final acceptance verdict | Green |
| PAGE-001 | Landing shell | `/`, `app/(dashboard)/page.tsx` | FE-011 | PAGE-LND-001 PAGE-LND-002 PAGE-LND-003 PAGE-LND-005 | browser screenshots, click log | Green |
| PAGE-002 | Pricing shell | `/pricing`, `app/(dashboard)/pricing/page.tsx` | FE-011 FE-033 | PAGE-PRC-001 PAGE-PRC-002 PAGE-PRC-004 | pricing screenshots, CTA evidence | Green |
| PAGE-003 | Sign-up page | `/sign-up`, `app/(login)/login.tsx` | FE-008 FE-009 | PAGE-SUP-001 PAGE-SUP-002 PAGE-SUP-003 PAGE-SUP-006 | form screenshots, auth tests | Green |
| PAGE-004 | Sign-in page | `/sign-in` | FE-009 | PAGE-SIN-001 PAGE-SIN-002 PAGE-SIN-003 | auth redirect evidence | Green |
| PAGE-005 | Dashboard overview | `/dashboard` | FE-011 | PAGE-DAS-001 PAGE-DAS-002 PAGE-DAS-003 PAGE-DAS-004 | dashboard browser evidence | Green |
| PAGE-006 | Children surfaces | `/dashboard/children*` | FE-010 FE-031 FE-032 | PAGE-CHD-001 PAGE-CHD-002 PAGE-CHD-004 PAGE-CHD-005 PAGE-CHD-006 | child CRUD and history evidence | Green |
| PAGE-007 | Upload page | `/dashboard/children/[childId]/upload` | FE-014 FE-015 | PAGE-UPL-001 PAGE-UPL-002 PAGE-UPL-003 PAGE-UPL-004 PAGE-UPL-005 PAGE-UPL-006 | upload browser evidence | Green |
| PAGE-008 | Run status page | `/dashboard/runs/[runId]` | FE-016 FE-017 | PAGE-RUN-001 PAGE-RUN-002 PAGE-RUN-003 PAGE-RUN-004 PAGE-RUN-005 PAGE-RUN-006 PAGE-RUN-007 | run lifecycle screenshots | Green |
| PAGE-009 | Report page and tabs | `/dashboard/reports/[reportId]` | FE-023 FE-025 FE-026 FE-027 FE-028 | PAGE-RPT-001 PAGE-RPT-002 PAGE-RPT-003 PAGE-RPT-004 PAGE-RPT-005 PAGE-RPT-006 PAGE-RPT-007 PAGE-RPT-008 | report screenshots, JSON assertions | Green |
| PAGE-010 | Billing page | `/dashboard/billing` | FE-033 | PAGE-BIL-001 PAGE-BIL-002 PAGE-BIL-003 PAGE-BIL-004 PAGE-BIL-005 PAGE-BIL-006 | checkout evidence | Green |
| PAGE-011 | Share page | `/share/[token]` | FE-030 | PAGE-SHR-001 PAGE-SHR-002 PAGE-SHR-003 PAGE-SHR-004 PAGE-SHR-005 | token access evidence | Green |
| PAGE-012 | Admin review pages | `/admin/review*` | FE-035 | PAGE-ADM-001 PAGE-ADM-002 PAGE-ADM-003 PAGE-ADM-004 PAGE-ADM-005 PAGE-ADM-006 | admin QA evidence | Green |
| PAGE-013 | Responsive layout | core pages | FE-011 FE-014 FE-025 FE-030 FE-035 FE-047 | RESP-001 RESP-002 RESP-003 NF-001 | mobile screenshots, final browser evidence manifest | Green |
| AUTH-001 | 18+ signup gate | `users.is_18plus_confirmed`, sign-up form | FE-008 | PAGE-SUP-002 API-AUTH-001 | validation screenshot, API result | Green |
| AUTH-002 | TOS / Privacy consent | sign-up form | FE-008 | PAGE-SUP-003 API-AUTH-002 | validation screenshot, API result | Green |
| AUTH-003 | Email auth and session | sign-up/sign-in/session | FE-009 | PAGE-SIN-001 PAGE-SIN-002 API-AUTH-003 API-AUTH-004 | auth output, browser session evidence | Green |
| AUTH-004 | Locale profile fields | `users` schema | FE-009 | PAGE-SUP-007 API-AUTH-005 DATA-001 | schema assertions | Green |
| AUTH-005 | Protected routes and APIs | middleware + handlers | FE-009 | PAGE-DAS-001 API-AUTH-006 | redirect and 401/403 evidence | Green |
| CH-001 | Child CRUD | `children` schema + UI | FE-010 | PAGE-CHD-001 PAGE-CHD-002 API-CH-001 API-CH-002 | CRUD evidence | Green |
| CH-002 | Multiple children per parent | `children.user_id` ownership | FE-010 | PAGE-DAS-004 API-CH-003 DATA-002 | ownership evidence | Green |
| CH-003 | Minimal child PII | children form/schema | FE-010 FE-042 | PAGE-CHD-003 DATA-003 | schema review | Green |
| UP-001 | 5-10 page upload | `uploads`, `upload_files`, `pages` | FE-013 FE-014 | PAGE-UPL-001 API-UP-001 DATA-UP-001 | upload evidence | Green |
| UP-002 | Previews and count | upload UI | FE-014 | PAGE-UPL-002 PAGE-UPL-008 | browser preview evidence | Green |
| UP-003 | PDF split | `pages.page_no` generation | FE-013 FE-015 | PAGE-UPL-005 API-UP-002 DATA-UP-002 | split-page evidence | Green |
| UP-004 | Quality flags | `quality_flags` | FE-015 | PAGE-UPL-006 API-UP-003 AI-QC-001 | quality detection evidence | Green |
| UP-005 | Source type and notes | `uploads.source_type`, `uploads.notes` | FE-013 FE-014 | PAGE-UPL-007 API-UP-004 | API assertions | Green |
| UP-006 | `>10` page block | upload validation | FE-014 | PAGE-UPL-003 | validation screenshot | Green |
| UP-007 | `<5` page warning | upload validation | FE-014 | PAGE-UPL-004 | warning screenshot | Green |
| RUN-001 | Run creation and redirect | `/api/uploads/:uploadId/submit`, `/runs/[runId]` | FE-016 | PAGE-RUN-001 API-RUN-001 CLICK-003 | run creation evidence | Green |
| RUN-002 | Run statuses | `analysis_runs.status` | FE-016 | PAGE-RUN-002 API-RUN-002 DATA-RUN-001 | status assertions | Green |
| RUN-003 | Progress and ETA | run status UI | FE-016 | PAGE-RUN-003 PAGE-RUN-008 | progress screenshots | Green |
| RUN-004 | Retry failed runs | retry flow | FE-017 | PAGE-RUN-004 API-RUN-003 CLICK-008 | retry evidence | Green |
| RUN-005 | Timeout support | timeout UI | FE-017 | PAGE-RUN-005 | timeout screenshots | Green |
| AI-001 | Canonical extraction schema | extraction JSON contract | FE-019 FE-020 FE-021 | AI-EXT-001 API-AI-001 | schema validation output | Green |
| AI-002 | Fixed taxonomy | `error_labels`, `item_errors` | FE-022 | AI-LBL-001 API-AI-002 | label allow-list evidence | Green |
| AI-003 | No direct answers | prompts and output filters | FE-020 FE-027 | AI-SAFE-001 AI-SAFE-002 | prompt audit and output scan | Green |
| AI-004 | Evidence anchor per item | `problem_items.evidence_anchor` | FE-019 FE-020 | AI-EXT-002 DATA-AI-001 | anchor assertions | Green |
| AI-005 | 2+ anchors per finding | report aggregation | FE-026 FE-028 | AI-RPT-001 PAGE-RPT-005 | finding validation output | Green |
| AI-006 | Confidence routing | `analysis_runs.overall_confidence` | FE-023 FE-035 | AI-QC-002 PAGE-RUN-006 PAGE-ADM-001 | needs_review evidence | Green |
| AI-007 | Previous report context | weekly review aggregation | FE-032 | AI-RVW-001 CLICK-009 | compare output evidence | Green |
| REP-001 | Top findings | diagnosis tab | FE-025 | PAGE-RPT-001 | diagnosis screenshot | Green |
| REP-002 | Pattern vs sporadic | diagnosis tab | FE-025 | PAGE-RPT-002 | diagnosis assertions | Green |
| REP-003 | Recommendation focus and don’t-do guidance | diagnosis + plan | FE-025 FE-027 | PAGE-RPT-003 | report text assertions | Green |
| REP-004 | Evidence grouped by error type | evidence tab | FE-026 | PAGE-RPT-004 | evidence screenshot | Green |
| REP-005 | Page/problem open | evidence viewer | FE-026 FE-040 | PAGE-RPT-005 CLICK-004 PAGE-RPT-010 | viewer evidence | Green |
| REP-006 | 7-day plan structure | plan tab | FE-027 | PAGE-RPT-006 PAGE-RPT-007 | plan screenshot | Green |
| REP-007 | Parent/student/tutor report variants | `reports` JSON | FE-028 | API-RPT-001 DATA-RPT-001 | JSON contract assertions | Green |
| REP-008 | Low-confidence messaging | report banner/state | FE-023 FE-025 | PAGE-RPT-008 | degraded-state screenshot | Green |
| HIS-001 | Recent reports | child detail history | FE-031 | PAGE-CHD-004 | history screenshot | Green |
| HIS-002 | Compare-to-last | weekly review compare | FE-032 | PAGE-CHD-005 CLICK-009 DATA-HIS-001 | trend evidence | Green |
| HIS-003 | Parent notes | weekly review notes | FE-032 | PAGE-CHD-006 API-HIS-001 | note persistence evidence | Green |
| SHR-001 | Share token | `POST /api/reports/:id/share` | FE-030 | PAGE-SHR-001 API-SHR-001 | token generation evidence | Green |
| SHR-002 | Share expiry and revoke | `share_links` | FE-030 | PAGE-SHR-002 PAGE-SHR-003 API-SHR-002 DATA-SHR-001 | token invalidation evidence | Green |
| SHR-003 | Share is read-only and sanitized | `/share/[token]` | FE-030 | PAGE-SHR-004 PAGE-SHR-005 | UI assertions | Green |
| BIL-001 | One-time checkout | checkout session | FE-033 | PAGE-BIL-001 API-BIL-001 CLICK-007 | checkout evidence | Green |
| BIL-002 | Monthly checkout | subscription checkout | FE-033 | PAGE-BIL-002 API-BIL-002 | checkout evidence | Green |
| BIL-003 | Lock/unlock | entitlements | FE-033 | PAGE-BIL-003 API-BIL-003 DATA-BIL-001 | paywall evidence | Green |
| BIL-004 | Webhook idempotency | Stripe webhook | FE-033 | PAGE-BIL-006 API-BIL-004 DATA-BIL-002 | replay evidence | Green |
| ADM-001 | Needs review queue | `/admin/review` | FE-035 | PAGE-ADM-001 API-ADM-001 | queue screenshot | Green |
| ADM-002 | Approve/request/manual edit | `/admin/review/[runId]` | FE-035 | PAGE-ADM-002 PAGE-ADM-003 PAGE-ADM-004 PAGE-ADM-005 API-ADM-002 CLICK-010 | admin action evidence | Green |
| SHD-001 | PDF export | report export | FE-036 | PAGE-RPT-009 API-PDF-001 | export artifact | Green |
| SHD-002 | Tutor workspace foundation | tutor dashboard scope | FE-037 | PAGE-TUT-001 API-TUT-001 | workspace evidence | Green |
| SHD-003 | Email reminders | reminders scheduler | FE-038 | API-NTF-001 OPS-NTF-001 | reminder job evidence | Green |
| SHD-004 | EN/ES output | localized reports | FE-039 | PAGE-I18N-001 API-I18N-001 | locale evidence | Green |
| SHD-005 | Evidence highlight | overlay/bbox | FE-040 | PAGE-RPT-010 | highlight screenshot | Green |
| OPS-001 | Delete entry points and retention | delete flows + retention docs | FE-042 | OPS-DEL-001 OPS-DEL-002 NF-006 DATA-DEL-001 | delete evidence | Green |
| OPS-002 | Observability and telemetry | logging + metrics + cost | FE-043 | OPS-OBS-001 OPS-OBS-002 NF-007 NF-008 | telemetry output | Green |
| OPS-003 | Staging/demo/runbook | deployment/runbook/fixtures | FE-044 | OPS-RLS-001 OPS-RLS-002 | staging evidence | Green |
