'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const GrowthOverviewChart = () => {
    // Mock data for the chart
    // const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    // const profileVisitors = [120, 280, 320, 290, 480, 420, 380]
    // const interactions = [40, 80, 120, 100, 180, 160, 150]

    const chartData = [
        { day: 'Mon', visitors: 120, interactions: 40 },
        { day: 'Tue', visitors: 280, interactions: 80 },
        { day: 'Wed', visitors: 320, interactions: 120 },
        { day: 'Thu', visitors: 290, interactions: 100 },
        { day: 'Fri', visitors: 480, interactions: 180 },
        { day: 'Sat', visitors: 420, interactions: 160 },
        { day: 'Sun', visitors: 380, interactions: 150 },
    ]

    const chartConfig = {
        visitors: {
            label: "Profile Visitors",
            color: "#3b82f6", // Blue
        },
        interactions: {
            label: "Interactions",
            color: "#2dd4bf", // Teal
        },
    } satisfies ChartConfig

    const maxValue = 600
    const chartHeight = 200

    // Calculate SVG path for smooth curve
    const createPath = (data: number[]) => {
        const width = 100 / (data.length - 1)
        let path = `M 0 ${100 - (data[0] / maxValue) * 100}`

        for (let i = 1; i < data.length; i++) {
            const x = i * width
            const y = 100 - (data[i] / maxValue) * 100
            const prevX = (i - 1) * width
            const prevY = 100 - (data[i - 1] / maxValue) * 100
            const cp1x = prevX + width / 3
            const cp1y = prevY
            const cp2x = x - width / 3
            const cp2y = y
            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`
        }
        return path
    }

    const createAreaPath = (data: number[]) => {
        const linePath = createPath(data)
        return `${linePath} L 100 100 L 0 100 Z`
    }

    return (
        <Card className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Growth Overview</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-gray-500 font-medium">Profile Visitors</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-400"></div>
                        <span className="text-xs text-gray-500 font-medium">Interactions</span>
                    </div>
                </div>
            </div>

            {/* <div className="flex gap-4">
                <div className="flex flex-col justify-between text-xs text-gray-400 font-medium py-1" style={{ height: chartHeight }}>
                    <span>600</span>
                    <span>450</span>
                    <span>300</span>
                    <span>150</span>
                    <span>0</span>
                </div>

                <div className="flex-1 relative" style={{ height: chartHeight }}>
                   
                </div>
            </div> */ }

            <div className="h-[300px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-visitors)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--color-visitors)" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="fillInteractions" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-interactions)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--color-interactions)" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-gray-100" />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            width={30}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Area
                            dataKey="visitors"
                            type="natural"
                            fill="url(#fillVisitors)"
                            fillOpacity={0.4}
                            stroke="var(--color-visitors)"
                            strokeWidth={2}
                            stackId="1"
                        />
                        <Area
                            dataKey="interactions"
                            type="natural"
                            fill="url(#fillInteractions)"
                            fillOpacity={0.4}
                            stroke="var(--color-interactions)"
                            strokeWidth={2}
                            stackId="2"
                        />
                    </AreaChart>
                </ChartContainer>
            </div>

            {/* X-axis labels removed as they are now in the chart */}
            {/* <div className="flex justify-between mt-2 pl-10 text-xs text-gray-400 font-medium">
                {days.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div> */}
        </Card>
    )
}

export default GrowthOverviewChart
