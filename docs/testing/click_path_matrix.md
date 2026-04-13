# Click Path Matrix

These are the canonical user journeys that must stay green. Every Sprint Acceptance Story must re-run the paths affected by that sprint.

## CLICK-001 — Landing -> Sign up -> Dashboard

Preconditions: 未登录用户

Steps:
1. 打开 `/`。
2. 点击 `Try a Diagnosis`。
3. 在 `/sign-up` 完成注册。
4. 注册成功后进入 `/dashboard`。

Expected result: 完成 parent-first 首次进入路径，session 生效。

Evidence to collect:
- Browser screenshots before and after the critical click
- Console and network health
- 注册请求与 session 建立证据

## CLICK-002 — Dashboard -> Add Child -> Upload

Preconditions: 已登录且无孩子

Steps:
1. 打开 `/dashboard`。
2. 点击 `Add Child`。
3. 在 `children/new` 创建孩子。
4. 进入孩子详情后点击 `Upload`。

Expected result: 成功到达 upload 页面并绑定 childId。

Evidence to collect:
- 仪表盘空态截图
- child 创建成功的 API 证据
- upload 路由到达截图

## CLICK-003 — Upload -> Generate -> Run -> Report

Preconditions: 已登录且已有孩子

Steps:
1. 进入 upload 页面并上传合法页。
2. 填写 source type 和 notes。
3. 点击 `Generate Diagnosis`。
4. 观察跳转到 run 页面。
5. run 完成后点击 `View Report`。

Expected result: 完成上传到报告的主链路。

Evidence to collect:
- 上传页提交前后截图
- run 创建 API 输出
- report 页面到达截图

## CLICK-004 — Report -> Evidence -> Open Page

Preconditions: 存在报告

Steps:
1. 打开报告。
2. 切换到 Evidence。
3. 点击某条 evidence 的 `open`。
4. 观察页图和题号定位。

Expected result: 打开对应页图，并定位到对应题号或提供降级定位。

Evidence to collect:
- tab 切换截图
- evidence open 行为截图
- page viewer 状态截图

## CLICK-005 — Report -> Plan -> Mark Done

Preconditions: 存在计划

Steps:
1. 打开报告。
2. 切换到 Plan。
3. 点击某一天的 `Mark done`。
4. 刷新页面或重新进入报告。

Expected result: 计划完成状态保存，并刷新后仍可见。

Evidence to collect:
- plan tab before/after screenshot
- 状态持久化 API 或 DB 证据

## CLICK-006 — Report -> Share -> Open Token Page

Preconditions: 存在报告

Steps:
1. 在报告页点击 `Share`。
2. 生成 token。
3. 在新页面打开 share URL。

Expected result: share 页面只读可见。

Evidence to collect:
- token 生成响应
- share 页面截图
- 敏感字段隐藏断言

## CLICK-007 — Dashboard -> Billing -> Checkout -> Success

Preconditions: 已登录未付费用户

Steps:
1. 从 dashboard 进入 billing。
2. 选择 one-time 或 monthly 方案。
3. 进入 Stripe Checkout。
4. 完成测试支付并回流。

Expected result: 报告或功能解锁，billing 状态更新。

Evidence to collect:
- billing 页面截图
- checkout session 证据
- webhook 和 entitlement 证据

## CLICK-008 — Failed Run -> Retry

Preconditions: 存在 failed run

Steps:
1. 打开 failed run 页面。
2. 点击 Retry。
3. 观察新的状态更新。

Expected result: run 恢复处理或创建新的处理尝试。

Evidence to collect:
- failed 状态截图
- retry 请求响应
- 新状态截图

## CLICK-009 — First Report -> Second Upload -> Weekly Review

Preconditions: 同一 child 已有 1 份报告

Steps:
1. 完成第二次上传并生成第二份报告。
2. 进入 child detail/history。
3. 打开 compare to last。

Expected result: 出现趋势变化与 next focus。

Evidence to collect:
- 第二份报告生成证据
- child detail 趋势截图
- compare 结果断言

## CLICK-010 – Needs Review -> Admin Approve -> Parent Reopen Report

Preconditions: 存在 needs_review run

Steps:
1. admin 打开 review queue。
2. 进入 run 详情并 approve。
3. parent 刷新 run 或 report 页面。

Expected result: parent 可查看已批准的完整报告。

Evidence to collect:
- admin 审核动作截图
- 审核 API 响应
- parent 端重新打开报告截图

