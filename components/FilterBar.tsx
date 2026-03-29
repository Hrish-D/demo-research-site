'use client';

import { useState } from 'react';

interface FilterBarProps {
  tags: string[];
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
  label?: string;
}

const FilterBar = ({
  tags,
  selectedTags,
  onTagChange,
  label = 'Filter by topic',
}: FilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 items-center">
        <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
          {label}:
        </label>

        {selectedTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleToggleTag(tag)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-500/10 text-accent-700 dark:text-accent-300 hover:bg-accent-500/20 transition-colors"
          >
            {tag}
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        ))}

        {selectedTags.length > 0 && (
          <button
            onClick={() => onTagChange([])}
            className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors underline underline-offset-2"
          >
            Clear all
          </button>
        )}

        {tags.length > selectedTags.length && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              {selectedTags.length === 0 ? 'Select topics' : 'More'}
              <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            {isOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                <div className="absolute top-full left-0 mt-2 bg-[var(--card)] border border-[var(--card-border)] rounded-xl shadow-xl z-20 min-w-52 overflow-hidden">
                  <div className="p-1.5 max-h-64 overflow-y-auto">
                    {tags
                      .filter((tag) => !selectedTags.includes(tag))
                      .map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleToggleTag(tag)}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
