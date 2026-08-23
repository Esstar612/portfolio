import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = createMetadata({
  title: 'About',
  description:
    'Full-stack software engineer graduating May 2026 from RPI, building production-grade web and mobile applications.',
  path: '/about',
});

const timeline = [
  {
    year: '2026',
    title: 'Software Engineering Intern — Dandy',
    desc: 'Product Lines team shipping features across Dandy\'s digital dental platform (React, Node.js). Incoming Summer 2026.',
  },
  {
    year: '2024–Present',
    title: 'Open Source Contributor — Magic Grid',
    desc: 'Shipping features for a 3.1K+ star, 246K+ download JavaScript library. Led development of use-magic-grid, the React port.',
  },
  {
    year: '2026',
    title: 'B.S. Computer Science & IT/Web Sciences — RPI',
    desc: 'Minor in Cognitive Science. Focus on full-stack development, HCI, and database systems.',
  },
];

export default function AboutPage() {
  return (
    <div className="page-enter pt-20 md:pt-24">
      <Section divider className="pt-6 md:pt-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-[2.5rem] font-normal tracking-tight text-theme-fg md:text-[3rem]">
            About <em className="text-theme-accent-soft">Me</em>
          </h1>

          <div className="mt-10 space-y-6 text-[1rem] font-light leading-[1.8] text-theme-fg-muted">
            <p>
              I&apos;m a full-stack software engineer who cares deeply about the
              intersection of engineering rigor and product impact. I graduate in May
              2026 from Rensselaer Polytechnic Institute with a dual major in Computer
              Science and IT/Web Sciences, plus a minor in Cognitive Science.
            </p>
            <p>
              This summer I&apos;m joining <strong className="font-semibold text-theme-fg">Dandy</strong> as
              a software engineering intern on the Product Lines team. I&apos;m drawn to
              high-growth environments where engineers own the product surface they
              touch and shipping matters.
            </p>
            <p>
              I&apos;m also an active open source contributor — I help maintain{' '}
              <strong className="font-semibold text-theme-fg">Magic Grid</strong> (3.1K+ stars, 246K+
              npm downloads) and led development of its official React port. I believe
              the best way to grow as an engineer is to build in public and give back
              to the tools you rely on.
            </p>
            <p>
              My work spans the entire stack: Next.js and React on the frontend,
              Node.js and Express on the backend, MongoDB and PostgreSQL for data,
              Flutter for mobile, and cloud infrastructure on GCP, Vercel, and
              Firebase. I care about clean architecture, measurable outcomes, and
              making software that feels alive.
            </p>
          </div>

          {/* Resume button */}
          <div className="mt-10">
            <Button href={siteConfig.links.resume} external size="lg">
              <FileText className="h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section divider>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-[1.75rem] font-normal text-theme-fg">
            <em className="text-theme-accent-soft">Timeline</em>
          </h2>

          <div className="mt-10 space-y-8">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="flex gap-6 rounded-2xl p-5 transition-all duration-300"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <span className="shrink-0 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-theme-accent">
                  {item.year}
                </span>
                <div>
                  <h3 className="font-display text-[1.05rem] text-theme-fg">{item.title}</h3>
                  <p className="mt-1 text-[0.85rem] font-light leading-relaxed text-theme-fg-muted">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
