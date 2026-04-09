# FamilyEducation 全量开发总结

## 1. 产品定位与方案

### 1.1 FamilyEducation 是什么

FamilyEducation 是一个面向家庭学习场景的 `parent-first` Web 产品。它的核心目标是把孩子最近一批数学作业、测验、批改页，转换成家长可读、可执行、可分享的诊断结果，而不是只做 OCR、只给分数，或者只做学生端练习工具。

当前产品聚焦的是一条清晰工作流：

`上传作业/测验页 -> 生成诊断 run -> 产出 evidence-backed report -> 家长阅读/导出 PDF -> 分享给 tutor -> 周复盘`

### 1.2 解决什么问题

它主要解决以下问题：

- 家长拿到一叠作业页时，难以快速判断“错在哪里、是偶发还是模式性问题”
- 家长需要一个能和 tutor 对齐的证据化 summary，而不是口头描述
- 家长需要可操作的 weekly review 节奏，而不是一次性看完报告就结束
- 家长需要控制访问边界、分享边界和计费解锁边界

### 1.3 目标用户

当前系统的真实目标用户分为 4 类：

- `Parent / household owner`
  - 主用户
  - 注册、登录、添加 child profile、上传作业、查看报告、付款、导出 PDF、分享 tutor link
- `Tutor`
  - 不是独立登录体系
  - 通过 owner-scoped 的 `share link` 或 `tutor workspace` 获取信息
- `Admin reviewer`
  - 处理 `needs_review` runs
  - 审核 extraction / report 是否可以发布
- `Developer / operator`
  - 维护 demo mode、runtime evidence、delivery scripts、traceability、外部集成

### 1.4 当前为什么采用 demo/runtime-first

当前仓库采用的是 `demo/runtime-first` 交付策略，而不是直接绑定真实生产依赖，原因是：

- 先把产品工作流、页面、API、traceability、acceptance、handoff 做完整
- 保证在没有真实 staging / Vercel / live billing / live OAuth 的前提下，也能本地重复验证
- 用本地 deterministic runtime 维持 Sprint 1-8 的完整验收闭环

这意味着当前 repo 的“本地完成度”很高，但“真实外部集成完成度”是分层描述的，不能混淆。

### 1.5 真实生产化还缺什么

当前仍未纳入本地完成定义、但未来生产化必须补齐的外部条件包括：

- 真实 `Vercel` 项目绑定、环境变量管理、preview / production deployment
- 真实 `Creem` product / webhook / portal 配置
- 真实 `Google OAuth` client 配置
- 真实文件存储、生产 smoke、生产观测与告警
- 真实 AI / OCR provider 密钥与 SLA 级异常处理

## 2. 当前实现总览

### 2.1 当前交付结论

- 本地 final verdict：`COMPLETE`
- 验证来源：
  - `tasks/runtime/final_program_acceptance/final_program_acceptance.json`
  - `tasks/runtime/browser_evidence/final_browser_evidence_manifest.json`
  - `tasks/runtime/final_acceptance/final_api_smoke_manifest.json`

### 2.2 当前范围内已经实现的主能力

- 完整 landing + pricing + sign in + sign up 公共入口
- account/auth 基础体系
- child profile 管理
- 上传作业 / PDF split / page preview / run lifecycle
- diagnosis / evidence / 7-day plan / parent note
- report paywall / unlock / billing / demo checkout
- tutor share / tutor workspace shell
- admin review queue + review detail
- EN/ES report-facing output
- PDF export
- evidence highlight overlay
- reminder artifacts
- retention cleanup / delete entry points
- local observability / cost artifacts
- final acceptance / evidence pack / handoff docs

### 2.3 当前页面与数据库规模

- 源码 `page.tsx` 页面数量：`21`
- 最终 browser evidence 覆盖数量：`21`
- `app/api/**/route.ts` API routes 数量：`27`
- `lib/db/schema.ts` 当前数据表数量：`17`

这几个数字当前是对齐的，适合作为下一阶段开发的基线。

## 3. 页面清单与页面职责

下面的页面清单以当前 `app/**/page.tsx` 为准，且都已进入最终 browser evidence 覆盖。

### 3.1 公共页面

#### `/`

