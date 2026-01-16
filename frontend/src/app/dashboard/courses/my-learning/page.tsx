"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, ShoppingCart, GraduationCap, PlayCircle } from "lucide-react";

const ENROLLED_COURSES = [
    {
        id: 1,
        title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
        author: "Jose Portilla",
        progress: 15,
        totalLessons: 120,
        completedLessons: 18,
        image: "/courses/python.png",
        lastAccessed: "2 days ago"
    },
    {
        id: 2,
        title: "The Web Developer Bootcamp 2024",
        author: "Colt Steele",
        progress: 45,
        totalLessons: 350,
        completedLessons: 157,
        image: "/courses/webDevelopment.png",
        lastAccessed: "1 week ago"
    },
    {
        id: 3,
        title: "React - The Complete Guide 2024 (incl. Hooks, React Router, Redux)",
        author: "Maximilian Schwarzmüller",
        progress: 0,
        totalLessons: 400,
        completedLessons: 0,
        image: "/courses/aws.png",
        lastAccessed: "Never"
    },
    {
        id: 4,
        title: "Ultimate AWS Certified Solutions Architect Associate 2024",
        author: "Stephane Maarek",
        progress: 0,
        totalLessons: 382,
        completedLessons: 0,
        image: "/courses/ai-new.png",
        lastAccessed: "Never"
    }
];

export default function MyLearningPage() {
    return (
        <div className="min-h-screen bg-linear-to-t md:bg-linear-to-r from-[#e5f0ff]/50 to-[#e5f0ff]/40 font-sans">
            <main className="w-full px-4 sm:px-6 py-2">
                {/* Header Section */}
                <div className="mb-10 space-y-6 pt-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between py-1">
                        {/* Search Bar */}
                        <div className="flex items-center gap-2 w-full lg:w-auto flex-1 max-w-2xl">
                            <div className="relative flex-1 bg-white border border-gray-100 rounded-lg shadow-sm">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search my courses..."
                                    className="w-full pl-11 pr-4 py-2.5 bg-transparent border-none focus:outline-none text-[14px] text-gray-700 placeholder:text-gray-400 font-medium"
                                />
                            </div>
                            <button className="px-7 py-2.5 bg-[#1E62FF] text-white text-sm font-bold rounded-lg hover:bg-blue-600 active:scale-95 transition-all shadow-sm cursor-pointer">
                                Search
                            </button>
                        </div>

                        {/* Top Shortcut Buttons */}
                        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-hide">
                            <Link href="/dashboard/courses" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 text-[#47638d] rounded-full text-[13px] font-bold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap cursor-pointer">
                                <Sparkles className="w-4 h-4 text-[#47638d]" />
                                New & Trending
                            </Link>
                            <Link href="/dashboard/courses" className="px-5 py-2.5 bg-white border border-gray-100 text-[#47638d] rounded-full text-[13px] font-bold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap cursor-pointer">
                                All Courses
                            </Link>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#D659FF] to-[#5169FF] text-white rounded-full text-[13px] font-bold shadow-md whitespace-nowrap active:scale-95 transition-all cursor-pointer">
                                <GraduationCap className="w-4 h-4 text-white" />
                                My Learning
                            </button>
                            <Link href="/dashboard/courses/cart" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full text-[13px] font-bold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap cursor-pointer">
                                <ShoppingCart className="w-4 h-4 text-gray-700" />
                                Cart
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning</h1>
                        <p className="text-gray-500">Pick up where you left off. Watch lectures, complete quizzes, and more.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {ENROLLED_COURSES.map((course) => (
                            <div key={course.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer">
                                {/* Image */}
                                <div className="relative h-44 bg-gray-200">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <PlayCircle className="text-white w-14 h-14 drop-shadow-lg scale-90 group-hover:scale-100 transition-transform" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors h-[48px] text-[15px] leading-tight">
                                        {course.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-4 font-medium">{course.author}</p>

                                    <div className="mt-auto space-y-3">
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                                                <span>{course.progress}% Complete</span>
                                                <span>{course.completedLessons}/{course.totalLessons}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-linear-to-r from-[#1E62FF] to-[#D659FF] rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        {course.progress > 0 ? (
                                            <button className="w-full py-2.5 bg-[#1E62FF] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-blue-600 active:scale-95 transition-all shadow-sm shadow-blue-200 cursor-pointer">
                                                Continue Learning
                                            </button>
                                        ) : (
                                            <button className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 active:scale-95 transition-all shadow-sm cursor-pointer">
                                                Start Course
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
