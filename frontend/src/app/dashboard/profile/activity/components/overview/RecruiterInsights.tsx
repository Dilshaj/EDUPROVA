'use client'

import React from 'react'
import { Briefcase } from 'lucide-react'

const RecruiterInsights = () => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-auto relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-gray-900 text-base">Recruiter Insights</h3>
                </div>
                <div className="opacity-10 pointer-events-none">
                    <Briefcase className="w-12 h-12 text-purple-400" />
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                {/* Profile Views */}
                <div className="bg-purple-50 rounded-2xl p-4 flex items-center justify-between group hover:bg-purple-100 transition-colors cursor-default">
                    <span className="text-gray-700 font-medium text-sm">Profile Views</span>
                    <span className="text-purple-700 font-bold text-xl">32</span>
                </div>

                {/* Reached Out */}
                <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-between group hover:bg-blue-100 transition-colors cursor-default">
                    <span className="text-gray-700 font-medium text-sm">Reached Out</span>
                    <span className="text-blue-600 font-bold text-xl">5</span>
                </div>
            </div>

            {/* Top Companies Hiring */}
            <div className="mt-6 pt-5 border-t border-gray-50 relative z-10">
                <p className="text-xs text-gray-500 mb-3 font-medium">Top Companies Hiring</p>
                <div className="flex flex-wrap gap-2">
                    {['Google', 'Microsoft', 'Swiggy'].map((company) => (
                        <span key={company} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors rounded-full text-xs font-medium text-gray-600 border border-gray-100">
                            {company}
                        </span>
                    ))}
                    <span className="px-3 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-400 border border-gray-100">
                        +2
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RecruiterInsights
