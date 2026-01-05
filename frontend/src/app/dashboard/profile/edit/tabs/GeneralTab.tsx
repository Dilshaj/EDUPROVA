import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Camera, MapPin, Mail, Phone, User, Image as ImageIcon, Trash2, Upload } from 'lucide-react'
import FluidBanner from '../banners/FluidBanner'
import PremiumBanner, { PremiumBannerType } from '../banners/premium/PremiumBanner'
import { BANNER_PRESETS, ALL_BANNERS, type BannerInfo } from '../banners/bannerConstants'


interface GeneralTabProps {
    data: any
    updateData: (data: any) => void
}



const AVATAR_PRESETS = [
    "/avatars/anime-hacker-male.jpg",
    "/avatars/anime-glasses-male.jpg",
    "/avatars/anime-warrior-male.jpg",
    "/avatars/anime-warrior-female.jpg",
    "/avatars/anime-tech-female.jpg",

]

const GeneralTab = ({ data, updateData }: GeneralTabProps) => {
    const profilePicRef = useRef<HTMLInputElement>(null)
    const coverPicRef = useRef<HTMLInputElement>(null)
    const [bannerType, setBannerType] = useState<'static' | 'live'>('static')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (event) => {
                if (event.target?.result) {
                    updateData({ [field]: event.target.result })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDeleteProfilePic = () => {
        updateData({ profilePicture: "" })
    }

    return (
        <div className="space-y-6">
            {/* Profile Images Section */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Images</h3>

                <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100 mb-8">
                    {/* ... Profile Photo ... */}
                    {/* Keeping existing Profile Photo code here, just updating context */}
                    <Label className="block text-sm font-medium text-gray-700 mb-4">Profile Photo</Label>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                                {data.profilePicture ? (
                                    <img src={data.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        <User className="w-12 h-12 opacity-50" />
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => profilePicRef.current?.click()}
                                    className="h-9"
                                >
                                    Change Photo
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleDeleteProfilePic}
                                    className="h-9 w-9 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                    disabled={!data.profilePicture}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                                <input
                                    ref={profilePicRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'profilePicture')}
                                />
                            </div>
                        </div>

                        <div className="flex-1">
                            <Label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3 block">Or Choose an Avatar</Label>
                            <div className="flex flex-wrap gap-4">
                                {AVATAR_PRESETS.map((url, index) => (
                                    <button
                                        key={index}
                                        onClick={() => updateData({ profilePicture: url })}
                                        className={`relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 transition-all hover:scale-105 ${data.profilePicture === url ? 'border-blue-500 ring-2 ring-blue-200 scale-105' : 'border-transparent hover:border-blue-200'
                                            }`}
                                    >
                                        <img src={url} alt={`Avatar ${index}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cover Photo */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <Label className="block text-sm font-medium text-gray-700">Cover Banner</Label>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setBannerType('static')}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${bannerType === 'static' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Static
                            </button>
                            <button
                                onClick={() => setBannerType('live')}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${bannerType === 'live' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Live (Motion)
                            </button>
                        </div>
                    </div>

                    <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden mb-4 group ring-1 ring-gray-200">
                        {data.coverBanner?.startsWith('fluid:') ? (
                            <FluidBanner type={ALL_BANNERS.find(b => b.id === data.coverBanner)?.type as any} />
                        ) : data.coverBanner?.startsWith('premium:') ? (
                            <PremiumBanner type={ALL_BANNERS.find(b => b.id === data.coverBanner)?.type as PremiumBannerType} />
                        ) : (
                            <img
                                src={data.coverBanner || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=80"}
                                alt="Cover"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="bg-white/90 hover:bg-white text-gray-900 font-medium"
                                onClick={() => coverPicRef.current?.click()}
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Custom
                            </Button>
                        </div>
                        <input
                            ref={coverPicRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'coverBanner')}
                        />
                    </div>

                    {/* Banner Presets */}
                    <div className="space-y-3">
                        <Label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            {bannerType === 'static' ? 'Future Tech & Automotive' : 'Dynamic Motion Gradients'}
                        </Label>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {bannerType === 'static' ? (
                                BANNER_PRESETS.map((url, index) => (
                                    <button
                                        key={index}
                                        onClick={() => updateData({ coverBanner: url })}
                                        className={`relative w-28 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${data.coverBanner === url ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-300'}`}
                                    >
                                        <img src={url} alt={`Preset ${index}`} className="w-full h-full object-cover" />
                                    </button>
                                ))
                            ) : (
                                ALL_BANNERS.map((visual, index) => (
                                    <button
                                        key={visual.id}
                                        onClick={() => updateData({ coverBanner: visual.id })}
                                        className={`relative w-28 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all group/btn ${data.coverBanner === visual.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-300'}`}
                                    >
                                        <img src={visual.preview} alt={visual.id} className="w-full h-full object-cover" />
                                        {(visual.name || visual.role) && (
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/btn:opacity-100 transition-opacity flex flex-col items-center justify-center p-1 text-center">
                                                {visual.name && <span className="text-[10px] font-bold text-white uppercase tracking-wider">{visual.name}</span>}
                                                {visual.role && <span className="text-[8px] text-gray-300">{visual.role}</span>}
                                            </div>
                                        )}
                                        {data.coverBanner === visual.id && (
                                            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white" />
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input
                            value={data.firstName || ''}
                            onChange={(e) => updateData({ firstName: e.target.value })}
                            placeholder="e.g. Varahanarasimha"
                            className="bg-gray-50/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input
                            value={data.lastName || ''}
                            onChange={(e) => updateData({ lastName: e.target.value })}
                            placeholder="e.g. Logisa"
                            className="bg-gray-50/50"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Mail className="w-4 h-4" />
                            </span>
                            <Input
                                value={data.email || ''}
                                onChange={(e) => updateData({ email: e.target.value })}
                                placeholder="name@example.com"
                                className="pl-9 bg-gray-50/50"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Phone className="w-4 h-4" />
                            </span>
                            <Input
                                value={data.phone || ''}
                                onChange={(e) => updateData({ phone: e.target.value })}
                                placeholder="+91 98765 43210"
                                className="pl-9 bg-gray-50/50"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mb-6">
                    <Label>Location</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <MapPin className="w-4 h-4" />
                        </span>
                        <Input
                            value={data.location || ''}
                            onChange={(e) => updateData({ location: e.target.value })}
                            placeholder="City, Country"
                            className="pl-9 bg-gray-50/50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Bio / About Me</Label>
                    <Textarea
                        value={data.bio || ''}
                        onChange={(e) => updateData({ bio: e.target.value })}
                        placeholder="Tell us a little about yourself..."
                        className="bg-gray-50/50 min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500 text-right">
                        {(data.bio || '').length}/500 characters
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GeneralTab
