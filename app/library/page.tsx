'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import PaperViewer from '@/components/PaperViewer';
import { ResearchPaper } from '@/lib/types';
import Link from 'next/link';

// Mock data - in production, this would come from a database
const MOCK_PAPERS: ResearchPaper[] = [
  {
    id: '1',
    title: 'Advanced Polymer Self-Assembly Techniques',
    authors: ['Chen, S.', 'Rodriguez, J.'],
    abstract:
      'Comprehensive study of self-assembly mechanisms in polymer systems with applications in nanofabrication.',
    tags: ['polymers', 'self-assembly', 'nanotechnology'],
    year: 2024,
    pdfUrl: 'https://arxiv.org/pdf/2404.00001.pdf',
    uploadedDate: '2024-04-15',
    createdBy: 'Dr. Sarah Chen',
  },
  {
    id: '2',
    title: 'Machine Learning for Material Property Prediction',
    authors: ['Tanaka, A.', 'Chen, S.'],
    abstract:
      'Deep learning models for predicting material properties with 87% accuracy on experimental datasets.',
    tags: ['machine learning', 'materials', 'computational'],
    year: 2024,
    pdfUrl: 'https://arxiv.org/pdf/2404.00002.pdf',
    uploadedDate: '2024-03-20',
    createdBy: 'Dr. Akira Tanaka',
  },
  {
    id: '3',
    title: 'Sustainable Bio-Based Composites',
    authors: ['Winters, E.', 'Wang, L.'],
    abstract:
      'Development of environmentally friendly composites with comparable performance to traditional materials.',
    tags: ['sustainability', 'composites', 'green-chemistry'],
    year: 2024,
    pdfUrl: 'https://arxiv.org/pdf/2404.00003.pdf',
    uploadedDate: '2024-02-10',
    createdBy: 'Emily Winters',
  },
];

export default function LibraryPage() {
  const [papers] = useState<ResearchPaper[]>(MOCK_PAPERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [showViewerModal, setShowViewerModal] = useState(false);

  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    papers.forEach((paper) => {
      paper.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [papers]);

  // Filter papers
  const filteredPapers = useMemo(() => {
    let filtered = papers;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (paper) =>
          paper.title.toLowerCase().includes(query) ||
          paper.abstract.toLowerCase().includes(query) ||
          paper.authors.some((author) =>
            author.toLowerCase().includes(query),
          ),
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((paper) =>
        selectedTags.some((tag) => paper.tags.includes(tag)),
      );
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.uploadedDate).getTime() -
        new Date(a.uploadedDate).getTime(),
    );
  }, [papers, searchQuery, selectedTags]);

  const handlePaperClick = (paper: ResearchPaper) => {
    setSelectedPaper(paper);
    setShowViewerModal(true);
  };

  return (
    <>
      <HeroSection
        title="Research Paper Library"
        subtitle="Explore Our Papers"
        description="Browse and download research papers from our laboratory collection"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-serif font-semibold text-slate-900 mb-2">
                  Browse Papers
                </h2>
                <p className="text-slate-600">
                  {papers.length}{' '}
                  {papers.length === 1 ? 'paper' : 'papers'} in the library
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Upload Paper
              </Link>
            </div>

            {/* Search and Filters */}
            <div className="space-y-6">
              {/* Search Bar */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Search papers
                </label>
                <SearchBar
                  onSearch={setSearchQuery}
                  placeholder="Search by title, authors, keywords..."
                />
              </div>

              {/* Filter Bar */}
              <FilterBar
                tags={allTags}
                selectedTags={selectedTags}
                onTagChange={setSelectedTags}
                label="Filter by topic"
              />

              {/* Results Count */}
              <p className="text-sm text-slate-600">
                Showing {filteredPapers.length} of {papers.length} papers
              </p>
            </div>
          </motion.div>

          {/* Papers Grid */}
          {filteredPapers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPapers.map((paper, index) => (
                <motion.article
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="card-base p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
                  onClick={() => handlePaperClick(paper)}
                >
                  {/* Paper Info */}
                  <div className="flex-grow">
                    {/* Year & Tags */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        {paper.year}
                      </span>
                      {paper.tags.length > 0 && (
                        <span className="text-xs text-slate-500">
                          {paper.tags.length} tags
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-serif font-semibold text-slate-900 mb-2 line-clamp-3 group-hover:text-blue-600 transition-colors cursor-pointer">
                      {paper.title}
                    </h3>

                    {/* Authors */}
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {paper.authors.join(', ')}
                    </p>

                    {/* Abstract */}
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                      {paper.abstract}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                      {paper.tags.length > 2 && (
                        <span className="text-xs text-slate-600">
                          +{paper.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {new Date(paper.uploadedDate).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePaperClick(paper);
                      }}
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View
                      <svg
                        className="w-4 h-4"
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
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-slate-600 text-lg mb-4">
                No papers found matching your search.
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

      {/* Paper Viewer Modal */}
      {showViewerModal && selectedPaper && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-auto"
          onClick={() => setShowViewerModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-serif font-semibold text-slate-900 flex-grow pr-4 line-clamp-2">
                {selectedPaper.title}
              </h2>
              <button
                onClick={() => setShowViewerModal(false)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <PaperViewer paper={selectedPaper} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
