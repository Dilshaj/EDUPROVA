'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Clock } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const HoursWidget = () => {
    // const weeklyData = [4, 7, 5, 8, 6, 9, 7]
    // const max = 10 

    const chartConfig = {
        hours: {
            label: "Hours",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig

    const chartData = [
        { day: 'M', hours: 4 },
        { day: 'T', hours: 7 },
        { day: 'W', hours: 5 },
        { day: 'T', hours: 8 },
        { day: 'F', hours: 6 },
        { day: 'S', hours: 9 },
        { day: 'S', hours: 7 },
    ]

    return (
        <Card className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-900" />
                    <h3 className="font-bold text-gray-900">Study Hours</h3>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xl font-bold text-gray-900">23.5h</span>
                    <span className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                        Week +12%
                    </span>
                </div>
            </div>

            <p className="text-xs text-gray-400 mb-6">Weekly activity overview</p>

            {/* <div className="h-[120px] flex items-end justify-between gap-3">
                {weeklyData.map((val, i) => {
                    const heightPercent = (val / max) * 100
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full relative h-[100px] flex items-end rounded-t-sm overflow-hidden">
                                <div
                                    className={`w-full bg-blue-500 rounded-t-md transition-all duration-500 group-hover:bg-blue-600`}
                                    style={{ height: `${heightPercent}%` }}
                                ></div>
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                            </span>
                        </div>
                    )
                })}
            </div> */}

            <div className="h-[140px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <BarChart data={chartData} margin={{ top: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#2563EB" /> {/* blue-600 */}
                                <stop offset="100%" stopColor="#4F46E5" /> {/* indigo-600 (approx for 570) */}
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} horizontal={false} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="hours" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-500 font-medium">Avg: <span className="text-gray-900 font-bold">3.4h</span>/day</span>
                <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Last 7 Days
                </span>
            </div>
        </Card>
    )
}

export default HoursWidget
