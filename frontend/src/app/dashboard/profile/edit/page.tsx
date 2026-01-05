'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Save, ChevronRight, Check, Sparkles, Loader2, ChevronLeft, User, Briefcase, Globe } from 'lucide-react'

import GeneralTab from './tabs/GeneralTab'
import ProfessionalTab from './tabs/ProfessionalTab'
import SocialsTab from './tabs/SocialsTab'

import { mockProfileData, getInitialEditData } from '@/app/data/profileData'

const TABS = ['General', 'Professional', 'Socials']

const EditProfilePage = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('general')
    const [formData, setFormData] = useState(getInitialEditData(mockProfileData))
    const [isSaving, setIsSaving] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Calculate Profile Completion
    const { completionPercentage, completionItems } = React.useMemo(() => {
        if (!formData) return { completionPercentage: 0, completionItems: [] }

        // Define granular tracking for "every input box"
        // Equal weighting ensures "one by one" linear progress as requested.
        const fields = [
            // GENERAL
            { id: 'pic', label: 'Upload Profile Picture', completed: !!formData.general.profilePicture, weight: 1 },
            { id: 'fname', label: 'First Name', completed: !!formData.general.firstName, weight: 1 },
            { id: 'lname', label: 'Last Name', completed: !!formData.general.lastName, weight: 1 },
            { id: 'email', label: 'Email Address', completed: !!formData.general.email, weight: 1 },
            { id: 'phone', label: 'Phone Number', completed: !!formData.general.phone, weight: 1 },
            { id: 'loc', label: 'Location', completed: !!formData.general.location, weight: 1 },
            { id: 'bio', label: 'Add Bio', completed: (formData.general.bio?.length || 0) > 20, weight: 1 },

            // PROFESSIONAL
            { id: 'headline', label: 'Headline', completed: !!formData.professional.headline, weight: 1 },
            { id: 'avail', label: 'Availability', completed: !!formData.professional.availability, weight: 1 },
            { id: 'skills', label: 'Add Skills', completed: (formData.professional.skills?.length || 0) > 0, weight: 1 },
            { id: 'exp', label: 'Add Experience', completed: (formData.professional.experiences?.length || 0) > 0, weight: 1 },
            { id: 'edu', label: 'Add Education', completed: (formData.professional.education?.length || 0) > 0, weight: 1 },
            { id: 'lang', label: 'Add Languages', completed: (formData.professional.languages?.length || 0) > 0, weight: 1 },
            { id: 'proj', label: 'Add Project History', completed: (formData.professional.projects?.length || 0) > 0, weight: 1 },
            { id: 'int', label: 'Add Interests', completed: (formData.professional.interests?.length || 0) > 0, weight: 1 },

            // SOCIALS
            { id: 'soc_web', label: 'Website', completed: !!formData.socials.website, weight: 1 },
            { id: 'soc_li', label: 'LinkedIn', completed: !!formData.socials.linkedin, weight: 1 },
            { id: 'soc_gh', label: 'GitHub', completed: !!formData.socials.github, weight: 1 },
            { id: 'soc_tw', label: 'Twitter', completed: !!formData.socials.twitter, weight: 1 },
        ]

        const totalItems = fields.length
        const completedItems = fields.filter(f => f.completed).length

        const percentage = Math.round((completedItems / totalItems) * 100)

        // Dynamic Checklist: Prioritize INCOMPLETE items to nudge user
        const incomplete = fields.filter(f => !f.completed)
        const complete = fields.filter(f => f.completed)

        // Show up to 3 items: Incomplete ones first, then filled with completed ones if needed
        const displayItems = [...incomplete, ...complete].slice(0, 3).map(f => ({
            label: f.label,
            completed: f.completed
        }))

        return {
            completionPercentage: percentage,
            completionItems: displayItems
        }
    }, [formData])

    const handleSave = async () => {
        if (isSaving) return

        setIsSaving(true)
        setIsSuccess(false)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Save to localStorage to reflect changes on Profile page
        try {
            localStorage.setItem('userProfileData', JSON.stringify(formData))
        } catch (error) {
            console.error('Failed to save to localStorage', error)
        }

        setIsSaving(false)
        setIsSuccess(true)

        // Hide success message after 1 second
        // Hide success message after 1 second and Redirect
        setTimeout(() => {
            setIsSuccess(false)
            router.push('/dashboard/profile')
        }, 1000)
    }

    const updateFormData = (section: string, data: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [section]: { ...prev[section], ...data },
        }))
    }

    if (!formData) return <div>Loading...</div>

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                        <Button
                            variant="ghost"
                            className="group gap-2 pl-2 pr-4 rounded-full hover:bg-gray-100/80 text-gray-500 hover:text-gray-900 transition-all font-medium"
                            onClick={() => router.push('/dashboard/profile')}
                        >
                            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-gray-300 group-hover:shadow transition-all">
                                <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                            </div>
                            <span>Back to Profile</span>
                        </Button>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer">
                            View Public Profile
                        </span>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 border border-blue-200">
                            SN
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your personal information, privacy, and security.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* MAIN CONTENT */}
                    <div className="w-full">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <div className="bg-white rounded-2xl border border-gray-100 p-1 shadow-sm">
                                <TabsList className="bg-gray-50/80 p-1.5 h-auto flex w-full rounded-xl border border-gray-200/50 relative gap-1">
                                    {TABS.map(tab => {
                                        const value = tab.toLowerCase().replace(' ', '-')
                                        const Icon = value === 'general' ? User : value === 'professional' ? Briefcase : Globe

                                        return (
                                            <TabsTrigger
                                                key={value}
                                                value={value}
                                                className="
                                                    relative flex-1 py-2.5
                                                    group
                                                    text-sm font-semibold tracking-wide
                                                    text-gray-500 rounded-lg border-none
                                                    transition-all duration-300 ease-out
                                                    flex items-center justify-center gap-2
                                                    
                                                    hover:text-gray-900 hover:bg-white/50

                                                    data-[state=active]:bg-white
                                                    data-[state=active]:text-blue-700
                                                    data-[state=active]:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_1px_4px_-2px_rgba(0,0,0,0.04)]
                                                    data-[state=active]:ring-1 data-[state=active]:ring-black/[0.03]
                                                    
                                                    focus-visible:ring-0
                                                "
                                            >
                                                <Icon className="w-4 h-4 transition-colors group-hover:text-blue-500/70 data-[state=active]:text-blue-600" />
                                                <span className="relative z-10">{tab}</span>
                                            </TabsTrigger>
                                        )
                                    })}
                                </TabsList>
                            </div>

                            <div className="mt-6">
                                <TabsContent value="general">
                                    <GeneralTab
                                        data={formData.general}
                                        updateData={(d: any) => updateFormData('general', d)}
                                    />
                                </TabsContent>
                                <TabsContent value="professional">
                                    <ProfessionalTab
                                        data={formData.professional}
                                        updateData={(d: any) => updateFormData('professional', d)}
                                    />
                                </TabsContent>
                                <TabsContent value="socials">
                                    <SocialsTab
                                        data={formData.socials}
                                        updateData={(d: any) => updateFormData('socials', d)}
                                    />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>

                    {/* RIGHT Sticky content */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="sticky top-24 z-20 mb-20">

                            {/* SINGLE ALWAYS-VISIBLE CARD */}
                            <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)]">

                                {/* ACTIONS */}
                                <div className="p-5 space-y-3">
                                    <Button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                                    >
                                        {isSaving ? 'Saving…' : 'Save Changes'}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => router.back()}
                                        disabled={isSaving}
                                        className="w-full h-11"
                                    >
                                        Cancel
                                    </Button>

                                    {isSuccess && (
                                        <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">
                                            <Check className="w-4 h-4 text-green-600 stroke-3" />
                                            <span>Changes saved</span>
                                        </div>
                                    )}
                                </div>

                                <div className="h-px bg-gray-200" />

                                {/* PROFILE COMPLETION */}
                                <div className="p-5">
                                    <div className="flex justify-between mb-3">
                                        <span className="text-sm font-semibold text-gray-900">
                                            Profile completion
                                        </span>
                                        <span className="text-sm font-semibold text-blue-600">
                                            {completionPercentage}%
                                        </span>
                                    </div>

                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                                        <div
                                            className="h-full bg-blue-600 transition-all duration-700"
                                            style={{ width: `${completionPercentage}%` }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        {completionItems.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div
                                                    className={`w-5 h-5 rounded-full flex items-center justify-center ${item.completed ? 'bg-green-100' : 'bg-gray-100'
                                                        }`}
                                                >
                                                    {item.completed ? (
                                                        <Check className="w-3 h-3 text-green-600 stroke-3" />
                                                    ) : (
                                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    {item.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-gray-200" />

                                {/* STATUS */}
                                <div className="p-5 flex justify-between text-sm">
                                    <span className="text-gray-500">Account status</span>
                                    <span className="font-medium text-green-600 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                                        Active
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfilePage
