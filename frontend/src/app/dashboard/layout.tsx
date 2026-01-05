"use client";

import React, { useRef } from "react";
import Sidebar from "@/app/dashboard/components/Sidebar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

function DashboardContent({ children }: { children: React.ReactNode }) {
    const { isCollapsed, setIsCollapsed } = useSidebar();
    const pathname = usePathname();
    const isMessagesPage = pathname === "/dashboard/messages";
    const mainRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.to(mainRef.current, {
            marginLeft: isCollapsed ? "80px" : "280px",
            duration: 0.5,
            ease: "power3.inOut"
        });
    }, [isCollapsed]);

    return (
        <div className="bg-white min-h-screen w-full">
            {/* Fixed Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50">
                <Sidebar
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    hideToggle={isMessagesPage}
                />
            </div>

            {/* Main Content Area */}
            <main ref={mainRef} className="ml-[280px]">
                {children}
            </main>
        </div>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <DashboardContent>{children}</DashboardContent>
        </SidebarProvider>
    );
}