- 面向谁：访客、潜在付费用户
- 核心功能：
  - landing page
  - 解释产品定位、核心能力、使用流程、FAQ、CTA
  - 引导到 `/sign-up`、`/pricing`、页内 section anchors
- 依赖：
  - 主要是前端静态内容
  - 不依赖登录
- 完成度/限制：
  - 已重做为完整 landing
  - 主要承担产品解释与转化，不承担实际诊断

#### `/pricing`

- 面向谁：访客、准备付费的家庭
- 核心功能：
  - 展示 3 个计划
  - `One-Time Diagnosis`
  - `Parent Weekly`
  - `Parent Annual`
- 依赖：
  - `lib/payments/catalog.ts`
- 完成度/限制：
  - 已切到 `Creem` 方案
  - 真实 checkout 仍取决于外部 Creem 配置

#### `/sign-in`

- 面向谁：已有账号用户
- 核心功能：
  - 邮箱密码登录
  - 配置好时显示 Google 登录入口
  - protected route redirect-back
- 依赖：
  - session auth
  - 可选 Google OAuth
- 完成度/限制：
  - Google 未配置时不再显示入口
  - 当前默认以普通邮箱登录可用为基线

#### `/sign-up`

- 面向谁：新用户
- 核心功能：
  - 创建普通账号
  - 不要求注册时绑定 child
  - 18+ 确认和条款确认
- 依赖：
  - auth actions
  - user/team bootstrap
- 完成度/限制：
  - 已移除注册页上的 `Timezone` 和 `Preferred language`
  - 默认英语，child 信息后置

### 3.2 家庭主工作台页面

#### `/dashboard`

- 面向谁：已登录家庭 owner
- 核心功能：
  - 总览页
  - child count、recent runs、主要 CTA
- 依赖：
  - 当前用户
  - children list
  - recent runs
- 完成度/限制：
  - 已能承接日常入口
  - overview metrics 仍偏轻量

#### `/dashboard/account`

- 面向谁：已登录用户
- 核心功能：
  - 账号设置入口页
- 依赖：
  - account shell
- 完成度/限制：
  - 属于设置导航的一部分

#### `/dashboard/activity`

- 面向谁：已登录家庭 owner
- 核心功能：
  - household activity timeline
- 依赖：
  - `activity_logs`
- 完成度/限制：
  - 能展示活动记录
  - 更深的筛选/导出能力尚未扩展

#### `/dashboard/billing`

- 面向谁：已登录家庭 owner
- 核心功能：
  - 查看 unlock status
  - 查看 active plan
  - 触发 checkout / customer portal
- 依赖：
  - billing snapshot
  - subscriptions / billing_events
  - Creem provider
- 完成度/限制：
  - 当前以 Creem 为准
  - portal 是否可用取决于 live customer record

#### `/dashboard/billing/demo-checkout`

- 面向谁：本地验收 / demo mode
- 核心功能：
  - 演示 checkout review / simulated return
- 依赖：
  - demo billing flow
- 完成度/限制：
  - 只用于本地验收与 demo，不是正式支付页

#### `/dashboard/children`

- 面向谁：已登录家庭 owner
- 核心功能：
  - child profile 列表
  - 进入 child detail / upload
- 依赖：
  - `children`
- 完成度/限制：
  - 当前 child 是家庭工作流的主索引

#### `/dashboard/children/new`

- 面向谁：已登录家庭 owner
- 核心功能：
  - 创建 child profile
- 依赖：
  - child create actions / API
- 完成度/限制：
  - 当前 child 信息保持最小化，适合快速开始

#### `/dashboard/children/[childId]`

- 面向谁：已登录家庭 owner
- 核心功能：
  - child detail
  - 历史报告 / parent note / compare-to-last summary
- 依赖：
  - child
  - reports / history
- 完成度/限制：
  - 已形成 child-centric history view

#### `/dashboard/children/[childId]/upload`

- 面向谁：已登录家庭 owner
- 核心功能：
  - 上传 homework / quiz / correction pages
  - 触发 run
- 依赖：
  - uploads / upload_files / pages / analysis_runs
- 完成度/限制：
  - 支持 PDF fixture 与页面级 draft
  - 真实存储/外部 AI 仍可继续增强

#### `/dashboard/general`

