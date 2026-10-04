import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, FileText, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Section } from '@/components/ui/section';
import type { CustomProject } from '@/data/projects';

const IMG = '/images/projects/clause-review';
const REPO = 'https://github.com/Esstar612/cuad-clause-classifier';
const RESULTS = `${REPO}/blob/main/docs/results.md`;
const BUILD_LOG = `${REPO}/blob/main/BUILD_LOG.md`;

// Every figure on this page is copied from docs/results.md or BUILD_LOG.md in the project repo.
const stats = [
  { value: '6', label: 'models, one protocol', note: 'TF-IDF baseline, two fine-tuned legal-BERTs, Claude, Gemini and an open-weights LLM' },
  { value: '0.7237', label: 'best test macro-F1', note: 'Gemini, 95% interval [0.6997, 0.7455] over 96 held-out contracts' },
  { value: '$1.12', label: 'open model, matching Claude', note: 'DeepSeek on Fireworks for test and shift, against $9.66 for Claude; no measurable difference in score' },
  { value: '0', label: 'flags changed in production', note: 'of 399,036 label decisions when the deployed service was checked against the evaluated models' },
];

const facts = [
  { label: 'Role', value: 'Solo: data, labeling rules, models, evaluation, service, deployment, front end' },
  { label: 'Data', value: 'CUAD v1: 510 commercial contracts labeled by lawyers, 33 clause types used, CC BY 4.0' },
  { label: 'Built with', value: 'Python, scikit-learn, PyTorch and Hugging Face, Claude, Gemini and Fireworks APIs, FastAPI, Docker, Cloud Run, GKE, Vercel' },
  { label: 'Record', value: '23 September to 4 October 2026: over 70 commits, a dated build log, every plan reviewed before code, 267 tests' },
];

const rules = [
  {
    title: 'Rules before results',
    body: 'Metrics, thresholds, model selection and the list of comparisons were written into the build log and committed before the numbers they govern existed.',
    detail: 'The commit history shows each pre-registration commit before its results commit. Changes made afterwards are logged as amendments with the reason, and the original stays in the record.',
  },
  {
    title: 'One look at the test set',
    body: 'Every tuning choice was made on validation contracts. Each model was run on the test set once, at the end.',
    detail: 'Prompts, thresholds, hyperparameters and checkpoint choice used the 97 validation contracts only. The tuned legal-BERT was designed after the first one’s test result, so it is reported as a separate, post-hoc model with a stricter interval for the second look.',
  },
  {
    title: 'Split by contract, plus unseen contract types',
    body: 'Clauses from one contract never appear on both sides of a split, and two contract types are held out entirely as a shift test.',
    detail: 'Train 289, validation 97, test 96 contracts, stratified by type. Franchise (15) and Transportation (13) contracts form the shift set: no model trains or tunes on them.',
  },
  {
    title: 'Uncertainty on every score',
    body: 'Intervals come from resampling whole contracts, because clauses in one contract are not independent of each other.',
    detail: 'Contract-level bootstrap, stratified by type, seed 42: 2,000 resamples for each score, 10,000 paired resamples for each comparison between models.',
  },
  {
    title: 'A claim needs to survive the correction',
    body: 'A difference between two models is claimed only if its interval excludes zero after adjusting for the number of comparisons made.',
    detail: 'Bonferroni over a pre-registered family of 12 comparisons (adjusted level 99.583%). Claims that clear the bar by a narrow margin are labeled marginal in the results rather than dropped or overstated.',
  },
];

const models = [
  { name: 'Baseline', kind: 'TF-IDF and logistic regression', note: 'One classifier per clause type. Fast, local, free.' },
  { name: 'Legal-BERT (6a)', kind: 'Fine-tuned transformer', note: 'Selected from three encoders by a pre-registered rule. Came last.' },
  { name: 'Tuned legal-BERT (6c)', kind: 'Fine-tuned transformer', note: 'Weighted loss, chosen from 20 checkpoints on validation. Runs locally.' },
  { name: 'Claude Sonnet 5', kind: 'Prompted LLM', note: 'Prompt iterated on validation, 10 segments per call.' },
  { name: 'Gemini 3.8 Flash', kind: 'Prompted LLM', note: 'Prompt with retrieved training examples, iterated on validation.' },
  { name: 'DeepSeek V4.1 Flash', kind: 'Open-weights LLM', note: 'Served on Fireworks, run with Gemini’s frozen prompt and no tuning of its own.' },
];

