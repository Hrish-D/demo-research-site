'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { CosmicSection, Reveal, ScrollProgress, SectionDivider } from '@/components/cosmic/CosmicSection';
import CosmicNav from '@/components/cosmic/CosmicNav';
import {
  LAB_STATS,
  RESEARCH_PROJECTS,
  PUBLICATIONS,
  TEAM_MEMBERS,
} from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

/* ── Animated counter for stats ── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const numericMatch = value.match(/^(\d+)/);
    if (!numericMatch) { setDisplay(value); return; }
    const target = parseInt(numericMatch[1], 10);
    const suffix = value.slice(numericMatch[1].length);
    const duration = 1800;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil(target / steps);
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setDisplay(`${current}${suffix}`);
    }, stepTime);
    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <div className="text-3xl md:text-4xl font-serif text-white mb-1">
        {display}
      </div>
      <div className="text-white/30 text-xs tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
}

/* ── Floating cosmic dust specs ── */
const DUST_PARTICLES = [
  { x: '12%', y: '20%', delay: 0, duration: 28 },
  { x: '78%', y: '35%', delay: 4, duration: 34 },
  { x: '45%', y: '70%', delay: 8, duration: 22 },
  { x: '88%', y: '55%', delay: 12, duration: 38 },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.5], [1, 1.1]);
  const heroY = useTransform(heroScroll, [0, 0.5], ['0%', '20%']);

  const activeProjects = RESEARCH_PROJECTS.filter((p) => p.status === 'active').slice(0, 4);
  const recentPubs = PUBLICATIONS.slice(0, 5);
  const pi = TEAM_MEMBERS.find((m) => m.role === 'pi');

  return (
    <>
      <ScrollProgress />
      <CosmicNav />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HERO — Full-screen nebula with lab name
          ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} id="hero" className="noise-bg relative h-screen overflow-hidden">
        {/* Floating cosmic dust particles */}
        {DUST_PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-[3px] h-[3px] rounded-full bg-white/[0.15] z-20 pointer-events-none"
            style={{ left: p.x, top: p.y }}
            animate={{
              x: [0, 60, -40, 20, 0],
              y: [0, -30, 50, -20, 0],
              opacity: [0.15, 0.08, 0.15, 0.06, 0.15],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          />
        ))}

        {/* Background nebula */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale, y: heroY }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/hero.png"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />

        {/* Bottom fade-out edge */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[2]" />

        {/* Hero content */}
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            className="text-teal-400/70 text-xs md:text-sm tracking-[0.4em] uppercase font-sans mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Institute of Advanced Research
          </motion.p>

          <motion.h1
            className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif tracking-tight leading-[0.85] max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Ambient glow behind title */}
            <div className="absolute inset-0 -inset-x-20 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div className="w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.12)_0%,rgba(45,212,191,0.04)_40%,transparent_70%)] blur-2xl" />
            </div>
            <span className="relative text-white">Advanced</span>
            <br />
            <span className="relative text-white">Materials</span>
            <br />
            <span className="relative bg-gradient-to-r from-teal-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              & Systems Lab
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 text-white/40 text-base md:text-lg max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            Pioneering research at the intersection of materials science,
            nanotechnology, and biomimetic systems
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute w-6 h-6 rounded-full border border-white/10"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: MISSION — Galaxy background
          ═══════════════════════════════════════════════════════ */}
      <CosmicSection
        id="mission"
        backgroundSrc="/images/mission.png"
        overlay="gradient-left"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-teal-400/60 text-xs tracking-[0.3em] uppercase mb-6 font-sans">
                Our Mission
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[0.95] text-white mb-8">
                Understanding matter
                <br />
                at the <span className="text-teal-400">smallest scale</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
                We believe the next generation of materials will be inspired by nature,
                guided by computation, and designed for sustainability.
              </p>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {LAB_STATS.map((stat) => (
                  <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </CosmicSection>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: RESEARCH — Cosmic dust background
          ═══════════════════════════════════════════════════════ */}
      <CosmicSection
        id="research"
        backgroundSrc="/images/research.png"
        overlay="darker"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <Reveal>
            <p className="text-purple-400/60 text-xs tracking-[0.3em] uppercase mb-4 font-sans">
              Our Research
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-16">
              Pushing boundaries
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {activeProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1}>
                <div className="group relative overflow-hidden p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] hover:border-l-2 hover:border-l-teal-400 transition-all duration-700">
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                    <span className="text-teal-400/50 text-xs tracking-[0.2em] uppercase">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white/90 mb-4 group-hover:text-teal-300 transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="text-white/35 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[10px] border border-white/[0.06] text-white/30 tracking-wider uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="mt-12 text-center">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 hover:bg-white/[0.04] transition-all duration-500 text-sm tracking-wider"
              >
                View all research
                <span className="text-lg">&#8599;</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </CosmicSection>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: PUBLICATIONS — Aurora/stars background
          ═══════════════════════════════════════════════════════ */}
      <CosmicSection
        id="publications"
        backgroundSrc="/images/publications.png"
        overlay="gradient-right"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="md:ml-auto md:max-w-2xl">
            <Reveal direction="right">
              <p className="text-blue-400/60 text-xs tracking-[0.3em] uppercase mb-4 font-sans">
                Research Output
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-16">
                Publications
              </h2>
            </Reveal>

            <div className="space-y-4">
              {recentPubs.map((pub, i) => (
                <Reveal key={pub.id} delay={i * 0.08} direction="right">
                  <div className="group relative flex gap-5 p-6 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500 backdrop-blur-sm overflow-hidden">
                    {/* Hover line accent */}
                    <div className="absolute left-0 top-0 w-[2px] h-full bg-teal-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                    <span className="text-white/[0.07] text-2xl font-mono font-bold leading-none mt-1 shrink-0 select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-white/80 font-serif text-base leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-500">
                        {pub.title}
                      </p>
                      <p className="text-white/25 text-sm mb-1">
                        {pub.authors.slice(0, 3).join(', ')}
                        {pub.authors.length > 3 ? ' et al.' : ''}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-blue-300/40 text-sm italic">{pub.journal}</p>
                        <span className="text-white/15 text-xs font-mono">{pub.year}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.5} direction="right">
              <div className="mt-10">
                <Link
                  href="/publications"
                  className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm tracking-wider"
                >
                  All {PUBLICATIONS.length} publications
                  <span className="text-lg">&#8599;</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </CosmicSection>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: TEAM — Deep space background
          ═══════════════════════════════════════════════════════ */}
      <CosmicSection
        id="team"
        backgroundSrc="/images/team.png"
        overlay="center-focus"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32 text-center">
          <Reveal>
            <p className="text-purple-400/60 text-xs tracking-[0.3em] uppercase mb-4 font-sans">
              Our People
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
              {TEAM_MEMBERS.length} Researchers
            </h2>
            <p className="text-white/30 text-lg max-w-lg mx-auto mb-16">
              Talented scientists working together to advance the frontiers of materials science
            </p>
          </Reveal>

          {/* PI Feature */}
          {pi && (
            <Reveal delay={0.2}>
              <div className="max-w-lg mx-auto mb-16 p-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                <div className="relative w-24 h-24 mx-auto mb-5">
                  {/* Gradient ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 via-purple-500 to-teal-400 opacity-30 blur-sm" />
                  <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-orange-400/40 to-purple-500/40 p-[2px]">
                    <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center text-2xl font-serif text-white/80">
                      {pi.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-white/90 mb-1">{pi.name}</h3>
                <p className="text-orange-400/60 text-xs tracking-wider uppercase mb-3">
                  {pi.title}
                </p>
                <p className="text-white/35 text-sm leading-relaxed max-w-sm mx-auto">
                  {pi.specialization}
                </p>
              </div>
            </Reveal>
          )}

          {/* Constellation connecting lines */}
          <div className="relative flex justify-center mb-8" aria-hidden="true">
            <svg width="200" height="40" viewBox="0 0 200 40" className="opacity-[0.1]">
              <line x1="100" y1="0" x2="40" y2="38" stroke="white" strokeWidth="1" />
              <line x1="100" y1="0" x2="100" y2="38" stroke="white" strokeWidth="1" />
              <line x1="100" y1="0" x2="160" y2="38" stroke="white" strokeWidth="1" />
              <circle cx="100" cy="0" r="2" fill="white" />
              <circle cx="40" cy="38" r="1.5" fill="white" />
              <circle cx="100" cy="38" r="1.5" fill="white" />
              <circle cx="160" cy="38" r="1.5" fill="white" />
            </svg>
          </div>

          {/* Team grid */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto">
              {TEAM_MEMBERS.filter((m) => m.role !== 'pi').map((member, idx, arr) => (
                <React.Fragment key={member.id}>
                <div
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-xs text-white/50">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-500">
                      {member.name}
                    </p>
                    <p className="text-[10px] text-white/20 tracking-wider uppercase">
                      {member.role === 'phd' ? 'Researcher' : member.role}
                    </p>
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <span className="text-white/10 text-lg select-none hidden sm:inline" aria-hidden="true">&middot;</span>
                )}
                </React.Fragment>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-12">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/25 transition-all duration-500 text-sm tracking-wider"
              >
                Meet the full team
                <span className="text-lg">&#8599;</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </CosmicSection>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: CTA — Dramatic nebula closeup
          ═══════════════════════════════════════════════════════ */}
      <CosmicSection
        backgroundSrc="/images/cta.png"
        overlay="center-focus"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-32 text-center">
          <Reveal>
            <div className="relative">
              {/* Starburst glow behind heading with pulse */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <motion.div
                  className="w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.08)_0%,rgba(139,92,246,0.05)_30%,transparent_70%)] blur-3xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <h2 className="relative text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[0.95] mb-8">
                The future of materials
                <br />
                <span className="text-teal-400">is being written now</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-white/35 text-lg max-w-lg mx-auto mb-12">
              Join us in discovering the next generation of materials that will shape our world.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-10 py-4 rounded-full bg-teal-500/90 hover:bg-teal-400 text-black font-medium transition-all duration-500 text-sm tracking-wider shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:shadow-[0_0_60px_rgba(45,212,191,0.6)] hover:scale-[1.02]"
              >
                Get in Touch
              </Link>
              <Link
                href="/library"
                className="px-10 py-4 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all duration-500 text-sm tracking-wider"
              >
                Browse Papers
              </Link>
            </div>
          </Reveal>
        </div>
      </CosmicSection>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════ */}
      <footer className="relative bg-black border-t border-white/[0.04] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 via-purple-500 to-orange-400 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  A
                </div>
                <h3 className="text-white/80 font-serif text-lg">AMS Lab</h3>
              </div>
              <p className="text-white/25 text-sm leading-relaxed">
                Pioneering research at the intersection of materials science,
                nanotechnology, and biomimetic systems.
              </p>
            </div>
            <div>
              <h4 className="text-white/40 text-xs tracking-wider uppercase mb-4">Navigate</h4>
              <div className="space-y-2">
                {['Research', 'Publications', 'Team', 'Library', 'Contact'].map((label) => (
                  <Link
                    key={label}
                    href={`/${label.toLowerCase()}`}
                    className="block text-white/25 hover:text-white/60 transition-colors duration-500 text-sm"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white/40 text-xs tracking-wider uppercase mb-4">Connect</h4>
              <a href="mailto:contact@amslab.edu" className="text-teal-400/50 hover:text-teal-400 transition-colors duration-500 text-sm">
                contact@amslab.edu
              </a>
              <p className="text-white/20 text-sm mt-2">Institute of Advanced Research</p>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/15 text-xs tracking-wider">
              &copy; {new Date().getFullYear()} Advanced Materials & Systems Lab
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white/20 hover:text-white/50 text-xs tracking-wider uppercase transition-colors duration-500 cursor-pointer"
            >
              Back to top &uarr;
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
