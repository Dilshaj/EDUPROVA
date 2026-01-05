"use client";

import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface WhatYouWillLearnProps {
  points: string[];
}

const WhatYouWillLearn: React.FC<WhatYouWillLearnProps> = ({ points }) => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 8; // Show first 8 items initially
  const hasMoreItems = points.length > initialDisplayCount;

  const displayedPoints = showAll ? points : points.slice(0, initialDisplayCount);

  return (
    <div className="border border-gray-300 p-6 mb-8 bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        {displayedPoints.map((point, index) => (
          <div key={index} className="flex items-start gap-3 text-sm text-gray-700">
            <Check size={16} className="mt-1 shrink-0 text-gray-800" />
            <span>{point}</span>
          </div>
        ))}
      </div>

      {hasMoreItems && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-blue-500 hover:text-blue-600 font-bold text-sm flex items-center gap-1 transition-colors"
        >
          {showAll ? 'Show less' : 'Show more'}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
};

export default WhatYouWillLearn;
