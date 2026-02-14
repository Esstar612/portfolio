import { MetadataRoute } from 'next';
import { getAllProjectSlugs } from '@/data/projects';
import { siteConfig } from '@/data/site-config';

/**
 * Auto-generates sitemap.xml at build time.
 * Includes all static pages and dynamic project pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = ['', '/projects', '/about', '/contact'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const projectPages = getAllProjectSlugs().map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
