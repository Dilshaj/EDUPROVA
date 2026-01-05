'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Clock } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const TimeSpentChart = () => {
    const chartData = [
        { day: 'Mon', value: 45 },
        { day: 'Tue', value: 55 },
        { day: 'Wed', value: 35 },
        { day: 'Thu', value: 90 },
        { day: 'Fri', value: 120 },
        { day: 'Sat', value: 25 },
        { day: 'Sun', value: 180 }
    ]

    const chartConfig = {
        value: {
            label: "Minutes",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig

    const maxValue = 180
    const chartHeight = 200

    return (
        <Card className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Time Spent</h3>
                    <p className="text-xs text-gray-400">Average: 52m / day</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                </div>
            </div>

            {/* <div className="flex gap-4">
                <div className="flex flex-col justify-between text-xs text-gray-400 font-medium" style={{ height: chartHeight }}>
                    <span>180</span>
                    <span>135</span>
                    <span>90</span>
                    <span>45</span>
                    <span>0</span>
                </div>

                <div className="flex-1 flex items-end justify-between gap-2" style={{ height: chartHeight }}>
                 
                </div>
            </div> */ }

            <div className="h-[250px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2563eb" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} horizontal={false} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                        />
                        <Bar
                            dataKey="value"
                            fill="url(#barGradient)"
                            radius={[4, 4, 0, 0]}
                            barSize={32}
                        >
                            <LabelList
                                dataKey="value"
                                position="top"
                                offset={12}
                                className="fill-gray-900 font-bold text-xs"
                                formatter={(value: any) => `${value}m`}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </div>

            {/* X-axis labels removed as they are now in the chart */}
            {/* <div className="flex justify-between mt-3 pl-10">
                {data.map((item) => (
                    <span key={item.day} className="text-xs text-gray-400 font-medium flex-1 text-center">
                        {item.day}
                    </span>
                ))}
            </div> */}
        </Card>
    )
}

export default TimeSpentChart
