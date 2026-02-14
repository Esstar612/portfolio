'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Client-side theme provider wrapping next-themes.
 * Prevents flash of unstyled content with attribute="class".
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
