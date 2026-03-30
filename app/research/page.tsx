'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import CosmicNav from '@/components/cosmic/CosmicNav';
import ProjectCard from '@/components/ProjectCard';
import FilterBar from '@/components/FilterBar';
import { RESEARCH_PROJECTS } from '@/lib/data';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ResearchPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    RESEARCH_PROJECTS.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return RESEARCH_PROJECTS;
    return RESEARCH_PROJECTS.filter((p) =>
      selectedTags.some((t) => p.tags.includes(t)),
    );
  }, [selectedTags]);

  const projectsByStatus = useMemo(() => ({
    active: filteredProjects.filter((p) => p.status === 'active'),
    completed: filteredProjects.filter((p) => p.status === 'completed'),
    planned: filteredProjects.filter((p) => p.status === 'planned'),
  }), [filteredProjects]);

  const statusSections = [
    { key: 'active', label: 'Active Research', items: projectsByStatus.active },
    { key: 'completed', label: 'Completed Research', items: projectsByStatus.completed },
    { key: 'planned', label: 'Planned Research', items: projectsByStatus.planned },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <CosmicNav />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <Image
            src="/images/research.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black" />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-teal-400/70 text-xs md:text-sm tracking-[0.4em] uppercase font-sans mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Explore Our Work
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Research Projects
          </motion.h1>
          <motion.p
            className="mt-4 text-white/70 max-w-xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Cutting-edge research across materials science, nanotechnology, machine learning, and biomimetic systems.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-block text-white/30 hover:text-white/60 text-sm transition-colors duration-300 mb-10">
            &larr; Back to Home
          </Link>

          <AnimatedSection className="mb-12">
            <div className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)] transition-shadow duration-500">
              <FilterBar
                tags={allTags}
                selectedTags={selectedTags}
                onTagChange={setSelectedTags}
                label="Filter by research area"
              />
              {selectedTags.length > 0 && (
                <p className="text-sm text-white/30 mt-4">
                  Showing {filteredProjects.length} of {RESEARCH_PROJECTS.length} projects
                </p>
              )}
            </div>
          </AnimatedSection>

          {statusSections.map(({ key, label, items }) =>
            items.length > 0 ? (
              <AnimatedSection key={key} className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-white/90">
                    {label}
                  </h2>
                  <div className="h-px flex-grow bg-white/[0.06]" />
                  <span className="text-sm text-white/30">{items.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </AnimatedSection>
            ) : null
          )}

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-white/50 text-lg mb-4">
                No projects found matching the selected filters.
              </p>
              <button
                onClick={() => setSelectedTags([])}
                className="text-teal-400 hover:underline font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <p className="text-white/15 text-xs tracking-wider">&copy; 2026 Advanced Materials &amp; Systems Lab</p>
        </div>
      </footer>
    </div>
  );
}
