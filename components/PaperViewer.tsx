'use client';

import { ResearchPaper } from '@/lib/types';
import { useState } from 'react';

interface PaperViewerProps {
  paper: ResearchPaper;
}

const PaperViewer = ({ paper }: PaperViewerProps) => {
  const [isEmbedded, setIsEmbedded] = useState(true);

  return (
    <div className="card-base p-8">
      {/* Paper Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-semibold text-slate-900 mb-4">
          {paper.title}
        </h1>

        <p className="text-slate-600 mb-4">
          <span className="font-medium">{paper.authors.join(', ')}</span>
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
          <div>
            <span className="font-medium">Year:</span> {paper.year}
          </div>
          <div>
            <span className="font-medium">Uploaded:</span>{' '}
            {new Date(paper.uploadedDate).toLocaleDateString()}
          </div>
        </div>

        {paper.abstract && (
          <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-medium text-slate-900 mb-2">Abstract</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {paper.abstract}
            </p>
          </div>
        )}

        {/* Tags */}
        {paper.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {paper.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download PDF
          </a>

          <button
            onClick={() => setIsEmbedded(!isEmbedded)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            {isEmbedded ? 'View External' : 'View Embedded'}
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      {isEmbedded && (
        <div className="mt-8 border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
          <iframe
            src={`${paper.pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="w-full h-96 md:h-screen"
            title={paper.title}
          />
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-sm text-slate-600">
            <p>
              PDF viewer embedded. If the PDF doesn&apos;t load,{' '}
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                download it directly
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperViewer;
