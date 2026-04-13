# API, Data, AI, And Non-Functional Test Matrix

## API Contract Tests

| Test ID | Scope | Scenario | Expected Result |
| --- | --- | --- | --- |
| API-DIAG122-INTAKE-001 | `POST /api/uploads/[uploadId]/intake` | 保存诊断 intake 字段 | 返回成功并把 intake 字段写入 upload / run payload |
| API-DIAG122-ITEM-001 | `POST /api/runs/[runId]/extract-items` | 生成结构化 problem items | 返回 question summary、student response、topic hint、anchor、teacher signal 等字段 |
| API-DIAG122-TAX-001 | Diagnosis taxonomy contract | 运行 taxonomy / classify 流程 | 只输出允许的 taxonomy code 与 primary/secondary role |
| API-DIAG122-GATE-001 | Confidence gate contract | 低置信度诊断流转 | 返回 needs_review、cautious messaging 或阻止完整发布 |
| API-AUTH-001 | `POST /api/auth/signup` | 不勾 18+ 提交 | 返回 4xx，错误明确指向 `is18PlusConfirmed` |
| API-AUTH-002 | `POST /api/auth/signup` | 不勾 TOS/Privacy 提交 | 返回 4xx，错误明确 |
| API-AUTH-003 | `POST /api/auth/signup` | 合法 parent 注册 | 创建用户、写入 country/timezone/locale、建立 session |
| API-AUTH-004 | `POST /api/auth/login` | 正确/错误密码 | 正确时建立 session，错误时 4xx |
| API-AUTH-005 | `GET /api/auth/me` | 已登录 | 返回 parent 用户资料 |
| API-AUTH-006 | Protected API | 未登录访问 `/api/children` 等 | 返回 401/403 |
| API-CH-001 | `POST /api/children` | 创建孩子 | 返回 child id，字段完整 |
| API-CH-002 | `PATCH /api/children/:id` | 编辑孩子 | 只更新当前用户所属 child |
| API-CH-003 | `GET /api/children` | 多孩子列表 | 返回当前用户的全部孩子，不泄露他人数据 |
| API-UP-001 | `POST /api/uploads` | 创建 upload | 生成 upload 记录并绑定 child |
| API-UP-002 | `POST /api/uploads/:uploadId/files` | 上传 PDF | 生成 upload_file 和 pages |
| API-UP-003 | Upload preprocess | 质量检查 | `quality_flags` 正确写入 |
| API-UP-004 | `POST /api/uploads/:uploadId/submit` | 合法提交 | 创建 run，返回 runId 与 queued |
| API-RUN-001 | `GET /api/runs/:runId` | 查询 run | 返回状态、进度、错误信息 |
| API-RUN-002 | Run state machine | 状态流转 | 仅允许合法流转 |
| API-RUN-003 | Retry | failed 重试 | 创建新处理尝试或重置处理状态 |
| API-AI-001 | Extraction contract | 抽取结果 JSON | 满足 canonical schema |
| API-AI-002 | Label contract | taxonomy label | 只允许固定 code set |
| API-RPT-001 | `GET /api/reports/:reportId` | 拉取三版本报告 | 权限正确，结构完整 |
| API-SHR-001 | `POST /api/reports/:id/share` | 生成 share link | 返回 token/URL，默认只读 |
| API-SHR-002 | `GET /api/share/:token` | 有效/过期/revoked token | 分别返回内容、过期、无效 |
| API-BIL-001 | Checkout one-time | 创建单次支付会话 | 返回 checkout session/url |
| API-BIL-002 | Checkout monthly | 创建订阅支付会话 | 返回 checkout session/url |
| API-BIL-003 | Entitlement gate | 未支付访问完整报告 | 返回锁定态 |
| API-BIL-004 | Webhook idempotency | 重放相同 webhook | 不重复解锁、不重复入账 |
| API-ADM-001 | `GET /api/admin/review` | 拉取 needs_review 列表 | 仅 admin 可见 |
| API-ADM-002 | Admin actions | approve/request-more-photos/manual edit | 状态、审计记录、可见性变化正确 |
| API-HIS-001 | Weekly note save | 保存 parent note | note 与 child/report 正确绑定 |
| API-PDF-001 | PDF export | 导出报告 PDF | 成功生成 artifact 或下载流 |
| API-TUT-001 | Tutor workspace | tutor 视角列表/详情 | 仅 tutor 可见允许数据 |
| API-NTF-001 | Email reminders | 报告完成/复盘提醒 | 任务成功排队或发送 |
| API-I18N-001 | Locale report | EN/ES 输出 | 报告语言与 locale 一致 |
| API-DCK-001 | `POST /api/reports/[reportId]/generate-deck` | Create deck record from report facts | Returns deck id, tier pending status, and report linkage fields |
| API-DCK-002 | `GET /api/reports/[reportId]/deck` | Read deck summary for a report | Returns the latest deck shell, linkage status, and current quality tier |
| API-DCK-003 | `GET /api/decks/[deckId]/playback` | Read normalized playback payload | Returns slides, actions, timings, and degrade-safe playback config |
| API-DCK-004 | `POST /api/decks/[deckId]/regenerate-slide`, `POST /api/decks/[deckId]/regenerate-actions` | Regenerate draft content | Returns updated slide/action draft and reruns deck gate |
| API-DCK-005 | `POST /api/decks/[deckId]/snapshot` | Save playback snapshot | Persists current slide/action position and returns latest snapshot metadata |
| API-DCK-006 | `GET /api/decks/[deckId]/snapshot` | Read playback snapshot | Returns the latest restorable playback snapshot for the owner |
| API-DCK-007 | `GET /api/share/[token]/playback` | Tutor playback payload | Returns sanitized read-only playback payload or blocks invalid token access |
| API-DCK-008 | `POST /api/decks/[deckId]/export-h5` | Create H5 export | Returns export job or artifact metadata tied to the deck |
| API-DCK-009 | `POST /api/decks/[deckId]/export-pdf` | Create PDF export | Returns export job or artifact metadata tied to the deck |
| API-DCK-010 | Deck telemetry contract | Generation/playback/export lifecycle event emission | Deck metrics are queryable from stored telemetry or artifact manifests |
| API-DCK-011 | Export artifact readback | Read H5/PDF export state | Artifact status, location, and lifecycle timestamps remain consistent |
| API-BND134-001 | Stage-boundary facts contract | Audit `ProblemItem`, `EvidenceAnchor`, `ItemErrorLabel`, and `DiagnosisOutline` boundaries | Structured facts stay first-class and are not collapsed into a report blob |
| API-BND134-002 | Report-layer boundary contract | Audit report sections, explanation-card reuse, and seven-day plan structure | Diagnosis/evidence/plan remain primary and explanation/plan contracts stay structured |
| API-BND134-003 | Share/privacy boundary contract | Audit share token, tutor summary, and privacy-boundary behavior | Tutor handoff remains read-only, revocable, and sanitized |
| API-BND134-004 | Provider abstraction contract | Audit storage/parse/LLM abstraction and dependent job consumers | Provider abstractions remain additive and reusable rather than route-local one-offs |
| API-BND134-005 | Run-state and quality-gate contract | Audit queue/running/needs_review/done/failed/retry/degrade rules | Quality gate and run-state behavior remain explicit and reusable |
| API-BND134-006 | Playback-light contract | Audit playback/voice/share-play dependencies against `DECK13-*` | Playback and narration stay optional, secondary, and delegated to the v4 lane |
| API-BND134-007 | Export-light contract | Audit H5/PDF/share-light enhancement rules | Export remains an enhancement artifact and does not replace the main report |
| API-BND134-008 | Weekly/timeline-lite contract | Audit compare/history/timeline hooks | Compare/timeline remain lightweight hooks backed by existing child history surfaces |
| API-BND134-009 | Postpone guardrail audit | Audit authoritative Stage 1 contracts for non-scope leakage | No Stage 1 API/test contract introduces PPTX, strong whiteboard, realtime Q&A, student app, or generalized growth frontend scope |
| API-BILL14-001 | Billing provider interface | `lib/payments/providers/base.ts` or equivalent provider interface | Checkout, portal, redirect, and webhook contracts are provider-neutral |
| API-BILL14-002 | Billing service selection | `lib/payments/service.ts` and feature-flag selection | Service chooses Freemius by default, preserves Creem fallback, and exposes provider-neutral results |
| API-BILL14-003 | Billing data compatibility | Billing table migrations and legacy readers | New billing tables coexist with existing subscription and billing-event reads |
| API-BILL14-004 | Entitlement projection | Provider purchase/subscription -> local entitlement mapping | One-time, monthly, annual, cancel, expire, and upgrade transitions resolve into local snapshots |
| API-BILL14-005 | Non-regression billing snapshot | Existing paywall and unlock consumers | Report unlock and billing snapshot consumers continue to read valid state through the new entitlement layer |
| API-BILL14-006 | `POST /api/checkout` and checkout facade | Primary checkout flow and compatibility entry point | Public checkout resolves through the new billing service and returns provider-neutral metadata |
| API-BILL14-007 | `POST /api/portal` and billing portal CTA | Portal route and billing-center integration | Portal opens when configured and returns a controlled unavailable state when not configured |
| API-BILL14-008 | `POST /webhook` | Primary billing webhook receiver | Webhook events are stored, signature-checked, and applied idempotently |
| API-BILL14-009 | Creem compatibility routes | Hidden `/api/creem/*` fallback routes | Compatibility routes remain available for rollback without defining the public primary flow |