type Row = { model: string; test: [number, number, number]; shift: [number, number, number]; best?: boolean };
// Macro-F1, point and 95% contract-bootstrap interval: test on the Rule A labels, shift on the 17 Rule C labels.
const macro: Row[] = [
  { model: 'Gemini', test: [0.7237, 0.6997, 0.7455], shift: [0.5753, 0.5349, 0.6278], best: true },
  { model: 'DeepSeek', test: [0.6828, 0.657, 0.7076], shift: [0.5552, 0.4984, 0.6199] },
  { model: 'Claude', test: [0.6754, 0.6476, 0.7019], shift: [0.5246, 0.4749, 0.5853] },
  { model: 'Tuned legal-BERT', test: [0.6695, 0.6422, 0.6924], shift: [0.5449, 0.5013, 0.5913] },
  { model: 'Baseline', test: [0.6311, 0.6043, 0.6532], shift: [0.474, 0.4186, 0.5332] },
  { model: 'Legal-BERT (6a)', test: [0.5408, 0.518, 0.5591], shift: [0.4487, 0.4052, 0.5019] },
];

const table = [
  { model: 'Baseline', tm: '0.6311 [0.6043, 0.6532]', ti: '0.6659 [0.6434, 0.6907]', sm: '0.4740 [0.4186, 0.5332]', si: '0.5027 [0.4472, 0.5631]' },
  { model: 'Claude', tm: '0.6754 [0.6476, 0.7019]', ti: '0.7156 [0.6920, 0.7404]', sm: '0.5246 [0.4749, 0.5853]', si: '0.5688 [0.5254, 0.6224]' },
  { model: 'Gemini', tm: '0.7237 [0.6997, 0.7455]', ti: '0.7506 [0.7273, 0.7757]', sm: '0.5753 [0.5349, 0.6278]', si: '0.5843 [0.5453, 0.6364]' },
  { model: 'Legal-BERT (6a)', tm: '0.5408 [0.5180, 0.5591]', ti: '0.5756 [0.5550, 0.5977]', sm: '0.4487 [0.4052, 0.5019]', si: '0.4867 [0.4467, 0.5300]' },
  { model: 'Tuned legal-BERT (6c)', tm: '0.6695 [0.6422, 0.6924]', ti: '0.6886 [0.6650, 0.7131]', sm: '0.5449 [0.5013, 0.5913]', si: '0.5763 [0.5329, 0.6181]' },
  { model: 'DeepSeek (6b)', tm: '0.6828 [0.6570, 0.7076]', ti: '0.7136 [0.6904, 0.7398]', sm: '0.5552 [0.4984, 0.6199]', si: '0.5842 [0.5284, 0.6440]' },
];

const claims = [
  'Gemini scores higher than the baseline on both metrics, on test and on the unseen contract types.',
  'Gemini scores higher than Claude on both metrics on test.',
  'DeepSeek, with no prompt work of its own, scores higher than the baseline on all four measures and cannot be told apart from Claude.',
  'The tuned legal-BERT, which runs locally at no API cost, scores higher than the baseline on three of four measures and cannot be told apart from Claude.',
  'The first fine-tuned legal-BERT scores below the baseline, Claude and Gemini on test.',
];

const marginal =
  'Three of these rest on narrow margins: DeepSeek over the baseline on shift macro-F1, and the tuned legal-BERT over the baseline on both shift metrics, clear the corrected bar by less than 0.007. They meet the pre-registered rule and are labeled marginal in the record.';

