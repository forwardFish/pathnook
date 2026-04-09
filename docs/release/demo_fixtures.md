# FamilyEducation Demo Fixtures

## Purpose

Sprint 7 keeps release-candidate validation local and evidence-first. The fixture pack below supports deterministic smoke runs and live demos without claiming a real production deployment.

## Fixture Pack

- `FIX-001`: first-time parent with no children
- `FIX-002`: parent with two children and no reports
- `FIX-003`: child with two completed reports for weekly review
- `FIX-004`: failed run
- `FIX-005`: needs_review run
- `FIX-006`: active share token
- `FIX-007`: expired share token
- `FIX-008`: revoked share token
- `FIX-009`: unpaid account
- `FIX-010`: paid account

## Generated Assets

- `tasks/runtime/fixtures/release_candidate_fixture_pack.json`
- helper PDFs created by the Sprint smoke scripts under `tasks/runtime/fixtures/`

## How To Use

1. Reset demo state with the Sprint smoke scripts.
2. Seed a child and upload one of the generated PDFs.
3. Use note flags such as `fail`, `timeout`, or `review` to reach the targeted runtime branch.
4. Use demo checkout to switch between unpaid and paid report states.

## Dry-Run Entry Points

```powershell
cd D:\lyh\agent\agent-frame\familyEducation
node scripts\run_sprint7_smoke.mjs
node scripts\run_sprint7_browser_smoke.mjs
```

## Limitation

These fixtures are for local release-candidate proof only. They are not a substitute for a real remote staging database, live storage bucket, or production smoke environment.
