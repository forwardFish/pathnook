# Next-Phase Click Path Matrix

These are the canonical Beta-launch journeys. Every Sprint Acceptance Story must re-run the paths touched by that Sprint.

## CLICK2-001 Landing -> Sign-Up -> Dashboard

Preconditions: public visitor
Steps:
1. Open `/`.
2. Click the primary CTA.
3. Complete standard account sign-up.
4. Confirm entry into `/dashboard`.
Expected result: the public conversion path remains intact and reaches the protected app shell successfully.
Evidence to collect:
- landing before/after screenshots
- sign-up submission evidence
- dashboard arrival evidence

## CLICK2-002 Pricing -> Choose Plan -> Checkout Or Sign-In

Preconditions: public and authenticated variants
Steps:
1. Open `/pricing`.
2. Click each plan CTA.
3. Observe routing for public and authenticated users.
Expected result: public users are routed into auth first, while authenticated users continue toward billing or live checkout.
Evidence to collect:
- pricing screenshots
- CTA route transcript
- checkout or sign-in redirect evidence

## CLICK2-003 Sample Report -> Unlock Funnel

Preconditions: public visitor
Steps:
1. Open `/sample-report`.
2. Review sample diagnosis/evidence/plan.
3. Click the unlock or pricing CTA.
Expected result: the sample report previews value and routes the user into the correct commercial funnel without dead ends.
Evidence to collect:
- sample-report screenshots
- CTA evidence
- pricing or billing arrival evidence

## CLICK2-004 Upload -> Run -> Report

Preconditions: authenticated account with child
Steps:
1. Open the upload page.
2. Upload qualifying pages and submit.
3. Follow the user into the run page.
4. Reopen the completed report.
Expected result: upload guidance, run explanations, and report arrival remain coherent across the full workflow.
Evidence to collect:
- upload submission evidence
- run page screenshots
- report arrival evidence

## CLICK2-005 Report -> Evidence -> Source Anchor

Preconditions: existing report with evidence anchors
Steps:
1. Open the report.
2. Switch to evidence.
3. Open a source anchor or fallback panel.
Expected result: the evidence path explains source grounding clearly, with overlay or fallback behavior that is still useful.
Evidence to collect:
- evidence tab screenshots
- source anchor behavior screenshots
- console/network sanity

## CLICK2-006 Child Detail -> Compare -> Weekly Review

Preconditions: child with at least two reports
Steps:
1. Open child detail.
2. Launch compare or weekly review.
3. Inspect trend change and next-focus output.
Expected result: progression insight remains scoped to the selected child and surfaces next-step guidance.
Evidence to collect:
- child detail screenshots
- compare screenshots
- weekly review evidence

## CLICK2-007 Report -> Share -> Tutor Workspace

Preconditions: authenticated owner with shareable report
Steps:
1. Open a report and create or inspect a share.
2. Reopen tutor workspace.
3. Confirm notes and recent-share context.
Expected result: tutor handoff feels connected between report, share, and workspace without exposing private owner-only data to the share page.
Evidence to collect:
- report/share screenshots
- tutor workspace screenshots
- share analytics evidence

## CLICK2-008 Billing -> Customer Portal -> Return

Preconditions: active paid account
Steps:
1. Open `/dashboard/billing`.
2. Enter the customer portal.
3. Return to the product.
Expected result: portal access succeeds, and the billing page reflects the current lifecycle state on return.
Evidence to collect:
- billing screenshots
- portal session evidence
- return-state evidence

## CLICK2-009 Privacy Delete -> Access Denied

Preconditions: authenticated account with existing child/upload/report artifacts
Steps:
1. Trigger an allowed delete flow.
2. Attempt to reopen the deleted artifact.
3. Attempt to access any old share/export route.
Expected result: deleted resources are no longer accessible, and old links fail with deterministic denial behavior.
Evidence to collect:
- deletion confirmation evidence
- post-delete denial evidence
- audit log reference

## CLICK2-010 Sign-In -> Google OAuth -> Callback Or Friendly Fallback

Preconditions: Google configured or explicitly unconfigured test mode
Steps:
1. Open `/sign-in`.
2. Click `Continue with Google`.
3. Complete success, cancel, or unconfigured fallback path.
Expected result: the user lands in the app after success, or sees friendly fallback handling without raw secrets/config details after cancel or missing config.
Evidence to collect:
- sign-in screenshots
- OAuth route transcript
- callback or fallback evidence
