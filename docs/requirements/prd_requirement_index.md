# PRD Requirement Index

Source of truth:
- `docs/需求文档_1.4.md`
- `docs/需求文档_1.5.md`
- `docs/需求文档.md`
- `docs/需求文档_1.3.4.md`
- `docs/saas-starter 一天落地实施说明.md`

This index converts the PRD into unique requirement IDs. No feature may start implementation until its requirement IDs are linked to Story cards and test cases.

| Requirement ID | Category | Source Section | Requirement |
| --- | --- | --- | --- |
| DIAG122-INTAKE | Diagnosis 1.2.2 | 1.2.2 / Intake | Upload intake must persist subject, grade, source, parent concern, and teacher context into the run payload and upload record. |
| DIAG122-ITEM | Diagnosis 1.2.2 | 1.2.2 / Problem Item Facts | Structured problem items must preserve question summary, student response summary, work type, topic hint, evidence anchor, and teacher signal fields. |
| DIAG122-TAXONOMY | Diagnosis 1.2.2 | 1.2.2 / Taxonomy Contract | Diagnosis taxonomy and item error role contract must stay fixed and traceable through storage and report output. |
| DIAG122-FOUNDATION-ACCEPT | Diagnosis 1.2.2 | Sprint 15 Acceptance | Sprint 15 may close only when intake, item extraction, and taxonomy foundation are implemented, verified, agentized, and accepted. |
| DIAG122-DIAGNOSIS | Diagnosis 1.2.2 | 1.2.2 / Diagnosis Aggregation | Reports must aggregate facts into primary diagnosis, secondary diagnosis, pattern issues, sporadic issues, and do-not-overreact output. |
| DIAG122-PLAN | Diagnosis 1.2.2 | 1.2.2 / 7-Day Plan | The diagnosis lane must generate a 7-day plan with parent-facing prompts, success checks, and pauseList guidance. |
| DIAG122-GATE | Diagnosis 1.2.2 | 1.2.2 / Confidence Gate | Low-confidence cases must route to cautious messaging or needs_review instead of overclaiming a complete diagnosis. |
| DIAG122-SHARE | Diagnosis 1.2.2 | 1.2.2 / Share Summary | Share output must stay tutor-friendly and parent-first while exposing diagnosis, evidence, plan, and caution summaries. |
| DIAG122-CALIBRATION | Diagnosis 1.2.2 | 1.2.2 / Calibration Assets | Starter calibration assets must include gold samples, taxonomy handbook, diagnosis rules, and plan templates. |
| DIAG122-FINAL-ACCEPT | Diagnosis 1.2.2 | Sprint 16 Acceptance | Sprint 16 may close only when the six-step diagnosis lane and calibration starter set are evidenced and the remaining P0 live-analysis caveat is explicit. |
| DECK13-DATA | Diagnosis 1.3.x Deck | 1.3 / Deck Persistence | Diagnosis deck delivery must persist deck, slide, action, export, share-setting, and playback-snapshot state while linking runs and reports back to the generated deck artifact. |
| DECK13-GENERATION | Diagnosis 1.3.x Deck | 1.3.1 / Outline And Slide Generation | Guided walkthrough decks must be generated from accepted diagnosis/report/plan/share facts with a fixed page order instead of raw DOM replay. |
| DECK13-GATE | Diagnosis 1.3.x Deck | 1.3.2 / Deck Quality Gate | Every generated deck must pass anchor, action, and quality validation and degrade into A/B/C/D tiers before it can be exposed to users. |
| DECK13-PLAYER | Diagnosis 1.3.x Deck | 1.3.2 / Parent Player | Parent-facing reports must offer an optional Guided Walkthrough route with review-step and visual-explanation framing layered on top of the report experience. |
| DECK13-SHARE-PLAY | Diagnosis 1.3.x Deck | 1.3.2 / Tutor Share Player | Shared tutor walkthroughs must stay read-only, honor share revoke/expiry rules, and exclude parent-only notes while preserving the owner-scoped share lifecycle. |
| DECK13-TTS | Diagnosis 1.3.x Deck | 1.3.3 / Voice Guidance Defaults | Voice guidance must use browser-safe fallback behavior, default to off, and respect degraded deck tiers when autoplay or narration confidence is limited. |
| DECK13-ADMIN-REVIEW | Diagnosis 1.3.x Deck | 1.3.2 / Internal Review | Internal review surfaces must support approving, rejecting, regenerating, and trial-playing generated decks without making the deck tooling public-facing. |
| DECK13-EXPORT | Diagnosis 1.3.x Deck | 1.3.2 / Export Enhancement | Deck artifacts must support H5 and PDF export lifecycles as secondary enhancements without replacing the main report/evidence/plan value layer. |
| DECK13-METRICS | Diagnosis 1.3.x Deck | 1.3.2 / Metrics And Artifacts | Deck generation, review, playback, and export must emit durable status and artifact records suitable for release evidence and regression review. |
| DECK13-FINAL-ACCEPT | Diagnosis 1.3.x Deck | Sprint 20 Acceptance | The 1.3.x player lane may close only when traceability, browser, API/data/AI gate, export, share, and admin sweeps are all green. |
| BND134-PARENT-FIRST | Stage Boundary 1.3.4 | 1.3.4 / Principles / Parent First | Stage 1 landing, sample, report, plan, share, and walkthrough entry points must remain parent-first and diagnosis-first instead of drifting into student-first or classroom-first positioning. |
| BND134-CORE-FACTS | Stage Boundary 1.3.4 | 1.3.4 / Must-Do / Fact Layer | Stage 1 must preserve `ProblemItem`, `EvidenceAnchor`, and related structured fact objects as first-class contracts rather than flattening them into report prose or blobs. |
| BND134-DIAGNOSIS-CONTRACT | Stage Boundary 1.3.4 | 1.3.4 / Must-Do / Diagnosis Outline | Stage 1 diagnosis must stay evidence-backed, structured, and quality-gated through `DiagnosisOutline`-style contracts with `doNotOverreact` and confidence-aware behavior. |
| BND134-REPORT-LAYER | Stage Boundary 1.3.4 | 1.3.4 / Must-Do / Parent Report Sections | Stage 1 reports must keep `Diagnosis`, `Evidence`, `7-Day Plan`, and tutor/share framing as the primary value layer even when walkthrough enhancements exist. |
| BND134-EXPLANATION-CARD | Stage Boundary 1.3.4 | 1.3.4 / Must-Do / ExplanationCard | Explanation content must remain reusable structured cards linked to anchors and facts, not only embedded paragraphs in a report or player shell. |
| BND134-PLAN-CONTRACT | Stage Boundary 1.3.4 | 1.3.4 / Must-Do / SevenDayPlan | The seven-day parent action plan must remain a reusable, structured, parent-facing contract with goals, prompts, success checks, and pause guidance. |
| BND134-QUALITY-GATE | Stage Boundary 1.3.4 | 1.3.4 / Must-Do / Quality Gate | Stage 1 must block weak output from direct parent release through schema checks, quality grades, degrade behavior, and needs-review routing. |
| BND134-SHARE-PRIVACY | Stage Boundary 1.3.4 | 1.3.4 / Must-Do / Share And Privacy | Tutor handoff, share tokens, privacy boundaries, expiry/revoke rules, and read-only share behavior are in-scope Stage 1 contracts. |
| BND134-PROVIDER-JOBS | Stage Boundary 1.3.4 | 1.3.4 / Must-Do / Provider And Jobs | Storage, parse, LLM, run-state, retry, and job abstractions must stay additive and reusable instead of route-local one-offs. |
| BND134-WALKTHROUGH-LITE | Stage Boundary 1.3.4 | 1.3.4 / Light-Do / Guided Walkthrough | Guided Walkthrough may exist in Stage 1 only as an optional, secondary explanation layer behind the main report. |
| BND134-PLAYBACK-LITE | Stage Boundary 1.3.4 | 1.3.4 / Light-Do / Playback And Export | Playback, actions, voice guidance, H5/PDF export, and share-play enhancements may exist in lightweight form only and must remain subordinate to the report. |
| BND134-WEEKLY-TIMELINE-LITE | Stage Boundary 1.3.4 | 1.3.4 / Light-Do / Weekly Review And Timeline | Weekly review, compare, and timeline support may exist only as lightweight child-scoped hooks rather than a new heavy dashboard or generalized growth frontend. |
| BND134-POSTPONE-GUARDRAIL | Stage Boundary 1.3.4 | 1.3.4 / Postpone | PPTX, strong whiteboard, realtime walkthrough Q&A, multi-agent UI, student app, and generalized growth frontend work must stay out of Stage 1 execution. |
| BND134-FINAL-ACCEPT | Stage Boundary 1.3.4 | Sprint 24 Acceptance | The 1.3.4 boundary lane may close only when must-do and light-do rows are green or delegated with evidence and postponed work remains out of execution. |
| BILL14-PROGRAM-LANE | Billing 1.4 | 1.4 / Delivery Strategy | `1.4` must start as a new authoritative backlog lane with continuity, traceability, and testing assets before runtime changes begin. |
| BILL14-BASELINE | Billing 1.4 | 1.4 / Baseline Audit | The `1.4` lane must preserve explicit baseline evidence for current public-copy, provider, and billing-center gaps so later acceptance can measure the cutover. |
| BILL14-PROVIDER-INTERFACE | Billing 1.4 | 1.4 / Provider Abstraction | Billing must expose a provider-neutral interface and service layer with Freemius and Creem implementations behind it. |
| BILL14-DATA-LAYER | Billing 1.4 | 1.4 / Data Layer | The application must add `billing_provider_accounts`, `billing_entitlements`, and `billing_webhook_events` while keeping existing billing tables readable for compatibility. |
| BILL14-ENTITLEMENT-LAYER | Billing 1.4 | 1.4 / Local Entitlements | Local entitlement projection must remain the authoritative source for report unlock, subscription validity, portal access, and historical rights. |
| BILL14-CHECKOUT | Billing 1.4 | 1.4 / Checkout Route | Public checkout must move to a Freemius-first flow through a new primary `POST /api/checkout` entry point while preserving stable pricing UX. |
| BILL14-PORTAL | Billing 1.4 | 1.4 / Portal Route | Billing portal access must flow through a new primary `POST /api/portal` entry point and expose provider-neutral status to the dashboard UI. |
| BILL14-WEBHOOK | Billing 1.4 | 1.4 / Webhook | Public billing sync must use a new primary `POST /webhook` route with idempotent event storage and entitlement updates. |
| BILL14-CREEM-COMPAT | Billing 1.4 | 1.4 / Compatibility Layer | Creem code, routes, env keys, and fallback wiring must remain in the repository as a hidden compatibility layer rather than being deleted. |
| BILL14-BRAND-PUBLIC | Billing 1.4 | 1.4 / Public Brand | Public pages, SEO, pricing, trust copy, and support language must present the product as `Pathnook` rather than `FamilyEducation`. |
| BILL14-BILLING-CENTER | Billing 1.4 | 1.4 / Billing Center | `/dashboard/billing` must become a Pathnook billing center that shows entitlements, plan state, portal entry, and provider status. |
| BILL14-LEGAL-PUBLIC | Billing 1.4 | 1.4 / Legal And Trust | Public privacy, terms, refunds, contact, and trust copy must be reachable and consistent with the Freemius-first billing architecture. |
| BILL14-FLAGS-ROLLBACK | Billing 1.4 | 1.4 / Flags And Rollback | Feature flags must make Freemius the default public provider, hide Creem UI, preserve compatibility routes, and allow rollback without code deletion. |
| BILL14-NON-REGRESSION | Billing 1.4 | 1.4 / Regression Scope | Upload, analysis, report, share, deck playback, build, and existing paywall flows must remain intact through the billing/provider cutover. |
| BILL14-FINAL-ACCEPT | Billing 1.4 | Sprint 28 Acceptance | The `1.4` lane may close only when Freemius is the primary public path, Pathnook branding is consistent, Creem stays hidden-compatible, and regression evidence is green. |
| HOME15-PROGRAM-LANE | Homepage 1.5 | 1.5 / Delivery Strategy | `1.5` must start as a new authoritative backlog lane after `1.4 v6` closes, with continuity, traceability, and testing assets registered before runtime rewrite work begins. |
| HOME15-BASELINE | Homepage 1.5 | 1.5 / Baseline Audit | The `1.5` lane must preserve baseline evidence for current homepage copy, section order, CTA flow, and positioning debt before the rewrite starts. |
| HOME15-SYSTEM-DEFINITION | Homepage 1.5 | 1.5 / Brand Definition | Public homepage copy must define Pathnook as `an AI learning and growth system` rather than a narrow tool, report app, or math-only workflow. |
| HOME15-HERO-POSITIONING | Homepage 1.5 | 1.5 / Hero And Positioning | The hero and positioning layer must explain who Pathnook is, what current value it creates, and why families should care within the first viewport. |
| HOME15-WHY-USE | Homepage 1.5 | 1.5 / Why Families Use Pathnook | The homepage must explain clarity, next-step guidance, and follow-through in outcome language rather than feature-list language. |
| HOME15-STAGE1-VALUE | Homepage 1.5 | 1.5 / What Families Get Today | Public homepage sections must present the current Stage 1 family-learning-support value clearly without overselling Stage 2. |
| HOME15-PROOF-TRUST | Homepage 1.5 | 1.5 / Proof And Trust | The homepage must show proof-before-pay and trust-building language grounded in evidence-first, parent-first, share-safe, and quality-gated behavior. |
| HOME15-STAGE2-BRIDGE | Homepage 1.5 | 1.5 / Stage 2 Bridge | The homepage may introduce a future-facing Stage 2 bridge only as a secondary layer that does not steal focus from current Stage 1 support. |
| HOME15-HOW-IT-WORKS | Homepage 1.5 | 1.5 / How It Works | Public flow copy must explain the user journey in clear value language and avoid internal pipeline-first framing. |
| HOME15-PRICING-PREVIEW | Homepage 1.5 | 1.5 / Pricing Preview | Homepage pricing-preview copy must stay simple, trust-aligned, and consistent with the `1.4` Pathnook billing/legal surface. |
| HOME15-FAQ-FOOTER | Homepage 1.5 | 1.5 / FAQ And Footer | Homepage FAQ and footer must answer positioning questions, keep legal/support routes reachable, and stay aligned with Pathnook public trust copy. |
| HOME15-RESPONSIVE-CTA | Homepage 1.5 | 1.5 / Responsive And CTA Flow | The homepage rewrite must remain usable on desktop and mobile, with working CTA routes into sample and pricing surfaces. |
| HOME15-COPY-GUARDRAILS | Homepage 1.5 | 1.5 / Copy Guardrails | Homepage copy must not position the product as math-only, report-only, bilingual-first, family-action-plan-first, or billing-mechanics-first. |
| HOME15-FINAL-ACCEPT | Homepage 1.5 | Sprint 31 Acceptance | The `1.5` lane may close only when traceability, copy audit, responsive evidence, route smoke, and `1.4` public-brand regression checks are all green. |
| GOV-001 | Governance | Summary / Governance And Traceability | 实现前必须先建立 requirement index、traceability matrix 和测试矩阵。 |
| GOV-002 | Governance | Governance And Traceability | 任何 Story 卡都必须包含 requirement_ids、test_case_ids、expected_evidence。 |
| GOV-003 | Governance | Sprint Acceptance And Final Gate | 每个 Sprint 都必须有独立 Sprint Acceptance Story 和 traceability audit。 |
| GOV-004 | Governance | Summary / Sprint Acceptance And Final Gate | 最终总测通过前不得宣称功能已实现。 |
| PAGE-001 | Pages | 页面清单 / 首页 | Landing 页必须呈现 hero、How it works、trust copy、FAQ、CTA。 |
| PAGE-002 | Pages | 页面清单 / Billing / saas-starter 实施说明 | Pricing 页必须提供 one-time、monthly、Tutor/Coming soon 信息。 |
| PAGE-003 | Pages | 注册页 / MVP 功能清单 | Sign-up 页必须包含 email、password、country、timezone、18+、TOS/Privacy。 |
| PAGE-004 | Pages | 页面清单 / Auth | Sign-in 页必须允许已注册家长重新进入受保护区域。 |
| PAGE-005 | Pages | 家长仪表盘 | Dashboard 页必须展示 children、recent reports、recent runs、billing/account 入口。 |
| PAGE-006 | Pages | 页面清单 / 历史与周度复盘 | Children 相关页面必须覆盖新建、详情、历史/复盘、上传入口。 |
| PAGE-007 | Pages | 上传页 | Upload 页必须支持 5–10 页上传、预览、质量提示、source type、notes。 |
| PAGE-008 | Pages | 分析进度页 | Run Status 页必须展示步骤、状态、进度、失败重试、support 入口。 |
| PAGE-009 | Pages | 诊断页 / 证据页 / 7天执行单 | Report 页必须提供 Diagnosis、Evidence、Plan 三个主要阅读面。 |
| PAGE-010 | Pages | 付费页 | Billing 页必须提供 Stripe Checkout 入口。 |
| PAGE-011 | Pages | Tutor 共享页 | Share 页必须提供 tutor 只读访问能力。 |
| PAGE-012 | Pages | Admin（内部） | Admin Review 页面必须提供队列和详情/编辑视图。 |
| PAGE-013 | Pages | Detailed Test Program / 非功能测试 | 所有核心页面必须支持桌面和移动端可用布局。 |
| AUTH-001 | Auth | MVP 功能清单 / 注册页 | 家长注册必须要求 18+ 勾选，否则不可提交。 |
| AUTH-002 | Auth | 注册页 | 家长注册必须要求同意 TOS/Privacy。 |
| AUTH-003 | Auth | MVP 功能清单 / Auth | 必须支持 Email 注册/登录/登出/找回密码或等价恢复能力。 |
| AUTH-004 | Auth | MVP 功能清单 / Auth / users 表 | 账户需要存储 country、timezone、locale，用于家长端配置。 |
| AUTH-005 | Auth | MVP 功能清单 / Auth / API 设计概要 | 未登录用户不能访问 dashboard、children、reports、billing、admin。 |
| CH-001 | Children | Child Profile / Children API | 家长可以为孩子创建 nickname、grade、curriculum。 |
| CH-002 | Children | Child Profile | 同一家庭账户必须支持多个孩子。 |
| CH-003 | Children | Child Profile / 合规要点 | MVP 默认不收集孩子真实姓名、学校名等非必要信息。 |
| UP-001 | Upload | 上传与处理 / 输入要求 | 必须支持 JPG/PNG/PDF 输入，单次 5–10 页。 |
| UP-002 | Upload | 上传页 / MVP 功能清单 | 上传后必须显示页缩略图与页数。 |
| UP-003 | Upload | 上传与处理 / 数据模型 | PDF 必须拆页并记录 pages。 |
| UP-004 | Upload | 上传页 / 图像处理需求 | 系统必须识别模糊、旋转、过暗等质量标志。 |
| UP-005 | Upload | 上传页 / API 设计概要 | 上传时必须保存 source type 与 notes。 |
| UP-006 | Upload | 上传页验收 | 超过 10 页必须阻止提交并提示拆分上传。 |
| UP-007 | Upload | 上传页验收 | 少于 5 页时必须提示稳定性风险。 |
| RUN-001 | Run Lifecycle | 启动分析与进度页 / API 设计概要 | 提交上传后必须创建 analysis_run 并跳转到进度页。 |
| RUN-002 | Run Lifecycle | 启动分析与进度页 / analysis_runs 表 | analysis_run 必须支持 queued、running、done、failed、needs_review。 |
| RUN-003 | Run Lifecycle | 分析进度页 | 进度页必须展示步骤、百分比或阶段状态与预计时间。 |
| RUN-004 | Run Lifecycle | 启动分析与进度页 | 失败的 run 必须支持重试。 |
| RUN-005 | Run Lifecycle | 启动分析与进度页 | 超时 run 必须提供明确提示和支持入口。 |
| AI-001 | AI / OCR | Prompt A / 数据与接口规格 | 页面抽取必须输出固定 JSON schema。 |
| AI-002 | AI / OCR | Prompt B / taxonomy | 错误标签必须只使用固定 taxonomy code set。 |
| AI-003 | AI / OCR | 提示词设计要点 / Prompt A-C | 模型与报告都不得直接输出作业答案。 |
| AI-004 | AI / OCR | Prompt A / problem_items 表 | 每个问题条目都必须带 evidence anchor。 |
| AI-005 | AI / OCR | Prompt C / 后处理规则 | 每个 finding 至少需要 2 条 evidence，否则降级或不输出。 |
| AI-006 | AI / OCR | 置信度阈值 / 人工审核回合 | 低置信度结果必须走 temporary/needs_review 分流。 |
| AI-007 | AI / OCR | Prompt C / History / Weekly Review | weekly review 必须能利用 previous report summary 做趋势比较。 |
| REP-001 | Reports | 诊断页 / Diagnosis | Diagnosis 必须输出 Top 1–3 findings。 |
| REP-002 | Reports | 诊断页 / Detailed Test Program | Diagnosis 必须区分 pattern vs sporadic。 |
| REP-003 | Reports | 诊断页 / 7天执行单 | Diagnosis/Plan 必须给出本周优先级与暂时不要做的事项。 |
| REP-004 | Reports | 证据页 | Evidence 必须按错误类型分组展示。 |
| REP-005 | Reports | 证据页 | Evidence 必须允许打开页图并定位到 pageNo/problemNo。 |
| REP-006 | Reports | 7天执行单 / Prompt C | 7-Day Plan 必须覆盖 Day1–Day7，每天含目标、任务、家长提示语、成功判定。 |
| REP-007 | Reports | 报告模板 / Prompt C / reports 表 | 系统必须从统一事实层生成 parent/student/tutor 三版本报告。 |
| REP-008 | Reports | 质量控制 / Detailed Test Program | 低置信度报告必须有降级提示或待审核说明。 |
| HIS-001 | History | 历史与周度复盘 | 孩子详情页必须至少显示最近 3 次报告。 |
| HIS-002 | History | 历史与周度复盘 | weekly review 必须支持与上一次报告对比并展示趋势变化。 |
| HIS-003 | History | 历史与周度复盘 | 家长必须可以写复盘笔记。 |
| SHR-001 | Share | Tutor 共享链接 | 报告必须支持生成 share token。 |
| SHR-002 | Share | Tutor 共享链接 / share_links 表 | share token 必须支持到期和 revoke。 |
| SHR-003 | Share | Tutor 共享页 | share 页面必须只读并隐藏敏感家长内部信息。 |
| BIL-001 | Billing | 付费 / Billing | Billing 必须支持 one-time checkout。 |
| BIL-002 | Billing | 付费 / Billing | Billing 必须支持 monthly checkout 或等价订阅入口。 |
| BIL-003 | Billing | 付费 / Billing | 未支付状态必须锁定完整报告或关键功能。 |
| BIL-004 | Billing | Billing / webhook 验收 | Stripe webhook 必须幂等，不得重复解锁或重复入账。 |
| ADM-001 | Admin / QC | 低置信度进入 Needs Review 队列 / Admin | 内部必须有 needs_review 队列和 run 详情页。 |
| ADM-002 | Admin / QC | 人工审核回合 / Admin | 审核员必须可以 approve、request-more-photos、调整展示文案。 |
| SHD-001 | Should | Should | Should 范围包含 PDF 导出。 |
| SHD-002 | Should | Should | Should 范围包含 tutor workspace foundation。 |
| SHD-003 | Should | Should | Should 范围包含报告完成/复盘 reminder 邮件。 |
| SHD-004 | Should | Should | Should 范围包含 EN/ES 输出支持。 |
| SHD-005 | Should | Should | Should 范围包含 evidence highlight。 |
| OPS-001 | Compliance / Ops | 合规要点 / 风险与缓解措施 | 系统必须提供删除入口与数据保留策略。 |
| OPS-002 | Compliance / Ops | 监控与日志 / 非功能测试 | 系统必须有 observability、日志、成本和运行时遥测。 |
| OPS-003 | Compliance / Ops | 最小可交付时间线 / Sprint 7 | 系统必须有 staging/demo fixtures/runbook 以支持 release candidate。 |
