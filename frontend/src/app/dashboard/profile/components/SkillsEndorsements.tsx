import React from 'react'
import { Award } from 'lucide-react'

interface SkillsEndorsementsProps {
    skills: any[]
}

const SkillsEndorsements = ({ skills }: SkillsEndorsementsProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-500" />
                Skills & Endorsements
            </h2>
            <div className="flex flex-wrap gap-2">
                {skills && skills.length > 0 ? (
                    skills.map((skill: any, index: number) => (
                        <div key={index} className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors cursor-default">
                            {skill.name}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">No skills added.</p>
                )}
            </div>
        </div>
    )
}

export default SkillsEndorsements
