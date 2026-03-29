'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import FilterBar from '@/components/FilterBar';
import { RESEARCH_PROJECTS } from '@/lib/data';

export default function ResearchPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    <>
      <HeroSection
        title="Research Projects"
        subtitle="Explore Our Work"
        description="Cutting-edge research across materials science, nanotechnology, machine learning, and biomimetic systems."
      />

      <section className="section-padding">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <FilterBar
              tags={allTags}
              selectedTags={selectedTags}
              onTagChange={setSelectedTags}
              label="Filter by research area"
            />
            {selectedTags.length > 0 && (
              <p className="text-sm text-[var(--muted-foreground)] mt-4">
                Showing {filteredProjects.length} of {RESEARCH_PROJECTS.length} projects
              </p>
            )}
          </motion.div>

          {statusSections.map(({ key, label, items }) =>
            items.length > 0 ? (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="mb-20"
              >
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[var(--foreground)]">
                    {label}
                  </h2>
                  <div className="h-px flex-grow bg-[var(--card-border)]" />
                  <span className="text-sm text-[var(--muted-foreground)]">{items.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </motion.div>
            ) : null
          )}

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-[var(--muted-foreground)] text-lg mb-4">
                No projects found matching the selected filters.
              </p>
              <button
                onClick={() => setSelectedTags([])}
                className="text-accent-600 dark:text-accent-400 hover:underline font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
