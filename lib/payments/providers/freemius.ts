import type {
  BillingProvider,
  CheckoutCompletionPayload,
  CheckoutRedirectParams,
  CustomerPortalResult,
  HostedCheckoutSession,
  NormalizedWebhookPayload,
} from '../provider';

function getRequiredEnv(name: string) {
  const value = process.env[name];
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function isFreemiusConfigured() {
  return Boolean(
    getRequiredEnv('FREEMIUS_PRODUCT_ID') &&
      getRequiredEnv('FREEMIUS_API_KEY') &&
      getRequiredEnv('FREEMIUS_SECRET_KEY')
  );
}

function getFreemiusUnavailableError(action: string) {
  return new Error(
    `Freemius ${action} is not configured yet for Sprint 26. Set Freemius env vars or switch BILLING_PROVIDER_ACTIVE=creem.`
  );
}

function unsupportedCompletionPayload(): CheckoutCompletionPayload {
  throw getFreemiusUnavailableError('checkout completion');
}

function unsupportedWebhookPayload(): NormalizedWebhookPayload {
  throw getFreemiusUnavailableError('webhook normalization');
}

export const freemiusProvider: BillingProvider = {
  name: 'freemius',
  isConfigured: isFreemiusConfigured,
  async createHostedCheckoutSession(): Promise<HostedCheckoutSession> {
    throw getFreemiusUnavailableError('checkout');
  },
  async createCustomerPortalSession(): Promise<CustomerPortalResult> {
    throw getFreemiusUnavailableError('portal');
  },
  verifyRedirectSignature(
    _params: CheckoutRedirectParams,
    _signature: string | null | undefined
  ) {
    return false;
  },
  async retrieveCheckout(): Promise<unknown> {
    throw getFreemiusUnavailableError('checkout retrieval');
  },
  getCheckoutCompletionPayload() {
    return unsupportedCompletionPayload();
  },
  verifyWebhookSignature(
    _payload: string,
    _signature: string | null | undefined
  ) {
    return false;
  },
  normalizeWebhookPayload() {
    return unsupportedWebhookPayload();
  },
};

export { isFreemiusConfigured };
