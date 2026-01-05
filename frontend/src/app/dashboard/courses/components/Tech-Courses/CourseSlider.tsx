"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { createPortal } from "react-dom";
import CourseHoverCard from "./CourseHoverCard";

interface Course {
  title: string;
  author: string;
  rating: number;
  reviews: string;
  price: string;
  originalPrice: string;
  image: string;
  bestseller?: boolean;
  premium?: boolean;
  updatedDate?: string;
  duration?: string;
  level?: string;
  subtitles?: string;
  description?: string;
  learningOutcomes?: string[];
  _id?: string;
}

interface CourseSliderProps {
  title: string;
  courses: Course[];
}

const CourseSlider: React.FC<CourseSliderProps> = ({ title, courses }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Hover state
  const [hoveredCourseIndex, setHoveredCourseIndex] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ top: number; left: number } | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      // Allow a small buffer (10px) for float calculation differences
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;

      const targetScrollLeft = direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
      handleScroll();
      return () => {
        container.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, [courses]);

  const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    const rect = e.currentTarget.getBoundingClientRect();
    const hoverCardWidth = 340; // Width of CourseHoverCard
    const gap = 16; // Gap between card and hover card

    // Default to right side
    // Add window.scrollX to account for absolute positioning relative to document
    let left = rect.right + gap + window.scrollX;

    // Check if it fits on the right (using viewport width)
    if (rect.right + gap + hoverCardWidth > window.innerWidth - 10) {
      // If not, try left side
      left = rect.left - hoverCardWidth - gap + window.scrollX;
    }

    // Vertical alignment: align top, but keep within viewport
    // Add window.scrollY to account for absolute positioning relative to document
    let top = rect.top + window.scrollY - 20; // Slightly above for better alignment with card top

    setHoverPosition({
      top: top,
      left: left
    });
    setHoveredCourseIndex(index);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCourseIndex(null);
      setHoverPosition(null);
    }, 300); // Increased delay to allow moving to the hover card
  };

  const handleHoverCardEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleHoverCardLeave = () => {
    setHoveredCourseIndex(null);
    setHoverPosition(null);
  };

  return (
    <section className="mb-12 relative group">
      {title && <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>}

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-[-20px] top-1/3 -translate-y-1/2 z-20 w-12 h-12 bg-white text-gray-900 border border-gray-200 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-50 ${showLeftArrow ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-scroll pb-8 scroll-smooth"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none'  /* IE and Edge */
          }}
        >
          {courses.map((course, i) => (
            <Link
              href={`/dashboard/courses/${course._id}`}
              key={i}
              className="w-[280px] h-[360px] shrink-0 flex flex-col cursor-pointer group/card bg-white transition-all duration-200 hover:scale-[1.03] shadow-sm hover:shadow-xl rounded-lg overflow-hidden border border-gray-200"
              onMouseEnter={(e) => handleMouseEnter(i, e)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Image Container - Fixed height */}
              <div className="relative w-full h-[157.5px] bg-gray-200 shrink-0">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content - Fixed height with flex layout */}
              <div className="flex flex-col flex-1 p-3 min-h-0">
                {/* Title - Fixed 2 lines */}
                <h3 className="font-bold text-[15px] text-gray-900 leading-[1.3] mb-2 line-clamp-2 h-[39px] group-hover/card:text-blue-600 transition-colors">
                  {course.title}
                </h3>

                {/* Author - Single line */}
                <p className="text-xs text-gray-500 mb-2 truncate">
                  {course.author}
                </p>

                {/* Rating - Fixed height */}
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-sm font-bold text-gray-900">
                    {course.rating}
                  </span>
                  <div className="flex text-[#f4c150] text-xs">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({course.reviews})
                  </span>
                </div>

                {/* Price - Fixed height */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-gray-900 text-lg">
                    {course.price}
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm text-gray-500 line-through decoration-gray-500">
                      {course.originalPrice}
                    </span>
                  )}
                </div>

                {/* Badges - Push to bottom */}
                <div className="mt-auto flex items-center gap-2 flex-wrap">
                  {course.premium && (
                    <>
                      <span className="bg-linear-to-r from-pink-600 to-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                        <Crown size={12} className="fill-white" />
                        Premium
                      </span>
                      <span className="bg-green-200 text-black text-[10px] font-bold px-2 py-0.5 rounded-sm">
                        Bestseller
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className={`absolute right-[-20px] top-1/3 -translate-y-1/2 z-20 w-12 h-12 bg-white text-gray-900 border border-gray-200 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-50 ${showRightArrow ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>

        {/* Hover Card Portal */}
        {hoveredCourseIndex !== null && hoverPosition && typeof document !== 'undefined' && createPortal(
          <CourseHoverCard
            {...courses[hoveredCourseIndex]}
            position={hoverPosition}
            onMouseEnter={handleHoverCardEnter}
            onMouseLeave={handleHoverCardLeave}
          />,
          document.body
        )}
      </div>
    </section>
  );
};

export default CourseSlider;
