import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home as HomeIcon,
    BookOpen,
    User,
    ShoppingCart,
    Settings,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navItems = [
    { name: "Home", icon: HomeIcon, path: "/dashboard/home" },
    { name: "Courses", icon: BookOpen, path: "/dashboard/courses" },
    { name: "Cart", icon: ShoppingCart, path: "/dashboard/cart" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const SidebarNav = ({ isCollapsed, pathname, onHover }: {
    isCollapsed: boolean,
    pathname: string,
    onHover?: (name: string | null, event?: React.MouseEvent) => void
}) => {
    const activeDesignRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isCollapsed && activeDesignRef.current) {
            gsap.fromTo(activeDesignRef.current, {
                x: 100,
                opacity: 0,
            }, {
                duration: 0.3,
                x: 0,
                opacity: 1,
                delay: 0.5,
                ease: 'power2.out',
                clearProps: "all"
            })
        }
    }, [isCollapsed]);

    return (
        <nav className={`space-y-2 ${isCollapsed ? 'mb-4 flex flex-col items-center' : 'mb-8'}`}>
            {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                    <div
                        key={item.name}
                        className={`relative group w-full ${isCollapsed ? 'flex flex-col items-center justify-center h-16' : ''}`}
                        onMouseEnter={(e) => onHover?.(item.name, e)}
                        onMouseLeave={() => onHover?.(null)}
                    >
                        <Link
                            href={item.path}
                            className={`flex z-50 items-center transition-all duration-300 group relative ${isCollapsed ? `w-10 h-10 justify-center rounded-xl ${isActive ? 'ml-3' : ''}` : 'px-4 py-3 gap-4 rounded-xl mx-0'
                                } ${isActive
                                    ? 'bg-linear-to-r from-[#0066FF] to-[#E056FD] text-white shadow-lg shadow-blue-200'
                                    : `text-slate-600 hover:bg-white/50 hover:text-slate-900 font-medium`
                                }`}
                        >
                            <item.icon
                                size={20}
                                className={`shrink-0 z-50 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500"}`}
                            />

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100'
                                }`}>
                                <span className="font-medium text-[15px] whitespace-nowrap ml-0">
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                        {isActive && isCollapsed && <div ref={activeDesignRef} className="absolute w-20 h-16 ml-6 rounded-3xl bg-[#F3F8FF] z-0">
                            <div className="relative w-12 bg-transparent h-full ">
                                <div className="absolute w-11 h-5 -translate-y-5 left-7 rounded-br-2xl bg-[#ffffff] z-10" />
                                <div className="absolute w-11 h-5 translate-y-16 left-7 rounded-tr-2xl bg-[#ffffff] z-10" />
                                <div className="absolute w-10 -translate-y-4 left-7 h-5 bg-[#F3F8FF] z-5" />
                                <div className="absolute w-10 h-5 translate-y-15 left-7 bg-[#F3F8FF] z-5" />
                            </div>
                        </div>}
                    </div>
                );
            })}
        </nav>
    );
};

export default SidebarNav;
