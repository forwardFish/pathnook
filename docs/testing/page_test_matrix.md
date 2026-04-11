# Page Test Matrix

This document defines the page-level verification standard. Every page must be checked across the following 12 dimensions before it can be treated as implemented:

1. Route reachability
2. Permission and redirect behavior
3. Core PRD copy and field presence
4. Empty state
5. Loading state
6. Error state
7. Disabled state
8. Success state
9. Return path / back navigation
10. Mobile responsiveness
11. Browser usability: console, network, dialog sanity
12. Wireframe and field consistency against the PRD

## Landing (`/`)

Primary route: `/`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-LND-001 | 未登录访问首页 | 无 | 打开 `/`。 | 看到 hero、How it works、trust copy、FAQ、Pricing/Sign in CTA。 |
| PAGE-LND-002 | `Try a Diagnosis` CTA | 未登录 | 点击 `Try a Diagnosis`。 | 跳转 `/sign-up?redirect=dashboard` 或等价注册入口。 |
| PAGE-LND-003 | `See Sample Report` CTA | 无 | 点击 `See Sample Report`。 | 进入样例报告或样例说明区域，不出现 404。 |
| PAGE-LND-004 | 已登录用户 CTA | 已登录 parent 账户 | 从首页点击主 CTA。 | 直接进入 `/dashboard`。 |
| PAGE-LND-005 | 文案一致性 | 无 | 核对 headline、subheadline、How it works。 | 与 PRD 的 parent-first、7-day plan 定位一致。 |
| RESP-001 | 移动端首屏 | 浏览器宽度 390px | 打开首页。 | 按钮、文案、导航可见且不溢出。 |

## Pricing (`/pricing`)

Primary route: `/pricing`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-PRC-001 | 查看定价页 | 无 | 打开 `/pricing`。 | 出现 one-time、monthly、Tutor/Coming soon 方案。 |
| PAGE-PRC-002 | 游客点击购买 | 未登录 | 点击任一购买 CTA。 | 先进入注册/登录，再返回 billing 或 checkout。 |
| PAGE-PRC-003 | 已登录购买 | 已登录 parent | 点击购买 CTA。 | 进入 `/dashboard/billing` 或 checkout。 |
| PAGE-PRC-004 | 价格与文案审阅 | 无 | 核对方案标题、周期和说明。 | 与 PRD 中 one-time、monthly、tutor 路径一致。 |

## Sign-up (`/sign-up`)

Primary route: `/sign-up`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-SUP-001 | 渲染字段完整性 | 无 | 打开 `/sign-up`。 | 看到 email、password、country、timezone、18+、TOS/Privacy。 |
| PAGE-SUP-002 | 18+ 校验 | 未勾选 18+ | 填写其他字段后提交。 | 提交失败并出现 18+ 必填提示。 |
| PAGE-SUP-003 | TOS/Privacy 校验 | 未勾选 TOS/Privacy | 填写其他字段后提交。 | 提交失败并出现 TOS/Privacy 必填提示。 |
| PAGE-SUP-004 | 弱密码校验 | 无 | 输入弱密码后提交。 | 出现密码复杂度或最小长度错误。 |
| PAGE-SUP-005 | 重复邮箱 | 数据库存在该邮箱 | 使用重复邮箱注册。 | 看到重复邮箱错误，不创建第二个用户。 |
| PAGE-SUP-006 | 成功注册后跳转 | 填写合法信息 | 提交表单。 | 创建 parent 账户、建立 session，并跳转 dashboard。 |
| PAGE-SUP-007 | 时区保存 | 填写合法信息 | 提交并查看账户信息。 | country/timezone/locale 按输入保存。 |
| RESP-002 | 移动端注册页 | 浏览器宽度 390px | 打开 `/sign-up`。 | 表单完整可用，不需要横向滚动。 |

## Sign-in (`/sign-in`)

