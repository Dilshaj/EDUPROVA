"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Crown, Star, Clock, Users } from "lucide-react";
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
  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);

    const rect = e.currentTarget.getBoundingClientRect();

    enterTimeoutRef.current = setTimeout(() => {
      const hoverCardWidth = 380;
      const gap = 24;

      let left = rect.right + gap + window.scrollX;

      if (rect.right + gap + hoverCardWidth > window.innerWidth - 10) {
        left = rect.left - hoverCardWidth - gap + window.scrollX;
      }

      // Center vertically relative to the card
      let top = rect.top + window.scrollY + (rect.height / 2);

      setHoverPosition({
        top: top,
        left: left
      });
      setHoveredCourseIndex(index);
    }, 400); // 400ms delay before showing to prevent "hiding" content while moving mouse
  };

  const handleMouseLeave = () => {
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCourseIndex(null);
      setHoverPosition(null);
    }, 300);
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
          className={`absolute left-[-20px] top-1/3 -translate-y-1/2 z-20 w-12 h-12 bg-white text-gray-900 border border-gray-200 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-50 cursor-pointer ${showLeftArrow ? "opacity-100 visible" : "opacity-0 invisible"
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
          {courses.map((course, i) => {
            const priceNum = parseInt(course.price.replace(/[^\d]/g, '')) || 0;
            const originalPriceNum = parseInt(course.originalPrice.replace(/[^\d]/g, '')) || 0;
            const discount = originalPriceNum > 0 ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100) : 0;

            return (
              <Link
                href={`/dashboard/courses/${course._id}`}
                key={i}
                className="w-[280px] h-[380px] shrink-0 flex flex-col cursor-pointer group/card bg-white transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md rounded-2xl overflow-hidden border border-gray-100"
                onMouseEnter={(e) => handleMouseEnter(i, e)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Image Container - Fixed height */}
                <div className="relative w-full h-[160px] bg-gray-200 shrink-0">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  {/* Bestseller/Hot Badge with Gradient */}
                  {course.bestseller ? (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-linear-to-r from-[#1E62FF] to-[#D659FF] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                        Bestseller
                      </span>
                    </div>
                  ) : course.rating >= 4.0 ? (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-linear-to-r from-[#1E62FF] to-[#D659FF] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">
                        Hot
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Content - Fixed height with flex layout */}
                <div className="flex flex-col flex-1 p-4 min-h-0">
                  {/* Title - Fixed 2 lines */}
                  <h3 className="font-bold text-[15px] text-gray-900 leading-tight mb-2 line-clamp-2 h-[38px] group-hover/card:text-[#1E62FF] transition-colors">
                    {course.title}
                  </h3>

                  {/* Author - Single line */}
                  <p className="text-xs text-gray-500 mb-2 truncate font-medium">
                    {course.author}
                  </p>

                  {/* Rating - Fixed height */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <Star size={14} className="fill-[#f4c150] text-[#f4c150]" />
                    <span className="text-sm font-bold text-gray-800">
                      {course.rating}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      ({course.reviews} students)
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock size={14} />
                      <span className="text-[11px] font-medium">{course.duration || '63 hours'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Users size={14} />
                      <span className="text-[11px] font-medium capitalize">{course.level || 'Beginner'}</span>
                    </div>
                  </div>

                  {/* Pricing - Gradient Text */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#1E62FF] to-[#D659FF] text-xl">
                        {course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="text-xs text-gray-400 line-through font-medium">
                          {course.originalPrice}
                        </span>
                      )}
                    </div>
                    {discount > 0 && (
                      <div className="bg-gray-100 px-2 py-0.5 rounded-md">
                        <span className="text-gray-600 text-[10px] font-bold">
                          {discount}% off
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className={`absolute right-[-20px] top-1/3 -translate-y-1/2 z-20 w-12 h-12 bg-white text-gray-900 border border-gray-200 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-50 cursor-pointer ${showRightArrow ? "opacity-100 visible" : "opacity-0 invisible"
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
