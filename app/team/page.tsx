'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import TeamCard from '@/components/TeamCard';
import { TEAM_MEMBERS } from '@/lib/data';
import { useMemo } from 'react';
import Link from 'next/link';

export default function TeamPage() {
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
    <>
      <HeroSection
        title="Our Team"
        subtitle="Meet the Researchers"
        description="Talented scientists and researchers working together to advance materials science and nanotechnology."
      />

      <section className="section-padding">
        <div className="container-width">
          {roleGroups.map((group) =>
            group.members.length > 0 ? (
              <motion.div
                key={group.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="mb-20"
              >
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[var(--foreground)]">
                    {group.label}
                  </h2>
                  <div className="h-px flex-grow bg-[var(--card-border)]" />
                  <span className="text-sm text-[var(--muted-foreground)]">
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
              </motion.div>
            ) : null
          )}

          {/* Join Lab CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-10 card p-10 md:p-14 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 rounded-full blur-[80px]" />
            <div className="relative max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[var(--foreground)] mb-4">
                Interested in Joining?
              </h3>
              <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
                We are always looking for talented researchers, graduate students,
                and undergraduates passionate about materials science and
                nanotechnology. If you&apos;re interested in joining our team,
                please get in touch.
              </p>
              <Link href="/contact" className="btn-primary">
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
