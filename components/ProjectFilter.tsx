"use client";

import React from "react";

interface ProjectFilterProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  selectedTags,
  onTagToggle,
  availableTags,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      <button
        onClick={() => onTagToggle("All")}
        className={`px-4 py-2 rounded-full text-xl font-medium transition-all duration-300 ${
          selectedTags.length === 0 || selectedTags.includes("All")
            ? "bg-purple text-white shadow-lg shadow-purple/25"
            : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
        }`}
      >
        All Projects
      </button>
      {availableTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagToggle(tag)}
          className={`px-4 py-2 rounded-full text-xl font-medium transition-all duration-300 ${
            selectedTags.includes(tag)
              ? "bg-purple text-white shadow-lg shadow-purple/25"
              : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter; 