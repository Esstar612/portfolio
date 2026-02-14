import type { Metadata, Viewport } from 'next';
import { Sora, Lora, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { siteConfig } from '@/data/site-config';
import '@/styles/globals.css';

/* ============================================
   Fonts
   Lora — elegant editorial serif for display
   Sora — geometric modern sans for body
   JetBrains Mono — crisp monospace for code/tags
   ============================================ */
const fontBody = Sora({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const fontDisplay = Lora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f7fc' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0a0e' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontBody.variable} ${fontDisplay.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-body antialiased">
        <ThemeProvider>
          {/* Ambient glow */}
          <div
            className="pointer-events-none fixed -top-[30%] left-1/2 z-0 h-[80vh] w-screen -translate-x-1/2"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 20%, var(--accent-glow) 0%, transparent 70%)',
            }}
            aria-hidden
          />
          {/* Grain overlay */}
          <div
            className="pointer-events-none fixed inset-0 z-[999] opacity-[0.03] dark:opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '128px',
            }}
            aria-hidden
          />
          <div className="relative z-[1] flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
