'use client'

import React, { useState } from 'react'
import DashboardHeader from './DashboardHeader'
import OverviewTab from './overview/OverviewTab'
import AudienceTab from './audience/AudienceTab'
import ContentTab from './content/ContentTab'
import UsageTab from './usage/UsageTab'

const ActivityDashboard = () => {
    const [activeTab, setActiveTab] = useState('Overview')
    const tabs = ['Overview', 'Audience', 'Content', 'My Usage']

    return (
        <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <DashboardHeader />

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === tab
                            ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[500px]">
                {activeTab === 'Overview' && <OverviewTab />}
                {activeTab === 'Audience' && <AudienceTab />}
                {activeTab === 'Content' && <ContentTab />}
                {activeTab === 'My Usage' && <UsageTab />}
            </div>
        </div>
    )
}

export default ActivityDashboard
