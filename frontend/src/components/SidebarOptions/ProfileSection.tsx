'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";

const ProfileSection: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";
    const user = session?.user;
    const [avatarKey, setAvatarKey] = useState(0);

    // Log session updates for debugging
    useEffect(() => {
        console.log('ProfileSection: Session updated', {
            hasUser: !!user,
            userName: user?.name,
            userImage: user?.image,
            imageLength: user?.image?.length
        });
        // Force re-render when image changes
        if (user?.image) {
            setAvatarKey(prev => prev + 1);
        }
    }, [session, user]);

    // Helper for Truncation
    const truncateName = (name: string) => {
        return name.length > 20 ? name.substring(0, 20) + "..." : name;
    };

    const pathname = usePathname();


    // Shimmer/Skeleton Loader
    if (isLoading) {
        return (
            <div className="flex flex-col items-center mb-4 relative z-0 animate-pulse">
                <div className={`rounded-full bg-slate-200 ${isCollapsed ? 'w-12 h-12' : 'w-24 h-24'} mb-3`} />
                {!isCollapsed && (
                    <div className="flex flex-col items-center w-full gap-2 px-6">
                        <div className="h-5 w-32 bg-slate-200 rounded-md" />
                        <div className="h-4 w-20 bg-slate-200 rounded-md" />
                        <div className="flex gap-6 mt-4 w-full justify-center">
                            <div className="h-10 w-12 bg-slate-100 rounded-lg" />
                            <div className="h-10 w-12 bg-slate-100 rounded-lg" />
                            <div className="h-10 w-12 bg-slate-100 rounded-lg" />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const displayName = user?.name || "Guest User";
    const userRole = (user as any)?.role || "Student";

    // Get Initials (up to 2)
    const initials = displayName
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    // Soft Pastel Colors for Avatar
    const avatarGradients = [
        'from-[#E0E7FF] to-[#C7D2FE]', // Soft Indigo
        'from-[#E0F2FE] to-[#BAE6FD]', // Soft Sky
        'from-[#FCE7F3] to-[#FBCFE8]', // Soft Pink
        'from-[#F3E8FF] to-[#E9D5FF]', // Soft Purple
        'from-[#DCFCE7] to-[#BBF7D0]', // Soft Emerald
    ];
    const colorIndex = displayName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % avatarGradients.length;
    const selectedGradient = avatarGradients[colorIndex];

    return (
        <Link href="/dashboard/profile" className="flex flex-col items-center mb-4 relative z-0 transition-all duration-300 group/profile cursor-pointer">
            {/* {isCollapsed && <div className="absolute w-40 h-18 -translate-y-[11px] z-0 rounded-full ml-28 p-7 bg-[#2d63a0] border-r-2 border-[#F2F8FF] shadow-sm shadow-slate-200/50">
                <div className="relative w-full h-full z-10">
                    <div className="absolute inset-0 bg-[#2d63a0] translate-y-[44px] z-0 ml-2" />
                    <div className="absolute inset-0 p-[3px] translate-y-[45px] rotate-z-5 bg-[#F5F9FF] mr-16 rounded-tr-full" />
                </div>
            </div>} */}
            <div className={`relative transition-all duration-500 ${isCollapsed ? 'w-12 h-12' : 'w-24 h-24'} mb-3`}>
                {/* Animated Gradient Ring */}
                <div
                    className="absolute inset-0 rounded-full bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-90 blur-[1px]"
                    style={{
                        animation: 'spin-slow 3s linear infinite'
                    }}
                />
                <div className="absolute inset-0 rounded-full bg-linear-to-bl from-cyan-400 via-blue-500 to-purple-600 animate-pulse opacity-75" />

                {/* Inner Border with Gradient */}
                <div className={`absolute inset-0 rounded-full p-[2px] bg-linear-to-tr from-blue-500 via-purple-500 to-pink-400`}>
                    <div className={`bg-white rounded-full w-full h-full flex items-center justify-center overflow-hidden p-[2px]`}>
                        <div className={`rounded-full w-full h-full flex items-center justify-center overflow-hidden`}>
                            <div className={`relative w-full h-full rounded-full overflow-hidden bg-white group`} key={avatarKey}>
                                {user?.image ? (
                                    <ImageWithBlur
                                        src={user.image}
                                        alt={displayName}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center bg-linear-to-br ${selectedGradient} relative overflow-hidden transition-transform duration-700`}>
                                        {/* Subtle Depth Effects */}
                                        <div className="absolute inset-0 bg-white/20" />

                                        <span className={`relative z-10 font-bold tracking-tight text-slate-600 select-none transition-all duration-300 ${isCollapsed ? 'text-lg' : 'text-3xl'
                                            }`}>
                                            {initials}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Details with smooth slide/fade */}
            <div className={`w-full overflow-hidden transition-all duration-500 ease-in-out flex flex-col items-center ${isCollapsed
                ? 'max-h-0 opacity-0 mt-0 pointer-events-none'
                : 'max-h-60 opacity-100 mt-0'
                }`}>
                <h3 className="text-[17px] font-bold text-[#1E293B] whitespace-nowrap truncate px-4" title={displayName}>
                    {truncateName(displayName)}
                </h3>
                <p className="text-sm text-slate-500 mb-4">{userRole}</p>

                {/* {
                    pathname.startsWith("/dashboard/admin") ? (
                        ""
                    ) : (
                        <div className="flex items-center gap-6 w-full justify-center text-center">
                            <div className="group cursor-default">
                                <p className="text-lg font-bold text-[#1E293B]">13</p>
                                <p className="text-[11px] text-slate-500 font-semibold transition-colors group-hover:text-blue-500">Uploads</p>
                            </div>
                            <div className="group cursor-default">
                                <p className="text-lg font-bold text-[#1E293B]">7</p>
                                <p className="text-[11px] text-slate-500 font-semibold transition-colors group-hover:text-blue-500">Streaks</p>
                            </div>
                            <div className="group cursor-default">
                                <p className="text-lg font-bold text-[#1E293B]">12k</p>
                                <p className="text-[11px] text-slate-500 font-semibold transition-colors group-hover:text-blue-500">Connections</p>
                            </div>
                        </div>
                    )
                } */}



                <div className="w-full h-px bg-slate-200 mt-4" />
            </div>
        </Link>
    );
};

export default ProfileSection;
