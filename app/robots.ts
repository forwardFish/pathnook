import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/pricing',
          '/sample-report',
          '/how-it-works',
          '/for-parents',
          '/for-tutors',
          '/features/',
          '/guides/',
          '/faq',
          '/help',
          '/contact',
          '/legal/',
          '/data-deletion'
        ],
        disallow: [
          '/dashboard/',
          '/admin/',
          '/api/',
          '/share/',
          '/sign-in',
          '/sign-up',
          '/webhook/'
        ]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
