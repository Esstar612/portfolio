import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:py-12 lg:px-8">
        <p className="text-[0.75rem] text-theme-fg-dim">
          &copy; {currentYear} {siteConfig.name}
        </p>

        <nav className="flex items-center gap-6">
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.78rem] text-theme-fg-dim transition-colors hover:text-theme-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-fg-dim transition-colors hover:text-theme-accent"
            aria-label="GitHub"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-fg-dim transition-colors hover:text-theme-accent"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="text-theme-fg-dim transition-colors hover:text-theme-accent"
            aria-label="Email"
          >
            <Mail className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
