# Star Olaojo — Portfolio

Source for my personal portfolio: a Next.js 14 site presenting six projects as
full case studies rather than screenshot galleries — the problem each one
solved, how it was architected, what broke along the way, and what shipped.

**Live site:** https://portfolio-three-rose-44.vercel.app

## Why it's built this way

**Case studies over thumbnails.** A grid of screenshots tells you nothing about
engineering judgment. Each project page carries its problem statement,
architecture broken out by layer, the specific challenges hit, and measurable
results. `src/data/projects.ts` is the single source of truth — cards and case
studies render from the same objects, so they can't drift apart.

**No animation library.** Every transition is CSS — staggered fades and slides
defined in `globals.css`. A portfolio that ships 40 kB of JavaScript to animate
a fade-in is arguing against its own author. First-load JS is ~101 kB total.

**Static by default.** All 16 routes are prerendered at build time, including
the six project pages via `generateStaticParams`. The only dynamic route is the
contact API. There is no client-side data fetching anywhere.

**Neutral palette.** No accent color competing with the project screenshots.

**Theme with no flash.** `next-themes` with system-preference detection,
resolved before paint.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, React Server Components) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS + CSS custom properties for theme tokens |
| Fonts | DM Sans + JetBrains Mono via `next/font` (self-hosted, zero CLS) |
| Icons | Lucide React |
| Email | Resend, via the contact API route |
| Hosting | Vercel |

## Projects featured

| Project | What it is | Stack |
|---|---|---|
| [The Newspaper](https://newspaper-kohl.vercel.app) | Editorial news front page reading ~400 articles/day from NYT and BBC RSS, with markets and weather dashboards — running at $0/month | Next.js, MongoDB Atlas, Vercel Cron, Recharts |
| [Favorite Places](https://favorite-places-app-94adb.web.app) | Cross-platform app for saving places, with Gemini summaries and search-by-meaning ([Android build](https://appetize.io/app/b_3ngeiuwtjjg7qmxhieybnpzq4u)) | Flutter, Dart, Firebase, Cloud Run |
| [Upstate Underdog Rescue](https://upstateunderdog.weebly.com/) | Site for a dog rescue nonprofit | Web |
| [BORED?](https://esstar612.github.io/bored/) | Activity discovery app | JavaScript |
| [Magic Grid](https://github.com/e-oj/Magic-Grid) | Open source contributions to a 3.1K-star, 246K-download layout library; led its React port | JavaScript, React |
| [Travercity](https://esstar612.github.io/travercity-demo/) | Travel discovery interface | JavaScript |

## Architecture

```
src/
├── app/                      # App Router
│   ├── layout.tsx            # Fonts, theme provider, header/footer
│   ├── page.tsx              # Home
│   ├── projects/[slug]/      # Case studies, statically generated
│   ├── sitemap.ts            # Generated from projects.ts
│   ├── robots.ts
│   └── api/contact/route.ts  # Validation + Resend delivery
├── components/
│   ├── layout/               # Header, Footer, ThemeProvider, ThemeToggle
│   ├── sections/             # Hero, FeaturedProjects, TechStrip, ContactForm
│   └── ui/                   # Button, Tag, Section, ProjectCard
├── data/
│   ├── projects.ts           # Source of truth: cards + case studies
│   ├── site-config.ts        # Identity, links, nav, origin resolution
│   └── tech-stack.ts
├── lib/
│   ├── metadata.ts           # Shared SEO/OG builder
│   ├── image-size.ts
│   └── utils.ts              # cn()
└── styles/globals.css        # Theme tokens + animations
```

Adding a project means appending one object to `src/data/projects.ts` and
dropping images in `public/images/projects/<slug>/`. The card grid, the case
study page, the static params, and the sitemap all follow automatically.

## The contact form

`POST /api/contact` validates the submission and delivers it through
[Resend](https://resend.com), with the sender's address set as `reply-to`.

It is deliberately loud about misconfiguration. Without `RESEND_API_KEY` the
route returns **503** and tells the visitor to email directly, instead of
accepting a message that would silently go nowhere. If Resend rejects the
request it returns **502**, logging the API's response server-side rather than
leaking it to the page. Input is trimmed, length-capped, and type-checked; a
honeypot field returns success to bots while delivering nothing.

## Running locally

Requires Node 18.17+.

```bash
npm install
cp .env.example .env.local   # add your Resend key
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run lint
```

### Environment

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | For the contact form | Email delivery. Get one at [resend.com/api-keys](https://resend.com/api-keys) |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical origin. Falls back to Vercel's production URL, then localhost |
| `CONTACT_TO_EMAIL` | No | Overrides the recipient (defaults to the address in `site-config.ts`) |
| `CONTACT_FROM_EMAIL` | No | Overrides the sender. Needs a domain verified in Resend |

Resend's shared `onboarding@resend.dev` sender only delivers to the address
that owns the Resend account, which is fine here — the site owner is the only
recipient. Verifying a domain lifts that restriction.

## License

MIT
