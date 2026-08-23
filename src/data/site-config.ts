/**
 * Resolves the public origin the site is served from.
 *
 * Canonical URLs, Open Graph tags, robots.txt and the sitemap are all built
 * from this, so it has to be the real deployed origin — not a hardcoded guess.
 *   1. NEXT_PUBLIC_SITE_URL — set this once a custom domain is attached.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel at build time, so
 *      production deploys get the right domain with no configuration.
 *   3. localhost — local development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return 'http://localhost:3000';
}

/**
 * Site-wide configuration.
 * Update these values to personalize the portfolio.
 */
export const siteConfig = {
  name: 'Star Olaojo',
  title: 'Star Olaojo — Software Engineer',
  description:
    'Full-stack software engineer building production-grade web and mobile applications. Strong focus on clean architecture, user-centric product development, and shipping at scale.',
  url: resolveSiteUrl(),
  ogImage: '/images/og.png',
  links: {
    github: 'https://github.com/Esstar612',
    linkedin: 'https://linkedin.com/in/star-olaojo',
    email: 'esstar612@gmail.com',
    resume: '/resume.pdf',
  },
  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
