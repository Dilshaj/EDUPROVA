"use client";

import React, { useRef } from "react";
import SidebarHeader from "../../../components/SidebarOptions/SidebarHeader";
import ProfileSection from "../../../components/SidebarOptions/ProfileSection";
import SidebarNav from "../../../components/SidebarOptions/SidebarNav";
import CommunitySection from "../../../components/SidebarOptions/CommunitySection";
import AiToolsSection from "../../../components/SidebarOptions/AiToolsSection";
import LogoutButton from "../../../components/SidebarOptions/LogoutButton";
import AdminSidebar from "../admin/components/AdminSidebar";
import MonitorSidebar from "../monitor/components/MonitorSidebar";
import { TeacherSidebar } from "../teacher/components/TeacherSidebar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed, hideToggle }: {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
    hideToggle?: boolean;
}) => {
    const asideRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const [hoveredTooltip, setHoveredTooltip] = React.useState<{ name: string; y: number } | null>(null);
    const [isSidebarHovered, setIsSidebarHovered] = React.useState(false);

    const handleHover = (name: string | null, event?: React.MouseEvent) => {
        if (!isCollapsed || !name || !event || !scrollContainerRef.current) {
            setHoveredTooltip(null);
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const containerRect = asideRef.current?.getBoundingClientRect();

        if (containerRect) {
            setHoveredTooltip({
                name,
                y: rect.top + rect.height / 2 - containerRect.top
            });
        }
    };

    useGSAP(() => {
        gsap.to(asideRef.current, {
            width: isCollapsed ? "80px" : "280px",
            duration: 0.5,
            ease: "power3.inOut"
        });
    }, [isCollapsed]);

    const userRole = (session?.user as any)?.role;
    const isLoading = status === "loading";

    const renderRoleSidebar = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center py-10 opacity-50">
                    <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                </div>
            );
        }

        if (userRole === "SUPER_ADMIN" || userRole === "ADMIN") {
            return <AdminSidebar isCollapsed={isCollapsed} onHover={handleHover} />;
        }

        if (userRole === "TEACHER") {
            return <TeacherSidebar isCollapsed={isCollapsed} onHover={handleHover} />;
        }

        if (userRole === "MONITOR") {
            return <MonitorSidebar isCollapsed={isCollapsed} onHover={handleHover} />;
        }

        // Fallback to student/default navigation
        return (
            <>
                <SidebarNav isCollapsed={isCollapsed} pathname={pathname} onHover={handleHover} />
                {isCollapsed && <div className="h-px w-[80%] bg-slate-200 mb-4 mx-auto" />}
                <CommunitySection isCollapsed={isCollapsed} pathname={pathname} onHover={handleHover} />
                {isCollapsed && <div className="h-px w-[80%] bg-slate-200 mb-4 mx-auto" />}
                <AiToolsSection isCollapsed={isCollapsed} pathname={pathname} onHover={handleHover} />
            </>
        );
    };


    return (
        <aside
            ref={asideRef}
            className={`w-[280px] h-screen bg-[white] flex flex-col pt-6 relative font-sans z-9000 ${!isCollapsed ? 'border-r border-slate-200/60' : ''}`}
            onWheel={(e) => e.stopPropagation()}
            onMouseEnter={() => setIsSidebarHovered(true)}
            onMouseLeave={() => setIsSidebarHovered(false)}
        >
            {/* STICKY TOP: Header & Profile Section */}
            <div className={`flex flex-col shrink-0 relative z-0 ${isCollapsed ? 'px-2 overflow-hidden' : 'px-6'}`}>
                {/* Global Top Gradient Glow (to prevent hard lines between components) */}
                <div
                    className={`absolute -top-6 left-0 right-0 h-[380px] pointer-events-none transition-opacity duration-700 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}
                    style={{
                        background: 'radial-gradient(circle at 50% 35%, rgba(224, 86, 253, 0.18) 0%, rgba(0, 102, 255, 0.06) 40%, transparent 70%)',
                        zIndex: -1
                    }}
                />
                <SidebarHeader
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    hideToggle={hideToggle}
                    isSidebarHovered={isSidebarHovered}
                />
                <ProfileSection isCollapsed={isCollapsed} />
            </div>

            {/* Divider between Profile and Options */}
            <div className={`h-px bg-slate-200/60 shrink-0 ${isCollapsed ? 'mx-4 mb-2' : 'mx-8 mb-4'}`} />

            {/* SCROLLABLE MIDDLE: Navigation & Tools */}
            <div
                ref={scrollContainerRef}
                className={`flex-1 no-scrollbar py-2 overflow-y-auto ${isCollapsed ? 'overflow-x-hidden' : 'px-6'}`}
                data-lenis-prevent
            >
                {renderRoleSidebar()}
            </div>

            {/* Tooltip for collapsed state - Outside the scrollable area to prevent clipping */}
            {isCollapsed && hoveredTooltip && (
                <div
                    className="fixed pointer-events-none z-9999 transition-all duration-200 ease-out"
                    style={{
                        top: `${hoveredTooltip.y}px`,
                        left: '80px',
                        transform: 'translateY(-50%)'
                    }}
                >
                    <div className="ml-4 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg whitespace-nowrap shadow-xl relative">
                        {hoveredTooltip.name}
                        <div className="absolute right-[calc(100%-1px)] top-1/2 -translate-y-1/2 border-4 border-transparent border-r-blue-500" />
                    </div>
                </div>
            )}

            {/* BOTTOM FIXED: Logout */}
            <LogoutButton isCollapsed={isCollapsed} onHover={handleHover} />
        </aside>
    );
};

export default Sidebar;