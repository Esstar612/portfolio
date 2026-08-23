'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { siteConfig } from '@/data/site-config';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl backdrop-saturate-[1.2]"
      style={{
        background: 'color-mix(in srgb, var(--color-bg) 75%, transparent)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1100px] items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="font-display text-xl text-theme-fg transition-colors">
          Star <em className="text-theme-accent-soft">Olaojo</em>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'text-[0.8rem] font-medium uppercase tracking-[0.06em] transition-colors',
                  isActive ? 'text-theme-fg' : 'text-theme-fg-muted hover:text-theme-fg'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-theme-accent px-5 py-2 text-[0.75rem] font-medium uppercase tracking-[0.06em] text-theme-accent transition-all hover:bg-theme-accent hover:text-theme-bg"
          >
            Resume ↗
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-theme-fg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="px-6 pb-6 pt-2 md:hidden"
          style={{
            background: 'var(--color-bg)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              aria-current={pathname === link.href ? 'page' : undefined}
              className={cn(
                'block px-3 py-2.5 text-sm font-medium transition-colors hover:text-theme-fg',
                pathname === link.href ? 'text-theme-fg' : 'text-theme-fg-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block px-3 py-2.5 text-sm font-medium text-theme-accent"
          >
            Resume ↗
          </a>
        </div>
      )}
    </header>
  );
}
