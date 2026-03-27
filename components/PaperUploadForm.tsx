'use client';

import { useState } from 'react';
import { ResearchPaper } from '@/lib/types';

interface PaperUploadFormProps {
  onSubmit: (paper: Omit<ResearchPaper, 'id' | 'uploadedDate'>) => void;
  isLoading?: boolean;
}

const PaperUploadForm = ({
  onSubmit,
  isLoading = false,
}: PaperUploadFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    abstract: '',
    tags: '',
    year: new Date().getFullYear(),
    pdfUrl: '',
    createdBy: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.authors || !formData.pdfUrl) {
      alert('Please fill in all required fields');
      return;
    }

    const paper: Omit<ResearchPaper, 'id' | 'uploadedDate'> = {
      title: formData.title,
      authors: formData.authors.split(',').map((a) => a.trim()),
      abstract: formData.abstract,
      tags: formData.tags.split(',').map((t) => t.trim()),
      year: formData.year,
      pdfUrl: formData.pdfUrl,
      createdBy: formData.createdBy,
    };

    onSubmit(paper);

    // Reset form
    setFormData({
      title: '',
      authors: '',
      abstract: '',
      tags: '',
      year: new Date().getFullYear(),
      pdfUrl: '',
      createdBy: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card-base p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-serif font-semibold mb-6 text-slate-900">
        Upload Research Paper
      </h2>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Paper title"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Authors */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Authors * (comma-separated)
          </label>
          <input
            type="text"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            placeholder="e.g., John Doe, Jane Smith"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Abstract */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Abstract
          </label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            placeholder="Paper abstract"
            rows={4}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., polymers, materials, nanotechnology"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Year
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="2000"
              max={new Date().getFullYear()}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Created By */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Created By
            </label>
            <input
              type="text"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* PDF URL */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            PDF URL *
          </label>
          <input
            type="url"
            name="pdfUrl"
            value={formData.pdfUrl}
            onChange={handleChange}
            placeholder="https://example.com/paper.pdf"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-slate-500 mt-1">
            Provide a URL to the PDF file (e.g., from your institution or arXiv)
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? 'Uploading...' : 'Upload Paper'}
        </button>
      </div>
    </form>
  );
};

export default PaperUploadForm;
