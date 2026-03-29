'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from '@/components/ProjectCard';
import {
  LAB_NAME,
  LAB_DESCRIPTION,
  LAB_STATS,
  RESEARCH_PROJECTS,
  PUBLICATIONS,
} from '@/lib/data';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0, 1] },
  }),
};

export default function Home() {
  const featuredProjects = RESEARCH_PROJECTS.filter(p => p.status === 'active').slice(0, 3);
  const recentPubs = PUBLICATIONS.slice(0, 3);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[var(--background)]" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent-500/8 dark:bg-accent-500/5 rounded-full blur-[120px] animate-glow" />
        <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-accent-600/5 dark:bg-accent-600/3 rounded-full blur-[100px] animate-glow" style={{ animationDelay: '3s' }} />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 container-width w-full"
        >
          <div className="max-w-5xl pt-32 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              <span className="text-xs font-medium text-accent-700 dark:text-accent-300 tracking-wide">
                Institute of Advanced Research
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
              className="text-hero mb-8"
            >
              <span className="block">{LAB_NAME.split(' ').slice(0, 2).join(' ')}</span>
              <span className="block text-accent-gradient">{LAB_NAME.split(' ').slice(2).join(' ')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-2xl mb-10"
            >
              {LAB_DESCRIPTION}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/research" className="btn-primary px-8 py-4 text-base">
                Explore Research
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/publications" className="btn-secondary px-8 py-4 text-base">
                View Publications
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-[var(--card-border)] flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-[var(--muted-foreground)]" />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 relative">
        <div className="container-width">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {LAB_STATS.map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-accent-gradient mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-[var(--muted-foreground)] tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-[var(--muted)]" />
        <div className="relative container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
          >
            <div>
              <span className="text-xs font-medium text-accent-600 dark:text-accent-400 uppercase tracking-[0.2em] mb-4 block">
                Featured Research
              </span>
              <h2 className="text-heading">Current Projects</h2>
            </div>
            <Link href="/research" className="btn-secondary text-sm">
              View All Projects &rarr;
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Lab Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-medium text-accent-600 dark:text-accent-400 uppercase tracking-[0.2em] mb-4 block">
                About Us
              </span>
              <h2 className="text-heading mb-6">
                Advancing Materials Science Through Innovation
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-5">
                The Advanced Materials & Systems Lab conducts pioneering research
                at the intersection of materials science, nanotechnology, and
                biomimetic systems. Our team of 10 researchers is dedicated to understanding and
                designing novel materials with unprecedented properties.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
                Through collaborative, interdisciplinary research we push
                the boundaries of what&apos;s possible in materials engineering,
                creating solutions for real-world challenges in sustainability,
                biomedical applications, and advanced manufacturing.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/team" className="btn-primary">Meet the Team</Link>
                <Link href="/publications" className="btn-secondary">View Publications</Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-accent-500/20 via-accent-600/10 to-transparent border border-[var(--card-border)]">
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Abstract decorative elements */}
                  <div className="absolute top-8 left-8 w-24 h-24 border border-accent-500/20 rounded-full" />
                  <div className="absolute bottom-12 right-12 w-32 h-32 border border-accent-500/10 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent-500/5 rounded-full" />
                  <svg className="w-20 h-20 text-accent-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-[var(--muted)]" />
        <div className="relative container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
          >
            <div>
              <span className="text-xs font-medium text-accent-600 dark:text-accent-400 uppercase tracking-[0.2em] mb-4 block">
                Latest Research
              </span>
              <h2 className="text-heading">Recent Publications</h2>
            </div>
            <Link href="/publications" className="btn-secondary text-sm">
              All Publications &rarr;
            </Link>
          </motion.div>

          <div className="space-y-4">
            {recentPubs.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 card-hover group"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <span className="tag font-semibold shrink-0">{pub.year}</span>
                  <div className="flex-grow">
                    <h3 className="text-base font-serif font-semibold text-[var(--foreground)] mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-1">
                      {pub.authors.join(', ')}
                    </p>
                    <p className="text-sm text-accent-600/70 dark:text-accent-400/70 italic">
                      {pub.journal}
                    </p>
                  </div>
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent-600 dark:text-accent-400 hover:underline font-medium shrink-0"
                    >
                      DOI &nearr;
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-900 via-accent-800 to-accent-700 dark:from-accent-950 dark:via-accent-900 dark:to-accent-800" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400/10 rounded-full blur-[100px]" />

        <div className="relative container-width text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-heading text-white mb-6">
              Interested in Our Research?
            </h2>
            <p className="text-lg text-accent-100/80 mb-10 leading-relaxed">
              Join our collaborative research efforts or learn more about
              opportunities to work with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-accent-800 rounded-xl hover:bg-accent-50 transition-all font-semibold shadow-lg"
              >
                Get in Touch
              </Link>
              <Link
                href="/library"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-semibold"
              >
                Browse Papers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
