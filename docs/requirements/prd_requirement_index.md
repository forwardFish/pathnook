# PRD Requirement Index

Source of truth:
- `docs/需求文档.md`
- `docs/saas-starter 一天落地实施说明.md`

This index converts the PRD into unique requirement IDs. No feature may start implementation until its requirement IDs are linked to Story cards and test cases.

| Requirement ID | Category | Source Section | Requirement |
| --- | --- | --- | --- |
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
