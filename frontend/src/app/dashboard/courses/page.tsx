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
  Code
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import FeaturedCourses from "./components/Tech-Courses/FeaturedCourses";
import CourseSlider from "./components/Tech-Courses/CourseSlider";


// Mock Data for Categories and Subcategories
const CATEGORIES_DATA: Record<string, string[]> = {
  "Development": [
    "Web Development", "Data Science", "Mobile Development", "Programming Languages",
    "Game Development", "Database Design & Development"
  ],
  "Business": [
    "Entrepreneurship", "Management", "Sales", "Business Strategy",
    "Operations", "Project Management", "Business Law", "Business Analytics & Intelligence",
    "Human Resources"
  ],
  "Finance & Accounting": [
    "Accounting & Bookkeeping", "Compliance", "Cryptocurrency & Blockchain",
    "Economics", "Finance", "Finance Cert & Exam Prep"
  ],
  "IT & Software": [
    "IT Certifications", "Network & Security", "Hardware", "Operating Systems & Servers",
    "Other IT & Software"
  ],
  "Office Productivity": [
    "Microsoft", "Apple", "Google", "SAP", "Oracle", "Other Office Productivity"
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
  ],
  "Health & Fitness": [
    "Fitness", "General Health", "Sports", "Nutrition", "Yoga", "Mental Health",
    "Dieting"

  ],
  "Music": [
    "Instruments", "Music Production", "Music Fundamentals", "Vocal", "Music Techniques",
    "Music Software", "Other Music"
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
          const mappedCourses = data.courses.map((c: any) => ({
            title: c.title,
            author: c.createdBy ? `${c.createdBy.firstName} ${c.createdBy.lastName}` : 'Unknown Instructor',
            rating: c.rating || 0,
            reviews: (c.numReviews || 0).toLocaleString(),
            price: `₹${c.price}`,
            originalPrice: c.price ? `₹${Math.round(c.price * 1.5)}` : '', // Mock original price
            image: c.thumbnail || '/courses/person.png', // Fallback image
            bestseller: c.rating >= 4.5,
            premium: c.price > 0,
            level: c.level,
            createdAt: c.createdAt,
            description: c.description,
            _id: c._id
          }));
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

      {/* Category Navigation & Mega Menu Container */}
      {/* <div
        className="relative bg-white shadow-sm border-b border-gray-200 z-40"
        onMouseLeave={() => setActiveCategory(null)}
      >
        <div className="w-full px-4 sm:px-6">
          <ul className="flex items-center justify-center gap-8 text-sm text-gray-600 overflow-x-auto scrollbar-hide relative">
            {Object.keys(CATEGORIES_DATA).map((cat) => (
              <li
                key={cat}
                className={`whitespace-nowrap cursor-pointer transition-colors py-3 ${activeCategory === cat
                  ? 'text-blue-600'
                  : 'hover:text-blue-600'
                  }`}
                onMouseEnter={() => setActiveCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        Mega Menu Dropdown
        <div
          className={`absolute left-0 top-full w-full bg-blue-500 text-gray-900 shadow-xl border-t border-gray-200 rounded-xl transition-all duration-200 ease-out origin-top z-50 ${activeCategory ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'
            }`}
        >
          <div className="w-full px-4 sm:px-6 py-4">
            {activeCategory && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-center gap-8 overflow-x-auto scrollbar-hide">
                  {CATEGORIES_DATA[activeCategory]?.map((subCat) => (
                    <Link
                      href="#"
                      key={subCat}
                      className="text-white hover:text-white/70  whitespace-nowrap text-sm transition-colors"
                    >
                      {subCat}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div> */}

      {/* Main Content Area */}
      <main className="w-full px-4 sm:px-6 py-2">

        {/* Welcome Message */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2 mt-5">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {userInitials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userName}</h1>
              <Link href="#" className="text-blue-600 text-sm hover:underline font-medium">Add occupation and interests</Link>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
            {/* Search Bar */}
            <div className="flex items-center gap-2 w-full md:w-auto flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, mentors, or topics..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 active:scale-95 cursor-pointer transition-all">
                Search
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full text-sm font-medium whitespace-nowrap shadow-sm">
                <Sparkles className="w-4 h-4" />
                New & Trending
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors whitespace-nowrap">
                All Courses
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors whitespace-nowrap">
                <Video className="w-4 h-4" />
                Video Lessons
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors whitespace-nowrap">
                <Code className="w-4 h-4" />
                Interactive
              </button>
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
                      <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
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