Primary route: `/sign-in`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-SIN-001 | 正常登录 | 已有 parent 账户 | 输入正确凭据后提交。 | 登录成功并跳转 dashboard。 |
| PAGE-SIN-002 | 错误密码 | 已有账户 | 输入错误密码提交。 | 显示鉴权失败，不建立 session。 |
| PAGE-SIN-003 | 受保护路由回流 | 从 `/dashboard` 被重定向而来 | 登录成功。 | 回到原始受保护路径。 |
| PAGE-SIN-004 | 忘记密码入口 | 无 | 查看登录页。 | 存在找回密码或恢复入口。 |

## Dashboard / Children (`/dashboard`, `/dashboard/children*`)

Primary route: `/dashboard`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-DAS-001 | 未登录访问 dashboard | 无 session | 直接打开 `/dashboard`。 | 被重定向到 `/sign-in`。 |
| PAGE-DAS-002 | 仪表盘核心卡片 | 已登录且有数据 | 打开 `/dashboard`。 | 显示 children、recent reports、recent runs、billing/account 入口。 |
| PAGE-DAS-003 | 无孩子空态 | 已登录且无孩子 | 打开 `/dashboard`。 | 出现 clear empty state 与 `Add Child` CTA。 |
| PAGE-DAS-004 | 多个孩子切换 | 已创建多个孩子 | 在列表中切换孩子。 | 各自历史和上传入口隔离正确。 |
| PAGE-CHD-001 | 创建孩子 | 已登录 | 进入 `/dashboard/children/new` 并提交 nickname/grade/curriculum。 | 创建成功并回到列表或详情页。 |
| PAGE-CHD-002 | 编辑孩子 | 已有孩子 | 修改 grade 或 nickname 后保存。 | 修改成功并立即反映。 |
| PAGE-CHD-003 | 最小化 PII | 创建孩子表单 | 查看字段。 | 默认不要求真实姓名、学校。 |
| PAGE-CHD-004 | 历史报告列表 | 某孩子有 >=3 份报告 | 打开孩子详情。 | 看到最近 3 次或更多报告。 |
| PAGE-CHD-005 | 周度复盘对比 | 存在连续 2 份报告 | 打开孩子详情并选择 compare。 | 显示趋势变化和下周重点。 |
| PAGE-CHD-006 | 家长复盘笔记 | 存在历史报告 | 输入并保存 note。 | 刷新后仍可看到。 |
| PAGE-CHD-007 | 所有权隔离 | 用户 A 与用户 B 都有孩子 | 用户 A 访问用户 B 的 childId。 | 返回 403/404。 |

## Upload (`/dashboard/children/[childId]/upload`)

Primary route: `/dashboard/children/[childId]/upload`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-DIAG122-UPLOAD-001 | Diagnosis intake section | 已登录且有 child | 打开 upload 页面并查看 intake 模块。 | 出现 subject、grade、source、parent concern、teacher context 等输入项。 |
| PAGE-UPL-001 | 上传 5 张图片 | 已登录且有 child | 拖拽 5 张图片到上传区。 | 上传成功，显示 5 个缩略图。 |
| PAGE-UPL-002 | 多文件点击选择 | 已登录且有 child | 点击 Browse 选择多张图片。 | 页面显示全部预览和页数。 |
| PAGE-UPL-003 | 超过 10 页拦截 | 已登录且有 child | 上传 11 页。 | 禁止提交并提示分两次上传。 |
| PAGE-UPL-004 | 少于 5 页提示 | 已登录且有 child | 上传 3 页。 | 显示稳定性提示，不直接崩溃。 |
| PAGE-UPL-005 | 上传 PDF | 已登录且有 child | 上传一个多页 PDF。 | 显示拆页后的预览和页数。 |
| PAGE-UPL-006 | 质量标志 | 提供模糊/旋转/过暗样本 | 上传样本。 | 页面显示对应 quality flags。 |
| PAGE-UPL-007 | source type 与 notes | 已上传页 | 设置 source type 并填写 notes。 | 提交后字段保存到 upload。 |
| PAGE-UPL-008 | 删除页/重新选择 | 已有预览 | 删除某页后继续上传。 | 预览和页数实时更新。 |
| PAGE-UPL-009 | 提交按钮启禁 | 无合法页数或缺 child | 观察 Generate Diagnosis 按钮。 | 状态与表单合法性一致。 |
| PAGE-UPL-010 | 移动端上传可用 | 手机尺寸 | 打开上传页。 | 拖拽区、预览、按钮仍可用。 |

