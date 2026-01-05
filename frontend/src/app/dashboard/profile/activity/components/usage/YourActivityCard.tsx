'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Users, MessageSquare, Share } from 'lucide-react'

import AudienceListModal from '../audience/AudienceListModal'

const YourActivityCard = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const activities = [
        {
            icon: <Users className="w-5 h-5 text-blue-600" />,
            iconBg: 'bg-blue-50',
            label: 'Requests Sent',
            sublabel: 'Last 7 Days',
            value: 142
        },
        {
            icon: <MessageSquare className="w-5 h-5 text-indigo-600" />,
            iconBg: 'bg-indigo-50',
            label: 'Comments Made',
            sublabel: 'Last 7 Days',
            value: 38
        },
        {
            icon: <Share className="w-5 h-5 text-pink-600" />,
            iconBg: 'bg-pink-50',
            label: 'Posts Shared',
            sublabel: 'Last 7 Days',
            value: 12
        }
    ]

    const mockRequests = [
        {
            id: 'req-1',
            name: 'Ravi Kumar',
            role: 'HR Manager @ TechCorp',
            location: 'Hyderabad, India',
            image: 'https://i.pravatar.cc/150?u=ravi',
            status: 'Connect' as const
        },
        {
            id: 'req-2',
            name: 'Kavya Krishnan',
            role: 'Data Scientist',
            location: 'Chennai, India',
            image: 'https://i.pravatar.cc/150?u=kavya',
            status: 'Pending' as const
        },
        {
            id: 'req-3',
            name: 'Ananya Gupta',
            role: 'UX Researcher',
            location: 'Hyderabad, India',
            image: 'https://i.pravatar.cc/150?u=ananya',
            status: 'Connect' as const
        },
        {
            id: 'req-4',
            name: 'Vikram Singh',
            role: 'Tech Lead',
            location: 'Bangalore, India',
            image: 'https://i.pravatar.cc/150?u=vikram',
            status: 'Pending' as const
        }
    ]

    return (
        <>
            <Card className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Your Activity</h3>

                <div className="space-y-5">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.iconBg}`}>
                                    {activity.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{activity.label}</p>
                                    <p className="text-xs text-gray-400">{activity.sublabel}</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{activity.value}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                    >
                        View Demographics of People You Requested
                        <span className="text-blue-400">→</span>
                    </button>
                </div>
            </Card>

            <AudienceListModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="People You Requested"
                data={mockRequests}
            />
        </>
    )
}

export default YourActivityCard