## Data Integrity Tests

| Test ID | Data Surface | Scenario | Expected Result |
| --- | --- | --- | --- |
| DATA-DIAG122-ITEM-001 | `problem_items` | 结构化问题项落库 | question summary、student response、topic hint、anchor、teacher signal 等字段完整 |
| DATA-DIAG122-TAX-001 | `item_errors` | taxonomy 与 role 持久化 | error label、primary/secondary role、severity、confidence、rationale 一致 |
| DATA-DIAG122-DX-001 | `reports` diagnosis payload | 聚合诊断结果落库 | primary/secondary diagnosis、pattern/sporadic、do-not-overreact、overall confidence 全部存在 |
| DATA-001 | `users` | 注册写入 locale/country/timezone | 字段非空，值与提交一致 |
| DATA-002 | `children` ownership | 用户 A/B 交叉访问 | 不能跨用户读取或写入 |
| DATA-003 | Child PII | 创建孩子 | 不需要真实姓名/学校字段 |
| DATA-UP-001 | `uploads` | 创建 upload | `child_id`、`user_id`、`source_type` 正确 |
| DATA-UP-002 | `pages` | PDF 拆页 | `page_no` 连续，页数匹配 |
| DATA-RUN-001 | `analysis_runs` | 状态切换 | 只从合法前置状态进入下一状态 |
| DATA-AI-001 | `problem_items` | evidence anchors | 每条 item 都有 anchor |
| DATA-RPT-001 | `reports` | 三版本报告 | 都引用同一 facts layer 结果 |
| DATA-SHR-001 | `share_links` | revoke/expire | token 失效后不可再访问 |
| DATA-BIL-001 | `subscriptions` | 支付成功 | entitlement 与 plan 对齐 |
| DATA-BIL-002 | webhook replay | 同一事件两次投递 | 账务记录不重复 |
| DATA-HIS-001 | History compare | 第二份报告写入 | compare 只比较同一 child 的最近报告 |
| DATA-DEL-001 | Delete flows | 删除 child/upload/report | 相关数据不可再访问 |
| DATA-DCK-001 | `diagnosis_decks` | Persist deck shell | Deck record stores run/report linkage, version, status, and tier fields |
| DATA-DCK-002 | `diagnosis_slides` | Persist ordered slides | Slides are stored in deterministic order with stable slide type/schema fields |
| DATA-DCK-003 | `diagnosis_slide_actions` | Persist validated actions | Actions store whitelist-safe action type, anchor/reference payload, and timing info |
| DATA-DCK-004 | `deck_exports` | Persist export lifecycle | H5/PDF export artifacts record status, format, and storage metadata |
| DATA-DCK-005 | `deck_playback_snapshots` | Persist and restore playback position | Snapshot restore returns the same slide/action position that was last saved |
| DATA-DCK-006 | `reports` deck linkage | Report-to-deck association | Report keeps latest deck id, deck status, and walkthrough visibility flags |
| DATA-DCK-007 | `analysis_runs` deck status | Run-to-deck association | Analysis run tracks generation/review/export status without breaking prior report flow |
| DATA-DCK-008 | Deck metrics/artifact manifests | Telemetry and evidence durability | Metrics and evidence manifests stay queryable for acceptance and regression review |
| DATA-BND134-001 | Stage-boundary core facts | `problem_items`, `evidence_anchors`, `item_error_labels`, `diagnosis_outlines` | Core diagnosis objects remain explicit, linked, and evidence-backed |
| DATA-BND134-002 | Stage-boundary diagnosis output | diagnosis payload facts | `doNotOverreact`, confidence-aware release, and evidence references remain structured |
| DATA-BND134-003 | Report/explanation/plan contracts | report sections, explanation cards, seven-day plans | Explanation and plan outputs remain reusable structured contracts rather than UI-only blobs |
| DATA-BND134-004 | Share/privacy artifacts | share token, tutor summary, privacy boundary fields | Share and privacy surfaces remain separately queryable, revocable, and sanitized |
| DATA-BND134-005 | Provider/jobs lifecycle | analysis runs, retry, quality-gate state | Queue/running/needs_review/done/failed/retry/degrade states remain explicit and reusable |
| DATA-BND134-006 | Playback/export light linkage | deck linkage, playback/export metadata | Light-lane playback/export metadata stay additive to the report rather than replacing it |
| DATA-BND134-007 | Weekly/timeline lightweight hooks | compare summaries, history pointers, snapshot-linked review hooks | Timeline and compare support stay child-scoped and lightweight |
| DATA-BILL14-001 | Billing provider registry | provider names, flags, and service metadata | Provider selection remains explicit, auditable, and switchable |
| DATA-BILL14-002 | `billing_provider_accounts` | Persist provider identity mapping | Local users/teams map to provider-specific account identity without leaking provider assumptions into consumers |
| DATA-BILL14-003 | `billing_entitlements` | Persist local billing rights | Credits, recurring plan state, period-end, and upgrade state remain queryable locally |
| DATA-BILL14-004 | `billing_webhook_events` | Persist replay-safe webhook history | Provider events are deduplicated and auditable by provider event id |
| DATA-BILL14-005 | Entitlement snapshots | Billing snapshot projection output | Snapshot payloads can answer unlock, subscription, portal, and history-retention questions |
| DATA-BILL14-006 | Legacy billing compatibility | Existing `subscriptions`, `billing_events`, and compatible team fields | Old records remain readable during the cutover and map cleanly into the new entitlement layer |

