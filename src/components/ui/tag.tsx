import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-medium tracking-wide transition-colors duration-300',
        'border text-theme-accent',
        className
      )}
      style={{
        background: 'var(--accent-glow)',
        borderColor: 'var(--accent-glow)',
      }}
    >
      {children}
    </span>
  );
}
