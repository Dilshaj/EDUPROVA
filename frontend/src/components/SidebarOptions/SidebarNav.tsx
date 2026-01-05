import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home as HomeIcon,
    BookOpen,
    User,
    ShoppingCart,
    Settings,
} from "lucide-react";

const navItems = [
    { name: "Home", icon: HomeIcon, path: "/dashboard/home" },
    { name: "Courses", icon: BookOpen, path: "/dashboard/courses" },
    { name: "Cart", icon: ShoppingCart, path: "/dashboard/cart" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const SidebarNav = ({ isCollapsed, pathname }: { isCollapsed: boolean, pathname: string }) => {
    return (
        <nav className={`space-y-1 ${isCollapsed ? 'mb-4' : 'mb-8'}`}>
            {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`flex items-center rounded-xl transition-all duration-500 ease-in-out group relative ${isCollapsed ? 'justify-center py-3' : 'px-4 py-3 gap-4'
                            } ${isActive
                                ? `bg-linear-to-r from-[#0066FF] to-[#E056FD] text-white shadow-lg shadow-blue-200 ${isCollapsed ? 'mx-1' : ''}`
                                : `text-slate-600 hover:bg-linear-to-r from-[#0066ff15] to-[#e156fd11] ${isCollapsed ? 'mx-1' : ''}`
                            }`}
                    >
                        <item.icon
                            size={20}
                            className={`shrink-0 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-500"}`}
                        />

                        {/* Collapsed Tooltip */}
                        {isCollapsed && (
                            <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 z-50">
                                <div className="bg-white border border-slate-100 py-2 px-4 rounded-full shadow-xl shadow-blue-500/10 flex items-center gap-2 whitespace-nowrap">
                                    <div className="w-1 h-3 bg-blue-500 rounded-full" />
                                    <span className="text-slate-700 font-semibold text-[14px]">{item.name}</span>
                                </div>
                                {/* Tooltip Arrow Overlay (optional, but the image shows a clean pill) */}
                            </div>
                        )}

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100'
                            }`}>
                            <span className="font-medium text-[15px] whitespace-nowrap ml-0">
                                {item.name}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </nav>
    );
};

export default SidebarNav;
