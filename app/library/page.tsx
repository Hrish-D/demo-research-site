'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import PaperViewer from '@/components/PaperViewer';
import { ResearchPaper } from '@/lib/types';
import Link from 'next/link';

const MOCK_PAPERS: ResearchPaper[] = [
  {
    id: '1',
    title: 'Advanced Polymer Self-Assembly Techniques for Nanofabrication',
    authors: ['Chen, S.', 'Rodriguez, J.'],
    abstract: 'Comprehensive study of self-assembly mechanisms in polymer systems with applications in nanofabrication. We explore directed self-assembly, block copolymer lithography, and hierarchical patterning strategies.',
    tags: ['polymers', 'self-assembly', 'nanotechnology'],
    year: 2024,
    pdfUrl: 'https://arxiv.org/pdf/2404.00001.pdf',
    uploadedDate: '2024-04-15',
    createdBy: 'Dr. Sarah Chen',
  },
  {
    id: '2',
    title: 'Machine Learning for Material Property Prediction: A Benchmark Study',
    authors: ['Tanaka, A.', 'Chen, S.', 'Kim, D.'],
    abstract: 'Deep learning models for predicting material properties with 87% accuracy on experimental datasets. We compare transformer, GNN, and ensemble approaches across diverse material families.',
    tags: ['machine learning', 'materials', 'computational'],
    year: 2024,
    pdfUrl: 'https://arxiv.org/pdf/2404.00002.pdf',
    uploadedDate: '2024-03-20',
    createdBy: 'Dr. Akira Tanaka',
  },
  {
    id: '3',
    title: 'Sustainable Bio-Based Composites from Agricultural Waste',
    authors: ['Winters, E.', 'Wang, L.', 'Ramirez, S.'],
    abstract: 'Development of environmentally friendly composites with comparable performance to traditional materials using cellulose nanocrystals from corn stover and rice husk.',
    tags: ['sustainability', 'composites', 'green chemistry'],
    year: 2024,
    pdfUrl: 'https://arxiv.org/pdf/2404.00003.pdf',
    uploadedDate: '2024-02-10',
    createdBy: 'Emily Winters',
  },
  {
    id: '4',
    title: 'pH-Responsive Smart Hydrogels for Controlled Drug Delivery',
    authors: ['Patel, P.', 'Chen, S.'],
    abstract: 'Design and characterization of pH-sensitive hydrogel microparticles with tunable swelling ratios for oral drug delivery targeting the gastrointestinal tract.',
    tags: ['hydrogels', 'drug delivery', 'biomedical'],
    year: 2024,
    pdfUrl: 'https://arxiv.org/pdf/2404.00004.pdf',
    uploadedDate: '2024-01-28',
    createdBy: 'Dr. Priya Patel',
  },
  {
    id: '5',
    title: 'Silver Nanowire Networks: Synthesis, Properties, and Applications',
    authors: ['Rodriguez, J.', 'Zhang, W.'],
    abstract: 'Review of silver nanowire synthesis methods and their integration into transparent conducting films for flexible electronics and solar cells.',
    tags: ['nanomaterials', 'electronics', 'conductors'],
    year: 2023,
    pdfUrl: 'https://arxiv.org/pdf/2310.00005.pdf',
    uploadedDate: '2023-10-15',
    createdBy: 'Dr. James Rodriguez',
  },
];

export default function LibraryPage() {
  const [papers] = useState<ResearchPaper[]>(MOCK_PAPERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    papers.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [papers]);

  const filteredPapers = useMemo(() => {
    let filtered = papers;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.abstract.toLowerCase().includes(query) ||
          p.authors.some((a) => a.toLowerCase().includes(query)),
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) =>
        selectedTags.some((t) => p.tags.includes(t)),
      );
    }

    return filtered.sort(
      (a, b) => new Date(b.uploadedDate).getTime() - new Date(a.uploadedDate).getTime(),
    );
  }, [papers, searchQuery, selectedTags]);

  return (
    <>
      <HeroSection
        title="Paper Library"
        subtitle="Research Portal"
        description="Browse, search, and download research papers from our laboratory collection."
      />

      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-[var(--foreground)] mb-1">
                  Browse Papers
                </h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {papers.length} papers in the library
                </p>
              </div>
              <Link href="/dashboard" className="btn-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload Paper
              </Link>
            </div>

            <div className="space-y-4">
              <SearchBar onSearch={setSearchQuery} placeholder="Search by title, authors, keywords..." />
              <FilterBar tags={allTags} selectedTags={selectedTags} onTagChange={setSelectedTags} label="Filter by topic" />
              <p className="text-sm text-[var(--muted-foreground)]">
                Showing {filteredPapers.length} of {papers.length} papers
              </p>
            </div>
          </motion.div>

          {filteredPapers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPapers.map((paper, index) => (
                <motion.article
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="card p-6 card-hover cursor-pointer group"
                  onClick={() => setSelectedPaper(paper)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="tag font-semibold">{paper.year}</span>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {new Date(paper.uploadedDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-semibold text-[var(--foreground)] mb-3 line-clamp-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    {paper.title}
                  </h3>

                  <p className="text-sm text-[var(--muted-foreground)] mb-3">
                    {paper.authors.join(', ')}
                  </p>

                  <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-4 leading-relaxed">
                    {paper.abstract}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {paper.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--muted)] text-[var(--muted-foreground)]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[var(--card-border)] flex items-center justify-end">
                    <span className="text-sm font-medium text-accent-600 dark:text-accent-400 group-hover:translate-x-1 transition-transform duration-300">
                      View Paper &rarr;
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-[var(--muted-foreground)] text-lg mb-4">No papers found.</p>
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

      {/* Paper Viewer Modal */}
      <AnimatePresence>
        {selectedPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
            onClick={() => setSelectedPaper(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="sticky top-0 bg-[var(--card)] border-b border-[var(--card-border)] p-6 flex items-center justify-between z-10">
                <h2 className="text-lg font-serif font-semibold text-[var(--foreground)] flex-grow pr-4 line-clamp-1">
                  {selectedPaper.title}
                </h2>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="w-10 h-10 rounded-xl bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <PaperViewer paper={selectedPaper} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
