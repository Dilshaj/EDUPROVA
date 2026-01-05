import React from "react";
import Image from "next/image";
import { Heart, Share2, Trash2, Star } from "lucide-react";

interface CartBundleCardProps {
    title: string;
    authors: string[];
    description: string;
    rating: number;
    ratingCount: number;
    price: number;
    originalPrice: number;
    image: string;
}

export function CartBundleCard({
    title,
    authors,
    description,
    rating,
    ratingCount,
    price,
    originalPrice,
    image,
}: CartBundleCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6">
            <div className="relative w-full sm:w-48 h-48 shrink-0 rounded-lg overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                        <p className="text-sm text-gray-500 mb-3">
                            By{" "}
                            {authors.map((author, index) => (
                                <span key={index}>
                                    <span className="text-blue-600 font-medium">{author}</span>
                                    {index < authors.length - 1 && ", "}
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className="flex gap-3 text-gray-400">
                        <button className="hover:text-red-500 transition-colors">
                            <Heart size={20} />
                        </button>
                        <button className="hover:text-blue-600 transition-colors">
                            <Share2 size={20} />
                        </button>
                        <button className="hover:text-gray-600 transition-colors">
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {description}
                </p>

                <div className="flex items-end justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{rating}</span>
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    fill={i < Math.floor(rating) ? "currentColor" : "none"}
                                    className={i < Math.floor(rating) ? "" : "text-gray-300"}
                                />
                            ))}
                        </div>
                        <span className="text-gray-400 text-sm">({ratingCount.toLocaleString('en-IN')})</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900">₹{price}</span>
                        <span className="text-gray-400 line-through text-lg">₹{originalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
