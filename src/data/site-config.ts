/**
 * Site-wide configuration.
 * Update these values to personalize the portfolio.
 */
export const siteConfig = {
  name: 'Star Olaojo',
  title: 'Star Olaojo — Software Engineer',
  description:
    'Full-stack software engineer building production-grade web and mobile applications. Strong focus on clean architecture, user-centric product development, and shipping at scale.',
  url: 'https://esstar612.github.io/my_portfolio',
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
