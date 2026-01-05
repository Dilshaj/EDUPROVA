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

const Sidebar = ({ isCollapsed, setIsCollapsed, hideToggle }: {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
    hideToggle?: boolean;
}) => {
    const asideRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    useGSAP(() => {
        gsap.to(asideRef.current, {
            width: isCollapsed ? "80px" : "280px",
            duration: 0.5,
            ease: "power3.inOut"
        });
    }, [isCollapsed]);


    return (
        <aside
            ref={asideRef}
            className="w-[280px] h-screen bg-[#F5F9FF] border-r border-slate-200 flex flex-col pt-6 relative font-sans"
            onWheel={(e) => e.stopPropagation()}
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
                />
                <ProfileSection isCollapsed={isCollapsed} />
            </div>

            {/* SCROLLABLE MIDDLE: Navigation & Tools */}
            <div
                className={`flex-1 no-scrollbar py-2 ${isCollapsed ? 'px-2 overflow-visible' : 'px-6 overflow-y-auto'}`}
                data-lenis-prevent
            >
                {pathname.startsWith("/dashboard/admin") ? (
                    <AdminSidebar />
                ) : pathname.startsWith("/dashboard/teacher") ? (
                    <TeacherSidebar />
                ) : pathname.startsWith("/dashboard/monitor") ? (
                    <MonitorSidebar />
                ) : (
                    <>
                        <SidebarNav isCollapsed={isCollapsed} pathname={pathname} />
                        {isCollapsed && <div className="h-px w-[80%] bg-slate-200 mb-4 mx-auto" />}
                        <CommunitySection isCollapsed={isCollapsed} pathname={pathname} />
                        {isCollapsed && <div className="h-px w-[80%] bg-slate-200 mb-4 mx-auto" />}
                        <AiToolsSection isCollapsed={isCollapsed} pathname={pathname} />
                    </>
                )}
            </div>

            {/* BOTTOM FIXED: Logout */}
            <LogoutButton isCollapsed={isCollapsed} />
        </aside>
    );
};

export default Sidebar;