- 面向谁：已登录用户
- 核心功能：
  - profile 基本资料
  - account-level settings
- 依赖：
  - `users`
- 完成度/限制：
  - 当前仍保留更细粒度 account fields
  - 后续可进一步做简化

#### `/dashboard/security`

- 面向谁：已登录用户
- 核心功能：
  - password update
  - delete account
- 依赖：
  - auth/session
- 完成度/限制：
  - 基础安全设置已到位
  - 更高级别 device/session management 尚未做

#### `/dashboard/reports/[reportId]`

- 面向谁：已登录家庭 owner
- 核心功能：
  - 查看 report
  - `Diagnosis / Evidence / 7-Day Plan`
  - EN/ES toggle
  - export PDF
  - evidence overlay
  - share / tutor handoff 相关操作
- 依赖：
  - reports
  - problem_items / item_errors
  - billing lock status
- 完成度/限制：
  - 是当前产品价值最核心页面之一
  - 真实 AI 输出质量仍取决于上游 provider

#### `/dashboard/runs/[runId]`

- 面向谁：已登录家庭 owner
- 核心功能：
  - 查看 run status
  - 排队、处理中、完成、失败、needs_review
- 依赖：
  - analysis_runs
- 完成度/限制：
  - 已具备 run lifecycle 展示
  - 更深入的 operator diagnostics 仍可扩展

#### `/dashboard/tutor`

- 面向谁：已登录家庭 owner
- 核心功能：
  - tutor workspace foundation
  - 汇总可 handoff 的 report 摘要、focus areas、share 状态
- 依赖：
  - owner-scoped tutor data
- 完成度/限制：
  - 当前明确不是 tutor 独立账号体系
  - 是家长拥有的 tutor handoff shell

### 3.3 管理与分享页面

#### `/share/[token]`

- 面向谁：拿到 tutor share token 的外部查看者
- 核心功能：
  - 只读查看 tutor share
- 依赖：
  - `share_links`
  - report unlock status
- 完成度/限制：
  - 已支持 active / expired / revoked 边界
  - 仍然受 owner 发放与 paywall 解锁约束

#### `/admin/review`

- 面向谁：admin reviewer
- 核心功能：
  - review queue
  - 查看到 `needs_review` runs
- 依赖：
  - analysis_runs
  - review APIs
- 完成度/限制：
  - Sprint 6 验收已闭环

#### `/admin/review/[runId]`

- 面向谁：admin reviewer
- 核心功能：
  - 审核具体 run 的 extraction / draft report
  - approve / request more photos
- 依赖：
  - run detail
  - admin review APIs
- 完成度/限制：
  - 当前是本地 review gate 的主工作页

## 4. 核心能力与业务流程

### 4.1 Account / Auth

- 邮箱密码注册与登录已实现
- 注册时会自动创建 household team
- Google OAuth 已接入代码层，但只有配置后才显示入口
- protected routes 支持 redirect-back
- 安全设置支持 password update 和 delete account

### 4.2 Child Management

- 支持 child profile create / edit / archive/delete path
- child 是上传、报告、历史、weekly review 的中心实体
- 当前 child profile 保持轻量，减少家庭开始使用的门槛

### 4.3 Upload + Processing

- 支持上传 homework / quiz / correction 类材料
- 支持 PDF splitting、page draft、quality flags、notes
- run lifecycle 包含：
  - `queued`
  - `running`
  - `done`
  - `failed`
  - `needs_review`
  - retry / timeout-support paths

### 4.4 Diagnosis Report + Evidence Overlay

- report 页面包含 `Diagnosis`、`Evidence`、`7-Day Plan`
- extraction 结果已持久化到结构化层，而不是只存在页面渲染临时态
- 有 `highlightBox` 时可以渲染 evidence overlay
- 没有 `highlightBox` 时会降级说明，但仍支持打开源页定位

### 4.5 EN/ES Output + PDF Export

- report-facing copy 支持同页显式 EN/ES toggle
- PDF export 会跟随当前语言输出
- API 负向边界已补：
  - 未登录 `401`
  - 报告不存在 `404`
  - 报告未解锁 `402`

### 4.6 Tutor Handoff + Share Link

- tutor workspace 当前是 `parent-owned shell`
- report 可以生成只读 share link
- share link 支持 active / expired / revoked
- tutor 不拥有独立后台账号体系

