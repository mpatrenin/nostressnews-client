import React from 'react';
import '../App.css';

interface PopularTagsProps {
  popularTags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

const PopularTags: React.FC<PopularTagsProps> = ({ popularTags, selectedTags, setSelectedTags }) => (
  <div className="popular-tags">
    {popularTags.length > 0 && (
      <span className="popular-tags-label">Tag filter:</span>
    )}
    {popularTags.map(tag => (
      <span
        className={`popular-tag${selectedTags.includes(tag) ? ' selected-tag' : ''}`}
        key={tag}
        onClick={() => {
          setSelectedTags(selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag]);
        }}
      >
        {tag}
      </span>
    ))}
  </div>
);

export default PopularTags;
