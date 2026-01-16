"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ShoppingCart,
  Bookmark,
  Bell,
  Sparkles,
  Video,
  Code,
  GraduationCap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import FeaturedCourses from "./components/Tech-Courses/FeaturedCourses";
import CourseSlider from "./components/Tech-Courses/CourseSlider";
import { handleAuthError } from "@/utils/auth-error-handler";


// Mock Data for Categories and Subcategories
const CATEGORIES_DATA: Record<string, string[]> = {
  "Development": [
    "Web Development", "Mobile Development", "Programming Languages",
    "Game Development", "Database Design & Development"
  ],
  "Business": [
    "Entrepreneurship", "Management", "Sales", "Business Strategy",
    "Project Management"
  ],
  "IT & Software": [
    "IT Certifications", "Network & Security", "Hardware", "Operating Systems & Servers",
    "Other IT & Software"
  ],
  "Personal Development": [
    "Personal Transformation", "Personal Productivity", "Leadership", "Career Development",
    "Parenting & Relationships", "Happiness"
  ],
  "Design": [
    "Web Design", "Graphic Design & Illustration", "Design Tools", "User Experience Design",
    "Game Design", "3D & Animation"
  ],
  "Marketing": [
    "Digital Marketing", "Search Engine Optimization", "Social Media Marketing",
    "Branding", "Marketing Fundamentals"
  ]
};

const BANNERS = [
  {
    id: 1,
    title: "Black Friday Sale ends today",
    subtitle: "Get ready for your success era with courses as low as ₹399. Hurry before it ends.",
    image: "/courses/person.png",
    bgColor: "bg-[#F0F8FF]"
  },
  {
    id: 2,
    title: "Learning that gets you",
    subtitle: "Skills for your present (and your future). Get started with us.",
    image: "/courses/webDevelopment.png",
    bgColor: "bg-[#F5F5DC]"
  },
  {
    id: 3,
    title: "Unlock the Power of AI",
    subtitle: "Master the tools of tomorrow. Join the AI revolution today.",
    image: "/courses/ai-new.png",
    bgColor: "bg-[#E0F7FA]"
  }
];

