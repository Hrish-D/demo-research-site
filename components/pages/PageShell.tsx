'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/lib/navigation-state';
import { ELECTRONS } from '@/lib/electron-config';

/**
 * PageShell wraps any page content with the electron-expand transition
 * and provides a "back to atom" header bar.
 */
export default function PageShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { activePage, goBackToAtom } = useNavigation();
  const electron = ELECTRONS.find((e) => e.id === activePage);
  const color = electron?.color || '#2dd4bf';

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black overflow-y-auto"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]">
        <button
          onClick={goBackToAtom}
          className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors"
            style={{ backgroundColor: `${color}15` }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xs tracking-wider uppercase font-sans hidden sm:inline">
            Back to Model
          </span>
        </button>

        {title && (
          <h2 className="text-sm tracking-wider uppercase font-sans" style={{ color }}>
            {title}
          </h2>
        )}

        <div className="w-8" /> {/* Spacer for centering */}
      </div>

      {/* Page content */}
      <div className="min-h-screen">{children}</div>
    </motion.div>
  );
}
