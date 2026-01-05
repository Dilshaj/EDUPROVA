'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Target } from 'lucide-react'

const FocusMetrics = () => {
    return (
        <Card className="bg-white rounded-3xl shadow-xl border-0 p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-gray-700" />
                <h3 className="text-base font-bold text-gray-900">Focus</h3>
            </div>

            <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Hours</span>
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-gray-900">+17%</span>
                        <span className="text-[10px] text-gray-500">vs last week</span>
                    </div>
                </div>

                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
            </div>
        </Card>
    )
}

export default FocusMetrics
