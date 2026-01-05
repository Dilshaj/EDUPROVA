'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Target } from 'lucide-react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const FocusAreas = () => {
    const chartConfig = {
        value: {
            label: "Skill Level",
            color: "#a855f7",
        },
    } satisfies ChartConfig

    const chartData = [
        { subject: 'React', value: 90 },
        { subject: 'Backend', value: 60 },
        { subject: 'Design', value: 80 },
        { subject: 'DevOps', value: 40 },
        { subject: 'Testing', value: 50 },
        { subject: 'CS Fund.', value: 70 },
    ]

    return (
        <Card className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">

            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-gray-900" />
                    <h3 className="font-bold text-gray-900">Focus Areas</h3>
                </div>
                <span className="text-[10px] text-gray-400">React</span>
            </div>

            <div className="relative flex justify-center py-4 h-[250px]">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] w-full">
                    <RadarChart data={chartData}>
                        <PolarGrid className="fill-gray-50/50" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'gray', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            dataKey="value"
                            fill="var(--color-value)"
                            fillOpacity={0.4}
                            stroke="var(--color-value)"
                            strokeWidth={2}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    </RadarChart>
                </ChartContainer>
            </div>
        </Card>
    )
}

export default FocusAreas
