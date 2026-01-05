'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart'
import AudienceListModal from './AudienceListModal'

const chartData = [
    { range: "18-24", audience: 100 },
    { range: "25-34", audience: 85 },
    { range: "35-44", audience: 40 },
    { range: "45+", audience: 25 },
]

const chartConfig = {
    audience: {
        label: "Audience",
        color: "#3b82f6", // Blue
    },
} satisfies ChartConfig

const AgeRangeChart = () => {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; title: string }>({ isOpen: false, title: '' })

    const handleOpenModal = () => {
        setModalConfig({ isOpen: true, title: 'Age Range: 25-34' })
    }

    // Reuse mock profiles
    const mockProfiles = [
        { id: '1', name: 'Ravi Kumar', role: 'HR Manager', location: 'Hyderabad, India', image: 'https://i.pravatar.cc/150?u=ravi', status: 'Connect' as const },
    ]

    return (
        <Card className="p-6 rounded-3xl border border-gray-100 shadow-sm bg-white h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-gray-900 font-bold text-base">Age Range</h3>
                    <p className="text-gray-400 text-xs mt-1">Age distribution of your audience</p>
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
                        barSize={24}
                    >
                        <CartesianGrid horizontal={false} vertical={false} />
                        <YAxis
                            dataKey="range"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            className="font-semibold text-xs fill-gray-500"
                            width={40}
                        />
                        <XAxis type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        {/* Background Bar (simulated by stacking or just max) - Standard recharts trick using composed chart or just styling. 
                             Figma shows "progress bar" style (grey background). 
                             Easier to stick to standard BarChart for now, or use stacked with a 'max' value. 
                             Let's use a simpler clean bar chart first. 
                         */}
                        <Bar dataKey="audience" fill="var(--color-audience)" radius={[0, 4, 4, 0]}>
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

export default AgeRangeChart
