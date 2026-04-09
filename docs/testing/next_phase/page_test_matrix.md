# Next-Phase Page Test Matrix

This matrix defines the page-level verification contract for the Beta-launch phase. It covers the surfaces that are newly introduced or materially changed by `backlog_v2_beta_launch`.

## Landing (`/`)

Primary route: `/`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-LND-001 | Landing conversion sections render | Public visitor | Open `/` | Hero, trust/value blocks, features, how-it-works, FAQ, and footer all render with FamilyEducation positioning. |
| PAGE2-LND-002 | Primary CTA hierarchy | Public visitor | Click the main CTA, secondary pricing CTA, and section CTA | CTA routing matches the Beta funnel: sign-up, pricing, and in-page flow guidance all work without dead links. |

## Pricing (`/pricing`)

Primary route: `/pricing`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-PRC-001 | Live pricing plans | Public or authenticated user | Open `/pricing` | The page shows `One-Time Diagnosis`, `Parent Weekly`, and `Parent Annual` with consistent pricing, FAQs, and live-billing entry points. |
| PAGE2-PRC-002 | Pricing CTA routing | Public and authenticated variants | Click each plan CTA | Public users flow to sign-up/sign-in first; authenticated users continue into billing or live checkout without route breakage. |

## Sample Report (`/sample-report`)

Primary route: `/sample-report`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-SMP-001 | Sample report content preview | Public visitor | Open `/sample-report` | Sample diagnosis, evidence, and 7-day plan sections render and accurately reflect the real product structure without exposing private customer data. |
| PAGE2-SMP-002 | Sample report unlock CTA | Public and authenticated variants | Click the sample-report CTA | The user can move from sample preview into pricing, sign-up, or billing without confusion or 404s. |

## Sign-In (`/sign-in`)

Primary route: `/sign-in`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-SIN-001 | Email and Google coexist | Public visitor | Open `/sign-in` | The page offers standard account sign-in and Google OAuth entry together, with safe fallback copy when Google is unavailable. |

## Sign-Up (`/sign-up`)

Primary route: `/sign-up`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-SUP-001 | Standard account sign-up fields | Public visitor | Open `/sign-up` | The sign-up form stays focused on standard account creation and does not require future-phase fields such as timezone or language selection. |

## Dashboard (`/dashboard`)

Primary route: `/dashboard`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-DAS-001 | Dashboard reflects Beta value layer | Authenticated account | Open `/dashboard` | Billing status, recent activity, and value-oriented modules reflect the richer Beta experience without breaking current dashboard navigation. |

## Child Detail (`/dashboard/children/[childId]`)

Primary route: `/dashboard/children/[childId]`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-CHD-001 | Weekly review and compare controls | Child with multiple reports | Open child detail and inspect history tools | Compare controls, weekly review entry, and trend cards are visible and scoped to the selected child. |
| PAGE2-CHD-002 | Annual value surfaces | Annual-plan account with history | Open child detail | Quarterly summary or annual-value surfaces appear without leaking data across children. |

## Upload (`/dashboard/children/[childId]/upload`)

Primary route: `/dashboard/children/[childId]/upload`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-UPL-001 | Upload guidance and quality warnings | Authenticated account with child | Open upload page with normal and weak source files | The page explains source-quality expectations, warnings, and recovery guidance before submission. |

## Run Status (`/dashboard/runs/[runId]`)

Primary route: `/dashboard/runs/[runId]`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-RUN-001 | Retry and stuck-case explanation | Existing run in failed, stuck, or `needs_review` state | Open the run page | The page clearly explains what happened, what can be retried, and what the user should do next. |

## Report (`/dashboard/reports/[reportId]`)

Primary route: `/dashboard/reports/[reportId]`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-RPT-001 | Diagnosis quality presentation | Existing report | Open the diagnosis view | Primary issue, secondary issue, pattern/sporadic distinction, and confidence messaging are clear and proportionate. |
| PAGE2-RPT-002 | Evidence/source clarity | Existing report with evidence anchors | Open evidence and a source item | Grouping, source anchors, overlay behavior, and low-evidence fallback are readable and consistent. |
| PAGE2-RPT-003 | 7-day plan and audience variants | Existing report with all output variants | Open the report and inspect exported/output variants | The 7-day plan is actionable and the parent/student/tutor versions remain clearly differentiated. |

## Billing (`/dashboard/billing`)

Primary route: `/dashboard/billing`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-BIL-001 | Live billing surface | Authenticated account | Open billing page | Live Creem-backed plan cards, entitlement state, and clear plan differences are present. |
| PAGE2-BIL-002 | Portal and lifecycle messaging | Existing paying account | Open billing page and manage account | Customer-portal entry, renewal/cancel state, and entitlement messaging remain coherent. |

## Tutor Workspace (`/dashboard/tutor`)

Primary route: `/dashboard/tutor`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-TUT-001 | Deepened tutor workspace | Authenticated owner with shared reports | Open `/dashboard/tutor` | Recent shared reports, owner notes, and tutor-handoff summaries are visible within owner-scoped boundaries. |

## Share (`/share/[token]`)

Primary route: `/share/[token]`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-SHR-001 | Share analytics and revoke state | Valid, expired, and revoked tokens | Open share URLs and inspect share state | Tutor-safe rendering persists, and expired/revoked/access-state messaging is correct. |

## Account / Privacy (`/dashboard/account`)

Primary route: `/dashboard/account`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE2-ACC-001 | Privacy and deletion UX | Authenticated account | Open account/privacy controls | Delete/report retention UI explains consequences clearly and routes to the correct protected actions. |

## Responsive Layer

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| RESP2-001 | Mobile critical surfaces | Browser width 390px | Open landing, pricing, sample-report, report, billing | No critical CTA or content overflows horizontally; layout remains usable on mobile. |
