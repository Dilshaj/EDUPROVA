'use client'

import React from 'react'
import { CalendarDays, ChevronDown } from 'lucide-react'

interface DashboardHeaderProps {
    username?: string
}

const DashboardHeader = ({ username = '@sankunaga' }: DashboardHeaderProps) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Professional Dashboard</h1>
                <p className="text-sm text-gray-500">Advanced insights for <span className="text-blue-600 font-medium">{username}</span></p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                Last 30 Days
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
        </div>
    )
}

export default DashboardHeader
