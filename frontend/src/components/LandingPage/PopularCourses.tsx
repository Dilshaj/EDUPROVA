"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { LuText } from "react-icons/lu";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface CarouselPaginationProps {
    total?: number;
}

function CarouselPagination({ total = 6 }: CarouselPaginationProps) {
    const [active, setActive] = useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Helper function to get the appropriate image based on course title/category
    const getCourseImage = (title: string, category: string): string => {
        const searchText = `${title} ${category}`.toLowerCase();

        // Python courses
        if (searchText.includes("python")) {
            return "/python_course_image_1763976042231.png";
        }

        // Web Development courses
        if (
            searchText.includes("web") ||
            searchText.includes("react") ||
            searchText.includes("next.js")
        ) {
            return "/web_dev_course_thumbnail_1763975855352.png";
        }

        // Data-related courses
        if (
            searchText.includes("data") ||
            searchText.includes("analyst") ||
            searchText.includes("science")
        ) {
            return "/data_analyst_course_thumbnail_1763975895878.png";
        }

        // Java courses (fallback to Python image as they're similar)
        if (searchText.includes("java")) {
            return "/python_course_image_1763976042231.png";
        }

        // UI/UX Design courses (fallback to Web Dev image as design is web-related)
        if (
            searchText.includes("ui") ||
            searchText.includes("ux") ||
            searchText.includes("design")
        ) {
            return "/web_dev_course_thumbnail_1763975855352.png";
        }

        // AI/ML courses (fallback to Data Analyst image as AI/ML is data-related)
        if (
            searchText.includes("ai") ||
            searchText.includes("machine learning") ||
            searchText.includes("artificial intelligence")
        ) {
            return "/data_analyst_course_thumbnail_1763975895878.png";
        }

        // Default fallback
        return "/python_course_image_1763976042231.png";
    };

    interface Course {
        id: string | number;
        title: string;
        category: string;
        level: string;
        duration: string;
        rating: number;
        originalPrice: number;
        price: number;
        image: string;
        color: string;
    }

    const CATEGORIES = [
        "All Courses",
        "Python Programming Language",
        "Artificial Intelligence (AI)",
        "Java Full Stack Development",
        "UI/UX Designing",
        "Web Development",
        "Data Analyst",
    ];

    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/courses?limit=9&sort=rating`);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }

                const data = await res.json();
                if (data.success) {
                    const mappedCourses = data.courses.map((c: any, index: number) => ({
                        id: c._id,
                        title: c.title,
                        category: c.category,
                        level: c.level || 'Beginner',
                        duration: c.totalDuration ? `${Math.floor(c.totalDuration / 3600)}h` : '10h', // Approx
                        rating: c.rating || 0,
                        originalPrice: c.price + 20, // Fake original price for display
                        price: c.price,
                        image: c.thumbnail || getCourseImage(c.title, c.category),
                        color: [
                            "from-slate-900 to-slate-800",
                            "from-blue-900 to-blue-800",
                            "from-slate-900 to-blue-900",
                            "from-orange-900 to-orange-800",
                            "from-purple-900 to-purple-800",
                            "from-green-900 to-green-800",
                            "from-indigo-900 to-indigo-800",
                            "from-cyan-900 to-cyan-800",
                            "from-teal-900 to-teal-800"
                        ][index % 9]
                    }));
                    setCourses(mappedCourses);
                }
            } catch (error) {
                console.warn('Failed to fetch popular courses, using fallback mock data:', error);
                // Fallback Mock Data
                const mockCourses: Course[] = [
                    {
                        id: 'mock-1',
                        title: "Complete Python Masterclass",
                        category: "Python Programming Language",
                        level: "Beginner",
                        duration: "24h",
                        rating: 4.8,
                        originalPrice: 99.99,
                        price: 19.99,
                        image: getCourseImage("Complete Python Masterclass", "Python Programming Language"),
                        color: "from-slate-900 to-slate-800"
                    },
                    {
                        id: 'mock-2',
                        title: "Advanced React & Next.js",
                        category: "Web Development",
                        level: "Advanced",
                        duration: "32h",
                        rating: 4.9,
                        originalPrice: 129.99,
                        price: 24.99,
                        image: getCourseImage("Advanced React & Next.js", "Web Development"),
                        color: "from-blue-900 to-blue-800"
                    },
                    {
                        id: 'mock-3',
                        title: "Data Science Fundamentals",
                        category: "Data Analyst",
                        level: "Intermediate",
                        duration: "40h",
                        rating: 4.7,
                        originalPrice: 149.99,
                        price: 29.99,
                        image: getCourseImage("Data Science Fundamentals", "Data Analyst"),
                        color: "from-slate-900 to-blue-900"
                    },
                    {
                        id: 'mock-4',
                        title: "UI/UX Design Essentials",
                        category: "UI/UX Designing",
                        level: "Beginner",
                        duration: "18h",
                        rating: 4.6,
                        originalPrice: 79.99,
                        price: 14.99,
                        image: getCourseImage("UI/UX Design Essentials", "UI/UX Designing"),
                        color: "from-orange-900 to-orange-800"
                    },
                    {
                        id: 'mock-5',
                        title: "AI and Machine Learning",
                        category: "Artificial Intelligence (AI)",
                        level: "Intermediate",
                        duration: "50h",
                        rating: 4.9,
                        originalPrice: 199.99,
                        price: 49.99,
                        image: getCourseImage("AI and Machine Learning", "Artificial Intelligence (AI)"),
                        color: "from-purple-900 to-purple-800"
                    },
                    {
                        id: 'mock-6',
                        title: "Java Full Stack Pro",
                        category: "Java Full Stack Development",
                        level: "Advanced",
                        duration: "60h",
                        rating: 4.8,
                        originalPrice: 179.99,
                        price: 39.99,
                        image: getCourseImage("Java Full Stack Pro", "Java Full Stack Development"),
                        color: "from-green-900 to-green-800"
                    }
                ];
                setCourses(mockCourses);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const totalPages = Math.ceil(courses.length / 3) || 1;

    const prev = () => {
        setActive((i: number) => (i > 0 ? i - 1 : totalPages - 1));
    };

    const next = () => {
        setActive((i: number) => (i < totalPages - 1 ? i + 1 : 0));
    };

    // 🔥 GSAP card rotation-style animation whenever active changes
    useGSAP(
        () => {
            const cards = containerRef.current?.querySelectorAll(".course-card");
            if (!cards || cards.length === 0) return;

            gsap.fromTo(
                cards,
                {
                    opacity: 0,
                    y: 40,
                    rotateY: -25,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.08,
                }
            );
        },
        { dependencies: [active], scope: containerRef }
    );

    const PopularCourses = () => {
        const [activeCategory, setActiveCategory] = useState("All Courses");

        // Get current set of 3 courses based on active pagination
        const getCurrentCourses = () => {
            if (courses.length === 0) return [];
            const startIndex = active * 3;
            return [
                courses[startIndex % courses.length],
                courses[(startIndex + 1) % courses.length],
                courses[(startIndex + 2) % courses.length],
            ];
        };

        const currentCourses = getCurrentCourses();

        if (isLoading) {
            return <div className="py-20 text-center text-slate-500">Loading popular courses...</div>;
        }

        if (courses.length === 0) return null;

        // Reusable card renderer (big vs small handled by parent)
        const renderCard = (course: Course) => {
            if (!course) return null;
            return (
                <Link href={`/courses/${course.id}`} className="block h-full">
                    <div className="bg-white rounded-2xl sm:rounded-[1.75rem] shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group cursor-pointer">

                        {/* IMAGE */}
                        <div
                            className={`relative w-full h-40 sm:h-44 md:h-48 lg:h-52 rounded-xl sm:rounded-1.5rem overflow-hidden mb-3 bg-linear-to-br ${course.color}`}
                        >
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3">
                                <span className="p-2 bg-white backdrop-blur-md rounded-full hover:bg-white transition-colors inline-block">
                                    <LuText className="transform scale-x-[-1] text-black" />
                                </span>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="px-3 sm:px-4 pb-4 flex flex-col grow">
                            <h3 className="text-lg sm:text-xl font-bold text-black mb-2">
                                {course.title}
                            </h3>

                            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-4 flex-wrap">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-semibold text-[0.7rem]">
                                    {course.level}
                                </span>
                                <span>{course.duration}</span>
                                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                    <Star size={13} fill="currentColor" />
                                    <span>{course.rating}</span>
                                </div>
                            </div>

                            {/* PRICE + BUTTON */}
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-slate-400 text-sm line-through">
                                        ${course.originalPrice.toFixed(2)}
                                    </span>
                                    <span className="text-black text-xl font-bold">
                                        ${course.price.toFixed(2)}
                                    </span>
                                </div>

                                <span className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors">
                                    Buy Now
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        };

        return (
            <section className="py-8 sm:py-12 md:py-16 bg-transparent relative overflow-hidden font-sans">
                {/* Decorative bubbles - hidden on mobile, visible on medium+ screens */}
                <div className="hidden md:block absolute top-64 sm:top-32 md:top-60 right-[10%] sm:right-[22%] w-2 h-2 sm:w-3 sm:h-3 bg-teal-600 rounded-full animate-spin-slow" />
                <div className="hidden md:block absolute top-32 sm:top-56 md:top-80 left-[20%] sm:left-[42%] w-3 h-3 sm:w-5 sm:h-5 bg-orange-500 rounded-full animate-spin-slower" />
                <div className="hidden md:block absolute bottom-40 sm:bottom-56 left-[15%] sm:left-[38%] w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-full animate-spin-slow" />
                <div className="hidden md:block absolute bottom-32 sm:bottom-48 right-[30%] sm:right-[65%] w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rounded-full animate-spin-slower" />
                <div className="hidden md:block absolute bottom-24 sm:bottom-42 right-[20%] sm:right-[42%] w-3 h-3 sm:w-5 sm:h-5 bg-purple-600 rounded-full animate-spin-slow" />

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-8 md:mb-10">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2 sm:mb-3 leading-tight">
                                Explore Most Popular Courses
                            </h2>

                            <p className="text-slate-600 text-sm sm:text-base md:text-[0.95rem] leading-relaxed">
                                Upgrade your skills with the most in-demand courses curated for
                                today&apos;s careers.
                                <br className="hidden md:block" />
                                Learn from experts and start your journey toward a brighter
                                future.
                            </p>
                        </div>
                        <Link
                            href="/courses"
                            className="mt-4 sm:mt-6 md:mt-0 px-5 sm:px-7 py-2 sm:py-2.5 bg-blue-50 text-blue-600 font-semibold rounded-full hover:bg-blue-100 transition-colors border border-blue-200/60 text-xs sm:text-sm whitespace-nowrap"
                        >
                            View All
                        </Link>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
                        {/* Category Navigation */}
                        <div className="lg:w-1/4 shrink-0">
                            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
                                {CATEGORIES.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            if (category === "All Courses") {
                                                setActiveCategory(category);
                                            } else {
                                                const categorySlug = category
                                                    .replace(/[^a-zA-Z0-9]+/g, "-")
                                                    .replace(/^-+|-+$/g, "");
                                                router.push(
                                                    `/courses?category=${encodeURIComponent(
                                                        categorySlug
                                                    )}`
                                                );
                                            }
                                        }}
                                        className={`text-left px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-3.5 rounded-3xl text-xs sm:text-sm lg:text-base font-medium transition-all duration-200 whitespace-nowrap lg:whitespace-normal shrink-0 lg:shrink ${activeCategory === category
                                            ? "bg-white text-blue-600 border-l-[3px] border-blue-600 shadow-sm"
                                            : "text-slate-400 hover:text-slate-600 hover:bg-white/40"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cards Area */}
                        <div className="lg:w-3/4 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-blue-200/50 -z-10 rounded-3xl blur-xl" />
                            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] hidden md:block bg-blue-500/30 -z-10 rounded-full blur-3xl animate-pulse" />

                            {/* Layout with big left card & two stacked right cards */}
                            <div
                                ref={containerRef}
                                className="relative flex flex-col md:flex-row gap-4 sm:gap-6"
                            >
                                {/* Big Left Card - now centered and same size */}
                                <div className="w-full md:w-1/2 flex flex-col justify-center">
                                    <div className="course-card">
                                        {renderCard(currentCourses[0])}
                                    </div>
                                </div>

                                {/* Right Side Cards */}
                                <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-6">
                                    <div className="course-card">{renderCard(currentCourses[1])}</div>
                                    <div className="course-card">{renderCard(currentCourses[2])}</div>
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8 md:mt-10">
                                <button
                                    onClick={prev}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <div className="flex gap-1.5">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`relative overflow-hidden rounded-full transition-all duration-300 ${i === active ? "w-7 h-1.5" : "w-1.5 h-1.5"
                                                }`}
                                        >
                                            {/* Background */}
                                            <div
                                                className={`absolute inset-0 ${i === active ? "bg-blue-200" : "bg-slate-300"
                                                    }`}
                                            />

                                            {/* Animated progress bar for active dot */}
                                            {i === active && (
                                                <div
                                                    className="absolute inset-0 bg-blue-600 origin-left animate-progress"
                                                    style={{
                                                        animation: "progress 6s linear",
                                                    }}
                                                    onAnimationEnd={next}
                                                />
                                            )}

                                            {/* Pulsing overlay for active dot */}
                                            {i === active && (
                                                <div className="absolute inset-0 bg-blue-600/30 animate-pulse" />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={next}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            {/* Inline keyframes & helpers */}
                            <style jsx>{`
                @keyframes progress {
                  0% {
                    transform: scaleX(0);
                  }
                  100% {
                    transform: scaleX(1);
                  }
                }

                @keyframes spinSlow {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }

                @keyframes spinSlower {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }

                .animate-spin-slow {
                  animation: spinSlow 8s linear infinite;
                }

                .animate-spin-slower {
                  animation: spinSlower 12s linear infinite;
                }

                /* Hide scrollbar for Chrome, Safari and Opera */
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }

                /* Hide scrollbar for IE, Edge and Firefox */
                .scrollbar-hide {
                  -ms-overflow-style: none; /* IE and Edge */
                  scrollbar-width: none; /* Firefox */
                }
              `}</style>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    return <PopularCourses />;
}

export default CarouselPagination;
