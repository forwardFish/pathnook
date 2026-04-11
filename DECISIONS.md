# DECISIONS.md

- Updated: 2026-04-11T19:15:00+08:00

## Active Decision Inputs
- D:\lyh\agent\agent-frame\.meta\familyEducation\plan_ceo_review\product_review_report.md

## Active Delivery Decisions
- `backlog_v5_stage1_boundary_1_3_4` is now the authoritative execution lane for `需求文档_1.3.4` stage-boundary planning and decomposition.
- `backlog_v4_diagnosis_player_1_3_x` remains intact as the dependent light-lane backlog for deck/player execution; it is inherited rather than merged away.
- Accepted Story YAMLs and acceptance packets in `backlog_v1`, `backlog_v2_beta_launch`, and `backlog_v3_diagnosis_1_2_2` remain immutable; v5 may only add dependency references, traceability links, and regression coverage.
- `需求文档_1.3.3` still governs user-facing copy and default UX for light-lane walkthrough features: `Guided Walkthrough` is optional, voice is off by default, and visual explanation stays secondary to the report.
- `需求文档_1.3.4` governs Stage 1 scope classification: `must-do` and `light-do` enter sprint execution; `postpone` remains documented as non-scope guardrails only.
- Sprint execution now follows the boundary-first order: bootstrap/traceability -> must-do alignment -> light-lane mapping -> final boundary closure.
