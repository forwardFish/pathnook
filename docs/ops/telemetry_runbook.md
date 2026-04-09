# FamilyEducation Telemetry Runbook

## Goal

Sprint 7 adds local observability evidence for run lifecycle, error events, and per-run cost tracking without requiring a live Vercel observability backend.

## Runtime Stores

Telemetry artifacts are written under `tasks/runtime/observability/`:

- `run_lifecycle_events.json`
- `error_events.json`
- `cost_artifacts.json`
- `run_artifacts/run_<runId>.json`

Reminder artifacts remain under `tasks/runtime/family_local_runtime/reminder_events.json`.

## What Is Recorded

- Queue and retry admission for each run
- State transitions through preprocessing, extracting, composing, done, review, and failed
- Timeout and forced-failure error events
- Per-run cost estimates for OpenAI and Mathpix processing paths

## Verification Steps

1. Start from demo mode.
2. Create a child and upload a 5 to 10 page packet.
3. Submit the upload and process the run.
4. Inspect:
   - `run_lifecycle_events.json` for queue and completion entries
   - `cost_artifacts.json` for the per-run estimate
   - `run_artifacts/run_<runId>.json` for the single-run cost artifact
5. Create a failure case by submitting an upload with `notes=fail` or `notes=timeout`.
6. Inspect `error_events.json` for the matching error record.

## Dry-Run Commands

```powershell
cd D:\lyh\agent\agent-frame\familyEducation
node scripts\run_sprint7_smoke.mjs
python scripts\run_retention_cleanup.py
```

## Current Release-Candidate Limitation

This runbook proves local runtime visibility only. It does not claim that OpenTelemetry export, Vercel dashboards, hosted alerting, or centralized cost billing has already been wired in production.
