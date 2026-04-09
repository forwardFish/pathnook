# Next-Phase Final Program Acceptance

## Purpose

This document defines the last gate before FamilyEducation may be described as Beta-ready for the next phase.

## Hard Stop Rules

A final Beta pass is only allowed when all of the following are true:
- All non-deferred Stories from `FE-050` through `FE-077` are accepted.
- Every Sprint Acceptance Story (`FE-053`, `FE-057`, `FE-062`, `FE-067`, `FE-072`, `FE-077`) has passed.
- `docs/requirements/next_phase_traceability_matrix.md` contains no `Planned`, `In Progress`, or `Blocked` rows for next-phase launch requirements.
- Browser, API, data, AI, ops, and handoff evidence all reflect the latest Beta candidate rather than stale local evidence.

If any next-phase requirement remains partial, uncovered, or evidence-light, the program verdict must be `FAIL`.

## Required Environments

- Local deterministic build and smoke environment.
- Vercel-linked preview and production deployment configuration for the `family-education` project.
- Neon Postgres connected through Vercel Marketplace and reachable from `DATABASE_URL`.
- Vercel Blob configured for upload, artifact, export, and share storage.
- Live Creem configuration for the three commercial plans.
- Google OAuth configuration for the production auth path.
- Demo fixtures or seeded accounts sufficient to run history, share, billing, and deletion scenarios without fabricating evidence.

## Final Acceptance Suites

Program-level test IDs:
- `FP2-001`: Next-phase traceability and document parity audit
- `FP2-002`: Beta end-to-end acceptance sweep across public, auth, billing, report, retention, tutor, privacy, and launch-governance flows

### Suite A - Public Conversion Surfaces
- Re-run page cases for landing, pricing, sample-report, sign-in, and sign-up.
- Re-run `CLICK2-001`, `CLICK2-002`, `CLICK2-003`, and `CLICK2-010`.

### Suite B - Billing And Auth
- Re-run live checkout creation, success, cancel, webhook replay, portal access, and Google OAuth scenarios.
- Confirm standard email auth remains available even when Google fails or is unconfigured.

### Suite C - Report Quality And Reliability
- Re-run diagnosis-quality, evidence-clarity, 7-day-plan, and audience-variant cases.
- Re-run upload/run guidance and failure explanation cases.

### Suite D - Retention And Tutor Handoff
- Re-run child history, compare, weekly review, annual summary, tutor workspace, share analytics, and revoke behavior.

### Suite E - Privacy, Audit, And Launch Governance
- Re-run delete child/upload/report/account behavior plus post-delete denial.
- Re-run audit logging, deployment-readiness smoke, release checklist, and handoff packet verification.

## Evidence Pack

The final next-phase evidence pack must contain:
- a requirement-by-requirement audit against `next_phase_traceability_matrix.md`
- browser screenshots for all changed public and authenticated routes
- a final browser-evidence manifest for the Beta route set
- API and provider transcripts for billing, auth, Neon data access, Blob storage, and share lifecycle
- data assertions for entitlements, trends, share logs, and deletions
- AI/report-quality assertions for diagnosis, evidence, and plan behavior
- Vercel deployment smoke evidence for the linked preview or production candidate
- handoff docs with remaining risks and external dependency checklist
- a blocker list and explicit Beta verdict

## Beta Launch Checklist

Before the final verdict is issued, the Beta lane must have a deterministic checklist artifact that records:
- the latest local smoke output for the declared Beta candidate
- the latest browser evidence manifest for the declared Beta route set
- the current non-green requirement rows, if any
- the current external dependency blockers, if any
- the explicit follow-up items for Vercel deployment, Neon migration, live Creem, Google OAuth, and Blob storage when they are not yet evidenced

The checklist must never imply that preview, production, billing, auth, or storage work has been completed when only local evidence exists.

## Blocker Register Rules

The blocker register for the Beta lane must:
- list every non-green next-phase requirement row
- list every missing Sprint delivery artifact from Sprint 9 through Sprint 14
- list every missing or still-local external dependency required for Beta readiness
- feed directly into `remaining_risks.md` and the final handoff packet

## Pass Criteria

The final verdict is `PASS` only if:
- every next-phase requirement row is green
- all mapped tests have pass evidence or deterministic transcript evidence
- no blocker or high-risk issue remains on billing, auth, Neon data, Blob storage, privacy, or report quality
- no public conversion route or protected owner workflow breaks on the declared Beta candidate
- any remaining remote or post-Beta work is explicitly listed as follow-up rather than misreported as complete

## Failure Criteria

The final verdict must be `FAIL` if any of the following occurs:
- a requirement is only partially implemented
- a feature exists in code but lacks mapped tests or evidence
- a Sprint Acceptance Story passed without its owned rows turning green
- live billing, Google auth, Neon data, Blob storage, or deletion behavior is nondeterministic
- the handoff packet overstates deploy or provider readiness
