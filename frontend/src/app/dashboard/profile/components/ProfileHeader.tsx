'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Share2, Edit, MapPin, Users2, CheckCircle2, CircleCheckBig, CheckCheck, Briefcase, Mail, UserCircle, User } from 'lucide-react'
import FluidBanner from '../edit/banners/FluidBanner'
import PremiumBanner, { PremiumBannerType } from '../edit/banners/premium/PremiumBanner'
import { ALL_BANNERS, type BannerInfo } from '../edit/banners/bannerConstants'

interface ProfileHeaderProps {
    userInfo: any
    onUpdate: (data: any) => void
}

const ProfileHeader = (props: ProfileHeaderProps) => {
    const { userInfo } = props
    const router = useRouter()
    const [isShareCopied, setIsShareCopied] = useState(false)

    const handleShare = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href)
            setIsShareCopied(true)
            setTimeout(() => setIsShareCopied(false), 2000)
        }
    }

    if (!userInfo) return null

    return (
        <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            {/* Cover Photo */}
            <div className="relative">
                <div className="h-48 relative group overflow-hidden">
                    {userInfo.coverBanner?.startsWith('fluid:') ? (
                        <FluidBanner type={ALL_BANNERS.find((b: BannerInfo) => b.id === userInfo.coverBanner)?.type as any} />
                    ) : userInfo.coverBanner?.startsWith('premium:') ? (
                        <PremiumBanner type={ALL_BANNERS.find((b: BannerInfo) => b.id === userInfo.coverBanner)?.type as PremiumBannerType} />
                    ) : userInfo.coverBanner?.startsWith('gradient:') ? (
                        <div className={`w-full h-full ${userInfo.coverBanner.replace('gradient:', '')}`} />
                    ) : (
                        <img
                            src={userInfo.coverBanner || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=80"}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Centered Profile Picture */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
                    <div className="relative group cursor-pointer">
                        <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.3)] flex items-center justify-center bg-[#0d0f14] relative transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_20px_60px_rgba(34,211,238,0.25)]">
                            {userInfo.profilePicture ? (
                                <img
                                    src={userInfo.profilePicture}
                                    alt="Profile"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="relative flex items-center justify-center w-full h-full">
                                    <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full" />
                                    <User className="w-24 h-24 text-cyan-400 opacity-80 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
                                </div>
                            )}
                        </div>
                        {/* Verification Badge */}
                        {/* Availability / Status Badge */}
                        <div className="absolute bottom-4 left-[75%] z-20 whitespace-nowrap">
                            {userInfo.availability === 'open' && (
                                <div className="bg-emerald-50 rounded-full pl-2 pr-4 py-1.5 flex items-center gap-2 border-2 border-white shadow-[0_4px_12px_-2px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_16px_-2px_rgba(16,185,129,0.4)] transition-all">
                                    <span className="relative flex h-3 w-3 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">OPEN TO WORK</span>
                                </div>
                            )}
                            {userInfo.availability === 'employed' && (
                                <div className="bg-purple-50 rounded-full pl-2 pr-4 py-1.5 flex items-center gap-2 border-2 border-white shadow-[0_4px_12px_-2px_rgba(147,51,234,0.3)] hover:shadow-[0_6px_16px_-2px_rgba(147,51,234,0.4)] transition-all">
                                    <span className="h-3 w-3 rounded-full bg-purple-500 shrink-0"></span>
                                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">EMPLOYED</span>
                                </div>
                            )}
                            {userInfo.availability === 'hiring' && (
                                <div className="bg-blue-50 rounded-full pl-2 pr-4 py-1.5 flex items-center gap-2 border-2 border-white shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_16px_-2px_rgba(59,130,246,0.4)] transition-all">
                                    <span className="relative flex h-3 w-3 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                    </span>
                                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">HIRING NOW</span>
                                </div>
                            )}
                            {/* Fallback/Default if no status or unknown */}
                            {!['open', 'employed', 'hiring'].includes(userInfo.availability || '') && (
                                <div className="bg-white rounded-full px-4 py-1.5 flex items-center gap-1.5 shadow-md border border-gray-100 ring-2 ring-white">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" />
                                    <span className="text-xs font-bold text-gray-600">PRO MEMBER</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Info Section */}
            <div className="px-8 pb-6 pt-20">
                {/* Name and Info */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold text-gray-900">{userInfo.name}</h1>
                            <CircleCheckBig className="w-6 h-6 text-blue-500 drop-shadow-sm" />

                            {/* Availability Badge */}

                        </div>
                        {userInfo.email && (
                            <div className="flex items-center gap-2 mb-2 text-gray-500">
                                <Mail className="w-4 h-4 text-blue-500 mt-1" />
                                <span className="text-base font-medium">{userInfo.email}</span>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            <div className="inline-flex items-center gap-2 px-4 h-9 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-100">
                                <Briefcase className="w-[18px] h-[18px] text-blue-500" />
                                <span className="text-sm font-medium text-gray-700">{userInfo.role}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 h-9 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-100">
                                <MapPin className="w-[18px] h-[18px] text-blue-500" />
                                <span className="text-sm font-medium text-gray-700">{userInfo.location}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 h-9 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-100">
                                <Users2 className="w-[18px] h-[18px] text-blue-500" />
                                <span className="text-sm font-semibold text-gray-700">{userInfo.connections} Connections</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-10">
                        <Button
                            variant="outline"
                            onClick={handleShare}
                            className={`flex items-center gap-2 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900 px-6 font-medium transition-all ${isShareCopied ? 'bg-green-50 border-green-200 text-green-700' : 'text-gray-700'}`}
                        >
                            {isShareCopied ? < CheckCheck className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                            <span>{isShareCopied ? 'Copied!' : 'Share'}</span>
                        </Button>
                        <Button
                            onClick={() => router.push('/dashboard/profile/edit')}
                            className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 px-6 font-medium"
                        >
                            <Edit className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
