import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Github, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Section } from '@/components/ui/section';
import type { CustomProject } from '@/data/projects';

const IMG = '/images/projects/favorite-places';

const stats = [
  { value: '192', label: 'scored agent runs gate every deploy', note: '32 cases x 3 repetitions x 2 providers' },
  { value: '1.000', label: 'grounded, on both providers', note: 'no invented or foreign place in any gated run' },
  { value: '39%', label: 'lower Claude input cost', note: '$2.19 to $1.34 on 96 runs, from prompt caching' },
  { value: '394', label: 'automated tests', note: '263 agent (pytest) and 131 app (Flutter)' },
];

const facts = [
  { label: 'Role', value: 'Solo: product, design, app, backend, agent, evals, infrastructure' },
  { label: 'Built with', value: 'Flutter, Python, FastAPI, LangGraph, LangSmith, Node.js, Firebase, Cloud Run' },
  { label: 'Models', value: 'Claude Sonnet 5 and GPT-6 Sol for the agent, Gemini on Vertex AI for notes and search' },
  { label: 'Shipped', value: '101 merged pull requests, each small enough to review in one sitting' },
];

const pillars = [
  {
    kicker: 'The app',
    title: 'A redesigned Flutter app for Android and the web',
    body: 'Map-first Add Place with Google Places search and a duplicate check within 60 m, a search box that filters as you type and asks Gemini on Enter, per-place AI summaries, guest mode with sample places, and a guest-to-account upgrade that keeps the same uid so nothing is lost.',
  },
  {
    kicker: 'The agent',
    title: 'An outing planner that only uses your own places',
    body: 'A Python service on FastAPI and LangGraph. Three tools search, read and route your saved places. The same graph runs on Claude or GPT behind one provider interface, and every answer lists the tool calls behind it.',
  },
  {
    kicker: 'The platform',
    title: 'Evals, deploys and credentials treated as product work',
    body: 'Every agent deploy waits on a LangSmith eval suite across both providers. Deploys authenticate through Workload Identity Federation, the backend moved to Vertex AI on its own service account, and no long-lived Google Cloud key remains in the project.',
  },
];

const tour = [
  { src: `${IMG}/v2-sign-in.jpg`, caption: 'Sign-in. "Continue as guest" gives any visitor a private sandbox with five sample places, no account needed.' },
  { src: `${IMG}/v2-ask.jpg`, caption: 'Search or ask. Enter sends the question to Gemini, and each match shows its evidence: a quote from your note, or the tag that matched.' },
  { src: `${IMG}/v2-plan-result.jpg`, caption: 'The Plan tab. Two stops in the order asked for, a route map, walking time, and a reason for each stop drawn from your notes.' },
  { src: `${IMG}/v2-plan-trace.jpg`, caption: '"How I got this". Every tool call the agent made, in order, with what each one found.' },
  { src: `${IMG}/v2-plan-question.jpg`, caption: 'A vague request gets one clarifying question instead of a guess, with quick answers built from your own tags and categories.' },
  { src: `${IMG}/v2-summary.jpg`, caption: 'Place detail. Gemini turns freeform notes into why you liked it, tips, and the best time to go.' },
];

const flow = [
  { step: 'Verify', body: 'The Firebase ID token is verified. The uid comes only from that token and reaches the tools through LangGraph runtime context, so it never appears in the model prompt, tool arguments or traces.' },
  { step: 'Plan with tools', body: 'The model loops over three tools: search_places (short rows, no notes), get_place_details (notes and summary) and plan_route (keeps the order asked for). A good answer needs more than one call.' },
  { step: 'Finalize', body: 'A structured-output step returns the stops, a reason for each, whether it is an itinerary or a set of options, and a confidence from 0 to 1.' },
  { step: 'Ask or answer', body: 'Below the provider’s calibrated threshold, the agent returns one clarifying question and no places. A clarified request never asks again.' },
  { step: 'Fallback', body: 'If the draft recommends a place the model never read, or an itinerary with no route, a graph step reads and routes it directly, then finalizes once more. It can drop places but never add them.' },
  { step: 'Ground and log', body: 'Every recommended ID is checked against what the tools actually returned for this user. Anything else is dropped and logged. One JSON line per run goes to Cloud Run with tool calls and IDs, never notes or the uid.' },
];

