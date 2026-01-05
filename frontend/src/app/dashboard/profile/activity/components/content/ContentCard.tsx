'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Eye, Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import AudienceListModal from '../audience/AudienceListModal'

interface ContentCardProps {
    thumbnail: string
    title: string
    type: 'ARTICLE' | 'VIDEO' | 'POST'
    publishedDate: string
    views: string
    likes: string
    comments: number
    shares: number
    followersPercent: number
    nonFollowersPercent: number
}

const ContentCard = ({
    thumbnail,
    title,
    type,
    publishedDate,
    views,
    likes,
    comments,
    shares,
    followersPercent,
    nonFollowersPercent
}: ContentCardProps) => {
    const typeIds: Record<string, string> = {
        ARTICLE: 'bg-orange-50 text-orange-600 border-orange-100',
        VIDEO: 'bg-purple-50 text-purple-600 border-purple-100',
        POST: 'bg-blue-50 text-blue-600 border-blue-100'
    }

    const [modalConfig, setModalConfig] = React.useState<{ isOpen: boolean; title: string; type: 'likes' | 'followers' | 'non-followers' | null }>({ isOpen: false, title: '', type: null })

    // Mock data generators
    const generateMockUsers = (count: number, type: string) => {
        return Array.from({ length: count }).map((_, i) => ({
            id: `${type}-${i}`,
            name: ['Priya Sharma', 'Amit Patel', 'Rahul Verma', 'Sneha Reddy', 'Vikram Singh', 'Ravil Kumar', 'Kavya Krishnan'][i % 7],
            role: ['Frontend Developer', 'Software Engineer', 'Recruiter @ KHC Global', 'Product Designer', 'Tech Lead', 'QA Engineer', 'Data Scientist'][i % 7],
            location: ['Bangalore, India', 'Pune, India', 'Gurgaon, India', 'Hyderabad, India', 'Delhi, India', 'Mumbai, India', 'Chennai, India'][i % 7],
            image: `https://i.pravatar.cc/150?u=${type}-${i}`,
            status: (['Connected', 'Connect', 'Pending'][i % 3]) as 'Connected' | 'Connect' | 'Pending'
        }))
    }

    const handleViewLikes = () => {
        setModalConfig({ isOpen: true, title: `Likes: ${title}`, type: 'likes' })
    }

    const handleViewFollowers = () => {
        setModalConfig({ isOpen: true, title: 'Followers who engaged', type: 'followers' })
    }

    const handleViewNonFollowers = () => {
        setModalConfig({ isOpen: true, title: 'Non-Followers who engaged', type: 'non-followers' })
    }

    const getModalData = () => {
        if (!modalConfig.type) return []
        const count = modalConfig.type === 'likes' ? 12 : modalConfig.type === 'followers' ? 8 : 15
        return generateMockUsers(count, modalConfig.type)
    }

    return (
        <>
            <Card className="group relative bg-white rounded-[2rem] border border-gray-100/80 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                {/* Header */}
                <div className="flex gap-5 mb-6">
                    <div className="relative shrink-0">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-20 h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5"></div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                            <div className="flex items-start justify-between gap-3 mb-1.5">
                                <h4 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                                    {title}
                                </h4>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${typeIds[type]}`}>
                                    {type}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 font-medium">Published {publishedDate}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4 mb-6 relative">
                    {/* Divider Line */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-100 to-transparent" />

                    <div className="text-center relative bg-white py-1">
                        <p className="text-xl font-extrabold text-gray-900 tracking-tight">{views}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">Views</p>
                    </div>

                    <button onClick={handleViewLikes} className="group/btn text-center relative bg-white py-1 transition-transform active:scale-95">
                        <p className="text-xl font-extrabold text-gray-900 group-hover/btn:text-blue-600 transition-colors">{likes}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-0.5 group-hover/btn:text-blue-500 transition-colors">Likes</p>
                    </button>

                    <div className="text-center relative bg-white py-1">
                        <p className="text-xl font-extrabold text-gray-900">{comments}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">Cmts</p>
                    </div>

                    <div className="text-center relative bg-white py-1">
                        <p className="text-xl font-extrabold text-gray-900">{shares}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">Shares</p>
                    </div>
                </div>

                {/* Engagement Section */}
                <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Audience</span>
                        <div className="flex items-center gap-3 text-[11px] font-medium">
                            <button onClick={handleViewFollowers} className="text-gray-600 hover:text-blue-600 transition-colors hover:underline decoration-blue-500/30 underline-offset-4">
                                Followers
                            </button>
                            <span className="text-gray-300">/</span>
                            <button onClick={handleViewNonFollowers} className="text-gray-600 hover:text-pink-600 transition-colors hover:underline decoration-pink-500/30 underline-offset-4">
                                Non-Followers
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2.5 w-full bg-white rounded-full overflow-hidden flex shadow-inner border border-gray-100/50">
                        <div
                            className="h-full bg-blue-500"
                            style={{ width: `${followersPercent}%` }}
                        />
                        <div
                            className="h-full bg-pink-500"
                            style={{ width: `${nonFollowersPercent}%` }}
                        />
                    </div>

                    <div className="flex justify-between mt-2.5 text-[11px] font-bold">
                        <div className="flex items-center gap-1.5 text-blue-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {followersPercent}% Followers
                        </div>
                        <div className="flex items-center gap-1.5 text-pink-500">
                            {nonFollowersPercent}% Non-Followers
                            <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        </div>
                    </div>
                </div>
            </Card>

            <AudienceListModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.title}
                data={getModalData()}
            />
        </>
    )
}

export default ContentCard
