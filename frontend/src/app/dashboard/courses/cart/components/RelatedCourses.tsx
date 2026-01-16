import React from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const RELATED_COURSES = [
    {
        id: 1,
        title: "The Data Analyst Course: Complete Data Analyst...",
        author: "365 Careers",
        rating: 4.5,
        ratingCount: 23643,
        price: 559,
        originalPrice: 3599,
        image: "/courses/webDevelopment.png", // Using existing placeholder
        isPremium: true,
        isBestseller: false,
    },
    {
        id: 2,
        title: "Complete Data Science, Machine Learning, DL...",
        author: "Krish Naik",
        rating: 4.5,
        ratingCount: 30786,
        price: 559,
        originalPrice: 3599,
        image: "/courses/python.png", // Using existing placeholder
        isPremium: true,
        isBestseller: true,
    },
    {
        id: 3,
        title: "Microsoft Excel - Excel from Beginner to Advanced",
        author: "Kyle Pew",
        rating: 4.7,
        ratingCount: 130783,
        price: 529,
        originalPrice: 3099,
        image: "/courses/aws.png", // Using existing placeholder
        isPremium: true,
        isBestseller: true,
    },
];

export function RelatedCourses() {
    return (
        <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">You might also like</h2>
                <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {RELATED_COURSES.map((course) => (
                    <div key={course.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-40 w-full">
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-2 left-2 flex gap-1">
                                {course.isPremium && (
                                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                                        Premium
                                    </span>
                                )}
                                {course.isBestseller && (
                                    <span className="bg-yellow-100/90 backdrop-blur-sm text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                                        Bestseller
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 h-10">
                                {course.title}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">{course.author}</p>

                            <div className="flex items-center gap-1 mb-2">
                                <span className="font-bold text-amber-600 text-sm">{course.rating}</span>
                                <div className="flex text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                                            className={i < Math.floor(course.rating) ? "" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-xs">({course.ratingCount.toLocaleString('en-IN')})</span>
                            </div>

                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="font-bold text-gray-900">₹{course.price}</span>
                                <span className="text-xs text-gray-400 line-through">₹{course.originalPrice}</span>
                            </div>

                            <button className="w-full py-2 rounded bg-gray-50 text-gray-600 text-sm font-bold hover:bg-gray-100 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
