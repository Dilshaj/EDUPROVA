"use client"

import React, { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function ChatCommunitySection() {
  const [preferences, setPreferences] = useState({
    messaging: [
      { label: "Show Read Receipts", active: true },
      { label: "Show Typing Indicators", active: true }
    ],
    interactions: [
      { label: "Allow Comments on your posts", active: true },
      { label: "Allow Mentions", active: true },
      { label: "Show Active Status", active: true }
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
    <div id="chat" className="w-full animate-in fade-in duration-500 text-left scroll-mt-32">
      <div className="mb-10 pb-8 border-b border-slate-100">
        <h2 className="text-3xl font-semibold text-slate-900 mb-1">Chat & Community</h2>
        <p className="text-slate-500 text-base">Manage your privacy and interaction settings.</p>
      </div>

      <div className="space-y-10">

        {/* Messaging */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Messaging</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Who can send you messages?</label>
              <div className="relative">
                <select className="w-full h-12 appearance-none bg-slate-50 border border-border hover:border-slate-300 rounded-xl px-4 outline-none text-base text-slate-700 font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-colors">
                  <option>Everyone</option>
                  <option>Connections Only</option>
                  <option>No One</option>
                </select>
                <div className="absolute top-0 right-0 h-full flex items-center pr-4 pointer-events-none text-slate-500">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50/50 rounded-2xl border border-border p-1">
              {preferences.messaging.map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-4 ${i !== 1 && 'border-b border-slate-100'}`}>
                  <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                  <Switch
                    checked={item.active}
                    onCheckedChange={(checked) => handleToggle('messaging', i, checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactions */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Interactions</h3>
          <div className="bg-slate-50/50 rounded-2xl border border-border p-1">
            {preferences.interactions.map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-4 ${i !== 2 && 'border-b border-slate-100'}`}>
                <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                <Switch
                  checked={item.active}
                  onCheckedChange={(checked) => handleToggle('interactions', i, checked)}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}


