function normalizeBaseUrl(value: string) {
  return value.trim().replace(/\/$/, '');
}

export function getConfiguredBaseUrl(
  fallback = 'http://127.0.0.1:3000'
) {
  const explicitBaseUrl = process.env.BASE_URL;
  if (explicitBaseUrl) {
    return normalizeBaseUrl(explicitBaseUrl);
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${normalizeBaseUrl(vercelUrl)}`;
  }

  return fallback;
}

export function getRequestBaseUrl(
  request: Request,
  fallback = 'http://127.0.0.1:3000'
) {
  try {
    return normalizeBaseUrl(new URL(request.url).origin);
  } catch {
    return getConfiguredBaseUrl(fallback);
  }
}