## CLICK-DCK-001 – Report -> Guided Walkthrough -> Playback Controls

Preconditions: 已登录且报告存在 A/B tier deck

Steps:
1. 打开 `/dashboard/reports/[reportId]`。
2. 点击 `Guided Walkthrough` 入口。
3. 在 `/play` 中执行 start、next slide、pause、resume、stop。

Expected result: 报告可进入可播放 deck，播放控制和 slide/action 状态切换稳定。

Evidence to collect:
- report 入口截图
- player before/after screenshot
- playback state transition output

## CLICK-DCK-002 – Parent Player -> Voice Guidance Toggle -> Browser Fallback

Preconditions: deck 可播放，浏览器支持或不支持 TTS

Steps:
1. 打开 `/dashboard/reports/[reportId]/play`。
2. 检查默认 voice 状态。
3. 手动打开和关闭 `voice guidance`。
4. 在不支持 TTS 的浏览器或 mocked fallback 环境下重复。

Expected result: voice 默认关闭；支持 TTS 时可手动启用；不支持时进入安全 fallback 且不阻塞 walkthrough。

Evidence to collect:
- default-off screenshot
- toggle interaction evidence
- fallback console or API evidence

## CLICK-DCK-003 – Share Report -> Tutor Play Route

Preconditions: 有效 share token 且 deck 允许 share playback

Steps:
1. 从报告页生成 share token。
2. 打开 `/share/[token]/play`。
3. 浏览 tutor walkthrough。

Expected result: tutor 只读 player 可访问，内容受 share 权限约束，且不暴露 parent-only note。

Evidence to collect:
- share token generation response
- share player screenshot
- privacy field omission assertion

## CLICK-DCK-004 – Admin Review -> Regenerate -> Re-gate

Preconditions: admin 身份且 deck 已进入 review

Steps:
1. 打开 `/admin/review/[runId]/deck`。
2. 触发 regenerate slide 或 regenerate actions。
3. 检查最新 gate 结果。

Expected result: deck 草稿被重新生成并重新执行 quality gate，tier/错误信息同步更新。

Evidence to collect:
- admin review screenshot
- regenerate API response
- updated gate summary

## CLICK-BND134-001 — Report -> Share -> Tutor Boundary

Preconditions: 已有报告且可生成 share token

Steps:
1. 在报告页生成 share token。
2. 打开 `/share/[token]`。
3. 检查 tutor summary、read-only framing、隐私边界。

Expected result: tutor handoff 存在，但 parent-only 内容不泄露，且 share 仍是只读。

Evidence to collect:
- share token generation response
- share page screenshot
- privacy boundary assertion

## CLICK-BND134-002 — Report -> Guided Walkthrough Remains Secondary

Preconditions: 报告存在 walkthrough/deck 入口

Steps:
1. 打开 `/dashboard/reports/[reportId]`。
2. 先确认 Diagnosis / Evidence / Plan 为主层。
3. 再点击 `Guided Walkthrough` 进入 `/play`。

Expected result: walkthrough 是可选增强层，不替代主报告阅读路径。

Evidence to collect:
- report primary-layer screenshot
- walkthrough entry screenshot
- `/play` route screenshot

## CLICK-BND134-003 — Child History -> Compare Remains Lightweight

Preconditions: 同一 child 至少有两份报告

Steps:
1. 打开 `/dashboard/children/[childId]`。
2. 进入 history / compare。
3. 查看趋势、focus 变化、compare summary。

Expected result: compare/timeline 仅提供轻量 hook，不出现重型 dashboard 或 generalized growth shell。

Evidence to collect:
- child history screenshot
- compare summary screenshot
- no-heavy-dashboard assertion

## CLICK-DCK-005 – Admin Review -> Trial Playback -> Approve/Reject

Preconditions: admin 身份且 deck 已进入 review

Steps:
1. 打开 `/admin/review/[runId]/deck`。
2. 执行 trial playback。
3. 分别执行 approve 和 reject 流程。

Expected result: trial playback 可用，审核动作写入审计记录并更新 deck 状态。

Evidence to collect:
- trial playback screenshot
- review action responses
- status change assertions

## CLICK-DCK-006 – Parent Deck -> Export H5

Preconditions: deck 已生成且 export 能力开启

Steps:
1. 打开 deck 或 report 页面。
2. 触发 `Export H5`。
3. 读取导出 artifact 或下载入口。

Expected result: H5 artifact 生成成功，生命周期状态可回读。