const meaning = [
  {
    title: 'There is a best model, and the margin is real',
    body: 'Gemini leads on held-out contracts, and the lead over Claude survives the correction for multiple comparisons. A firm choosing one model has evidence, not a demo.',
  },
  {
    title: 'An open model can match a frontier model at a ninth of the cost',
    body: 'DeepSeek on Fireworks cost $0.0795 per 1,000 segments on test, against $0.6835 for Claude and $0.3233 for Gemini, with no measurable difference from Claude.',
  },
  {
    title: 'A model the firm owns can do the same',
    body: 'The tuned legal-BERT runs on the firm’s own machines, so contract text never leaves them, and it cannot be told apart from Claude on either metric.',
  },
  {
    title: 'Every model gets worse on unfamiliar contracts',
    body: 'Measured on the same 17 clause types, Gemini’s macro-F1 falls from 0.7333 on test to 0.5753 on Franchise and Transportation contracts, never seen in training: a drop of 0.1580 [0.1006, 0.2035]. The baseline and Claude fall further. Scores on familiar contract types overstate what a firm should expect on new ones.',
  },
  {
    title: 'The drop is hard to see without labels',
    body: 'A label-free drift monitor, calibrated on validation, did not detect either shifted contract type under its pre-registered rule. With 13 to 15 contracts per type, the uncertainty swamps the signal.',
  },
];

const tour = [
  { src: `${IMG}/results.jpg`, caption: 'Results for a 7-page marketing agreement. Each flag shows its clause type and score, unflagged text folds away, and the right panel gives CUAD’s own definition of the clause type.' },
  { src: `${IMG}/start.jpg`, caption: 'The start screen. The three notices stay on every screen: a flag is a suggestion, unflagged text is not cleared, and unscored text must be read.' },
  { src: `${IMG}/high-recall.jpg`, caption: 'High recall casts a wider net. The page says what that costs, about 1 correct flag in 22 for the tuned legal-BERT on validation, and lists the clause types that still miss the target.' },
  { src: `${IMG}/compare.jpg`, caption: 'Both models on the same contract, with disagreements first. Agreement is not proof, but disagreement is a good place to start reading.' },
];

const parity = [
  { model: 'Baseline', point: 'Balanced', flagged: '420', changed: '0', diff: '8.88e-16' },
  { model: 'Baseline', point: 'High recall', flagged: '2,401', changed: '0', diff: '8.88e-16' },
  { model: 'Tuned legal-BERT', point: 'Balanced', flagged: '432', changed: '0', diff: '2.86e-06' },
  { model: 'Tuned legal-BERT', point: 'High recall', flagged: '9,216', changed: '0', diff: '4.17e-06' },
];

const failures = [
  {
    title: 'The first fine-tuned transformer came last',
    body: 'Legal-BERT scored below even the TF-IDF baseline on test (0.5408 against 0.6311 macro-F1). The result stays in the record. A tuned successor was pre-registered afterwards as a separate model, with a stricter interval because it is a second look at test.',
  },
  {
    title: 'High recall is expensive',
    body: 'Lowering thresholds toward 90% recall per clause type took the tuned legal-BERT’s precision on validation from 0.6883 to 0.0454. The option is in the product, with that cost stated on the screen, and 17 clause types still miss the target.',
  },
  {
    title: 'Reading PDFs costs the simple model a point',
    body: 'Measured on the 97 validation contracts, extracting text from the PDF instead of using CUAD’s clean text lowered the baseline’s contract-level micro-F1 by 0.0123 [0.0037, 0.0209]. The tuned legal-BERT showed no measurable loss.',
  },
  {
    title: 'A deployment check failed, and stays failed',
    body: 'The first run of the parity check on GKE lost one request to a silently dropped connection, so it fails by the pre-registered rule. The fix changed only the connection handling, with no retries added. The rerun passed, and both runs are kept.',
  },
  {
    title: 'A test cluster outlived its test',
    body: 'The GKE cluster stayed up for about two and a half days after the check, which accounts for nearly all of the $11.69 cloud bill. The script now deletes the cluster itself, even after a failure.',
  },
  {
    title: 'Ten gigabytes almost went to the build',
    body: 'An ignore file that re-included folders swept the LLM caches and all 20 model checkpoints into a 10.1 GiB upload. It was stopped before anything was stored, and the file became a plain exclusion list of 86 files.',
  },
];

