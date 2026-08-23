import { techStack } from '@/data/tech-stack';

export function TechStrip() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-16 text-center lg:px-8">
      <div
        className="mb-10"
        style={{
          height: '1px',
          background:
            'linear-gradient(to right, var(--color-accent) 0%, var(--color-border) 30%, transparent 100%)',
        }}
      />
      <p className="mb-6 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-theme-fg-dim">
        Technologies I work with
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        {techStack.map((tech) => (
          <span
            key={tech.name}
            className="chip rounded-full px-4 py-2 text-[0.78rem] font-normal text-theme-fg-muted hover:text-theme-accent"
          >
            {tech.name}
          </span>
        ))}
      </div>
    </section>
  );
}
