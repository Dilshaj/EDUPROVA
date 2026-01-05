import React from 'react'
import { Languages } from 'lucide-react'

interface LanguagesSectionProps {
    languages: any[]
}

const LanguagesSection = ({ languages }: LanguagesSectionProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Languages className="w-5 h-5 text-blue-500" />
                Languages
            </h2>
            <div className="flex flex-wrap gap-2">
                {languages && languages.length > 0 ? (
                    languages.map((lang: any, index: number) => {
                        const colors = [
                            "bg-blue-50 text-blue-700 border-blue-200",
                            "bg-green-50 text-green-700 border-green-200",
                            "bg-purple-50 text-purple-700 border-purple-200",
                            "bg-orange-50 text-orange-700 border-orange-200",
                            "bg-pink-50 text-pink-700 border-pink-200",
                            "bg-indigo-50 text-indigo-700 border-indigo-200",
                        ]
                        const colorClass = colors[index % colors.length]

                        return (
                            <span key={index} className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${colorClass}`}>
                                {lang.name}
                            </span>
                        )
                    })
                ) : (
                    <p className="text-gray-500 italic">No languages listed.</p>
                )}
            </div>
        </div>
    )
}

export default LanguagesSection