const decisions = [
  {
    choice: 'Flags for a lawyer, not answers',
    over: 'Presenting the output as a contract summary',
    why: 'No model here finds every clause. The interface says so on every screen, marks unscored text, and never treats unflagged text as cleared.',
  },
  {
    choice: 'Pre-registration for a solo project',
    over: 'Tuning until the numbers looked good',
    why: 'With six models and many metrics, something always looks like a win. Writing the rules first is what makes the wins that remain believable.',
  },
  {
    choice: 'Contract-level resampling',
    over: 'Treating each clause as independent',
    why: 'Clauses from one contract share drafting style and labelers. Resampling clauses would make the intervals look narrower than the evidence supports.',
  },
  {
    choice: 'Cloud Run for the live demo, GKE for the check',
    over: 'Keeping a Kubernetes cluster running',
    why: 'Cloud Run scales to zero, so the demo costs nothing while idle. GKE showed the same image gives the same answers on a second platform, then it was deleted.',
  },
  {
    choice: 'Models baked into the image',
    over: 'Loading weights from a bucket at startup',
    why: 'The image digest pins the code and the models together, and the service refuses to start if a model file does not match the version that was evaluated.',
  },
  {
    choice: 'The LLM off in the public demo',
    over: 'Shipping an API key to the cloud',
    why: 'A public link and a paid API key do not mix. The two local models need no key; a key-protected LLM option is logged for later.',
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

function Deeper({ summary, children }: { summary: string; children: React.ReactNode }) {
  return (
    <details className="group mt-6 rounded-2xl" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' }}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-sm font-semibold text-theme-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] [&::-webkit-details-marker]:hidden">
        {summary}
        <span aria-hidden className="font-mono text-theme-fg-dim transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="px-5 pb-5 text-sm leading-relaxed text-theme-fg-muted">{children}</div>
    </details>
  );
}

const LO = 0.4;
const HI = 0.78;
const pos = (x: number) => `${((x - LO) / (HI - LO)) * 100}%`;
const TICKS = [0.4, 0.5, 0.6, 0.7];
const SERIES = [
  { key: 'test' as const, label: 'Held-out test, 96 contracts', color: 'var(--color-accent)' },
  { key: 'shift' as const, label: 'Unseen contract types, 28 contracts', color: 'var(--color-fg-dim)' },
];

function Interval({ value, color, label }: { value: [number, number, number]; color: string; label: string }) {
  const [p, lo, hi] = value;
  return (
    <div className="relative h-3" role="img" aria-label={`${label}: ${p.toFixed(4)}, 95% interval ${lo.toFixed(4)} to ${hi.toFixed(4)}`}>
      <div className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full" style={{ left: pos(lo), width: `calc(${pos(hi)} - ${pos(lo)})`, background: color, opacity: 0.5 }} />
      <div className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: pos(p), background: color }} />
    </div>
  );
}

