'use client'

import React from 'react'
import TimeSpentChart from './TimeSpentChart'
import YourActivityCard from './YourActivityCard'

const UsageTab = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TimeSpentChart />
                <YourActivityCard />
            </div>
        </div>
    )
}

export default UsageTab
