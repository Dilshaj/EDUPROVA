import React, { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X, Briefcase, GraduationCap, Upload, Languages, Trash2, Heart, Send, FileText } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'

interface ProfessionalTabProps {
    data: any
    updateData: (data: any) => void
}

const ProfessionalTab = ({ data, updateData }: ProfessionalTabProps) => {
    // --- State for "Add New" inputs ---
    const [newSkillName, setNewSkillName] = useState('')

    const [newLangName, setNewLangName] = useState('')
    const [newLangLevel, setNewLangLevel] = useState('Native')

    const [newInterest, setNewInterest] = useState('')

    // --- State for "Add New" Forms (Experience, Education, Projects) ---
    const [isAddingExp, setIsAddingExp] = useState(false)
    const [newExp, setNewExp] = useState({ role: '', company: '', dates: '', description: '' })

    const [isAddingEdu, setIsAddingEdu] = useState(false)
    const [newEdu, setNewEdu] = useState({ school: '', degree: '', year: '' })

    const [isAddingProject, setIsAddingProject] = useState(false)
    const [newProject, setNewProject] = useState({ name: '', role: '', description: '' })


    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false)

    // --- State and Refs for Resume Upload ---
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const handleFile = (file: File) => {
        // You might want to upload to server here or just store the file object
        // Storing the file object with some metadata for preview
        const fileData = {
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            type: file.type,
            file: file // Store actual file for later upload
        }
        updateData({ resume: fileData })
    }

    const removeResume = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent triggering the dropzone click if consistent
        updateData({ resume: null })
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    // --- Handlers: Skills ---
    const handleAddSkill = () => {
        if (newSkillName) {
            const newSkill = { name: newSkillName }
            updateData({ skills: [...(data.skills || []), newSkill] })
            setNewSkillName('')
        }
    }
    const removeSkill = (index: number) => {
        const list = [...(data.skills || [])]
        list.splice(index, 1)
        updateData({ skills: list })
    }

    // --- Handlers: Languages ---
    const handleAddLanguage = () => {
        if (newLangName) {
            const newLang = { name: newLangName, level: newLangLevel }
            updateData({ languages: [...(data.languages || []), newLang] })
            setNewLangName('')
        }
    }
    const removeLanguage = (index: number) => {
        const list = [...(data.languages || [])]
        list.splice(index, 1)
        updateData({ languages: list })
    }

    // --- Handlers: Interests ---
    const handleAddInterest = () => {
        if (newInterest) {
            updateData({ interests: [...(data.interests || []), newInterest] })
            setNewInterest('')
        }
    }
    const removeInterest = (index: number) => {
        const list = [...(data.interests || [])]
        list.splice(index, 1)
        updateData({ interests: list })
    }

    // --- Handlers: Experience ---
    const handleAddExperience = () => {
        if (newExp.role && newExp.company) {
            updateData({ experiences: [...(data.experiences || []), newExp] })
            setNewExp({ role: '', company: '', dates: '', description: '' })
            setIsAddingExp(false)
        }
    }
    const removeExperience = (index: number) => {
        const list = [...(data.experiences || [])]
        list.splice(index, 1)
        updateData({ experiences: list })
    }

    // --- Handlers: Education ---
    const handleAddEducation = () => {
        if (newEdu.school && newEdu.degree) {
            updateData({ education: [...(data.education || []), newEdu] })
            setNewEdu({ school: '', degree: '', year: '' })
            setIsAddingEdu(false)
        }
    }
    const removeEducation = (index: number) => {
        const list = [...(data.education || [])]
        list.splice(index, 1)
        updateData({ education: list })
    }

    // --- Handlers: Projects ---
    const handleAddProject = () => {
        if (newProject.name) {
            updateData({ projects: [...(data.projects || []), newProject] })
            setNewProject({ name: '', role: '', description: '' })
            setIsAddingProject(false)
        }
    }
    const removeProject = (index: number) => {
        const list = [...(data.projects || [])]
        list.splice(index, 1)
        updateData({ projects: list })
    }

    return (
        <div className="space-y-6">
            {/* Professional Details (Headline, Availability, Skills) */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Professional Details</h3>

                {/* Headline */}
                <div className="space-y-2 mb-6">
                    <Label htmlFor="headline" className="text-gray-600 font-medium">Headline</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Briefcase className="w-4 h-4" />
                        </span>
                        <Input
                            id="headline"
                            value={data.headline || ''}
                            onChange={(e) => updateData({ headline: e.target.value })}
                            className="pl-9 bg-gray-50/50 border-gray-200"
                            placeholder="e.g. UI/UX Designer @ Eduprova"
                        />
                    </div>
                </div>

                {/* Availability */}
                <div className={`space-y-2 transition-all duration-300 ease-in-out ${isAvailabilityOpen ? 'mb-44' : 'mb-6'}`}>
                    <Label className="text-gray-600 font-medium">Availability</Label>
                    <Select
                        value={data.availability || 'open'}
                        onValueChange={(val) => updateData({ availability: val })}
                        onOpenChange={setIsAvailabilityOpen}
                    >
                        <SelectTrigger className="w-full bg-white border-blue-200 ring-1 ring-blue-100 shadow-sm h-11">
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full animate-pulse mx-1 ${data.availability === 'open' ? 'bg-green-500' :
                                    data.availability === 'hiring' ? 'bg-blue-500' :
                                        'bg-gray-400'
                                    }`}></div>
                                <span className="text-gray-900 text-sm">
                                    {data.availability === 'open' ? 'Open to work' :
                                        data.availability === 'hiring' ? 'Hiring now' :
                                            data.availability === 'employed' ? 'Employed' :
                                                'Select availability'}
                                </span>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="open">Open to work</SelectItem>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="hiring">Hiring now</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                    <Label className="text-gray-600 font-medium">Skills & Proficiency</Label>
                    <div className="border border-gray-200 rounded-2xl p-4 bg-white">
                        <div className="flex flex-wrap gap-3 mb-6">
                            {(data.skills || []).map((skill: any, index: number) => {
                                const badgeColors = [
                                    "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-300",
                                    "bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-300",
                                    "bg-green-50 text-green-700 border-green-200 hover:border-green-300",
                                    "bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300",
                                    "bg-pink-50 text-pink-700 border-pink-200 hover:border-pink-300",
                                    "bg-indigo-50 text-indigo-700 border-indigo-200 hover:border-indigo-300",
                                    "bg-rose-50 text-rose-700 border-rose-200 hover:border-rose-300",
                                    "bg-cyan-50 text-cyan-700 border-cyan-200 hover:border-cyan-300"
                                ];
                                const colorClass = badgeColors[index % badgeColors.length];

                                return (
                                    <div key={index} className={`flex items-center gap-2 pl-4 pr-2 py-1.5 border rounded-full shadow-sm group transition-all hover:scale-105 ${colorClass}`}>
                                        <span className="text-sm font-semibold">{skill.name}</span>
                                        <button
                                            onClick={() => removeSkill(index)}
                                            className={`w-5 h-5 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors ml-1`}
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-3 w-full">
                                <Input
                                    placeholder="Skill name (e.g. React)"
                                    value={newSkillName}
                                    onChange={(e) => setNewSkillName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                                    className="h-11 w-full flex-1 rounded-xl border border-gray-200 bg-white text-base placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-blue-500"
                                />

                            </div>

                            <Button
                                onClick={handleAddSkill}
                                className="h-11 w-12 shrink-0 rounded-xl bg-blue-600 px-0 text-white shadow-lg shadow-gray-900/10 hover:bg-blue-700"
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
                    <Button
                        variant="ghost"
                        onClick={() => setIsAddingExp(!isAddingExp)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm font-medium h-9 gap-1"
                    >
                        {isAddingExp ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {isAddingExp ? 'Cancel' : 'Add Experience'}
                    </Button>
                </div>

                {isAddingExp && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-blue-100 mb-6 space-y-4 animate-in slide-in-from-top-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Role / Job Title</Label>
                                <Input
                                    value={newExp.role}
                                    onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                                    placeholder="e.g. Senior Product Designer"
                                    className="bg-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Company</Label>
                                <Input
                                    value={newExp.company}
                                    onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                                    placeholder="e.g. Google"
                                    className="bg-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Dates</Label>
                            <Input
                                value={newExp.dates}
                                onChange={(e) => setNewExp({ ...newExp, dates: e.target.value })}
                                placeholder="e.g. Jan 2022 - Present"
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={newExp.description}
                                onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                                placeholder="Briefly describe your responsibilities and achievements..."
                                className="bg-white min-h-[80px]"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsAddingExp(false)} className="bg-white">Cancel</Button>
                            <Button onClick={handleAddExperience} className="bg-blue-600 text-white hover:bg-blue-700">Add Experience</Button>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {data.experiences?.map((exp: any, index: number) => (
                        <div key={index} className="border border-gray-100 rounded-xl p-4 flex gap-4 hover:border-blue-200 transition-colors group relative">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg shrink-0 uppercase">
                                {exp.company?.substring(0, 2) || 'CO'}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900">{exp.role}</h4>
                                <p className="text-sm text-gray-500">{exp.company}</p>
                                <p className="text-xs text-gray-400 uppercase font-medium mt-1">{exp.dates}</p>
                                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeExperience(index)}
                                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {(!data.experiences || data.experiences.length === 0) && !isAddingExp && (
                        <div className="text-center py-6 text-gray-400 text-sm">No experience added yet.</div>
                    )}
                </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                    <Button
                        variant="ghost"
                        onClick={() => setIsAddingEdu(!isAddingEdu)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm font-medium h-9 gap-1"
                    >
                        {isAddingEdu ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {isAddingEdu ? 'Cancel' : 'Add Education'}
                    </Button>
                </div>

                {isAddingEdu && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-blue-100 mb-6 space-y-4 animate-in slide-in-from-top-2">
                        <div className="space-y-2">
                            <Label>School / University</Label>
                            <Input
                                value={newEdu.school}
                                onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })}
                                placeholder="e.g. Stanford University"
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Degree / Field of Study</Label>
                            <Input
                                value={newEdu.degree}
                                onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                                placeholder="e.g. Bachelor of Computer Science"
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Year</Label>
                            <Input
                                value={newEdu.year}
                                onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
                                placeholder="e.g. 2018 - 2022"
                                className="bg-white"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsAddingEdu(false)} className="bg-white">Cancel</Button>
                            <Button onClick={handleAddEducation} className="bg-blue-600 text-white hover:bg-blue-700">Add Education</Button>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {data.education?.map((edu: any, index: number) => (
                        <div key={index} className="border border-gray-100 rounded-xl p-4 flex gap-4 hover:border-blue-200 transition-colors group relative">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 shrink-0">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900">{edu.school}</h4>
                                <p className="text-sm text-gray-500">{edu.degree}</p>
                                <p className="text-xs text-gray-400 uppercase font-medium mt-1">{edu.year}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeEducation(index)}
                                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {(!data.education || data.education.length === 0) && !isAddingEdu && (
                        <div className="text-center py-6 text-gray-400 text-sm">No education added yet.</div>
                    )}
                </div>
            </div>

            {/* Languages Section */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Languages
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                    {data.languages?.map((lang: any, index: number) => {
                        const badgeColors = [
                            "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-300",
                            "bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-300",
                            "bg-green-50 text-green-700 border-green-200 hover:border-green-300",
                            "bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300",
                            "bg-pink-50 text-pink-700 border-pink-200 hover:border-pink-300",
                        ];
                        const colorClass = badgeColors[index % badgeColors.length];
                        return (
                            <div
                                key={index}
                                className={`flex items-center gap-2 pl-4 pr-2 py-1.5 border rounded-full shadow-sm group transition-all hover:scale-105 ${colorClass}`}
                            >
                                <span className="text-sm font-semibold">{lang.name}</span>

                                <button
                                    onClick={() => removeLanguage(index)}
                                    className={`w-5 h-5 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors ml-1`}
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )
                    })}
                </div>

                <div className="flex gap-2 mt-4">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Languages className="w-4 h-4" />
                        </span>

                        <Input
                            placeholder="Add language e.g. German"
                            className="bg-gray-50/50 border-gray-200 pl-9 h-11 rounded-xl"
                            value={newLangName}
                            onChange={(e) => setNewLangName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddLanguage()}
                        />
                    </div>

                    <Button
                        onClick={handleAddLanguage}
                        className="h-11 w-12 shrink-0 rounded-xl bg-blue-600 px-0 text-white shadow-lg shadow-gray-900/10 hover:bg-blue-700"
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Interests Section */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Interests</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                    {data.interests?.map((interest: string, index: number) => {
                        const badgeColors = [
                            "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-300",
                            "bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-300",
                            "bg-green-50 text-green-700 border-green-200 hover:border-green-300",
                            "bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300",
                            "bg-pink-50 text-pink-700 border-pink-200 hover:border-pink-300",
                        ];
                        const colorClass = badgeColors[(index + 2) % badgeColors.length]; // Offset for variety

                        return (
                            <div key={index} className={`flex items-center gap-2 pl-4 pr-2 py-1.5 border rounded-full shadow-sm group transition-all hover:scale-105 ${colorClass}`}>
                                <span className="text-sm font-semibold">{interest}</span>
                                <button
                                    onClick={() => removeInterest(index)}
                                    className={`w-5 h-5 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors ml-1`}
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )
                    })}
                </div>

                <div className="flex gap-2 mt-4">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Heart className="w-4 h-4" />
                        </span>
                        <Input
                            placeholder="Add interest (e.g. AI in UX)"
                            className="bg-gray-50/50 border-gray-200 pl-9 h-11 rounded-xl"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()}
                        />
                    </div>
                    <Button
                        onClick={handleAddInterest}
                        className="h-11 w-12 shrink-0 rounded-xl bg-blue-600 px-0 text-white shadow-lg shadow-gray-900/10 hover:bg-blue-700"
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Project History */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Project History</h3>
                    <Button
                        variant="ghost"
                        onClick={() => setIsAddingProject(!isAddingProject)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm font-medium h-9 gap-1"
                    >
                        {isAddingProject ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {isAddingProject ? 'Cancel' : 'Add Project'}
                    </Button>
                </div>

                {isAddingProject && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-blue-100 mb-6 space-y-4 animate-in slide-in-from-top-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Project Name</Label>
                                <Input
                                    value={newProject.name}
                                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                    placeholder="e.g. E-Learning App"
                                    className="bg-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Your Role</Label>
                                <Input
                                    value={newProject.role}
                                    onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                                    placeholder="e.g. Lead Designer"
                                    className="bg-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                placeholder="Describe the project and your impact..."
                                className="bg-white min-h-[80px]"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsAddingProject(false)} className="bg-white">Cancel</Button>
                            <Button onClick={handleAddProject} className="bg-blue-600 text-white hover:bg-blue-700">Add Project</Button>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {data.projects?.map((proj: any, index: number) => (
                        <div key={index} className="border border-gray-100 rounded-xl p-4 relative group hover:border-blue-200 transition-colors">
                            <h4 className="font-bold text-gray-900">{proj.name}</h4>
                            <p className="text-xs font-bold text-blue-600 mt-0.5">{proj.role}</p>
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{proj.description}</p>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeProject(index)}
                                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {(!data.projects || data.projects.length === 0) && !isAddingProject && (
                        <div className="text-center py-6 text-gray-400 text-sm">No projects added yet.</div>
                    )}
                </div>
            </div>

            {/* Resume / CV */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Resume / CV</h3>

                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.doc"
                    onChange={handleChange}
                />

                {!data.resume ? (
                    <div
                        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group
                            ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50 bg-gray-50/30'}
                        `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                    >
                        <div className={`w-12 h-12 border rounded-full flex items-center justify-center mb-3 transition-all shadow-sm
                             ${dragActive ? 'bg-blue-100 border-blue-200 text-blue-600 scale-110' : 'bg-white border-gray-100 text-gray-400 group-hover:bg-white group-hover:scale-110'}
                        `}>
                            <Upload className="w-5 h-5" />
                        </div>
                        <p className={`font-medium transition-colors ${dragActive ? 'text-blue-700' : 'text-gray-900'}`}>
                            {dragActive ? 'Drop your resume here' : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOCX up to 10MB</p>
                    </div>
                ) : (
                    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between group hover:border-blue-200 transition-all bg-white">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 text-sm truncate max-w-[200px] sm:max-w-xs">
                                    {data.resume.name || 'Resume.pdf'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {data.resume.size || 'Unknown size'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                onClick={removeResume}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfessionalTab
