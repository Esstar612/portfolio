import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-28">
      <p className="text-7xl font-bold text-theme-fg-dim">404</p>
      <h1 className="mt-4 font-display text-2xl text-theme-fg">Page not found</h1>
      <p className="mt-2 text-sm text-theme-fg-muted">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-8">
        <Button href="/" variant="secondary">Go Home</Button>
      </div>
    </div>
  );
}
