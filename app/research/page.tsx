'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import FilterBar from '@/components/FilterBar';
import { RESEARCH_PROJECTS } from '@/lib/data';

export default function ResearchPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    RESEARCH_PROJECTS.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) {
      return RESEARCH_PROJECTS;
    }
    return RESEARCH_PROJECTS.filter((project) =>
      selectedTags.some((tag) => project.tags.includes(tag)),
    );
  }, [selectedTags]);

  // Group by status
  const projectsByStatus = useMemo(() => {
    return {
      active: filteredProjects.filter((p) => p.status === 'active'),
      completed: filteredProjects.filter((p) => p.status === 'completed'),
      planned: filteredProjects.filter((p) => p.status === 'planned'),
    };
  }, [filteredProjects]);

  return (
    <>
      <HeroSection
        title="Research Projects"
        subtitle="Explore Our Work"
        description="Cutting-edge research in materials science, nanotechnology, and biomimetic systems"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
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
            {!(selectedTags.length === 0) && (
              <p className="text-sm text-slate-600 mt-4">
                Showing {filteredProjects.length} of {RESEARCH_PROJECTS.length}{' '}
                projects
              </p>
            )}
          </motion.div>

          {/* Active Projects */}
          {projectsByStatus.active.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-900 mb-8">
                Active Research
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsByStatus.active.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Completed Projects */}
          {projectsByStatus.completed.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-900 mb-8">
                Completed Research
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsByStatus.completed.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Planned Projects */}
          {projectsByStatus.planned.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-900 mb-8">
                Planned Research
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsByStatus.planned.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-slate-600 text-lg">
                No projects found matching the selected filters.
              </p>
              <button
                onClick={() => setSelectedTags([])}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
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
