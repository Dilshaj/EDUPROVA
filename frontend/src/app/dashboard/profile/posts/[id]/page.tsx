'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { ArrowLeft, MoreHorizontal, Heart, MessageCircle, Share2, Send } from 'lucide-react'

// Mock data (in a real app this would fetch based on ID)
const getPostById = (id: string) => {
    return {
        id,
        author: 'Sanku Naga',
        role: 'UI/UX Designer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        time: '1d ago',
        content: 'Working on a new case study for the Eduprova Dashboard. Focusing heavily on accessibility and keyboard navigation. Here is a sneak peek of the new dark mode.',
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        tags: ['UI/UX', 'Accessibility', 'DesignSystem'],
        likes: 342,
        comments: 24,
        shares: 15
    }
}

const PostDetailPage = () => {
    const params = useParams()
    const router = useRouter()

    if (!params?.id) return null
    const post = getPostById(params.id as string)

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Profile</span>
            </button>

            <Card className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden mb-6">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                        <img
                            src={post.avatar}
                            alt={post.author}
                            className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 leading-tight">{post.author}</h3>
                            <p className="text-sm text-gray-500">{post.role} • {post.time}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50">
                            <MoreHorizontal className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <p className="text-gray-900 text-lg leading-relaxed mb-6">
                        {post.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Image */}
                    {post.image && (
                        <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
                            <img
                                src={post.image}
                                alt="Post content"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between py-4 border-t border-gray-100 text-gray-500">
                        <div className="flex gap-8">
                            <div className="flex items-center gap-2 text-red-500">
                                <Heart className="w-6 h-6 fill-current" />
                                <span className="font-bold">{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-6 h-6" />
                                <span className="font-bold">{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Share2 className="w-6 h-6" />
                                <span className="font-bold">{post.shares}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Comments Section */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Comments ({post.comments})</h3>

                {/* Add Comment */}
                <div className="flex gap-4">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="w-full bg-white rounded-xl border-0 shadow-sm py-3 px-4 pr-12 focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 p-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Comment List (Mock) */}
                {/* ... */}
            </div>
        </div>
    )
}

export default PostDetailPage
