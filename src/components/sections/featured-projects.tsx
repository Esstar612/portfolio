import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { ProjectCard } from '@/components/ui/project-card';
import { getFeaturedProjects } from '@/data/projects';

export function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <Section divider>
      <div className="mb-12 flex items-baseline justify-between">
        <h2 className="font-display text-[2.25rem] font-normal tracking-tight text-theme-fg">
          Selected <em className="text-theme-accent-soft">Work</em>
        </h2>
        <Link
          href="/projects"
          className="text-[0.78rem] font-medium uppercase tracking-[0.06em] text-theme-accent transition-colors hover:text-theme-accent-soft"
        >
          All Projects →
        </Link>
      </div>

      {/* 3-up so the three featured cards fill the row evenly */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
