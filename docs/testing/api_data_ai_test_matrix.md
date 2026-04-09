# API, Data, AI, And Non-Functional Test Matrix

## API Contract Tests

| Test ID | Scope | Scenario | Expected Result |
| --- | --- | --- | --- |
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

## Data Integrity Tests

| Test ID | Data Surface | Scenario | Expected Result |
| --- | --- | --- | --- |
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
