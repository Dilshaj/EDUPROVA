'use client'

import React from 'react'

interface AudienceFiltersProps {
    activeFilter: string
    onFilterChange: (filter: string) => void
}

const AudienceFilters = ({ activeFilter, onFilterChange }: AudienceFiltersProps) => {
    const filters = ['Profile Visitors', 'New Followers', 'Requests Sent', 'Post Engagers']

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    )
}

export default AudienceFilters
