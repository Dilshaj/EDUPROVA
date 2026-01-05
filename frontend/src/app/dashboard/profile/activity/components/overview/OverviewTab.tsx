'use client'

import React from 'react'
import StatsCards from './StatsCards'
import GrowthOverviewChart from './GrowthOverviewChart'
import RecruiterInsights from './RecruiterInsights'
import RecentVisitors from './RecentVisitors'

const OverviewTab = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <GrowthOverviewChart />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <RecruiterInsights />
                    <RecentVisitors />
                </div>
            </div>
        </div>
    )
}

export default OverviewTab
