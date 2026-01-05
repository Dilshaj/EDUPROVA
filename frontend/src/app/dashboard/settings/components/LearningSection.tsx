"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function LearningSection() {
    const [toggles, setToggles] = useState([
        { label: "Auto-play next lesson", active: true },
        { label: "Show hints automatically in quizzes", active: false },
        { label: "Daily Study Reminders", active: true }
    ])

    const handleToggle = (index: number, checked: boolean) => {
        setToggles(prev => {
            const newToggles = [...prev]
            newToggles[index] = { ...newToggles[index], active: checked }
            return newToggles
        })
    }

    return (
        <div id="learning" className="w-full animate-in fade-in duration-500 text-left scroll-mt-32">
            <div className="mb-10 pb-8 border-b border-slate-100">
                <h2 className="text-3xl font-semibold text-slate-900 mb-1">Learning Preferences</h2>
                <p className="text-slate-500 text-base">Customize your course playback and study goals.</p>
            </div>

            <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Default Video Quality</label>
                        <div className="relative">
                            <select className="w-full h-12 appearance-none bg-slate-50 border border-border hover:border-slate-300 rounded-xl px-4 outline-none text-base text-slate-700 font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-colors">
                                <option>Auto (Recommended)</option>
                                <option>1080p</option>
                                <option>720p</option>
                            </select>
                            <div className="absolute top-0 right-0 h-full flex items-center pr-4 pointer-events-none text-slate-500">
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Caption Language</label>
                        <div className="relative">
                            <select className="w-full h-12 appearance-none bg-slate-50 border border-border hover:border-slate-300 rounded-xl px-4 outline-none text-base text-slate-700 font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-colors">
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                            <div className="absolute top-0 right-0 h-full flex items-center pr-4 pointer-events-none text-slate-500">
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#EEF2FF] rounded-2xl p-6 border border-blue-100 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-xl text-blue-900 mb-2">Study Goals</h3>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Daily Goal</span>
                            <div className="flex items-center gap-2">
                                <Input
                                    defaultValue="60"
                                    className="w-16 h-10 bg-white border-blue-200 text-center font-bold text-blue-900 focus:border-blue-400"
                                />
                                <span className="text-sm font-semibold text-blue-600">minutes / day</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 text-center min-w-[100px]">
                        <div className="text-2xl font-black text-blue-600 leading-none mb-1">12</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Day Streak</div>
                    </div>
                </div>

                <div className="space-y-6">
                    {toggles.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                            <Switch
                                checked={item.active}
                                onCheckedChange={(checked) => handleToggle(i, checked)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
