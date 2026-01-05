"use client"

import React, { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppearanceSection() {
    const [isMounted, setIsMounted] = useState(false)
    const [theme, setTheme] = useState("System")
    const [selectedLanguage, setSelectedLanguage] = useState("English (US)")
    const [selectedTimeZone, setSelectedTimeZone] = useState("(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi")

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <div id="appearance" className="w-full animate-in fade-in duration-500 text-left scroll-mt-32">
                <div className="mb-10 pb-8 border-b border-slate-100">
                    <h2 className="text-3xl font-semibold text-slate-900 mb-1">Appearance & Media</h2>
                    <p className="text-slate-500 text-base">Customize how Eduprova looks and works for you.</p>
                </div>
                <div className="h-40 animate-pulse bg-slate-50 rounded-2xl" />
            </div>
        )
    }

    return (
        <div id="appearance" className="w-full animate-in fade-in duration-500 text-left scroll-mt-32">
            <div className="mb-10 pb-8 border-b border-slate-100">
                <h2 className="text-3xl font-semibold text-slate-900 mb-1">Appearance & Media</h2>
                <p className="text-slate-500 text-base">Customize how Eduprova looks and works for you.</p>
            </div>

            {/* Theme */}
            <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1 mb-3 block">Interface Theme</label>
                <div className="grid grid-cols-3 gap-6">
                    {/* Light */}
                    <div onClick={() => setTheme("Light")} className="cursor-pointer group">
                        <div className={`h-28 rounded-2xl border-2 shadow-sm relative mb-2 flex items-center justify-center overflow-hidden transition-all ${theme === "Light" ? "border-blue-600 bg-white" : "border-slate-100 bg-white group-hover:border-slate-300"}`}>
                            {theme === "Light" && (
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                    <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                                </div>
                            )}
                        </div>
                        <span className={`text-sm font-bold ml-1 ${theme === "Light" ? "text-blue-600" : "text-slate-500"}`}>Light</span>
                    </div>

                    {/* Dark */}
                    <div onClick={() => setTheme("Dark")} className="cursor-pointer group">
                        <div className={`h-28 rounded-2xl border-2 transition-all mb-2 flex items-center justify-center overflow-hidden relative ${theme === "Dark" ? "border-blue-600 bg-slate-900" : "border-transparent bg-slate-900 group-hover:border-slate-300"}`}>
                            <div className="w-8 h-8 rounded-full bg-slate-800" />
                            <div className="w-16 h-2 bg-slate-800 rounded-full absolute top-8 right-4" />
                            {theme === "Dark" && (
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                    <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                                </div>
                            )}
                        </div>
                        <span className={`text-sm font-bold ml-1 ${theme === "Dark" ? "text-blue-600" : "text-slate-800"}`}>Dark</span>
                    </div>

                    {/* System */}
                    <div onClick={() => setTheme("System")} className="cursor-pointer group">
                        <div className={`h-28 rounded-2xl border-2 transition-all mb-2 flex items-center justify-center overflow-hidden relative ${theme === "System" ? "border-blue-600 bg-linear-to-br from-slate-200 to-slate-800" : "border-transparent bg-linear-to-br from-slate-200 to-slate-800 group-hover:border-slate-300"}`}>
                            <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm absolute top-4 left-4" />
                            <div className="w-20 h-2 bg-white/20 rounded-full backdrop-blur-sm absolute bottom-8 right-4" />
                            {theme === "System" && (
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                    <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                                </div>
                            )}
                        </div>
                        <span className={`text-sm font-bold ml-1 ${theme === "System" ? "text-blue-600" : "text-slate-800"}`}>System</span>
                    </div>
                </div>
            </div>

            <div className="h-px bg-slate-100 my-10" />

            {/* Regional Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Language</label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="w-full h-12 bg-slate-50 border border-border hover:border-slate-300 rounded-xl px-4 flex items-center justify-between outline-none text-base text-slate-700 font-semibold focus:ring-4 focus:ring-blue-500/10 transition-all data-[state=open]:border-blue-500 data-[state=open]:ring-4 data-[state=open]:ring-blue-500/10">
                                {selectedLanguage}
                                <ChevronRight className="w-4 h-4 rotate-90 text-slate-500 transition-transform duration-200 data-[state=open]:-rotate-90" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-[200px] bg-white rounded-xl border border-slate-100 shadow-xl p-1.5" align="start">
                            {[
                                "English (US)",
                                "English (UK)",
                                "Arabic (Dubai)",
                                "Spanish",
                                "French",
                                "German",
                                "Japanese"
                            ].map((lang) => (
                                <DropdownMenuItem
                                    key={lang}
                                    onClick={() => setSelectedLanguage(lang)}
                                    className={`rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer transition-colors ${selectedLanguage === lang ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'}`}
                                >
                                    {lang}
                                    {selectedLanguage === lang && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Time Zone</label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="w-full h-12 bg-slate-50 border border-border hover:border-slate-300 rounded-xl px-4 flex items-center justify-between outline-none text-base text-slate-700 font-semibold focus:ring-4 focus:ring-blue-500/10 transition-all data-[state=open]:border-blue-500 data-[state=open]:ring-4 data-[state=open]:ring-blue-500/10">
                                <span className="truncate">{selectedTimeZone}</span>
                                <ChevronRight className="w-4 h-4 rotate-90 shrink-0 ml-2 text-slate-500 transition-transform duration-200 data-[state=open]:-rotate-90" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-[200px] bg-white rounded-xl border border-slate-100 shadow-xl p-1.5 h-64 overflow-y-auto" align="start">
                            {[
                                "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
                                "(GMT+00:00) London, Edinburgh, Dublin",
                                "(GMT+04:00) Dubai, Abu Dhabi",
                                "(GMT-05:00) Eastern Time (US & Canada)",
                                "(GMT-08:00) Pacific Time (US & Canada)",
                                "(GMT+01:00) Paris, Berlin, Rome",
                                "(GMT+09:00) Tokyo, Osaka"
                            ].map((tz) => (
                                <DropdownMenuItem
                                    key={tz}
                                    onClick={() => setSelectedTimeZone(tz)}
                                    className={`rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer transition-colors ${selectedTimeZone === tz ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'}`}
                                >
                                    {tz}
                                    {selectedTimeZone === tz && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}
