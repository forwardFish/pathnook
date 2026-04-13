# Final Program Acceptance

## Purpose

This document defines the last gate before FamilyEducation may be described as implemented against the PRD.

## Hard Stop Rules

A final pass is only allowed when all of the following are true:
- All non-deferred Story cards are `accepted`.
- Every Sprint Acceptance Story has passed.
- `docs/requirements/prd_traceability_matrix.md` contains no `Planned`, `In Progress`, or `Blocked` row for `Must` and `Should` requirements.
- Browser evidence, API evidence, data evidence, AI/QC evidence, and handoff evidence all exist for the latest local release-candidate build.

If any requirement remains partial, uncovered, or lacks evidence, the program verdict must be `NOT COMPLETE`.

## Required Environments

- Local deterministic demo/runtime environment.
- Local production build verification via `pnpm build`.
- Demo checkout mode that exercises the Stripe-aligned unlock flow without requiring a live remote checkout session.
- Release-candidate runbooks that explain future staging and production promotion without claiming those remote steps were already executed in this delivery lane.
- Fixture coverage for at least:
  - one parent with no children
  - one parent with two children
  - one child with two completed reports
  - one `failed` run
  - one `needs_review` run
  - one revoked share token
  - one expired share token
  - one paid account and one unpaid account

## Final Acceptance Suites

Program-level test IDs:
- `FP-001`: Full PRD coverage audit against the traceability matrix
- `FP-002`: Full program end-to-end acceptance sweep across page, click, API, data, AI, and ops suites
- `FP-DCK-001`: 1.3.x deck traceability audit against `DECK13-*` requirements
- `FP-DCK-002`: Parent/share/player browser sweep across desktop and mobile
- `FP-DCK-003`: Deck API/data/AI gate sweep
- `FP-DCK-004`: Deck export/share/admin end-to-end release sweep
- `FP-BND134-001`: 1.3.4 boundary traceability audit against `BND134-*` requirements
- `FP-BND134-002`: Must-do boundary acceptance sweep
- `FP-BND134-003`: Light-do delegation and secondary-surface sweep
- `FP-BND134-004`: Postpone guardrail and non-scope audit
- `FP-BILL14-001`: 1.4 billing/provider traceability audit against `BILL14-*` requirements
- `FP-BILL14-002`: Provider/data/entitlement foundation sweep
- `FP-BILL14-003`: Checkout/portal/webhook/compatibility route sweep
- `FP-BILL14-004`: Pathnook public-brand and billing-center release sweep
- `FP-HOME15-001`: 1.5 homepage traceability audit against `HOME15-*` requirements
- `FP-HOME15-002`: Homepage narrative and positioning sweep
- `FP-HOME15-003`: Homepage public-surface, FAQ, footer, and linked-route sweep
- `FP-HOME15-004`: Homepage responsive, CTA, and public-brand regression sweep

### Suite A - Public And Authenticated Pages
- Re-run all page cases from `docs/testing/page_test_matrix.md` that apply to landing, pricing, sign-up, sign-in, dashboard, children, upload, run status, report, billing, share, tutor, and admin.
- Verify desktop and mobile screenshots for each core page inside the local demo/runtime flow.

### Suite B - Canonical Click Paths
- Re-run `CLICK-001` through `CLICK-010` from `docs/testing/click_path_matrix.md`.
- Collect before/after screenshots and mutation evidence for each path.

### Suite C - API And Data Contracts
- Re-run all `API-*` and `DATA-*` cases from `docs/testing/api_data_ai_test_matrix.md`.
- Confirm ownership isolation, status transitions, token invalidation, billing entitlement, and delete behavior.

### Suite D - AI / OCR / QC
- Re-run all `AI-*` cases from `docs/testing/api_data_ai_test_matrix.md`.
- Validate canonical schema, taxonomy allow-list, two-anchor minimum, no-answer safety policy, and low-confidence routing.

### Suite E - Non-Functional And Operations
- Re-run `NF-*` cases from `docs/testing/api_data_ai_test_matrix.md`.
- Validate logging, resilience, responsiveness, and release-candidate telemetry in the local runtime lane.

