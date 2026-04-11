# Pathnook × Freemius 上线文档（可直接执行版）

> 目标：让 Pathnook 以最高概率通过 Freemius 审查，并完成首版可用的 Freemius 收款接入。
> 
> 适用场景：AI Web / SaaS / 教育诊断类软件产品。
> 
> 说明：这不是法律意见书，也不是 Freemius 官方审批承诺；它是一份“按官方文档 + 实际上线逻辑整理”的高通过率执行文档。

---

## 1. 先说结论

Pathnook 这类产品适合接 Freemius，因为它本质上是“在线软件 / SaaS”，不是单纯卖课程或咨询。

你现在最该做的不是先写代码，而是先把 **站点信任层** 和 **法律页** 补齐，然后再接入 Freemius。

上线顺序建议：

1. 补法律页与联系页
2. 清理站内占位文案 / 未完成提示 / 错误价格
3. 在 Freemius 后台创建 SaaS Product 与 Plans
4. 接 `checkout`、`portal`、`webhook`
5. 做 Sandbox 测试
6. 上正式环境并提交审查

---

## 2. 你的产品是否适合 Freemius

### 2.1 适合的原因

Pathnook 属于软件服务，核心价值应该来自：
- 上传作业 / 资料
- 生成诊断报告
- 提供订阅或一次性解锁
- 让用户在站内持续使用功能

这符合 Freemius 的软件产品定位。

### 2.2 不能踩的线

你必须避免以下情况：
- 卖点只有“人工支持 / 咨询”，没有真实软件功能
- 用夸张承诺误导家长或学生
- 价格页、退款页、数据处理规则前后矛盾
- 功能页写得很强，但实际站点大量按钮不可用
- 出现高退款、高争议、高投诉风险的表述

---

## 3. 上线前站点必须达到的最低标准

下面这些不是“加分项”，而是你应该默认必须完成的。

### 3.1 全站必须有的公开页面

建议至少具备以下页面：

- `/`
- `/pricing`
- `/purchase` 或购买入口页面
- `/billing`（已购用户管理订阅）
- `/contact`
- `/legal/privacy`
- `/legal/terms`
- `/legal/refunds`

如果你用了非必要 Cookie、广告追踪或 Affiliate，再补：
- `/legal/cookies`

### 3.2 Footer 必须长期可见的链接

全站页脚建议固定显示：

- Privacy Policy
- Terms of Service
- Refund Policy
- Contact Us
- Support Email

### 3.3 必须清理掉的“会降低通过率”的问题

在你正式接入 Freemius 前，必须清掉这些问题：

- 占位邮箱，例如 `.local`
- 未接好的登录提示，例如“Google OAuth 之后才可用”
- 旧支付商文案，例如页面还写 Creem checkout / Creem billing portal
- 明显错误的价格展示
- 按钮可见但不能正常工作
- 法律页链接存在但为空白 / 404 / 模板未改完
- 联系方式只有表单，没有域名邮箱

---

## 4. 法律页要求（你自己写内容时照着填）

下面我不直接替你写正文，而是给你“必须覆盖的字段”。

---

## 4.1 Privacy Policy 必须覆盖的内容

建议结构如下：

### A. 你是谁
- 网站主体名称
- 网站域名
- 联系邮箱（必须是域名邮箱）

### B. 你收集什么数据
至少写清：
- 注册信息：邮箱、姓名、账号信息
- 支付相关信息：订单、订阅状态、账单记录（不要声称你自己保存完整银行卡信息）
- 内容数据：上传的作业图片、文档、截图、题目、分析结果、报告文件
- 技术数据：IP、设备、浏览器、日志、Cookie、使用行为
- 客服数据：你与用户之间的邮件、工单、反馈记录

### C. 为什么收集这些数据
要逐项说明用途，例如：
- 创建和管理用户账户
- 提供诊断报告和订阅服务
- 处理支付、退款和账单
- 防欺诈与安全审计
- 生成产品改进所需的分析数据
- 客服支持