const pipeline = [
  { job: 'pytest', detail: '263 tests, no credentials or network' },
  { job: 'container', detail: 'build the image, check /health, a 401 without a token, and the non-root user' },
  { job: 'evals', detail: '192 agent runs in LangSmith; fails on any gate or per-provider threshold' },
  { job: 'deploy', detail: 'keyless push to Artifact Registry and Cloud Run, then a smoke check on the live URL' },
];

const scores: { scorer: string; claude: string; gpt: string; bar: string }[] = [
  { scorer: 'grounded', claude: '1.000', gpt: '1.000', bar: 'gate 1.0' },
  { scorer: 'no_forbidden', claude: '1.000', gpt: '1.000', bar: 'gate 1.0' },
  { scorer: 'covers_request', claude: '1.000', gpt: '1.000', bar: '0.90' },
  { scorer: 'respects_sequence', claude: '1.000', gpt: '1.000', bar: '0.90' },
  { scorer: 'empty_when_nothing_fits', claude: '1.000', gpt: '1.000', bar: '0.90' },
  { scorer: 'expected_recall', claude: '0.962', gpt: '1.000', bar: '0.85 / 0.90' },
  { scorer: 'details_before_recommending', claude: '0.958', gpt: '1.000', bar: '0.80 / 0.90' },
  { scorer: 'required_tools_used', claude: '0.963', gpt: '1.000', bar: '0.85 / 0.90' },
  { scorer: 'route_when_multi_stop', claude: '0.929', gpt: '1.000', bar: '0.70 / 0.90' },
  { scorer: 'tool_call_budget', claude: '0.979', gpt: '0.979', bar: '0.85 / 0.80' },
  { scorer: 'asks_when_vague', claude: '0.917', gpt: '1.000', bar: 'report only' },
  { scorer: 'no_needless_question', claude: '1.000', gpt: '1.000', bar: 'report only' },
];

const iterations = [
  {
    title: 'The scorer was wrong, not the model',
    body: 'The first baseline had Claude routing only 0.708 of multi-stop answers. Reading the runs showed the scorer penalized answers that offered alternatives, which correctly need no route. Scoring only cases that expect a route moved it to 0.972, and GPT from 0.850 to 1.000.',
  },
  {
    title: 'Fixing the tool, not raising the budget',
    body: 'About 1 in 6 runs went over the tool-call budget. The runs showed both models calling plan_route once per leg, because it always reordered stops nearest-first. Making it keep the order asked for took Claude from 0.827 to 0.973 and GPT from 0.840 to 0.907.',
  },
  {
    title: 'Pass bars written before the run',
    body: 'Claude sometimes answered from search rows without reading notes. Each fix was checked on a targeted run against a bar fixed in advance: a prompt change passed 6 of 10 runs, a fallback graph step 7 of 10, and clearer itinerary rules 10 of 10.',
  },
  {
    title: 'Thresholds from statistics, not intuition',
    body: 'Per-provider thresholds are the lower bound of a 99% bootstrap interval over whole cases, written to a file by a script so no number is typed by hand. A 90% interval was rejected: with 8 checks, too many deploys would fail on noise.',
  },
  {
    title: 'A calibrated question threshold, checked out of sample',
    body: 'Each model reports its confidence, and the threshold was picked by a rule fixed before seeing data: ask on the most vague requests while asking needlessly on at most 5% of clear ones. On held-out cases Claude asked on 5 of 6 vague requests and GPT on 6 of 6, with no needless questions.',
  },
];

const decisions = [
  {
    choice: 'The agent reads Firestore itself',
    over: 'The app sending its places in the request',
    why: 'Tools that only filter a list they were handed prove little about tool calling. Admin reads bypass security rules, so the service is the access control: one store method, ownership checked in one place.',
  },
  {
    choice: 'Confidence reported by the model, calibrated on evals',
    over: 'Computing it from signals, or agreement between repeated runs',
    why: 'Signals miss meaning, and repeated runs multiply cost. Calibration turns a self-report into a threshold with a measured false-question rate.',
  },
  {
    choice: 'A fallback graph step',
    over: 'Stricter grounding that drops unread places',
    why: 'Dropping turns weak answers into empty ones. Reading on the model’s behalf fixes the answer, and a report-only fallback_rate keeps the model’s own habits visible.',
  },
  {
    choice: 'Guests keep full access to the agent',
    over: 'Requiring an account',
    why: 'Recruiters try the app as guests. Since a new guest costs nothing, spend is capped by a global hourly limit, a workspace spend limit and a billing alert, not by the per-user limit.',
  },
  {
    choice: 'Workload Identity Federation for every deploy',
    over: 'Service account keys in GitHub secrets',
    why: 'Short-lived credentials, limited to this repository’s ID and the main branch. The backend then moved from a Gemini API key to Vertex AI on its own service account.',
  },
  {
    choice: 'No vector database here',
    over: 'RAG with Pinecone over saved places',
    why: 'A user has 5 to 50 places, which fit in one tool result. Retrieval over thousands of news articles is a real use for one, so that work moved to another project.',
  },
];

