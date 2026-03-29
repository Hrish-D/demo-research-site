'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import PublicationCard from '@/components/PublicationCard';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import { PUBLICATIONS } from '@/lib/data';

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    <>
      <HeroSection
        title="Publications"
        subtitle="Research Output"
        description="Peer-reviewed publications and research contributions from our laboratory."
      />

      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 space-y-6"
          >
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

            <p className="text-sm text-[var(--muted-foreground)]">
              {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          <div className="space-y-16">
            {allYears
              .filter((year) => publicationsByYear[year])
              .map((year) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-serif font-semibold text-[var(--foreground)]">
                      {year}
                    </h2>
                    <div className="h-px flex-grow bg-[var(--card-border)]" />
                    <span className="text-sm text-[var(--muted-foreground)]">
                      {publicationsByYear[year].length}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {publicationsByYear[year].map((pub, index) => (
                      <PublicationCard key={pub.id} publication={pub} index={index} />
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>

          {filteredPublications.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-[var(--muted-foreground)] text-lg mb-4">
                No publications found matching your search.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedTags([]); }}
                className="text-accent-600 dark:text-accent-400 hover:underline font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