## AI / OCR / QC Tests

| Test ID | Layer | Scenario | Expected Result |
| --- | --- | --- | --- |
| AI-EXT-001 | Extraction | 页面抽取输出 | 符合 Prompt A schema |
| AI-EXT-002 | Extraction | 每个 item evidence anchor | anchor 非空且 page/problem 对应真实页 |
| AI-LBL-001 | Labeling | taxonomy labeling | 只使用固定 code，不引入新标签 |
| AI-SAFE-001 | Safety | Prompt 输出 | 不出现直接题目答案 |
| AI-SAFE-002 | Safety | Plan 输出 | 给学习动作，不给作业代答 |
| AI-QC-001 | Quality flags | 模糊/旋转样本 | quality flag 被识别 |
| AI-QC-002 | Confidence routing | 低置信度 run | 进入 `needs_review` 或临时版 |
| AI-RPT-001 | Aggregation | finding evidence 数量 | 每个 finding 至少 2 个 anchors |
| AI-RVW-001 | Weekly review | previous report 输入 | 第二份报告显示趋势变化 |
| AI-DCK-001 | Outline generation | Build deck outline from diagnosis/report/plan/share facts | Outline uses accepted facts only and follows fixed slide order |
| AI-DCK-002 | Slide generation | Build slide content from outline | Slide content stays parent-first and grounded in the facts layer |
| AI-DCK-003 | Action whitelist | Generate action payloads | Only allowed action types and references are emitted |
| AI-DCK-004 | Anchor/reference validation | Validate slide actions | Actions with missing anchors or invalid references are rejected or degraded |
| AI-DCK-005 | Facts-only source policy | Attempt to use raw DOM input | Generator rejects raw DOM dependence and uses canonical diagnosis facts instead |
| AI-DCK-006 | Deck quality scoring | Score A/B/C/D tiers | Deck receives deterministic tier output and degrade policy metadata |
| AI-DCK-007 | Fixed page contract | Generate multiple decks from same facts | Page order and required slide schema remain stable across reruns |
| AI-DCK-008 | Share-facts reuse | Generate share-safe deck content | Share deck reuses existing report/share facts without exposing owner-only notes |
| AI-DCK-009 | Re-gate after regenerate | Regenerate slide/actions | Regenerated content is revalidated and tier is updated accordingly |

