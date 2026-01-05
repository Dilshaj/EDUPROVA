"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Bell, ShoppingCart, ChevronDown, User, LogOut, LayoutDashboard, UserCircle } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
    const [isMobileMoreDropdownOpen, setIsMobileMoreDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { data: session } = useSession();
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const moreDropdownRef = useRef<HTMLDivElement>(null);
    const guestDropdownRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLElement>(null);

    console.log(session);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // GSAP Navbar Animation on Load
    useGSAP(() => {
        if (navbarRef.current) {
            gsap.from(navbarRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });
        }
    }, []);



    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
                setIsMoreDropdownOpen(false);
            }
            if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
                setIsGuestDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu on scroll
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/courses?category=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const getDashboardLink = (role?: string) => {
        switch (role) {
            case "STUDENT":
                return "/dashboard";
            case "TEACHER":
                return "/teacher/dashboard";
            case "MONITOR":
                return "/monitor/dashboard";
            case "ADMIN":
                return "/admin/dashboard";
            default:
                return "/";
        }
    };

    return (
        <>
            <nav
                ref={navbarRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#b0cfff]/20 backdrop-blur-md shadow-sm py-[5px] md:py-[8px]" : "bg-transparent shadow-none"}`}
            >
                <div className="flex items-center justify-between px-4 sm:px-6 py-2 md:px-10 lg:px-20 xl:px-24 mx-auto">
                    {/* Logo */}
                    <Link href="/" className={`flex items-center gap-2 z-50 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}>
                        <div className="relative w-28 h-8 sm:w-32 sm:h-9 md:w-36 md:h-10 flex items-center justify-center">
                            <Image
                                src="/eduprova.png"
                                alt="Eduprova Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {session ? (
                        <div className={`hidden lg:flex items-center gap-6 xl:gap-8 transition-colors text-slate-700`}>
                            {session.user?.role === "ADMIN" ? (
                                <>
                                    <Link href="/admin/dashboard" className="hover:text-blue-400 transition-colors">
                                        Dashboard
                                    </Link>
                                    <Link href="/admin/dashboard/teacher" className="hover:text-blue-400 transition-colors">
                                        Teachers
                                    </Link>
                                    <Link href="/admin/dashboard/monitor" className="hover:text-blue-400 transition-colors">
                                        Monitors
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/courses" className="hover:text-blue-400 transition-colors">
                                        Explore
                                    </Link>
                                    <Link href="/my-courses" className="hover:text-blue-400 transition-colors">
                                        My Courses
                                    </Link>
                                </>
                            )}
                            <div className="relative" ref={moreDropdownRef}>
                                <div
                                    onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                                    className="flex items-center gap-1 cursor-pointer hover:text-blue-400 transition-colors"
                                >
                                    <span>More</span>
                                    <ChevronDown size={16} className={`transition-transform ${isMoreDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {/* More Dropdown Menu */}
                                <div className={`absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-slate-200 transition-all duration-200 origin-top-left ${isMoreDropdownOpen ? "opacity-100 scale-100 visible translate-y-0" : "opacity-0 scale-95 invisible -translate-y-2"}`}>
                                    <Link
                                        href="/about"
                                        className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                                        onClick={() => setIsMoreDropdownOpen(false)}
                                    >
                                        About us
                                    </Link>
                                    <Link
                                        href="/courses"
                                        className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                                        onClick={() => setIsMoreDropdownOpen(false)}
                                    >
                                        All Courses
                                    </Link>
                                    <Link
                                        href="/careers"
                                        className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                                        onClick={() => setIsMoreDropdownOpen(false)}
                                    >
                                        Careers
                                    </Link>
                                    <Link
                                        href="/blogs"
                                        className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                                        onClick={() => setIsMoreDropdownOpen(false)}
                                    >
                                        Blogs
                                    </Link>
                                    <hr className="my-2 border-slate-200" />
                                    <Link
                                        href="/privacy-policy"
                                        className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                                        onClick={() => setIsMoreDropdownOpen(false)}
                                    >
                                        Privacy Policy
                                    </Link>
                                    <Link
                                        href="/terms-and-conditions"
                                        className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                                        onClick={() => setIsMoreDropdownOpen(false)}
                                    >
                                        Terms & Conditions
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`hidden lg:flex items-center gap-5 xl:gap-8 font-medium transition-colors text-slate-700`}>
                            <Link href="/courses" className="hover:text-blue-600 transition-colors">
                                Explore
                            </Link>
                            <Link href="/community" className="hover:text-blue-600 transition-colors">
                                Community Hub
                            </Link>
                            <Link href="/teach" className="hover:text-blue-600 transition-colors">
                                Teach on DR
                            </Link>
                            <div className="relative" ref={moreDropdownRef}>
                                <div
                                    onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                                    className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors"
                                >
                                    <span>More</span>
                                    <ChevronDown size={16} className={`transition-transform ${isMoreDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {/* More Dropdown Menu (Same as logged in for now) */}
                                <div className={`absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-slate-200 transition-all duration-200 origin-top-left ${isMoreDropdownOpen ? "opacity-100 scale-100 visible translate-y-0" : "opacity-0 scale-95 invisible -translate-y-2"}`}>
                                    <Link
                                        href="/about"
                                        className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors font-normal"
                                        onClick={() => setIsMoreDropdownOpen(false)}
                                    >
                                        About us
                                    </Link>
                                    <Link
                                        href="/courses"
                                        className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors font-normal"
                                        onClick={() => setIsMoreDropdownOpen(false)}
                                    >
                                        All Courses
                                    </Link>
                                    <Link
                                        href="/careers"
                                        className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors font-normal"
                                        onClick={() => setIsMoreDropdownOpen(false)}
                                    >
                                        Careers
                                    </Link>
                                    <Link
                                        href="/blogs"
                                        className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors font-normal"
                                        onClick={() => setIsMoreDropdownOpen(false)}
                                    >
                                        Blogs
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Right Actions */}
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                        {/* Search - Hidden on mobile */}
                        <div className={`hidden relative lg:flex items-center rounded-full px-3 md:px-4 py-2 w-64 h-10 lg:w-96 shadow-sm transition-all bg-white border border-slate-200`}>
                            <Search size={18} className="text-slate-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none h-10 ml-2 w-full text-sm text-slate-700 placeholder-slate-400"
                            />
                            {searchQuery.trim() && (
                                <button
                                    onClick={handleSearch}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-1 flex items-center gap-2 rounded-lg text-blue-700 transition-colors shrink-0"
                                >
                                    Search
                                </button>
                            )}
                        </div>

                        {/* Show Login/Signup buttons when not logged in */}
                        {!session ? (
                            <div className="hidden lg:flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="px-5 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-full transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register?mode=register"
                                    className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                                >
                                    Sign up
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Icons - Hidden on small mobile */}
                                <div className={`hidden lg:flex items-center gap-3 md:gap-4 transition-colors text-slate-800`}>
                                    <button className="hover:text-blue-400 transition-colors">
                                        <Bell size={20} className="sm:w-[22px] sm:h-[22px]" />
                                    </button>
                                    <Link href="/cart" className="hover:text-blue-400 transition-colors">
                                        <ShoppingCart size={20} className="sm:w-[22px] sm:h-[22px]" />
                                    </Link>
                                </div>

                                {/* Avatar with Dropdown */}
                                <div className="relative hidden lg:block" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer border-2 border-slate-800 overflow-hidden bg-slate-900 flex items-center justify-center hover:border-blue-500 transition-colors"
                                    >
                                        {session?.user?.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name || "User"}
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User size={18} className="text-white sm:w-5 sm:h-5" />
                                        )}
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-slate-200">
                                            {session?.user?.role !== "ADMIN" && (
                                                <Link
                                                    href={session?.user?.role === "STUDENT" ? "/profile" : session?.user?.role === "TEACHER" ? "/teacher/profile" : "/"}
                                                    className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    <UserCircle size={18} />
                                                    <span>Profile</span>
                                                </Link>
                                            )}
                                            <Link
                                                href={getDashboardLink(session?.user?.role)}
                                                className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <LayoutDashboard size={18} />
                                                <span>Dashboard</span>
                                            </Link>
                                            <hr className="my-2 border-slate-200" />
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                            >
                                                <LogOut size={18} />
                                                <span>Log Out</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Hamburger Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden z-50 p-2 rounded-xl transition-all duration-300 ${isMobileMenuOpen
                                ? "text-blue-500"
                                : "text-slate-800 hover:bg-white/20"
                                }`}
                            aria-label="Toggle menu"
                        >
                            <div className={`relative w-8 h-8 flex items-center ${isMobileMenuOpen ? " justify-center" : " justify-end"}`}>
                                {/* Line 1 */}
                                <span
                                    className={`absolute block h-[2.5px] rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen
                                        ? "translate-y-[px] rotate-45 w-7 bg-blue-500"
                                        : "-translate-y-1.5 w-10"
                                        }`}
                                ></span>

                                {/* Line 2 */}
                                <span
                                    className={`absolute block h-[2.5px] w-6 rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen
                                        ? "-translate-y-[px] -rotate-45  w-7 bg-blue-500"
                                        : "translate-y-1.5"
                                        }`}
                                ></span>
                            </div>
                        </button>


                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Menu Panel */}
                <div
                    className={`absolute top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex flex-col h-full pt-20 px-6 pb-6">
                        {/* Search Bar */}
                        <div className="mb-6">
                            <div className="flex items-center rounded-full px-4 py-2.5 bg-slate-100 shadow-sm">
                                <Search size={18} className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="bg-transparent border-none outline-none ml-2 w-full text-sm text-slate-700 placeholder-slate-400"
                                />
                            </div>
                        </div>

                        {/* Show Login/Signup for mobile when not logged in */}
                        {!session ? (
                            <div className="flex flex-col gap-3 mt-auto">
                                <Link
                                    href="/register?mode=login"
                                    className="px-6 py-3 text-center text-slate-700 border-2 border-slate-300 hover:bg-slate-100 rounded-lg font-semibold transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register?mode=signup"
                                    className="px-6 py-3 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Navigation Links */}
                                <div className="flex flex-col gap-2 mb-6">
                                    {session?.user?.role === "ADMIN" ? (
                                        <>
                                            <Link
                                                href="/admin/dashboard"
                                                className="px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/admin/dashboard/teacher"
                                                className="px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Teachers
                                            </Link>
                                            <Link
                                                href="/admin/dashboard/monitor"
                                                className="px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Monitors
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/explore"
                                                className="px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Explore
                                            </Link>
                                            <Link
                                                href="/my-courses"
                                                className="px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                My Courses
                                            </Link>
                                        </>
                                    )}
                                    <div>
                                        <button
                                            onClick={() => setIsMobileMoreDropdownOpen(!isMobileMoreDropdownOpen)}
                                            className="w-full px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium text-left flex items-center justify-between"
                                        >
                                            <span>More</span>
                                            <ChevronDown size={16} className={`transition-transform ${isMobileMoreDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* More Dropdown Links */}
                                        <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isMobileMoreDropdownOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                            <div className="overflow-hidden">
                                                <div className="mt-1 ml-4 flex flex-col gap-1">
                                                    <Link
                                                        href="/about"
                                                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        About us
                                                    </Link>
                                                    <Link
                                                        href="/courses"
                                                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        All Courses
                                                    </Link>
                                                    <Link
                                                        href="/careers"
                                                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        Careers
                                                    </Link>
                                                    <Link
                                                        href="/blogs"
                                                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        Blogs
                                                    </Link>
                                                    <hr className="my-1 border-slate-200" />
                                                    <Link
                                                        href="/privacy-policy"
                                                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        Privacy Policy
                                                    </Link>
                                                    <Link
                                                        href="/terms-and-conditions"
                                                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        Terms & Conditions
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Icons Section */}
                                <div className="flex items-center gap-4 mb-6 px-4">
                                    <button className="text-slate-700 hover:text-blue-600 transition-colors">
                                        <Bell size={22} />
                                    </button>
                                    <Link href="/cart" className="text-slate-700 hover:text-blue-600 transition-colors">
                                        <ShoppingCart size={22} />
                                    </Link>
                                </div>

                                {/* User Section */}
                                <div className="mt-auto border-t border-slate-200 pt-4">
                                    <Link
                                        href={session?.user?.role === "STUDENT" ? "/profile" : session?.user?.role === "TEACHER" ? "/teacher/profile" : "/admin/profile"}
                                        className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                                            {session?.user?.image ? (
                                                <Image
                                                    src={session.user.image}
                                                    alt={session.user.name || "User"}
                                                    width={40}
                                                    height={40}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <User size={20} className="text-white" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">{session?.user?.name || "Guest"}</p>
                                            <p className="text-xs text-slate-500">View Profile</p>
                                        </div>
                                    </Link>
                                    <Link
                                        href={getDashboardLink(session?.user?.role)}
                                        className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors mt-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <LayoutDashboard size={18} />
                                        <span>Dashboard</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left mt-2"
                                    >
                                        <LogOut size={18} />
                                        <span>Log Out</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
