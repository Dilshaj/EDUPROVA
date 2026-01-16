import React from "react";
import Image from "next/image";
import { Star, Check } from "lucide-react";

interface BundleContentItemProps {
    title: string;
    description: string;
    rating: number;
    price: number;
    originalPrice: number;
    image: string;
    isPremium?: boolean;
    isSelected?: boolean;
    onToggle?: () => void;
}

export function BundleContentItem({
    title,
    description,
    rating,
    price,
    originalPrice,
    image,
    isPremium = false,
    isSelected = true,
    onToggle,
}: BundleContentItemProps) {
    return (
        <div className={`p-4 rounded-xl border transition-all ${isSelected ? "border-blue-200 bg-blue-50/30" : "border-gray-100 bg-white"}`}>
            <div className="flex gap-4 items-start">
                <div className="pt-2">
                    <button
                        onClick={onToggle}
                        className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-300 hover:bg-gray-200"
                            }`}
                    >
                        {isSelected && <Check size={16} strokeWidth={3} />}
                    </button>
                </div>

                <div className="w-24 h-16 relative shrink-0 rounded-md overflow-hidden bg-gray-100">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1 truncate pr-4">{title}</h3>
                            <p className="text-xs text-gray-500 mb-2 line-clamp-2">{description}</p>
                        </div>
                        {isPremium && (
                            <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-600 uppercase tracking-wide">
                                Premium
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-sm text-gray-900">{rating}</span>
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={12}
                                        fill={i < Math.floor(rating) ? "currentColor" : "none"}
                                        className={i < Math.floor(rating) ? "" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="font-bold text-gray-900">₹{price}</span>
                            <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
