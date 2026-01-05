import React, { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, FileText } from 'lucide-react';

interface Lecture {
  title: string;
  duration: string;
  type: 'video' | 'article';
  canPreview: boolean;
}

interface Section {
  title: string;
  lectures: Lecture[];
}

interface CurriculumSectionProps {
  sections: Section[];
  totalSections: number;
  totalLectures: number;
  totalLength: string;
}

const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  sections,
  totalSections,
  totalLectures,
  totalLength
}) => {
  const [expandedSections, setExpandedSections] = useState<number[]>([0]); // Expand first section by default
  const [expandAll, setExpandAll] = useState(false);

  const toggleSection = (index: number) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter((i) => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  const handleExpandAll = () => {
    if (expandAll) {
      setExpandedSections([]);
    } else {
      setExpandedSections(sections.map((_, i) => i));
    }
    setExpandAll(!expandAll);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Course content</h2>
      
      <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
        <div>
            {totalSections} sections • {totalLectures} lectures • {totalLength} total length
        </div>
        <button 
            onClick={handleExpandAll}
            className="text-blue-500 font-bold hover:text-blue-600"
        >
            {expandAll ? 'Collapse all sections' : 'Expand all sections'}
        </button>
      </div>

      <div className="border border-gray-200 border-b-0">
        {sections.map((section, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                {expandedSections.includes(index) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                <span className="font-bold text-gray-900">{section.title}</span>
              </div>
              <span className="text-sm text-gray-600 hidden sm:block">
                {section.lectures.length} lectures • {section.lectures.reduce((acc, curr) => {
                    // Simple duration parser/adder placeholder
                    return acc; // In real app, calculate total minutes
                }, "")} 
                {/* Placeholder duration for now */}
                45min
              </span>
            </button>

            {expandedSections.includes(index) && (
              <div className="bg-white">
                {section.lectures.map((lecture, lIndex) => (
                  <div key={lIndex} className="flex justify-between items-center p-3 pl-12 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                        {lecture.type === 'video' ? <PlayCircle size={14} className="text-gray-500" /> : <FileText size={14} className="text-gray-500" />}
                        <span className={`text-sm ${lecture.canPreview ? 'text-blue-600 underline cursor-pointer' : 'text-gray-700'}`}>
                            {lecture.title}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        {lecture.canPreview && <span className="text-blue-600 underline cursor-pointer hidden sm:block">Preview</span>}
                        <span>{lecture.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumSection;
