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

## CLICK-010 — Needs Review -> Admin Approve -> Parent Reopen Report

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
