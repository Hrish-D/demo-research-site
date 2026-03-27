'use client';

import { motion } from 'framer-motion';
import { TeamMember } from '@/lib/types';

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

const TeamCard = ({ member, index = 0 }: TeamCardProps) => {
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'pi':
        return 'bg-purple-50 text-purple-700';
      case 'phd':
        return 'bg-blue-50 text-blue-700';
      case 'undergrad':
        return 'bg-green-50 text-green-700';
      case 'collaborator':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-slate-50 text-slate-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'pi':
        return 'Principal Investigator';
      case 'phd':
        return 'PhD Student';
      case 'undergrad':
        return 'Undergraduate';
      case 'collaborator':
        return 'Collaborator';
      default:
        return role;
    }
  };

  return (
    <motion.div
      className="card-base overflow-hidden flex flex-col"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-blue-100 to-slate-100">
        {member.image && (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        )}
        {!member.image && (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-slate-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Role Badge */}
        <span
          className={`inline-flex items-center w-fit px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getRoleColor(
            member.role,
          )}`}
        >
          {getRoleLabel(member.role)}
        </span>

        {/* Name */}
        <h3 className="text-xl font-serif font-semibold text-slate-900 mb-1">
          {member.name}
        </h3>

        {/* Title */}
        <p className="text-sm text-slate-600 font-medium mb-3">{member.title}</p>

        {/* Specialization or Bio */}
        <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-3">
          {member.specialization || member.bio}
        </p>

        {/* Contact Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
              title="Email"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          )}
          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
              title="Website"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5h3V9h4v3h3l-5 5z" />
              </svg>
            </a>
          )}
          <div className="flex-grow" />
          <span className="text-xs text-slate-500">{member.bio.slice(0, 20)}...</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
