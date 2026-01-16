import React, { useRef } from "react";
import Link from "next/link";
import { MessageSquareMore, BookOpen } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const communityItems = [
    { name: "Messages", icon: MessageSquareMore, path: "/dashboard/messages", badge: 23 },
    { name: "Job Board", icon: BookOpen, path: "/dashboard/jobs" },
];



const CommunitySection = ({ isCollapsed, pathname, onHover }: {
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
        <div className={`w-full ${isCollapsed ? 'mb-4' : 'mb-8'}`}>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0 mb-0' : 'max-h-10 opacity-100 mb-4'}`}>
                <h4 className="px-4 text-[13px] font-bold text-slate-900 uppercase tracking-widest whitespace-nowrap">
                    Community
                </h4>
            </div>
            <div className={`space-y-2 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
                {communityItems.map((item) => {
                    const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
                    return (
                        <div
                            key={item.name}
                            className={`relative group w-full ${isCollapsed ? 'flex flex-col items-center justify-center h-16' : ''}`}
                            onMouseEnter={(e) => onHover?.(item.name, e)}
                            onMouseLeave={() => onHover?.(null)}
                        >
                            <Link
                                href={item.path}
                                className={`flex z-50 items-center rounded-xl transition-all duration-300 group relative ${isCollapsed ? `w-10 h-10 justify-center ${isActive ? 'ml-3' : ''}` : 'px-4 py-3 gap-4 mx-0'
                                    } ${isActive
                                        ? `bg-linear-to-r from-[#0066FF] to-[#E056FD] text-white shadow-lg shadow-blue-200`
                                        : `text-slate-600 hover:bg-white/50 hover:text-slate-900 font-medium`
                                    }`}
                            >
                                <item.icon size={20} className={`transition-colors shrink-0 z-50 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500"}`} />

                                <div className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100'
                                    }`}>
                                    <span className="font-medium text-[15px] whitespace-nowrap ml-0">
                                        {item.name}
                                    </span>
                                </div>
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isCollapsed ? 'max-w-0 opacity-0 px-0' : 'max-w-20 opacity-100'
                                    }`}>
                                    {item.badge && (
                                        <span className="bg-[#FF4D4F]/20 text-[#FF4D4F] text-[11px] font-bold px-2 py-0.5 rounded-full ml-2">
                                            {item.badge}
                                        </span>
                                    )}
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
            </div>
        </div>
    );
};

export default CommunitySection;
