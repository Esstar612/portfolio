import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        theme: {
          bg: 'var(--color-bg)',
          'bg-elevated': 'var(--color-bg-elevated)',
          'bg-card': 'var(--color-bg-card)',
          fg: 'var(--color-fg)',
          'fg-muted': 'var(--color-fg-muted)',
          'fg-dim': 'var(--color-fg-dim)',
          accent: 'var(--color-accent)',
          'accent-soft': 'var(--color-accent-soft)',
          border: 'var(--color-border)',
          'border-hover': 'var(--color-border-hover)',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-up': 'fade-up 0.8s ease forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