### Suite F - Diagnosis Deck Player Lane
- Re-run `PAGE-DCK-001` through `PAGE-DCK-016` from `docs/testing/page_test_matrix.md`.
- Re-run `CLICK-DCK-001` through `CLICK-DCK-008` from `docs/testing/click_path_matrix.md`.
- Re-run `API-DCK-001` through `API-DCK-011`, `DATA-DCK-001` through `DATA-DCK-008`, `AI-DCK-001` through `AI-DCK-009`, and `NF-DCK-001` through `NF-DCK-006` from `docs/testing/api_data_ai_test_matrix.md`.
- Collect screenshot, console, network, dialog, storage, snapshot, and evidence-manifest artifacts for parent player, share player, and admin deck review routes.

### Suite G - Stage Boundary Lane
- Re-run `TC-BND134-001` through `TC-BND134-006` from `docs/testing/governance_test_matrix.md`.
- Re-run `PAGE-BND134-001` through `PAGE-BND134-007` from `docs/testing/page_test_matrix.md`.
- Re-run `CLICK-BND134-001` through `CLICK-BND134-003` from `docs/testing/click_path_matrix.md`.
- Re-run `API-BND134-001` through `API-BND134-009` and `DATA-BND134-001` through `DATA-BND134-007` from `docs/testing/api_data_ai_test_matrix.md`.
- Collect boundary traceability, must-do alignment, light-do delegation, and postpone guardrail evidence for the v5 lane.

### Suite H - Billing Provider Cutover Lane
- Re-run `TC-BILL14-001` through `TC-BILL14-007` from `docs/testing/governance_test_matrix.md`.
- Re-run `PAGE-BILL14-001` through `PAGE-BILL14-006` from `docs/testing/page_test_matrix.md`.
- Re-run `CLICK-BILL14-001` through `CLICK-BILL14-004` from `docs/testing/click_path_matrix.md`.
- Re-run `API-BILL14-001` through `API-BILL14-009`, `DATA-BILL14-001` through `DATA-BILL14-006`, and `NF-BILL14-001` through `NF-BILL14-003` from `docs/testing/api_data_ai_test_matrix.md`.
- Collect checkout, portal, webhook replay, entitlement diff, public-brand, billing-center, and public-route smoke evidence for the v6 lane.

### Suite I - Homepage Display Rewrite Lane
- Re-run `TC-HOME15-001` through `TC-HOME15-008` from `docs/testing/governance_test_matrix.md`.
- Re-run `PAGE-HOME15-001` through `PAGE-HOME15-010` from `docs/testing/page_test_matrix.md`.
- Re-run `CLICK-HOME15-001` through `CLICK-HOME15-003` from `docs/testing/click_path_matrix.md`.
- Re-run `NF-HOME15-001` through `NF-HOME15-002` from `docs/testing/api_data_ai_test_matrix.md`.
- Collect homepage copy audit, section-order screenshots, CTA flow logs, responsive evidence, and `1.4` public-brand regression proof for the v7 lane.

## Evidence Pack

The final evidence pack must contain:
- A requirement-by-requirement checklist with pass/fail and linked artifacts.
- Browser screenshots for every core route in desktop and mobile form.
- A screenshot manifest for the final browser evidence pack.
- API output snapshots or deterministic test output for every contract suite.
- Data assertions for ownership, state machines, token lifecycle, billing, and deletion.
- AI/QC assertions proving no-answer policy and evidence-anchor enforcement.
- A handoff summary that explicitly lists external deployment work that is still pending.
- A blocker list with owner, severity, workaround, and fix path for anything not green.

## Pass Criteria

The final pass verdict is `PASS` only if:
- Every `Must` and `Should` requirement is green.
- There are no blocker or high-risk known issues.
- No page diverges from PRD expectations in a user-visible way.
- No click path breaks.
- No report can be claimed complete without evidence anchors and appropriate confidence routing.
- No payment, share, history, admin, or delete flow fails deterministic verification.
- Any remaining remote deployment, Vercel hookup, or production env work is documented as follow-up rather than misreported as complete.

## Failure Criteria

The final verdict must be `FAIL` if any of the following occurs:
- A requirement is only partially implemented.
- A page is present but fails click-path or route-level behavior checks.
- A feature exists in code but cannot be validated by page, API, or data evidence.
- A report path can expose direct answers.
- Billing, token revocation, ownership isolation, or delete behavior is nondeterministic.
- A Sprint Acceptance Story passed without the traceability matrix being brought to green.