export default function CoursesPage2() {
  const { data: session } = useSession();
  const [userName, setUserName] = useState("User");
  const [userInitials, setUserInitials] = useState("US");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [techCourses, setTechCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      const name = (session.user as any)?.firstName || session.user.name || "User";
      setUserName(name);
      setUserInitials(name.substring(0, 2).toUpperCase());
    }
  }, [session]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const [autoPlay, setAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentTranslate = useRef(0);

  useEffect(() => {
    if (!autoPlay || isDragging) return;
    const timer = setInterval(nextBanner, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, isDragging]);

  const handleDragStart = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
    // Disable transition during drag
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX.current;
    currentTranslate.current = diff;

    // Apply transform visually
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(calc(-${currentBanner * 100}% + ${diff}px))`;
    }
  };

  const handleDragEnd = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
      containerRef.current.style.transition = 'transform 500ms ease-in-out';
      // Reset manual transform so React state takes over
      containerRef.current.style.transform = '';
    }

    const threshold = 50; // Minimum drag distance to trigger swipe
    if (currentTranslate.current < -threshold) {
      nextBanner();
    } else if (currentTranslate.current > threshold) {
      prevBanner();
    }

    currentTranslate.current = 0;
  };

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        // Construct query string from current URL params
        const params = new URLSearchParams(searchParams.toString());
        // Always ensure we fetch enough items
        if (!params.has('limit')) params.set('limit', '100');

        const res = await fetch(`/api/courses?${params.toString()}`);

        if (res.status === 401) {
          await handleAuthError({ status: 401, message: 'Unauthorized' });
          return;
        }

        const data = await res.json();

        if (data.success) {
          // If the backend is not yet filtering, this mapping logic still holds for now
          // but strictly we should expect the backend to filter.
          // For now, let's assume backend returns filtered data or we filter locally if needed.
          // We'll keep the mapping for UI consistency as per the user's existing code style.
          const mappedCourses = data.courses.map((c: any) => {
            const numReviews = c.numReviews || Math.floor(Math.random() * 200000) + 10000;
            const formattedReviews = numReviews >= 1000
              ? `${(numReviews / 1000).toFixed(0)}K`
              : numReviews.toLocaleString();

            return {
              title: c.title,
              author: c.createdBy ? `${c.createdBy.firstName} ${c.createdBy.lastName}` : 'Dr. Angela Yu',
              rating: c.rating || (Math.random() * (5 - 4) + 4).toFixed(1),
              reviews: formattedReviews,
              price: `₹${c.price || 499}`,
              originalPrice: c.price ? `₹${c.price * (Math.floor(Math.random() * 3) + 7) + 99}` : `₹${3999}`,
              image: c.thumbnail || '/courses/person.png',
              bestseller: c.rating >= 4.5 || Math.random() > 0.7,
              premium: true,
              level: c.level || (Math.random() > 0.5 ? 'Beginner' : 'Intermediate'),
              duration: `${Math.floor(Math.random() * 40) + 20} hours`,
              createdAt: c.createdAt,
              description: c.description,
              _id: c._id
            };
          });
          setTechCourses(mappedCourses);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        await handleAuthError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchParams]); // Re-fetch when URL params change

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/dashboard/courses?${params.toString()}`);
  };

  // Filter courses for different sections
  const currentCategory = searchParams.get('category');

  // If a category is selected, the backend already filters techCourses. 
  // If "All Courses" (no category), we specifically look for development courses for that specific slider.
  const categoryCourses = currentCategory
    ? techCourses
    : techCourses.filter(c => c.title.toLowerCase().includes('development') || c.title.toLowerCase().includes('web') || c.title.toLowerCase().includes('coding'));

  // Ensure we have some courses to show, fallback to techCourses if specific filters return empty in "All Courses" mode
  const displayCategoryCourses = categoryCourses.length > 0 ? categoryCourses : techCourses;

  const recommendedCourses = techCourses.slice(0, 8);
  const viewingCourses = techCourses.length > 8 ? techCourses.slice(8, 16) : techCourses.slice(0, 8);

  const categorySectionTitle = currentCategory ? `Top courses in ${currentCategory}` : "Top courses in Development";

  return (
    <div className="min-h-screen bg-linear-to-t md:bg-linear-to-r from-[#e5f0ff]/50 to-[#e5f0ff]/40 font-sans">
      <main className="w-full px-4 sm:px-6 py-2">
        <div className="mb-10 space-y-6 pt-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between py-1">
            {/* Search Bar */}
            <div className="flex items-center gap-2 w-full lg:w-auto flex-1 max-w-2xl">
              <div className="relative flex-1 bg-white border border-gray-100 rounded-lg shadow-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, mentors, or topics..."
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent border-none focus:outline-none text-[14px] text-gray-700 placeholder:text-gray-400 font-medium"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleFilterChange('search', e.currentTarget.value);
                    }
                  }}
                />
              </div>
              <button
                className="px-7 py-2.5 bg-[#1E62FF] text-white text-sm font-bold rounded-lg hover:bg-blue-600 active:scale-95 transition-all shadow-sm cursor-pointer"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling?.querySelector('input');
                  if (input) handleFilterChange('search', input.value);
                }}
              >
                Search
              </button>
            </div>

            {/* Top Shortcut Buttons */}
            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-hide">
              <button
                onClick={() => handleFilterChange('sort', 'trending')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold shadow-md whitespace-nowrap active:scale-95 transition-all cursor-pointer ${searchParams.get('sort') === 'trending'
                  ? 'bg-linear-to-r from-[#D659FF] to-[#5169FF] text-white'
                  : 'bg-white border border-gray-100 text-[#47638d] hover:bg-gray-50'
                  }`}
              >
                <Sparkles className={`w-4 h-4 ${searchParams.get('sort') === 'trending' ? 'fill-white' : 'text-[#47638d]'}`} />
                New & Trending
              </button>
              <button
                onClick={() => handleFilterChange('sort', null)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold shadow-md whitespace-nowrap cursor-pointer ${searchParams.get('sort') !== 'trending'
                  ? 'bg-linear-to-r from-[#D659FF] to-[#5169FF] text-white'
                  : 'bg-white border border-gray-100 text-[#47638d] hover:bg-gray-50'
                  }`}
              >
                All Courses
              </button>
              <Link href="/dashboard/courses/my-learning" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full text-[13px] font-bold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap cursor-pointer">
                <GraduationCap className="w-4 h-4 text-gray-700" />
                My Learning
              </Link>
              <Link href="/dashboard/courses/cart" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full text-[13px] font-bold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap cursor-pointer">
                <ShoppingCart className="w-4 h-4 text-gray-700" />
                Cart
              </Link>
            </div>
          </div>

          {/* Category Navigation & Subcategory Bar Container */}
          <div
            className="border-t border-gray-100 pt-6 relative"
            onMouseLeave={() => setActiveCategory(null)}
          >
            <ul
              className="flex items-center justify-center gap-10 text-[15px] font-bold text-gray-500 overflow-x-auto custom-scrollbar px-2 pb-2"
              onWheel={(e) => {
                if (e.deltaY !== 0) {
                  e.stopPropagation();
                  e.currentTarget.scrollLeft += e.deltaY;
                }
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {Object.keys(CATEGORIES_DATA).map((cat) => (
                <li
                  key={cat}
                  className={`whitespace-nowrap cursor-pointer transition-all hover:text-[#1E62FF] border-b-2 py-1 ${activeCategory === cat || searchParams.get('category') === cat
                    ? 'text-[#1E62FF] border-[#1E62FF]'
                    : 'border-transparent'
                    }`}
                  onMouseEnter={() => setActiveCategory(cat)}
                  onClick={() => handleFilterChange('category', cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>

            {/* Subcategory Bar - Blue Pill Style (Absolute) */}
            <div className={`absolute left-0 right-0 top-full z-50 transition-all duration-300 transform origin-top ${activeCategory ? 'opacity-100 scale-y-100 ' : 'opacity-0 scale-y-0 pointer-events-none'
              }`}>
              <div className="bg-[#1E62FF] rounded-xl px-6 py-4 shadow-2xl">
                <div className="flex items-center justify-center gap-8 overflow-x-auto scrollbar-hide">
                  {activeCategory && CATEGORIES_DATA[activeCategory]?.map((subCat) => (
                    <button
                      key={subCat}
                      onClick={() => handleFilterChange('category', subCat)}
                      className="text-white hover:text-white/80 whitespace-nowrap text-sm font-bold transition-colors cursor-pointer bg-transparent border-none"
                    >
                      {subCat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Carousel */}
        <div
          className="relative w-full h-[400px] md:h-[500px] rounded-xl shadow-lg mb-12 group touch-pan-y"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg mb-12 group">
            <div
              ref={containerRef}
              className="absolute inset-0 flex"
              style={{
                transform: `translateX(-${currentBanner * 100}%)`,
                transition: isDragging ? 'none' : 'transform 500ms ease-in-out',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerLeave={handleDragEnd}
            >
              {BANNERS.map((banner) => (
                <div
                  key={banner.id}
                  className="w-full h-full shrink-0 relative select-none"
                  onDragStart={(e) => e.preventDefault()} // Prevent native image drag
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-cover pointer-events-none" // Prevent image interaction
                      priority
                    />
                    {/* Overlay for readability */}
                    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex items-center p-8 md:p-16 pointer-events-none">
                    <div className="max-w-xl p-6 rounded-lg pointer-events-auto">
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif drop-shadow-md">{banner.title}</h2>
                      <p className="text-lg text-gray-100 mb-6 drop-shadow-sm">{banner.subtitle}</p>
                      <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors cursor-pointer">
                        Save now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls - Animated Progress Pagination */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full z-10"
            role="status"
            aria-label="Carousel navigation"
          >
            {BANNERS.map((_, index) => {
              const isActive = currentBanner === index;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`relative overflow-hidden rounded-full transition-all duration-300 cursor-pointer ${isActive ? "w-20 h-1.5" : "w-8 h-1.5"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? "true" : "false"}
                >
                  {/* Background */}
                  <div className={`absolute inset-0 ${isActive ? " bg-blue-50" : "bg-gray-200"
                    }`} />

                  {/* Animated progress bar for active indicator */}
                  {isActive && (
                    <div
                      className="absolute inset-0 bg-blue-600 origin-left"
                      style={{
                        animation: 'progress 5s linear infinite'
                      }}
                    />
                  )}

                  {/* Pulsing overlay for active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-blue-200 animate-pulse opacity-50" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Featured Courses Section */}
            <FeaturedCourses courses={techCourses} />

            {/* Course Sections */}
            <CourseSlider
              title="What to learn next"
              courses={recommendedCourses.length > 0 ? recommendedCourses : techCourses}
            />

            <CourseSlider
              title={categorySectionTitle}
              courses={displayCategoryCourses}
            />

            <CourseSlider
              title="Recommended for you"
              courses={recommendedCourses.length > 0 ? recommendedCourses : techCourses}
            />

            <CourseSlider
              title="Students are viewing"
              courses={viewingCourses.length > 0 ? viewingCourses : techCourses}
            />
          </>
        )}
      </main>
    </div>
  );
}
