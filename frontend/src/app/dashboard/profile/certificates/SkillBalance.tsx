'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { MoreHorizontal, ArrowRight } from 'lucide-react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SkillBalanceProps {
    onViewReport: () => void
}

const SkillBalance = ({ onViewReport }: SkillBalanceProps) => {
    const chartConfig = {
        value: {
            label: "Skill Level",
            color: "#a855f7",
        },
    } satisfies ChartConfig

    const chartData = [
        { subject: 'React', value: 90 },
        { subject: 'Backend', value: 65 },
        { subject: 'Design', value: 80 },
        { subject: 'DevOps', value: 50 },
        { subject: 'Testing', value: 70 },
        { subject: 'CS Fund.', value: 75 },
    ]

    return (
        <Card className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 relative overflow-visible h-full flex flex-col">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Skill Balance</h3>
                    <p className="text-xs text-gray-500">Your competence distribution</p>
                </div>
                <button className="text-gray-400 hover:text-gray-900 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <div className="relative flex justify-center flex-1 items-center py-4">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] w-full">
                    <RadarChart data={chartData}>
                        <PolarGrid className="fill-gray-50/50" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'gray', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            dataKey="value"
                            fill="var(--color-value)"
                            fillOpacity={0.15}
                            stroke="var(--color-value)"
                            strokeWidth={2}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    </RadarChart>
                </ChartContainer>
            </div>

            <div className="mt-auto text-center border-t border-gray-50 pt-4">
                <button
                    onClick={onViewReport}
                    className="text-xs font-bold text-purple-500 hover:text-purple-600 flex items-center justify-center gap-1 mx-auto"
                >
                    View Detailed Report <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </Card>
    )
}

export default SkillBalance
