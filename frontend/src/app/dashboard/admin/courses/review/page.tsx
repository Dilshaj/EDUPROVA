'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
    CheckCircle2,
    XCircle,
    Clock,
    Play,
    User,
    BookOpen,
    Eye,
    ChevronRight,
    Search,
    Filter,
    MoreVertical,
    Check
} from 'lucide-react';
import Image from 'next/image';

interface Course {
    _id: string;
    title: string;
    subtitle: string;
    category: string;
    level: string;
    instructor?: {
        firstName: string;
        lastName: string;
    };
    status: 'DRAFT' | 'UNDER_REVIEW' | 'PUBLISHED' | 'REJECTED';
    thumbnail?: string;
    createdAt: string;
}

const ReviewCoursesPage = () => {
    const { data: session } = useSession();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNDER_REVIEW' | 'REJECTED'>('UNDER_REVIEW');

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses');
            const data = await response.json();
            if (data.success) {
                // Filter courses that are either UNDER_REVIEW or REJECTED for the review page
                // Admins see all courses, but we focus on those needing attention
                setCourses(data.courses);
            }
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleUpdateStatus = async (courseId: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/courses/${courseId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                // Update local state instead of re-fetching everything
                setCourses(prev => prev.map(c => c._id === courseId ? { ...c, status: newStatus as any } : c));
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (`${course.instructor?.firstName || ''} ${course.instructor?.lastName || ''}`).toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' ? true : course.status === statusFilter;
        return matchesSearch && matchesStatus && course.status !== 'PUBLISHED' && course.status !== 'DRAFT';
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8 md:p-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Review Library</h1>
                    <p className="text-slate-500 font-bold text-lg">Approve or reject pending course submissions.</p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Pending Review', value: courses.filter(c => c.status === 'UNDER_REVIEW').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'Total Submissions', value: courses.filter(c => c.status !== 'DRAFT').length, icon: BookOpen, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                    { label: 'Rejected', value: courses.filter(c => c.status === 'REJECTED').length, icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-3xl p-8 flex items-center gap-6 shadow-xs group hover:border-indigo-100 transition-all">
                        <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="bg-white border border-slate-100 rounded-3xl p-4 md:p-6 mb-8 flex flex-col md:flex-row items-center gap-6 shadow-xs">
                <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by title or instructor..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-bold placeholder:text-slate-300 transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 w-full md:w-auto">
                    {(['UNDER_REVIEW', 'REJECTED', 'ALL'] as const).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setStatusFilter(filter)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${statusFilter === filter
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {filter.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course List */}
            <div className="space-y-4">
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="h-32 bg-white border border-slate-100 rounded-3xl animate-pulse" />
                    ))
                ) : filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-indigo-100 transition-all shadow-xs"
                        >
                            <div className="flex items-center gap-6 flex-1 w-full md:w-auto">
                                <div className="w-40 aspect-video rounded-2xl bg-slate-100 shrink-0 overflow-hidden relative border border-slate-50">
                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                                            <Play size={32} />
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                                        {course.level}
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                        {course.title}
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                                                <User size={12} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-500">
                                                {course.instructor?.firstName || 'Unknown'} {course.instructor?.lastName || 'Instructor'}
                                            </span>
                                        </div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                        <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest text-[10px]">
                                            {course.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-50 pt-6 md:pt-0">
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Submitted On</span>
                                    <span className="text-sm font-bold text-slate-700">
                                        {new Date(course.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        title="Preview Course"
                                        className="p-3 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-2xl transition-all"
                                    >
                                        <Eye size={20} />
                                    </button>

                                    {course.status === 'UNDER_REVIEW' ? (
                                        <>
                                            <button
                                                onClick={() => handleUpdateStatus(course._id, 'REJECTED')}
                                                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all active:scale-95"
                                            >
                                                <XCircle size={14} />
                                                Reject
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(course._id, 'PUBLISHED')}
                                                className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-slate-200 shadow-hover:emerald-200"
                                            >
                                                <CheckCircle2 size={14} />
                                                Approve
                                            </button>
                                        </>
                                    ) : (
                                        <div className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 ${course.status === 'REJECTED' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                                            }`}>
                                            {course.status === 'REJECTED' ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                                            {course.status}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white border border-slate-100 rounded-[3rem] p-20 flex flex-col items-center justify-center text-center gap-6 shadow-xs">
                        <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                            <Check size={48} className="text-emerald-500 opacity-20" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Zero Pending Reviews!</h3>
                            <p className="text-slate-400 font-bold">You're all caught up. New submissions will appear here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewCoursesPage;
