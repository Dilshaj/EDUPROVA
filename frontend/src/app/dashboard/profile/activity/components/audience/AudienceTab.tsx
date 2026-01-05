'use client'

import React from 'react'
import GenderChart from './GenderChart'
import AgeRangeChart from './AgeRangeChart'
import TopLocations from './TopLocations'

const AudienceTab = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900">Audience Insights</h2>
                <p className="text-sm text-gray-500">Demographics of your followers and audience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <GenderChart />
                <AgeRangeChart />
                <TopLocations />
            </div>
        </div>
    )
}

export default AudienceTab
