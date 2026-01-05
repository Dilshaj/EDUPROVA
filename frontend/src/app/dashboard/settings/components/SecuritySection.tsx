"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function SecuritySection() {
    const [email, setEmail] = useState("Example@gmail.com")
    const [password, setPassword] = useState("password123")
    const [isUpdatingEmail, setIsUpdatingEmail] = useState(false)
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

    const handleEmailUpdate = () => {
        setIsUpdatingEmail(true)
        // Simulate API call
        setTimeout(() => {
            toast.success("Email updated successfully", {
                description: `Your registered email is now ${email}`
            })
            setIsUpdatingEmail(false)
        }, 800)
    }

    const handlePasswordUpdate = () => {
        setIsUpdatingPassword(true)
        // Simulate API call
        setTimeout(() => {
            toast.success("Password updated successfully", {
                description: "Your account security has been updated."
            })
            setIsUpdatingPassword(false)
        }, 800)
    }

    return (
        <div id="security" className="animate-in fade-in duration-500 scroll-mt-20">
            <div className="mb-10">
                <h2 className="text-[20px] font-bold text-slate-900">Security & Login</h2>
                <p className="text-[14px] text-slate-500 mt-1">Manage your password and account security settings.</p>
            </div>

            <div className="space-y-8 w-full">
                {/* Email Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Registered Email</label>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-[14px] text-slate-400 font-medium bg-slate-50 h-11 rounded-lg px-4 border border-slate-100 focus:bg-white transition-all shadow-sm"
                        />
                    </div>
                    <Button
                        onClick={handleEmailUpdate}
                        disabled={isUpdatingEmail}
                        variant="outline"
                        className="h-11 px-6 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-[13px] font-medium w-fit min-w-[140px]"
                    >
                        {isUpdatingEmail ? "Updating..." : "Change Email"}
                    </Button>
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Your Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-[14px] text-slate-700 font-medium bg-slate-50 h-11 rounded-lg px-4 border border-slate-100 tracking-widest focus:bg-white transition-all shadow-sm"
                        />
                    </div>
                    <Button
                        onClick={handlePasswordUpdate}
                        disabled={isUpdatingPassword}
                        variant="outline"
                        className="h-11 px-6 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-[13px] font-medium w-fit min-w-[140px]"
                    >
                        {isUpdatingPassword ? "Updating..." : "Update Password"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
