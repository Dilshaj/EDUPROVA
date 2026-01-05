"use client";

import React from "react";
import { FileText, Users, Briefcase } from "lucide-react";

const PlatformGrowthSection: React.FC = () => {
    const features = [
        {
            icon: <FileText className="w-6 h-6 text-blue-600" />,
            title: "Post & Share",
            description: "Share your learning journey with images, videos, posts, and updates.",
        },
        {
            icon: <Users className="w-6 h-6 text-blue-600" />,
            title: "Connect & Network",
            description: "Engage with peers, mentors, and industry experts in a vibrant community.",
        },
        {
            icon: <Briefcase className="w-6 h-6 text-blue-600" />,
            title: "Find Opportunities",
            description: "Discover job postings, freelance gigs, and collaboration projects.",
        },
    ];

    return (
        <section className="py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-10 md:mb-16 lg:mb-24 px-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-slate-900 mb-3 md:mb-4">
                        More Than Just Courses — A Platform to Grow
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Connect with learners, share your work, explore opportunities,
                        and build your career — all in one place
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 justify-center w-full px-6 xl:pr-15 2xl:pr-35">

                    {/* LEFT COLUMN - ILLUSTRATION */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center lg:justify-end relative pl-7 md:pl-0 mx-auto">
                        {/* Illustration Container */}
                        <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] h-[220px] sm:h-[280px] md:h-[400px]">

                            {/* Monitor */}
                            <div className="absolute top-0 left-0 w-[85%] h-[80%] border-4 border-black rounded-2xl bg-white z-10 flex items-center justify-center">
                                {/* Screen Content Placeholder */}
                                <div className="w-full h-full bg-white rounded-xl" />
                            </div>
                            {/* Monitor Stand */}
                            <div className="absolute top-[80%] left-[42.5%] -translate-x-1/2 w-[20%] h-[10%] bg-black rounded-b-lg z-0" />
                            <div className="absolute top-[90%] left-[42.5%] -translate-x-1/2 w-[30%] h-[2%] bg-black rounded-full z-0" />

                            {/* Phone */}
                            <div className="absolute bottom-0 right-[10%] w-[25%] h-[60%] border-4 border-black rounded-3xl bg-white z-20 shadow-xl flex items-center justify-center">
                                {/* Phone Screen Content Placeholder */}
                                <div className="w-full h-full bg-white rounded-[20px]" />
                            </div>

                            {/* Blue Outline Box (Decoration) */}
                            <div className="absolute inset-0 border-2 border-blue-400 rounded-xl -z-10 translate-x-4 translate-y-4 hidden md:block" />
                        </div>
                    </div>

                    {/* RIGHT COLUMN - CONTENT */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="mb-8 md:mb-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                            <div className="space-y-2 text-center md:text-left w-full md:w-auto">
                                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                    Unlock Your Full Potential
                                </h3>
                                <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto md:mx-0">
                                    Discover a new way of learning where community and collaboration are at the core of everything we do
                                </p>
                            </div>
                            <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg text-sm md:text-base hover:bg-blue-700 transition-colors whitespace-nowrap shadow-md shadow-blue-200">
                                Join Community
                            </button>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col items-center text-center group"
                                >
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                                        {feature.title}
                                    </h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformGrowthSection;
