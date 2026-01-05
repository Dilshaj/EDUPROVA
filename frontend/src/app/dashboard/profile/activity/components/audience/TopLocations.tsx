'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart'
import AudienceListModal from './AudienceListModal'

const chartData = [
    { city: "Bangalore", visitors: 42 },
    { city: "Pune", visitors: 18 },
    { city: "Hyderabad", visitors: 15 },
    { city: "Chennai", visitors: 12 },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
        color: "#3b82f6", // Blue
    },
} satisfies ChartConfig

const TopLocations = () => {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; title: string }>({ isOpen: false, title: '' })

    const handleOpenModal = () => {
        setModalConfig({ isOpen: true, title: 'Location: Bangalore' })
    }

    const mockProfiles = [
        { id: '1', name: 'Sneha Reddy', role: 'Frontend Developer', location: 'Bangalore, India', image: 'https://i.pravatar.cc/150?u=sneha', status: 'Connected' as const },
    ]

    return (
        <Card className="p-6 rounded-3xl border border-gray-100 shadow-sm bg-white h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-gray-900 font-bold text-base">Top Locations</h3>
                    <p className="text-gray-400 text-xs mt-1">Where your audience is located</p>
                </div>
                <button
                    onClick={handleOpenModal}
                    className="bg-gray-50 text-gray-500 text-[10px] font-semibold px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                    View Profiles
                </button>
            </div>

            <div className="flex-1 w-full min-h-[250px]">
                <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                        barSize={10}
                        barGap={2}
                    >
                        <CartesianGrid horizontal={false} vertical={false} />
                        <YAxis
                            dataKey="city"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            width={80}
                            className="font-semibold text-xs fill-gray-700"
                        />
                        <XAxis type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="visitors"
                            fill="var(--color-visitors)"
                            radius={[0, 4, 4, 0]}
                            background={{ fill: '#f3f4f6', radius: [0, 4, 4, 0] as any }} // Background for progress bar effect
                        >
                            <LabelList
                                dataKey="visitors"
                                position="right"
                                offset={8}
                                className="fill-gray-900 font-bold text-xs"
                                formatter={(value: any) => `${value}%`}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
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

export default TopLocations
