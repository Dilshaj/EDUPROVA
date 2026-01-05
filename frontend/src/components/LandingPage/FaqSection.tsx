"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "Do I need any prior experience before starting a course?",
        answer: "Our expert-led courses focus on real-world skills with lifetime access and community support. Whether you're a beginner or looking to upskill, we have paths designed for every level."
    },
    {
        question: "Are the certificates you provide recognized or useful for career advancement?",
        answer: "Yes! Our certificates are industry-recognized and demonstrate your proficiency in the subject matter. Many of our students use them to enhance their LinkedIn profiles and resumes."
    },
    {
        question: "How long will I have access to the course materials after enrolling?",
        answer: "You get lifetime access to all course materials, including future updates. Learn at your own pace and revisit the content whenever you need a refresher."
    },
    {
        question: "Can I interact with instructors or get support during the course?",
        answer: "Absolutely. We have a dedicated community and support channels where you can ask questions, interact with instructors, and collaborate with fellow learners."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first one open
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-transparent" ref={containerRef}>
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600 max-w-lg mx-auto">
                        Got questions? We've answered the most common ones to help you get started confidently.
                    </p>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <FAQItemCard
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onClick={() => toggleFAQ(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQItemCard = ({ faq, isOpen, onClick }: { faq: FAQItem; isOpen: boolean; onClick: () => void }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(contentRef.current, {
                height: "auto",
                opacity: 1,
                marginTop: 16,
                duration: 0.4,
                ease: "power2.out",
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                marginTop: 0,
                duration: 0.3,
                ease: "power2.in",
            });
        }
    }, [isOpen]);

    return (
        <div
            className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 border ${isOpen ? "shadow-lg border-blue-100" : "shadow-sm border-transparent hover:shadow-md"
                }`}
            onClick={onClick}
        >
            <div className="flex justify-between items-center gap-4">
                <h3 className={`text-lg font-bold transition-colors ${isOpen ? "text-slate-900" : "text-slate-700"}`}>
                    {faq.question}
                </h3>
                <div
                    ref={arrowRef}
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                >
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>
            <div
                ref={contentRef}
                className="h-0 opacity-0 overflow-hidden text-slate-600 leading-relaxed"
            >
                {faq.answer}
            </div>
        </div>
    );
};

export default FAQSection;