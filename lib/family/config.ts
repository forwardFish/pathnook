export type FileStorageBackend = 'local' | 'blob';

export function isFamilyEduDemoMode() {
  return process.env['FAMILY_EDU_DEMO_MODE'] === '1';
}

export function isFamilyEduDemoAutoAuth() {
  return process.env['FAMILY_EDU_DEMO_AUTO_AUTH'] === '1';
}

export function isRunningOnVercel() {
  return process.env['VERCEL'] === '1' || Boolean(process.env['VERCEL_ENV']);
}

export function getFileStorageBackend(): FileStorageBackend {
  if (process.env['FILE_STORAGE_BACKEND'] === 'blob') {
    return 'blob';
  }

  if (isRunningOnVercel()) {
    return 'blob';
  }

  return 'local';
}

export const FAMILY_EDU_DEMO_MODE = isFamilyEduDemoMode();
export const FAMILY_EDU_DEMO_AUTO_AUTH = isFamilyEduDemoAutoAuth();
export const FAMILY_EDU_FILE_STORAGE_BACKEND = getFileStorageBackend();
export const FAMILY_EDU_SUPPORT_EMAIL =
  process.env.SUPPORT_EMAIL || 'support@example.com';
