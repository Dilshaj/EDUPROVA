'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Zap, TrendingUp, Sparkles } from 'lucide-react'
import { RadialBar, RadialBarChart, PolarGrid } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const LearningActivity = () => {
    const currentStreak = 18
    const topPercentage = 5

    const chartConfig = {
        streak: {
            label: "Streak",
            color: "hsl(var(--primary))",
        },
    } satisfies ChartConfig

    const chartData = [
        { name: 'streak', value: 92, fill: 'url(#gradientStreak)' },
    ]

    return (
        <Card className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50/50 border-white/60 shadow-xl shadow-blue-500/5 p-6 rounded-[2rem]">
            {/* Background Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20 text-white">
                        <Zap className="w-5 h-5 fill-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">Learning<br />Activity</h3>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md border border-white/60 shadow-sm text-indigo-600 text-[10px] font-bold px-3 py-1.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    <span>92% Streak</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center gap-6 mb-8 relative z-10">
                {/* Radial Chart */}
                <div className="relative w-28 h-28 flex-shrink-0">
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full h-full">
                        <RadialBarChart
                            width={112}
                            height={112}
                            data={chartData}
                            startAngle={90}
                            endAngle={-270}
                            innerRadius={42}
                            outerRadius={56}
                        >
                            <defs>
                                <linearGradient id="gradientStreak" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#4f46e5" />
                                </linearGradient>
                            </defs>
                            <PolarGrid
                                gridType="circle"
                                radialLines={false}
                                stroke="none"
                                className="first:fill-gray-50 last:fill-transparent"
                            />
                            <RadialBar
                                dataKey="value"
                                background={{ fill: '#f1f5f9' }}
                                cornerRadius={20}
                            />
                        </RadialBarChart>
                    </ChartContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 leading-none tracking-tighter">
                            {currentStreak}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-1">DAYS</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex-1">
                    <div className="mb-1">
                        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Performance</p>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-gray-900">Top {topPercentage}%</span>
                        <div className="bg-green-100 p-0.5 rounded-full">
                            <TrendingUp className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        You're leading among <span className="text-indigo-600 font-bold">12k+</span> active learners this week!
                    </p>
                </div>
            </div>

            {/* Footer Message */}
            <div className="relative z-10 bg-white/60 backdrop-blur-sm border border-white/60 rounded-2xl p-4 text-center shadow-sm">
                <p className="text-sm text-gray-700 font-medium">
                    🔥 <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-bold">On Fire!</span> Keep up the consistency due.
                </p>
            </div>
        </Card>
    )
}

export default LearningActivity
