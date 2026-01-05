'use client'

import React from 'react'
import { Briefcase } from 'lucide-react'

const RecruiterInsights = () => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold text-lg">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <h3>Recruiter Insights</h3>
                <Briefcase className="w-5 h-5 text-purple-100 ml-auto opacity-50" />
            </div>

            <div className="space-y-4">
                {/* Profile Views */}
                <div className="bg-purple-50 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Profile Views</span>
                    <span className="text-purple-700 font-bold text-xl">32</span>
                </div>

                {/* Reached Out */}
                <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Reached Out</span>
                    <span className="text-blue-600 font-bold text-xl">5</span>
                </div>
            </div>

            {/* Top Companies Hiring */}
            <div className="mt-6 p-4 border border-gray-100 rounded-2xl">
                <p className="text-sm text-gray-500 mb-3">Top Companies Hiring</p>
                <div className="flex flex-wrap gap-2">
                    {['Google', 'Microsoft', 'Swiggy'].map((company) => (
                        <span key={company} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                            {company}
                        </span>
                    ))}
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                        +2
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RecruiterInsights
