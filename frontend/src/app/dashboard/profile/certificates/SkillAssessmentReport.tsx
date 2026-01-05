'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TrendingUp } from 'lucide-react'

interface SkillAssessmentReportProps {
    isOpen: boolean
    onClose: () => void
}

const SkillAssessmentReport = ({ isOpen, onClose }: SkillAssessmentReportProps) => {
    // Mock data matching the image
    const skills = [
        { name: 'React', score: 120, total: 150, percent: 80 },
        { name: 'Backend', score: 98, total: 150, percent: 65 },
        { name: 'Design', score: 86, total: 150, percent: 57 },
        { name: 'DevOps', score: 65, total: 150, percent: 43 },
        { name: 'Testing', score: 85, total: 150, percent: 57 },
        { name: 'CS Fund.', score: 100, total: 150, percent: 66 },
    ]

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white rounded-2xl p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl font-bold text-gray-900">Skill Assessment Report</DialogTitle>
                    <p className="text-sm text-gray-500">Detailed breakdown of your competency levels</p>
                </DialogHeader>

                <div className="px-6 pb-6">
                    {/* Info Alert */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3 items-start">
                        <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold text-blue-700 mb-1">Overall Performance</h4>
                            <p className="text-xs text-blue-600 leading-relaxed">
                                You are performing in the top 15% of your peer group. Your strongest area is React Development.
                            </p>
                        </div>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-5">
                        {skills.map((skill) => (
                            <div key={skill.name}>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-bold text-gray-700 text-sm">{skill.name}</span>
                                    <div className="text-right">
                                        <span className="font-bold text-blue-600 text-sm">{skill.score}</span>
                                        <span className="text-gray-400 text-xs font-medium"> / {skill.total}</span>
                                    </div>
                                </div>

                                <div className="relative h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${skill.percent}%` }}
                                    />
                                </div>

                                <div className="text-right mt-1">
                                    <span className="text-[10px] text-gray-400 font-medium">{skill.percent}% Proficiency</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Download Report</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SkillAssessmentReport
