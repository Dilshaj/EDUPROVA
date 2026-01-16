"use client";

import React from "react";
import Link from "next/link";
import { Search, Sparkles, ShoppingCart, GraduationCap } from "lucide-react";
import { CartBundleCard } from "./components/CartBundleCard";
import { BundleContentItem } from "./components/BundleContentItem";
import { OrderSummary } from "./components/OrderSummary";
import { RelatedCourses } from "./components/RelatedCourses";

// Dummy Data
const BUNDLE_DATA = {
    title: "Full-Stack Development Masterclass Bundle",
    authors: ["John Doe", "Jane Smith"],
    description: "A comprehensive bundle to master front-end and back-end technologies, building complete web applications from scratch.",
    rating: 4.8,
    ratingCount: 1250,
    price: 1300,
    originalPrice: 4232,
    image: "/courses/webDevelopment.png", // Using existing placeholder
};

const BUNDLE_CONTENTS = [
    {
        id: 1,
        title: "HTML & CSS Fundamentals",
        description: "Learn the fundamental building blocks of the web with HTML5 and...",
        rating: 4.7,
        price: 899,
        originalPrice: 1999,
        image: "/courses/webDevelopment.png", // Using existing placeholder
        isPremium: true,
    },
    {
        id: 2,
        title: "JavaScript Advanced Concepts",
        description: "Master closures, prototypes, async programming and advanced...",
        rating: 4.9,
        price: 1499,
        originalPrice: 4999,
        image: "/courses/python.png", // Using existing placeholder
        isPremium: true,
    },
    {
        id: 3,
        title: "React for Beginners",
        description: "Build dynamic user interfaces with the React library and modern...",
        rating: 4.6,
        price: 1299,
        originalPrice: 1999,
        image: "/courses/aws.png", // Using existing placeholder
        isPremium: true,
    },
];

export default function CartPage() {
    const totalPrice = 3697;
    const originalPrice = 4797;
    const discount = 1100;

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
                            <Link href="/dashboard/courses" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 text-[#47638d] rounded-full text-[13px] font-bold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap cursor-pointer">
                                <Sparkles className="w-4 h-4 text-[#47638d]" />
                                New & Trending
                            </Link>
                            <Link href="/dashboard/courses" className="px-5 py-2.5 bg-white border border-gray-100 text-[#47638d] rounded-full text-[13px] font-bold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap cursor-pointer">
                                All Courses
                            </Link>
                            <Link href="/dashboard/courses/my-learning" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full text-[13px] font-bold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap cursor-pointer">
                                <GraduationCap className="w-4 h-4 text-gray-700" />
                                My Learning
                            </Link>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#D659FF] to-[#5169FF] text-white rounded-full text-[13px] font-bold shadow-md whitespace-nowrap active:scale-95 transition-all cursor-pointer">
                                <ShoppingCart className="w-4 h-4 text-white" />
                                Cart
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                        <p className="text-gray-500">Review your selected courses and complete checkout to start learning.</p>
                    </div>

                    <div className="lg:flex lg:gap-8">
                        {/* Left Column: Cart Items */}
                        <div className="lg:w-2/3 space-y-6">
                            <CartBundleCard {...BUNDLE_DATA} />

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-gray-400 text-sm uppercase tracking-wide">Bundle Contents</h3>
                                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                                        3/3 Selected
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {BUNDLE_CONTENTS.map((item) => (
                                        <BundleContentItem key={item.id} {...item} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:w-1/3 mt-8 lg:mt-0">
                            <OrderSummary
                                itemCount={3}
                                originalPrice={originalPrice}
                                discount={discount}
                                totalPrice={totalPrice}
                            />
                        </div>
                    </div>

                    <RelatedCourses />
                </div>
            </main>
        </div>
    );
}
