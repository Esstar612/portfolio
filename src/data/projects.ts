/**
 * Project data — the single source of truth for all portfolio projects.
 * Each project includes metadata for cards AND full case study content.
 */

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  thumbnail: string;
  featured: boolean;
  year: string;
  links: {
    live?: string;
    /** Secondary runnable build — e.g. an emulator hosting an Android APK. */
    androidDemo?: string;
    github?: string;
    caseStudy?: string;
  };
  // Case study fields
  problem: string;
  solution: string;
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    infrastructure: string;
  };
  highlights: string[];
  challenges: string;
  results: string;
  images: string[];
}

export const projects: Project[] = [
  {
    slug: 'the-newspaper',
    title: 'The Newspaper',
    tagline: 'An editorial front page for news, markets and weather — built to survive its own data providers.',
    description:
      'A news platform that reads eleven per-section NYT and BBC RSS feeds daily, pairs them with a markets watchlist and a weather dashboard, and is engineered so a dead feed or a blocked API degrades visibly instead of quietly emptying the site — all inside free tiers at $0/month.',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'RSS', 'Recharts', 'Vercel', 'React'],
    thumbnail: '/images/projects/newspaper/front-page.jpg',
    featured: true,
    year: '2026',
    links: {
      live: 'https://newspaper-kohl.vercel.app',
      github: 'https://github.com/Esstar612/newspaper',
    },
    problem:
      'Staying informed means moving between a news site, a markets app and a weather app. Building one place that does all three sounds simple until the data providers get in the way. NewsAPI\'s free tier rejects requests from deployed origins, so it contributed nothing in production while appearing to work locally. The NYT API allows five requests a minute and answers overflow with HTTP 200 and a fault body, so failures were indistinguishable from empty results. The market data provider permits one active IP per account and states that serverless platforms are unsupported — which is exactly what this runs on.',
    solution:
      'The Newspaper reads eleven per-section RSS feeds from the New York Times and the BBC: keyless, unmetered, and where the feed requested is the category, so nothing has to be inferred. Roughly 450 articles arrive daily and deduplicate to ~400 unique, laid out as a front page — a lead story, a feature grid, then an "In brief" column set — rather than a uniform grid of cards. The markets page serves its price chart from MongoDB instead of a live API, so it keeps working through provider outages, and the weather dashboard adds Recharts visualisations over OpenWeatherMap. Full-text search, cursor-based pagination, and light and dark themes throughout.',
    architecture: {
      frontend: 'Next.js 16 with the App Router and React Server Components, TypeScript throughout, Tailwind CSS on a real type scale. Newsreader for serif headlines over Geist for the sans UI, with three article weights — lead, feature, and a compact "In brief" set — so a page reads as a front page rather than a grid. Every colour routed through CSS custom properties, with light and dark themes that follow the OS by default and remember an explicit choice. All text clears WCAG AA contrast in both themes; tabs are keyboard-navigable, focus rings visible, and prefers-reduced-motion is respected. Recharts for the weather and price visualisations.',
      backend: 'Next.js API Routes as serverless functions. Three daily Vercel cron jobs: RSS ingestion at 00:00 UTC, which fetches eleven feeds in parallel and returns per-feed counts so a dead feed is visible rather than silently empty; price-history refresh at 02:00 UTC, deliberately sequential so all ten calls leave one invocation on one outbound IP; and a guarded retention cleanup at 03:00 UTC. Quotes are cached at three levels — a five-minute server-side route cache matching the provider\'s block window, a localStorage cache shared by the front-page ticker and the watchlist, and a stale-payload fallback that shows last known prices during an outage.',
      database: 'MongoDB Atlas with Mongoose. Articles carry a tags array of every section they were ingested under, so a story appearing in two feeds keeps both instead of one overwriting the other. Unique index on url for deduplication, plus compound indexes on publishedAt, source + publishedAt, and tags + publishedAt — the last of which the category tabs would otherwise scan the whole collection for. A CandleSeries document per symbol holds about 250 daily closes, so 1M/3M/6M/1Y are slices of one document rather than four separate lookups.',
      infrastructure: 'Vercel with automatic builds from GitHub and three cron schedules declared in vercel.json. MongoDB Atlas free tier. NYT and BBC RSS (keyless, unmetered), OpenWeatherMap for weather, forecast and both forward and reverse geocoding, Market Data for quotes and daily candles, Frankfurter for currency conversion. Every service stays inside its free allowance: bulk quotes bill at zero credits, and the five-minute cache caps upstream requests regardless of traffic. Total monthly cost: $0.',
    },
    highlights: [
      'Replaced a news-API pipeline with eleven per-section RSS feeds after the API version proved unfixable in production — NewsAPI rejects deployed origins, and the NYT API returns rate-limit failures as HTTP 200 — gaining a keyless, unmetered source where the feed requested is the category',
      'Moved stock price history into MongoDB behind a daily sequential cron, so ten upstream calls leave one serverless invocation on one IP, satisfying a provider that permits one active IP and does not support serverless — every chart read is then a local database query',
      'Built retention cleanup that can refuse to run: it holds if nothing has been ingested for 48 hours and never drops below a 120-article floor, because cron delivery is best-effort and a naive age cutoff would empty the database within a week of ingestion breaking',
      'Implemented compound-cursor pagination over publishedAt + _id so ties at a page boundary neither skip nor repeat articles, with full-text search scoped to the active section and section state held in the URL so a refresh or shared link lands in the same place',
      'Shipped light and dark themes on CSS custom properties with all text clearing WCAG AA contrast in both, keyboard-navigable tabs, visible focus rings, and prefers-reduced-motion support',
    ],
    challenges:
      'Almost every interesting decision here came from a provider constraint rather than a preference. The original build used NewsAPI and the NYT Top Stories API, and both failed in ways that looked like success: NewsAPI silently returned nothing from a deployed origin, and the NYT API answered rate-limit overflow with HTTP 200 and a fault body. Per-section RSS fixed both and removed the category-guessing the API version had needed. The market data provider was the opposite problem — one active IP per account and serverless explicitly unsupported — so fetching history per request meant forty upstream calls from scattered IPs. Storing a year of closes in MongoDB behind one daily sequential cron cut that to ten calls from one IP and made the chart immune to provider outages. The subtlest issue was retention: cleanup and ingestion are separate best-effort jobs, so cleanup had to be able to decide not to run at all.',
    results:
      'Live in production with ~400 unique articles a day across seven sections, a ten-symbol watchlist with conversion into 30+ currencies, and a five-day weather dashboard with geolocation. When the quote provider blocks a request the page degrades to last known prices and says so, while the price chart keeps working because its data is local. Runs entirely inside free tiers at $0/month.',
    images: [
      '/images/projects/newspaper/front-page.jpg',
      '/images/projects/newspaper/news-page.jpg',
      '/images/projects/newspaper/stocks-page.jpg',
      '/images/projects/newspaper/weather-page.jpg',
    ],
  },
  {
    slug: 'favorite-places',
    title: 'Favorite Places',
    tagline: 'Cross-platform app for saving places, with AI that summarises your notes and searches by meaning.',
    description:
      'One Flutter codebase shipping to Android and the browser, backed by an Express API on Cloud Run and Firebase. Google Gemini turns freeform notes into structured summaries, suggests tags from a place\'s photo, and answers natural-language searches like "somewhere quiet to work". Try it as a guest — no sign-up — in a private sandbox pre-loaded with sample places.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Gemini AI', 'Node.js', 'Cloud Run'],
    thumbnail: '/images/projects/favorite-places/thumbnail-mockup.jpg',
    featured: true,
    year: '2026',
    links: {
      live: 'https://favorite-places-app-94adb.web.app',
      androidDemo: 'https://appetize.io/app/b_3ngeiuwtjjg7qmxhieybnpzq4u',
      github: 'https://github.com/Esstar612/FavoritePlaces',
    },
    problem:
      'People visit places worth remembering and end up with the context scattered — photos in the camera roll, notes in a notes app, the location bookmarked somewhere else. What you actually want back months later is not the address but why you liked it, and nobody writes that down in a form they can retrieve. Keyword search does not help either: search "art" across your own saved places and you match T-art-ine Bakery long before you find the museum.',
    solution:
      'Favorite Places stores places with photos, notes, ratings, tags and categories, synced live through Firestore. Gemini does the retrieval work keyword search cannot: Smart Summary rewrites raw notes into why you liked it, tips, and best time to go; tag suggestions come from the place name and category, plus Cloud Vision analysis when a photo exists; and natural-language search matches on meaning, so "art" returns SFMOMA rather than Tartine. One Flutter codebase ships to Android and the web, and guest mode gives any visitor an isolated sandbox seeded with sample places — no sign-up, no email.',
    architecture: {
      frontend: 'Flutter 3.38 and Dart 3.10 with Riverpod for state and Material 3, shipping to Android and the browser from one codebase. Cloud Firestore snapshot listeners keep data live. Google Maps for the picker, with Places autocomplete and an initial camera on the user\'s location. Places with no photo fall back to a static map of where they are rather than a grey placeholder. Light and dark themes persisted per account. 25 unit tests cover model parsing, cached-summary invalidation, and the display helpers that once crashed the profile screen on an empty display name.',
      backend: 'Node.js 20 on Express, deployed to Cloud Run as an Alpine container. It exists for more than proxying the model: it verifies a Firebase ID token on every /ai, /user and /maps route, rate-limits per IP with trust proxy set so Cloud Run\'s load balancer does not collapse every caller into one bucket, and holds the Gemini and Geocoding keys server-side — the Geocoding API rejects HTTP-referrer-restricted keys outright, so a browser cannot call it safely at all. Helmet headers, a CORS allowlist, input validation and payload caps.',
      database: 'Cloud Firestore for places, profiles, settings and stats, with Firebase Storage for photos and a composite index backing the places query. Security rules are versioned in the repo and scope every document and file to its owner — including on create, so a place cannot be written under someone else\'s ID. Guest accounts get an isolated sandbox seeded with sample places and deleted on sign-out. Any user can export everything as JSON or delete the account and all its data.',
      infrastructure: 'GitHub Actions builds and deploys the web app to Firebase Hosting and the Android APK to Appetize on every push to main, running the Flutter tests first. Cloud Run for the API, Secret Manager for keys. Four separate Google Maps keys, because a Google API key carries only one application restriction and the app calls Maps from four surfaces with different identities. Everything sits inside free tiers.',
    },
    highlights: [
      'Built natural-language search on Gemini that matches meaning rather than substrings — the query "art" returns SFMOMA instead of T-art-ine Bakery — alongside Smart Summaries that turn freeform notes into why I liked it, tips and best time to go, cached so revisiting a place does not re-run the model',
      'Shipped one Flutter codebase to Android and the browser, with a guest mode that hands any visitor a private sandbox seeded with sample places, making the web build a demo anyone can try without an account',
      'Designed the Cloud Run backend around key custody rather than convenience: Gemini and Geocoding keys never reach a client, and the client-side Maps keys are each scoped to a single surface because a Google key carries only one application restriction',
      'Wrote Firestore and Storage rules that scope every document and file to its owner including on create, and shipped JSON data export plus full account deletion alongside them',
      'Automated CI/CD through GitHub Actions — web to Firebase Hosting, APK to Appetize on every push to main — gated by 25 Flutter unit tests, all inside free tiers at $0/month',
    ],
    challenges:
      'The API key model was the most unexpected constraint. A Google API key can carry only one application restriction, and this app calls Maps from four places with different identities: the Android SDK, the web build, REST calls from the phone, and server-side geocoding. That forced four separately scoped keys — and the mobile REST key is the one that genuinely cannot be locked to an application, because REST calls from a phone carry neither a package identity nor a referrer for a key to be restricted against, so it is limited by API and quota cap instead. Choosing a demo surface was the other trade-off. Appetize\'s free tier caps sessions at three minutes with one viewer at a time, and its emulated device cannot run the Google Maps SDK, so "Select on Map" fails there. The web build became the primary demo and the Android build stayed on as a secondary link.',
    results:
      'Live on Firebase Hosting with a no-sign-up guest demo, plus the Android build on Appetize. Full CRUD with live Firestore sync, three Gemini-backed AI features, email/Google/guest auth, per-account themes, JSON export and account deletion. 25 unit tests run in CI before every deploy. Runs inside free tiers at $0/month.',
    images: [
      '/images/projects/favorite-places/places-list.jpg',
      '/images/projects/favorite-places/ai-search.jpg',
      '/images/projects/favorite-places/place-detail.jpg',
      '/images/projects/favorite-places/place-detail-ai.jpg',
      '/images/projects/favorite-places/add-place.jpg',
      '/images/projects/favorite-places/map-picker.jpg',
      '/images/projects/favorite-places/profile.jpg',
    ],
  },
  {
    slug: 'upstate-underdog-rescue',
    title: 'Upstate Underdog Rescue',
    tagline: 'Research-driven nonprofit website redesign improving usability and donation intent.',
    description:
      'Led an end-to-end redesign of a nonprofit dog rescue website using the Double Diamond UX framework. Conducted user research, A/B testing, and AI sentiment analysis to deliver a data-driven redesign that improved trust, usability, and donation confidence.',
    tags: ['UX Research', 'A/B Testing', 'Weebly', 'User Testing', 'HCI'],
    thumbnail: '/images/projects/uur/thumbnail.png',
    featured: true,
    year: '2026',
    links: {
      live: 'https://upstateunderdog.weebly.com/',
    },
    problem:
      'Upstate Underdog Rescue\'s website suffered from buried information, broken navigation links, and unfinished features (shop, events) that created a disconnect between user intent and available actions. The site failed to convert visitors into adopters or donors — all adoptions happened through offline founder connections rather than the website.',
    solution:
      'Following the Double Diamond framework, we redesigned the site architecture around four core pages (Home, About, Adopt, Donate) with clear CTAs, emotionally engaging superhero branding, and streamlined donation flows. Design decisions were validated through user personas, card sorting, comparative analysis, stakeholder interviews, A/B testing, and AI sentiment analysis.',
    architecture: {
      frontend: 'Rebuilt on Weebly to match the client\'s existing environment for easy self-management post-launch. Custom color palette (Underdog Blue, Braveheart Blue, Forever Friend Pink) with Bree Serif and Poppins typography. Responsive design with clear visual hierarchy.',
      backend: 'Weebly CMS with embedded Google Forms for adoption applications and PayPal/credit card integration for donations. Calendar widget for events. Contact form with direct email routing.',
      database: 'N/A — Content managed through Weebly CMS. Adoption applications collected via Google Forms with automatic spreadsheet logging for the client.',
      infrastructure: 'Hosted on Weebly at $13/month ($100/year). Google Forms for data collection. PayPal for donation processing. Social media integration (Instagram, Facebook). Best Friends Animal Society partner badge for credibility.',
    },
    highlights: [
      'Conducted mixed-methods UX research using the Double Diamond framework: user personas, card sorting, comparative analysis, founder interviews, A/B testing, and AI sentiment analysis',
      'Redesign achieved +0.80 mean sentiment polarity (vs -0.20 for original) — 80% positive responses compared to 20% for the old site',
      'Improved all Likert-scale metrics: ease of use (3.80→4.75), trustworthiness (3.00→4.00), and donation confidence (2.20→3.60)',
      'Validated design decisions through quantitative A/B testing: 80% of redesign users expressed willingness to donate (vs 40% on original site)',
    ],
    challenges:
      'The core tension was designing a site that screens potential adopters (UUR\'s adoption process is rigorous) without alienating non-adopters who might still donate or volunteer. We resolved this through the "Every Dog Has A Superpower" framing — the superhero branding makes browsing dogs feel inviting rather than transactional, while clear CTAs for Adopt, Donate, and Volunteer give every user type a path forward. A practical challenge was the small sample size (n=5 per condition) for A/B testing, which limited statistical power. We compensated by triangulating across sentiment analysis, Likert scales, and qualitative thematic analysis.',
    results:
      'Delivered a production-ready Weebly site with measurable UX improvements across every tested dimension. Donation confidence increased by 64% (2.20→3.60). Qualitative feedback shifted from "confusing" and "outdated" to "intuitive," "smooth," and "visually appealing." Site designed for client self-management at $100/year.',
    images: [
      '/images/projects/uur/home.png',
      '/images/projects/uur/about.png',
      '/images/projects/uur/donate.png',
      '/images/projects/uur/events.png',
      '/images/projects/uur/get-involved.png',
    ],
  },
  {
    slug: 'bored',
    title: 'BORED?',
    tagline: 'Personalized activity recommendation platform with Spotify, AI chatbot, and location-aware trip planning.',
    description:
      'A full-stack web application that combats boredom with personalized recommendations across indoor and outdoor activities. Users select interests during onboarding, then explore movies, TV, trivia, games, and Spotify-powered music indoors — or discover outdoor venues via an AI chatbot powered by Google Gemini, FourSquare, and Google Maps with auto-generated trip itineraries.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Spotify API', 'Google Maps', 'Google Gemini AI', 'FourSquare API', 'TMDB API', 'JWT Auth'],
    thumbnail: '/images/projects/bored/thumbnail.png',
    featured: false,
    year: '2024',
    links: {
      live: 'https://esstar612.github.io/bored/',
    },
    problem:
      'When people are bored, they waste time deciding what to do rather than actually doing something. Generic recommendation engines don\'t account for personal taste, current weather, or location. Users end up cycling through the same activities instead of discovering new ones tailored to their interests and context.',
    solution:
      'BORED? combines multiple data sources to deliver personalized recommendations across indoor and outdoor activities. The app follows a deliberate flow: users register, select their interests (Outdoors, Technology, Food & Drink, Art, etc.), and land on a homepage with weather-aware greetings and quick-access category cards. Indoor activities include six categories — Movies, TV, Trivia, Games, Spotify, and Random — each with its own interactive modal. Spotify OAuth integration analyzes listening history to seed 20 personalized song recommendations with in-app playback and like-to-library functionality. Outdoor activities use a split-panel layout (55% activity cards, 45% chatbot panel). When a user clicks Explore on any outdoor category, the chatbot responds with place recommendations pulled from FourSquare Places API within a 50km radius, filtered through Google Gemini AI based on current weather conditions. Users can favorite places directly from the chat, and the Create Plan feature auto-generates itineraries from favorited places, showing them on a Google Maps embed with driving distance and travel time calculated via Google Distance Matrix API.',
    architecture: {
      frontend: 'React with Bootstrap for responsive design. Axios for API communication. MUI and MUI Joy components for cards, buttons, modals, and navigation. Interest selection onboarding flow that personalizes the experience from the first interaction. Split-panel outdoor layout with 55/45 ratio — activity cards on the left, tabbed chatbot panel on the right.',
      backend: 'Node.js with Express.js handling REST API endpoints. JWT authentication with httpOnly cookies. Bcrypt password hashing. Spotify OAuth 2.0 flow for accessing user listening data. Integration with TMDB, FourSquare, OpenTriviaDB, BoredAPI, and Google Gemini AI. All outdoor recommendations filtered by current weather conditions before being served to the client.',
      database: 'MongoDB for user profiles, interests, liked places, and session data. User schema stores preferences, interests array, and hashed credentials. Liked places persist for return visits and feed into the Create Plan trip-planning feature.',
      infrastructure: 'Google Maps JavaScript API with Distance Matrix for travel time calculations. Google Gemini AI for intelligent outdoor place suggestions based on weather conditions. FourSquare Places API for venue discovery within 50km radius. Spotify Web API for music recommendations seeded from user\'s top tracks and artists. TMDB API for movie/TV suggestions. OpenTriviaDB for trivia questions.',
    },
    highlights: [
      'Built Spotify OAuth 2.0 integration that reads user\'s top 3 tracks and top 2 artists as seeds to generate 20 personalized song recommendations — with in-app playback and like-to-library functionality. Token persistence handled via httpOnly cookies with backend refresh logic.',
      'Implemented weather-aware outdoor recommendations using Gemini AI to suggest the best venues from FourSquare results based on current conditions — e.g. prioritizing indoor-friendly venues on rainy days.',
      'Designed a dual-panel outdoor experience with a tabbed chatbot (General / Create Plan / Liked Places). Clicking Explore on any outdoor card triggers the chatbot to fetch and display place cards with one-click favoriting.',
      'Created the Create Plan feature that takes favorited places, displays them with reasoning for each suggestion, embeds a Google Map with markers, and calculates driving distance and duration via Distance Matrix API.',
      'Built six distinct indoor activity modals — movie/TV recommendations with Save/Skip actions, interactive trivia with real-time scoring, Spotify music grid with play/favorite controls, and a random activity generator with category labels and re-roll.',
      'Designed JWT authentication system with httpOnly cookies, Bcrypt hashing, and express-validator middleware for secure user registration and session management.',
    ],
    challenges:
      'Orchestrating 6+ external APIs (Spotify, TMDB, FourSquare, Google Maps, OpenTriviaDB, BoredAPI, Gemini) with different auth patterns, rate limits, and response formats was the central challenge. Each API required its own error handling, retry logic, and response normalization. Spotify\'s OAuth flow was particularly complex — the auth → redirect → cookie → token refresh cycle had to work seamlessly across frontend and backend. Using httpOnly cookies specifically prevented XSS exposure of access tokens while maintaining a smooth UX. The outdoor chatbot panel required careful state management — Explore clicks from the left panel needed to update the right panel\'s chat in real-time, while maintaining separate state for the General, Create Plan, and Liked Places tabs without losing context when switching between them.',
    results:
      'Delivered a fully functional platform integrating 6+ external APIs with user authentication, personalized onboarding, and multi-source recommendations. Team project (6 members) completed on schedule with core features including Spotify integration, movie/TV recommendations, interactive trivia, outdoor venue discovery with AI-powered suggestions, trip planning with map visualization, and user profile management.',
    images: [
      '/images/projects/bored/outdoor.png',
      '/images/projects/bored/discover.png',
      '/images/projects/bored/home.png',
      '/images/projects/bored/profile.png',
      '/images/projects/bored/login.png',
    ],
  },
  {
    slug: 'magic-grid',
    title: 'Magic Grid (Open Source)',
    tagline: 'Contributing to a 3.1K+ star JavaScript layout library with 246K+ downloads.',
    description:
      'Designed and shipped features for Magic Grid, a popular open-source dynamic grid layout library. Led development of use-magic-grid, the official React port, building reusable abstractions for seamless React integration.',
    tags: ['JavaScript', 'TypeScript', 'React', 'Open Source', 'npm'],
    thumbnail: '/images/projects/magic-grid/thumbnail.png',
    featured: false,
    year: '2024',
    links: {
      github: 'https://github.com/e-oj/Magic-Grid',
    },
    problem:
      'Magic Grid is a widely-used JavaScript library for dynamic grid layouts, but it lacked a first-class React integration. Developers using React had to write custom wrapper logic, leading to inconsistent implementations and integration bugs across the community.',
    solution:
      'Led development of use-magic-grid, the official React port of Magic Grid. Designed a clean, hook-based API that encapsulates grid initialization, resize handling, and content update detection — enabling React developers to integrate dynamic grids with a single import and minimal configuration.',
    architecture: {
      frontend: 'Pure JavaScript/TypeScript library with zero dependencies. React port built as a custom hook (useMagicGrid) with ref-based DOM integration. Published as a standalone npm package.',
      backend: 'N/A — client-side library. Build pipeline uses Rollup for tree-shakeable ESM and CJS bundles.',
      database: 'N/A — stateless layout library.',
      infrastructure: 'Published on npm with semantic versioning. GitHub repository with CI for automated testing. Comprehensive README and API documentation.',
    },
    highlights: [
      'Designed and shipped features for a library with 3.1K+ GitHub stars and 246K+ npm downloads, focusing on clean, extensible API design',
      'Led development of use-magic-grid, the official React port, building reusable hook-based abstractions for seamless integration',
      'Conducted code reviews, resolved community issues, and facilitated team collaboration to deliver features on schedule',
      'Maintained backward compatibility while extending the API surface for new use cases',
    ],
    challenges:
      'The React port needed to handle dynamic content changes (images loading, elements added/removed) without requiring manual re-initialization. I designed the hook to use a MutationObserver internally, automatically detecting DOM changes and repositioning grid items. The challenge was debouncing these updates efficiently — too aggressive and the grid jitters on every render; too passive and newly loaded content appears misaligned.',
    results:
      '3.1K+ GitHub stars and 246K+ npm downloads across the ecosystem. React port adopted by multiple projects. Active community with ongoing issue resolution and feature development.',
    images: [
      '/images/projects/magic-grid/thumbnail.png',
      '/images/projects/magic-grid/responsive.png',
    ],
  },
  {
    slug: 'travercity',
    title: 'Travercity',
    tagline: 'Full-stack travel information platform with country search, Yelp-powered discovery, and community blogs.',
    description:
      'A full-stack travel information website where users can search countries, explore activities via Yelp API, read community blog posts, and plan trips — built with PHP, MySQL, JavaScript, and third-party APIs on a traditional LAMP stack.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Yelp API', 'Google Maps', 'HTML/CSS'],
    thumbnail: '/images/projects/travercity/thumbnail.png',
    featured: false,
    year: '2023',
    links: {
      live: 'https://esstar612.github.io/travercity-demo/',
    },
    problem:
      'Planning international travel requires piecing together information from dozens of sources — country guides, restaurant reviews, activity recommendations, and fellow travelers\' experiences. No single platform combines structured country information with real local business data and a community layer for sharing first-hand travel insights.',
    solution:
      'Travercity is a one-stop travel information platform with four integrated systems: a country search and discovery engine backed by a normalized MySQL database, Yelp Fusion API integration that surfaces real local businesses (restaurants, hotels, landmarks) for each country, a community blog system where users can create and comment on country-specific travel posts, and a personal travel log for journaling trips with photos. Session-based authentication ties everything together with personalized profiles.',
    architecture: {
      frontend: 'Vanilla HTML, CSS, and JavaScript with dynamic DOM manipulation. Shared header and footer components injected via JavaScript (HeaderAndFooter.js). Custom Poppins font with a purple accent theme. CSS organized per section for modularity.',
      backend: 'PHP handles routing, session-based authentication, database queries, and server-side rendering. Helper files (showContentFunctions.php, updateNavBar.php) modularize repeated logic. Country info pages stored as static HTML fragments loaded dynamically — adding a new country requires no code changes.',
      database: 'MySQL with a normalized relational schema. Countries linked to activities and blog posts via foreign keys. User accounts linked to posts, comments, and travel logs. Password hashing for credential security.',
      infrastructure: 'Traditional LAMP stack (Linux, Apache, MySQL, PHP). Yelp Fusion API called server-side via PHP with results passed to the frontend via AJAX. Google Maps API embedded for location exploration.',
    },
    highlights: [
      'Designed a normalized relational database schema linking users, countries, activities, blog posts, comments, and travel logs with proper foreign key relationships',
      'Integrated Yelp Fusion API server-side to merge real business data (restaurants, hotels, landmarks) with custom country content — results fetched via AJAX for dynamic page updates',
      'Built a full session-based authentication system with signup, login, profile management, editable user fields (name, pronouns, home country), and secure password hashing',
      'Architected a modular content system where country detail pages load HTML fragments dynamically — new countries can be added without touching application code',
      'Implemented a community blog system with per-country post creation, image uploads, and threaded comments',
    ],
    challenges:
      'This was a team project with multiple contributors, which meant coordinating across database design, frontend development, and PHP backend work simultaneously. The biggest technical challenge was the Yelp API integration — results needed to be fetched server-side (to protect API keys), cached appropriately, and then served to the frontend via AJAX without blocking page loads. The content architecture also required careful planning: country pages needed to be data-driven enough to scale, but rich enough to feel hand-crafted, which led to the HTML fragment approach where each country\'s content lives in modular files loaded dynamically by the PHP backend.',
    results:
      'Delivered a fully functional multi-page travel platform with user authentication, country search across a normalized database, real Yelp business data integration, community blog posts with comments, and personal travel logging. Successfully completed as a collaborative team project with clear separation of responsibilities across database, frontend, and backend.',
    images: [
      '/images/projects/travercity/country-detail.png',
      '/images/projects/travercity/blog.png',
      '/images/projects/travercity/search-results.png',
      '/images/projects/travercity/landing.png',
      '/images/projects/travercity/account.png',
    ],
  },
];

/** Returns only featured projects */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** Find a project by slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Get all project slugs for static generation */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
