'use client'

import { Download, Share2, X } from 'lucide-react'
import Image from 'next/image'

interface CertificatePreviewProps {
    isOpen: boolean
    onClose: () => void
    certificateTitle: string
    certificateType?: 'analytical' | 'course' | 'project'
}

const CertificatePreview = ({
    isOpen,
    onClose,
    certificateTitle,
    certificateType = 'course'
}: CertificatePreviewProps) => {
    if (!isOpen) return null;

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 animate-in fade-in duration-300">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative z-50 w-full max-w-4xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl rounded-2xl animate-in slide-in-from-bottom-5 duration-500 border border-slate-700/40">
                <div className="flex flex-col h-full">
                    {/* Compact Premium Header */}
                    <div className="flex items-center justify-between px-6 py-3.5 bg-gradient-to-r from-slate-900/95 to-slate-800/95 border-b border-slate-700/40 backdrop-blur-xl z-20 relative">
                        <div className="flex items-center gap-2.5">
                            <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                            <h3 className="font-bold text-white text-base tracking-wide">Certificate Preview</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                className="group p-2 text-slate-400 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-500/30"
                                title="Download Certificate"
                            >
                                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                                className="group p-2 text-slate-400 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-500/30"
                                title="Share Certificate"
                            >
                                <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                            <div className="h-6 w-px bg-slate-700/40 mx-1"></div>
                            <button
                                onClick={onClose}
                                className="group p-2 text-slate-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200 border border-transparent hover:border-red-500/30"
                                title="Close"
                            >
                                <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Optimized Preview Area */}
                    <div className="p-6 md:p-10 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-auto max-h-[80vh]">
                        {/* Certificate Image Container - Optimized Size */}
                        <div className="relative w-full max-w-3xl">
                            {/* Subtle Ambient Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 blur-2xl rounded-2xl"></div>

                            {/* Main Certificate Container */}
                            <div
                                className="relative w-full shadow-2xl rounded-xl overflow-hidden bg-black/10 backdrop-blur-sm border border-slate-700/20 group hover:border-slate-600/30 transition-all duration-300"
                                style={{
                                    aspectRatio: '1.414 / 1'
                                }}
                            >
                                {/* Subtle Inner Glow on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-xl pointer-events-none z-10"></div>

                                {/* Ultra-High Quality Image */}
                                <Image
                                    src={getCertificateImage()}
                                    alt={`${certificateTitle} Certificate`}
                                    fill
                                    className="object-contain group-hover:scale-[1.01] transition-transform duration-500"
                                    priority
                                    quality={100}
                                    unoptimized={true}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                    style={{
                                        imageRendering: '-webkit-optimize-contrast',
                                        WebkitFontSmoothing: 'subpixel-antialiased',
                                        MozOsxFontSmoothing: 'grayscale',
                                        backfaceVisibility: 'hidden',
                                        transform: 'translateZ(0)',
                                        willChange: 'transform'
                                    }}
                                />
                            </div>

                            {/* Minimal Decorative Accents */}
                            <div className="absolute -top-1 -left-1 w-16 h-16 border-l border-t border-blue-400/20 rounded-tl-2xl pointer-events-none"></div>
                            <div className="absolute -bottom-1 -right-1 w-16 h-16 border-r border-b border-blue-400/20 rounded-br-2xl pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Compact Footer */}
                    <div className="px-6 py-2.5 bg-gradient-to-r from-slate-900/95 to-slate-800/95 border-t border-slate-700/40 backdrop-blur-xl">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-slate-400">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">Ultra-HD Quality</span>
                            </div>
                            <div className="text-slate-500 font-medium truncate max-w-xs">
                                {certificateTitle}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CertificatePreview
