# Governance Test Matrix

This matrix covers the tests that validate the planning and closeout discipline itself.

| Test ID | Scope | Scenario | Expected Result |
| --- | --- | --- | --- |
| TC-GOV-001 | Bootstrap docs | Verify requirement and setup docs exist | `AGENTS.md`, `PROJECT_STATE.md`, `README-dev.md`, requirement index all exist and are readable UTF-8 files |
| TC-GOV-002 | Traceability | Verify traceability and testing matrices exist | traceability matrix, page/click/API/final acceptance docs exist and cross-reference the backlog |
| TC-GOV-003 | Story cards | Verify every Story YAML has requirement_ids, test_case_ids, expected_evidence | story card schema is complete for every generated YAML |
| TC-GOV-004 | Sprint acceptance discipline | Verify every Sprint has a Sprint Acceptance Story | each sprint directory includes an acceptance story in execution order |
