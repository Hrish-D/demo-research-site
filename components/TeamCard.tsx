'use client';

import { motion } from 'framer-motion';
import { TeamMember } from '@/lib/types';

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

const TeamCard = ({ member, index = 0 }: TeamCardProps) => {
  const roleColors: Record<string, string> = {
    pi: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
    phd: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    undergrad: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    collaborator: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  };

  const roleLabels: Record<string, string> = {
    pi: 'Principal Investigator',
    phd: 'PhD Student',
    undergrad: 'Undergraduate',
    collaborator: 'Collaborator',
  };

  const initials = member.name.split(' ').map(n => n[0]).join('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card card-hover group overflow-hidden"
    >
      {/* Avatar area */}
      <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-accent-500/10 via-accent-600/5 to-transparent">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-accent-500/15 dark:bg-accent-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <span className="text-2xl font-serif font-semibold text-accent-700 dark:text-accent-400">
              {initials}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${roleColors[member.role]}`}>
          {roleLabels[member.role]}
        </span>

        <h3 className="text-lg font-serif font-semibold text-[var(--foreground)] mb-1 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
          {member.name}
        </h3>

        <p className="text-sm text-[var(--muted-foreground)] font-medium mb-3">
          {member.title}
        </p>

        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-2 mb-4">
          {member.specialization || member.bio}
        </p>

        <div className="flex items-center gap-2 pt-4 border-t border-[var(--card-border)]">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-500/10 transition-all duration-300"
              title="Email"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          )}
          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-500/10 transition-all duration-300"
              title="Website"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