## Run Status (`/dashboard/runs/[runId]`)

Primary route: `/dashboard/runs/[runId]`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-DIAG122-GATE-001 | Confidence gate visibility | quality gate 已启用 run/report | 打开 run 或 report 页面。 | 看到 A/B/C/D 或等价质量层级，低置信度时显示 needs_review 或谨慎提示。 |
| PAGE-RUN-001 | 提交后跳转进度页 | 刚提交 upload | 观察跳转。 | 进入对应 run 页面并显示 runId。 |
| PAGE-RUN-002 | 五种状态展示 | 准备 queued/running/done/failed/needs_review 样本 | 分别打开各状态 run。 | 页面展示正确文案和 CTA。 |
| PAGE-RUN-003 | 进度步骤条 | running run | 查看页面。 | 看到步骤条、百分比或阶段状态、预计时间。 |
| PAGE-RUN-004 | 失败重试 | failed run | 点击 Retry。 | 生成新的处理尝试或恢复当前 run。 |
| PAGE-RUN-005 | 超时支持入口 | 模拟超时 run | 查看页面。 | 出现明确说明与 support CTA。 |
| PAGE-RUN-006 | needs_review 提示 | needs_review run | 查看页面。 | 说明报告待审核或临时版状态。 |
| PAGE-RUN-007 | 完成后查看报告 | done run | 点击 View Report。 | 进入报告页。 |
| PAGE-RUN-008 | 轮询/刷新 | running run | 等待或点击 Refresh。 | 状态变化被正确更新。 |

## Report (`/dashboard/reports/[reportId]`)

Primary route: `/dashboard/reports/[reportId]`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-DIAG122-PLAN-001 | Diagnosis plan quality | 存在 1.2.2 diagnosis report | 切换到 Plan。 | 显示 7 天计划、pauseList、parentPrompt、successCheck 和 rule trace。 |
| PAGE-RPT-001 | Diagnosis Tab 渲染 | 存在报告 | 打开报告默认页。 | 显示 Top findings 与摘要。 |
| PAGE-RPT-002 | Pattern vs sporadic | 存在重复与偶发错误样本 | 查看 diagnosis。 | 看到 pattern 与 sporadic 区分。 |
| PAGE-RPT-003 | 推荐与禁做项 | 存在报告 | 查看 diagnosis + plan。 | 看到 focus this week 和暂缓建议。 |
| PAGE-RPT-004 | Evidence Tab 分组 | 存在报告 | 切换到 Evidence。 | 按错误类型分组显示 evidence。 |
| PAGE-RPT-005 | Evidence open page | 存在 evidence anchors | 点击 open。 | 打开对应页并定位 pageNo/problemNo。 |
| PAGE-RPT-006 | Plan Tab 渲染 | 存在报告 | 切换到 Plan。 | 显示 Day1-Day7 卡片。 |
| PAGE-RPT-007 | Plan 完成勾选 | 存在计划 | 点击 Mark done。 | 状态变更并可持久化。 |
| PAGE-RPT-008 | 低置信度报告 | low-confidence report | 打开报告。 | 出现低置信度提示或待确认状态。 |
| PAGE-RPT-009 | PDF 导出 | Should 功能开启 | 点击 Export PDF。 | 生成或下载 PDF。 |
| PAGE-RPT-010 | Evidence 高亮 | Should 功能开启 | 点击 evidence item。 | 显示 bbox/highlight；无 bbox 时使用降级说明。 |

## Billing (`/dashboard/billing`)

Primary route: `/dashboard/billing`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-BIL-001 | one-time 方案 | 已登录 | 打开 billing。 | 看到 one-time plan 与购买 CTA。 |
| PAGE-BIL-002 | monthly 方案 | 已登录 | 打开 billing。 | 看到 monthly plan 与购买 CTA。 |
| PAGE-BIL-003 | 未支付锁定 | 未购买用户 | 访问付费报告。 | 看到 paywall 或受限内容。 |
| PAGE-BIL-004 | 支付成功解锁 | Stripe 测试支付成功 | 完成 checkout 后回流。 | 报告被解锁。 |
| PAGE-BIL-005 | 取消支付回流 | Stripe 取消场景 | 取消 checkout。 | 返回 billing 并提示未完成支付。 |
| PAGE-BIL-006 | 重复 webhook | 重复发送同一 webhook | 检查 entitlement。 | 不会重复入账或重复解锁。 |

