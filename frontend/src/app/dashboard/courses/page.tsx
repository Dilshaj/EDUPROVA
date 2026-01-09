"use client";

import React, { useState, useEffect } from "react";
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
import FeaturedCourses from "./components/Tech-Courses/FeaturedCourses";
import CourseSlider from "./components/Tech-Courses/CourseSlider";


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
  const [courses, setCourses] = useState<any[]>([]);
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

  useEffect(() => {
    const timer = setInterval(nextBanner, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses?limit=100');
        const data = await res.json();
        if (data.success) {
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
          setCourses(mappedCourses);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses for different sections
  const developmentCourses = courses.filter(c => c.title.toLowerCase().includes('development') || c.title.toLowerCase().includes('web') || c.title.toLowerCase().includes('coding'));
  const recommendedCourses = courses.slice(0, 8); // Just take first 8 for now
  const viewingCourses = courses.slice(8, 16); // Take next 8

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
                />
              </div>
              <button className="px-7 py-2.5 bg-[#1E62FF] text-white text-sm font-bold rounded-lg hover:bg-blue-600 active:scale-95 transition-all shadow-sm cursor-pointer">
                Search
              </button>
            </div>

            {/* Top Shortcut Buttons */}
            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-hide">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#D659FF] to-[#5169FF] text-white rounded-full text-[13px] font-bold shadow-md whitespace-nowrap active:scale-95 transition-all cursor-pointer">
                <Sparkles className="w-4 h-4 fill-white" />
                New & Trending
              </button>
              <button className="px-5 py-2.5 bg-white border border-gray-100 text-[#47638d] rounded-full text-[13px] font-bold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap cursor-pointer">
                All Courses
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full text-[13px] font-bold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap cursor-pointer">
                <GraduationCap className="w-4 h-4 text-gray-700" />
                My Learning
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full text-[13px] font-bold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap cursor-pointer">
                <ShoppingCart className="w-4 h-4 text-gray-700" />
                Cart
              </button>
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
                  className={`whitespace-nowrap cursor-pointer transition-all hover:text-[#1E62FF] border-b-2 py-1 ${activeCategory === cat
                    ? 'text-[#1E62FF] border-[#1E62FF]'
                    : 'border-transparent'
                    }`}
                  onMouseEnter={() => setActiveCategory(cat)}
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
                    <Link
                      href="#"
                      key={subCat}
                      className="text-white hover:text-white/80 whitespace-nowrap text-sm font-bold transition-colors"
                    >
                      {subCat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Carousel */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl shadow-lg mb-12 group">
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg mb-12 group">
            <div
              className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentBanner * 100}%)` }}
            >
              {BANNERS.map((banner) => (
                <div key={banner.id} className="w-full h-full shrink-0 relative">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Overlay for readability */}
                    <div className="absolute inset-0 bg-black/30" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex items-center p-8 md:p-16">
                    <div className="max-w-xl p-6 rounded-lg">
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
            <FeaturedCourses courses={courses} />

            {/* Course Sections */}
            <CourseSlider
              title="What to learn next"
              courses={recommendedCourses.length > 0 ? recommendedCourses : courses}
            />

            <CourseSlider
              title="Top courses in Development"
              courses={developmentCourses.length > 0 ? developmentCourses : courses}
            />

            <CourseSlider
              title="Recommended for you"
              courses={recommendedCourses.length > 0 ? recommendedCourses : courses}
            />

            <CourseSlider
              title="Students are viewing"
              courses={viewingCourses.length > 0 ? viewingCourses : courses}
            />
          </>
        )}
      </main>
    </div>
  );
}
