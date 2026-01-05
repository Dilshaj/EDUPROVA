
import React from 'react'
import { GraduationCap } from 'lucide-react'

interface EducationSectionProps {
    education: any[]
}

const EducationSection = ({ education }: EducationSectionProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-500" />
                Education
            </h2>
            <div className="space-y-6">
                {education && education.length > 0 ? (
                    education.map((edu: any, index: number) => (
                        <div key={index} className="flex gap-4 group">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-100 transition-colors">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{edu.school}</h3>
                                <p className="text-sm text-gray-600">{edu.degree}</p>
                                <p className="text-xs text-gray-400 mt-1 uppercase font-medium">{edu.year}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">Education details not available.</p>
                )}
            </div>
        </div>
    )
}

export default EducationSection

