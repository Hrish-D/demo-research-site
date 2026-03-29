'use client';

import { useState } from 'react';
import { ResearchPaper } from '@/lib/types';

interface PaperUploadFormProps {
  onSubmit: (paper: Omit<ResearchPaper, 'id' | 'uploadedDate'>) => void;
  isLoading?: boolean;
}

const PaperUploadForm = ({ onSubmit, isLoading = false }: PaperUploadFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    abstract: '',
    tags: '',
    year: new Date().getFullYear(),
    pdfUrl: '',
    createdBy: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    onSubmit({
      title: formData.title,
      authors: formData.authors.split(',').map((a) => a.trim()),
      abstract: formData.abstract,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      year: formData.year,
      pdfUrl: formData.pdfUrl,
      createdBy: formData.createdBy,
    });

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
    <form onSubmit={handleSubmit} className="card p-8">
      <h2 className="text-2xl font-serif font-semibold text-[var(--foreground)] mb-2">
        Upload Research Paper
      </h2>
      <p className="text-sm text-[var(--muted-foreground)] mb-8">
        Add a new paper to the lab&apos;s research library.
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Paper title" className="input-base" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Authors * <span className="text-[var(--muted-foreground)] font-normal">(comma-separated)</span></label>
          <input type="text" name="authors" value={formData.authors} onChange={handleChange} placeholder="e.g., John Doe, Jane Smith" className="input-base" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Abstract</label>
          <textarea name="abstract" value={formData.abstract} onChange={handleChange} placeholder="Paper abstract" rows={4} className="input-base resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Tags <span className="text-[var(--muted-foreground)] font-normal">(comma-separated)</span></label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., polymers, materials, nanotechnology" className="input-base" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} min="2000" max={new Date().getFullYear()} className="input-base" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Created By</label>
            <input type="text" name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="Your name" className="input-base" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">PDF URL *</label>
          <input type="url" name="pdfUrl" value={formData.pdfUrl} onChange={handleChange} placeholder="https://example.com/paper.pdf" className="input-base" required />
          <p className="text-xs text-[var(--muted-foreground)] mt-2">Provide a URL to the PDF file (e.g., from arXiv or your institution)</p>
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary w-full py-3.5">
          {isLoading ? 'Uploading...' : 'Upload Paper'}
        </button>
      </div>
    </form>
  );
};

export default PaperUploadForm;
