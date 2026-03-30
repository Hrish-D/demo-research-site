'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import CosmicNav from '@/components/cosmic/CosmicNav';
import TeamCard from '@/components/TeamCard';
import { TEAM_MEMBERS } from '@/lib/data';
import { useMemo } from 'react';
import Link from 'next/link';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function TeamPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const teamByRole = useMemo(() => ({
    pi: TEAM_MEMBERS.filter((m) => m.role === 'pi'),
    phd: TEAM_MEMBERS.filter((m) => m.role === 'phd'),
    undergrad: TEAM_MEMBERS.filter((m) => m.role === 'undergrad'),
    collaborator: TEAM_MEMBERS.filter((m) => m.role === 'collaborator'),
  }), []);

  const roleGroups = [
    { role: 'pi', label: 'Principal Investigator', members: teamByRole.pi },
    { role: 'phd', label: 'Researchers & PhD Students', members: teamByRole.phd },
    { role: 'undergrad', label: 'Undergraduate Researchers', members: teamByRole.undergrad },
    { role: 'collaborator', label: 'Collaborators', members: teamByRole.collaborator },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <CosmicNav />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <Image
            src="/images/team.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black" />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-teal-400/70 text-xs md:text-sm tracking-[0.4em] uppercase font-sans mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Meet the Researchers
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Our Team
          </motion.h1>
          <motion.p
            className="mt-4 text-white/50 max-w-xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Talented scientists and researchers working together to advance materials science and nanotechnology.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-block text-white/30 hover:text-white/60 text-sm transition-colors duration-300 mb-10">
            &larr; Back to Home
          </Link>

          {roleGroups.map((group) =>
            group.members.length > 0 ? (
              <AnimatedSection key={group.role} className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-white/90">
                    {group.label}
                  </h2>
                  <div className="h-px flex-grow bg-white/[0.06]" />
                  <span className="text-sm text-white/30">
                    {group.members.length}
                  </span>
                </div>

                <div className={`grid gap-8 ${
                  group.role === 'pi'
                    ? 'grid-cols-1 md:grid-cols-2 max-w-2xl'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {group.members.map((member, index) => (
                    <TeamCard key={member.id} member={member} index={index} />
                  ))}
                </div>
              </AnimatedSection>
            ) : null
          )}

          {/* Join Lab CTA */}
          <AnimatedSection className="mt-10">
            <div className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-10 md:p-14 relative overflow-hidden hover:shadow-[0_0_30px_rgba(45,212,191,0.08)] transition-shadow duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/5 rounded-full blur-[80px]" />
              <div className="relative max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white/90 mb-4">
                  Interested in Joining?
                </h3>
                <p className="text-white/50 mb-8 leading-relaxed">
                  We are always looking for talented researchers, graduate students,
                  and undergraduates passionate about materials science and
                  nanotechnology. If you&apos;re interested in joining our team,
                  please get in touch.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-400/10 border border-teal-400/20 rounded-full text-teal-400 text-sm font-medium hover:bg-teal-400/20 transition-colors duration-300"
                >
                  Contact Us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <p className="text-white/15 text-xs tracking-wider">&copy; 2026 Advanced Materials &amp; Systems Lab</p>
        </div>
      </footer>
    </div>
  );
}
