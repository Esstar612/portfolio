import { Hero } from '@/components/sections/hero';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { TechStrip } from '@/components/sections/tech-strip';
import { AboutPreview } from '@/components/sections/about-preview';

/**
 * Home page — the main landing experience.
 * Composed from discrete section components.
 */
export default function HomePage() {
  return (
    <div className="page-enter">
      <Hero />
      <FeaturedProjects />
      <TechStrip />
      <AboutPreview />
    </div>
  );
}