function IntervalChart() {
  return (
    <figure className={card} style={cardStyle}>
      <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2">
        {SERIES.map((sr) => (
          <span key={sr.key} className="flex items-center gap-2 text-xs text-theme-fg-muted">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: sr.color }} aria-hidden />
            {sr.label}
          </span>
        ))}
      </div>
      <div className="space-y-4">
        {macro.map((r) => (
          <div key={r.model} className="grid grid-cols-[6.5rem_1fr] items-center gap-3 sm:grid-cols-[8.5rem_1fr_6.5rem]">
            <span className={`text-xs ${r.best ? 'font-semibold text-theme-fg' : 'text-theme-fg-muted'}`}>{r.model}</span>
            <div className="relative space-y-1.5">
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                {TICKS.map((t) => (
                  <span key={t} className="absolute inset-y-0 w-px" style={{ left: pos(t), background: 'var(--color-border)' }} />
                ))}
              </div>
              {SERIES.map((sr) => (
                <Interval key={sr.key} value={r[sr.key]} color={sr.color} label={`${r.model}, ${sr.label}`} />
              ))}
            </div>
            <span className="hidden text-right font-mono text-[0.7rem] leading-[1.35rem] text-theme-fg-muted sm:block">
              {r.test[0].toFixed(4)}
              <br />
              {r.shift[0].toFixed(4)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-[6.5rem_1fr] gap-3 sm:grid-cols-[8.5rem_1fr_6.5rem]">
        <span />
        <div className="relative h-4 font-mono text-[0.65rem] text-theme-fg-dim">
          {TICKS.map((t) => (
            <span key={t} className="absolute -translate-x-1/2" style={{ left: pos(t) }}>
              {t.toFixed(1)}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-4 text-xs leading-relaxed text-theme-fg-muted">
        Macro-F1 with 95% contract-bootstrap intervals. Test covers the 26 clause types with enough test contracts; the shift set covers the 17 types common enough to measure there, so the two dots are not a like-for-like drop. Section 05 gives that on the same 17 types.
      </figcaption>
    </figure>
  );
}

const card = 'rounded-2xl p-5';
const cardStyle = { border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' };

function Shot({ src, alt, priority, sizes }: { src: string; alt: string; priority?: boolean; sizes: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-elevated)' }}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" priority={priority} />
    </div>
  );
}

export function ClauseReviewCaseStudy({ project }: { project: CustomProject }) {
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
            <Button href={project.links.live} external>
              Try the live demo <ArrowUpRight className="h-4 w-4" />
            </Button>
          )}
          {project.links.github && (
            <Button href={project.links.github} variant="secondary" external>
              <Github className="h-4 w-4" /> View Source
            </Button>
          )}
          <Button href={RESULTS} variant="secondary" external>
            <FileText className="h-4 w-4" /> Full results
          </Button>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-theme-fg-muted">
          The demo&rsquo;s server sleeps when idle, so the first review can take about a minute to start.
        </p>
      </section>

      <div className="mx-auto max-w-[1100px] px-6 lg:px-8">
        <Shot src={`${IMG}/results.jpg`} alt="Clause Review flagging Expiration Date, Anti-Assignment and Governing Law in a marketing agreement" sizes="(max-width: 1100px) 100vw, 1100px" priority />

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
          <div className="space-y-4 text-lg leading-relaxed text-theme-fg">
            <p>
              Clause Review reads a commercial contract and points a lawyer to the clauses worth checking: governing law, change of control, caps on liability and 30 other types.
            </p>
            <p className="text-base text-theme-fg-muted">
              Behind it is a comparison of six models on lawyer-labeled contracts, measured under rules written before any result existed, with the uncertainty shown on every number. The live service was then checked against that evaluation, flag by flag.
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
            <Heading>In contract review, the expensive mistake is the clause nobody flagged</Heading>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-theme-fg-muted">
              <p>
                A lawyer reviewing a supply agreement needs to know where it restricts assignment, caps liability or lets the other side walk away. A tool that highlights those clauses saves hours, but only if the firm knows how often it misses one, and whether that holds on contracts unlike the ones it was built on.
              </p>
              <p>
                Model choice is easy to get wrong here. Large language models are impressive in a demo, fine-tuned models are cheaper and private, and a small held-out set can make almost any of them look best by chance. So the question for this project was not &ldquo;can a model find clauses?&rdquo; but &ldquo;which approach would a firm be right to trust, and how sure can we be?&rdquo;
              </p>
            </div>
          </div>

          <div>
            <Eyebrow n="02">How the numbers were kept honest</Eyebrow>
            <Heading>Five rules, fixed before any model was scored</Heading>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {rules.map((r, i) => (
                <details key={r.title} className={`group ${card} ${i === rules.length - 1 ? 'sm:col-span-2' : ''}`} style={cardStyle}>
                  <summary className="cursor-pointer list-none rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] [&::-webkit-details-marker]:hidden">
                    <h3 className="flex items-start justify-between gap-3 text-sm font-semibold text-theme-fg">
                      {r.title}
                      <span aria-hidden className="font-mono text-theme-fg-dim transition-transform group-open:rotate-45">+</span>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-theme-fg-muted">{r.body}</p>
                  </summary>
                  <p className="mt-3 border-t pt-3 text-xs leading-relaxed text-theme-fg-muted" style={{ borderColor: 'var(--color-border)' }}>
                    {r.detail}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow n="03">The contenders</Eyebrow>
            <Heading>Six ways to find a clause</Heading>
            <p className="mt-5 text-base leading-relaxed text-theme-fg-muted">
              Contracts are cut into segments of up to about 1,500 characters, and each segment can carry several of the 33 clause types or none. Every model gets per-type thresholds tuned on validation, so they are compared at their best settings, not at a default.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((m) => (
                <div key={m.name} className={card} style={cardStyle}>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-theme-accent">{m.kind}</p>
                  <h3 className="mt-2 text-sm font-semibold text-theme-fg">{m.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-theme-fg-muted">{m.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow n="04">Results</Eyebrow>
            <Heading>Gemini leads, and the intervals say how much that means</Heading>
            <p className="mt-5 text-base leading-relaxed text-theme-fg-muted">
              Macro-F1 averages the score of each clause type, so a rare type counts as much as a common one. Dots are scores; lines are 95% intervals. Where two lines overlap a lot, the data cannot tell the models apart.
            </p>
            <div className="mt-8">
              <IntervalChart />
            </div>

            <h3 className="mt-10 text-sm font-semibold text-theme-fg">What the evidence supports</h3>
            <ul className="mt-4 space-y-3">
              {claims.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm leading-relaxed text-theme-fg-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-theme-accent" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-theme-fg-muted">{marginal}</p>
            <p className="mt-4 text-xs leading-relaxed text-theme-fg-muted">
              CUAD has been public since 2021, so Claude, Gemini and DeepSeek may have seen these contracts in training, which would make their scores optimistic. The shift set comes from the same release.
            </p>

            <Deeper summary="All scores, both metrics, with intervals">
              <div className="-mx-1 overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-xs">
                  <thead>
                    <tr className="text-[0.65rem] uppercase tracking-[0.08em] text-theme-fg-dim">
                      <th scope="col" className="py-2 pr-3 font-semibold">Model</th>
                      <th scope="col" className="py-2 pr-3 font-semibold">Test macro-F1</th>
                      <th scope="col" className="py-2 pr-3 font-semibold">Test micro-F1</th>
                      <th scope="col" className="py-2 pr-3 font-semibold">Shift macro-F1</th>
                      <th scope="col" className="py-2 font-semibold">Shift micro-F1</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {table.map((t) => (
                      <tr key={t.model} style={{ borderTop: '1px solid var(--color-border)' }}>
                        <td className="py-2 pr-3 font-body text-theme-fg">{t.model}</td>
                        <td className="py-2 pr-3">{t.tm}</td>
                        <td className="py-2 pr-3">{t.ti}</td>
                        <td className="py-2 pr-3">{t.sm}</td>
                        <td className="py-2">{t.si}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Test uses the clause types with enough test contracts (Rule A); shift uses the 17 types with at least 10 shift contracts (Rule C). Paired differences, adjusted intervals and the three marginal claims are in the{' '}
                <a href={RESULTS} target="_blank" rel="noopener noreferrer" className="text-theme-accent underline-offset-2 hover:underline">
                  full results
                </a>
                .
              </p>
            </Deeper>
          </div>

          <div>
            <Eyebrow n="05">What it means for a firm</Eyebrow>
            <Heading>Five things the comparison settles</Heading>
            <div className="mt-8 space-y-4">
              {meaning.map((m) => (
                <div key={m.title} className="pl-5" style={{ borderLeft: '2px solid var(--color-accent)' }}>
                  <h3 className="text-sm font-semibold text-theme-fg">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-theme-fg-muted">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <section className="mx-auto max-w-[1100px] px-6 pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Eyebrow n="06">The product</Eyebrow>
          <Heading>A review aid a lawyer can use without trusting it blindly</Heading>
          <p className="mt-5 text-base leading-relaxed text-theme-fg-muted">
            The live demo serves the baseline and the tuned legal-BERT. Upload a PDF or paste text, and the contract comes back as a document with its flags in place.
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
          <div className="relative mx-auto aspect-[390/844] w-full max-w-[220px] overflow-hidden rounded-[1.6rem]" style={{ border: '5px solid var(--color-bg-elevated)', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}>
            <Image src={`${IMG}/mobile.jpg`} alt="Clause Review start screen on a phone" fill sizes="220px" className="object-cover object-top" />
          </div>
          <p className="text-sm leading-relaxed text-theme-fg-muted">
            On a phone the layout stacks, the notices stay at the top, and the flag panel sits at the bottom of the screen. Clause definitions are CUAD&rsquo;s own category descriptions, so the tool never paraphrases what a clause type means.
          </p>
        </div>
      </section>

      <Section divider className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-20">
          <div>
            <Eyebrow n="07">Shipping it</Eyebrow>
            <Heading>The deployed models give the evaluated answers, exactly</Heading>
            <p className="mt-5 text-base leading-relaxed text-theme-fg-muted">
              A model can pass its evaluation and still change in production: a different library, different hardware, a file that did not make it into the image. So before linking the demo, a pre-registered check sent 20 validation contracts to the live service and compared every flag with the predictions that were evaluated.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <div className={`${card} text-center`} style={cardStyle}>
                <p className="font-semibold text-theme-fg">Static front end on Vercel</p>
                <p className="mt-1 text-theme-fg-muted">Plain HTML, CSS and JavaScript. Text reaches the page only as text, never as markup.</p>
              </div>
              <p className="text-center font-mono text-xs text-theme-fg-dim">JSON over HTTPS, one allowed origin</p>
              <div className={card} style={{ ...cardStyle, borderColor: 'var(--color-accent)' }}>
                <p className="font-semibold text-theme-fg">FastAPI service on Cloud Run</p>
                <p className="mt-1 text-theme-fg-muted">
                  One Docker image with both models baked in, 2 vCPU and 8 GiB, scaling from 0 to 3 instances. It refuses to start if a model file does not match its evaluated version, and caps text and upload size.
                </p>
              </div>
              <p className="text-center font-mono text-xs text-theme-fg-dim">same image digest, deployed once to GKE Autopilot for the check</p>
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--color-border)' }}>
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="text-[0.7rem] uppercase tracking-[0.08em] text-theme-fg-dim" style={{ background: 'var(--color-bg-elevated)' }}>
                    <th scope="col" className="px-4 py-3 font-semibold">Model</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Setting</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Flags checked</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Changed</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Max score drift</th>
                  </tr>
                </thead>
                <tbody>
                  {parity.map((p) => (
                    <tr key={`${p.model}${p.point}`} style={{ borderTop: '1px solid var(--color-border)' }}>
                      <td className="px-4 py-2.5 text-xs text-theme-fg">{p.model}</td>
                      <td className="px-4 py-2.5 text-xs text-theme-fg-muted">{p.point}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-theme-fg-muted">{p.flagged}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-theme-fg">{p.changed}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-theme-fg-muted">{p.diff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-theme-fg-muted">
              Cloud Run, 3,023 segments and 99,759 (segment, clause type) decisions per row. &ldquo;Flags checked&rdquo; counts decisions flagged by either side. The tuned legal-BERT was evaluated on a Mac GPU and runs on cloud CPUs; its scores move by at most 0.0000063 across both platforms, and no flag changes. GKE gave the same result on its second run.
            </p>

            <Deeper summary="Operations: cold start, latency, cost">
              <ul className="space-y-2">
                <li>Cold start about 72 s from an idle instance to a ready service, most of it loading PyTorch and both models. The front end shows a waiting message and retries for up to 150 s.</li>
                <li>On GKE, a whole contract took under a second with the baseline and 1 to 121 s with the tuned legal-BERT.</li>
                <li>Image 1.02 GB; first build 5 min 26 s, rebuild 2 min 27 s.</li>
                <li>Cloud cost 1 to 4 October 2026: $11.69, nearly all of it the GKE cluster. The live Cloud Run service stayed within the free tier.</li>
                <li>LLM API spend for the whole project, from prompt iteration to held-out runs: about $55.81 against a hard cap of $150 enforced by a spend ledger.</li>
              </ul>
            </Deeper>
          </div>

          <div>
            <Eyebrow n="08">What did not work</Eyebrow>
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
            <Heading>A test no model has seen</Heading>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-theme-fg-muted">
              <p>
                Every score here comes from CUAD, which the LLMs may have seen and every model has now been tested on once. The next step is a small set of new contracts from outside CUAD, labeled with the same 33 types under a written guide, with its comparisons fixed before any model sees it.
              </p>
              <p>
                Only then would I try combining models, such as the tuned legal-BERT with Gemini: choosing a combination after seeing the CUAD test results and judging it on the same test would reward luck.
              </p>
            </div>
          </div>

          <div className={card} style={cardStyle}>
            <p className="text-sm font-semibold text-theme-fg">Check any number on this page</p>
            <p className="mt-2 text-sm leading-relaxed text-theme-fg-muted">
              Each figure comes from the project&rsquo;s results file, which names the command and output behind it, and the build log records every decision, pre-registration and problem in order.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button href={RESULTS} variant="secondary" external>
                <FileText className="h-4 w-4" /> Results
              </Button>
              <Button href={BUILD_LOG} variant="secondary" external>
                <FileText className="h-4 w-4" /> Build log
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
