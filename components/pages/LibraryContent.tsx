'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResearchPaper } from '@/lib/types';
import PaperViewer from '@/components/PaperViewer';

const MOCK_PAPERS: ResearchPaper[] = [
  {
    id: '1',
    title: 'Advanced Polymer Self-Assembly Techniques for Nanofabrication',
    authors: ['Chen, S.', 'Rodriguez, J.'],
    abstract: 'Comprehensive study of self-assembly mechanisms in polymer systems with applications in nanofabrication.',
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
    abstract: 'Deep learning models for predicting material properties with 87% accuracy on experimental datasets.',
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
    abstract: 'Development of environmentally friendly composites with comparable performance to traditional materials.',
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
    abstract: 'Design and characterization of pH-sensitive hydrogel microparticles with tunable swelling ratios.',
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
    abstract: 'Review of silver nanowire synthesis methods and their integration into transparent conducting films.',
    tags: ['nanomaterials', 'electronics', 'conductors'],
    year: 2023,
    pdfUrl: 'https://arxiv.org/pdf/2310.00005.pdf',
    uploadedDate: '2023-10-15',
    createdBy: 'Dr. James Rodriguez',
  },
];

export default function LibraryContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  const filtered = useMemo(() => {
    if (!searchQuery) return MOCK_PAPERS;
    const q = searchQuery.toLowerCase();
    return MOCK_PAPERS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.authors.some((a) => a.toLowerCase().includes(q)),
    );
  }, [searchQuery]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="pt-16 pb-8 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-teal-400/60 text-sm tracking-[0.2em] uppercase mb-4 font-sans">
            Research Portal
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Paper Library</h1>

          <div className="relative mt-8">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/80 placeholder:text-white/20 focus:outline-none focus:border-teal-400/30 transition-colors text-sm"
            />
          </div>

          <p className="text-white/30 text-sm mt-4">
            {filtered.length} of {MOCK_PAPERS.length} papers
          </p>
        </motion.div>
      </div>

      <div className="px-6 max-w-5xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((paper, i) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-6 rounded-2xl border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] cursor-pointer transition-all duration-300"
              onClick={() => setSelectedPaper(paper)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-teal-400/60 text-xs">{paper.year}</span>
                <span className="text-white/20 text-xs">
                  {new Date(paper.uploadedDate).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-serif text-white/90 mb-2 group-hover:text-teal-400 transition-colors leading-snug">
                {paper.title}
              </h3>
              <p className="text-white/30 text-sm mb-3">{paper.authors.join(', ')}</p>
              <p className="text-white/25 text-sm line-clamp-2 mb-4">{paper.abstract}</p>
              <div className="flex flex-wrap gap-1.5">
                {paper.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] border border-white/[0.06] text-white/30">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Paper viewer modal */}
      <AnimatePresence>
        {selectedPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedPaper(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/[0.08] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="sticky top-0 bg-[#111] border-b border-white/[0.06] p-6 flex items-center justify-between z-10">
                <h2 className="text-lg font-serif text-white/90 flex-grow pr-4 line-clamp-1">
                  {selectedPaper.title}
                </h2>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
                >
                  &#x2715;
                </button>
              </div>
              <div className="p-6">
                <PaperViewer paper={selectedPaper} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
