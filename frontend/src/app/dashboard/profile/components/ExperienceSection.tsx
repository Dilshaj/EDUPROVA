import React from 'react'
import { Briefcase } from 'lucide-react'

interface ExperienceSectionProps {
    experiences: any[]
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                Experience
            </h2>
            <div className="space-y-6">
                {experiences && experiences.length > 0 ? (
                    experiences.map((exp: any, index: number) => (
                        <div key={index} className="relative pl-6 border-l-2 border-gray-100 last:border-0 pb-6 last:pb-0">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-white ring-1 ring-blue-500/20"></div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                                <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                    {exp.dates}
                                </span>
                            </div>
                            <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">No experience listed.</p>
                )}
            </div>
        </div>
    )
}

export default ExperienceSection
