import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  divider?: boolean;
}

export function Section({ children, className, id, divider = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('mx-auto max-w-[1100px] px-6 py-20 md:py-28 lg:px-8', className)}
    >
      {divider && (
        <div
          className="mb-14"
          style={{
            height: '1px',
            background:
              'linear-gradient(to right, var(--color-accent) 0%, var(--color-border) 30%, transparent 100%)',
          }}
        />
      )}
      {children}
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-12 flex items-baseline justify-between md:mb-16', className)}>
      <div>
        <h2 className="font-display text-[2.25rem] font-normal tracking-tight text-theme-fg">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-theme-fg-muted">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
