import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, FileText, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Section } from '@/components/ui/section';
import { CutoffExplorer } from '@/components/case-studies/cutoff-explorer';
import type { CustomProject } from '@/data/projects';

const IMG = '/images/projects/newspaper';
const REPO = 'https://github.com/Esstar612/newspaper';
const RESULTS = `${REPO}#-measured-not-guessed`;

// Every figure on this page is in the newspaper repo's README or comes from its eval files.
const stats = [
  { value: '0.969', label: 'retrieval recall@5', note: 'Pinecone search on 40 labelled questions over a 1,027-article snapshot' },
  { value: '0.943', label: 'citation precision', note: 'Claude Sonnet 5.5, chosen over Sonnet 5 (0.859) by the eval' },
  { value: '0.417 → 0.917', label: 'follow-up recall@5', note: 'joining the previous question to a follow-up before searching' },
  { value: '362', label: 'unit tests', note: 'plus 22 Playwright flows on Chromium, Firefox and iPhone in CI' },
];

const facts = [
  { label: 'Role', value: 'Solo: ingestion, search, the answer pipeline, evaluation, interface, tests, CI and monitoring' },
  { label: 'Data', value: 'Eleven New York Times and BBC RSS feeds, about 120 to 210 new articles a day, kept for a year' },
  { label: 'Built with', value: 'Next.js 16, TypeScript, MongoDB Atlas, Pinecone, Claude Sonnet 5.5, Vitest, Playwright, GitHub Actions, Datadog, Vercel' },
  { label: 'Record', value: '29 September to 4 October 2026: 26 merged pull requests, every feature planned and reviewed before code' },
];

const pipeline = [
  { step: 'Ask', body: 'One box searches headlines as you type and asks on Enter, scoped to the open section and a chosen window: any time, past week, month or year.' },
  { step: 'Search', body: 'Pinecone finds the 8 articles nearest the question, filtered by section and date. A follow-up searches together with the question before it.' },
  { step: 'Read', body: 'MongoDB supplies each article’s headline and summary. Claude sees only these, as search results with citations enabled.' },
  { step: 'Answer', body: 'Claude Sonnet 5.5 is told to answer only from the results and to say so plainly when they do not answer the question.' },
  { step: 'Check', body: 'A citation survives only if it quotes a result exactly. Links come only from the retrieved articles, and the page renders text, never HTML.' },
  { step: 'Show', body: 'The answer with numbered sources, then the related stories that clear a measured relevance cutoff, newest first.' },
];

const models = [
  { measure: 'Citation precision', a: '0.859', b: '0.943' },
  { measure: 'Refusal accuracy (8 unanswerable)', a: '0.75', b: '0.875' },
  { measure: 'Rubric, of 5 (blind judge)', a: '4.47', b: '4.69' },
  { measure: 'Output tokens for 40 answers', a: '5,366', b: '3,773' },
];

const followups = [
  { label: 'Follow-up alone', recall: 0.417, mrr: 0.375 },
  { label: 'Joined with the previous question', recall: 0.917, mrr: 0.611 },
];

const tour = [
  { src: `${IMG}/ask-suggestions.jpg`, caption: 'Typing lists matching headlines under an "Ask" option. Arrow keys move, Enter asks, and the section and time window are always visible.' },
  { src: `${IMG}/ask-answer.jpg`, caption: 'A cited answer. The number opens the article it came from, and the article is listed beside the answer with its outlet and age.' },
  { src: `${IMG}/news-when.jpg`, caption: 'The When filter narrows search and Ask to the past week, month or year, so "what is the latest" questions search recent coverage.' },
  { src: `${IMG}/markets.jpg`, caption: 'Markets: a watchlist and a price chart served from MongoDB, so the chart keeps working when the quote provider refuses a request.' },
];

