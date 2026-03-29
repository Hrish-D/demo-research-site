'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigation } from '@/lib/navigation-state';
import { LAB_STATS, RESEARCH_PROJECTS, PUBLICATIONS, TEAM_MEMBERS } from '@/lib/data';

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HomepageContent() {
  const { goBackToAtom } = useNavigation();
  const activeProjects = RESEARCH_PROJECTS.filter((p) => p.status === 'active').slice(0, 4);
  const recentPubs = PUBLICATIONS.slice(0, 4);

  return (
    <motion.div
      className="relative bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ─── Hero Section ─── */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Ambient bg */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-teal-400/80 text-sm tracking-[0.3em] uppercase mb-6 font-sans">
              Institute of Advanced Research
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[0.9] mb-8">
              Advanced Materials
              <br />
              <span className="text-teal-400">& Systems Lab</span>
            </h1>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
              Pioneering research at the intersection of materials science,
              nanotechnology, and biomimetic systems
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {LAB_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-serif text-teal-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ─── Mission Section ─── */}
      <section className="py-32 md:py-40 relative">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="text-teal-400/60 text-sm tracking-[0.2em] uppercase mb-6 font-sans">
              Our Mission
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
              Understanding matter at the smallest scale to solve the
              <span className="text-teal-400"> biggest challenges</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/50 text-lg leading-relaxed max-w-3xl">
              We believe the next generation of materials will be inspired by nature,
              guided by computation, and designed for sustainability. Our lab brings
              together chemists, engineers, and data scientists to make this vision a reality.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Research Highlights ─── */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-white/[0.02]" />
        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-teal-400/60 text-sm tracking-[0.2em] uppercase mb-4 font-sans">
              Featured Research
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-16">
              Advancing the frontiers of knowledge
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                    <span className="text-teal-400/60 text-xs tracking-wider uppercase font-sans">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif mb-3 group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[10px] border border-white/[0.08] text-white/40 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Recent Publications ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="text-teal-400/60 text-sm tracking-[0.2em] uppercase mb-4 font-sans">
              Recent Publications
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-16">
              Latest from the lab
            </h2>
          </Reveal>

          <div className="space-y-6">
            {recentPubs.map((pub, i) => (
              <Reveal key={pub.id} delay={i * 0.08}>
                <div className="group p-6 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-white/90 font-serif mb-2 group-hover:text-teal-400 transition-colors">
                        {pub.title}
                      </p>
                      <p className="text-white/30 text-sm mb-1">
                        {pub.authors.join(', ')}
                      </p>
                      <p className="text-teal-400/50 text-sm italic">
                        {pub.journal} ({pub.year})
                      </p>
                    </div>
                    <span className="text-white/20 text-sm font-mono shrink-0">
                      {pub.year}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team Preview ─── */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-white/[0.02]" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-teal-400/60 text-sm tracking-[0.2em] uppercase mb-4 font-sans">
              Our Team
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-16">
              {TEAM_MEMBERS.length} researchers shaping the future
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] hover:border-teal-400/30 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500/30 to-orange-500/30 flex items-center justify-center text-xs font-medium text-white/70">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-white/80 group-hover:text-teal-400 transition-colors">
                      {member.name}
                    </p>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">
                      {member.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Back to Atom CTA ─── */}
      <section className="py-32 md:py-40 text-center relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              Explore our universe
            </h2>
            <p className="text-white/40 text-lg mb-10">
              Navigate the atomic model to discover our research, publications, team, and more.
            </p>
            <button
              onClick={goBackToAtom}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-teal-400/30 text-teal-400 hover:bg-teal-400/10 transition-all duration-300 text-sm tracking-wider uppercase font-sans"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="3" />
                <ellipse cx="12" cy="12" rx="10" ry="4" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" />
              </svg>
              Back to Atomic Model
            </button>
          </Reveal>
        </div>
      </section>
    </motion.div>
  );
}
