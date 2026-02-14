import { Metadata } from 'next';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { ContactForm } from '@/components/sections/contact-form';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = createMetadata({
  title: 'Contact',
  description: 'Get in touch for collaborations, opportunities, or just to say hello.',
  path: '/contact',
});

const contactLinks = [
  { label: 'Email', value: siteConfig.links.email, href: `mailto:${siteConfig.links.email}`, icon: Mail },
  { label: 'GitHub', value: 'github.com/Esstar612', href: siteConfig.links.github, icon: Github },
  { label: 'LinkedIn', value: 'linkedin.com/in/star-olaojo', href: siteConfig.links.linkedin, icon: Linkedin },
];

export default function ContactPage() {
  return (
    <div className="page-enter pt-28 md:pt-32">
      <Section divider>
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-[2.5rem] font-normal tracking-tight text-theme-fg">
            Let&apos;s <em className="text-theme-accent-soft">connect</em>.
          </h1>
          <p className="mt-4 text-lg text-theme-fg-muted">
            Open to software engineering roles, collaborations, and interesting
            conversations. The fastest way to reach me is email.
          </p>

          <div className="mt-10 space-y-4">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-card)',
                }}
              >
                <link.icon className="h-5 w-5 text-theme-accent" />
                <div>
                  <p className="text-sm font-medium text-theme-fg">{link.label}</p>
                  <p className="text-sm text-theme-fg-muted">{link.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.1em] text-theme-fg-dim">
              Or send a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </Section>
    </div>
  );
}
