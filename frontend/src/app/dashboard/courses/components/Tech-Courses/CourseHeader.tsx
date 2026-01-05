import React from 'react';
import { Star, Globe, Award, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface CourseHeaderProps {
  title: string;
  subtitle: string;
  rating: number;
  ratingCount: string;
  studentCount: string;
  instructor: string;
  lastUpdated: string;
  language: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  title,
  subtitle,
  rating,
  ratingCount,
  studentCount,
  instructor,
  lastUpdated,
  language
}) => {
  return (
    <div className="bg-linear-to-l from-[#174bd7] to-[#003cff] text-white py-8 min-h-[320px] w-full rounded-xl">
      <div className="max-w-[1200px] mx-auto px-4 lg:flex lg:gap-8">
        <div className="lg:w-[65%] py-4">
          {/* Breadcrumb - Placeholder */}
          {/* <div className="text-blue-200 text-sm font-bold mb-4 flex gap-2">
            <span className="cursor-pointer hover:text-white">Development</span>
            <span>{'>'}</span>
            <span className="cursor-pointer hover:text-white">Web Development</span>
            <span>{'>'}</span>
            <span className="cursor-pointer hover:text-white">JavaScript</span>
          </div> */}

          <div className="mb-4">
            <span className="bg-[#ECEB98] text-[#3D3C0A] font-bold px-3 py-1 text-xs rounded-sm uppercase tracking-wide">Bestseller</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-white">{title}</h1>
          <p className="text-lg mb-6 leading-relaxed text-white">{subtitle}</p>

          <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
            <span className="text-[#f3ca8c] font-bold text-base">{rating}</span>
            <div className="flex text-[#f3ca8c]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} fill={star <= Math.floor(rating) ? "currentColor" : "none"} className={star <= Math.floor(rating) ? "" : "text-gray-500"} />
              ))}
            </div>
            <Link href="#reviews" className="text-[#c0c4fc] underline hover:text-white ml-1">({ratingCount} ratings)</Link>
            <span className="text-white ml-2">{studentCount} students</span>
          </div>

          <div className="mb-4 text-sm text-white flex items-center gap-1">
            Created by <Link href="#instructor" className="text-[#c0c4fc] underline hover:text-white">{instructor}</Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white">
            <div className="flex items-center gap-1">
              <AlertCircle size={16} />
              <span>Last updated {lastUpdated}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe size={16} />
              <span>{language}</span>
            </div>
          </div>
        </div>

        {/* Right side placeholder for desktop layout (Sidebar will overlap this area in mobile/tablet but stick in desktop) */}
        <div className="hidden lg:block lg:w-[35%] relative">
          {/* This space is reserved for the sticky sidebar */}
        </div>
      </div>
    </div>
  );
};

// Helper Link component to avoid import issues if not using Next.js Link in a specific way, 
// but here we use standard anchor or Next Link. 
// For now, using standard anchor for internal page links or just text.
import Link from 'next/link';

export default CourseHeader;