## Non-Functional Tests

| Test ID | Category | Scenario | Expected Result |
| --- | --- | --- | --- |
| NF-001 | Mobile | 390px 首页/注册/上传/报告 | 无关键内容溢出 |
| NF-002 | Accessibility | 键盘 tab / button labels | 关键 CTA 可键盘访问，有可读 label |
| NF-003 | Performance | 非分析 API | P95 <= 500ms 目标 |
| NF-004 | Performance | 报告生成 | P95 <= 6 分钟目标 |
| NF-005 | Resilience | 失败后重试 | 用户可恢复流程，不丢上传记录 |
| NF-006 | Deletion | 删除后访问旧链接 | 返回 404/403，不泄露已删数据 |
| NF-007 | Logging | 关键 run 生命周期 | 日志、trace、error 事件存在 |
| NF-008 | Cost | OCR/AI 成本遥测 | 可按 run 追踪成本 |
| NF-DCK-001 | Responsive player routes | `/dashboard/reports/[reportId]/play`, `/share/[token]/play`, `/admin/review/[runId]/deck` | Deck routes remain usable on desktop and mobile with no blocking overflow |
| NF-DCK-002 | Playback resilience | Pause/resume/restore across refresh | Player survives reload and restores from saved snapshot without corruption |
| NF-DCK-003 | Browser TTS fallback | Unsupported or partially supported speech synthesis | Voice guidance falls back safely and never blocks playback |
| NF-DCK-004 | Degraded deck UX | Tier C/D deck playback | Degrade policy removes autoplay or hides play entry without crashing the report flow |
| NF-DCK-005 | Deck telemetry | Generation, review, playback, export events | Deck lifecycle emits auditable telemetry suitable for release evidence |
| NF-DCK-006 | Artifact durability | Export/share/admin evidence manifest | Required deck evidence files remain readable and linked after generation/export |
| NF-BILL14-001 | Billing flag resilience | Provider and feature-flag switching | Freemius can be defaulted or rolled back via env flags without deleting code or breaking route contracts |
| NF-BILL14-002 | Public brand consistency | Landing, pricing, footer, contact, legal routes | Public copy stays consistently Pathnook-branded and billing-trust aligned across routes |
| NF-BILL14-003 | Billing cutover non-regression | Upload, analysis, report, share, deck, and build surfaces | Existing core routes remain stable while billing/provider architecture changes underneath |
| NF-HOME15-001 | Homepage responsive stability | Desktop and mobile homepage layouts | The homepage rewrite remains readable, stable, and CTA-usable across desktop and mobile breakpoints |
| NF-HOME15-002 | Homepage copy regression guardrail | Landing, pricing, FAQ, and footer copy | Public copy does not regress into math-only, report-only, bilingual-first, family-action-plan-first, or billing-mechanics-first framing |

