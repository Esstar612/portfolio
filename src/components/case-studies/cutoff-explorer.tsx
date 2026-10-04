'use client';

import { useId, useState } from 'react';
import { cutoffData } from '@/data/newspaper-cutoff';

const CHOSEN = 0.35;
const MIN = 0;
const MAX = 0.8;
const pos = (x: number) => `${((x - MIN) / (MAX - MIN)) * 100}%`;
const TICKS = [0, 0.2, 0.4, 0.6, 0.8];

const rows = [
  { key: 'gold' as const, label: 'Labelled answers', note: 'articles a person marked as answering the question', color: 'var(--color-accent)' },
  { key: 'other' as const, label: 'Everything else', note: 'the other articles in each top 8', color: 'var(--color-fg-muted)' },
  { key: 'unanswerable' as const, label: 'No answer exists', note: 'top hit for each question the archive cannot answer', color: '#d9895b' },
];

function Strip({ values, color, cutoff }: { values: number[]; color: string; cutoff: number }) {
  return (
    <div className="relative h-14" aria-hidden>
      <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: 'var(--color-border)' }} />
      {values.map((v, i) => {
        const kept = v >= cutoff;
        return (
          <span
            key={i}
            className="absolute h-2 w-2 -translate-x-1/2 rounded-full transition-opacity duration-200"
            style={{
              left: pos(v),
              top: `${12 + ((i * 37) % 26)}px`,
              background: color,
              opacity: kept ? 0.95 : 0.16,
            }}
          />
        );
      })}
    </div>
  );
}

export function CutoffExplorer() {
  const [cutoff, setCutoff] = useState(CHOSEN);
  const id = useId();
  const kept = (key: (typeof rows)[number]['key']) => cutoffData[key].filter((v) => v >= cutoff).length;

  return (
    <figure className="rounded-2xl p-5 sm:p-6" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' }}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold text-theme-fg">
          Cutoff <span className="ml-2 font-mono text-2xl font-normal text-theme-accent">{cutoff.toFixed(2)}</span>
        </label>
        <button
          type="button"
          onClick={() => setCutoff(CHOSEN)}
          className="rounded-full px-3 py-1 text-xs text-theme-fg-muted transition-colors hover:text-theme-accent"
          style={{ border: '1px solid var(--color-border)' }}
        >
          Reset to the shipped 0.35
        </button>
      </div>
      <input
        id={id}
        type="range"
        min={0.2}
        max={0.7}
        step={0.01}
        value={cutoff}
        onChange={(e) => setCutoff(Number(e.target.value))}
        className="mt-4 w-full cursor-pointer accent-[var(--color-accent)]"
        aria-valuetext={`${cutoff.toFixed(2)}: ${kept('gold')} of ${cutoffData.gold.length} labelled answers kept, ${kept('other')} of ${cutoffData.other.length} other hits kept`}
      />

      <div className="mt-6 space-y-2">
        {rows.map((r) => (
          <div key={r.key} className="grid gap-x-4 sm:grid-cols-[11rem_1fr]">
            <div className="pt-2">
              <p className="text-xs font-semibold text-theme-fg">{r.label}</p>
              <p className="text-[0.7rem] leading-snug text-theme-fg-muted">{r.note}</p>
            </div>
            <div className="relative">
              <span
                className="pointer-events-none absolute inset-y-0 w-px"
                style={{ left: pos(cutoff), background: 'var(--color-accent)' }}
                aria-hidden
              />
              <Strip values={cutoffData[r.key]} color={r.color} cutoff={cutoff} />
            </div>
          </div>
        ))}
        <div className="grid gap-x-4 sm:grid-cols-[11rem_1fr]">
          <span />
          <div className="relative h-4 font-mono text-[0.65rem] text-theme-fg-dim" aria-hidden>
            {TICKS.map((t) => (
              <span key={t} className="absolute -translate-x-1/2" style={{ left: pos(t) }}>
                {t.toFixed(1)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        {rows.map((r) => (
          <div key={r.key} className="rounded-xl px-4 py-3" style={{ background: 'var(--color-bg-elevated)' }}>
            <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-theme-fg-dim">{r.label}</dt>
            <dd className="mt-1 font-mono text-lg text-theme-fg">
              {kept(r.key)} <span className="text-sm text-theme-fg-muted">of {cutoffData[r.key].length} kept</span>
            </dd>
          </div>
        ))}
      </dl>

      <figcaption className="mt-5 text-xs leading-relaxed text-theme-fg-muted">
        Each dot is one search result from the evaluation: 40 questions, the top 8 results each, scored by Pinecone. Under an answer, only results at or above the cutoff appear as related stories; Claude still reads all eight. At 0.35 every labelled answer stays and 233 of the 273 other results go. Labels are not exhaustive, so some &ldquo;everything else&rdquo; dots above the line are genuinely related.
      </figcaption>
    </figure>
  );
}
