
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const stories = [
    {
        id: 1,
        name: "Sooraj Jenkins",
        role: "Frontend Developer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        video: "/video1.mp4",
    },
    {
        id: 2,
        name: "harsha Vardhan",
        role: "Data Scientist",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        video: "/video2.mp4",
    },
    {
        id: 3,
        name: "Surya Teja Sanku",
        role: "UI/UX Designer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
        video: "/video3.mp4",
    },
    {
        id: 4,
        name: "Rahul",
        role: "Product Manager",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
        video: "/video4.mp4",
    },
    {
        id: 5,
        name: "Bharath Kunkipudi",
        role: "Full Stack Dev",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
        video: "/video-5.mp4",
    },
    {
        id: 6,
        name: "Ganesh babu",
        role: "Cloud Engineer",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        video: "/video1.mp4",
    },
    {
        id: 7,
        name: "James Wilson",
        role: "DevOps Engineer",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop",
        video: "/video2.mp4",
    },
];

const StoriesSection = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [isPausedByHover, setIsPausedByHover] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const timerRef = useRef<number | null>(null);

    const startTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % stories.length);
        }, 5000);
    };

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    // Initial autoplay
    useEffect(() => {
        startTimer();
        return () => clearTimer();
    }, []);

    // Handle auto-rotation
    useEffect(() => {
        if (!isPausedByHover) {
            startTimer();
        }
        return () => clearTimer();
    }, [activeIndex, isPausedByHover]);

    // Handle video playback
    useEffect(() => {
        stories.forEach((_, i) => {
            const videoEl = videoRefs.current[i];
            if (!videoEl) return;

            const shouldPlay = hoverIndex !== null ? hoverIndex === i : activeIndex === i;

            if (shouldPlay) {
                videoEl.muted = true; // Always muted
                videoEl.play().catch(() => { });
            } else {
                videoEl.pause();
                videoEl.currentTime = 0;
            }
        });
    }, [activeIndex, hoverIndex]);

    // GSAP Animation
    useGSAP(() => {
        stories.forEach((_, idx) => {
            const card = cardRefs.current[idx];
            const isHovered = hoverIndex === idx;
            const isActive = activeIndex === idx;
            const isExpanded = hoverIndex !== null ? isHovered : isActive;

            if (card) {
                gsap.to(card, {
                    flexGrow: isExpanded ? 3.5 : 1,
                    height: isExpanded ? "100%" : "100%",
                    opacity: isExpanded ? 1 : 0.7,
                    duration: 0.5,
                    ease: "power2.out",
                });

                // Animate video scale
                const video = card.querySelector("video");
                if (video) {
                    gsap.to(video, {
                        scale: isExpanded ? 1.5 : 1,
                        duration: 0.7,
                        ease: "power2.out",
                    });
                }

                // Animate content opacity
                const content = card.querySelector(".story-content");
                const playIcon = card.querySelector(".play-icon-overlay");

                if (content) {
                    gsap.to(content, {
                        opacity: isExpanded ? 1 : 0,
                        duration: 0.3,
                        delay: isExpanded ? 0.1 : 0,
                    });
                }

                if (playIcon) {
                    gsap.to(playIcon, {
                        opacity: isExpanded ? 0 : 1,
                        duration: 0.3,
                    });
                }
            }
        });
    }, [activeIndex, hoverIndex]);

    const handleInteractionStart = (idx: number) => {
        setHoverIndex(idx);
        setIsPausedByHover(true);
        clearTimer();
    };

    const handleInteractionEnd = () => {
        if(window.innerWidth < 1268){
            return;
        }
        setHoverIndex(null);
        setIsPausedByHover(false);
        startTimer();
    };

    return (
        <section className="w-full py-20 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight inline-block relative">
                    Stories from Our Successful Learners
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
                    See how everyday learners became professionals with guidance, effort,
                    and expert-led learning.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4" ref={containerRef}>
                {/* Mobile: Horizontal Scroll, Desktop: Flex */}
                <div className="flex gap-4 h-[400px] md:h-[400px] overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none items-center">
                    {stories.map((story, idx) => {
                        return (
                            <div
                                key={story.id}
                                ref={(el) => { cardRefs.current[idx] = el; }}
                                onMouseEnter={() => handleInteractionStart(idx)}
                                onMouseLeave={handleInteractionEnd}
                                onClick={() => handleInteractionStart(idx)} // For mobile tap
                                className={`
                  relative rounded-xl md:rounded-3xl overflow-hidden cursor-pointer
                  min-w-[280px] md:min-w-0 snap-center
                `}
                                // Initial styles, GSAP takes over
                                style={{
                                    flexGrow: 1,
                                    flexShrink: 1,
                                    flexBasis: "0%",
                                    height: "70%",
                                    opacity: 0.7,
                                }}
                            >
                                <div className="w-full h-full relative rounded-2xl">
                                    <video
                                        ref={(el) => { videoRefs.current[idx] = el; }}
                                        src={story.video}
                                        poster={story.image}
                                        className="w-full h-full object-cover"
                                        playsInline
                                        muted={true} // Controlled by effect
                                        loop
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                                    {/* Content */}
                                    <div className="story-content absolute bottom-0 left-0 w-full p-6 text-left text-white opacity-0">
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold truncate">{story.name}</h3>
                                                <p className="text-sm text-gray-300">{story.role}</p>
                                            </div>
                                            <button className="bg-white text-black rounded-full p-3 hover:scale-110 transition-transform duration-300 shrink-0 ml-2">
                                                <Play size={20} fill="currentColor" className="ml-0.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Play Icon for collapsed state */}
                                    <div className="play-icon-overlay absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                                            <Play size={24} fill="white" className="text-white ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StoriesSection;