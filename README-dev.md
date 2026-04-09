# README-dev.md

## Common Commands

### Local planning and build validation
```powershell
cd D:\lyh\agent\agent-frame\familyEducation
pnpm install
python scripts\validate_planning_assets.py
python scripts\validate_beta_planning_assets.py
pnpm build
```

### Vercel-first database workflow
```powershell
cd D:\lyh\agent\agent-frame\familyEducation
pnpm db:setup
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

### Sprint 14 / next-phase standard delivery run
```powershell
cd D:\lyh\agent\agent-frame\familyEducation
python scripts\run_sprint14_delivery.py
python scripts\run_final_program_acceptance.py --phase next_phase --mode final
```

### Vercel cutover acceptance
```powershell
cd D:\lyh\agent\agent-frame\familyEducation
pnpm qa:vercel-smoke
python scripts\run_final_program_acceptance.py --phase next_phase --mode beta_smoke
python scripts\run_final_program_acceptance.py --phase next_phase --mode final
```

### Vercel direct deployment
```powershell
cd D:\lyh\agent\agent-frame\familyEducation
pnpm dlx vercel link --yes --project family-education --scope 5184250-8087s-projects
pnpm dlx vercel env pull .env.local
pnpm dlx vercel deploy
pnpm dlx vercel deploy --prod
```

## Notes
- Production-like runs should use `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `FILE_STORAGE_BACKEND=blob`, and `FAMILY_EDU_DEMO_MODE=0`.
- The local Docker Postgres flow is legacy fallback only; the primary deployment target is Vercel + Neon + Blob.
- `.vercelignore` now excludes local `.env*`, `.next`, `.meta`, and `tasks/runtime` so direct CLI deployments do not depend on local runtime files or unpublished secrets.
- Vercel runtime now treats `DATABASE_URL` as the only valid production database entrypoint. `POSTGRES_URL` remains a local-only fallback for legacy bootstrap scripts.
- The full cutover sequence and gate criteria live in `docs/testing/next_phase/vercel_cutover_runbook.md`.