### 4.7 Admin Review

- 低置信度或需要人工复核的 run 会进入 `needs_review`
- admin reviewer 可以在 queue 中处理
- review detail 支持 extraction / draft report 检查和审核动作

### 4.8 Billing / Paywall

- 当前支付方案已经切到 `Creem`
- 当前计划：
  - `One-Time Diagnosis` `19 USD`
  - `Parent Weekly` `39 USD / month`
  - `Parent Annual` `299 USD / year`
- 报告未解锁前会走 paywall
- demo checkout 与 webhook path 已有本地验收支撑

### 4.9 Reminders / Observability / Retention

- reminder 当前采用 safe fallback 方案，不接真实邮件 provider
- 本地 observability 会记录：
  - run lifecycle events
  - error events
  - per-run cost artifacts
- retention / delete 已覆盖 child / upload / report 相关删除入口
- 删除后旧访问会稳定返回 `404` 或相应拒绝结果

## 5. 数据库与数据关系

当前 `lib/db/schema.ts` 中定义了 `17` 张表。

### 5.1 身份与团队

#### `users`

- 用户主表
- 保存 name、email、passwordHash、googleSub、role、country、timezone、locale 等

#### `teams`

- 家庭 / household 容器
- 保存订阅层面的 planName、subscriptionStatus 等聚合信息
- 仍保留历史 `stripe*` 字段
  - 这些属于遗留兼容字段
  - 不代表当前支付方案仍以 Stripe 为主

#### `team_members`

- 用户与 household 的成员关系
- 当前 owner 是主路径

#### `invitations`

- 团队邀请关系
- 支持 invite flow 基础数据

#### `activity_logs`

- 活动日志
- 记录 sign in、sign up、create child、billing 等动作

### 5.2 学生与上传

#### `children`

- 家庭下的 child profile

#### `uploads`

- 一次上传会话
- 关联 child、sourceType、notes、status、submittedAt

#### `upload_files`

- 上传文件层
- 保存文件名、mime、storagePath、pageCount、previewKind

#### `pages`

- 页面层
- 保存 pageNumber、storagePath、previewLabel、qualityScore、qualityFlags

### 5.3 诊断与报告

#### `analysis_runs`

- 一次诊断 run
- 保存状态、阶段、进度、overallConfidence、needsReviewReason、errorMessage

#### `reports`

- 报告主表
- 保存：
  - `parentReportJson`
  - `studentReportJson`
  - `tutorReportJson`

#### `problem_items`

- 页面级问题项
- 关联 run、page、problemNo、teacherMark、itemConfidence、evidenceAnchor

#### `error_labels`

- 错误 taxonomy label

#### `item_errors`

- item 与 error label 的关联层
- 保存 severity、rationale、confidence

### 5.4 分享与计费

#### `share_links`

- report 的 tutor share token
- 包含 token、role、expiresAt、revokedAt

#### `subscriptions`

- 当前家庭或用户的订阅/解锁记录
- 保存 provider、planType、priceId、status、reportCredits、unlockedReportIds
- 当前 provider 实际路径应理解为 `Creem`

#### `billing_events`

- 外部 billing provider 回调事件归档

### 5.5 数据关系主线

当前数据主线可概括为：

`users -> teams -> children -> uploads -> upload_files/pages -> analysis_runs -> reports -> share_links`

而 billing 是与 team/user 关联的解锁层：

`teams/users -> subscriptions -> unlocked reports / credits -> report access`

## 6. API / Auth / Billing / Runtime / Demo Mode

### 6.1 主要 API routes

当前 `app/api/**/route.ts` 共 `27` 条 route 文件，核心分组如下。

#### Admin Review

- `/api/admin/review`
- `/api/admin/review/[runId]`
- `/api/admin/review/[runId]/approve`
- `/api/admin/review/[runId]/request-more-photos`

#### Auth

- `/api/auth/google/start`
- `/api/auth/google/callback`

#### Billing

- `/api/billing/checkout-session`
- `/api/creem/checkout`
- `/api/creem/webhook`

#### Core Family Data

