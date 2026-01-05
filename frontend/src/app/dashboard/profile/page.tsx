'use client'

import React, { useState, useEffect } from 'react'
import ProfileHeader from './components/ProfileHeader'
import LearningActivity from './components/LearningActivity'
import FocusAreas from './components/FocusAreas'
import HoursWidget from './components/HoursWidget'
import ProfileTabs from './components/ProfileTabs'
import BiographySection from './components/BiographySection'
import ExperienceSection from './components/ExperienceSection'
import EducationSection from './components/EducationSection'
import LanguagesSection from './components/LanguagesSection'
import SkillsEndorsements from './components/SkillsEndorsements'
import InterestsSection from './components/InterestsSection'
import PostsSection from './components/PostsSection'
import ActivityDashboard from './activity/components/ActivityDashboard'
import CertificateCard from './certificates/CertificateCard'
import SkillBalance from './certificates/SkillBalance'
import CertificatePreview from './certificates/CertificatePreview'
import SkillAssessmentReport from './certificates/SkillAssessmentReport'

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('About')
    const [isCertificatePreviewOpen, setIsCertificatePreviewOpen] = useState(false)
    const [isReportOpen, setIsReportOpen] = useState(false)
    const [selectedCertificate, setSelectedCertificate] = useState<string>('')
    const [selectedCertificateType, setSelectedCertificateType] = useState<'analytical' | 'course' | 'project'>('course')

    // Profile State (Lifted from components)
    const [profileData, setProfileData] = useState({
        header: {
            name: "Varahanarasimha Logisa",
            role: "Product Designer",
            location: "Andhra Pradesh, India",
            connections: "500+",
            profilePicture: "",
            coverBanner: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=80",
            socials: { website: '', linkedin: '', github: '', twitter: '' },
            availability: 'open', // Default availability
            email: '' // Default email
        },
        bio: "", // Empty string uses default fallback
        experiences: [], // Empty array uses default fallback
        education: [],
        skills: [],
        languages: [],
        interests: []
    })

    // Load from localStorage on mount to reflect edits
    useEffect(() => {
        try {
            const savedData = localStorage.getItem('userProfileData')
            if (savedData) {
                const parsed = JSON.parse(savedData)
                setProfileData(prev => ({
                    ...prev,
                    header: {
                        ...prev.header,
                        name: `${parsed.general?.firstName || ''} ${parsed.general?.lastName || ''}`.trim() || prev.header.name,
                        role: parsed.professional?.headline || prev.header.role,
                        location: parsed.general?.location || prev.header.location,
                        profilePicture: parsed.general?.profilePicture || prev.header.profilePicture,
                        coverBanner: parsed.general?.coverBanner || prev.header.coverBanner,
                        socials: { ...prev.header.socials, ...parsed.socials },
                        availability: parsed.professional?.availability || prev.header.availability,
                        email: parsed.general?.email || prev.header.email
                    },
                    bio: parsed.general?.bio || prev.bio,
                    experiences: parsed.professional?.experiences || prev.experiences,
                    education: parsed.professional?.education || prev.education,
                    skills: parsed.professional?.skills || prev.skills,
                    languages: parsed.professional?.languages || prev.languages,
                    interests: parsed.professional?.interests || prev.interests
                }))
            }
        } catch (error) {
            console.error('Failed to load profile data', error)
        }
    }, [])

    const handleUpdateProfile = (newData: any) => {
        setProfileData(prev => ({
            ...prev,
            header: {
                ...prev.header,
                name: `${newData.general?.firstName || ''} ${newData.general?.lastName || ''}`.trim() || prev.header.name,
                role: newData.professional?.headline || prev.header.role,
                location: newData.general?.location || prev.header.location,
                profilePicture: newData.general?.profilePicture || prev.header.profilePicture,
                coverBanner: newData.general?.coverBanner || prev.header.coverBanner,
                socials: newData.socials,
                availability: newData.professional?.availability || prev.header.availability,
                email: newData.general?.email || prev.header.email
            },
            bio: newData.general?.bio || prev.bio,
            experiences: newData.professional?.experiences || prev.experiences,
            education: newData.professional?.education || prev.education,
            skills: newData.professional?.skills || prev.skills,
            languages: newData.professional?.languages || prev.languages,
            interests: newData.professional?.interests || prev.interests
            // Update other sections
        }))
    }

    const certificates = [
        {
            title: 'Advanced React Patterns',
            instructor: 'Frontend Masters',
            issueDate: 'Jan 2024',
            tags: ['React', 'Hooks', 'Context'],
            verified: true,
            image: '',
            type: 'analytical' as const
        },
        {
            title: 'Google UX Design Professional Certificate',
            instructor: 'Coursera',
            issueDate: 'Nov 2023',
            tags: ['Wireframing', 'Figma', 'User Research'],
            verified: true,
            image: '',
            type: 'course' as const
        },
        {
            title: 'Full Stack Web Development Bootcamp',
            instructor: 'Udemy',
            issueDate: 'Sep 2023',
            tags: ['MERN', 'Node.js', 'Next.js'],
            verified: true,
            image: '',
            type: 'project' as const
        }
    ]

    const handleViewCertificate = (title: string, type: 'analytical' | 'course' | 'project') => {
        setSelectedCertificate(title)
        setSelectedCertificateType(type)
        setIsCertificatePreviewOpen(true)
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-4">
            {/* Header */}
            <div className="mb-6">
                <ProfileHeader
                    userInfo={profileData.header}
                    onUpdate={handleUpdateProfile}
                />
            </div>

            {/* Main Content - Full Width */}
            <div className="w-full">
                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Tab Content - Fixed size to prevent layout shift */}
                <div className="mt-6 min-h-[800px] w-full">
                    {activeTab === 'About' && (
                        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Two Column Layout: Left (Sticky Widgets) - Right (Main Content) */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                                {/* LEFT COLUMN: Status & Widgets */}
                                <div className="space-y-6 lg:col-span-1">
                                    <LearningActivity />
                                    <FocusAreas />
                                    <HoursWidget />
                                </div>

                                {/* RIGHT COLUMN: Biography & Details */}
                                <div className="space-y-6 lg:col-span-2">
                                    <BiographySection bio={profileData.bio} />
                                    <ExperienceSection experiences={profileData.experiences} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <EducationSection education={profileData.education} />
                                        <LanguagesSection languages={profileData.languages} />
                                    </div>

                                    <SkillsEndorsements skills={profileData.skills} />
                                    <InterestsSection interests={profileData.interests} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Posts' && (
                        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[700px]">
                            <PostsSection />
                        </div>
                    )}

                    {activeTab === 'Activity' && (
                        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ActivityDashboard />
                        </div>
                    )}

                    {activeTab === 'Certificates' && (
                        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Your Credentials</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                                {/* LEFT COLUMN: Certificate Cards (Wider) */}
                                <div className="lg:col-span-2 space-y-6">
                                    {certificates.map((cert) => (
                                        <CertificateCard
                                            key={cert.title}
                                            {...cert}
                                            onView={() => handleViewCertificate(cert.title, cert.type)}
                                        />
                                    ))}
                                </div>

                                {/* RIGHT COLUMN: Skill Balance (Narrower) */}
                                <div className="lg:col-span-1">
                                    <div className="lg:sticky lg:top-6">
                                        <SkillBalance onViewReport={() => setIsReportOpen(true)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CertificatePreview
                isOpen={isCertificatePreviewOpen}
                onClose={() => setIsCertificatePreviewOpen(false)}
                certificateTitle={selectedCertificate}
                certificateType={selectedCertificateType}
            />

            <SkillAssessmentReport
                isOpen={isReportOpen}
                onClose={() => setIsReportOpen(false)}
            />
        </div >
    )
}

export default ProfilePage
