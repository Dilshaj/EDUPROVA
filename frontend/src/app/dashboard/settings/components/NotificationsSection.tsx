"use client"

import React, { useState } from "react"
import { Switch } from "@/components/ui/switch"

export function NotificationsSection() {
  const [preferences, setPreferences] = useState({
    activity: [
      { label: "New Comments on your posts", active: true },
      { label: "Mentions & Tags", active: true },
      { label: "Friend Requests / Follows", active: true }
    ],
    learning: [
      { label: "Course Updates & New Lessons", active: true },
      { label: "Assignment Deadlines", active: true },
      { label: "Test Results", active: false }
    ],
    communication: [
      { label: "Email Notifications", active: true },
      { label: "Push Notifications", active: true },
      { label: "SMS Alerts", active: false }
    ]
  })

  const handleToggle = (section: keyof typeof preferences, index: number, checked: boolean) => {
    setPreferences(prev => {
      const newSection = [...prev[section]]
      newSection[index] = { ...newSection[index], active: checked }
      return { ...prev, [section]: newSection }
    })
  }

  return (
    <div id="notifications" className="w-full animate-in fade-in duration-500 text-left scroll-mt-32">
      <div className="mb-12 pb-8 border-b border-slate-100/80 relative">
        <h2 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Notifications</h2>
        <p className="text-slate-500 text-lg font-medium">Control what alerts you receive and how.</p>
        <div className="absolute bottom-0 left-0 w-24 h-1 bg-blue-600 rounded-full"></div>
      </div>

      <div className="space-y-8">

        {/* Activity & Interactions */}
        <div className="border border-slate-100 bg-slate-50/50 rounded-[32px] p-8 shadow-sm transition-all hover:bg-slate-50 duration-500 group">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 transition-colors">
            <span className="w-8 h-px bg-slate-200 transition-all"></span>
            Activity & Interactions
          </h3>
          <div className="space-y-8">
            {preferences.activity.map((item, i) => (
              <div key={i} className="flex items-center justify-between group/item">
                <span className="text-base font-bold text-slate-700 group-hover/item:text-slate-900 transition-colors">{item.label}</span>
                <Switch
                  className="data-[state=checked]:bg-blue-600"
                  checked={item.active}
                  onCheckedChange={(checked) => handleToggle('activity', i, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Learning & Updates */}
        <div className="border border-slate-100 bg-slate-50/50 rounded-[32px] p-8 shadow-sm transition-all hover:bg-slate-50 duration-500 group">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 transition-colors">
            <span className="w-8 h-px bg-slate-200 transition-all"></span>
            Learning & Updates
          </h3>
          <div className="space-y-8">
            {preferences.learning.map((item, i) => (
              <div key={i} className="flex items-center justify-between group/item">
                <span className="text-base font-bold text-slate-700 group-hover/item:text-slate-900 transition-colors">{item.label}</span>
                <Switch
                  className="data-[state=checked]:bg-blue-600"
                  checked={item.active}
                  onCheckedChange={(checked) => handleToggle('learning', i, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Communication Channel */}
        <div className="border border-slate-100 bg-slate-50/50 rounded-[32px] p-8 shadow-sm transition-all hover:bg-slate-50 duration-500 group">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 transition-colors">
            <span className="w-8 h-px bg-slate-200 transition-all"></span>
            Communication Channel
          </h3>
          <div className="space-y-8">
            {preferences.communication.map((item, i) => (
              <div key={i} className="flex items-center justify-between group/item">
                <span className="text-base font-bold text-slate-700 group-hover/item:text-slate-900 transition-colors">{item.label}</span>
                <Switch
                  className="data-[state=checked]:bg-blue-600"
                  checked={item.active}
                  onCheckedChange={(checked) => handleToggle('communication', i, checked)}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
