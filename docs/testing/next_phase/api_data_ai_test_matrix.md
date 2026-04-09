# Next-Phase API, Data, AI, And Ops Test Matrix

## API Contract Tests

| Test ID | Scope | Scenario | Expected Result |
| --- | --- | --- | --- |
| API2-STO-001 | Storage adapter and artifact lifecycle | Create, read, export, revoke, and delete artifacts in the production storage adapter | No orphaned or local-only assumptions remain on the Beta path; artifact URLs and retention behavior are deterministic. |
| API2-BIL-001 | Live Creem checkout | Create checkout sessions for one-time, monthly, and annual plans | The correct live product/price mapping is used and returns a working checkout session or URL. |
| API2-BIL-002 | Billing return handling | Success and cancel callbacks from live checkout | Billing surfaces reflect the latest known lifecycle state without unlocking content incorrectly. |
| API2-BIL-003 | Creem webhook | Replay the same event and process lifecycle changes | Webhook handling is idempotent and updates entitlements safely. |
| API2-BIL-004 | Customer portal | Create a customer-portal session for an active subscriber | Portal entry is available only when appropriate and returns to the app with consistent state. |
| API2-AUTH-001 | Google OAuth | Run OAuth start/callback with success, cancel, and missing-config variants | Standard account auth remains available and Google flow behaves safely in all three variants. |
| API2-MKT-001 | Marketing events | Record landing, pricing, sample-report, and checkout-intent events | Conversion events are captured with deterministic event names and user/session context. |
| API2-RPT-001 | Report output variants | Fetch parent, student, tutor, and export-ready report payloads | Output variants remain consistent with the same facts layer while varying tone and audience detail appropriately. |
| API2-RUN-001 | Upload guidance and reliability | Submit weak sources, retry a failed run, and inspect a stuck or `needs_review` run | APIs expose enough state for the UI to explain warnings, retryability, and manual-review status. |
| API2-RET-001 | History API | Fetch a child history timeline | Only owner-scoped report history is returned and ordered correctly. |
| API2-RET-002 | Trend and compare APIs | Compare the latest report to earlier reports | Trend summaries and compare deltas remain child-scoped and deterministic. |
| API2-RET-003 | Annual summary API | Request quarterly or annual summary surfaces for annual-plan users | Annual value features only unlock for the correct entitlement state and return structured summary data. |
| API2-SHR-001 | Share stats, meta, and revoke | Inspect share metadata, revoke a link, and read share analytics | Share lifecycle state and analytics remain accurate across active, expired, and revoked cases. |
| API2-PRIV-001 | Delete flows | Delete child, upload, report, and account resources | Protected deletion endpoints succeed only for owners and produce deterministic denial on later access. |
| API2-AUD-001 | Audit boundaries | Trigger unlock, revoke, approve, and delete operations | Each privileged operation creates an auditable record with actor, target, and outcome. |

## Data Integrity Tests

| Test ID | Data Surface | Scenario | Expected Result |
| --- | --- | --- | --- |
| DATA2-STO-001 | Artifact metadata | Move report/export/share artifacts through create and delete flows | Artifact pointers, storage keys, and deletion markers stay aligned. |
| DATA2-BIL-001 | Billing and entitlement state | Process purchase, renewal, cancel, and replay | Subscription and entitlement state remain internally consistent after lifecycle events. |
| DATA2-MKT-001 | Marketing events | Emit repeated CTA events | Events stay attributable and deduplicated enough for funnel analysis. |
| DATA2-RET-001 | Progress snapshots | Store history and trend snapshots for the same child | Trend data never mixes artifacts across children or accounts. |
| DATA2-SHR-001 | Share access logs | Revoke or expire a share after access activity | Share state and access-log data remain queryable and mutually consistent. |
| DATA2-DEL-001 | Delete cascade | Delete child/upload/report/account | Later reads return deterministic denial and no stale child-scoped references remain visible. |
| DATA2-AUD-001 | Audit logs | Write privileged-action events | Audit logs are append-only or otherwise tamper-resistant enough for Beta review. |

## AI / Report Quality Tests

| Test ID | Layer | Scenario | Expected Result |
| --- | --- | --- | --- |
| AI2-RPT-001 | Diagnosis quality | Evaluate reports with mixed-signal evidence | Primary and secondary issues remain proportionate, and low-confidence signals do not overdrive the summary. |
| AI2-RPT-002 | Evidence clarity | Evaluate reports with strong and weak source anchors | Evidence grouping, anchor visibility, and low-evidence fallback remain understandable. |
| AI2-RPT-003 | 7-day plan | Evaluate a generated plan against real report findings | The plan contains concrete daily actions, parent guidance, and outcome checks that match the diagnosis. |
| AI2-RPT-004 | Audience variants | Compare parent, student, and tutor outputs from the same facts | Audience outputs stay distinct in tone and detail without contradicting one another. |

## Non-Functional Tests

| Test ID | Category | Scenario | Expected Result |
| --- | --- | --- | --- |
| NF2-001 | Mobile | View landing, pricing, sample-report, report, and billing at 390px width | No critical content or CTA requires horizontal scrolling. |
| NF2-002 | Resilience | Billing, auth, storage, or provider integration is unavailable or misconfigured | The app degrades gracefully with friendly user messaging and deterministic logs. |
| NF2-003 | Delivery reliability | Run next-phase smoke and browser suites | Core planning and smoke scripts stay runnable from local Beta-ready workflows. |

## Ops And Release Tests

| Test ID | Scope | Scenario | Expected Result |
| --- | --- | --- | --- |
| OPS2-DEP-001 | Deployment baseline | Verify preview/production URLs, callback URLs, and environment checklist | Deployment-sensitive configuration is fully enumerated and internally consistent. |
| OPS2-DEP-002 | Deploy smoke | Run preview/production-readiness smoke on the declared routes | Critical public, auth, billing, and report routes remain reachable in the release lane. |
| OPS2-STO-001 | Artifact lifecycle audit | Upload, export, share, revoke, and delete across the storage adapter | Artifact create/read/delete behavior is observable and auditable. |
| OPS2-OBS-001 | Observability | Emit structured logs, error events, and cost telemetry for run lifecycle and providers | Telemetry is visible per run or per provider interaction. |
| OPS2-OBS-002 | Provider failure visibility | Simulate provider failure for auth, billing, or storage | Operators can see why the failure happened and what fallback path executed. |
| OPS2-BIL-001 | Billing operations | Replay webhook events and open the portal for a paid account | Billing operations remain deterministic and operator-visible. |
| OPS2-BETA-001 | Beta launch smoke | Execute the Beta release checklist and smoke pack | The launch candidate only advances when all declared gates pass. |
| OPS2-BETA-002 | Handoff and metrics baseline | Generate Beta handoff docs and metric snapshots | The handoff packet accurately reports current status, follow-up work, and baseline metrics. |
