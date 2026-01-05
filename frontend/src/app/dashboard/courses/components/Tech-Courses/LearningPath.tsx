import React from 'react';
import Image from 'next/image';
import { Star, Plus, CheckCircle, Crown } from 'lucide-react';

const BUNDLE_DATA = [
    {
        id: 1,
        title: "The Ultimate React Course 2025: React, Next.js, Redux & More",
        instructor: "Jonas Schmedtmann",
        rating: 4.7,
        ratingCount: "24,118",
        price: "₹399",
        originalPrice: "₹799",
        image: "/courses/react.png", // Placeholder
        bestseller: true,
        premium: true
    },
    {
        id: 2,
        title: "The Complete JavaScript Course 2025: From Zero to Expert!",
        instructor: "Jonas Schmedtmann",
        rating: 4.7,
        ratingCount: "229,205",
        price: "₹399",
        originalPrice: "₹3,459",
        image: "/courses/js.png", // Placeholder
        bestseller: true,
        premium: true
    },
    {
        id: 3,
        title: "Build Responsive Real-World Websites with HTML and CSS",
        instructor: "Jonas Schmedtmann",
        rating: 4.7,
        ratingCount: "116,282",
        price: "₹459",
        originalPrice: "₹4,139",
        image: "/courses/htmlcss.png", // Placeholder
        bestseller: true,
        premium: true
    }
];

const LearningPath = () => {
    return (
        <div className="border border-gray-200 p-6 mt-8 bg-white">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Complete Front-End Developer Learning Path</h3>

            <div className="relative">
                {BUNDLE_DATA.map((course, index) => (
                    <React.Fragment key={course.id}>
                        <div className="flex gap-4 relative z-10">
                            {/* Image */}
                            <div className="relative w-32 h-20 sm:w-48 sm:h-28 shrink-0 rounded-md overflow-hidden border border-gray-200">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                                {/* Instructor Overlay (Small circle) - Optional based on design, image shows it */}
                                <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                                    <Image src="/courses/jonas.jpg" alt="Instructor" width={32} height={32} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight mb-1">
                                    {course.title}
                                </h4>
                                <p className="text-xs text-gray-600 mb-1">{course.instructor}</p>

                                <div className="flex items-center gap-1 mb-2">
                                    <span className="font-bold text-sm text-[#b4690e]">{course.rating}</span>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} size={12} fill="#b4690e" className="text-[#b4690e]" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500">({course.ratingCount})</span>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {course.premium && (
                                        <span className="bg-gradient-to-r from-pink-600 to-blue-600 text-white font-semibold text-[10px] px-1 py-[2px] flex items-center gap-0.5 rounded">
                                            <Crown size={8} className="fill-white" />
                                            Premium
                                        </span>
                                    )}

                                    {course.bestseller && (
                                        <span className="bg-green-100 text-green-700 font-medium text-[10px] px-2 py-[2px] rounded-full border border-green-200 shadow-sm">
                                            Bestseller
                                        </span>
                                    )}
                                </div>

                            </div>

                            {/* Price */}
                            <div className="text-right shrink-0">
                                <div className="font-bold text-gray-900 text-base">{course.price}</div>
                                <div className="text-xs text-gray-500 line-through">{course.originalPrice}</div>
                            </div>
                        </div>

                        {/* Plus Button (between items) */}
                        {index < BUNDLE_DATA.length - 1 && (
                            <div className="relative h-12 flex items-center justify-center my-[-10px] z-20">
                                <div className="w-10 h-10 bg-blue-500 rounded-full shadow-md border border-gray-200 flex items-center justify-center relative z-20 -translate-x-60">
                                    <Plus className="w-6 h-6 text-white " />
                                </div>
                                {/* Connecting Line (Optional, image doesn't show a clear line but usually these have one) */}
                                {/* <div className="absolute top-0 bottom-0 w-px bg-gray-200 left-[6rem] -z-10"></div> */}
                            </div>
                        )}

                        {/* Spacer if it's the last item to add some gap before total */}
                        {index === BUNDLE_DATA.length - 1 && <div className="mb-6"></div>}
                    </React.Fragment>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-4">
                <div className="flex items-baseline gap-2 mb-4 sm:mb-0">
                    <span className="text-lg text-gray-600">Total:</span>
                    <span className="text-2xl font-bold text-gray-900">₹1,257</span>
                    <span className="text-lg text-gray-400 line-through">₹8,397</span>
                </div>

                <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-sm transition-colors">
                    Add all to cart
                </button>
            </div>
        </div>
    );
};

export default LearningPath;
