export const SITE_NAME = 'Pathnook';
export const SITE_TITLE = 'Pathnook | AI Learning and Growth System for Families';
export const SITE_DESCRIPTION =
  'Pathnook helps families turn recent learning evidence into diagnosis, evidence, and a 7-day action plan.';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?.trim()
  .replace(/\/+$/, '');

export const SITE_URL = configuredSiteUrl || 'https://pathnook.com';

export const NOINDEX_ROBOTS = {
  index: false,
  follow: false
} as const;

export const MARKETING_EXACT_ROUTES = [
  '/',
  '/pricing',
  '/sample-report',
  '/contact',
  '/help',
  '/faq',
  '/data-deletion',
  '/how-it-works',
  '/for-parents',
  '/for-tutors',
  '/guides'
] as const;

export const MARKETING_PREFIX_ROUTES = ['/features/', '/guides/', '/legal/'] as const;

export const FEATURE_LINKS = [
  { href: '/features/diagnosis', label: 'Diagnosis' },
  { href: '/features/evidence', label: 'Evidence' },
  { href: '/features/7-day-plan', label: '7-Day Plan' },
  { href: '/features/share-with-tutor', label: 'Share with Tutor' },
  { href: '/features/weekly-review', label: 'Weekly Review' }
] as const;

export const GUIDE_LINKS = [
  { href: '/guides/math-homework-diagnosis', label: 'Math Homework Diagnosis' },
  { href: '/guides/weekly-learning-review', label: 'Weekly Learning Review' },
  { href: '/guides/repeated-learning-mistakes', label: 'Repeated Learning Mistakes' },
  { href: '/guides/share-with-a-tutor', label: 'Share with a Tutor' }
] as const;

export const FOOTER_LINKS = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/sample-report', label: 'Sample Report' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/for-parents', label: 'For Parents' },
  { href: '/for-tutors', label: 'For Tutors' },
  { href: '/guides', label: 'Guides' },
  { href: '/faq', label: 'FAQ' },
  { href: '/help', label: 'Help' },
  { href: '/contact', label: 'Contact' },
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/terms', label: 'Terms' },
  { href: '/legal/refunds', label: 'Refunds' },
  { href: '/data-deletion', label: 'Data Deletion' }
] as const;

export const PUBLIC_ROUTES = [
  '/',
  '/pricing',
  '/sample-report',
  '/how-it-works',
  '/for-parents',
  '/for-tutors',
  '/features/diagnosis',
  '/features/evidence',
  '/features/7-day-plan',
  '/features/share-with-tutor',
  '/features/weekly-review',
  '/guides',
  '/guides/math-homework-diagnosis',
  '/guides/weekly-learning-review',
  '/guides/repeated-learning-mistakes',
  '/guides/share-with-a-tutor',
  '/faq',
  '/help',
  '/contact',
  '/legal/privacy',
  '/legal/terms',
  '/legal/refunds',
  '/data-deletion'
] as const;

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function isMarketingPathname(pathname: string) {
  return (
    MARKETING_EXACT_ROUTES.includes(
      pathname as (typeof MARKETING_EXACT_ROUTES)[number]
    ) || MARKETING_PREFIX_ROUTES.some((prefix) => pathname.startsWith(prefix))
  );
}
