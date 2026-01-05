'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart'
import AudienceListModal from './AudienceListModal'

const chartData = [
    { gender: 'Women', visitors: 52, fill: '#ec4899' },
    { gender: 'Men', visitors: 30, fill: '#3b82f6' },
    { gender: 'Other', visitors: 18, fill: '#a855f7' },
]

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    Women: {
        label: 'Women',
        color: '#ec4899',
    },
    Men: {
        label: 'Men',
        color: '#3b82f6',
    },
    Other: {
        label: 'Other',
        color: '#a855f7',
    },
} satisfies ChartConfig

const GenderChart = () => {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; title: string }>({ isOpen: false, title: '' })

    const handleOpenModal = () => {
        setModalConfig({ isOpen: true, title: 'Gender: All' })
    }

    // Reuse mock data 
    const mockProfiles = [
        { id: '1', name: 'Sneha Reddy', role: 'Frontend Developer', location: 'Bangalore, India', image: 'https://i.pravatar.cc/150?u=sneha', status: 'Connected' as const },
        { id: '2', name: 'Priya Sharma', role: 'Talent Acquisition', location: 'Delhi, India', image: 'https://i.pravatar.cc/150?u=priya', status: 'Connect' as const },
    ]

    return (
        <Card className="p-6 rounded-3xl border border-gray-100 shadow-sm bg-white h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-gray-900 font-bold text-base">Gender</h3>
                    <p className="text-gray-400 text-xs mt-1">Audience gender distribution</p>
                </div>
                <button
                    onClick={handleOpenModal}
                    className="bg-gray-50 text-gray-500 text-[10px] font-semibold px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                    View Profiles
                </button>
            </div>

            <div className="flex-1 min-h-[250px] relative">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="gender"
                            innerRadius={60}
                            outerRadius={85}
                            strokeWidth={5}
                            paddingAngle={2}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} className="stroke-white" />
                            ))}
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {chartData[0].visitors.toLocaleString()}%
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground text-[10px] font-bold uppercase tracking-widest"
                                                >
                                                    WOMEN
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </div>

            <div className="flex justify-center gap-4 mt-2">
                {chartData.map((entry) => (
                    <div key={entry.gender} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.fill }} />
                        <span className="text-xs font-medium text-gray-500">{entry.gender}</span>
                    </div>
                ))}
            </div>

            <AudienceListModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.title}
                data={mockProfiles}
            />
        </Card>
    )
}

export default GenderChart
