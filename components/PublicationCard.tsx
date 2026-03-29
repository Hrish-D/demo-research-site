'use client';

import { motion } from 'framer-motion';
import { Publication } from '@/lib/types';

interface PublicationCardProps {
  publication: Publication;
  index?: number;
}

const PublicationCard = ({ publication, index = 0 }: PublicationCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card p-6 card-hover group"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="tag font-semibold">{publication.year}</span>
        {publication.doi && (
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent-600 dark:text-accent-400 hover:underline font-medium transition-colors"
          >
            DOI &#8599;
          </a>
        )}
      </div>

      <h3 className="text-base font-serif font-semibold text-[var(--foreground)] mb-3 leading-snug group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
        {publication.title}
      </h3>

      <p className="text-sm text-[var(--muted-foreground)] mb-2">
        {publication.authors.join(', ')}
      </p>

      <p className="text-sm text-accent-600/70 dark:text-accent-400/70 italic mb-4">
        {publication.journal}
      </p>

      {publication.abstract && (
        <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-4 leading-relaxed">
          {publication.abstract}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {publication.tags.map((tag) => (
          <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--muted)] text-[var(--muted-foreground)]">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[var(--card-border)]">
        {publication.doi && (
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline transition-colors"
          >
            Read Paper &#8599;
          </a>
        )}
      </div>
    </motion.article>
  );
};

export default PublicationCard;
