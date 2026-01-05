import React from "react";
import Link from "next/link";
import { MessageSquareMore, BookOpen } from "lucide-react";

const communityItems = [
    { name: "Messages", icon: MessageSquareMore, path: "/dashboard/messages", badge: 23 },
    { name: "Job Board", icon: BookOpen, path: "/dashboard/jobs" },
];



const CommunitySection = ({ isCollapsed, pathname }: { isCollapsed: boolean, pathname: string }) => {
    return (
        <div className={`w-full ${isCollapsed ? 'mb-4' : 'mb-8'}`}>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0 mb-0' : 'max-h-10 opacity-100 mb-4'}`}>
                <h4 className="px-4 text-[13px] font-bold text-slate-900 uppercase tracking-widest whitespace-nowrap">
                    Community
                </h4>
            </div>
            <div className="space-y-1">
                {communityItems.map((item) => {
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
                            <div className={`flex items-center ${isCollapsed ? '' : 'gap-4'}`}>
                                <item.icon size={20} className={`transition-colors shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500"}`} />

                                {/* Collapsed Tooltip */}
                                {isCollapsed && (
                                    <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 z-50">
                                        <div className="bg-white border border-slate-100 py-2 px-4 rounded-full shadow-xl shadow-blue-500/10 flex items-center gap-2 whitespace-nowrap">
                                            <div className="w-1 h-3 bg-blue-500 rounded-full" />
                                            <span className="text-slate-700 font-semibold text-[14px]">{item.name}</span>
                                        </div>
                                    </div>
                                )}

                                <div className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100'
                                    }`}>
                                    <span className="font-medium text-[15px] whitespace-nowrap ml-0">
                                        {item.name}
                                    </span>
                                </div>
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
                    );
                })}
            </div>
        </div>
    );
};

export default CommunitySection;
