'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import CosmicNav from '@/components/cosmic/CosmicNav';
import PublicationCard from '@/components/PublicationCard';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import { PUBLICATIONS } from '@/lib/data';

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

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PUBLICATIONS.forEach((pub) => pub.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const allYears = useMemo(() => {
    const years = new Set<number>();
    PUBLICATIONS.forEach((pub) => years.add(pub.year));
    return Array.from(years).sort((a, b) => b - a);
  }, []);

  const filteredPublications = useMemo(() => {
    let filtered = PUBLICATIONS;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pub) =>
          pub.title.toLowerCase().includes(query) ||
          pub.abstract.toLowerCase().includes(query) ||
          pub.authors.some((a) => a.toLowerCase().includes(query)) ||
          pub.journal.toLowerCase().includes(query),
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((pub) =>
        selectedTags.some((tag) => pub.tags.includes(tag)),
      );
    }

    return filtered;
  }, [searchQuery, selectedTags]);

  const publicationsByYear = useMemo(() => {
    const grouped: Record<number, typeof PUBLICATIONS> = {};
    filteredPublications.forEach((pub) => {
      if (!grouped[pub.year]) grouped[pub.year] = [];
      grouped[pub.year].push(pub);
    });
    return grouped;
  }, [filteredPublications]);

  return (
    <div className="min-h-screen bg-black text-white">
      <CosmicNav />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <Image
            src="https://images.unsplash.com/photo-1507499739999-097706ad8914?w=1920&q=85"
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
            Research Output
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Publications
          </motion.h1>
          <motion.p
            className="mt-4 text-white/50 max-w-xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Peer-reviewed publications and research contributions from our laboratory.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block text-white/30 hover:text-white/60 text-sm transition-colors duration-300 mb-10">
            &larr; Back to Home
          </Link>

          <AnimatedSection className="mb-12 space-y-6">
            <div className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-6 space-y-4 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)] transition-shadow duration-500">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search by title, authors, journal..."
              />

              <FilterBar
                tags={allTags}
                selectedTags={selectedTags}
                onTagChange={setSelectedTags}
                label="Filter by topic"
              />

              <p className="text-sm text-white/30">
                {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-16">
            {allYears
              .filter((year) => publicationsByYear[year])
              .map((year) => (
                <AnimatedSection key={year}>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-serif font-semibold text-white/90">
                      {year}
                    </h2>
                    <div className="h-px flex-grow bg-white/[0.06]" />
                    <span className="text-sm text-white/30">
                      {publicationsByYear[year].length}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {publicationsByYear[year].map((pub, index) => (
                      <PublicationCard key={pub.id} publication={pub} index={index} />
                    ))}
                  </div>
                </AnimatedSection>
              ))}
          </div>

          {filteredPublications.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-white/50 text-lg mb-4">
                No publications found matching your search.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedTags([]); }}
                className="text-teal-400 hover:underline font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}
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
