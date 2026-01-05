"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CertificationsSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const certRefs = useRef<HTMLDivElement[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const timelineItems = [
        {
            title: "Course Certificate",
            description: "Validates your learning and course completion.",
        },
        {
            title: "Project Certificate",
            description: "Shows your practical and hands-on expertise.",
        },
        {
            title: "Research Certificate",
            description: "Demonstrates your ability to research and analyze.",
        },
    ];

    // AUTO CAROUSEL (Every 4 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 3);
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    // ACTIVE CERTIFICATE GSAP ANIMATION
    useGSAP(() => {
        certRefs.current.forEach((box, i) => {
            if (i === activeIndex) {
                gsap.to(box, {
                    scale: 1,
                    rotation: 0,
                    zIndex: 50,
                    filter: "blur(0px)",
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                });
            } else {
                let rotation = 0;
                if (i === 0) rotation = -18;
                else if (i === 2) rotation = 18;
                else if (i === 1) {
                    // If 1 is inactive, move it to the side opposite to the active one
                    rotation = activeIndex === 0 ? -18 : 18;
                }

                gsap.to(box, {
                    scale: 0.9,
                    rotation: rotation,
                    zIndex: i + 1,
                    filter: "blur(4px)",
                    opacity: 0.6,
                    duration: 0.8,
                    ease: "power3.out",
                });
            }
        });
    }, [activeIndex]);

    // SCROLL REVEAL ANIMATION
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
        });

        tl.from(".cert-image-wrapper", {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        })
            .from(
                ".cert-content",
                {
                    x: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                },
                "-=0.6"
            )
            .from(
                ".timeline-item",
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.2,
                    ease: "power2.out",
                },
                "-=0.4"
            );
    });

    return (
        <section ref={containerRef} className="py-16 md:py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* LEFT COLUMN — CERTIFICATES */}
                    <div className="w-full lg:w-1/2 cert-image-wrapper relative flex justify-center lg:justify-end pr-0 lg:pr-24">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-60 -z-10" />

                        {/* STACK */}
                        <div className="relative w-[280px] h-[200px] sm:w-[340px] sm:h-[240px] md:w-[460px] md:h-[350px] ">

                            {/* Certificate 0 */}
                            <div
                                ref={(el) => { if (el) certRefs.current[0] = el; }}
                                className="absolute inset-0 rotate-[-18deg] z-1"
                            >
                                <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 ${activeIndex === 0 ? 'border-2 border-white' : 'border-2 border-transparent'}`}>
                                    <Image
                                        src="/certificate5.jpg"
                                        alt="Certificate 0"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Certificate 1 */}
                            <div
                                ref={(el) => { if (el) certRefs.current[1] = el; }}
                                className="absolute inset-0 rotate-0 z-2"
                            >
                                <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 ${activeIndex === 1 ? 'border-2 border-white' : 'border-2 border-transparent'}`}>
                                    <Image
                                        src="/certificate4.jpg"
                                        alt="Certificate 1"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Certificate 2 */}
                            <div
                                ref={(el) => { if (el) certRefs.current[2] = el; }}
                                className="absolute inset-0 rotate-18 z-3"
                            >
                                <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${activeIndex === 2 ? 'border-2 border-white' : 'border-2 border-transparent'}`}>
                                    <Image
                                        src="/certificate3.jpg"
                                        alt="Certificate 2"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN – CONTENT */}
                    <div className="w-full lg:w-1/2 cert-content flex flex-col">
                        <div className="flex flex-col items-center lg:text-end mb-8 md:mb-12 mr-22">
                            <h2 className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-slate-900 mb-4 md:mb-6">
                                Learn Skills, Earn Certificates
                            </h2>
                            <p className="text-slate-600 text-sm sm:text-md leading-relaxed mx-auto">
                                Every completed course comes with a recognized certificate to validate your skills,
                                strengthen your professional profile, and support your career growth.
                            </p>
                        </div>

                        {/* TIMELINE */}
                        <div className="relative ml-6 lg:ml-auto mr-0 lg:mr-25 space-y-10 md:space-y-14 text-left lg:text-right">
                            {timelineItems.map((item, index) => (
                                <div key={index} className="timeline-item relative pl-8 lg:pl-0 pr-0 lg:pr-12">
                                    {index > 0 && <div className="absolute left-0 lg:left-auto lg:right-0 -top-12 md:-top-16 bottom-1/2 w-px bg-blue-300" />}
                                    {index < 2 && <div className="absolute left-0 lg:left-auto lg:right-0 top-1/2 bottom-0 w-px bg-blue-300" />}

                                    {/* Active Dot */}
                                    <div
                                        onClick={() => setActiveIndex(index)}
                                        className="absolute -left-[20px] lg:left-auto lg:-right-[20px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-[#FFFFFF] lg:bg-[#E7F1FE] flex items-center justify-center z-10 cursor-pointer"
                                    >
                                        <div
                                            className={`w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all duration-500 
                                            ${activeIndex === index
                                                    ? "ring-2 ring-blue-500 bg-blue-100"
                                                    : "ring-1 ring-blue-300 bg-blue-50"
                                                }`}
                                        >
                                            <div
                                                className={`w-3 h-3 rounded-full transition-all duration-500
                                                ${activeIndex === index ? "bg-blue-600" : "bg-blue-300"}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Active Title */}
                                    <h3
                                        onClick={() => setActiveIndex(index)}
                                        className={`text-xl font-bold mb-2 transition-all duration-500 cursor-pointer
                                        ${activeIndex === index ? "text-blue-600" : "text-slate-900"}`}
                                    >
                                        {item.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificationsSection;
