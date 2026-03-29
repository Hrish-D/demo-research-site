'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import CosmicNav from '@/components/cosmic/CosmicNav';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import PaperViewer from '@/components/PaperViewer';
import { ResearchPaper } from '@/lib/types';

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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

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
    <div className="min-h-screen bg-black text-white">
      <CosmicNav />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <Image
            src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=85"
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
            Research Portal
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Paper Library
          </motion.h1>
          <motion.p
            className="mt-4 text-white/50 max-w-xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Browse, search, and download research papers from our laboratory collection.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-block text-white/30 hover:text-white/60 text-sm transition-colors duration-300 mb-10">
            &larr; Back to Home
          </Link>

          <AnimatedSection className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-white/90 mb-1">
                  Browse Papers
                </h2>
                <p className="text-sm text-white/30">
                  {papers.length} papers in the library
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-400/10 border border-teal-400/20 rounded-full text-teal-400 text-sm font-medium hover:bg-teal-400/20 transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload Paper
              </Link>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-6 space-y-4 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)] transition-shadow duration-500">
              <SearchBar onSearch={setSearchQuery} placeholder="Search by title, authors, keywords..." />
              <FilterBar tags={allTags} selectedTags={selectedTags} onTagChange={setSelectedTags} label="Filter by topic" />
              <p className="text-sm text-white/30">
                Showing {filteredPapers.length} of {papers.length} papers
              </p>
            </div>
          </AnimatedSection>

          {filteredPapers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPapers.map((paper, index) => (
                <motion.article
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-6 cursor-pointer group hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(45,212,191,0.08)] transition-all duration-300"
                  onClick={() => setSelectedPaper(paper)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-400/10 text-teal-400 border border-teal-400/20">
                      {paper.year}
                    </span>
                    <span className="text-xs text-white/30">
                      {new Date(paper.uploadedDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-semibold text-white/90 mb-3 line-clamp-2 group-hover:text-teal-400 transition-colors">
                    {paper.title}
                  </h3>

                  <p className="text-sm text-white/50 mb-3">
                    {paper.authors.join(', ')}
                  </p>

                  <p className="text-sm text-white/30 line-clamp-2 mb-4 leading-relaxed">
                    {paper.abstract}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {paper.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.05] text-white/40 border border-white/[0.06]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-end">
                    <span className="text-sm font-medium text-teal-400 group-hover:translate-x-1 transition-transform duration-300">
                      View Paper &rarr;
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-white/50 text-lg mb-4">No papers found.</p>
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

      {/* Paper Viewer Modal */}
      <AnimatePresence>
        {selectedPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
            onClick={() => setSelectedPaper(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border border-white/[0.06] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-white/[0.06] p-6 flex items-center justify-between z-10">
                <h2 className="text-lg font-serif font-semibold text-white/90 flex-grow pr-4 line-clamp-1">
                  {selectedPaper.title}
                </h2>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white transition-colors shrink-0"
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

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <p className="text-white/15 text-xs tracking-wider">&copy; 2026 Advanced Materials &amp; Systems Lab</p>
        </div>
      </footer>
    </div>
  );
}