## Ops And Release Tests

| Test ID | Scope | Scenario | Expected Result |
| --- | --- | --- | --- |
| OPS-DEL-001 | Delete flow | 删除 child / upload / report | 数据被删除或标记删除，旧链接不可访问 |
| OPS-DEL-002 | Retention policy | 超过保留周期的数据 | 按策略清理并有审计记录 |
| OPS-OBS-001 | Telemetry | 关键 run 生命周期 | 日志、trace、metrics 都存在 |
| OPS-OBS-002 | Cost telemetry | AI/OCR 调用后 | 能按 run 看到成本数据 |
| OPS-RLS-001 | Staging deploy | 部署到 staging | 应用可启动且核心路由可访问 |
| OPS-RLS-002 | Demo fixtures | 载入 fixture 数据 | 支持演示路径与回归路径 |
| OPS-NTF-001 | Reminder job | 报告完成或周复盘提醒 | 调度或发送行为可验证 |

## Suggested Fixture Packs

- `FIX-001`: first-time parent with no children
- `FIX-002`: parent with two children and no reports
- `FIX-003`: child with two completed reports for weekly review
- `FIX-004`: failed run
- `FIX-005`: needs_review run
- `FIX-006`: active share token
- `FIX-007`: expired share token
- `FIX-008`: revoked share token
- `FIX-009`: unpaid account
- `FIX-010`: paid account
