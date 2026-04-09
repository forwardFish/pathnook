# Next-Phase Master Test Plan

## Purpose

This document defines the testing contract for `backlog_v2_beta_launch`. The goal is to prevent the next FamilyEducation phase from drifting away from `docs/需求文档_1.1.md` while the product moves from a locally complete MVP into a real Beta-ready system.

## Core Principles

1. Test planning happens before implementation.
2. Every Story must map to requirement IDs, test case IDs, and expected evidence.
3. UI work is not complete without browser evidence.
4. External-provider work is not complete without negative-path and fallback coverage.
5. Sprint Acceptance may not pass while any owned traceability row remains non-green.
6. Final Beta verdict depends on the latest traceability state, not on stale evidence from earlier runs.

## Source Documents

- `docs/需求文档_1.1.md`
- `docs/handoff/full_system_summary.md`
- `docs/requirements/next_phase_requirement_index.md`
- `docs/requirements/next_phase_traceability_matrix.md`
- `docs/testing/next_phase/page_test_matrix.md`
- `docs/testing/next_phase/click_path_matrix.md`
- `docs/testing/next_phase/api_data_ai_test_matrix.md`
- `docs/testing/next_phase/governance_test_matrix.md`
- `docs/testing/next_phase/final_program_acceptance.md`

## Test Layers

### 1. Governance And Planning
- Validate Story YAML completeness, agentsystem workflow enforcement, sprint acceptance discipline, and handoff-closeout rules.
- Primary IDs: `TC-GOV2-*`

### 2. Page-Level Verification
- Validate public pages, authenticated pages, conversion surfaces, report surfaces, and privacy/account surfaces.
- Required checks per page:
  - route reachability or expected redirect
  - required copy, CTA, or data surface
  - empty/loading/error handling where relevant
  - mobile responsiveness and no horizontal overflow
  - console and network sanity
- Primary IDs: `PAGE2-*`

### 3. Canonical Click Paths
- Validate the product journeys users actually rely on:
  - landing to sign-up
  - pricing to checkout
  - sample report to billing
  - upload to run to report
  - report to evidence/source
  - history compare
  - tutor handoff
  - customer portal
  - deletion denial
  - Google OAuth
- Primary IDs: `CLICK2-*`

### 4. API / Data / AI / Ops Contracts
- Validate live provider integration, entitlement sync, storage lifecycle, trend and share APIs, report quality behaviors, and audit persistence.
- Primary IDs:
  - `API2-*`
  - `DATA2-*`
  - `AI2-*`
  - `NF2-*`
  - `OPS2-*`

## Story-Level Rules

Every Story must:
- reference at least one requirement row from `next_phase_requirement_index.md`
- reference at least one page, click, API/data/AI, or governance test ID
- define both normal-path and exception-path verification
- list expected evidence types
- keep its scope limited to the declared requirement rows

Additional Story rules:
- UI Story: must include browser evidence and the design-review modes in agentsystem.
- External dependency Story: must include provider failure, cancel, retry, or unconfigured fallback coverage.
- Acceptance Story: must re-audit owned traceability rows and must attach Sprint-level evidence.

## Sprint-Level Rules

Each Sprint must ship with:
- `run_sprintX_smoke`
- `run_sprintX_browser_smoke`
- `run_sprintX_delivery.py`
- a Sprint Acceptance packet
- a traceability audit snapshot
- Story evidence for every Story in the Sprint

Each Sprint Acceptance Story must verify:
- all Sprint stories are accepted
- all Sprint-owned requirement rows are green
- all mapped tests were executed or deterministically evidenced
- `ship`, `document-release`, and `retro` outputs are ready

## Beta-Level Rules

The final Beta pass must cover:
- preview and production-readiness smoke
- real Creem checkout and webhook lifecycle
- email auth plus Google OAuth success/cancel/fallback
- landing, pricing, and sample-report conversion flows
- diagnosis quality and evidence quality
- weekly review, trend, and annual-value flows
- tutor handoff plus share analytics
- privacy/deletion UX and audit boundaries

## Evidence Contract

The minimum evidence set for next-phase closeout is:
- browser screenshots for all changed or newly introduced pages
- console and network sanity logs for browser runs
- API output or deterministic transcript for all API/data/AI cases
- provider negative-path evidence for auth, billing, storage, and deploy readiness
- traceability audit artifacts for each Sprint
- handoff packet and remaining-risk log for the Beta verdict

## Documentation Consistency Rule

Implementation must follow this order:
1. source requirement in `docs/需求文档_1.1.md`
2. derived next-phase requirement row
3. traceability row
4. test-case row(s)
5. Story YAML
6. code and evidence

If the requirement changes during implementation, the docs must be updated in that same order before code acceptance may pass.

## Known Planning Assumption

`docs/需求文档_1.1.md` references `parent-dashboard-copy-and-pricing-spec.md`, but that file is not currently present in the repository. Until it exists, landing/pricing/sample-report Stories should treat `docs/需求文档_1.1.md` as the only copy/structure source and only use any future spec as a refinement layer rather than a Sprint reset.
