import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { ProjectCard } from '@/components/ui/project-card';
import { projects } from '@/data/projects';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Projects',
  description:
    'A collection of full-stack web apps, mobile apps, and developer tools built with modern technologies.',
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <div className="page-enter pt-20 md:pt-24">
      <Section divider className="pt-6 md:pt-8">
        <div className="mb-12 flex items-baseline justify-between md:mb-16">
          <h2 className="font-display text-[2.5rem] font-normal tracking-tight text-theme-fg">
            All <em className="text-theme-accent-soft">Projects</em>
          </h2>
          <Link
            href="/"
            className="text-[0.78rem] font-medium uppercase tracking-[0.06em] text-theme-accent transition-colors hover:text-theme-accent-soft"
          >
            ← Home
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
    </div>
  );
}
