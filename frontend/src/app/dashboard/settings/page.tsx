"use client"

import React, { useState, useEffect } from "react"
import { useLenis } from "lenis/react"
import {
  User,
  Shield,
  Bell,
  MessageSquare,
  BookOpen,
  CreditCard,
  Lock,
  Briefcase,
  Moon,
  Download,
  ChevronRight,
} from "lucide-react"

import { ProfileSection } from "./components/ProfileSection"
import { SecuritySection } from "./components/SecuritySection"
import { NotificationsSection } from "./components/NotificationsSection"
import { ChatCommunitySection } from "./components/ChatCommunitySection"
import { LearningSection } from "./components/LearningSection"
import { BillingSection } from "./components/BillingSection"
import { PrivacySection } from "./components/PrivacySection"
import { CareerSection } from "./components/CareerSection"
import { AppearanceSection } from "./components/AppearanceSection"
import { DataControlSection } from "./components/DataControlSection"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const lenis = useLenis();

  const scrollToSection = (id: string) => {
    setActiveTab(id)
    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        offset: -40,
        immediate: false,
        duration: 1.5,
      });
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    const sections = [
      "account", "security", "notifications", "chat",
      "learning", "billing", "privacy", "career",
      "appearance", "data"
    ];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const sidebarItems = [
    { id: "account", label: "Account Settings", icon: User },
    { id: "security", label: "Security & Login", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "chat", label: "Chat & Community", icon: MessageSquare },
    { id: "learning", label: "Learning Settings", icon: BookOpen },
    { id: "billing", label: "Billing & Payments", icon: CreditCard },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "career", label: "Career & Jobs", icon: Briefcase },
    { id: "appearance", label: "Appearance & Media", icon: Moon },
    { id: "data", label: "Data & Control", icon: Download },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-sans w-full">
      <div className="flex flex-col lg:flex-row min-h-screen w-full">

        {/* Sidebar */}
        <aside className="w-full lg:w-[320px] shrink-0 bg-transparent lg:sticky lg:top-0 h-screen p-6 lg:pl-12">
          <div className="mb-10">
            <h1 className="text-[24px] font-bold text-slate-900">Settings</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Manage your account preferences</p>
          </div>

          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200 group ${activeTab === item.id
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-100"
                  : "text-black hover:bg-blue-100 hover:text-black"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 ${activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                  <span>{item.label}</span>
                </div>
                {activeTab === item.id && <ChevronRight className="w-4 h-4 text-white" />}
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area Container */}
        <div className="flex-1 p-8 lg:p-12 w-full">
          {/* Content Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 lg:p-10 min-h-full w-full">
            <div className="space-y-20 w-full text-left">
              <ProfileSection />
              <SecuritySection />
              <NotificationsSection />
              <ChatCommunitySection />
              <LearningSection />
              <BillingSection />
              <PrivacySection />
              <CareerSection />
              <AppearanceSection />
              <DataControlSection />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