### D. 数据如何共享
必须写清会共享给哪些类型的第三方：
- 托管与基础设施服务商
- 分析服务商
- 邮件服务商
- 支付与结算服务商
- 法律与合规要求下的披露对象

### E. 关于 Freemius 的披露
这里建议明确写：
- 你使用 Freemius 处理部分 checkout、billing、subscription、invoice、tax 相关流程
- 为完成交易，必要的交易数据和账户标识信息会提供给 Freemius
- Freemius 可能作为支付和账务流程的一部分处理交易相关数据

### F. 数据保留期限
至少写明：
- 账户数据保留多久
- 上传内容 / 报告保留多久
- 删除账号后多久删除或匿名化
- 法律、税务、反欺诈记录可能因合规要求保留更久

### G. 用户权利
至少写：
- 查看
- 更正
- 删除
- 导出
- 撤回营销同意
- 关闭账号

### H. 未成年人 / 学生数据
因为你的产品涉及学生学习资料，必须单独写：
- 用户应确保其有权上传相关学习资料
- 未成年人使用时需由家长 / 监护人授权或参与
- 你只收集提供服务所需的最少信息

### I. 安全措施
写原则即可：
- 传输加密
- 权限控制
- 最小化访问
- 日志审计
- 第三方服务商安全管理

### J. 国际传输
如果你服务全球用户，建议写：
- 数据可能在不同国家/地区处理与存储
- 你会采取合理保护措施

### K. 政策更新
- 生效日期
- 更新后如何通知用户

---

## 4.2 Terms of Service 必须覆盖的内容

建议结构如下：

### A. 服务定义
- 你提供的是软件服务，不是学校、医院、法律机构或官方认证机构
- 报告、分析、建议仅用于辅助判断

### B. 账户规则
- 用户必须提供真实信息
- 不得共享账户、倒卖、破解、滥用
- 你有权暂停异常或违规账户

### C. 允许与禁止行为
至少列：
- 禁止攻击、逆向、刷接口、恶意上传、滥发内容
- 禁止非法使用、侵犯第三方权利
- 禁止上传无授权的敏感资料

### D. 订阅与计费
- 套餐价格
- 自动续费规则
- 升降级规则
- 续费日如何计算
- 税费说明

### E. 知识产权
- 软件、界面、算法、模板、报告结构归你或授权方所有
- 用户只获得有限、可撤销、不可转让的使用权

### F. 用户内容
- 用户上传内容所有权归用户或其合法权利人
- 用户授予你为提供服务所必需的处理许可
- 用户保证其有权上传相关内容

### G. 免责声明
- 结果仅作辅助参考
- 不保证绝对准确、满分、升学结果、考试结果
- 不构成医疗、法律、官方教育结论

### H. 责任限制
- 在适用法律允许范围内限制间接损失、利润损失等责任
- 写清最大责任范围（通常以一定期间内实际支付金额为上限）

### I. 终止服务
- 用户可自行停用
- 你可因违规、欺诈、欠费、风险控制暂停或终止

### J. 适用法律与争议解决
- 选择一个统一法域
- 写清争议解决方式

---

## 4.3 Refund Policy 必须覆盖的内容

### 原则
不要写“概不退款”。

你这个产品更适合“软件订阅 + 消耗型功能”的混合退款策略。

### 推荐结构

#### A. 可退款情形
- 首次购买后 7 天内提出申请
- 且未明显使用核心功能 / 未消耗核心额度 / 未生成高价值不可逆结果
- 或因重复扣款、系统故障导致无法使用

#### B. 部分退款 / 不可退款情形
建议写清：
- 已经生成诊断报告、导出正式 PDF、消耗积分/额度、触发高成本模型调用后，可不全额退款
- 已实际使用订阅服务的，可按未使用部分酌情处理
- 违反服务条款、欺诈、滥用、拒付风险行为不予退款

