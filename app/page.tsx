'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  LAB_NAME,
  LAB_DESCRIPTION,
  LAB_STATS,
  RESEARCH_PROJECTS,
  PUBLICATIONS,
  TEAM_MEMBERS,
} from '@/lib/data';

/* ── Scroll-linked section wrapper ── */
function StorySection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative min-h-screen flex items-center overflow-hidden ${className}`}>
      {children}
    </section>
  );
}

/* ── Fade-in block triggered when in view ── */
function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  const initial: Record<string, number> = { opacity: 0 };
  if (direction === 'up') initial.y = 60;
  if (direction === 'left') initial.x = -60;
  if (direction === 'right') initial.x = 60;

  const animate: Record<string, number> = { opacity: 1 };
  if (direction === 'up') animate.y = 0;
  if (direction === 'left') animate.x = 0;
  if (direction === 'right') animate.x = 0;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Background image with parallax ── */
function ParallaxBg({
  src,
  alt,
  scrollYProgress,
  range = [0, 1],
  outputRange = ['0%', '-20%'],
  overlay = 'bg-black/50',
}: {
  src: string;
  alt: string;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  range?: number[];
  outputRange?: string[];
  overlay?: string;
}) {
  const y = useTransform(scrollYProgress, range, outputRange);

  return (
    <>
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>
      <div className={`absolute inset-0 ${overlay}`} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   HOME PAGE — Scroll Storytelling
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  /* Section-level scroll for hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const heroScroll = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(heroScroll.scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroScroll.scrollYProgress, [0, 0.7], [1, 0.95]);

  /* Section refs for parallax backgrounds */
  const missionRef = useRef<HTMLDivElement>(null);
  const missionScroll = useScroll({ target: missionRef, offset: ['start end', 'end start'] });

  const researchRef = useRef<HTMLDivElement>(null);
  const researchScroll = useScroll({ target: researchRef, offset: ['start end', 'end start'] });

  const impactRef = useRef<HTMLDivElement>(null);
  const impactScroll = useScroll({ target: impactRef, offset: ['start end', 'end start'] });

  const teamRef = useRef<HTMLDivElement>(null);
  const teamScroll = useScroll({ target: teamRef, offset: ['start end', 'end start'] });

  const featuredProjects = RESEARCH_PROJECTS.filter((p) => p.status === 'active').slice(0, 4);
  const recentPubs = PUBLICATIONS.slice(0, 4);

  /* Scroll progress bar */
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef}>
      {/* ── Progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* ══════════════════════════════════════════════
          SECTION 1 — Hero / Opening
          ══════════════════════════════════════════════ */}
      <StorySection>
        <div ref={heroRef} className="absolute inset-0">
          {/* Background: dark science image */}
          <img
            src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1920&q=80&auto=format&fit=crop"
            alt="Scientific laboratory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 container-width w-full"
        >
          <div className="max-w-4xl">
            <Reveal delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/10 mb-8">
                <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                <span className="text-xs font-medium text-white/80 tracking-wider uppercase">
                  Institute of Advanced Research
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif tracking-tight leading-[0.9] text-white mb-8">
                <span className="block">Advanced</span>
                <span className="block">Materials</span>
                <span className="block text-accent-400">&amp; Systems Lab</span>
              </h1>
            </Reveal>

            <Reveal delay={0.5}>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-10">
                {LAB_DESCRIPTION}
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#mission" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-xl font-medium transition-all text-base">
                  Discover Our Story
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <Link href="/research" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-xl font-medium hover:bg-white/10 transition-all text-base backdrop-blur">
                  Explore Research
                </Link>
              </div>
            </Reveal>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1.5 rounded-full bg-white/60"
              />
            </div>
          </motion.div>
        </motion.div>
      </StorySection>

      {/* ══════════════════════════════════════════════
          SECTION 2 — Mission / Why We Exist
          ══════════════════════════════════════════════ */}
      <StorySection id="mission">
        <div ref={missionRef} className="absolute inset-0">
          <ParallaxBg
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80&auto=format&fit=crop"
            alt="Microscope close-up"
            scrollYProgress={missionScroll.scrollYProgress}
            overlay="bg-gradient-to-r from-black/80 via-black/60 to-black/30 dark:from-black/90 dark:via-black/70 dark:to-black/50"
          />
        </div>

        <div className="relative z-10 container-width w-full py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal>
                <span className="text-xs font-medium text-accent-400 uppercase tracking-[0.25em] mb-6 block">
                  Our Mission
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-8">
                  Understanding matter at the smallest scale to solve the biggest challenges
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-white/60 leading-relaxed mb-6">
                  We believe the next generation of materials will be inspired by nature,
                  guided by computation, and designed for sustainability. Our lab brings
                  together chemists, engineers, and data scientists to make this vision a reality.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-lg text-white/60 leading-relaxed">
                  From self-healing polymers to machine-learning-driven discovery,
                  every project in our lab pushes the boundary of what materials can do.
                </p>
              </Reveal>
            </div>

            <div className="hidden lg:block">
              <Reveal delay={0.3} direction="right">
                <div className="grid grid-cols-2 gap-6">
                  {LAB_STATS.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
                    >
                      <div className="text-4xl md:text-5xl font-serif font-bold text-accent-400 mb-2">
                        {stat.value}
                      </div>
                      <p className="text-sm text-white/50 tracking-wide">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Mobile stats */}
          <div className="lg:hidden mt-12">
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 gap-4">
                {LAB_STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
                  >
                    <div className="text-3xl font-serif font-bold text-accent-400 mb-1">
                      {stat.value}
                    </div>
                    <p className="text-xs text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </StorySection>

      {/* ══════════════════════════════════════════════
          SECTION 3 — Research / What We Do
          ══════════════════════════════════════════════ */}
      <StorySection>
        <div ref={researchRef} className="absolute inset-0">
          <ParallaxBg
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop"
            alt="Abstract data visualization"
            scrollYProgress={researchScroll.scrollYProgress}
            overlay="bg-gradient-to-b from-black/80 via-black/70 to-black/90"
          />
        </div>

        <div className="relative z-10 container-width w-full py-32">
          <Reveal>
            <span className="text-xs font-medium text-accent-400 uppercase tracking-[0.25em] mb-6 block">
              Our Research
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-6 max-w-3xl">
              Six active frontiers of discovery
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg text-white/50 max-w-2xl mb-16">
              Each project bridges fundamental science with real-world application,
              from the nanoscale to the macroscale.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.id} delay={0.1 + index * 0.1}>
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-500/20 text-accent-300">
                      {project.status === 'active' ? 'Active' : project.status}
                    </span>
                    <span className="text-xs text-white/30">{project.publications.length} papers</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-white mb-3 group-hover:text-accent-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-12 text-center">
              <Link href="/research" className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 font-medium transition-colors text-sm">
                View all {RESEARCH_PROJECTS.length} projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </StorySection>

      {/* ══════════════════════════════════════════════
          SECTION 4 — Impact / Publications
          ══════════════════════════════════════════════ */}
      <StorySection>
        <div ref={impactRef} className="absolute inset-0">
          <ParallaxBg
            src="https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1920&q=80&auto=format&fit=crop"
            alt="Scientific papers and research"
            scrollYProgress={impactScroll.scrollYProgress}
            overlay="bg-gradient-to-b from-black/85 via-black/75 to-black/90"
          />
        </div>

        <div className="relative z-10 container-width w-full py-32">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <span className="text-xs font-medium text-accent-400 uppercase tracking-[0.25em] mb-6 block text-center">
                Our Impact
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-6 text-center">
                Published in the world&apos;s leading journals
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-lg text-white/50 text-center max-w-2xl mx-auto mb-16">
                Our research appears in Nature Materials, Advanced Materials, Nano Letters,
                and other top-tier publications.
              </p>
            </Reveal>

            <div className="space-y-4">
              {recentPubs.map((pub, index) => (
                <Reveal key={pub.id} delay={0.1 + index * 0.08}>
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="shrink-0">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent-500/20 text-accent-300">
                          {pub.year}
                        </span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-base font-serif font-semibold text-white mb-2 group-hover:text-accent-300 transition-colors leading-snug">
                          {pub.title}
                        </h3>
                        <p className="text-sm text-white/40 mb-1">{pub.authors.join(', ')}</p>
                        <p className="text-sm text-accent-400/60 italic">{pub.journal}</p>
                      </div>
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs text-white/30 hover:text-accent-400 transition-colors font-medium"
                        >
                          DOI &#8599;
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.5}>
              <div className="mt-12 text-center">
                <Link href="/publications" className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 font-medium transition-colors text-sm">
                  See all {PUBLICATIONS.length} publications
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </StorySection>

      {/* ══════════════════════════════════════════════
          SECTION 5 — People / Team
          ══════════════════════════════════════════════ */}
      <StorySection>
        <div ref={teamRef} className="absolute inset-0">
          <ParallaxBg
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80&auto=format&fit=crop"
            alt="Researchers in laboratory"
            scrollYProgress={teamScroll.scrollYProgress}
            overlay="bg-gradient-to-b from-black/80 via-black/65 to-black/85"
          />
        </div>

        <div className="relative z-10 container-width w-full py-32">
          <Reveal>
            <span className="text-xs font-medium text-accent-400 uppercase tracking-[0.25em] mb-6 block">
              Our People
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-6 max-w-3xl">
              A collaborative team of {TEAM_MEMBERS.length} researchers
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg text-white/50 max-w-2xl mb-16">
              From principal investigators to undergraduate researchers,
              our diverse team brings together expertise across materials science,
              chemistry, engineering, and computation.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {TEAM_MEMBERS.slice(0, 10).map((member, index) => {
              const initials = member.name.split(' ').map((n) => n[0]).join('');
              return (
                <Reveal key={member.id} delay={0.05 * index}>
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                    <div className="w-14 h-14 rounded-full bg-accent-500/15 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-lg font-serif font-semibold text-accent-400">
                        {initials}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-white mb-0.5 leading-tight">{member.name}</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">
                      {member.role === 'pi' ? 'PI' : member.role === 'phd' ? 'Researcher' : member.role === 'undergrad' ? 'Undergrad' : 'Collaborator'}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.5}>
            <div className="mt-12">
              <Link href="/team" className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 font-medium transition-colors text-sm">
                Meet the full team
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </StorySection>

      {/* ══════════════════════════════════════════════
          SECTION 6 — CTA / Join Us
          ══════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80&auto=format&fit=crop"
            alt="Abstract cosmic background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/80" />
        </div>

        <div className="relative z-10 container-width w-full py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="text-xs font-medium text-accent-400 uppercase tracking-[0.25em] mb-6 block">
                Get Involved
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-8">
                The future of materials is being written now
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-white/50 mb-12 leading-relaxed max-w-xl mx-auto">
                Whether you&apos;re a prospective student, fellow researcher, or industry partner,
                we&apos;d love to explore how we can work together.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-xl font-semibold transition-all text-base shadow-lg shadow-accent-500/25">
                  Get in Touch
                </Link>
                <Link href="/library" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 backdrop-blur border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all text-base">
                  Browse Paper Library
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
