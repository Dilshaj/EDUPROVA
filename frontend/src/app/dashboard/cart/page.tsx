"use client";

import React from "react";
import Link from "next/link";
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
        <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 w-full">

            <div className="w-full px-4 sm:px-10 py-8">
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
        </div>
    );
}
