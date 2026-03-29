'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PaperUploadForm from '@/components/PaperUploadForm';
import { ResearchPaper } from '@/lib/types';
import Link from 'next/link';
import CosmicNav from '@/components/cosmic/CosmicNav';

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isAuth = localStorage.getItem('amslab_auth') === 'true';
    setIsAuthenticated(isAuth);
    const savedPapers = localStorage.getItem('amslab_papers');
    if (savedPapers) setPapers(JSON.parse(savedPapers));
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

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-5 pt-20">
        <CosmicNav />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="card p-8 md:p-10">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400 mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-serif font-semibold text-[var(--foreground)] mb-2">
                Researcher Dashboard
              </h1>
              <p className="text-sm text-[var(--muted-foreground)]">
                Sign in to upload and manage research papers
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="researcher@institution.edu"
                  className="input-base"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full py-3.5">Sign In</button>
              <p className="text-center text-xs text-[var(--muted-foreground)]">
                Demo mode: Use any email address to sign in
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-[var(--card-border)]">
              <Link href="/library" className="block text-center text-accent-600 dark:text-accent-400 hover:underline font-medium text-sm">
                &larr; Back to Paper Library
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const userEmail = (typeof window !== 'undefined' && localStorage.getItem('amslab_user_email')) || 'Researcher';

  return (
    <div className="min-h-screen bg-black pt-20">
      <CosmicNav />
      {/* Dashboard Header */}
      <div className="border-b border-[var(--card-border)] bg-[var(--card)]">
        <div className="container-width py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-semibold text-[var(--foreground)]">Dashboard</h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">Welcome, {userEmail}</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container-width py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <PaperUploadForm onSubmit={handlePaperSubmit} />
          </motion.div>

          {/* Papers Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card p-6 sticky top-28">
              <h2 className="text-lg font-serif font-semibold text-[var(--foreground)] mb-6">
                My Papers
              </h2>

              {papers.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--muted)] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[var(--muted-foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    No papers uploaded yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--card-border)]">
                    <span className="text-sm font-medium text-[var(--foreground)]">Total: {papers.length}</span>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {papers.map((paper) => (
                      <div key={paper.id} className="p-3 bg-[var(--muted)] rounded-xl border border-[var(--card-border)]">
                        <h4 className="text-sm font-medium text-[var(--foreground)] line-clamp-2 mb-2">
                          {paper.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[var(--muted-foreground)]">
                            {new Date(paper.uploadedDate).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => handleDeletePaper(paper.id)}
                            className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-[var(--card-border)]">
                <Link href="/library" className="block text-center text-accent-600 dark:text-accent-400 hover:underline font-medium text-sm">
                  View Public Library &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
