import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/success', '/cancel', '/download-error'],
    },
    sitemap: 'https://www.bgpromptbook.shop/sitemap.xml',
  };
}
