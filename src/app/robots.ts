import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The Cathedral prototype is a design artifact, not the parish's real
      // site. Its pages carry the Cathedral's name and a donation flow, so
      // they stay out of search results where they could be mistaken for it.
      disallow: '/cathedral-demo/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