const incidents = [
  {
    title: 'A pasted newline leaked an API key',
    body: 'The first live request returned a 500: the Anthropic key in Secret Manager ended with a newline, an illegal header value, and the error message carrying it was logged. The key was treated as leaked and rotated, the provider factory now strips whitespace, and the rotation steps use printf.',
  },
  {
    title: 'Eval runs hit the tracing plan’s monthly limit',
    body: 'LangSmith returned 429 partway through a baseline. The cause: every scorer call was traced separately, so a 150-run baseline made about 1,650 traces instead of 150. Scorer tracing is off now, and scores still upload as feedback.',
  },
  {
    title: 'Day plans crashed on the recursion limit',
    body: 'Three- and four-stop plans ran out of LangGraph steps, and a crashed run returns nothing. The graph now tracks its remaining steps and finalizes with an answer before the limit, and a test drives a model that requests tools forever.',
  },
  {
    title: 'A dependency update broke the web deploy',
    body: 'A Riverpod update needed a newer Dart than CI’s pinned Flutter. Instead of reverting, the app moved to Flutter 3.47.5 with matching Gradle, Android Gradle Plugin and Kotlin versions, and a new mobile PR check (analyze, tests, web and APK builds) now catches this before merge.',
  },
];

function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-theme-accent">
      <span className="font-mono text-theme-fg-dim">{n}</span>
      {children}
    </p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl font-normal tracking-tight text-theme-fg md:text-3xl">{children}</h2>;
}

