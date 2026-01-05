"use client";
import React from "react";
import HeroSection from "./HeroSection";
import PopularCourses from "./PopularCourses";
import CertificationsSection from "./CertificationsSection";
import PlatformGrowthSection from "./PlatformGrowthSection";
import StoriesSection from "./StoriesSection";
import ReadyToStart from "./ReadytoStart";
import FaqSection from "./FaqSection";
import Footer from "./Footer";

const LandingPage: React.FC = () => {
    return (
        <main className="w-full overflow-x-hidden bg-transparent relative">
            {/* Main Content Wrapper - Sticky Bottom for Parallax Overlay */}
            <div
                className="sticky bottom-0 z-0 bg-white"
                style={{ minHeight: '100vh' }}
            >
                <HeroSection />
                <div className="bg-linear-to-l from-[#e5f0fe] to-white">
                    <PopularCourses />
                    <CertificationsSection />
                    <PlatformGrowthSection />
                    <StoriesSection />
                    <FaqSection />
                </div>
                <ReadyToStart />
            </div>

            {/* Footer - Slides OVER the content */}
            <div
                className="relative z-10 w-full"
            >
                <Footer />
            </div>
        </main>
    );
};

export default LandingPage;
