"use client"

import React, { useState } from "react"
import { Globe } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function PrivacySection() {
  const [visibility, setVisibility] = useState("public")
  const [toggles, setToggles] = useState([
    { label: "Show my courses on profile", active: true },
    { label: "Show my certificates", active: true },
    { label: "Allow search engines to find my profile", active: false },
    { label: "Allow personalized ads", active: false },
    { label: "Share data with partners", active: false }
  ])

  const handleToggle = (index: number, checked: boolean) => {
    setToggles(prev => {
      const newToggles = [...prev]
      newToggles[index] = { ...newToggles[index], active: checked }
      return newToggles
    })
  }

  return (
    <div id="privacy" className="w-full animate-in fade-in duration-500 text-left scroll-mt-32">
      <div className="mb-10 pb-8 border-b border-slate-100">
        <h2 className="text-3xl font-semibold text-slate-900 mb-1">Privacy</h2>
        <p className="text-slate-500 text-base">Control who can see your profile and activity.</p>
      </div>

      <div className="space-y-10">
        {/* Profile Visibility */}
        <div>
          <h3 className="font-semibold text-xl text-slate-900 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-500" />
            Profile Visibility
          </h3>
          <div className="border border-border rounded-2xl p-6">
            <div className="flex gap-4 mb-4">
              <div
                onClick={() => setVisibility("public")}
                className={`flex-1 border rounded-xl p-4 flex items-center gap-3 cursor-pointer relative transition-all shadow-sm ${visibility === "public" ? "border-blue-500 bg-blue-50/30 border-2" : "border-border hover:border-slate-300 hover:bg-slate-50"}`}
              >
                <div className={`w-4 h-4 rounded-full shrink-0 ${visibility === "public" ? "border-[5px] border-blue-600 bg-white" : "border border-slate-400 bg-white"}`} />
                <span className={`font-semibold text-base ${visibility === "public" ? "text-blue-900" : "text-slate-500"}`}>Public</span>
              </div>
              <div
                onClick={() => setVisibility("connections")}
                className={`flex-1 border rounded-xl p-4 flex items-center gap-3 cursor-pointer relative transition-all shadow-sm ${visibility === "connections" ? "border-blue-500 bg-blue-50/30 border-2" : "border-border hover:border-slate-300 hover:bg-slate-50"}`}
              >
                <div className={`w-4 h-4 rounded-full shrink-0 ${visibility === "connections" ? "border-[5px] border-blue-600 bg-white" : "border border-slate-400 bg-white"}`} />
                <span className={`font-semibold text-base ${visibility === "connections" ? "text-blue-900" : "text-slate-500"}`}>Connections</span>
              </div>
              <div
                onClick={() => setVisibility("private")}
                className={`flex-1 border rounded-xl p-4 flex items-center gap-3 cursor-pointer relative transition-all shadow-sm ${visibility === "private" ? "border-blue-500 bg-blue-50/30 border-2" : "border-border hover:border-slate-300 hover:bg-slate-50"}`}
              >
                <div className={`w-4 h-4 rounded-full shrink-0 ${visibility === "private" ? "border-[5px] border-blue-600 bg-white" : "border border-slate-400 bg-white"}`} />
                <span className={`font-semibold text-base ${visibility === "private" ? "text-blue-900" : "text-slate-500"}`}>Private</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-medium">Public profiles are visible to everyone, including people off Eduprava.</p>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-6">
          {toggles.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">{item.label}</span>
              <Switch
                checked={item.active}
                onCheckedChange={(checked) => handleToggle(i, checked)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
