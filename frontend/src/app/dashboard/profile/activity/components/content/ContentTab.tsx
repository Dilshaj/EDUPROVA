'use client'

import React from 'react'
import ContentCard from './ContentCard'

const ContentTab: React.FC = () => {
    const contentItems = [
        {
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80',
            title: 'Understanding React Server Components',
            type: 'ARTICLE' as const,
            publishedDate: '2 days ago',
            views: '12.4k',
            likes: '850',
            comments: 124,
            shares: 45,
            followersPercent: 65,
            nonFollowersPercent: 35
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80',
            title: 'Modern UI Design Trends 2024',
            type: 'POST' as const,
            publishedDate: '5 days ago',
            views: '8.9k',
            likes: '620',
            comments: 85,
            shares: 120,
            followersPercent: 40,
            nonFollowersPercent: 60
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80',
            title: 'CSS Grid vs Flexbox: When to use what?',
            type: 'VIDEO' as const,
            publishedDate: '1 week ago',
            views: '15.2k',
            likes: '1200',
            comments: 340,
            shares: 210,
            followersPercent: 80,
            nonFollowersPercent: 20
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80',
            title: 'Career Growth in Tech: My Journey',
            type: 'POST' as const,
            publishedDate: '2 weeks ago',
            views: '5.4k',
            likes: '320',
            comments: 45,
            shares: 12,
            followersPercent: 90,
            nonFollowersPercent: 10
        }
    ]

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {contentItems.map((item, index) => (
                    <ContentCard key={index} {...item} />
                ))}
            </div>
        </div>
    )
}

export default ContentTab
