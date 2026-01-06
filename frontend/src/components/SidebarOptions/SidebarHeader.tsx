import React from "react";
import Image from "next/image";
import { PanelLeftClose } from "lucide-react";

const SidebarHeader = ({ isCollapsed, setIsCollapsed, hideToggle }: {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
    hideToggle?: boolean;
}) => {
    return (
        <div className={`flex items-center bg-transparent mb-8 relative group transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {/* Logo Image Area */}
            <div className={`relative transition-all duration-300 ${isCollapsed ? 'w-10 h-10' : 'w-28 h-8 sm:w-32 sm:h-9 md:w-36 md:h-10'}`}>
                <Image
                    src={isCollapsed ? "/eduprovaE.png" : "/eduprova.png"}
                    alt="Eduprova Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Toggle Button */}
            {!hideToggle && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsCollapsed(!isCollapsed);
                    }}
                    className={`text-slate-400 hover:text-slate-600 transition-all duration-300 transform cursor-pointer ${isCollapsed
                        ? 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-transparent rotate-180 rounded-lg hover:bg-[#F5F9FF]'
                        : 'relative'
                        }`}
                >
                    <PanelLeftClose size={20} />
                </button>
            )}
        </div>
    );
};

export default SidebarHeader;
