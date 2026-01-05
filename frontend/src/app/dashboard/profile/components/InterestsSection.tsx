import React from 'react'
import { Heart } from 'lucide-react'

interface InterestsSectionProps {
    interests: string[]
}

const InterestsSection = ({ interests }: InterestsSectionProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-500" />
                Interests
            </h2>
            <div className="flex flex-wrap gap-2">
                {interests && interests.length > 0 ? (
                    interests.map((interest: string, index: number) => {
                        const colors = [
                            "bg-emerald-50 text-emerald-700 border-emerald-200",
                            "bg-violet-50 text-violet-700 border-violet-200",
                            "bg-amber-50 text-amber-700 border-amber-200",
                            "bg-rose-50 text-rose-700 border-rose-200",
                            "bg-cyan-50 text-cyan-700 border-cyan-200",
                            "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
                        ]
                        const colorClass = colors[index % colors.length]

                        return (
                            <span key={index} className={`px-3 py-1.5 text-sm font-medium rounded-full border ${colorClass}`}>
                                {interest}
                            </span>
                        )
                    })
                ) : (
                    <p className="text-gray-500 italic">No interests listed.</p>
                )}
            </div>
        </div>
    )
}

export default InterestsSection
