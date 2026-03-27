'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import {
  LAB_NAME,
  LAB_DESCRIPTION,
  LAB_STATS,
  RESEARCH_PROJECTS,
} from '@/lib/data';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function Home() {
  const featuredProjects = RESEARCH_PROJECTS.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={LAB_NAME}
        subtitle="Welcome to AMS Lab"
        description={LAB_DESCRIPTION}
        ctaText="Explore Our Research"
        ctaHref="#featured-projects"
      />

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {LAB_STATS.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <p className="text-slate-600 text-sm md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Research Projects */}
      <section
        id="featured-projects"
        className="py-16 md:py-24 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
              Featured Research
            </span>
            <h2 className="text-heading mt-2 text-slate-900">
              Current Projects
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl">
              Explore our cutting-edge research initiatives across materials
              science, nanotechnology, and biomimetic systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View All Projects
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Lab Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                About Us
              </span>
              <h2 className="text-heading mt-2 text-slate-900">
                Advancing Materials Science
              </h2>
              <p className="text-lg text-slate-600 mt-4 leading-relaxed">
                The Advanced Materials & Systems Lab conducts pioneering research
                at the intersection of materials science, nanotechnology, and
                biomimetic systems. Our team is dedicated to understanding and
                designing novel materials with unprecedented properties.
              </p>
              <p className="text-lg text-slate-600 mt-4 leading-relaxed">
                Through collaborative research and innovative approaches, we push
                the boundaries of what&apos;s possible in materials engineering,
                creating solutions for real-world challenges in sustainability,
                biomedical applications, and advanced manufacturing.
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                >
                  Meet the Team
                </Link>
                <Link
                  href="/publications"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  View Publications
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-80 md:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-slate-100 shadow-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-blue-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={0.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Interested in Our Research?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our collaborative research efforts or learn more about
              collaboration opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Get in Touch
              </Link>
              <Link
                href="/library"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
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