#### C. 退款流程
- 用户通过哪个邮箱或表单申请
- 需要提供什么信息（订单邮箱、订单号、原因）
- 你会在几天内回复
- 退款回原支付路径

#### D. 订阅取消说明
- 取消订阅只影响下一个计费周期
- 已经开始的当前周期通常不因取消而自动退款

### 你这个项目最适合的退款口径
建议你采用下面这个逻辑：

- 订阅类：7 天冷静期，但仅适用于未实质使用核心功能的情况
- 报告/积分/一次性解锁类：已使用或已消耗的部分不退款；未使用部分可退款

---

## 4.4 Contact Us 页面必须覆盖的内容

至少要有：
- 域名邮箱，例如 `admin@pathnook.com` / `support@pathnook.com`
- 响应时间承诺，例如 2 个工作日内回复
- 问题分类（Billing / Technical / Account / Refund）
- 可选：工单表单、X、LinkedIn

不要只放：
- Gmail
- QQ 邮箱
- 一个没有人看的表单

---

## 5. Pathnook 页面应该怎么改

这一段是给你前端改版时直接照抄执行的。

### 5.1 首页

首页必须讲清 4 件事：
- 你卖的到底是什么软件服务
- 用户上传什么、得到什么
- 付款后能获得什么
- 怎么联系客服、怎么退款

建议首页新增：
- Trust Bar：Secure checkout / Billing support / Refund policy / Contact
- Legal links 小区域
- FAQ：Billing / Refund / Data deletion / Student data handling

### 5.2 Pricing 页面

必须做到：
- 价格数字完全正确
- 月付/年付逻辑清楚
- 一次性产品和订阅产品分开展示
- 每个套餐写“包含什么”和“不包含什么”
- 写清自动续费
- 写清退款入口

建议不要写：
- “best deal ever” 这类夸张词
- “guaranteed improvement” 这类承诺性表达

### 5.3 购买页 / Checkout 入口页

首次上线建议：
- 先用 Hosted Checkout 或由后端统一生成 Checkout Link
- 页面按钮只做一件事：发起购买

购买前页面应显示：
- 当前产品名称
- 价格
- 续费规则
- Refund Policy 链接
- Terms / Privacy 链接

### 5.4 Billing 页面

要有一个明确的“Manage billing”入口。

用户至少要能：
- 查看当前套餐
- 查看续费状态
- 打开 Customer Portal
- 取消订阅
- 查看发票 / 订单历史

### 5.5 注册页 / 登录页

禁止留下这类内容：
- “功能稍后可用”
- “接好 OAuth 后再说”
- 404 或跳转错误

如果 Google 登录没接好：
- 先隐藏
- 不要显示残缺流程

---

## 6. Freemius 后台配置怎么做

## 6.1 创建产品

在 Freemius 后台：
- 创建一个 **SaaS Product**
- 配置 Plans（例如 Starter / Pro / Family）
- 如果你有积分/报告包，可以配置 one-off / consumptive usage

### 你的产品建议配置

#### 方案 A：纯订阅
- Starter（月付）
- Pro（月付/年付）
- Family（月付/年付）

#### 方案 B：订阅 + 一次性包
- Pro Subscription
- Report Pack / Credit Pack / One-time Unlock

如果你的报告/积分属于一次性消耗，建议在产品层面按“消耗型 usage”思路来设计，方便后续退款口径一致。

## 6.2 Single Subscription 设置

默认情况下，Freemius 对 SaaS 产品会限制“每个用户只能有一个活跃订阅”。

对 Pathnook 来说，建议先保持默认，不要一开始放开多订阅。

理由：
- 你的用户不是企业采购场景
- 多订阅会增加客服与对账复杂度
- 审查时逻辑更简单

## 6.3 Refund Policy 设置

在 Plans -> Refund Policy 中配置。

