# sprint_26_provider_and_data_layer

## Context
- Project: familyEducation
- Delivery mode: auto
- CEO review mode: hold_scope
- Source requirement file: inline input

## User Problem
# Sprint 26 Plan

## Target Audience
The primary product operators and analysts who depend on this sprint outcome.

## Requirement Summary
# Sprint 26 Plan

## Sprint Name
Provider And Data Layer

## Goal
Introduce provider abstraction, additive billing tables, entitlement projection, and old-table compatibility reads so Freemius can become the primary provider without breaking existing unlock logic.

## Exit Criteria
- Provider-neutral interfaces and service-layer entry points are defined.
- Freemius and Creem implementations are separated behind the billing service.
- Billing account, entitlement, and webhook-event tables exist with compatibility reads from existing billing data.
- The entitlement layer can compute local unlock status without trusting third-party state directly.

## Epic Overview
| Epic | Story Count | Core Responsibility |
| :--- | :--- | :--- |
| Provider Abstraction | 1 | Add the shared billing provider interface and service-selection layer. |
| Billing Data And Compatibility | 1 | Add additive billing tables and compatibility mapping from existing subscription/billing records. |
| Entitlements | 1 | Project provider purchases and subscriptions into local entitlement snapshots. |
| Sprint Acceptance | 1 | Close the provider/data sprint only if the new service contracts and persistence contracts are fully mapped. |

## Delivery Order
1. FE-117
2. FE-118
3. FE-119
4. FE-120

Sprint sprint_26_provider_and_data_layer should deliver the following story goals in one coordinated cycle:
- Close Sprint 26 only if provider abstraction, billing tables, and entitlement projection are all structurally complete and regression-safe.
- Add the new provider-account, entitlement, and webhook-event tables and keep the existing billing reads available as compatibility fallbacks.
- Map provider purchases and subscriptions into local entitlement snapshots that control report unlocks, subscription status, portal availability, and historical rights.
- Introduce provider-neutral billing interfaces, separate Freemius and Creem implementations, and expose a single billing service entry point.

## Product Constraints
- Follow the formal story execution matrix.
- Do not skip review, QA, or sprint close evidence.

## Success Signals
- Every story in the sprint completes with formal evidence.
- Sprint-level framing, closeout, and acceptance artifacts are recorded.

## CEO Mode Decision
- Selected mode: hold_scope
- No scope expansion was auto-accepted.

## System Audit Snapshot
- Design scope detected; keep plan-design-review in the downstream chain.
- Office-hours framing is available and should be treated as upstream context.
- Constraint count: 2 | Success signals: 2.
