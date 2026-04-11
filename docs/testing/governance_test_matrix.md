# Governance Test Matrix

This matrix covers the tests that validate the planning and closeout discipline itself.

Authority note:
- `docs/testing/next_phase/*` may hold working notes, but canonical delivery status must be written back into this document plus the requirement, traceability, page, click, API/data/AI, and final-acceptance matrices.

| Test ID | Scope | Scenario | Expected Result |
| --- | --- | --- | --- |
| TC-DIAG122-INTAKE-001 | Diagnosis 1.2.2 foundation | Verify intake contract fields exist in story, matrix, and runtime evidence | Intake requirement stays linked to upload UI, API evidence, and authoritative acceptance |
| TC-DIAG122-ITEM-001 | Diagnosis 1.2.2 foundation | Verify problem-item fact contract is present and evidence-linked | Problem item schema, extraction output, and anchor evidence are all traceable |
| TC-DIAG122-TAX-001 | Diagnosis 1.2.2 foundation | Verify fixed taxonomy contract and item role evidence | Taxonomy enum, item error role, and report trace evidence stay linked |
| TC-DIAG122-SPRINT15-ACCEPT | Diagnosis 1.2.2 sprint acceptance | Verify Sprint 15 closes only when foundation stories are all green | Sprint 15 acceptance story fails unless intake, item, and taxonomy rows are green |
| TC-DIAG122-DX-001 | Diagnosis 1.2.2 productization | Verify diagnosis aggregation contract is linked to evidence | Diagnosis JSON, pattern/sporadic handling, and do-not-overreact evidence are traceable |
| TC-DIAG122-PLAN-001 | Diagnosis 1.2.2 productization | Verify the 7-day plan contract is linked to evidence | Plan template, pauseList, and rule-code evidence are traceable |
| TC-DIAG122-GATE-001 | Diagnosis 1.2.2 productization | Verify quality gate and review routing are linked to evidence | Quality score, cautious routing, and low-confidence block evidence are traceable |
| TC-DIAG122-SHARE-001 | Diagnosis 1.2.2 productization | Verify share summary output is linked to evidence | Tutor-friendly share payload stays tied to diagnosis, evidence, and plan output |
| DOC-DIAG122-CAL-001 | Diagnosis 1.2.2 calibration | Verify starter calibration asset docs exist and are referenced | Gold samples, taxonomy handbook, diagnosis rules, and plan templates are present |
| TC-DIAG122-SPRINT16-ACCEPT | Diagnosis 1.2.2 sprint acceptance | Verify Sprint 16 closes only when diagnosis productization stories are all green | Sprint 16 acceptance story fails unless diagnosis, plan, gate, share, and calibration rows are green |
| TC-DIAG122-FINAL-RELEASE | Diagnosis 1.2.2 final release | Verify final release notes keep the P0 live-analysis caveat explicit | Final acceptance artifacts mention the remaining P0 live-analysis blocker where applicable |
| TC-BND134-001 | Stage boundary continuity | Verify v5 continuity files, backlog root, and validator registration exist | v5 is authoritative in continuity files and validator backlog roots while v4 remains intact as a dependent lane |
| TC-BND134-002 | Stage boundary traceability | Verify every `BND134-*` requirement is present in the requirement, traceability, and testing matrices | No BND134 row exists only in backlog files; every one is cross-linked in canonical docs |
| TC-BND134-003 | Must-do dependency mapping | Verify must-do boundary stories map to accepted diagnosis/report/share/runtime lanes without rewriting them | Stage 1 required contracts point to accepted story ids, evidence, and non-rewrite rules |
| TC-BND134-004 | Light-do delegation | Verify light-do boundary stories delegate to the dependent v4 deck lane or accepted history hooks | Walkthrough/playback/export/compare remain secondary and dependency-backed rather than becoming primary scope |
| TC-BND134-005 | Postpone guardrails | Verify postponed features stay documented as non-scope and absent from execution order | No postponed feature appears as an executable Stage 1 story or required suite |
| TC-BND134-006 | Stage boundary final gate | Verify Sprint 24 closes only when must-do and light-do rows are green or delegated and postpone rules hold | Final boundary acceptance fails if any class is ambiguous, uncovered, or leaked into the wrong scope |
| TC-GOV-001 | Bootstrap docs | Verify requirement and setup docs exist | `AGENTS.md`, `PROJECT_STATE.md`, `README-dev.md`, requirement index all exist and are readable UTF-8 files |
| TC-GOV-002 | Traceability | Verify traceability and testing matrices exist | traceability matrix, page/click/API/final acceptance docs exist and cross-reference the backlog |
| TC-GOV-003 | Story cards | Verify every Story YAML has requirement_ids, test_case_ids, expected_evidence | story card schema is complete for every generated YAML |
| TC-GOV-004 | Sprint acceptance discipline | Verify every Sprint has a Sprint Acceptance Story | each sprint directory includes an acceptance story in execution order |
