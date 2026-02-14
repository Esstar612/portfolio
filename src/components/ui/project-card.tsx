'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  className?: string;
  featured?: boolean;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-400',
        'hover:-translate-y-1',
        className
      )}
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        boxShadow: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-hover)';
        e.currentTarget.style.boxShadow =
          '0 20px 60px rgba(0,0,0,0.15), 0 0 40px var(--accent-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
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
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1 text-[0.75rem] font-medium text-theme-fg-muted transition-colors hover:text-theme-accent"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-3 w-3" /> Code
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="relative z-10 ml-auto inline-flex items-center gap-1 text-[0.75rem] font-medium text-theme-fg-muted transition-colors hover:text-theme-accent"
          >
            Case Study <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
