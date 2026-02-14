import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';

export function AboutPreview() {
  return (
    <Section divider>
      <div className="grid items-center gap-16 md:grid-cols-2">
        {/* Left — content */}
        <div>
          <h2 className="font-display text-[2.25rem] font-normal leading-[1.15] text-theme-fg">
            Engineer first.
            <br />
            <em className="text-theme-accent-soft">Product thinker</em> always.
          </h2>
          <p className="mt-6 text-[0.95rem] font-light leading-[1.8] text-theme-fg-muted">
            Full-stack software engineer graduating May 2026 from RPI with a
            dual major in Computer Science and IT/Web Sciences. I build and ship
            production-grade web and mobile applications across the entire stack.
          </p>
          <p className="mt-4 text-[0.95rem] font-light leading-[1.8] text-theme-fg-muted">
            This summer, I&apos;m joining Dandy as a software engineering intern
            on the Product Lines team.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="secondary">
              More about me →
            </Button>
          </div>
        </div>

        {/* Right — stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: '5', label: 'Projects' },
            { value: '3.1K', label: 'GH Stars' },
            { value: '246K', label: 'Downloads' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 text-center transition-all duration-300"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <span className="font-display text-[1.8rem] text-theme-accent-soft">
                {stat.value}
              </span>
              <span className="mt-1 block text-[0.65rem] font-medium uppercase tracking-[0.1em] text-theme-fg-dim">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