## Tutor Workspace (`/dashboard/tutor`)

Primary route: `/dashboard/tutor`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-TUT-001 | Tutor workspace 基础页 | tutor 权限已启用 | 打开 `/dashboard/tutor`。 | 显示 tutor workspace 基础壳和学生/报告入口。 |

## Share (`/share/[token]`)

Primary route: `/share/[token]`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-SHR-001 | 有效 token | 存在有效 share link | 打开 share URL。 | 看到只读报告。 |
| PAGE-SHR-002 | 过期 token | 存在 expired token | 打开 share URL。 | 看到已过期提示。 |
| PAGE-SHR-003 | revoke token | token 已 revoke | 打开 share URL。 | 访问被拒绝。 |
| PAGE-SHR-004 | 隐藏敏感信息 | 有效 share link | 查看页面。 | 不显示家长内部备注或敏感字段。 |
| PAGE-SHR-005 | 只读限制 | 有效 share link | 尝试修改计划或笔记。 | 不存在可写操作。 |

## Admin Review (`/admin/review`, `/admin/review/[runId]`)

Primary route: `/admin/review`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-ADM-001 | 队列页 | admin 身份且存在 needs_review runs | 打开 `/admin/review`。 | 看到队列列表和 run 摘要。 |
| PAGE-ADM-002 | 详情页与抽取草稿 | admin 身份 | 打开某个 run 详情。 | 看到页预览、结构化抽取、报告草稿。 |
| PAGE-ADM-003 | approve | admin 身份 | 点击 Approve。 | run 进入可发布状态，parent 可见报告。 |
| PAGE-ADM-004 | request more photos | admin 身份 | 点击 Request more photos。 | run 状态更新并通知 parent。 |
| PAGE-ADM-005 | manual text adjust | admin 身份 | 编辑展示文案并保存。 | 结构化字段保持不变，展示文本更新。 |
| PAGE-ADM-006 | 越权访问 | 非 admin 身份 | 访问 `/admin/review`。 | 返回 403 或重定向。 |
| RESP-003 | Admin 关键布局 | 桌面浏览器 | 打开详情页。 | 不需要横向滚动即可完成审核。 |

## Report Locale

Primary route: `/dashboard/reports/[reportId]`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-I18N-001 | EN/ES 报告切换 | locale 支持开启 | 以 EN 和 ES 分别打开同一报告。 | 文案和计划输出语言与 locale 一致。 |

## Guided Walkthrough Parent Player (`/dashboard/reports/[reportId]/play`)

Primary route: `/dashboard/reports/[reportId]/play`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-DCK-001 | Parent play route reachability | Logged in and report has a playable deck | Open `/dashboard/reports/[reportId]/play`. | Route loads and surfaces the optional `Guided Walkthrough` shell. |
| PAGE-DCK-002 | Report-page play entry | Logged in and report has deck tier A/B/C | Click the walkthrough entry from `/dashboard/reports/[reportId]`. | User reaches `/play` without replacing the main report experience. |
| PAGE-DCK-003 | Fixed deck page order | Generated deck exists | Walk through all slides in order. | Slide order matches the fixed deck outline contract and uses facts-layer content only. |
| PAGE-DCK-004 | Product-facing copy rulebook | Generated deck exists | Review shell heading, helper copy, and controls. | User-facing naming follows `1.3.3`: `Guided Walkthrough`, `review step`, `voice guidance`, `visual explanation`. |
| PAGE-DCK-005 | Deck tier degrade behavior | Prepare A/B/C/D deck fixtures | Open the parent `/play` route for each fixture. | A/B allow full playback, C degrades to static-only or no autoplay, D hides the play entry. |
| PAGE-DCK-006 | Playback transport controls | Deck ready for playback | Trigger start, pause, resume, stop, next action, next slide, and prev slide. | Player state changes are stable and bounded. |
| PAGE-DCK-007 | Voice default and fallback | Browser with and without SpeechSynthesis support | Enter the player and inspect narration defaults. | Voice guidance is off by default and falls back safely when browser TTS is unavailable. |
| PAGE-DCK-008 | Snapshot restore | Saved playback snapshot exists | Leave the player and reopen the same deck. | Playback resumes from the saved slide/action snapshot. |
| PAGE-DCK-009 | Responsive parent player | Desktop and 390px mobile viewport | Open `/play` in both layouts. | Core playback controls and slide content remain usable without blocking overflow. |

