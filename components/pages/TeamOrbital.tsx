'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { TEAM_MEMBERS } from '@/lib/data';
import { useNavigation } from '@/lib/navigation-state';

// Role-based colors
const roleStyles: Record<string, { border: string; bg: string; text: string }> = {
  pi: { border: 'border-orange-400/40', bg: 'bg-orange-500/10', text: 'text-orange-400' },
  phd: { border: 'border-teal-400/30', bg: 'bg-teal-500/10', text: 'text-teal-400' },
  undergrad: { border: 'border-blue-400/30', bg: 'bg-blue-500/10', text: 'text-blue-400' },
  collaborator: { border: 'border-purple-400/30', bg: 'bg-purple-500/10', text: 'text-purple-400' },
};

function MemberCard({
  member,
  size = 'default',
  delay = 0,
}: {
  member: typeof TEAM_MEMBERS[0];
  size?: 'large' | 'default' | 'small';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const style = roleStyles[member.role] || roleStyles.phd;
  const initials = member.name.split(' ').map((n) => n[0]).join('');

  const sizeClasses = {
    large: 'w-56 p-6',
    default: 'w-44 p-4',
    small: 'w-36 p-3',
  };

  const avatarSizes = {
    large: 'w-20 h-20 text-2xl',
    default: 'w-14 h-14 text-lg',
    small: 'w-10 h-10 text-sm',
  };

  return (
    <motion.div
      ref={ref}
      className={`${sizeClasses[size]} rounded-2xl border ${style.border} ${style.bg} backdrop-blur-sm flex flex-col items-center text-center hover:scale-105 transition-transform duration-300`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`${avatarSizes[size]} rounded-full bg-gradient-to-br from-white/10 to-white/5 border ${style.border} flex items-center justify-center font-serif ${style.text} mb-3`}
      >
        {initials}
      </div>
      <p className={`text-white/90 font-serif ${size === 'large' ? 'text-base' : 'text-sm'} mb-1 leading-tight`}>
        {member.name}
      </p>
      <p className={`${style.text} ${size === 'large' ? 'text-xs' : 'text-[10px]'} uppercase tracking-wider`}>
        {member.title}
      </p>
      {size === 'large' && member.specialization && (
        <p className="text-white/30 text-xs mt-2 leading-relaxed">
          {member.specialization}
        </p>
      )}
      {member.email && size !== 'small' && (
        <a
          href={`mailto:${member.email}`}
          className="text-[10px] text-white/20 hover:text-teal-400/60 transition-colors mt-2"
        >
          {member.email}
        </a>
      )}
    </motion.div>
  );
}

export default function TeamOrbital() {
  const { goBackToAtom } = useNavigation();
  const ref = useRef<HTMLDivElement>(null);

  const groups = useMemo(() => ({
    pi: TEAM_MEMBERS.filter((m) => m.role === 'pi'),
    phd: TEAM_MEMBERS.filter((m) => m.role === 'phd'),
    undergrad: TEAM_MEMBERS.filter((m) => m.role === 'undergrad'),
    collaborator: TEAM_MEMBERS.filter((m) => m.role === 'collaborator'),
  }), []);

  return (
    <div className="relative bg-black text-white min-h-screen">
      {/* Header */}
      <div className="pt-20 pb-8 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-teal-400/60 text-sm tracking-[0.2em] uppercase mb-4 font-sans">
            Meet the Researchers
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Our Team</h1>
          <p className="text-white/40 max-w-xl mx-auto">
            Talented scientists and researchers working together to advance materials science.
          </p>
        </motion.div>
      </div>

      {/* ─── Orbital Layout (Desktop) ─── */}
      <div className="hidden lg:block relative" ref={ref}>
        <div className="relative w-full max-w-6xl mx-auto" style={{ height: '800px' }}>
          {/* Orbital rings (decorative) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[180, 280, 360].map((r) => (
              <div
                key={r}
                className="absolute rounded-full border border-dashed border-white/[0.04]"
                style={{ width: r * 2, height: r * 2 }}
              />
            ))}
          </div>

          {/* PI at center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            {groups.pi.map((m) => (
              <MemberCard key={m.id} member={m} size="large" delay={0.2} />
            ))}
          </div>

          {/* PhD/PostDocs — inner orbit */}
          {groups.phd.map((m, i) => {
            const angle = ((i * (360 / groups.phd.length)) + 45) * (Math.PI / 180);
            const radius = 260;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.45;
            return (
              <div
                key={m.id}
                className="absolute z-[5]"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <MemberCard member={m} size="default" delay={0.3 + i * 0.1} />
              </div>
            );
          })}

          {/* Undergrads — outer orbit */}
          {groups.undergrad.map((m, i) => {
            const angle = ((i * (360 / groups.undergrad.length)) + 60) * (Math.PI / 180);
            const radius = 400;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.4;
            return (
              <div
                key={m.id}
                className="absolute z-[5]"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <MemberCard member={m} size="small" delay={0.5 + i * 0.1} />
              </div>
            );
          })}

          {/* Collaborators — outermost */}
          {groups.collaborator.map((m, i) => {
            const angle = ((i * (360 / groups.collaborator.length)) + 0) * (Math.PI / 180);
            const radius = 500;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.35;
            return (
              <div
                key={m.id}
                className="absolute z-[5]"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <MemberCard member={m} size="small" delay={0.7 + i * 0.1} />
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 pb-16">
          {[
            { role: 'Principal Investigator', color: 'bg-orange-400' },
            { role: 'PhD / PostDoc', color: 'bg-teal-400' },
            { role: 'Undergraduate', color: 'bg-blue-400' },
            { role: 'Collaborator', color: 'bg-purple-400' },
          ].map(({ role, color }) => (
            <div key={role} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-white/30 text-xs">{role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Mobile fallback: stacked list ─── */}
      <div className="lg:hidden px-6 pb-20 space-y-12">
        {[
          { label: 'Principal Investigator', members: groups.pi },
          { label: 'Researchers & PhD Students', members: groups.phd },
          { label: 'Undergraduate Researchers', members: groups.undergrad },
          { label: 'Collaborators', members: groups.collaborator },
        ].map((group) =>
          group.members.length > 0 ? (
            <div key={group.label}>
              <h3 className="text-sm text-white/40 tracking-wider uppercase mb-6">{group.label}</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {group.members.map((m, i) => (
                  <MemberCard key={m.id} member={m} size="default" delay={i * 0.1} />
                ))}
              </div>
            </div>
          ) : null,
        )}
      </div>

      {/* Join CTA */}
      <section className="py-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-serif mb-4">Interested in Joining?</h3>
          <p className="text-white/40 max-w-md mx-auto mb-8">
            We are always looking for talented researchers passionate about materials science.
          </p>
        </motion.div>
      </section>

      {/* Back button */}
      <div className="pb-12 text-center">
        <button
          onClick={goBackToAtom}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/50 hover:text-teal-400 hover:border-teal-400/30 transition-all text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="3" />
            <ellipse cx="12" cy="12" rx="10" ry="4" />
          </svg>
          Back to Atomic Model
        </button>
      </div>
    </div>
  );
}
