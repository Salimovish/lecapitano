import React from 'react';

interface PizzaFiltersProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const AVAILABLE_TAGS = ['Végétarienne', 'Épicée', 'Nouveauté'];

export default function PizzaFilters({ selectedTags, onTagToggle }: PizzaFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {AVAILABLE_TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagToggle(tag)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedTags.includes(tag)
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}