'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import GeneralTab from './tabs/GeneralTab'
import ProfessionalTab from './tabs/ProfessionalTab'
import MyPostsTab from './tabs/MyPostsTab'
import SocialsTab from './tabs/SocialsTab'
import AccountTab from './tabs/AccountTab'

interface EditProfileDialogProps {
    isOpen: boolean
    onClose: () => void
    initialData: any
    onSave: (data: any) => void
}

const EditProfileDialog = ({ isOpen, onClose, initialData, onSave }: EditProfileDialogProps) => {
    const [activeTab, setActiveTab] = useState('general')
    const [formData, setFormData] = useState(initialData)

    const handleSave = () => {
        onSave(formData)
        onClose()
    }

    const updateFormData = (section: string, data: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [section]: { ...prev[section], ...data }
        }))
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden flex flex-col bg-gray-50/50">
                <div className="bg-white px-8 pt-8 pb-4 border-b border-gray-100">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold text-gray-900">Edit Profile</DialogTitle>
                        <p className="text-sm text-gray-500 mt-1">Manage your personal information, privacy, and security.</p>
                    </DialogHeader>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="bg-transparent p-0 h-auto gap-8 border-b border-transparent w-full justify-start">
                            {['General', 'Professional', 'My Posts', 'Socials', 'Account'].map((tab) => {
                                const value = tab.toLowerCase().replace(' ', '-')
                                return (
                                    <TabsTrigger
                                        key={value}
                                        value={value}
                                        className="bg-transparent p-0 pb-3 text-lg font-semibold text-gray-500 data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=active]:border-b-8 data-[state=active]:border-blue-600 rounded-none transition-all hover:text-gray-700"
                                    >
                                        {tab}
                                    </TabsTrigger>
                                )
                            })}
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex-1 overflow-hidden flex">
                    <div className="flex-1 overflow-y-auto p-8">
                        <Tabs value={activeTab} className="w-full space-y-8">
                            <TabsContent value="general" className="mt-0 focus-visible:ring-0">
                                <GeneralTab data={formData.general} updateData={(data) => updateFormData('general', data)} />
                            </TabsContent>
                            <TabsContent value="professional" className="mt-0 focus-visible:ring-0">
                                <ProfessionalTab data={formData.professional} updateData={(data) => updateFormData('professional', data)} />
                            </TabsContent>
                            <TabsContent value="my-posts" className="mt-0 focus-visible:ring-0">
                                <MyPostsTab />
                            </TabsContent>
                            <TabsContent value="socials" className="mt-0 focus-visible:ring-0">
                                <SocialsTab data={formData.socials} updateData={(data) => updateFormData('socials', data)} />
                            </TabsContent>
                            <TabsContent value="account" className="mt-0 focus-visible:ring-0">
                                <AccountTab />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Sidebar - Progress & Actions */}
                    <div className="w-80 bg-white border-l border-gray-100 p-6 flex flex-col gap-6 h-full overflow-y-auto">
                        {/* Actions */}
                        <div className="space-y-3">
                            <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                                Save Changes
                            </Button>
                            <Button variant="outline" onClick={onClose} className="w-full border-gray-200 text-gray-700 hover:bg-gray-50">
                                Cancel
                            </Button>
                        </div>

                        {/* Profile Completion */}
                        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-semibold text-gray-900">Profile Completion</h4>
                                <span className="text-blue-600 font-bold text-sm">92%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                                <div className="h-full bg-blue-600 w-[92%] rounded-full" />
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: 'Upload Profile Picture', done: true },
                                    { label: 'Add Bio', done: true },
                                    { label: 'Add Project History', done: true },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pro Tip */}
                        <div className="bg-blue-600 rounded-xl p-5 text-white shadow-lg shadow-blue-600/20">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="font-bold">Pro Tip</span>
                            </div>
                            <p className="text-xs leading-relaxed text-blue-50">
                                Profiles with detailed project history and verified skills get 3x more views from recruiters.
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileDialog
