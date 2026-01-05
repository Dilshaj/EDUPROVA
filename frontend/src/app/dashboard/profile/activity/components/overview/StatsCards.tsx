'use client'

import React from 'react'
import { Eye, TrendingUp, Building2, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface StatCardProps {
    icon: React.ReactNode
    iconBg: string
    title: string
    value: string
    change: number
    description: string
}

const StatCard = ({ icon, iconBg, title, value, change, description }: StatCardProps) => {
    const isPositive = change >= 0
    return (
        <Card className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {isPositive ? '+' : ''}{change}%
                </div>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-xs text-gray-400">{description}</p>
        </Card>
    )
}

const StatsCards = () => {
    const stats = [
        {
            icon: <Eye className="w-5 h-5 text-blue-600" />,
            iconBg: 'bg-blue-50',
            title: 'Profile Views',
            value: '3,842',
            change: 5.4,
            description: 'Total visits to your profile.'
        },
        {
            icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
            iconBg: 'bg-purple-50',
            title: 'Post Reach',
            value: '45K',
            change: 24,
            description: 'Unique accounts seeing your content.'
        },
        {
            icon: <Building2 className="w-5 h-5 text-indigo-600" />,
            iconBg: 'bg-indigo-50',
            title: 'Recruiter Views',
            value: '32',
            change: 12,
            description: 'Recruiters who viewed your profile.'
        },
        {
            icon: <Clock className="w-5 h-5 text-amber-600" />,
            iconBg: 'bg-amber-50',
            title: 'Active Time',
            value: '4h 12m',
            change: -5,
            description: 'Average weekly time spent.'
        }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    )
}

export default StatsCards
