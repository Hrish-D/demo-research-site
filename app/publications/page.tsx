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

  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PUBLICATIONS.forEach((pub) => {
      pub.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Get unique years sorted descending
  const allYears = useMemo(() => {
    const years = new Set<number>();
    PUBLICATIONS.forEach((pub) => years.add(pub.year));
    return Array.from(years).sort((a, b) => b - a);
  }, []);

  // Filter publications
  const filteredPublications = useMemo(() => {
    let filtered = PUBLICATIONS;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pub) =>
          pub.title.toLowerCase().includes(query) ||
          pub.abstract.toLowerCase().includes(query) ||
          pub.authors.some((author) =>
            author.toLowerCase().includes(query),
          ) ||
          pub.journal.toLowerCase().includes(query),
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((pub) =>
        selectedTags.some((tag) => pub.tags.includes(tag)),
      );
    }

    return filtered;
  }, [searchQuery, selectedTags]);

  // Group by year
  const publicationsByYear = useMemo(() => {
    const grouped: { [key: number]: typeof PUBLICATIONS } = {};
    filteredPublications.forEach((pub) => {
      if (!grouped[pub.year]) {
        grouped[pub.year] = [];
      }
      grouped[pub.year].push(pub);
    });
    return grouped;
  }, [filteredPublications]);

  return (
    <>
      <HeroSection
        title="Publications"
        subtitle="Research Output"
        description="Peer-reviewed publications and research contributions from our laboratory"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 space-y-6"
          >
            {/* Search Bar */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Search publications
              </label>
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search by title, authors, journal..."
              />
            </div>

            {/* Filters */}
            <FilterBar
              tags={allTags}
              selectedTags={selectedTags}
              onTagChange={setSelectedTags}
              label="Filter by topic"
            />

            {/* Results Count */}
            <p className="text-sm text-slate-600">
              Found {filteredPublications.length} publication
              {filteredPublications.length !== 1 ? 's' : ''}
            </p>
          </motion.div>

          {/* Publications by Year */}
          <div className="space-y-12">
            {allYears
              .filter((year) => publicationsByYear[year])
              .map((year, yearIndex) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: yearIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 mb-6">
                    {year}
                  </h2>
                  <div className="space-y-4">
                    {publicationsByYear[year].map((publication, index) => (
                      <PublicationCard
                        key={publication.id}
                        publication={publication}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>

          {/* No Results */}
          {filteredPublications.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-slate-600 text-lg mb-4">
                No publications found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
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
