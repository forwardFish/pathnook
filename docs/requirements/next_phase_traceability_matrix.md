# Next-Phase Traceability Matrix

Status key:
- `Planned`: requirement is defined, mapped to Story cards and tests, but implementation has not started
- `In Progress`: implementation or evidence generation is underway
- `Green`: requirement is implemented, verified, accepted, and linked to evidence
- `Blocked`: requirement has an explicit blocker recorded

Every next-phase Sprint Acceptance Story must audit the rows it owns. Any non-green row blocks Sprint closeout.

| Requirement ID | Capability | Route / API / Schema | Story IDs | Test IDs | Expected Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- |
| GOV2-001 | Strict agentsystem workflow | `tasks/backlog_v2_beta_launch/**/*.yaml` | FE-050 FE-053 FE-057 FE-062 FE-067 FE-072 FE-077 | TC-GOV2-002 TC-GOV2-003 | story schema review, workflow audit | Green |
| GOV2-002 | Requirement-test-evidence parity | `docs/requirements/next_phase_*`, `docs/testing/next_phase/*` | FE-050 FE-053 FE-077 | TC-GOV2-001 TC-GOV2-004 | document review, traceability audit | Green |
| GOV2-003 | Sprint acceptance close rule | each Sprint Acceptance Story | FE-053 FE-057 FE-062 FE-067 FE-072 FE-077 | TC-GOV2-003 | acceptance packet, ship/release/retro references | Green |
| GOV2-004 | Beta verdict discipline | `docs/testing/next_phase/final_program_acceptance.md` | FE-075 FE-076 FE-077 | TC-GOV2-006 FP2-001 FP2-002 | final evidence pack, final verdict | Green |
| PROD-001 | Vercel env baseline | preview/prod URLs, OAuth and billing callback config | FE-050 FE-053 | OPS2-DEP-001 OPS2-DEP-002 | env checklist, smoke transcript | Green |
| PROD-002 | Production storage adapter | upload/export/share artifact lifecycle | FE-051 FE-053 | API2-STO-001 DATA2-STO-001 OPS2-STO-001 | storage adapter tests, artifact audit | Green |
| PROD-003 | Production smoke and observability baseline | deploy smoke, structured logging, provider failure handling | FE-052 FE-053 | OPS2-OBS-001 OPS2-OBS-002 NF2-002 NF2-003 | smoke logs, telemetry evidence | Green |
| BIL2-001 | Live Creem product mapping | `/pricing`, `/dashboard/billing`, checkout route | FE-054 FE-057 | PAGE2-PRC-001 PAGE2-BIL-001 API2-BIL-001 CLICK2-002 | pricing screenshots, checkout session evidence | Green |
| BIL2-002 | Checkout success/cancel and lock state | billing and locked report UX | FE-054 FE-057 | PAGE2-BIL-001 PAGE2-BIL-002 API2-BIL-002 CLICK2-003 | success/cancel screenshots, entitlement checks | Green |
| BIL2-003 | Webhook idempotency and customer portal | Creem webhook + portal lifecycle | FE-055 FE-057 | API2-BIL-003 API2-BIL-004 DATA2-BIL-001 OPS2-BIL-001 CLICK2-008 | webhook replay output, portal evidence | Green |
| AUTH2-001 | Email + Google dual-auth | `/sign-in`, `/sign-up`, OAuth routes | FE-056 FE-057 | PAGE2-SIN-001 PAGE2-SUP-001 API2-AUTH-001 CLICK2-010 | browser auth evidence, callback transcript | Green |
| AUTH2-002 | Safe Google fallback UX | sign-in error handling and config fallback | FE-056 FE-057 | PAGE2-SIN-001 API2-AUTH-001 NF2-002 | user-facing error copy, fallback evidence | Green |
| MKT-001 | Landing conversion system | `/` | FE-058 FE-062 | PAGE2-LND-001 PAGE2-LND-002 CLICK2-001 | browser screenshots, CTA evidence | Green |
| MKT-002 | Pricing conversion system | `/pricing` | FE-059 FE-062 | PAGE2-PRC-001 PAGE2-PRC-002 CLICK2-002 | pricing screenshots, CTA funnel evidence | Green |
| MKT-003 | Sample report funnel | `/sample-report` | FE-060 FE-062 | PAGE2-SMP-001 PAGE2-SMP-002 CLICK2-003 | sample-report screenshots, funnel evidence | Green |
| MKT-004 | Marketing event tracking | CTA and checkout intent events | FE-061 FE-062 | API2-MKT-001 DATA2-MKT-001 | event snapshots, attribution audit | Green |
| QLT-001 | Diagnosis quality upgrade | `/dashboard/reports/[reportId]` diagnosis view | FE-063 FE-067 | PAGE2-RPT-001 AI2-RPT-001 | report screenshots, quality assertions | Green |
| QLT-002 | Evidence/source clarity | evidence tab, overlay, fallback copy | FE-064 FE-067 | PAGE2-RPT-002 AI2-RPT-002 CLICK2-005 | source-anchor screenshots, QA logs | Green |
| QLT-003 | 7-day plan and audience variants | report output + export payloads | FE-065 FE-067 | PAGE2-RPT-003 API2-RPT-001 AI2-RPT-003 AI2-RPT-004 | report JSON assertions, plan evidence | Green |
| RUN2-001 | Upload quality guidance | `/dashboard/children/[childId]/upload` | FE-066 FE-067 | PAGE2-UPL-001 API2-RUN-001 | upload screenshots, quality-warning evidence | Green |
| RUN2-002 | Run reliability UX | `/dashboard/runs/[runId]` | FE-066 FE-067 | PAGE2-RUN-001 API2-RUN-001 NF2-002 CLICK2-004 | run screenshots, retry/stuck evidence | Green |
| RET2-001 | History and trends API layer | child history/trends/compare APIs | FE-068 FE-072 | API2-RET-001 API2-RET-002 DATA2-RET-001 | API output, progression snapshot evidence | Green |
| RET2-002 | Compare UI and weekly review | `/dashboard/children/[childId]` | FE-069 FE-072 | PAGE2-CHD-001 CLICK2-006 | weekly-review screenshots, compare evidence | Green |
| RET2-003 | Annual plan value layer | child detail annual summary | FE-070 FE-072 | PAGE2-CHD-002 API2-RET-003 | annual-summary screenshots, entitlement evidence | Green |
| TUT2-001 | Tutor workspace deepening | `/dashboard/tutor` | FE-071 FE-072 | PAGE2-TUT-001 CLICK2-007 | workspace screenshots, owner-note evidence | Green |
| TUT2-002 | Share analytics and revoke visibility | `/share/[token]`, share stats/meta APIs | FE-071 FE-072 | PAGE2-SHR-001 API2-SHR-001 DATA2-SHR-001 CLICK2-007 | share-analytics output, revoke evidence | Green |
| PRIV2-001 | Privacy and deletion UX | `/dashboard/account` or dedicated privacy surface | FE-073 FE-077 | PAGE2-ACC-001 API2-PRIV-001 CLICK2-009 DATA2-DEL-001 | deletion screenshots, access-denial evidence | Green |
| PRIV2-002 | Audit logging and access boundaries | audit log persistence across sensitive flows | FE-074 FE-077 | API2-AUD-001 DATA2-AUD-001 | audit transcript, immutable log evidence | Green |
| REL2-001 | Beta smoke and release checklist | release packet, smoke scripts, blocker review | FE-075 FE-077 | OPS2-BETA-001 FP2-002 | smoke outputs, release checklist | Green |
| REL2-002 | Beta handoff and metrics baseline | handoff docs, metrics snapshot, remaining risks | FE-076 FE-077 | OPS2-BETA-002 TC-GOV2-005 FP2-001 | handoff doc diff, metrics baseline pack | Green |
