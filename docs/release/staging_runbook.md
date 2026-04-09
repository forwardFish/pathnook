# FamilyEducation Staging Runbook

## Scope

This runbook prepares the repository for a release-candidate dry run. It does not assert that a real remote staging environment has already been provisioned.

## Environment Checklist

- `POSTGRES_URL`
- `AUTH_SECRET`
- `BASE_URL`
- `FAMILY_EDU_DEMO_MODE`
- `FAMILY_EDU_DEMO_AUTO_AUTH`
- `FILE_STORAGE_BACKEND`
- Stripe test keys when validating checkout parity
- OpenAI and Mathpix keys only if validating remote extraction instead of safe fallback

## Preflight

```powershell
cd D:\lyh\agent\agent-frame\familyEducation
python scripts\validate_planning_assets.py
pnpm db:generate
pnpm build
```

## Migration Dry Run

This repo currently uses local schema generation plus file-backed runtime validation. The release-candidate migration dry run is:

```powershell
cd D:\lyh\agent\agent-frame\familyEducation
$env:POSTGRES_URL='postgres://postgres:postgres@127.0.0.1:54322/postgres'
pnpm db:generate
```

## App Start

```powershell
cd D:\lyh\agent\agent-frame\familyEducation
pnpm start
```

## Minimum Smoke Sequence

1. Open `/dashboard/children`.
2. Create a child profile.
3. Upload a 5 to 10 page packet.
4. Submit a run and verify lifecycle progress.
5. Unlock the report with demo checkout.
6. Open the report, export PDF, and create a tutor share link.
7. Verify delete entry points for child, upload, and report.
8. Inspect local runtime observability artifacts under `tasks/runtime/observability/`.

## Evidence Paths

- `tasks/runtime/qa_results/sprint_7_delivery_results.json`
- `tasks/runtime/sprint_acceptance/sprint_7_acceptance_report.md`
- `tasks/runtime/traceability_audits/sprint_7_traceability_audit.md`
- `tasks/runtime/retention/latest_cleanup_audit.json`

## Known Blockers Not Claimed Complete

- No real Vercel-linked staging deployment is asserted by this story.
- No production mailbox provider is asserted by this story.
- No centralized hosted observability platform is asserted by this story.