Evidence to collect:
- export trigger screenshot
- export-h5 API response
- artifact readback evidence

## CLICK-DCK-007 – Parent Deck -> Export PDF

Preconditions: deck 已生成且 export 能力开启

Steps:
1. 打开 deck 或 report 页面。
2. 触发 `Export PDF`。
3. 读取导出 artifact 或下载入口。

Expected result: PDF artifact 生成成功，且仍被标注为 secondary enhancement 而不是主报告替代。

Evidence to collect:
- export UI screenshot
- export-pdf API response
- artifact metadata assertion

## CLICK-DCK-008 – Player Snapshot Save -> Restore

Preconditions: 已登录且 deck 可播放

Steps:
1. 打开 `/dashboard/reports/[reportId]/play` 并推进到中间 slide/action。
2. 触发 snapshot 保存。
3. 刷新页面或重新进入 player。

Expected result: snapshot 成功保存并恢复，用户回到之前的播放位置。

Evidence to collect:
- mid-playback screenshot
- snapshot API request/response
- restored state screenshot

## CLICK-BILL14-001 – Pricing -> Primary Checkout Route

Preconditions: public pricing page available and the default provider is Freemius

Steps:
1. Open `/pricing`.
2. Trigger the checkout CTA for `one_time`, `monthly`, and `annual` fixtures.
3. Inspect the request/redirect target.

Expected result: checkout flows through the new primary route or compatibility facade backed by the billing service and does not expose public Creem copy.

Evidence to collect:
- pricing CTA screenshot
- checkout request/response log
- provider default behavior assertion

## CLICK-BILL14-002 – Dashboard Billing -> Portal Entry And Unavailable State

Preconditions: authenticated parent fixtures with and without a portal-ready provider account

Steps:
1. Open `/dashboard/billing`.
2. Trigger the portal CTA on a configured fixture.
3. Repeat on a fixture without portal readiness.

Expected result: configured users reach the portal flow, while unavailable users see provider-neutral guidance rather than a Creem fallback.

Evidence to collect:
- billing-center screenshot
- portal request/response log
- unavailable-state screenshot

## CLICK-BILL14-003 – Webhook Replay -> Entitlement Idempotency

Preconditions: webhook replay fixture or deterministic local webhook payload available

Steps:
1. Submit the same billing webhook event twice.
2. Inspect webhook event storage and entitlement state after both attempts.

Expected result: the first event applies successfully, the second is idempotent, and entitlement state remains correct.

Evidence to collect:
- webhook replay log
- stored event assertion
- entitlement diff output

## CLICK-BILL14-004 – Public Brand Surface -> Legal Footer Consistency

Preconditions: public landing and pricing routes available

Steps:
1. Open `/`.
2. Navigate through pricing, footer, contact, privacy, terms, and refunds links.
3. Inspect public copy on each route.

Expected result: all linked public routes use Pathnook branding and billing trust copy consistently with no public Creem leakage.

Evidence to collect:
- route screenshots
- footer navigation log
- brand consistency assertion

## CLICK-HOME15-001 – Homepage -> How It Works -> Pricing Preview

Preconditions: public landing route available

Steps:
1. Open `/`.
2. Scroll through hero, positioning, why-use, Stage 1 value, and how-it-works.
3. Continue into the pricing-preview section.

Expected result: the homepage reads as one coherent Pathnook story and does not break into disconnected feature fragments.

Evidence to collect:
- section-order screenshots
- narrative flow notes
- pricing-preview transition screenshot

## CLICK-HOME15-002 – Homepage Footer -> Pricing / Contact / Legal

Preconditions: public landing route available

Steps:
1. Open `/`.
2. Navigate through pricing preview, footer, contact, privacy, terms, and refunds links.
3. Inspect each route for trust and brand consistency.

Expected result: footer-linked routes remain reachable and consistent with the homepage rewrite and the `1.4` Pathnook public trust surface.

Evidence to collect:
- footer navigation log
- linked route screenshots
- trust-copy consistency notes

## CLICK-HOME15-003 – Homepage CTA -> Sample Report / Pricing

Preconditions: public landing route available

Steps:
1. Open `/`.
2. Trigger the primary homepage CTA flow toward diagnosis/pricing.
3. Trigger the sample-report CTA flow.

Expected result: CTA flows remain clear, reachable, and aligned with the new homepage copy without dead ends or outdated wording.

Evidence to collect:
- CTA screenshots
- sample-report route screenshot
- pricing route screenshot
