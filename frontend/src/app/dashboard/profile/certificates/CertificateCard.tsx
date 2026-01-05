'use client'

import React from 'react'
import { BadgeCheck, MoreHorizontal, Share2, Eye, QrCode, Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface CertificateCardProps {
    title: string
    instructor: string
    issueDate: string
    tags: string[]
    image: string
    verified?: boolean
    onView: () => void
    certificateType?: 'analytical' | 'course' | 'project'
}

const CertificateCard = ({ title, instructor, issueDate, tags, verified = true, onView, certificateType = 'course' }: CertificateCardProps) => {
    const [isCopied, setIsCopied] = useState(false)

    const handleShare = async () => {
        const shareData = {
            title: 'Certificate of Completion',
            text: `Check out my ${title} certificate by ${instructor}!`,
            url: window.location.href // Ideally this should be the certificate's unique URL
        }

        try {
            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
                setIsCopied(true)
                setTimeout(() => setIsCopied(false), 2000)
            }
        } catch (err) {
            console.error('Error sharing:', err)
        }
    }

    const handleDownload = async () => {
        // Map certificate type to image path
        const getCertificateImage = () => {
            switch (certificateType) {
                case 'analytical':
                    return '/certificates/analytical-research-new.png'
                case 'project':
                    return '/certificates/project-completion.png'
                case 'course':
                default:
                    return '/certificates/course-completion.png'
            }
        }

        try {
            const imagePath = getCertificateImage()
            const response = await fetch(imagePath)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${title.replace(/\s+/g, '_')}_Certificate.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.error('Error downloading certificate:', err)
        }
    }

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 relative group hover:shadow-md transition-all">
            {/* Main Content */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <BadgeCheck className="w-5 h-5 text-yellow-500 fill-yellow-100" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">CERTIFICATE OF COMPLETION</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">{title}</h3>

                <div className="flex gap-12 mb-6">
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">INSTRUCTED BY</p>
                        <p className="text-sm font-semibold text-gray-900">{instructor}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">ISSUED ON</p>
                        <p className="text-sm font-semibold text-gray-900">{issueDate}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gray-50 text-xs font-semibold text-gray-600 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={onView}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 flex items-center gap-2"
                    >
                        <Eye className="w-4 h-4" />
                        View Certificate
                    </Button>
                    <Button
                        onClick={handleDownload}
                        variant="outline"
                        className="rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-6 flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Download
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-lg border-gray-200 text-gray-500 hover:bg-gray-50"
                        onClick={handleShare}
                    >
                        {isCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    </Button>
                </div>
            </div>

            {/* Right Side: Actions & QR */}
            <div className="flex flex-col justify-between items-end min-w-[120px]">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400 hover:text-gray-900">
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-100 shadow-xl rounded-xl">
                        <DropdownMenuItem className="cursor-pointer text-sm font-medium text-red-600 focus:bg-red-50 focus:text-red-700">
                            Remove
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="mt-auto flex flex-col items-center gap-2">
                    <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                        <QrCode className="w-12 h-12 text-gray-800" strokeWidth={1.5} />
                    </div>
                    <div className="text-center">
                        <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">SCAN TO VERIFY</p>
                        {verified && (
                            <div className="inline-flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full ring-1 ring-green-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-[9px] font-bold text-green-600">VERIFIED</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CertificateCard
