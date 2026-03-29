'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESEARCH_PROJECTS } from '@/lib/data';

export default function ResearchContent() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const grouped = useMemo(
    () => ({
      active: RESEARCH_PROJECTS.filter((p) => p.status === 'active'),
      completed: RESEARCH_PROJECTS.filter((p) => p.status === 'completed' || p.status === 'planned'),
    }),
    [],
  );

  const projects = activeTab === 'active' ? grouped.active : grouped.completed;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="pt-16 pb-8 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-teal-400/60 text-sm tracking-[0.2em] uppercase mb-4 font-sans">
            Explore Our Work
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Research Projects</h1>
          <p className="text-white/40 max-w-xl">
            Cutting-edge research across materials science, nanotechnology, machine learning, and biomimetic systems.
          </p>
        </motion.div>
      </div>

      {/* Tab selector */}
      <div className="px-6 max-w-5xl mx-auto mb-12">
        <motion.div
          className="inline-flex rounded-full border border-white/[0.08] p-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {(['active', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-teal-400/15 text-teal-400'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tab === 'active' ? 'Active Research' : 'Completed & Planned'}
              <span className="ml-2 text-xs opacity-50">{grouped[tab].length}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Projects grid */}
      <div className="px-6 max-w-5xl mx-auto pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`rounded-2xl border transition-all duration-500 cursor-pointer ${
                  expandedId === project.id
                    ? 'border-teal-400/30 bg-teal-400/[0.03]'
                    : 'border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02]'
                }`}
                onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            project.status === 'active'
                              ? 'bg-teal-400'
                              : project.status === 'completed'
                              ? 'bg-emerald-400'
                              : 'bg-amber-400'
                          }`}
                        />
                        <span className="text-white/30 text-xs tracking-wider uppercase">
                          {project.status}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-serif mb-2 text-white/90">
                        {project.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === project.id ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/20 shrink-0 mt-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[10px] border border-white/[0.08] text-white/40 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedId === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/[0.06]">
                        <p className="text-white/50 text-sm leading-relaxed mt-4">
                          {project.longDescription}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
