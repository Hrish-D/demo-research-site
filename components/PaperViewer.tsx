'use client';

import { ResearchPaper } from '@/lib/types';
import { useState } from 'react';

interface PaperViewerProps {
  paper: ResearchPaper;
}

const PaperViewer = ({ paper }: PaperViewerProps) => {
  const [isEmbedded, setIsEmbedded] = useState(true);

  return (
    <div className="space-y-6">
      {/* Paper Info */}
      <div>
        <h1 className="text-2xl font-serif font-semibold text-[var(--foreground)] mb-4">
          {paper.title}
        </h1>

        <p className="text-sm text-[var(--muted-foreground)] mb-4">
          <span className="font-medium text-[var(--foreground)]">{paper.authors.join(', ')}</span>
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)] mb-6">
          <span>Year: {paper.year}</span>
          <span>Uploaded: {new Date(paper.uploadedDate).toLocaleDateString()}</span>
        </div>

        {paper.abstract && (
          <div className="mb-6 p-5 bg-[var(--muted)] rounded-xl border border-[var(--card-border)]">
            <h3 className="font-medium text-[var(--foreground)] mb-2 text-sm">Abstract</h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {paper.abstract}
            </p>
          </div>
        )}

        {paper.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {paper.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
          <button onClick={() => setIsEmbedded(!isEmbedded)} className="btn-secondary">
            {isEmbedded ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      {isEmbedded && (
        <div className="border border-[var(--card-border)] rounded-xl overflow-hidden bg-[var(--muted)]">
          <iframe
            src={`${paper.pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="w-full h-96 md:h-[70vh]"
            title={paper.title}
          />
          <div className="p-4 border-t border-[var(--card-border)] text-center text-sm text-[var(--muted-foreground)]">
            If the PDF doesn&apos;t load,{' '}
            <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-accent-600 dark:text-accent-400 hover:underline font-medium">
              download it directly
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperViewer;