const failures = [
  {
    title: 'Telling Claude the date made answers worse',
    body: 'Giving each result its publication date and the model today’s date dropped citation precision from 0.943 to 0.885 and the rubric from 4.69 to 4.32: answers volunteered dates the cited text did not contain. The change was reverted, and dates moved into the interface as the When filter.',
  },
  {
    title: 'A cleanup plan would have deleted every article',
    body: 'Keeping a year of news meant an unfiltered delete query limited to the nightly count, and MongoDB reads a limit of 0 as no limit. Plan review caught it before any code: the first night would have emptied both databases. The route now skips the query, and a test fails without that guard.',
  },
  {
    title: 'The first related stories were mostly noise',
    body: 'Showing all 8 retrieved articles under an answer gave 7 unrelated stories for a question about Scott Bessent’s tax settlement. A cutoff measured on the labelled set cut it to the one article the answer cited.',
  },
  {
    title: 'Questions matched no headlines',
    body: 'The first design filtered the grid by the question’s exact words, so a real question returned zero stories. The grid now shows what search found by meaning, and keyword matching is only the fallback.',
  },
  {
    title: 'Development mode would have doubled paid calls',
    body: 'React runs page-load effects twice in development, so starting the request when the answer panel loaded would have sent two paid calls per question. The request starts from the submit handler, and a test proves one call per question.',
  },
  {
    title: 'A new model rejected the settings the old one took',
    body: 'Sonnet 5.5 answers a request with thinking disabled with an error. The eval found it on its first run, before any reader did, and the code now sends each model the setting it accepts.',
  },
];

