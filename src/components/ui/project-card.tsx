import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'card-surface group relative flex flex-col overflow-hidden rounded-2xl',
        'hover:-translate-y-1',
        className
      )}
    >
      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, var(--accent-glow) 0%, transparent 50%)',
        }}
      />

      {/* Thumbnail */}
      <div
        className="relative overflow-hidden aspect-[16/9]"
        style={{
          background: 'color-mix(in srgb, var(--color-accent) 4%, var(--color-bg-elevated))',
        }}
      >
        <Image
          src={project.thumbnail}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="relative z-[2] flex flex-1 flex-col p-6">
        <span className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-theme-accent">
          {project.year}
        </span>

        <h3 className="font-display text-[1.35rem] font-normal text-theme-fg">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-[0.85rem] font-light leading-relaxed text-theme-fg-muted">
          {project.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {project.tags.length > 5 && <Tag>+{project.tags.length - 5}</Tag>}
        </div>

        <div
          className="mt-5 flex items-center gap-4 pt-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1 text-[0.75rem] font-medium text-theme-fg-muted transition-colors hover:text-theme-accent"
            >
              <span className="sr-only">{project.title} — </span>Live Demo{' '}
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1 text-[0.75rem] font-medium text-theme-fg-muted transition-colors hover:text-theme-accent"
            >
              <Github className="h-3 w-3" aria-hidden />
              <span className="sr-only">{project.title} — </span>Code
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="relative z-10 ml-auto inline-flex items-center gap-1 text-[0.75rem] font-medium text-theme-fg-muted transition-colors hover:text-theme-accent"
          >
            <span className="sr-only">{project.title} — </span>Case Study{' '}
            <ArrowUpRight className="h-3 w-3" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
