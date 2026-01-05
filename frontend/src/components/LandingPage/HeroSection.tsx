"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const HeroSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(2); // Start with center card (index 2)
    const [isMobile, setIsMobile] = useState(false);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const cardStackRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 5); // Cycle through 0-4
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Track screen size for responsive card spread
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // GSAP Entrance Animations
    useGSAP(() => {
        const tl = gsap.timeline();

        if (badgeRef.current) {
            tl.from(badgeRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });
        }

        if (headlineRef.current) {
            tl.from(headlineRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.4");
        }

        if (subtitleRef.current) {
            tl.from(subtitleRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.6");
        }

        if (buttonRef.current) {
            tl.from(buttonRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
            }, "-=0.4");
        }

        if (cardsRef.current.length > 0) {
            tl.from(cardsRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
            }, "-=0.2");
        }

        // Button pulsing animation (starts after entrance)
        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                y: -10,
                scale: 1.05,
                duration: 1.5,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                delay: 2, // Wait for entrance to finish
            });
        }
    }, { scope: cardStackRef }); // Pass the ref object itself; GSAP will read current when safe.


    // Card data for easier management
    const cards = [
        { id: 1, label: "Image 1", video: "/video1.mp4" },
        { id: 2, label: "Image 2", video: "/video2.mp4" },
        { id: 3, label: "Main Image", video: "/video3.mp4" },
        { id: 4, label: "Image 4", video: "/video4.mp4" },
        { id: 5, label: "Image 5", video: "/video-5.mp4" },
    ];

    // Calculate position and rotation for each card based on activeIndex
    const getCardStyle = (index: number) => {
        const diff = index - activeIndex;

        // Dynamic spread values based on screen size
        // Mobile: tighter spread (15% / 30%)
        // Desktop: wider spread (30% / 60%)
        const innerSpread = isMobile ? "15%" : "30%";
        const outerSpread = isMobile ? "30%" : "60%";

        // Center card
        if (diff === 0) {
            return {
                transform: "translateX(0) rotate(0deg) scale(1)",
                zIndex: 30,
                opacity: 1,
                top: "0px",
            };
        }

        // Inner Left
        if (diff === -1 || diff === 4) {
            return {
                transform: `translateX(-${innerSpread}) rotate(-8deg) scale(0.85)`,
                zIndex: 20,
                opacity: 1,
                top: "15px",
            };
        }

        // Outer Left
        if (diff === -2 || diff === 3) {
            return {
                transform: `translateX(-${outerSpread}) rotate(-15deg) scale(0.7)`,
                zIndex: 10,
                opacity: 0.9,
                top: "30px",
            };
        }

        // Inner Right
        if (diff === 1 || diff === -4) {
            return {
                transform: `translateX(${innerSpread}) rotate(8deg) scale(0.85)`,
                zIndex: 20,
                opacity: 1,
                top: "15px",
            };
        }

        // Outer Right
        if (diff === 2 || diff === -3) {
            return {
                transform: `translateX(${outerSpread}) rotate(15deg) scale(0.7)`,
                zIndex: 10,
                opacity: 0.9,
                top: "30px",
            };
        }

        return {
            transform: "scale(0)",
            zIndex: 0,
            opacity: 0,
            top: "0px",
        };
    };

    return (
        <section className="relative w-full min-h-screen bg-[radial-gradient(100%_100%_at_50%_0%,#b0cfff_0%,white_100%)] text-slate-800 overflow-hidden font-sans pt-20 md:pt-24">
            {/* Hero Content */}
            <div className="flex flex-col items-center justify-center pt-10 pb-16 md:pt-16 md:pb-28 px-4 text-center relative z-10">

                {/* Badge */}
                <div ref={badgeRef} className="bg-transparent border border-slate-600/30 rounded-full pl-1.5 pr-4 py-1.5 sm:pl-2 sm:pr-6 sm:py-2 flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 shadow-sm">
                    <div className="flex -space-x-2 sm:-space-x-3">
                        <Image
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=faces"
                            alt="Student 1"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
                            width={40}
                            height={40}
                        />
                        <Image
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=faces"
                            alt="Student 2"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
                            width={40}
                            height={40}
                        />
                        <Image
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=faces"
                            alt="Student 2"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
                            width={40}
                            height={40}
                        />
                        <Image
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces"
                            alt="Student 3"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
                            width={40}
                            height={40}
                        />
                        <Image
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&h=128&fit=crop&crop=faces"
                            alt="Student 4"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
                            width={40}
                            height={40}
                        />
                    </div>
                    <span className="text-slate-800 font-medium text-xs sm:text-sm">More Than 5k+ New Students</span>
                </div>

                {/* Headline */}
                <h1 ref={headlineRef} className="text-4xl sm:text-6xl lg:text-[90px] font-semibold text-black mb-4 leading-[1.1] tracking-tight drop-shadow-sm">
                    Learn New <span className="font-bold">Skills</span><br />
                    <span className="font-bold">Achieve</span> Your Dreams
                </h1>

                {/* Subtitle */}
                <p ref={subtitleRef} className="text-slate-800 text-sm sm:text-base md:text-lg max-w-3xl mb-8 sm:mb-10 leading-relaxed font-medium px-2">
                    Explore thousands of online courses from expert instructions. Learn at your own Place, gain new skills, and take your career or hobby to the next level
                </p>

                {/* CTA Button with GSAP Animation */}
                <Link
                    ref={buttonRef}
                    href="/courses"
                    className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-[#0066FF] hover:bg-blue-600 text-white rounded-full font-semibold text-base sm:text-lg transition-colors shadow-lg shadow-blue-500/30 min-w-[160px] sm:min-w-[200px]"
                >
                    Explore Courses
                </Link>
            </div>

            {/* Card Stack Visual - Auto Slider */}
            <div ref={cardStackRef} className="relative w-full max-w-6xl mx-auto h-[220px] sm:h-[350px] md:h-[400px] mt-[-20px] sm:mt-[-30px] md:mt-[-60px] flex justify-center items-center">
                {cards.map((card, index) => {
                    const style = getCardStyle(index);
                    return (
                        <div
                            key={card.id}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className="absolute w-[260px] h-[160px] sm:w-[400px] sm:h-[260px] md:w-[500px] md:h-[320px] bg-[#CBE0FF] rounded-2xl shadow-2xl overflow-hidden border border-white/10 transition-all duration-700 ease-in-out"
                            style={{
                                transform: style.transform,
                                zIndex: style.zIndex,
                                opacity: style.opacity,
                                top: style.top,
                            }}
                        >
                            <video
                                src={card.video}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                    );
                })}
            </div>

            {/* Slider Indicators */}
            <div className="flex justify-center gap-2 mt-8 pb-8">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                            ? "bg-white w-8"
                            : "bg-white/40 hover:bg-white/60"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
