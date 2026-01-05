"use client";
import React, {
    useRef
} from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { FaApple, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (contentRef.current) {
            gsap.from(contentRef.current.children, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
                y: 40,
                opacity: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
            });
        }
    }, []);

    return (
        <footer
            ref={footerRef}
            className="bg-[#056AFF] text-white md:mx-20 2xl:mx-10 rounded-none sm:rounded-2xl md:rounded-[32px] md:mb-6"
        >
            <div className="w-full mx-auto px-4 sm:px-6 md:px-10 py-10">

                {/* DESKTOP: LEFT + RIGHT GRID */}
                <div className="hidden lg:grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-10">

                    {/* LEFT BLOCK */}
                    <div className="space-y-5">

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <Image
                                src="/landingPage/TechHub_logo.png"
                                alt="Tech Hub"
                                width={50}
                                height={50}
                                className="w-14 h-14 object-contain"
                            />
                            <span className="text-3xl font-bold">Tech Hub</span>
                        </div>

                        {/* Description */}
                        <p className="text-white/90 text-base leading-relaxed max-w-md">
                            We&apos;re here to support your learning journey every step of the way.
                            Let&apos;s build your future, one lesson at a time.
                        </p>

                        {/* App Buttons */}
                        <div className="flex gap-3">
                            <button
                                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg shadow-md w-fit max-w-[220px] min-w-[160px] self-start"
                            >
                                <FaApple size={20} />
                                <div className="text-left leading-tight">
                                    <div className="text-[10px] text-black/70">Download on</div>
                                    <div className="text-sm font-bold">App Store</div>
                                </div>
                            </button>


                            <button
                                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg shadow-md w-fit max-w-[220px] min-w-[160px] self-start"
                            >
                                <Image
                                    src="/landingPage/playstore.png"
                                    alt="Google Play"
                                    width={20}
                                    height={20}
                                />
                                <div className="text-left leading-tight">
                                    <div className="text-[10px] text-black/70">Get it on</div>
                                    <div className="text-sm font-bold">Google Play</div>
                                </div>
                            </button>

                        </div>

                        {/* Contact */}
                        <div className="space-y-1">
                            <h4 className="font-semibold text-lg">Starting your preparation?</h4>
                            <p className="text-white text-sm max-w-md">
                                Call us and we will answer all your questions about learning on Tech Hub.
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                                <Phone size={18} />
                                <span className="text-base font-semibold">+91 8585858585</span>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMNS */}

                    {/* Company Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-3">Company</h4>
                        <ul className="space-y-2 text-white/90 text-sm">
                            <FooterLink text="About us" />
                            <FooterLink text="Courses" />
                            <FooterLink text="Careers" />
                            <FooterLink text="Blogs" />

                            {/* COMBINED LINE HERE */}
                            <li className="flex gap-4">
                                <Link href="#" className="hover:text-white">Privacy Policy</Link>
                                <Link href="#" className="hover:text-white">Terms & Conditions</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Help Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-3">Help & Support</h4>
                        <ul className="space-y-2 text-white/90 text-sm">
                            <FooterLink text="User Guidelines" />
                            <FooterLink text="Site Map" />
                            <FooterLink text="Refund Policy" />
                            <FooterLink text="Takedown Policy" />
                            <FooterLink text="Grievance Redressal" />
                        </ul>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-3">Products</h4>
                        <ul className="space-y-2 text-white/90 text-sm">

                            <FooterLink text="Learner app" />

                            {/* COMBINED LINE HERE */}
                            <li className="flex gap-4">
                                <Link href="#" className="hover:text-white">Educator app</Link>
                                <Link href="#" className="hover:text-white">Parent app</Link>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* MOBILE LAYOUT */}
                <MobileSection />

                {/* Bottom bar */}
                <div className="border-t-2 border-white mt-10 pt-4 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-white/90 text-sm">© 2025 DR Tech Hub Pvt Ltd</p>

                    <div className="flex gap-3 mt-3 sm:mt-0">
                        <SocialIcon icon={<FaFacebook />} />
                        <SocialIcon icon={<FaTwitter />} />
                        <SocialIcon icon={<FaLinkedin />} />
                    </div>
                </div>

            </div>
        </footer>
    );
};

/* Reusable Components */

const FooterLink = ({ text }: { text: string }) => (
    <li>
        <Link href="#" className="hover:text-white">{text}</Link>
    </li>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
    <Link href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
        <span className="text-[#056AFF] text-xl">{icon}</span>
    </Link>
);

/* MOBILE SECTION (unchanged) */
const MobileSection = () => (
    <div className="grid lg:hidden mt-6">
        {/* Brand Section */}
        <div>
            <div className="flex items-center gap-2">
                <Image src="/landingPage/TechHub_logo.png" width={40} height={40} alt="Tech Hub" />
                <span className="text-xl font-bold">Tech Hub</span>
            </div>

            <p className="text-white/90 text-sm mt-3">
                We&apos;re here to support your learning journey every step of the way.
                Let&apos;s build your future, one lesson at a time.
            </p>

            <div className="flex flex-col gap-2 mt-3">
                <button className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded-lg shadow-md">
                    <FaApple size={18} />
                    <div>
                        <div className="text-[10px] text-black/70">Download on</div>
                        <div className="text-xs font-bold">App Store</div>
                    </div>
                </button>

                <button className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded-lg shadow-md">
                    <Image src="/landingPage/playstore.png" width={18} height={18} alt="Play Store" />
                    <div>
                        <div className="text-[10px] text-black/70">Get it on</div>
                        <div className="text-xs font-bold">Google Play</div>
                    </div>
                </button>
            </div>

            <div className="mt-4">
                <h4 className="font-semibold text-sm">Starting your preparation?</h4>
                <p className="text-white text-sm mt-1">
                    Call us and we will answer all your questions.
                </p>

                <div className="flex items-center gap-2 mt-2">
                    <Phone size={16} />
                    <span className="text-sm font-semibold">+91 8585858585</span>
                </div>
            </div>
        </div>

        {/* 2 Column mobile layout */}
        <div className="grid grid-cols-2 gap-4 mt-6">

            {/* Company + Help */}
            <div>
                <MobileColumn title="Company" items={[
                    "About us", "Courses", "Careers", "Blogs", "Privacy Policy", "Terms & Conditions"
                ]} />

                <MobileColumn title="Help & Support" items={[
                    "User Guidelines", "Site Map", "Refund Policy", "Takedown Policy", "Grievance Redressal"
                ]} />
            </div>

            {/* Products */}
            <MobileColumn title="Products" items={[
                "Learner app", "Educator app", "Parent app"
            ]} />

        </div>
    </div>
);

const MobileColumn = ({ title, items }: { title: string; items: string[] }) => (
    <div className="mb-4">
        <h4 className="font-bold text-sm mb-2">{title}</h4>
        <ul className="space-y-1 text-white/90 text-sm">
            {items.map((it, i) => (
                <li key={i}>
                    <Link href="#" className="hover:text-white">{it}</Link>
                </li>
            ))}
        </ul>
    </div>
);

export default Footer;
