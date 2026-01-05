'use client'

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import RecentVisitorsModal from './RecentVisitorsModal'

const RecentVisitors = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Mock images based on the modal data or random
    const visitors = [
        'https://i.pravatar.cc/150?u=ravi',
        'https://i.pravatar.cc/150?u=sneha',
        'https://i.pravatar.cc/150?u=meera',
        'https://i.pravatar.cc/150?u=rahul',
        'https://i.pravatar.cc/150?u=priya'
    ]
    const additionalCount = 124

    return (
        <>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-auto flex flex-col justify-center">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-gray-900 text-base">Recent Visitors</h3>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-600 text-xs font-bold hover:text-blue-700 transition-colors hover:underline"
                    >
                        View All
                    </button>
                </div>

                <div className="flex items-center">
                    <div className="flex -space-x-3">
                        {visitors.map((src, index) => (
                            <Avatar key={index} className="border-2 border-white w-10 h-10 shadow-sm transition-transform hover:scale-110 hover:z-10 bg-white">
                                <AvatarImage src={src} />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        ))}
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border-2 border-white flex items-center justify-center shadow-sm relative z-0">
                            +{additionalCount}
                        </div>
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
