import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';

export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-[1100px] items-center px-6 pb-20 pt-32 lg:px-8">
      <div className="max-w-[50rem]">
        <div className="animate-stagger">
          {/* Eyebrow */}
          <p className="mb-6 flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-theme-accent">
            <span
              className="inline-block h-px w-6"
              style={{ background: 'var(--color-accent)' }}
            />
            Software Engineer
          </p>

          {/* Headline */}
          <h1 className="font-display text-[clamp(3.2rem,6.5vw,5.5rem)] font-normal leading-[1.08] tracking-tight text-theme-fg">
            I craft digital products
            <br />
            that <em className="text-theme-accent-soft">actually</em> ship.
          </h1>

          {/* Sub */}
          <p className="mt-8 max-w-lg text-[1.1rem] font-light leading-[1.75] text-theme-fg-muted">
            Full-stack engineer building production-grade web platforms and
            mobile apps — from Next.js and Node.js to Flutter and AI
            integrations. Clean architecture, measurable impact, product-first
            thinking.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/projects" size="lg">
              View my work
            </Button>
            <Button href={siteConfig.links.resume} variant="secondary" size="lg" external>
              <FileText className="h-4 w-4" />
              Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
