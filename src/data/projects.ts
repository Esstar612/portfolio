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
    tagline: 'Full-stack news aggregation platform with real-time weather and stock data.',
    description:
      'A modern news aggregation platform pulling from 7+ sources via NewsAPI and NYT API, with interactive weather dashboards, stock market tracking, and automated data pipelines — all running at $0/month.',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Recharts', 'Vercel', 'React'],
    thumbnail: '/images/projects/newspaper/thumbnail.png',
    featured: true,
    year: '2026',
    links: {
      live: 'https://newspaper-kohl.vercel.app',
      github: 'https://github.com/Esstar612/newspaper',
    },
    problem:
      'Staying informed across multiple news sources, weather conditions, and financial markets requires jumping between fragmented apps and websites. Free-tier API constraints make building unified dashboards challenging — most aggregators either hit rate limits or rack up infrastructure costs that kill personal projects.',
    solution:
      'The Newspaper aggregates real-time news from NewsAPI and the New York Times API across 6 categories (~400 articles/day), pairs it with an interactive weather dashboard featuring geolocation and data visualizations, and adds live stock market data with multi-currency conversion. Automated cron jobs handle daily ingestion and cleanup with zero manual maintenance.',
    architecture: {
      frontend: 'Next.js 16 with App Router and React Server Components. TypeScript for type safety throughout. Recharts for interactive data visualizations including temperature bar charts, humidity line graphs, and weather distribution pie charts. Tailwind CSS for responsive utility-first styling.',
      backend: 'Next.js API Routes as serverless functions. Vercel Cron Jobs for automated daily news ingestion (midnight UTC) and database cleanup (3 AM UTC). Smart deduplication via upsert writes prevents duplicate articles across sources.',
      database: 'MongoDB Atlas with Mongoose ODM. Unique indexes on article URLs for deduplication. Composite indexes on source + publishedAt for efficient filtered queries. 7-day rolling retention keeps the database at ~14MB and ~14K articles max.',
      infrastructure: 'Deployed on Vercel with automatic builds from GitHub. MongoDB Atlas free tier for cloud database. All APIs (NewsAPI, NYT, OpenWeatherMap, Market Data) used within free-tier limits. Total monthly cost: $0.',
    },
    highlights: [
      'Engineered a reusable automated data pipeline using Vercel Cron Jobs for daily ingestion with smart deduplication and 7-day rolling retention — zero manual maintenance',
      'Designed interactive weather visualizations (bar, line, pie charts) with geolocation support and city autocomplete using Recharts',
      'Optimized MongoDB indexing strategies to achieve fast queries across ~400 articles/day while staying within free-tier constraints',
      'Architected the entire platform to run at $0/month by strategically balancing performance with free-tier API and infrastructure limits',
    ],
    challenges:
      'The biggest challenge was designing the data pipeline to be both reliable and extensible while respecting free-tier rate limits. NewsAPI allows only 100 requests/day and NYT caps at 500, so every API call needed to count. I built the ingestion pipeline with upsert logic that gracefully handles duplicates and partial failures — if one source times out, the others still process. Adding a new source only requires implementing a simple adapter function. Balancing MongoDB query performance with the free-tier 512MB storage limit required careful index design and the 7-day retention policy.',
    results:
      'Live in production serving ~400 fresh articles daily across 6 categories. Weather dashboard supports global location search with 5-day forecasts. Stock tracker covers major symbols with real-time pricing. Entire platform runs on $0/month infrastructure.',
    images: [
      '/images/projects/newspaper/news-page.png',
      '/images/projects/newspaper/stocks-page.png',
      '/images/projects/newspaper/weather-page.png',
      '/images/projects/newspaper/thumbnail.png',
    ],
  },
  {
    slug: 'favorite-places',
    title: 'Favorite Places',
    tagline: 'AI-powered mobile app for saving and organizing your favorite locations.',
    description:
      'A full-stack cross-platform mobile application built with Flutter and Firebase, featuring Google Gemini AI for intelligent tag suggestions and content summarization, Google Maps integration, and a serverless Node.js backend on Cloud Run.',
    tags: ['Flutter', 'Firebase', 'Node.js', 'Google Gemini AI', 'Cloud Run', 'Dart'],
    thumbnail: '/images/projects/favorite-places/thumbnail-mockup.png',
    featured: true,
    year: '2026',
    links: {
      live: 'https://appetize.io/app/b_3ngeiuwtjjg7qmxhieybnpzq4u',
      github: 'https://github.com/Esstar612/FavoritePlaces',
    },
    problem:
      'People visit memorable places but lack a personal, organized way to catalog them with context — photos, notes, ratings, and location data end up scattered across camera rolls, note apps, and map bookmarks. Existing solutions don\'t offer intelligent organization or help users rediscover what made a place special.',
    solution:
      'Favorite Places lets users save locations with rich metadata — multiple photos, custom categories, ratings, and detailed notes. Google Gemini AI analyzes context to suggest relevant tags and generate intelligent summaries with visit tips. Google Maps integration provides an interactive location picker with address geocoding, and real-time Firebase sync keeps data consistent across devices.',
    architecture: {
      frontend: 'Flutter 3.27+ with Dart 3.6+. Riverpod for reactive, scalable state management. Google Maps Flutter plugin with geocoding for interactive location selection. Material Design 3 with custom theming and dark mode support.',
      backend: 'Node.js 20 with Express.js running on Google Cloud Run (serverless, auto-scaling). Google Gemini 1.5 Flash for AI features (tag suggestions, note summarization). Firebase Admin SDK for token verification. Helmet, CORS, rate limiting, and input validation for security.',
      database: 'Cloud Firestore for real-time NoSQL data sync with offline-first capabilities. Firebase Storage for photo uploads. Firestore security rules enforce user data isolation. All data syncs in real-time across devices.',
      infrastructure: 'Google Cloud Run for serverless backend deployment with Docker. Firebase suite (Auth, Firestore, Storage) for mobile infrastructure. Google Secret Manager for API keys. GitHub Actions CI/CD pipeline with automated Appetize.io deployment. Total cost: $0/month on free tiers.',
    },
    highlights: [
      'Integrated Google Gemini 1.5 Flash AI for intelligent tag suggestions and content summarization — analyzing photos and context to generate relevant metadata',
      'Implemented serverless backend on Cloud Run with Firebase Admin SDK, designing clean service abstractions for authentication, rate limiting (100 req/15 min), and real-time photo storage',
      'Built interactive Google Maps integration with address geocoding, geolocation support, and a favorites filtering system with custom categories',
      'Automated CI/CD pipeline via GitHub Actions with browser-based testing on Appetize.io — achieved $0/month operational costs through strategic free-tier architecture',
    ],
    challenges:
      'The primary challenge was designing the AI integration to feel useful without being intrusive. Gemini API calls needed to be fast enough for inline suggestions but not so aggressive that they burned through rate limits. I implemented a debounced request pattern that batches context (place name, notes, category, photo metadata) into a single API call, with client-side caching to avoid redundant requests. Another challenge was maintaining responsive UI during photo uploads to Firebase Storage — I used optimistic UI updates with background upload queues so users never wait on network operations.',
    results:
      'Shipped and live on Appetize.io for browser-based testing. Full CRUD with real-time sync, AI-powered features, secure authentication (email + Google Sign-In), and a statistics dashboard. Runs entirely on free-tier infrastructure at $0/month.',
    images: [
      '/images/projects/favorite-places/places-list.png',
      '/images/projects/favorite-places/place-detail-ai.png',
      '/images/projects/favorite-places/map-view.png',
      '/images/projects/favorite-places/add-place.png',
      '/images/projects/favorite-places/profile.png',
      '/images/projects/favorite-places/place-detail.png',
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
