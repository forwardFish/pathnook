# Next-Phase Governance Test Matrix

This matrix validates the planning, agentsystem, and closeout discipline for `backlog_v2_beta_launch`.

| Test ID | Scope | Scenario | Expected Result |
| --- | --- | --- | --- |
| TC-GOV2-001 | Next-phase docs | Verify requirement, traceability, and testing docs exist | All next-phase planning docs exist and are readable UTF-8 files. |
| TC-GOV2-002 | Story YAML contract | Verify every FE-050 to FE-077 card has requirement IDs, test IDs, expected evidence, and strict agentsystem enforcement | Every Story card satisfies the planning schema and workflow contract. |
| TC-GOV2-003 | Sprint discipline | Verify every Sprint has an Acceptance Story in execution order and carries ship/release/retro expectations | No Sprint may close without the required governance chain. |
| TC-GOV2-004 | Traceability integrity | Verify traceability rows only reference known requirement IDs, Story IDs, and test IDs | Traceability is internally linked and auditable. |
| TC-GOV2-005 | Continuity and handoff | Verify Sprint and Beta closeout update `PROJECT_STATE.md`, `docs/handoff/current_handoff.md`, and release/handoff artifacts | Cross-session continuity remains usable after every Sprint. |
| TC-GOV2-006 | Final verdict discipline | Verify final Beta verdict fails while any next-phase requirement row remains non-green | The release process cannot overstate completion. |