对 Pathnook 建议：
- 订阅计划：给 7~14 天冷静期，但保留对已消耗功能的限制
- 一次性报告 / 积分：开启 consumptive usage 方向的限制思路

---

## 7. Freemius 接口接入方案（推荐你用 Next.js / Node）

## 7.1 依赖安装

```bash
npm install @freemius/sdk @freemius/checkout zod
```

## 7.2 环境变量

```env
FREEMIUS_PRODUCT_ID=your_product_id
FREEMIUS_API_KEY=your_api_key
FREEMIUS_SECRET_KEY=your_secret_key
FREEMIUS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_APP_URL=https://www.pathnook.com
```

## 7.3 创建 Freemius 实例

`src/lib/freemius.ts`

```ts
import { Freemius } from '@freemius/sdk';

export const freemius = new Freemius({
  productId: process.env.FREEMIUS_PRODUCT_ID!,
  apiKey: process.env.FREEMIUS_API_KEY!,
  secretKey: process.env.FREEMIUS_SECRET_KEY!,
  publicKey: process.env.FREEMIUS_PUBLIC_KEY!,
});
```

## 7.4 本地数据库表设计

最小可用表建议：

```prisma
model UserFsEntitlement {
  id           String   @id @default(cuid())
  userId       String
  fsLicenseId  String   @unique
  fsPlanId     String
  fsPricingId  String
  fsUserId     String
  type         String
  expiration   DateTime?
  isCanceled   Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

额外建议记录：
- provider = 'freemius'
- lastEventType
- lastSyncedAt
- purchaseSource

---

## 8. 三个必须做的后端入口

这是你最少必须有的三条线：

- `/api/checkout`
- `/api/portal`
- `/webhook`

---

## 8.1 购买处理：`/api/checkout`

职责：
- 处理 Overlay Checkout 的购买结果
- 处理 Hosted Checkout 的 redirect 回调
- 给前端 Pricing Table / Paywall 提供必要能力

### 参考实现

```ts
import { freemius } from '@/lib/freemius';
import { processPurchaseInfo, processRedirect } from '@/lib/user-entitlement';

const processor = freemius.checkout.request.createProcessor({
  onPurchase: processPurchaseInfo,
  proxyUrl: process.env.NEXT_PUBLIC_APP_URL!,
  onRedirect: processRedirect,
});

export { processor as GET, processor as POST };
```

### 你自己的处理函数

`src/lib/user-entitlement.ts`

```ts
import { PurchaseInfo, CheckoutRedirectInfo } from '@freemius/sdk';
import { freemius } from './freemius';
import { prisma } from './prisma';

export async function processPurchaseInfo(fsPurchase: PurchaseInfo): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email: fsPurchase.email },
  });

  if (!user) {
    throw new Error('User not found for purchase email');
  }

  await prisma.userFsEntitlement.upsert({
    where: { fsLicenseId: fsPurchase.licenseId },
    update: {
      fsPlanId: fsPurchase.planId,
      fsPricingId: fsPurchase.pricingId,
      fsUserId: fsPurchase.userId,
      type: fsPurchase.type,
      expiration: fsPurchase.expiration,
      isCanceled: fsPurchase.isCanceled,
    },
    create: {
      userId: user.id,
      fsLicenseId: fsPurchase.licenseId,
      fsPlanId: fsPurchase.planId,
      fsPricingId: fsPurchase.pricingId,
      fsUserId: fsPurchase.userId,
      type: fsPurchase.type,
      expiration: fsPurchase.expiration,
      isCanceled: fsPurchase.isCanceled,
    },
  });
}

export async function processRedirect(info: CheckoutRedirectInfo): Promise<void> {
  const purchaseInfo = await freemius.purchase.retrievePurchase(info.license_id);
  if (purchaseInfo) {
    await processPurchaseInfo(purchaseInfo);
  }
}
```

---

## 8.2 账单入口：`/api/portal`

职责：
- 为 Customer Portal 提供安全签名能力
- 让用户查看订单、发票、订阅、取消订阅、改付款方式

### 参考实现

```ts
import { freemius } from '@/lib/freemius';
import { getFsUser, processPurchaseInfo } from '@/lib/user-entitlement';

