# FamilyEducation Data Retention

## Scope

This repository currently supports local, file-backed runtime validation for Sprint 7 release-candidate work. The retention rules below apply to the local runtime stores under `tasks/runtime/`.

## Retention Rules

- Child profiles deleted from the dashboard are hidden immediately.
- Linked uploads, runs, reports, tutor share links, reminder references, and runtime observability artifacts are removed from active access as part of the delete flow.
- Archived child metadata that remains in `family_mock_state.json` for audit continuity is purged after 30 days.
- Run lifecycle events, error events, and per-run cost artifacts are retained for 30 days.
- Reminder event artifacts are retained for 90 days.

## Delete Behavior

- `DELETE /api/children/[childId]`
  - Hides the child immediately.
  - Removes linked uploads, runs, reports, share links, and local artifact references.
  - Old dashboard links must resolve to `404`.
- `DELETE /api/uploads/[uploadId]`
  - Removes the upload plus all linked runs, reports, share links, and page artifacts.
  - Old run, report, export, and page artifact links must resolve to `404`.
- `DELETE /api/reports/[reportId]`
  - Removes the report and revokes linked share URLs.
  - Old report and export links must resolve to `404`.
  - Old share links must resolve to `404`.

## Cleanup Command

Run the local retention cleanup dry run with:

```powershell
cd D:\lyh\agent\agent-frame\familyEducation
python scripts\run_retention_cleanup.py
```

The command writes an audit artifact to:

- `tasks/runtime/retention/latest_cleanup_audit.json`

## Current Release-Candidate Limitation

This Sprint 7 implementation documents and validates local retention behavior only. It does not claim that a hosted production retention scheduler, remote blob purge workflow, or third-party mailbox retention policy has already been deployed.
