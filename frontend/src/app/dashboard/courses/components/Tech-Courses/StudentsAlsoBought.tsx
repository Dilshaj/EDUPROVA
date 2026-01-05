"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, Crown, Heart } from 'lucide-react';

interface RelatedCourse {
    id: number;
    title: string;
    subtitle?: string;
    image: string;
    rating: number;
    students: string;
    price: string;
    originalPrice: string;
    totalHours: string;
    updatedDate: string;
    isPremium: boolean;
    isBestseller: boolean;
}

interface StudentsAlsoBoughtProps {
    courses: RelatedCourse[];
}

const StudentsAlsoBought: React.FC<StudentsAlsoBoughtProps> = ({ courses }) => {
    const [showAll, setShowAll] = useState(false);
    const [wishlistedCourses, setWishlistedCourses] = useState<Set<number>>(new Set());
    const initialDisplayCount = 6; // Show first 6 courses initially
    const hasMoreCourses = courses.length > initialDisplayCount;

    const displayedCourses = showAll ? courses : courses.slice(0, initialDisplayCount);

    const toggleWishlist = (courseId: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlistedCourses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(courseId)) {
                newSet.delete(courseId);
            } else {
                newSet.add(courseId);
            }
            return newSet;
        });
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Students also bought</h2>

            <div className="space-y-3">
                {displayedCourses.map((course) => {
                    const isWishlisted = wishlistedCourses.has(course.id);

                    return (
                        <div
                            key={course.id}
                            className="flex items-start gap-3 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                        >
                            {/* Course Image */}
                            <Link href={`/courses2/${course.id}`} className="relative w-16 h-16 flex-shrink-0">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                            </Link>

                            {/* Course Info - Left Side */}
                            <div className="flex-1 min-w-0">
                                <Link href={`/courses2/${course.id}`}>
                                    <h3 className="text-sm font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                                        {course.title}
                                        {course.subtitle && (
                                            <span className="font-normal text-gray-700"> ({course.subtitle})</span>
                                        )}
                                    </h3>
                                </Link>

                                <div className="flex items-center gap-2 flex-wrap text-xs">
                                    {course.isBestseller && (
                                        <span className="bg-green-200 text-black rounded-full font-bold px-1.5 py-0.5">
                                            Bestseller
                                        </span>
                                    )}
                                    {course.isPremium && (
                                        <span className="bg-gradient-to-r from-pink-600 to-blue-600 text-white font-bold px-1.5 py-0.5 flex items-center gap-1 rounded">
                                            <Crown size={10} className="fill-white" />
                                            Premium
                                        </span>

                                    )}
                                    <span className="text-gray-600">
                                        {course.totalHours} • Updated {course.updatedDate}
                                    </span>
                                </div>
                            </div>

                            {/* Rating, Students, Price and Heart - Right Side */}
                            <div className="flex items-center gap-6 flex-shrink-0">
                                {/* Rating */}
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-xs text-gray-900">{course.rating}</span>
                                    <Star size={12} className="fill-orange-400 text-orange-400" />
                                </div>

                                {/* Students */}
                                <div className="flex items-center gap-1">
                                    <Users size={12} className="text-gray-600" />
                                    <span className="text-xs text-gray-600">{course.students}</span>
                                </div>

                                {/* Price */}
                                <div className="text-right min-w-[60px]">
                                    <div className="font-bold text-sm text-gray-900">{course.price}</div>
                                    <div className="text-xs text-gray-500 line-through">{course.originalPrice}</div>
                                </div>

                                {/* Heart Icon */}
                                <button
                                    onClick={(e) => toggleWishlist(course.id, e)}
                                    className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${isWishlisted
                                        ? "border-blue-500"
                                        : "border-gray-900 hover:bg-gray-50"
                                        }`}
                                >
                                    <Heart
                                        size={16}
                                        className={`transition-colors ${isWishlisted
                                            ? "fill-blue-500 text-blue-500"
                                            : "text-gray-900"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {hasMoreCourses && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-4 w-full py-2.5 border border-gray-900 text-gray-900 font-bold hover:bg-gray-50 transition-colors text-sm"
                >
                    {showAll ? 'Show less' : 'Show more'}
                </button>
            )}
        </div>
    );
};

export default StudentsAlsoBought;