function Phone({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div
      className="relative aspect-[412/915] w-full overflow-hidden rounded-[1.6rem]"
      style={{ border: '5px solid var(--color-bg-elevated)', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}
    >
      <Image src={src} alt={alt} fill sizes="(max-width: 640px) 80vw, 260px" className="object-cover object-top" priority={priority} />
    </div>
  );
}

const card = 'rounded-2xl p-5';
const cardStyle = { border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' };

export function FavoritePlacesCaseStudy({ project }: { project: CustomProject }) {
  return (
    <div className="page-enter">
      <section className="mx-auto max-w-[1100px] px-6 pb-12 pt-28 md:pt-32 lg:px-8">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-theme-fg-muted transition-colors hover:text-theme-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All Projects
        </Link>

        <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-theme-accent">{project.year}</p>
        <h1 className="font-display text-3xl font-normal tracking-tight text-theme-fg md:text-4xl lg:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-theme-fg-muted">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.live && (
            <Button href={project.links.live} external>
              Try it as a guest <ArrowUpRight className="h-4 w-4" />
            </Button>
          )}
          {project.links.androidDemo && (
            <Button href={project.links.androidDemo} variant="secondary" external>
              <Smartphone className="h-4 w-4" /> Android Demo
            </Button>
          )}
          {project.links.github && (
            <Button href={project.links.github} variant="secondary" external>
              <Github className="h-4 w-4" /> View Source
            </Button>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] px-6 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl" style={{ border: '1px solid var(--color-border)' }}>
          <Image src={project.thumbnail} alt="Favorite Places: the search answer, a planned outing and its tool calls" fill sizes="(max-width: 1100px) 100vw, 1100px" className="object-cover" priority />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className={card} style={cardStyle}>
              <p className="font-display text-3xl text-theme-fg md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-theme-fg">{s.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-theme-fg-muted">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      <Section divider className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-20">
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-theme-fg-dim">{f.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-theme-fg-muted">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <Eyebrow n="01">The problem</Eyebrow>
            <Heading>Remembering a place is easy. Deciding where to go is not.</Heading>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-theme-fg-muted">
              <p>
                The first version of Favorite Places saved places with photos, notes and ratings, and used Gemini to summarize notes and search by meaning. It answered &ldquo;where was that cafe?&rdquo; well. It could not answer the question people actually have on a Saturday morning: given everything I have saved, where should I go, and in what order?
              </p>
              <p>
                That is a job for an agent, and it comes with the hard parts of agents: it must only ever use your own places, it must not invent any, it should ask when a request is too vague to answer, and there has to be evidence it keeps working after every change. This case study is about building that, and the app and platform around it.
              </p>
            </div>
          </div>

          <div>
            <Eyebrow n="02">What I built</Eyebrow>
            <Heading>Three pieces, each shipped to production</Heading>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {pillars.map((p) => (
                <div key={p.kicker} className={card} style={cardStyle}>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-theme-accent">{p.kicker}</p>
                  <h3 className="mt-2 text-sm font-semibold leading-snug text-theme-fg">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-theme-fg-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <section className="mx-auto max-w-[1100px] px-6 pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Eyebrow n="03">A tour of the app</Eyebrow>
          <Heading>What a guest sees in the first two minutes</Heading>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {tour.map((t, i) => (
            <figure key={t.src} className="mx-auto w-full max-w-[280px]">
              <Phone src={t.src} alt={t.caption} priority={i < 3} />
              <figcaption className="mt-4 text-sm leading-relaxed text-theme-fg-muted">{t.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Section divider className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-20">
          <div>
            <Eyebrow n="04">Architecture</Eyebrow>
            <Heading>One app, two services, one Firestore</Heading>
            <p className="mt-5 text-base leading-relaxed text-theme-fg-muted">
              The Flutter app talks to Firebase directly for places and photos, to an Express backend for Gemini features, and to the Python agent for outings. Both services verify the same Firebase ID token and run on Cloud Run under their own service accounts.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <div className={`${card} text-center`} style={cardStyle}>
                <p className="font-semibold text-theme-fg">Flutter app</p>
                <p className="mt-1 text-theme-fg-muted">Android and web from one codebase. Riverpod, Material 3, Google Maps and Places.</p>
              </div>
              <p className="text-center font-mono text-xs text-theme-fg-dim">Firebase ID token on every call</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className={card} style={cardStyle}>
                  <p className="font-semibold text-theme-fg">Firebase</p>
                  <p className="mt-1 text-theme-fg-muted">Auth (email, Google, guest), Firestore and Storage, with owner-scoped rules versioned in the repo.</p>
                </div>
                <div className={card} style={cardStyle}>
                  <p className="font-semibold text-theme-fg">Express backend</p>
                  <p className="mt-1 text-theme-fg-muted">Node.js on Cloud Run. Gemini on Vertex AI for summaries, tags and smart search; geocoding; export and account deletion.</p>
                </div>
                <div className={card} style={{ ...cardStyle, borderColor: 'var(--color-accent)' }}>
                  <p className="font-semibold text-theme-fg">Outing agent</p>
                  <p className="mt-1 text-theme-fg-muted">Python, FastAPI and LangGraph on Cloud Run. Claude or GPT. Read-only Firestore access.</p>
                </div>
              </div>
              <p className="text-center font-mono text-xs text-theme-fg-dim">GitHub Actions: tests, eval gate, keyless deploy</p>
            </div>
          </div>

          <div>
            <Eyebrow n="05">How the agent answers</Eyebrow>
            <Heading>A graph with guardrails around the model</Heading>
            <ol className="mt-8 space-y-4">
              {flow.map((f, i) => (
                <li key={f.step} className="flex gap-4">
                  <span
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-theme-accent"
                    style={{ background: 'var(--accent-glow)', border: '1px solid var(--color-border-hover)' }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-theme-fg">{f.step}</p>
                    <p className="mt-1 text-sm leading-relaxed text-theme-fg-muted">{f.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <Eyebrow n="06">Evals as a deploy gate</Eyebrow>
            <Heading>No agent change ships without 192 scored runs</Heading>
            <p className="mt-5 text-base leading-relaxed text-theme-fg-muted">
              Every push to main that changes agent code runs the full suite on both providers: 32 cases over fixture users, including multi-stop day plans, requests nothing fits, a user with no notes, another user&rsquo;s data, and vague requests that should get a question. Two gates must be perfect, and every other scorer must clear its provider&rsquo;s threshold.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              {pipeline.map((p, i) => (
                <div key={p.job} className={card} style={cardStyle}>
                  <p className="font-mono text-xs text-theme-fg-dim">step {i + 1}</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-theme-accent">{p.job}</p>
                  <p className="mt-2 text-xs leading-relaxed text-theme-fg-muted">{p.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--color-border)' }}>
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="text-[0.7rem] uppercase tracking-[0.08em] text-theme-fg-dim" style={{ background: 'var(--color-bg-elevated)' }}>
                    <th className="px-4 py-3 font-semibold">Scorer</th>
                    <th className="px-4 py-3 font-semibold">Claude</th>
                    <th className="px-4 py-3 font-semibold">GPT</th>
                    <th className="px-4 py-3 font-semibold">Must reach</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((s) => (
                    <tr key={s.scorer} style={{ borderTop: '1px solid var(--color-border)' }}>
                      <td className="px-4 py-2.5 font-mono text-xs text-theme-fg">{s.scorer}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-theme-fg-muted">{s.claude}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-theme-fg-muted">{s.gpt}</td>
                      <td className="px-4 py-2.5 text-xs text-theme-fg-dim">{s.bar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-theme-fg-muted">
              Scores from the most recent deploy run, where every gate and threshold passed. Thresholds shown as Claude / GPT where they differ.
            </p>
          </div>

          <div>
            <Eyebrow n="07">Iterating with evidence</Eyebrow>
            <Heading>Reading the runs before changing anything</Heading>
            <div className="mt-8 space-y-4">
              {iterations.map((it) => (
                <div key={it.title} className="pl-5" style={{ borderLeft: '2px solid var(--color-accent)' }}>
                  <h3 className="text-sm font-semibold text-theme-fg">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-theme-fg-muted">{it.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow n="08">Decisions and tradeoffs</Eyebrow>
            <Heading>What I chose, and what I turned down</Heading>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {decisions.map((d) => (
                <div key={d.choice} className={card} style={cardStyle}>
                  <h3 className="text-sm font-semibold text-theme-fg">{d.choice}</h3>
                  <p className="mt-1 text-xs text-theme-fg-muted">Instead of: {d.over}</p>
                  <p className="mt-3 text-sm leading-relaxed text-theme-fg-muted">{d.why}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow n="09">What broke</Eyebrow>
            <Heading>Four failures, and what each one changed</Heading>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {incidents.map((x) => (
                <div key={x.title} className={card} style={cardStyle}>
                  <h3 className="text-sm font-semibold text-theme-fg">{x.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-theme-fg-muted">{x.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow n="10">Results</Eyebrow>
            <Heading>Live, measured, and cheaper than it started</Heading>
            <ul className="mt-6 space-y-3">
              {[
                'Live on Firebase Hosting and Cloud Run. A guest can plan an outing from the sample places with no sign-up and see every tool call behind the answer.',
                'Across every gated deploy, neither model recommended a place the user had not saved or that belonged to someone else.',
                'Turning on Anthropic prompt caching cut the eval suite’s Claude input cost from $2.19 to $1.34 on the same 96 runs, with every quality gate still passing.',
                'No long-lived Google Cloud keys remain: deploys use Workload Identity Federation, and both services use their own service accounts.',
              ].map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm leading-relaxed text-theme-fg-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-theme-accent" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-semibold text-theme-fg">Next</p>
            <p className="mt-2 text-sm leading-relaxed text-theme-fg-muted">
              An LLM judge for note faithfulness, since the deterministic scorers cannot catch a reason that bends a note (a &ldquo;long, slow lunch&rdquo; presented as dinner). Pooling several runs per prompt to tighten thresholds. And measuring caching on production traffic, which is not traced today because it reads real users&rsquo; notes.
            </p>
          </div>
        </div>
      </Section>

      <section className="mx-auto max-w-[1100px] px-6 pb-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.1em] text-theme-fg-dim">More screens</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { src: `${IMG}/v2-places.jpg`, alt: 'Places list with category chips and map thumbnails' },
            { src: `${IMG}/v2-plan-compose.jpg`, alt: 'Plan tab, composing a request' },
            { src: `${IMG}/v2-plan-thinking.jpg`, alt: 'Plan tab while the agent works' },
            { src: `${IMG}/v2-detail.jpg`, alt: 'Place detail with rating, tags and notes' },
          ].map((s) => (
            <div key={s.src} className="mx-auto w-full max-w-[240px]">
              <Phone src={s.src} alt={s.alt} />
            </div>
          ))}
        </div>
      </section>

      <Section className="pb-20 pt-12">
        <div className="text-center">
          <Button href="/projects" variant="secondary">
            <ArrowLeft className="h-4 w-4" /> Back to All Projects
          </Button>
        </div>
      </Section>
    </div>
  );
}