- `/api/children`
- `/api/children/[childId]`
- `/api/uploads`
- `/api/uploads/[uploadId]`
- `/api/uploads/[uploadId]/files`
- `/api/uploads/[uploadId]/submit`
- `/api/runs/[runId]`
- `/api/runs/[runId]/process`
- `/api/runs/[runId]/retry`
- `/api/reports/[reportId]`
- `/api/reports/[reportId]/export`
- `/api/reports/[reportId]/share`
- `/api/pages/[pageId]/artifact`
- `/api/share/[token]`
- `/api/tutor`
- `/api/team`
- `/api/user`

#### Notifications

- `/api/notifications/schedule`

### 6.2 Google OAuth 当前状态

- 代码路径已接入
- 当前只有在配置 `GOOGLE_CLIENT_ID` 和 `GOOGLE_CLIENT_SECRET` 后才显示入口
- 未配置时：
  - 登录页不会显示 Google 按钮
  - 不再向用户暴露技术性配置错误文案

### 6.3 Creem 支付当前状态

- 当前 billing provider 以 `Creem` 为准
- 已有：
  - checkout route
  - webhook route
  - public pricing
  - dashboard billing
  - plan catalog
- 历史 `stripe` 命名残留在部分 schema 字段中，应视为遗留兼容，不代表当前主要方案

### 6.4 Runtime 与 Demo Mode

- `FAMILY_EDU_DEMO_MODE=1` 时，可以走本地 deterministic runtime
- 当前 demo mode 的价值：
  - 不依赖真实 Postgres / remote services 也能完成主要验收
  - 可生成 acceptance、browser evidence、traceability artifacts
- 边界：
  - demo mode 不是生产模式
  - 不能把 demo lane 的完成度误写成 live production 完成

## 7. 已实现 vs 未实现 vs 明确延期

### 7.1 已实现

- landing / pricing / auth public shell
- email/password auth
- 条款确认与 18+ gating
- child CRUD 主流程
- upload -> run -> report 主流程
- structured extraction persistence
- diagnosis / evidence / 7-day plan
- parent note / history compare
- paywall / unlock
- Creem billing integration
- share link lifecycle
- tutor workspace shell
- EN/ES report output
- PDF export
- evidence overlay
- admin review queue / detail
- reminders fallback artifacts
- retention cleanup / delete entry points
- local observability / cost artifacts
- final traceability / acceptance / handoff pack

### 7.2 本地 demo lane 已做，但真实外部环境未接

- 真实 `Creem` live product / live portal / live webhook 全链路
- 真实 `Google OAuth` client 配置
- 真实 `Vercel` project / env / deployment
- 真实 production file storage / blob strategy
- 真实 AI / OCR provider 调用与生产级限流、监控、失败恢复
- 真实 staging / production smoke

### 7.3 做了基础壳，但后续仍需扩展

- tutor workspace
  - 当前是家长拥有的 handoff shell
  - 不是完整 tutor product
- reminders
  - 当前是 runtime artifact / schedule attempt
  - 不是正式邮件系统
- observability
  - 当前是本地 runtime 可见与 artifact 可见
  - 不是完整生产 observability platform
- account settings
  - 已有基本结构
  - 仍可继续做更细的 profile simplification
- billing data model
  - 当前可运行
  - schema 里仍有历史 Stripe 残留字段，后续可专门整理

### 7.4 仓库里完全未做

- tutor 独立账号体系
- 家长/学生多组织或 multi-tenant 企业级模型
- 原生 mobile app
- 生产级营销、增长、analytics 漏斗系统
- 系统化 notification center
- 复杂角色权限矩阵

## 8. 测试、验收与证据位置

### 8.1 最终验收结论

- 最终 verdict：`COMPLETE`
- 文件：
  - `tasks/runtime/final_program_acceptance/final_program_acceptance.json`

### 8.2 关键验收资产

- PRD traceability matrix
  - `docs/requirements/prd_traceability_matrix.md`
- final API/data/AI/ops coverage
  - `tasks/runtime/final_acceptance/final_api_smoke_manifest.json`
- final browser evidence
  - `tasks/runtime/browser_evidence/final_browser_evidence_manifest.json`
- final evidence pack index
  - `tasks/runtime/final_program_acceptance/final_evidence_pack_index.md`

### 8.3 Sprint 级验收资产

