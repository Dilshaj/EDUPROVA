import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Github, Linkedin, Twitter, Globe } from 'lucide-react'

interface SocialsTabProps {
    data: any
    updateData: (data: any) => void
}

const SocialsTab = ({ data, updateData }: SocialsTabProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Profiles</h3>
            <p className="text-sm text-gray-500 mb-6">
                Add your social media links to help people connect with you.
            </p>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Website / Portfolio</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Globe className="w-4 h-4" />
                        </span>
                        <Input
                            value={data.website || ''}
                            onChange={(e) => updateData({ website: e.target.value })}
                            placeholder="https://yourwebsite.com"
                            className="pl-9 bg-gray-50/50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>LinkedIn</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700">
                            <Linkedin className="w-4 h-4" />
                        </span>
                        <Input
                            value={data.linkedin || ''}
                            onChange={(e) => updateData({ linkedin: e.target.value })}
                            placeholder="https://linkedin.com/in/username"
                            className="pl-9 bg-gray-50/50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>GitHub</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">
                            <Github className="w-4 h-4" />
                        </span>
                        <Input
                            value={data.github || ''}
                            onChange={(e) => updateData({ github: e.target.value })}
                            placeholder="https://github.com/username"
                            className="pl-9 bg-gray-50/50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Twitter / X</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500">
                            <Twitter className="w-4 h-4" />
                        </span>
                        <Input
                            value={data.twitter || ''}
                            onChange={(e) => updateData({ twitter: e.target.value })}
                            placeholder="https://twitter.com/username"
                            className="pl-9 bg-gray-50/50"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialsTab
