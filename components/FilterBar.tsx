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

  const handleClearAll = () => {
    onTagChange([]);
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <label className="text-sm font-medium text-slate-700">{label}:</label>

        {/* Selected Tags Display */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleToggleTag(tag)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                {tag}
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              </button>
            ))}
            <button
              onClick={handleClearAll}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* More Options Dropdown */}
        {tags.length > selectedTags.length && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              More options
              <svg
                className={`w-4 h-4 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-20 min-w-48">
                <div className="p-2">
                  {tags
                    .filter((tag) => !selectedTags.includes(tag))
                    .map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          handleToggleTag(tag);
                        }}
                        className="w-full text-left px-3 py-2 rounded text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
