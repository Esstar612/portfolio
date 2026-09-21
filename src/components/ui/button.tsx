import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-theme-accent text-theme-bg hover:bg-theme-accent-soft shadow-sm',
  secondary:
    'border text-theme-fg-muted hover:text-theme-fg hover:border-theme-fg-dim',
  ghost: 'text-theme-fg-muted hover:text-theme-fg',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
};

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  external = false,
  className,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const styles = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold font-body tracking-wide transition-all duration-300',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent',
    variantStyles[variant],
    sizeStyles[size],
    variant === 'secondary' && 'border-theme-border-hover',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  if (href) {
    // External targets bypass the router: some are other origins, and some are
    // static files under /public that have no route for Next to prefetch.
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  );
}
