"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextType {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isMessagesPage = pathname === "/dashboard/messages";
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Handle auto-collapse for messages page and auto-expand when leaving
    useEffect(() => {
        if (isMessagesPage) {
            setIsCollapsed(true);
        } else {
            setIsCollapsed(false);
        }
    }, [isMessagesPage]);

    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