const decisions = [
  {
    choice: 'Citations checked in code',
    over: 'Trusting what the model says it cited',
    why: 'Every citation must quote a retrieved result exactly, or it is dropped. A link can only point to an article that was actually searched.',
  },
  {
    choice: 'A cutoff measured on labelled data',
    over: 'A threshold picked by eye',
    why: 'At 0.35 the eval kept all 47 labelled answers and dropped 233 of 273 other results. Any guess between 0.3 and 0.5 would have looked reasonable.',
  },
  {
    choice: 'Dates in the interface',
    over: 'Dates in the prompt',
    why: 'The prompt version measured worse. A reader choosing "past week" gets recent results without the model narrating dates it cannot cite.',
  },
  {
    choice: 'A year of news, with a ceiling',
    over: 'Seven days of retention',
    why: 'A year is about 91 MB at the busiest measured day, 18% of the free database tier, and a 100,000-article ceiling caps it near a quarter.',
  },
  {
    choice: 'A text layout for stories without a photo',
    over: 'Scraping publisher pages for images',
    why: 'About one story in thirty arrives from its feed without a picture. It never leads the page; it moves to the text column, as a printed paper would do.',
  },
  {
    choice: 'RSS feeds and a nightly price cron',
    over: 'Live news and market APIs on every request',
    why: 'The news APIs failed silently from production, and the market provider allows one IP. Feeds need no key, and charts read MongoDB.',
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

const card = 'rounded-2xl p-5';
const cardStyle = { border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' };

function Shot({ src, alt, priority, sizes }: { src: string; alt: string; priority?: boolean; sizes: string }) {
  return (
    <div className="relative aspect-[1360/900] overflow-hidden rounded-2xl" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-elevated)' }}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" priority={priority} />
    </div>
  );
}

function FollowupChart() {
  return (
    <figure className={card} style={cardStyle}>
      <div className="space-y-5">
        {followups.map((f) => (
          <div key={f.label}>
            <p className="text-xs font-medium text-theme-fg">{f.label}</p>
            {[
              { name: 'Recall@5', value: f.recall },
              { name: 'MRR@8', value: f.mrr },
            ].map((m) => (
              <div key={m.name} className="mt-2 grid grid-cols-[4.5rem_1fr_3rem] items-center gap-3">
                <span className="text-[0.7rem] text-theme-fg-muted">{m.name}</span>
                <div className="h-2 rounded-full" style={{ background: 'var(--color-bg-elevated)' }}>
                  <div
                    className="h-2 rounded-full"
                    role="img"
                    aria-label={`${f.label}, ${m.name} ${m.value.toFixed(3)}`}
                    style={{ width: `${m.value * 100}%`, background: f.recall > 0.5 ? 'var(--color-accent)' : 'var(--color-fg-dim)' }}
                  />
                </div>
                <span className="text-right font-mono text-xs text-theme-fg">{m.value.toFixed(3)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-xs leading-relaxed text-theme-fg-muted">
        Six labelled follow-ups such as &ldquo;Who is taking over as chief executive of Mattel?&rdquo; then &ldquo;What is the outgoing chief going to do next?&rdquo;. With the join, every follow-up had a labelled answer in its top 3. Retrieval only, no model calls.
      </figcaption>
    </figure>
  );
}

export function TheNewspaperCaseStudy({ project }: { project: CustomProject }) {
  return (
    <div className="page-enter">
      <section className="mx-auto max-w-[1100px] px-6 pb-12 pt-28 md:pt-32 lg:px-8">
        <Link href="/projects" className="mb-8 inline-flex items-center gap-1.5 text-sm text-theme-fg-muted transition-colors hover:text-theme-accent">
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
            <Button href={`${project.links.live}/news`} external>
              Ask it something <ArrowUpRight className="h-4 w-4" />
            </Button>
          )}
          {project.links.github && (
            <Button href={project.links.github} variant="secondary" external>
              <Github className="h-4 w-4" /> View Source
            </Button>
          )}
          <Button href={RESULTS} variant="secondary" external>
            <FileText className="h-4 w-4" /> Eval results
          </Button>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-theme-fg-muted">
          Ask shares a daily limit across all visitors, so it may tell you to try again later.
        </p>
      </section>

      <div className="mx-auto max-w-[1100px] px-6 lg:px-8">
        <Shot
          src={`${IMG}/ask-thread.jpg`}
          alt="A follow-up thread in The Newspaper: the first question collapsed, a cited answer to the follow-up, and the New York Times source marked as used in both answers"
          sizes="(max-width: 1100px) 100vw, 1100px"
          priority
        />

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className={card} style={cardStyle}>
              <p className="font-display text-2xl text-theme-fg md:text-3xl">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-theme-fg">{s.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-theme-fg-muted">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      <Section divider className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-20">
          <div className="space-y-4 text-lg leading-relaxed text-theme-fg">
            <p>The Newspaper is a front page for the New York Times and the BBC that you can ask questions, and every answer shows the articles it came from.</p>
            <p className="text-base text-theme-fg-muted">
              Behind the box is a retrieval pipeline measured on a labelled set before it shipped: which model answers, how follow-ups search, and which related stories appear were each decided by a number, not a demo.
            </p>
          </div>

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
            <Heading>A news site tells you what is new, not what happened</Heading>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-theme-fg-muted">
              <p>
                Headlines answer &ldquo;what is new?&rdquo;. A reader who wants to know what Bessent settled with the I.R.S., or why it matters, has to find the right article and read it. A chatbot will answer instantly, and may invent the answer.
              </p>
              <p>
                So the question here was not &ldquo;can a model summarise news?&rdquo; but &ldquo;can every sentence be traced to coverage the site actually holds, and can the system say so when it cannot answer?&rdquo;
              </p>
            </div>
          </div>

          <div>
            <Eyebrow n="02">How an answer is made</Eyebrow>
            <Heading>Six steps, and the model only writes one of them</Heading>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pipeline.map((p, i) => (
                <li key={p.step} className={card} style={i === 4 ? { ...cardStyle, borderColor: 'var(--color-accent)' } : cardStyle}>
                  <p className="font-mono text-[0.7rem] text-theme-fg-dim">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-1 text-sm font-semibold text-theme-fg">{p.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-theme-fg-muted">{p.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-theme-fg-muted">
              Questions are rate-limited before any paid call, ten per visitor an hour and 200 a day for the site. When Ask is over its limit or unavailable, the same box falls back to keyword search, so the page never dead-ends.
            </p>
          </div>

          <div>
            <Eyebrow n="03">Measured, not guessed</Eyebrow>
            <Heading>An eval decided the model, the search and the cutoff</Heading>
            <p className="mt-5 text-base leading-relaxed text-theme-fg-muted">
              The eval runs on a 1,027-article snapshot of production and 40 questions: 32 with the articles that answer them labelled, and 8 the snapshot cannot answer. Search is scored on its own, then answers are scored for citation precision, honest refusals and a blind rubric graded by Claude Opus 5.5.
            </p>

            <div className="mt-8 overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--color-border)' }}>
              <table className="w-full min-w-[480px] text-left text-sm">
                <caption className="sr-only">Answer model comparison</caption>
                <thead>
                  <tr className="text-[0.7rem] uppercase tracking-[0.08em] text-theme-fg-dim" style={{ background: 'var(--color-bg-elevated)' }}>
                    <th scope="col" className="px-4 py-3 font-semibold">Measure</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Sonnet 5</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-theme-accent">Sonnet 5.5, shipped</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((m) => (
                    <tr key={m.measure} style={{ borderTop: '1px solid var(--color-border)' }}>
                      <td className="px-4 py-2.5 text-xs text-theme-fg">{m.measure}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-theme-fg-muted">{m.a}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-theme-fg">{m.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-theme-fg-muted">
              Retrieval for both: recall@5 0.969 and MRR@8 0.969, the same with and without the section filter. Precision below 1 is mostly the models citing related articles the labels leave out.
            </p>

            <h3 className="mt-12 text-sm font-semibold text-theme-fg">Follow-ups search with the question before them</h3>
            <p className="mt-2 text-sm leading-relaxed text-theme-fg-muted">
              &ldquo;What is the outgoing chief going to do next?&rdquo; means nothing on its own. Searching it together with the previous question more than doubled how often the right article came back.
            </p>
            <div className="mt-5">
              <FollowupChart />
            </div>
          </div>

          <div>
            <Eyebrow n="04">Choosing the cutoff</Eyebrow>
            <Heading>Which related stories deserve a place under the answer?</Heading>
            <p className="mt-5 text-base leading-relaxed text-theme-fg-muted">
              Search always returns 8 results, related or not. The first version showed all of them. Drag the line to see what each cutoff would have kept, using the real scores from the eval.
            </p>
            <div className="mt-8">
              <CutoffExplorer />
            </div>
          </div>
        </div>
      </Section>

      <section className="mx-auto max-w-[1100px] px-6 pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Eyebrow n="05">The product</Eyebrow>
          <Heading>A front page you can question</Heading>
          <p className="mt-5 text-base leading-relaxed text-theme-fg-muted">
            Seven sections from eleven feeds, a markets page and a weather dashboard, in light and dark themes that clear WCAG AA contrast. Ask lives in the same box as search.
          </p>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2">
          {tour.map((t) => (
            <figure key={t.src}>
              <Shot src={t.src} alt={t.caption} sizes="(max-width: 768px) 100vw, 530px" />
              <figcaption className="mt-4 text-sm leading-relaxed text-theme-fg-muted">{t.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 grid items-center gap-8 md:grid-cols-[220px_1fr]">
          <div className="relative mx-auto aspect-[393/659] w-full max-w-[220px] overflow-hidden rounded-[1.6rem]" style={{ border: '5px solid var(--color-bg-elevated)', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}>
            <Image src={`${IMG}/mobile.jpg`} alt="The Newspaper's news page on a phone, with the search box and the When filter on its own line" fill sizes="220px" className="object-cover object-top" />
          </div>
          <p className="text-sm leading-relaxed text-theme-fg-muted">
            On a phone the box spans the width and the When filter takes its own line. Every end-to-end flow runs on an iPhone profile in CI, so a control that disappears at phone width fails the build.
          </p>
        </div>
      </section>

      <Section divider className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-20">
          <div>
            <Eyebrow n="06">What did not work</Eyebrow>
            <Heading>Six results I would rather not have, kept on the record</Heading>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {failures.map((f) => (
                <div key={f.title} className={card} style={cardStyle}>
                  <h3 className="text-sm font-semibold text-theme-fg">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-theme-fg-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow n="07">Built to outlast its providers</Eyebrow>
            <Heading>Every outside service failed at least once, and the site said so</Heading>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-theme-fg-muted">
              <p>
                The news APIs the first version used failed in ways that looked like success: one returned nothing from a deployed site, the other answered rate limits with HTTP 200. Eleven per-section RSS feeds replaced them, and the feed requested is the section, so nothing is guessed.
              </p>
              <p>
                The market data provider allows one IP per account and does not support serverless hosting, so a nightly job fetches price history in one sequential run and every chart reads MongoDB. Cleanup refuses to delete when nothing new has arrived for 48 hours, so a broken feed cannot empty the site.
              </p>
              <p>
                Every cron run and every question reports to Datadog, and seven monitors are kept as code. One caught a real failure: the provider refused the nightly price job for all ten symbols. The job now logs the reason per symbol, and later runs recovered.
              </p>
            </div>
          </div>

          <div>
            <Eyebrow n="08">How it was built</Eyebrow>
            <Heading>Plans reviewed before code, tests that are proven to catch bugs</Heading>
            <ul className="mt-8 space-y-4">
              {[
                'Every feature started as a written plan. A separate reviewer agent checked it against the code, and nothing was built until it approved, often after two or three rounds. Two of the six failures below were caught there; the eval and browser checks found the rest.',
                'Tests came first and were seen failing. Before a change shipped, its key guards were removed on purpose to prove a test would fail without them.',
                '362 unit tests across 28 files with Vitest, React Testing Library and MSW, which stands in for every outside API. 22 Playwright flows run against a production build and a seeded MongoDB, and fail if any request leaves the site.',
                'GitHub Actions runs the type check, lint, unit tests and the Playwright suite on Chromium, Firefox and an iPhone profile for every pull request. A second model reviews each diff against the plan before it ships.',
                'A dated build log records every figure, decision and mistake, including the ones on this page.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-theme-fg-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-theme-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow n="09">Decisions and tradeoffs</Eyebrow>
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
            <Eyebrow n="10">Next</Eyebrow>
            <Heading>Measuring &ldquo;what is the latest?&rdquo;</Heading>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-theme-fg-muted">
              <p>
                The eval snapshot covers about a week of news, so it cannot test questions about recency. Once the archive spans 30 days, a new snapshot and a set of &ldquo;latest on X&rdquo; questions will measure the When filter and decide whether search should favour recent articles by default.
              </p>
              <p>
                Keyword search is a phrase match with no index behind it. It is fast at today&rsquo;s size; when the archive passes 10,000 articles it gets re-measured and moved to a text index.
              </p>
            </div>
          </div>

          <div className={card} style={cardStyle}>
            <p className="text-sm font-semibold text-theme-fg">Check any number on this page</p>
            <p className="mt-2 text-sm leading-relaxed text-theme-fg-muted">
              The repository&rsquo;s README lists the eval results, test counts and monitors, and the eval script and golden questions are in the repo.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button href={RESULTS} variant="secondary" external>
                <FileText className="h-4 w-4" /> Eval results
              </Button>
              <Button href={REPO} variant="secondary" external>
                <Github className="h-4 w-4" /> Repository
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-20 pt-0">
        <div className="text-center">
          <Button href="/projects" variant="secondary">
            <ArrowLeft className="h-4 w-4" /> Back to All Projects
          </Button>
        </div>
      </Section>
    </div>
  );
}