## Guided Walkthrough Share Player (`/share/[token]/play`)

Primary route: `/share/[token]/play`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-DCK-010 | Share play route reachability | Valid share token and shareable deck exist | Open `/share/[token]/play`. | Read-only tutor player loads with owner-scoped share access. |
| PAGE-DCK-011 | Share privacy constraints | Share source contains parent-only note data | Open `/share/[token]/play` and inspect all visible copy. | Parent-only notes and internal owner fields are omitted. |
| PAGE-DCK-012 | Share revoke and expiry | Prepare valid, expired, and revoked tokens | Open `/share/[token]/play` with each token. | Valid tokens render the player; expired or revoked tokens are blocked. |

## Deck Admin Review (`/admin/review/[runId]/deck`)

Primary route: `/admin/review/[runId]/deck`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-DCK-013 | Admin deck review route | Admin user and generated deck exist | Open `/admin/review/[runId]/deck`. | Page shows slides, actions, tier score, and trial playback tools. |
| PAGE-DCK-014 | Regenerate review actions | Admin user reviewing a deck | Use regenerate slide and regenerate actions controls. | Updated draft renders and the deck is re-gated after regeneration. |
| PAGE-DCK-015 | Admin approve and reject | Admin user reviewing a deck | Submit approve and reject actions. | Review state, audit trail, and downstream deck visibility update correctly. |
| PAGE-DCK-016 | Responsive admin surface | Desktop and 390px mobile viewport | Open `/admin/review/[runId]/deck`. | Core review actions and trial playback remain usable on both layouts. |

## Stage Boundary Audits (`1.3.4`)

Primary routes:
- `/`
- `/dashboard/reports/[reportId]`
- `/dashboard/reports/[reportId]/play`
- `/share/[token]`
- `/dashboard/children/[childId]`

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PAGE-BND134-001 | Parent-first report positioning audit | Landing, sample-report, and report routes available | Review landing and report routes against `1.3.4`. | Diagnosis/evidence/7-day plan stay primary and parent-first copy remains dominant. |
| PAGE-BND134-002 | Explanation and plan remain inside report value layer | Accepted diagnosis report exists | Review report tabs and explanation surfaces. | ExplanationCard and SevenDayPlan remain structured report-layer concepts rather than classroom-only UI. |
| PAGE-BND134-003 | Share privacy and tutor handoff audit | Valid share token exists | Review `/share/[token]` and share-related report copy. | Tutor summary is visible, parent-only notes stay hidden, and privacy boundaries are explicit. |
| PAGE-BND134-004 | Guided Walkthrough optional-entry audit | Report has deck entry | Review report entry and `/play` route. | `Guided Walkthrough` is present only as a secondary, optional enhancement path. |
| PAGE-BND134-005 | Playback/export light-layer audit | Deck/player lane exists | Review player and export entry points. | Playback, voice, share-play, and export remain enhancements and do not replace the report shell. |
| PAGE-BND134-006 | Weekly compare lite-hook audit | Child history with multiple reports exists | Review child history and compare routes. | Compare/timeline support remains lightweight and child-scoped rather than a heavy analytics dashboard. |
| PAGE-BND134-007 | Postpone non-scope audit | Stage 1 routes loaded | Inspect core routes and menus for non-scope features. | No PPTX, strong whiteboard, realtime Q&A, student app, or generalized growth frontend entry appears in Stage 1 routes. |
