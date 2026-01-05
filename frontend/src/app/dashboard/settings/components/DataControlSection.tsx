"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Download, Trash2, Power } from "lucide-react"

export function DataControlSection() {
    return (
        <div id="data" className="w-full animate-in fade-in duration-500 text-left scroll-mt-32">
            <div className="mb-10 pb-8 border-b border-slate-100">
                <h2 className="text-3xl font-semibold text-slate-900 mb-1">Data & Control</h2>
                <p className="text-slate-500 text-base">Manage your data and account status.</p>
            </div>

            <div className="space-y-12">
                {/* Account Actions */}
                <div>
                    <h3 className="font-semibold text-xl text-slate-900 mb-6 flex items-center gap-2">
                        Account Actions
                        <span className="text-sm font-normal text-slate-400 ml-1">Manage your data and account status.</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border border-border rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                            <Download className="w-6 h-6 text-slate-700 mb-4 group-hover:text-blue-600 transition-colors" />
                            <h4 className="font-bold text-slate-900 mb-1">Download Your Data</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Get a copy of your posts, certificates, and learning history.
                            </p>
                        </div>
                        <div className="p-6 border border-border rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                            <Trash2 className="w-6 h-6 text-slate-700 mb-4 group-hover:text-red-500 transition-colors" />
                            <h4 className="font-bold text-slate-900 mb-1">Clear History</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Remove search history and viewed items from your account.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Account Management */}
                <div>
                    <h3 className="font-semibold text-xl text-slate-900 mb-2 flex items-center gap-2">
                        <Power className="w-5 h-5 text-slate-900" />
                        Account Management
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mb-6 pl-7">Manage the status of your account.</p>

                    <div className="border border-border rounded-2xl divide-y divide-slate-100">
                        {/* Log Out */}
                        <div className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Log Out</h4>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">Sign out of your account on this device.</p>
                            </div>
                            <Button variant="outline" className="font-bold text-slate-700 border-border hover:bg-slate-100 h-9">
                                Log Out
                            </Button>
                        </div>

                        {/* Deactivate */}
                        <div className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Deactivate Account</h4>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">Temporarily hide your profile and posts.</p>
                            </div>
                            <Button variant="outline" className="font-bold text-slate-700 border-border hover:bg-slate-100 h-9">
                                Deactivate
                            </Button>
                        </div>

                        {/* Delete */}
                        <div className="p-5 flex items-center justify-between bg-red-50/20 hover:bg-red-50/40 transition-colors">
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Delete Account</h4>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">Permanently delete your account and all data.</p>
                            </div>
                            <Button variant="outline" className="font-bold text-red-600 border-border hover:bg-red-50 hover:text-red-700 hover:border-red-200 h-9">
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
