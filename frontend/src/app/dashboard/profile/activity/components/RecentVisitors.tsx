'use client'

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import RecentVisitorsModal from './RecentVisitorsModal'

const RecentVisitors = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Mock images for the pile
    const visitorImages = [
        'https://i.pravatar.cc/150?u=ravi',
        'https://i.pravatar.cc/150?u=sneha',
        'https://i.pravatar.cc/150?u=meera',
        'https://i.pravatar.cc/150?u=rahul'
    ]

    return (
        <>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">Recent Visitors</h3>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-600 text-sm font-semibold hover:text-blue-700"
                    >
                        View All
                    </button>
                </div>

                <div className="flex items-center">
                    <div className="flex -space-x-3">
                        {visitorImages.map((src, index) => (
                            <Avatar key={index} className="border-2 border-white w-10 h-10">
                                <AvatarImage src={src} />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                    <div className="ml-3 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                        +124
                    </div>
                </div>
            </div>

            <RecentVisitorsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}

export default RecentVisitors
