# 2026-04-04 FamilyEducation 收尾暂停点

## 本次会话目标

- 先实现 `agentsystem` 的 Sprint 边界暂停/恢复硬机制。
- 再继续 `familyEducation` 的 `FE-035` 到 `FE-049`。
- 当前会话在 `agentsystem` 阶段中途暂停，`familyEducation` 还没有开始正式代码改动。

## 已完成内容

### 1. agentsystem 已落地的改动

本次实际已修改文件：

- `D:\lyh\agent\agent-frame\agentsystem\cli.py`
- `D:\lyh\agent\agent-frame\agentsystem\tests\test_auto_deliver_cli.py`

已经落地的能力：

- 新增统一 Sprint 边界恢复文案常量：
  - `SPRINT_CLOSEOUT_RESUME_COMMAND = "python cli.py run-roadmap --resume"`
  - `SPRINT_CLOSEOUT_NEXT_ACTION = "Run `/compact`, then execute `python cli.py run-roadmap --resume`."`
- `run-roadmap` 与 `auto-deliver` 在 Sprint closeout 暂停时，用户可见 `next_action` 已统一，不再显示 “recorded auto-deliver resume command” 这类第二套文案。
- Story 成功快照复用逻辑已增强：
  - 继续校验 `accepted` 与 `formal_flow_complete`
  - 继续校验 story traceability fingerprint
  - 额外校验 evidence / audit 工件是否仍存在
  - 如果 `evidence_contract.missing_expected_evidence` 仍有缺口，则判定为不可复用
- paused shortcut 已不再无条件直接跳到 `next_sprint_id / next_story_id`：
  - 会回看 completed sprint 之前的 story 快照是否仍可复用
  - 会回看 paused sprint summary 中的 traceability gate 三类工件是否仍存在
  - 会回看 `ship_report_path`、`document_release_path`、`retro_path`、`special_acceptance_report_path` 是否仍存在
  - 如果发现 story 合同漂移或 Sprint 级工件丢失，会把恢复点拉回“最早受影响的 Story”，而不是静默跳过已完成 Sprint
- `run-roadmap --resume` 入口已开始支持“无 `--tasks-root/--roadmap-prefix` 自动发现恢复目标”的逻辑：
  - 会尝试从现有 resume state 中发现最新可恢复对象
  - 设计上准备兼容 roadmap 和 multi-sprint backlog 两种来源

### 2. tests 已补的覆盖

新增了两个关键回归测试：

- `test_resolve_roadmap_resume_cursor_rewinds_to_completed_sprint_when_traceability_artifacts_are_missing`
- `test_resolve_roadmap_resume_cursor_rewinds_to_changed_story_when_paused_snapshot_contract_drifted`

这两个测试都已经通过。

## 已验证结果

本次已确认通过的测试：

- `python -m unittest tests.test_continuity -v`
- `python -m unittest tests.test_runtime_memory -v`

结果：

- `tests.test_continuity`: 全部通过
- `tests.test_runtime_memory`: 全部通过
- `tests.test_auto_deliver_cli`: 全套未跑完，长时间超时

本次聚焦执行过的 `test_auto_deliver_cli` 子集里：

- `test_resolve_roadmap_resume_cursor_rewinds_to_completed_sprint_when_traceability_artifacts_are_missing`: 通过
- `test_resolve_roadmap_resume_cursor_rewinds_to_changed_story_when_paused_snapshot_contract_drifted`: 通过
- `test_resolve_roadmap_resume_cursor_can_recover_from_story_level_running_state`: 通过
- `test_execute_roadmap_resume_reuses_existing_phase_1_summary_without_reinvalidating`: 失败

## 当前 blocker

### agentsystem 的一个兼容性回归还没收口

失败测试：

- `tests.test_auto_deliver_cli.AutoDeliverCliTestCase.test_execute_roadmap_resume_reuses_existing_phase_1_summary_without_reinvalidating`

当前现象：

- 预期恢复点应直接落在 `roadmap_1_6_sprint_2_beta`
- 实际被拉回了 `roadmap_1_6_sprint_1_alpha`

高概率原因：

- 新增的 paused boundary 校验把“旧格式 paused summary”也按新规则严格验证了
- 旧 fixture 里的 `sprint_1` summary 没有完整 `post_hook/traceability_gate/special_acceptance_report_path`
- 因此被判定为 Sprint 边界证据不足，恢复点回退到了 completed sprint 的首 story

下次优先要做的事：

- 修复 paused boundary 校验的兼容策略
- 目标是：
  - 新格式运行结果继续严格校验 Sprint 边界证据
  - 旧格式历史 summary 不要误报为“必须回退到上个 Sprint”
  - 只有真的发生 requirement / traceability / evidence 漂移时，才回退到最早受影响 Story

## familyEducation 当前实际状态

这次会话还没有改 `familyEducation` 代码，但已经确认了几个重要事实：

- repo 路径：`D:\lyh\agent\agent-frame\familyEducation`
- 现有 handoff 仍停在 Sprint 5
- `tasks/story_status_registry.json` 里 `FE-035` 到 `FE-049` 仍是 `planned`
- Sprint 6 以后脚本还没补：
  - `run_sprint6_smoke.mjs`
  - `run_sprint6_browser_smoke.mjs`
  - `run_sprint6_delivery.py`
  - Sprint 7/8 同类脚本
  - `scripts/run_final_program_acceptance.py`

### 已识别但尚未动手的 familyEducation 重点改造点

- 需要新增统一存储适配层，支持：
  - `FILE_STORAGE_BACKEND=local|blob`
  - 本地 `local`
  - Vercel `blob`
- 需要修正当前 `pages.storagePath` 仍可能指向原始上传文件的问题
- 页面附件读取当前仍直接依赖本地文件路径，需要改为统一走存储适配层
- 部署前仍缺：
  - 正确业务 remote
  - `.vercel` link
  - `POSTGRES_URL`
  - `AUTH_SECRET`
  - `BLOB_READ_WRITE_TOKEN`

## 下次建议继续顺序

1. 先回到 `agentsystem`
2. 修掉 `test_execute_roadmap_resume_reuses_existing_phase_1_summary_without_reinvalidating`
3. 再补一个针对 `run-roadmap --resume` 无参数恢复入口的回归测试
4. 只有 `agentsystem` 这块稳定后，再切到 `familyEducation` 做存储适配层
5. 然后按顺序推进：
   - `FE-035` 起
   - Sprint 6 交付与证据闭环
   - Sprint 7 交付与证据闭环
   - Sprint 8 最终审计与总测

## 本次未做的事情

- 没有修改 `familyEducation` 业务代码
- 没有修改 `familyEducation` schema
- 没有新增 Sprint 6-8 交付脚本
- 没有执行任何 Vercel 部署动作
- 没有做 git commit / push

## 给下一次会话的最短提示

建议直接从下面这句开始：

```text
Read D:\\lyh\\agent\\agent-frame\\familyEducation\\docs\\handoff\\20260404_closeout_pause_resume_status.md first.
Then fix the remaining agentsystem paused-boundary compatibility regression before touching familyEducation.
```
