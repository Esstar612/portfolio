import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, FileText, Github, Lock, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Section } from '@/components/ui/section';
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects';
import { createMetadata } from '@/lib/metadata';
import { getImageSize } from '@/lib/image-size';

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return createMetadata({ title: project.title, description: project.tagline, path: `/projects/${project.slug}` });
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="page-enter">
      {/* Header */}
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
          {project.tags.map((tag) => (<Tag key={tag}>{tag}</Tag>))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.live && (
            <Button href={project.links.live} external>Live Demo <ArrowUpRight className="h-4 w-4" /></Button>
          )}
          {project.links.androidDemo && (
            <Button href={project.links.androidDemo} variant="secondary" external>
              <Smartphone className="h-4 w-4" /> Android Demo
            </Button>
          )}
          {project.links.github && (
            <Button href={project.links.github} variant="secondary" external><Github className="h-4 w-4" /> View Source</Button>
          )}
        </div>

        {/* Stands in for a View Source button the project cannot offer */}
        {project.sourceNote && (
          <p className="mt-5 flex max-w-2xl items-start gap-2 text-sm text-theme-fg-muted">
            <Lock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-theme-fg-dim" aria-hidden />
            {project.sourceNote}
          </p>
        )}
      </section>

      {/* Hero image */}
      <div className="mx-auto max-w-[1100px] px-6 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl" style={{ border: '1px solid var(--color-border)' }}>
          <Image src={project.thumbnail} alt={project.title} fill sizes="(max-width: 1100px) 100vw, 1100px" className="object-cover object-top" priority />
        </div>
      </div>

      {/* Case study */}
      <Section divider className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-16">
          {[
            { label: 'THE PROBLEM', content: project.problem },
            { label: 'THE SOLUTION', content: project.solution },
          ].map((s) => (
            <div key={s.label}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-theme-fg-dim">{s.label}</h2>
              <p className="text-base leading-relaxed text-theme-fg-muted">{s.content}</p>
            </div>
          ))}

          <div>
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.1em] text-theme-fg-dim">{project.architectureLabel ?? 'TECHNICAL ARCHITECTURE'}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {(Object.entries(project.architecture) as [string, string][]).map(([layer, detail]) => (
                <div key={layer} className="rounded-2xl p-5" style={{ border: '1px solid var(--color-border)' }}>
                  <h3 className="mb-2 text-sm font-semibold capitalize text-theme-fg">{layer}</h3>
                  <p className="text-sm leading-relaxed text-theme-fg-muted">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-theme-fg-dim">{project.highlightsLabel ?? 'KEY ENGINEERING HIGHLIGHTS'}</h2>
            <ul className="space-y-3">
              {project.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-theme-fg-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-theme-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {[
            { label: 'CHALLENGES & TRADEOFFS', content: project.challenges },
            { label: 'RESULTS & IMPACT', content: project.results },
          ].map((s) => (
            <div key={s.label}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-theme-fg-dim">{s.label}</h2>
              <p className="text-base leading-relaxed text-theme-fg-muted">{s.content}</p>
            </div>
          ))}

          {project.documents && project.documents.length > 0 && (
            <div>
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.1em] text-theme-fg-dim">DELIVERABLES</h2>
              {/* A lone document spans the row rather than leaving half of it empty. */}
              <div className={project.documents.length === 1 ? 'grid gap-4' : 'grid gap-4 sm:grid-cols-2'}>
                {project.documents.map((doc) => (
                  <a
                    key={doc.file}
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/doc flex flex-col rounded-2xl p-5 transition-colors hover:border-theme-fg-dim"
                    style={{ border: '1px solid var(--color-border)' }}
                  >
                    <div className="mb-2 flex items-start gap-3">
                      <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-theme-accent" aria-hidden />
                      <h3 className="text-sm font-semibold text-theme-fg">{doc.label}</h3>
                      <ArrowUpRight
                        className="ml-auto h-4 w-4 flex-shrink-0 text-theme-fg-dim transition-colors group-hover/doc:text-theme-accent"
                        aria-hidden
                      />
                    </div>
                    <p className="text-sm leading-relaxed text-theme-fg-muted">{doc.description}</p>
                    <p className="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-theme-fg-dim">
                      {doc.meta}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.1em] text-theme-fg-dim">SCREENSHOTS</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.images.map((src, i) => {
                const size = getImageSize(src);
                const portrait = size ? size.height > size.width : false;
                return (
                  <div
                    key={src}
                    className={
                      portrait
                        ? 'relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-2xl'
                        : 'relative aspect-video overflow-hidden rounded-2xl'
                    }
                    style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-elevated)' }}
                  >
                    {/* Frame follows the capture: phone portraits get a tall tile, desktop shots stay 16:9 */}
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      // Two ~380px columns inside a max-w-3xl container — "50vw"
                      // overstated it badly and pulled the 1920px variant for a
                      // tile that never renders wider than 380 CSS px.
                      sizes="(max-width: 640px) 100vw, 380px"
                      className="object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-20 pt-0">
        <div className="text-center">
          <Button href="/projects" variant="secondary"><ArrowLeft className="h-4 w-4" /> Back to All Projects</Button>
        </div>
      </Section>
    </div>
  );
}
