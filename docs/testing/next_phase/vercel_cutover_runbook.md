# FamilyEducation Vercel Cutover Runbook

## Goal
- Serve FamilyEducation from Vercel only.
- Use Neon Postgres for structured data.
- Use Vercel Blob for uploads, artifacts, and exports.
- Require Git-based preview and production deployments from `main`.

## Current Verified State
- Local build passes with `pnpm build`.
- Drizzle migrations reach Neon with `pnpm db:migrate`.
- Vercel production is reachable at `family-education-chi.vercel.app`.
- Vercel smoke and final acceptance evidence are written under `tasks/runtime/final_acceptance/` and `tasks/runtime/final_program_acceptance/`.

## Current Blockers
- Vercel is linked to `forwardFish/familyEducation`, but this workspace git remote is `nextjs/saas-starter`.
- Git-based preview deployment `dpl_4i6KRv5srK4PutFcAzf9LsjkJNWL` is `ERROR`.
- Current production deployment `dpl_42PfvpDYVEKS32dbrvSRbny3y9sn` is reachable, but it was built from `nextjs/saas-starter`, not the Vercel-linked repo.
- Live OpenAI credentials are missing for real AI acceptance.
- Live Creem credentials and product IDs are missing for real checkout acceptance.
- Blob is mounted, but the store still needs the intended private-access configuration for the production artifact path.

## Gate 0
```powershell
cd D:\lyh\agent\agent-frame\familyEducation
pnpm install
pnpm build
pnpm db:migrate
pnpm qa:vercel-smoke
python scripts\run_final_program_acceptance.py --phase next_phase --mode beta_smoke
python scripts\run_final_program_acceptance.py --phase next_phase --mode final
```

Expected:
- `pnpm build` passes.
- `pnpm db:migrate` passes.
- `tasks/runtime/final_acceptance/vercel_deployment_smoke.json` exists.
- `tasks/runtime/final_program_acceptance/final_program_acceptance.json` exists.

## Gate 1
- Relink the Vercel project so the linked GitHub repository matches this workspace, or move the real app code into the currently linked GitHub repo.
- Keep `Production Branch=main`.
- Keep `Root Directory=.`
- Re-run a Git-based preview deployment from `main`.
- Confirm the preview deployment is `READY`.

Expected smoke result:
- `project.localRemoteMatchesLinkedRepo = true`
- `suites.preview.readyState = READY`
- `suites.preview.linkedRepoMatch = true`

## Gate 2
- Add live production variables on Vercel:
  - `OPENAI_API_KEY`
  - `OPENAI_MODEL_VISION`
  - `CREEM_API_KEY`
  - `CREEM_WEBHOOK_SECRET`
  - `CREEM_PRODUCT_ONE_TIME_ID`
  - `CREEM_PRODUCT_MONTHLY_ID`
  - `CREEM_PRODUCT_ANNUAL_ID`
- Keep:
  - `DATABASE_URL`
  - `BLOB_READ_WRITE_TOKEN`
  - `FILE_STORAGE_BACKEND=blob`
  - `FAMILY_EDU_DEMO_MODE=0`
  - `BASE_URL`
  - `AUTH_SECRET`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_REDIRECT_URI`
  - `VERCEL_PROJECT_ID`
  - `VERCEL_ORG_ID`

## Gate 3
- Run a Git-based production deployment from `main`.
- Verify the deployment is `READY`.
- Verify the production deployment commit repo matches the Vercel-linked repo.
- Re-run smoke and final acceptance.

Expected smoke result:
- `suites.production.readyState = READY`
- `suites.production.linkedRepoMatch = true`
- `status = pass`

## Evidence Files
- `tasks/runtime/final_acceptance/vercel_deployment_smoke.json`
- `tasks/runtime/final_program_acceptance/final_program_acceptance.json`
- `tasks/runtime/final_program_acceptance/remaining_risks.md`
- `tasks/runtime/final_program_acceptance/final_evidence_pack_index.md`

## Decision Rule
- Do not mark Vercel cutover complete until the smoke report is green and the final acceptance report has no Vercel, AI, payment, or Blob blockers.
