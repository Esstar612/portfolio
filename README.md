# Portfolio — Software Engineering

A production-ready portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Designed to showcase full-stack web apps and Flutter mobile apps with deep case studies.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** CSS animations (no JS animation library)
- **Dark Mode:** next-themes
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

## Features

- Responsive design (mobile-first)
- Dark mode with system preference detection
- SEO metadata + Open Graph + Twitter cards
- Auto-generated sitemap.xml and robots.txt
- Static generation for project pages
- Contact form with API route
- Clean, modular component architecture
- Lighthouse-optimized

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, theme, header/footer)
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt
│   ├── projects/
│   │   ├── page.tsx        # Projects grid
│   │   └── [slug]/
│   │       └── page.tsx    # Project detail / case study
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   └── api/
│       └── contact/
│           └── route.ts    # Contact form API
├── components/
│   ├── layout/             # Header, Footer, ThemeProvider, ThemeToggle
│   ├── sections/           # Hero, FeaturedProjects, TechStrip, etc.
│   └── ui/                 # Button, Tag, Section, ProjectCard
├── data/
│   ├── site-config.ts      # Site metadata and links
│   ├── projects.ts         # All project data (edit this!)
│   └── tech-stack.ts       # Technology list
├── lib/
│   ├── utils.ts            # cn() class utility
│   └── metadata.ts         # SEO metadata helper
└── styles/
    └── globals.css         # Tailwind + design tokens + animations
```

## Getting Started

### Prerequisites

- Node.js 18.17+ (LTS recommended)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Customization

### 1. Update Personal Info

Edit `src/data/site-config.ts`:

```ts
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Name — Software Engineer',
  links: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    email: 'you@example.com',
    resume: '/resume.pdf',
  },
};
```

### 2. Add Your Projects

Edit `src/data/projects.ts`. Each project includes:

- Metadata (title, tags, links) for the card grid
- Full case study content (problem, solution, architecture, highlights, results)

### 3. Add Project Images

Place screenshots in `public/images/projects/` and reference them in the project data.

### 4. Add Your Resume

Drop your resume PDF at `public/resume.pdf`.

### 5. Update About Page

Edit `src/app/about/page.tsx` with your bio and timeline.

### 6. Wire Up Contact Form

The contact form API route at `src/app/api/contact/route.ts` includes a TODO for email service integration. Recommended services:

- [Resend](https://resend.com) (recommended, great DX)
- [SendGrid](https://sendgrid.com)
- [AWS SES](https://aws.amazon.com/ses/)

## Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Vercel auto-detects Next.js — click Deploy
5. Add environment variables in the Vercel dashboard

### Other Platforms

The site builds to a standard Next.js output. Compatible with:

- Netlify (with `@netlify/plugin-nextjs`)
- AWS Amplify
- Docker (add a `Dockerfile`)
- Self-hosted Node.js server

## Design Decisions

- **Color palette:** Neutral grays with no accent color — lets the work speak for itself
- **Typography:** DM Sans (geometric, modern) + JetBrains Mono (technical)
- **Layout:** Max-width 1100px, generous whitespace, readable line lengths
- **Animations:** CSS-only fade/slide transitions with staggered delays — no heavy JS
- **Dark mode:** System preference + manual toggle, zero flash on load

## Performance

The site is built for high Lighthouse scores:

- Static generation for all pages
- Optimized fonts with `next/font` (zero layout shift)
- No external scripts or heavy dependencies
- Minimal JavaScript bundle
- Image optimization via Next.js `<Image>` component (add when you have real images)

## License

MIT — free to use and modify for your own portfolio.
