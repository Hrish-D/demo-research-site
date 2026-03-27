'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PaperUploadForm from '@/components/PaperUploadForm';
import { ResearchPaper } from '@/lib/types';
import Link from 'next/link';

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [papers, setPapers] = useState<ResearchPaper[]>([]);

  // Mock authentication - in production, use proper auth
  useEffect(() => {
    const isAuth = localStorage.getItem('amslab_auth') === 'true';
    setIsAuthenticated(isAuth);

    const savedPapers = localStorage.getItem('amslab_papers');
    if (savedPapers) {
      setPapers(JSON.parse(savedPapers));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.includes('@')) {
      localStorage.setItem('amslab_auth', 'true');
      localStorage.setItem('amslab_user_email', loginEmail);
      setIsAuthenticated(true);
      setLoginEmail('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('amslab_auth');
    localStorage.removeItem('amslab_user_email');
    localStorage.removeItem('amslab_papers');
    setIsAuthenticated(false);
    setPapers([]);
  };

  const handlePaperSubmit = (paper: Omit<ResearchPaper, 'id' | 'uploadedDate'>) => {
    const newPaper: ResearchPaper = {
      ...paper,
      id: `paper_${Date.now()}`,
      uploadedDate: new Date().toISOString(),
    };

    const updatedPapers = [newPaper, ...papers];
    setPapers(updatedPapers);
    localStorage.setItem('amslab_papers', JSON.stringify(updatedPapers));
  };

  const handleDeletePaper = (id: string) => {
    const updatedPapers = papers.filter((p) => p.id !== id);
    setPapers(updatedPapers);
    localStorage.setItem('amslab_papers', JSON.stringify(updatedPapers));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-slate-100 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="card-base p-8">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600 text-white mb-4">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
              <h1 className="text-3xl font-serif font-semibold text-slate-900 mb-2">
                Researcher Dashboard
              </h1>
              <p className="text-slate-600">
                Sign in to upload and manage research papers
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="researcher@institution.edu"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign In
              </button>

              <p className="text-center text-xs text-slate-600">
                Demo mode: Use any email address to sign in
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <Link
                href="/library"
                className="block text-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                ← Back to Paper Library
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const userEmail = localStorage.getItem('amslab_user_email') || 'Researcher';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-semibold text-slate-900">
                Dashboard
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Welcome, {userEmail}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m6-4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m6-4a3 3 0 00-3-3H6a3 3 0 00-3 3v1a3 3 0 003 3h4a3 3 0 003-3v-1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <PaperUploadForm onSubmit={handlePaperSubmit} />
          </motion.div>

          {/* My Papers Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-base p-6 sticky top-24">
              <h2 className="text-xl font-serif font-semibold text-slate-900 mb-6">
                My Papers
              </h2>

              {papers.length === 0 ? (
                <p className="text-slate-600 text-center py-8">
                  No papers uploaded yet. Use the form to add your first paper.
                </p>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                    <span className="text-sm font-medium text-slate-700">
                      Total: {papers.length}
                    </span>
                    <span className="text-xs text-slate-500">
                      {papers.length === 1 ? 'paper' : 'papers'}
                    </span>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {papers.map((paper) => (
                      <motion.div
                        key={paper.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors"
                      >
                        <h4 className="text-sm font-medium text-slate-900 line-clamp-2 mb-2">
                          {paper.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            {new Date(paper.uploadedDate).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => handleDeletePaper(paper.id)}
                            className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-slate-200">
                <Link
                  href="/library"
                  className="block text-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  View Public Library ↗
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
