'use client';

import { motion } from 'framer-motion';
import { ResearchProject } from '@/lib/types';

interface ProjectCardProps {
  project: ResearchProject;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const statusColors: Record<string, string> = {
    active: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    completed: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    planned: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0, 1] }}
      className="card card-hover group h-full flex flex-col overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full h-48 md:h-56 overflow-hidden bg-[var(--muted)]">
        <div className="w-full h-full bg-gradient-to-br from-accent-500/20 via-accent-600/10 to-transparent flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-accent-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <svg className="w-8 h-8 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-serif font-semibold text-[var(--foreground)] mb-3 line-clamp-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-sm text-[var(--muted-foreground)] mb-5 line-clamp-3 flex-grow leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] pt-4 border-t border-[var(--card-border)]">
          <span>{project.publications.length} publications</span>
          <span className="text-accent-600 dark:text-accent-400 font-medium group-hover:translate-x-1 transition-transform duration-300">
            Learn more &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