- `tasks/runtime/qa_results/sprint_1_delivery_results.json` 到 `sprint_8_delivery_results.json`
- `tasks/runtime/sprint_acceptance/sprint_0_acceptance_report.md` 到 `sprint_8_acceptance_report.md`
- `tasks/runtime/traceability_audits/sprint_0_traceability_audit.md` 到 `sprint_8_traceability_audit.md`
- `tasks/runtime/story_evidence/FE-0xx_*.md`

### 8.4 当前本地常用验证命令

```powershell
pnpm build
node scripts\run_sprint1_browser_smoke.mjs
node scripts\run_sprint8_browser_smoke.mjs
python scripts\run_sprint8_delivery.py
python scripts\run_final_program_acceptance.py
```

## 9. 运行方式、环境变量与外部依赖

### 9.1 本地运行

```powershell
pnpm install
pnpm build
pnpm start
```

常用地址：

- `http://127.0.0.1:3000/`
- `http://127.0.0.1:3000/pricing`
- `http://127.0.0.1:3000/sign-in`
- `http://127.0.0.1:3000/dashboard`

### 9.2 核心环境变量

#### 基础

- `POSTGRES_URL`
- `AUTH_SECRET`
- `BASE_URL`

#### Billing / Creem

- `CREEM_API_KEY`
- `CREEM_WEBHOOK_SECRET`
- `CREEM_TEST_MODE`
- `CREEM_PRODUCT_ONE_TIME_ID`
- `CREEM_PRODUCT_MONTHLY_ID`
- `CREEM_PRODUCT_ANNUAL_ID`

#### Auth

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

#### AI / OCR / storage

- `OPENAI_API_KEY`
- `OPENAI_MODEL_VISION`
- `MATHPIX_APP_ID`
- `MATHPIX_APP_KEY`
- `GOOGLE_APPLICATION_CREDENTIALS`
- `FILE_STORAGE_BACKEND`
- `BLOB_READ_WRITE_TOKEN`

#### Product defaults

- `SUPPORT_EMAIL`
- `DATA_RETENTION_DAYS`
- `DEFAULT_LOCALE`
- `DEFAULT_COUNTRY`
- `DEFAULT_TIMEZONE`
- `FAMILY_EDU_DEMO_MODE`

### 9.3 外部依赖说明

- `Next.js App Router`
- `Drizzle ORM`
- `Postgres`
- `Creem`
- `Google OAuth`
- 可选 `OpenAI / Mathpix / Google credentials`

## 10. 下一步开发建议

### 10.1 第一优先级：把外部真实依赖接通

建议优先顺序：

1. 配好真实 `Creem` products、webhook、portal
2. 配好真实 `Google OAuth`
3. 绑定真实 `Vercel` 项目与 env
4. 建立 staging / production smoke

原因是：当前本地 lane 已经足够完整，真正限制下一阶段验证的是外部真实依赖，而不是页面壳子不够多。

### 10.2 第二优先级：清理遗留兼容层

- 把 billing data model 中的历史 `stripe*` 字段梳理清楚
- 统一文案和实体命名，继续减少多余 `parent` 历史遗留表述
- 收紧 account settings，只保留当前产品确实需要的字段

### 10.3 第三优先级：扩展产品能力

- 把 tutor workspace 从 shell 扩成真正高频可用的 handoff workspace
- 把 reminders 从 artifact/fallback 扩成真实邮件发送和发送日志
- 增强 report 解释性、趋势性、跨次对比能力
- 增强 admin review 的审核效率和批量处理能力

### 10.4 第四优先级：生产化工程完善

- 生产观测、日志、异常告警
- 文件存储和大文件处理策略
- 权限边界和安全审计
- 真实成本追踪与 provider fallback

## 11. 本文档的使用方式

如果下一步是继续开发，建议按这个顺序阅读：

1. 先看本文档，理解全局
2. 再看 `PROJECT_STATE.md`
3. 再看 `docs/handoff/current_handoff.md`
4. 然后看：
   - `lib/db/schema.ts`
   - `app/**/page.tsx`
   - `app/api/**/route.ts`
5. 最后跑：
   - `pnpm build`
   - 对应 smoke scripts

这样可以最快把“产品全貌、工程全貌、验收边界、下一步优先级”连起来。
