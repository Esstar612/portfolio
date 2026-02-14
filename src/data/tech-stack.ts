/**
 * Technologies displayed in the tech stack strip.
 * Grouped by category for potential filtering.
 */
export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'infra' | 'tools';
}

export const techStack: TechItem[] = [
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Flutter', category: 'mobile' },
  { name: 'Dart', category: 'mobile' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'Java', category: 'backend' },
  { name: 'MongoDB', category: 'database' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Firebase', category: 'infra' },
  { name: 'Google Cloud', category: 'infra' },
  { name: 'Docker', category: 'infra' },
  { name: 'Vercel', category: 'infra' },
  { name: 'GitHub Actions', category: 'tools' },
  { name: 'Git', category: 'tools' },
];
