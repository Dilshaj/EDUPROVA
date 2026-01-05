"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { ChevronRight, FileText, Eye, Plus, Upload, Trash2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

export function CareerSection() {
    const [openToWork, setOpenToWork] = useState(true)
    const [salaryRange, setSalaryRange] = useState([12, 24])
    const [resumeFile, setResumeFile] = useState<string | null>(null)
    const [resumeDate, setResumeDate] = useState<string | null>(null)
    const [showPreview, setShowPreview] = useState(false)

    return (
        <div id="career" className="w-full animate-in fade-in duration-500 text-left scroll-mt-32 relative">
            <div className="mb-10 pb-8 border-b border-slate-100">
                <h2 className="text-3xl font-semibold text-slate-900 mb-1">Career & Job Preferences</h2>
                <p className="text-slate-500 text-base">Manage your job seeker profile and preferences.</p>
            </div>

            <div className="space-y-10">
                {/* Open to Work Card */}
                <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-xl text-green-800 mb-1">Open to Work</h3>
                        <p className="text-sm text-green-700 font-medium">Recruiters will see that you are looking for new opportunities.</p>
                    </div>
                    <Switch
                        checked={openToWork}
                        onCheckedChange={setOpenToWork}
                        className={openToWork ? "bg-green-600" : ""}
                    />
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Preferred Job Titles</label>
                        <Input
                            defaultValue="Frontend Developer, UI Engineer"
                            className="bg-slate-50 border-border hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 h-12 rounded-xl text-slate-700 font-semibold"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Preferred Locations</label>
                        <Input
                            defaultValue="Hyderabad, Bangalore, Remote"
                            className="bg-slate-50 border-border hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 h-12 rounded-xl text-slate-700 font-semibold"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Work Mode</label>
                        <div className="relative">
                            <select className="w-full h-12 appearance-none bg-slate-50 border border-border hover:border-slate-300 rounded-xl px-4 outline-none text-base text-slate-700 font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-colors">
                                <option>Any</option>
                                <option>Remote</option>
                                <option>Hybrid</option>
                                <option>On-site</option>
                            </select>
                            <div className="absolute top-0 right-0 h-full flex items-center pr-4 pointer-events-none text-slate-500">
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Notice Period</label>
                        <div className="relative">
                            <select className="w-full h-12 appearance-none bg-slate-50 border border-border hover:border-slate-300 rounded-xl px-4 outline-none text-base text-slate-700 font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-colors">
                                <option>Immediate</option>
                                <option>15 Days</option>
                                <option>30 Days</option>
                                <option>60+ Days</option>
                            </select>
                            <div className="absolute top-0 right-0 h-full flex items-center pr-4 pointer-events-none text-slate-500">
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Expected Salary Range (Annual)</label>
                        <span className="font-bold text-slate-900 text-sm">₹ {salaryRange[0]}L - {salaryRange[1]}L</span>
                    </div>
                    <Slider
                        defaultValue={[12, 24]}
                        max={100}
                        step={1}
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                        className="w-full"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-xl text-slate-900">Resume</h3>
                        <button
                            onClick={() => document.getElementById('resume-upload')?.click()}
                            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Upload New
                        </button>
                        <input
                            id="resume-upload"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setResumeFile(file.name);
                                    setResumeDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
                                }
                            }}
                        />
                    </div>
                    {resumeFile ? (
                        <div
                            onClick={() => setShowPreview(true)}
                            className="p-4 border border-border rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 text-sm">{resumeFile}</div>
                                    <div className="text-xs text-slate-500 font-medium mt-0.5">Added on {resumeDate}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Eye className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setResumeFile(null);
                                        setResumeDate(null);
                                    }}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => document.getElementById('resume-upload')?.click()}
                            className="p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-blue-400 hover:bg-blue-50/30 transition-all group cursor-pointer"
                        >
                            <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                <Upload className="w-7 h-7" />
                            </div>
                            <div className="text-center">
                                <div className="font-bold text-slate-900">Upload your resume</div>
                                <div className="text-sm text-slate-500 font-medium mt-1">PDF, DOC, DOCX up to 5MB</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showPreview && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={() => setShowPreview(false)}
                    />
                    <div className="relative bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-[40px] shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
                        {/* Header */}
                        <div className="p-6 px-10 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-10">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shadow-inner">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg tracking-tight leading-tight max-w-[400px] truncate">{resumeFile}</h3>
                                    <p className="text-sm text-slate-500 font-medium opacity-80">Full View • Added {resumeDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex bg-blue-600 rounded-2xl overflow-hidden shadow-lg shadow-blue-200">
                                    <button className="h-11 px-6 text-white font-bold text-sm hover:bg-blue-700 transition-colors border-r border-blue-500/30">
                                        Download
                                    </button>
                                    <button className="h-11 px-3 text-white hover:bg-blue-700 transition-colors">
                                        <ChevronRight className="w-4 h-4 rotate-90" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all shadow-sm"
                                >
                                    <ChevronRight className="w-5 h-5 -rotate-90" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Content (Document View) */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-12 bg-slate-50/50 custom-scrollbar scroll-smooth">
                            <div className="max-w-[850px] mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-16 min-h-[1100px] text-slate-800 font-sans leading-relaxed relative overflow-hidden border border-slate-100">
                                {/* Accent Bar */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-blue-600 shadow-sm shadow-blue-200" />

                                {/* Header Section */}
                                <div className="mb-12 border-b-2 border-slate-50 pb-10">
                                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-3">Varahanarasimha Logisa</h1>
                                    <p className="text-blue-600 font-bold tracking-[0.2em] text-sm uppercase mb-6 flex items-center gap-2">
                                        Full Stack Developer <span className="w-1.5 h-1.5 rounded-full bg-blue-200" /> UI/UX Specialist
                                    </p>
                                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-slate-500 text-sm font-semibold">
                                        <span className="flex items-center gap-2"><span className="text-blue-500/60 text-lg">📍</span> Hyderabad, India</span>
                                        <span className="flex items-center gap-2"><span className="text-blue-500/60 text-lg">✉️</span> varaha@example.com</span>
                                        <span className="flex items-center gap-2"><span className="text-blue-500/60 text-lg">🔗</span> github.com/varaha</span>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="mb-12">
                                    <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-5">Professional Summary</h2>
                                    <p className="text-[15px] font-medium text-slate-600 leading-[1.8]">
                                        Innovative Full Stack Developer with 3+ years of experience in building high-performance web applications using React, Next.js, and Node.js. Proven track record of delivering premium UI/UX experiences and scalable backend architectures. Deeply passionate about AI integration and modern web technologies.
                                    </p>
                                </div>

                                {/* Experience Sections */}
                                <div className="space-y-12">
                                    <div>
                                        <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Professional Experience</h2>
                                        <div className="space-y-10">
                                            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-600 before:rounded-full before:ring-4 before:ring-blue-100">
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
                                                    <h3 className="font-bold text-slate-900 text-xl">Senior Frontend Developer</h3>
                                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg self-start">2023 - PRESENT</span>
                                                </div>
                                                <p className="text-[13px] font-bold text-slate-500 mb-4 italic opacity-80">TechHub Solutions • Remote</p>
                                                <ul className="text-sm text-slate-600 space-y-3 font-medium leading-relaxed">
                                                    <li className="flex gap-2"><span>•</span> Led the migration of legacy systems to Next.js 14, improving performance by 40%.</li>
                                                    <li className="flex gap-2"><span>•</span> Designed and implemented a custom component library used across 12 different projects.</li>
                                                    <li className="flex gap-2"><span>•</span> Collaborated with UX teams to create pixel-perfect, accessible user interfaces.</li>
                                                </ul>
                                            </div>

                                            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-slate-300 before:rounded-full">
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
                                                    <h3 className="font-bold text-slate-900 text-xl">Full Stack Developer Intern</h3>
                                                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg self-start">2022 - 2023</span>
                                                </div>
                                                <p className="text-[13px] font-bold text-slate-500 mb-4 italic opacity-80">Creative Cloud Apps • Hyderabad</p>
                                                <ul className="text-sm text-slate-600 space-y-3 font-medium leading-relaxed">
                                                    <li className="flex gap-2"><span>•</span> Developed real-time dashboard features using WebSocket and Chart.js.</li>
                                                    <li className="flex gap-2"><span>•</span> Optimized database queries, reducing response times for critical API endpoints.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills Section */}
                                    <div className="pt-8 border-t border-slate-50">
                                        <div className="flex flex-wrap gap-2.5">
                                            {['React', 'Next.js', 'Typescript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'AWS', 'Docker'].map(skill => (
                                                <span key={skill} className="px-4 py-1.5 bg-slate-50/50 text-[10px] font-black text-slate-500 uppercase tracking-widest rounded-full border border-slate-100 hover:bg-white hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
