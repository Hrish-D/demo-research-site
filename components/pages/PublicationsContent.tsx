'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PUBLICATIONS } from '@/lib/data';

export default function PublicationsContent() {
  const [searchQuery, setSearchQuery] = useState('');

  const allYears = useMemo(() => {
    const years = new Set<number>();
    PUBLICATIONS.forEach((pub) => years.add(pub.year));
    return Array.from(years).sort((a, b) => b - a);
  }, []);

  const filtered = useMemo(() => {
    if (!searchQuery) return PUBLICATIONS;
    const q = searchQuery.toLowerCase();
    return PUBLICATIONS.filter(
      (pub) =>
        pub.title.toLowerCase().includes(q) ||
        pub.authors.some((a) => a.toLowerCase().includes(q)) ||
        pub.journal.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const byYear = useMemo(() => {
    const grouped: Record<number, typeof PUBLICATIONS> = {};
    filtered.forEach((pub) => {
      if (!grouped[pub.year]) grouped[pub.year] = [];
      grouped[pub.year].push(pub);
    });
    return grouped;
  }, [filtered]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="pt-16 pb-8 px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-teal-400/60 text-sm tracking-[0.2em] uppercase mb-4 font-sans">
            Research Output
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Publications</h1>

          {/* Search */}
          <div className="relative mt-8">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search by title, author, journal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/80 placeholder:text-white/20 focus:outline-none focus:border-teal-400/30 transition-colors text-sm"
            />
          </div>

          <p className="text-white/30 text-sm mt-4">
            {filtered.length} publication{filtered.length !== 1 ? 's' : ''} found
          </p>
        </motion.div>
      </div>

      <div className="px-6 max-w-4xl mx-auto pb-20 space-y-16">
        {allYears
          .filter((year) => byYear[year])
          .map((year) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-serif text-white/90">{year}</h2>
                <div className="h-px flex-grow bg-white/[0.06]" />
                <span className="text-white/30 text-sm">{byYear[year].length}</span>
              </div>

              <div className="space-y-4">
                {byYear[year].map((pub, i) => (
                  <motion.div
                    key={pub.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                  >
                    <h3 className="font-serif text-white/90 mb-2 group-hover:text-teal-400 transition-colors leading-snug">
                      {pub.title}
                    </h3>
                    <p className="text-white/30 text-sm mb-1">
                      {pub.authors.join(', ')}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-teal-400/50 text-sm italic">{pub.journal}</p>
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white/20 hover:text-teal-400/70 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          DOI &#8599;
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
