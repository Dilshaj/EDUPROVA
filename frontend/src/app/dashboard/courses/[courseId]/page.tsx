"use client";

import React from "react";
import Link from "next/link";
import { Search, ShoppingCart, Bookmark, Bell, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import CourseHeader from "../components/Tech-Courses/CourseHeader";
import { COURSE_DATA } from "../components/Tech-Courses/dummyData";
import WhatYouWillLearn from "../components/Tech-Courses/WhatYouWillLearn";
import CurriculumSection from "../components/Tech-Courses/CurriculumSection";
import InstructorSection from "../components/Tech-Courses/InstructorSection";
import StudentsAlsoBought from "../components/Tech-Courses/StudentsAlsoBought";
import LearningPath from "../components/Tech-Courses/LearningPath";
import ReviewsSection from "../components/Tech-Courses/ReviewsSection";
import SidebarPurchaseBox from "../components/Tech-Courses/SidebarPurchaseBox";


export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-white font-sans w-full pb-12">
            {/* Top Navbar (Reused from Landing Page for consistency) */}


            {/* Course Header */}
            <div className=" mx-auto px-4 pt-6">
                <CourseHeader
                    title={COURSE_DATA.title}
                    subtitle={COURSE_DATA.subtitle}
                    rating={COURSE_DATA.rating}
                    ratingCount={COURSE_DATA.ratingCount}
                    studentCount={COURSE_DATA.studentCount}
                    instructor={COURSE_DATA.instructor.name}
                    lastUpdated={COURSE_DATA.lastUpdated}
                    language={COURSE_DATA.language}
                />
            </div>

            {/* Main Content Grid */}
            <div className="max-w-[1200px] mx-auto px-4 py-8 relative">
                <div className="flex flex-col lg:flex-row lg:gap-8">
                    {/* Left Column */}
                    <div className="lg:w-[65%] order-2 lg:order-1">
                        <WhatYouWillLearn points={COURSE_DATA.whatYouWillLearn} />

                        <CurriculumSection
                            sections={COURSE_DATA.curriculum.sections as any}
                            totalSections={COURSE_DATA.curriculum.totalSections}
                            totalLectures={COURSE_DATA.curriculum.totalLectures}
                            totalLength={COURSE_DATA.curriculum.totalLength}
                        />

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                                <li>Access to a computer with an internet connection.</li>
                                <li>No prior programming experience needed - I'll teach you everything you need to know.</li>
                                <li>A willingness to learn and practice!</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                            <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                                <p>Welcome to the 100 Days of Code - The Complete Python Pro Bootcamp, the only course you need to learn to code with Python. With over 56 hours of HD video tutorials and building over 100 real-world Python projects, this is hands-down the most comprehensive Python course available online.</p>
                                <p>At 60+ hours, this Python course is without a doubt the most comprehensive Python course available anywhere online. Even if you have zero programming experience, this course will take you from beginner to professional. Here's why:</p>
                                <ul className="list-disc list-inside pl-4">
                                    <li>The course is taught by the lead instructor at the App Brewery, London's leading in-person programming bootcamp.</li>
                                    <li>The course has been updated to be 2025 ready and you'll be learning the latest tools and technologies used at large companies such as Apple, Google and Netflix.</li>
                                    <li>This course doesn't cut any corners, there are beautiful animated explanation videos and tens of real-world projects which you will get to build.</li>
                                </ul>
                            </div>
                        </div>

                        <InstructorSection
                            name={COURSE_DATA.instructor.name}
                            role={COURSE_DATA.instructor.role}
                            image={COURSE_DATA.instructor.image}
                            rating={COURSE_DATA.instructor.rating}
                            reviews={COURSE_DATA.instructor.reviews}
                            students={COURSE_DATA.instructor.students}
                            courses={COURSE_DATA.instructor.courses}
                            bio={COURSE_DATA.instructor.bio}
                        />

                        <StudentsAlsoBought courses={COURSE_DATA.relatedCourses as any} />

                        <LearningPath />

                        <ReviewsSection
                            rating={COURSE_DATA.rating}
                            reviews={COURSE_DATA.reviews}
                        />
                    </div>

                    {/* Right Column (Sticky Sidebar) */}
                    <div className="lg:w-[35%] relative lg:mt-[-200px] z-20 order-1 lg:order-2">
                        <SidebarPurchaseBox
                            price={COURSE_DATA.price}
                            originalPrice={COURSE_DATA.originalPrice}
                            discount={COURSE_DATA.discount}
                            daysLeft={COURSE_DATA.daysLeft}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
