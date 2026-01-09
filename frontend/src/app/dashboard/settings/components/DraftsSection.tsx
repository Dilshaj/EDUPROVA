"use client"

import React, { useState, useEffect } from "react"
import { FileText, Trash2, Edit3, Calendar, Clock, BookOpen, ChevronRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function DraftsSection() {
    const [drafts, setDrafts] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const loadDrafts = () => {
            const raw = localStorage.getItem('eduprova_course_drafts')
            if (raw) {
                try {
                    setDrafts(JSON.parse(raw))
                } catch (e) {
                    console.error("Failed to parse drafts", e)
                }
            }
            setIsLoading(false)
        }
        loadDrafts()
    }, [])

    const deleteDraft = (id: number) => {
        const updated = drafts.filter(d => d.id !== id)
        setDrafts(updated)
        localStorage.setItem('eduprova_course_drafts', JSON.stringify(updated))
    }

    const continueDraft = (draft: any) => {
        // To continue a draft, we store it in sessionStorage
        // which the AddCoursePage already monitors for initial state.
        sessionStorage.setItem('eduprova_add_course_data', JSON.stringify(draft.data))
        router.push('/dashboard/admin/courses/add')
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            </div>
        )
    }

    return (
        <div id="drafts" className="animate-in fade-in duration-500 scroll-mt-20">
            <div className="mb-10 pb-8 border-b border-slate-100">
                <h2 className="text-3xl font-semibold text-slate-900 mb-1">Course Drafts</h2>
                <p className="text-slate-500 text-base">Continue working on your unpublished courses.</p>
            </div>

            {drafts.length === 0 ? (
                <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                        <FileText className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">No drafts found</h3>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">When you save a draft while creating a course, it will appear here for you to continue later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {drafts.map((draft) => (
                        <div
                            key={draft.id}
                            className="group bg-white border border-slate-100 rounded-2xl p-6 transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 group-hover:bg-blue-50 transition-colors">
                                    {draft.thumbnail ? (
                                        <img src={draft.thumbnail} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <BookOpen className="w-6 h-6 text-slate-300 group-hover:text-blue-400" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{draft.title}</h4>
                                    <div className="flex items-center gap-4 text-[13px] text-slate-500">
                                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(draft.lastUpdated).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                                            <Clock className="w-3.5 h-3.5" />
                                            {new Date(draft.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors whitespace-nowrap">
                                            {draft.category || 'Uncategorized'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 ml-4">
                                <button
                                    onClick={() => deleteDraft(draft.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    title="Delete Draft"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => continueDraft(draft)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[13px] font-black tracking-wide hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 group-hover:shadow-blue-200 active:scale-95"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    Continue
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
