import React from 'react'
import { FileText } from 'lucide-react'

interface BiographySectionProps {
    bio: string
}

const BiographySection = ({ bio }: BiographySectionProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Biography
            </h2>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {bio || "No biography added yet."}
            </div>
        </div>
    )
}

export default BiographySection
