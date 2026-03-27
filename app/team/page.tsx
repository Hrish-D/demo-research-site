'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import TeamCard from '@/components/TeamCard';
import { TEAM_MEMBERS } from '@/lib/data';
import { useMemo } from 'react';

export default function TeamPage() {
  // Group team members by role
  const teamByRole = useMemo(() => {
    return {
      pi: TEAM_MEMBERS.filter((m) => m.role === 'pi'),
      phd: TEAM_MEMBERS.filter((m) => m.role === 'phd'),
      undergrad: TEAM_MEMBERS.filter((m) => m.role === 'undergrad'),
      collaborator: TEAM_MEMBERS.filter((m) => m.role === 'collaborator'),
    };
  }, []);

  const roleGroups = [
    {
      role: 'pi',
      label: 'Principal Investigator',
      members: teamByRole.pi,
      color: 'from-purple-50 to-purple-100',
    },
    {
      role: 'phd',
      label: 'PhD Students',
      members: teamByRole.phd,
      color: 'from-blue-50 to-blue-100',
    },
    {
      role: 'undergrad',
      label: 'Undergraduate Researchers',
      members: teamByRole.undergrad,
      color: 'from-green-50 to-green-100',
    },
    {
      role: 'collaborator',
      label: 'Collaborators',
      members: teamByRole.collaborator,
      color: 'from-amber-50 to-amber-100',
    },
  ];

  return (
    <>
      <HeroSection
        title="Our Team"
        subtitle="Meet the Researchers"
        description="Talented scientists and researchers working together to advance materials science and nanotechnology"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Team Sections */}
          {roleGroups.map((group, groupIndex) =>
            group.members.length > 0 ? (
              <motion.div
                key={group.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                className="mb-16"
              >
                {/* Section Header */}
                <div className="mb-8">
                  <div
                    className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${group.color} mb-4`}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-900">
                      {group.label}
                    </h2>
                  </div>
                  <p className="text-slate-600 mt-2">
                    {group.members.length}{' '}
                    {group.members.length === 1 ? 'member' : 'members'}
                  </p>
                </div>

                {/* Team Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {group.members.map((member, index) => (
                    <TeamCard
                      key={member.id}
                      member={member}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            ) : null,
          )}

          {/* Join Lab CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mt-20 p-12 rounded-lg bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200"
          >
            <div className="max-w-2xl">
              <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-4">
                Interested in Joining?
              </h3>
              <p className="text-slate-600 mb-6">
                We are always looking for talented researchers, graduate students,
                and undergraduates passionate about materials science and
                nanotechnology. If you&apos;re interested in joining our team,
                please get in touch with us.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Contact us
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
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
