'use client';

import { motion } from 'framer-motion';
import { ResearchProject } from '@/lib/types';
import Link from 'next/link';

interface ProjectCardProps {
  project: ResearchProject;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="card-base overflow-hidden group h-full flex flex-col"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 md:h-56 overflow-hidden bg-slate-100">
        {project.image && (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          </>
        )}
        {!project.image && (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              project.status === 'active'
                ? 'bg-green-100 text-green-700'
                : project.status === 'completed'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-amber-100 text-amber-700'
            }`}
          >
            {project.status.charAt(0).toUpperCase() +
              project.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2 line-clamp-2">
          {project.title}
        </h3>

        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-600">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
          <span>{project.publications.length} publications</span>
          <Link
            href={`/research#${project.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
