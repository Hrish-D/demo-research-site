'use client';

import { motion } from 'framer-motion';
import { Publication } from '@/lib/types';

interface PublicationCardProps {
  publication: Publication;
  index?: number;
}

const PublicationCard = ({
  publication,
  index = 0,
}: PublicationCardProps) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.05,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.article
      className="card-base p-6 hover:shadow-lg transition-all duration-300"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Year Badge */}
      <div className="flex items-start justify-between mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700">
          {publication.year}
        </span>
        {publication.doi && (
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
          >
            DOI ↗
          </a>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-serif font-semibold text-slate-900 mb-3 leading-snug">
        {publication.title}
      </h3>

      {/* Authors */}
      <p className="text-sm text-slate-600 mb-3">
        <span className="font-medium">{publication.authors.join(', ')}</span>
      </p>

      {/* Journal */}
      <p className="text-sm text-slate-500 italic mb-4">
        {publication.journal}
      </p>

      {/* Abstract */}
      {publication.abstract && (
        <p className="text-sm text-slate-600 line-clamp-3 mb-4">
          {publication.abstract}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {publication.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-3">
        {publication.url && (
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Read Paper ↗
          </a>
        )}
        {publication.doi && (
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-700 transition-colors"
          >
            DOI ↗
          </a>
        )}
      </div>
    </motion.article>
  );
};

export default PublicationCard;
