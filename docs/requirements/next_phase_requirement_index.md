# Next-Phase Requirement Index

Source of truth:
- `docs/需求文档_1.1.md`
- `docs/handoff/full_system_summary.md`

This index converts the next Beta-launch phase into requirement IDs. No next-phase Story may enter code acceptance until its requirement IDs, test_case_ids, and evidence expectations all map to this document and the linked testing matrices.

| Requirement ID | Category | Source Section | Requirement |
| --- | --- | --- | --- |
| GOV2-001 | Governance | Governance / Agentsystem workflow | All next-phase Stories must run through the standard agentsystem chain and keep `workflow_enforcement_policy: strict_agentsystem`. |
| GOV2-002 | Governance | Governance / Docs and traceability | Requirement docs, traceability, testing matrices, Story YAMLs, and acceptance evidence must stay aligned before any Story may be treated as complete. |
| GOV2-003 | Governance | Governance / Sprint closeout | Every Sprint must contain a Sprint Acceptance Story and must close with `ship`, `document-release`, and `retro`. |
| GOV2-004 | Governance | Governance / Beta verdict | The Beta verdict may only be `PASS` when every next-phase requirement row is green with evidence; otherwise it is `FAIL`. |
| PROD-001 | Production readiness | Epic 1 / Production readiness foundation | The app must define a real preview/production deployment baseline, canonical base URLs, callback URLs, and environment checklists suitable for Vercel-linked Beta release. |
| PROD-002 | Production readiness | Epic 1 / Production storage and artifact lifecycle | Upload artifacts, page images, exports, and share assets must move from local-only assumptions to a production-ready storage adapter with deterministic lifecycle handling. |
| PROD-003 | Production readiness | Epic 1 / Smoke and observability | Preview and production smoke paths, structured logs, error visibility, and provider-failure visibility must exist before Beta launch. |
| BIL2-001 | Billing | Epic 2 / Live Creem billing closure | The three Creem commercial plans (`One-Time Diagnosis`, `Parent Weekly`, `Parent Annual`) must map to live products and real checkout flows. |
| BIL2-002 | Billing | Epic 2 / Live Creem billing closure | Billing success, cancel, and entitlement UX must keep pricing, billing, and locked-report behavior consistent after live checkout. |
| BIL2-003 | Billing | Epic 2 / Webhook and portal | Creem webhook processing must be idempotent and drive subscription lifecycle, entitlement sync, and customer-portal access safely. |
| AUTH2-001 | Auth | Epic 2 / External auth | The app must support normal email account registration/login plus Google OAuth without making Google the only entry path. |
| AUTH2-002 | Auth | Epic 2 / External auth UX hardening | Google OAuth success, cancel, and not-configured fallback must remain user-friendly and must not expose raw configuration details. |
| MKT-001 | Conversion | Epic 3 / Landing | The landing page must function as a real conversion surface with clear Beta positioning, CTA hierarchy, trust copy, and scroll-section structure. |
| MKT-002 | Conversion | Epic 3 / Pricing | The pricing page must clearly explain the three plans, value differences, FAQs, and routing into checkout or sign-up. |
| MKT-003 | Conversion | Epic 3 / Sample report | A `/sample-report` funnel must let buyers preview diagnosis, evidence, and plan structure before purchase. |
| MKT-004 | Conversion | Epic 3 / Marketing events | Conversion-critical CTA clicks and checkout-intent events must be recorded in a deterministic event-tracking baseline. |
| QLT-001 | Report quality | Epic 4 / Diagnosis quality | Diagnosis output must better distinguish primary vs secondary issues, pattern vs sporadic findings, and avoid overreacting to low-evidence signals. |
| QLT-002 | Report quality | Epic 4 / Evidence clarity | Evidence presentation must improve grouping, source anchoring, overlay behavior, and low-evidence fallback messaging. |
| QLT-003 | Report quality | Epic 4 / Plan and audience variants | The 7-day plan must become more actionable, and parent/student/tutor outputs must remain clearly differentiated while sharing a common facts layer. |
| RUN2-001 | Upload and reliability | Epic 6 / Upload guidance | Upload surfaces must explain quality problems, acceptable material ranges, and how to recover from weak source inputs. |
| RUN2-002 | Upload and reliability | Epic 6 / Run reliability | Run-status UX must explain retry reasons, stuck cases, `needs_review`, and recovery paths more clearly. |
| RET2-001 | Retention | Epic 5 / History and trends | Child history, weekly review comparison, and trend APIs must expose useful progression context across reports. |
| RET2-002 | Retention | Epic 5 / Compare UI | Child detail and report-adjacent UI must surface history comparison, weekly review, and trend cards in a parent-friendly way. |
| RET2-003 | Retention | Epic 5 / Annual value layer | Annual-plan users must receive a quarterly summary and longer-horizon value surfaces that justify the yearly offering. |
| TUT2-001 | Tutor handoff | Epic 7 / Tutor workspace deepening | The tutor workspace must deepen beyond the shell by showing recent shared reports, owner notes, and handoff-ready summaries. |
| TUT2-002 | Tutor handoff | Epic 7 / Share analytics | Share flows must track revoke state, access visibility, and share-usage analytics without turning tutor into a standalone product. |
| PRIV2-001 | Privacy and deletion | Epic 8 / Privacy UX | Delete child/upload/report/account entry points and privacy retention explanations must be understandable from the product UI. |
| PRIV2-002 | Privacy and deletion | Epic 8 / Audit boundaries | Sensitive actions such as entitlement unlock, share revoke, admin approval, and deletion must leave auditable access-boundary evidence. |
| REL2-001 | Release governance | Epic 8 / Beta launch checklist | Beta launch requires a deterministic smoke suite, release checklist, external dependency checklist, and blocker review. |
| REL2-002 | Release governance | Epic 8 / Handoff and metrics baseline | Beta handoff must summarize system state, metrics baseline, remaining risks, and follow-up work without overstating remote readiness. |
