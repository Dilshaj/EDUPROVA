"use client";

import React, { useState, useMemo } from "react";
import CourseSlider from "./CourseSlider";

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
    createdAt?: string; // Added for sorting
    _id?: string;
}

interface FeaturedCoursesProps {
    courses: Course[];
}

const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({ courses }) => {
    const [activeTab, setActiveTab] = useState("Most popular");

    const tabs = ["Most popular", "New", "Intermediate & advanced"];

    const filteredCourses = useMemo(() => {
        if (!courses || courses.length === 0) return [];

        switch (activeTab) {
            case "Most popular":
                // Sort by rating (desc) and then review count (desc)
                return [...courses].sort((a, b) => {
                    if (b.rating !== a.rating) return b.rating - a.rating;
                    return parseInt(b.reviews.replace(/,/g, '')) - parseInt(a.reviews.replace(/,/g, ''));
                });
            case "New":
                // Sort by createdAt (desc) - assuming we map createdAt to the course object
                // If createdAt is missing, fallback to original order
                return [...courses].sort((a, b) => {
                    if (a.createdAt && b.createdAt) {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    }
                    return 0;
                });
            case "Intermediate & advanced":
                // Filter by level
                return courses.filter(c => c.level === "Intermediate" || c.level === "Advanced");
            default:
                return courses;
        }
    }, [activeTab, courses]);

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured courses</h2>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 text-sm font-bold transition-colors relative whitespace-nowrap cursor-pointer ${activeTab === tab
                            ? "text-blue-500"
                            : "text-blue-500 hover:text-blue-600"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Course Slider */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <CourseSlider
                    title="" // Empty title since we have the section header
                    courses={filteredCourses}
                />
            </div>
        </div>
    );
};

export default FeaturedCourses;