const processor = freemius.customerPortal.request.createProcessor({
  getUser: getFsUser,
  portalEndpoint: process.env.NEXT_PUBLIC_APP_URL! + '/api/portal',
  isSandbox: process.env.NODE_ENV !== 'production',
  onRestore: freemius.customerPortal.createRestorer(processPurchaseInfo),
});

export { processor as GET, processor as POST };
```

### 账单页面

`/billing` 页面建议直接做成已登录用户中心：

```tsx
import { CustomerPortal } from '@/react-starter/components/customer-portal';
import AppCheckoutProvider from '@/components/app-checkout-provider';
import { freemius } from '@/lib/freemius';

export default async function BillingPage() {
  const checkout = await freemius.checkout.create({
    user: { email: 'current-user@example.com' },
    isSandbox: process.env.NODE_ENV !== 'production',
  });

  return (
    <AppCheckoutProvider checkout={checkout.serialize()}>
      <CustomerPortal endpoint={process.env.NEXT_PUBLIC_APP_URL! + '/api/portal'} />
    </AppCheckoutProvider>
  );
}
```

---

## 8.3 Webhook：`/webhook`

这是必须做的，不能省。

因为用户浏览器跳转可能失败，但 webhook 仍能把真正的订阅变更同步回来。

### 参考实现

```ts
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-signature') || '';

  const hash = crypto
    .createHmac('sha256', process.env.FREEMIUS_SECRET_KEY!)
    .update(rawBody)
    .digest('hex');

  if (hash !== signature) {
    return new Response(null, { status: 200 });
  }

  const event = JSON.parse(rawBody);

  const fsUser = event?.objects?.user;
  const fsLicense = event?.objects?.license;

  if (fsUser && fsLicense) {
    const localUser = await prisma.user.findUnique({
      where: { email: fsUser.email },
    });

    if (localUser) {
      await prisma.userFsEntitlement.upsert({
        where: { fsLicenseId: String(fsLicense.id) },
        update: {
          fsPlanId: String(fsLicense.plan_id),
          fsPricingId: String(fsLicense.pricing_id),
          fsUserId: String(fsLicense.user_id),
          expiration: fsLicense.expiration ? new Date(fsLicense.expiration) : null,
          isCanceled: !!fsLicense.is_canceled,
        },
        create: {
          userId: localUser.id,
          fsLicenseId: String(fsLicense.id),
          fsPlanId: String(fsLicense.plan_id),
          fsPricingId: String(fsLicense.pricing_id),
          fsUserId: String(fsLicense.user_id),
          type: String(fsLicense.type || 'subscription'),
          expiration: fsLicense.expiration ? new Date(fsLicense.expiration) : null,
          isCanceled: !!fsLicense.is_canceled,
        },
      });
    }
  }

  return new Response(null, { status: 200 });
}
```

### 你最少要处理的事件

建议先监听：
- `license.created`
- `license.updated`
- `license.cancelled`
- `license.expired`
- `license.plan.changed`
- `subscription.created`
- `subscription.canceled`
- `payment.refunded`（如果后台支持对应事件名）

---

## 9. 前端页面要怎么接

## 9.1 最快上线方案

如果你要最快上线，不要一开始就做很多花哨 UI。

建议：
- 先用 Hosted Checkout 或后端生成 Checkout
- Pricing 页面点击后直接发起购买
- Billing 页面提供 Customer Portal

### 推荐前端结构

- `/pricing`：展示套餐 + FAQ
- `/purchase`：单产品购买页（可选）
- `/billing`：账单中心
- `/account`：账号中心

## 9.2 Pricing Table 的建议

每个套餐卡片建议固定显示：
- 套餐名
- 价格
- 计费周期
- 包含功能
- 不包含功能
- Refund Policy 链接
- 购买按钮

不要让用户先付款、后理解规则。

## 9.3 购买按钮前的固定说明

放在按钮上方或下方：

- Secure checkout powered by Freemius
- By purchasing, you agree to the Terms of Service and Privacy Policy
- Subscriptions renew automatically until canceled
- Refunds are subject to the Refund Policy

---

## 10. 审查最容易卡你的点

这是最关键的一节。

### 10.1 审查高风险点

- 网站是半成品
- 价格页逻辑混乱
- 法律页不完整
- 只有营销，没有真实软件功能说明
- 产品价值主要是“人工服务”，而不是软件能力
- 退款政策极端苛刻
- 联系方式不真实
- 上传数据和学生资料处理不透明

### 10.2 你的产品要怎样表达更稳

正确表达：
- AI-powered learning diagnosis software
- Subscription-based student analysis platform
- Upload homework and get structured reports
- Billing, invoices, and subscriptions are handled securely

少用：
- guaranteed score improvement
- perfect diagnosis
- official school-grade evaluation
- no refund under any circumstances

### 10.3 站内必须自洽

以下内容必须前后一致：
- 套餐价格
- 月付 / 年付
- 是否自动续费
- 退款入口
- 联系邮箱
- 数据处理规则
- 第三方支付描述

---

## 11. 上线前测试清单

## 11.1 页面层

- [ ] Footer 全站都能看到法律链接
- [ ] Contact 页面可访问
- [ ] Privacy / Terms / Refund 页面不是模板残页
- [ ] Pricing 页面价格数字无误
- [ ] 页面没有“开发中提示”
- [ ] 页面没有旧支付商文案

## 11.2 功能层

- [ ] 注册可用
- [ ] 登录可用
- [ ] 购买按钮可用
- [ ] Hosted / Overlay Checkout 正常打开
- [ ] Sandbox 下订单能成功回写
- [ ] `/api/checkout` 正常处理
- [ ] `/api/portal` 正常打开 Customer Portal
- [ ] `/webhook` 验签正常
- [ ] 取消订阅后本地 entitlement 正确变化

## 11.3 数据层

- [ ] 订单后能写入本地 entitlement 表
- [ ] fsLicenseId 唯一
- [ ] 用户邮箱映射无误
- [ ] 退款后能撤销权限
- [ ] 计划变更后权限能更新

---

## 12. 最后给你的上线策略

### 最稳版本

第一阶段：
- 补法律页
- 改 Pricing / Contact / Footer
- 接 Hosted Checkout + `/webhook`
- 先不上复杂 portal UI

第二阶段：
- 接 `/api/portal`
- 做 Billing 页面
- 做更漂亮的 Pricing Table

### 为什么这样做

因为你现在最重要的不是“做最漂亮的 Freemius 集成”，而是：

**先把站做成一个可信、可审、可付费、可解释的软件产品。**

---

## 13. 你现在立刻该做的事

今天就做这 10 件：

1. 新建 `support@pathnook.com`
2. 新建 `/legal/privacy`
3. 新建 `/legal/terms`
4. 新建 `/legal/refunds`
5. 新建 `/contact`
6. 删除或隐藏所有未完成功能提示
7. 删除所有 Creem 文案
8. 修正价格页数字与文案
9. 在 Freemius 后台创建 SaaS Product
10. 先把 `/api/checkout` 和 `/webhook` 跑通

---

## 14. 结论

对 Pathnook 来说，Freemius 不是不能上，而是：

**只要你把“法律页 + 信任页 + 购买链路 + webhook”这四件事做好，就已经非常接近可上线状态。**

不要先纠结复杂 portal、花哨 UI、联盟、自动化邮件。

先过审、先收款、先跑通第一笔，再做优化。
