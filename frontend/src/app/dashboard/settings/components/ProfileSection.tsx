"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Mail, Phone, Calendar, MapPin, Loader2, X, Check } from "lucide-react"
import apiClient from "@/lib/api-client"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { ImageWithBlur } from "@/components/ui/ImageWithBlur"

export function ProfileSection() {
    const { data: session, status, update } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dob: "",
        gender: "Select",
        address: "",
        bio: "",
        avatar: ""
    })
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Phone verification state
    const [showPhoneModal, setShowPhoneModal] = useState(false)
    const [newPhoneNumber, setNewPhoneNumber] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [isSendingOtp, setIsSendingOtp] = useState(false)
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
    const [otpTimer, setOtpTimer] = useState(0)

    // Date display state for manual entry
    const [dobDisplay, setDobDisplay] = useState("")

    useEffect(() => {
        if (session?.user) {
            const [firstName, ...lastNameParts] = (session.user.name || "").split(" ")
            setFormData(prev => ({
                ...prev,
                firstName: prev.firstName || firstName || "",
                lastName: prev.lastName || lastNameParts.join(" ") || "",
                email: prev.email || session.user?.email || "",
                avatar: prev.avatar || session.user?.image || ""
            }))
            if (!profileImage) setProfileImage(session.user.image || null)
        }
        if (status === "authenticated") {
            fetchProfile()
        }
    }, [session, status])

    useEffect(() => {
        if (otpTimer > 0) {
            const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [otpTimer])

    const fetchProfile = async () => {
        setIsLoading(true)
        try {
            const response = await apiClient.get('/users/profile')
            const user = response.data

            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                dob: user.dob || "",
                gender: user.gender || "Select",
                address: user.address || "",
                bio: user.bio || "",
                avatar: user.avatar || ""
            })
            setProfileImage(user.avatar || null)

            // Set display format for date
            if (user.dob) {
                setDobDisplay(new Date(user.dob).toLocaleDateString('en-GB').split('/').join('-'))
            }
        } catch (error: any) {
            console.error("ProfileSection: Error fetching profile:", error)

            // Use the enhanced error message from API client
            const errorMessage = (error as any).userMessage || error.response?.data?.message || "Failed to load profile details"
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemovePhoto = () => {
        setProfileImage(null)
        setSelectedFile(null)
        setFormData(prev => ({ ...prev, avatar: "" }))
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleSave = async () => {
        console.log("handleSave: Starting save process...");
        setIsSaving(true)
        try {
            console.log("handleSave: Creating FormData...");
            const data = new FormData()
            data.append('dob', formData.dob)
            data.append('gender', formData.gender)
            data.append('address', formData.address)
            data.append('bio', formData.bio)

            if (selectedFile) {
                console.log("handleSave: Appending photo file:", {
                    name: selectedFile.name,
                    size: selectedFile.size,
                    type: selectedFile.type
                });
                data.append('avatar', selectedFile)
            } else if (profileImage === null) {
                console.log("handleSave: Appending empty avatar for removal");
                data.append('avatar', "")
            }

            console.log("handleSave: Sending PATCH request to /users/profile...");
            const response = await apiClient.patch('/users/profile', data)
            console.log("handleSave: Response received:", response.data);

            setSelectedFile(null)
            toast.success("Profile updated successfully")

            console.log("handleSave: Fetching updated profile...");
            await fetchProfile()

            // Update NextAuth session to reflect changes across the site immediately
            console.log("handleSave: Updating NextAuth session...");
            if (session?.user && update) {
                try {
                    // In NextAuth v4, update() accepts partial session updates
                    await update({
                        user: {
                            image: response.data.avatar,
                            name: `${response.data.firstName} ${response.data.lastName}`,
                        }
                    });
                    console.log("handleSave: Session update called, new image:", response.data.avatar);

                    // Force a session refetch to ensure all components see the update
                    setTimeout(async () => {
                        const { data: newSession } = await fetch('/api/auth/session').then(r => r.json());
                        console.log("handleSave: Session refetched after update:", newSession?.user?.image);
                    }, 500);
                } catch (updateError) {
                    console.error("handleSave: Session update failed", updateError);
                }
            }

            console.log("handleSave: Complete!");
        } catch (error: any) {
            console.error("handleSave: Error occurred", {
                message: error.message,
                response: error.response,
                status: error.response?.status,
                data: error.response?.data
            })
            toast.error(error.response?.data?.message || "Failed to update profile")
        } finally {
            console.log("handleSave: Setting isSaving to false");
            setIsSaving(false)
        }
    }

    const handleSendOtp = async () => {
        console.log("handleSendOtp: Starting with phone:", newPhoneNumber);

        if (!newPhoneNumber || newPhoneNumber.length < 10) {
            toast.error("Please enter a valid phone number")
            return
        }

        setIsSendingOtp(true)
        try {
            console.log("handleSendOtp: Sending POST request to /otp/phone/send-otp");
            const response = await apiClient.post('/otp/phone/send-otp', { phoneNumber: newPhoneNumber })
            console.log("handleSendOtp: Success!", response.data);
            setOtpSent(true)
            setOtpTimer(30)
            toast.success("OTP sent successfully!")
        } catch (error: any) {
            console.error("handleSendOtp: Error occurred", {
                message: error.message,
                response: error.response,
                status: error.response?.status,
                data: error.response?.data
            });
            toast.error(error.response?.data?.message || "Failed to send OTP")
        } finally {
            setIsSendingOtp(false)
        }
    }

    const handleVerifyOtp = async () => {
        console.log("handleVerifyOtp: Starting verification...", { phoneNumber: newPhoneNumber, otp });

        if (!otp || otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP")
            return
        }

        setIsVerifyingOtp(true)
        try {
            console.log("handleVerifyOtp: Sending verification request...");
            // Verify OTP
            const verifyResponse = await apiClient.post('/auth/verify-pre-login', {
                phoneNumber: newPhoneNumber,
                otp
            })
            console.log("handleVerifyOtp: Verification response:", verifyResponse.data);

            if (verifyResponse.data.verified || verifyResponse.data.success) {
                console.log("handleVerifyOtp: OTP verified successfully, updating phone number...");

                // Update the phone number in the backend
                const updateData = new FormData()
                updateData.append('phoneNumber', newPhoneNumber)

                const updateResponse = await apiClient.patch('/users/profile', updateData)
                console.log("handleVerifyOtp: Phone update response:", updateResponse.data);

                // Update local state
                setFormData(prev => ({ ...prev, phoneNumber: newPhoneNumber }))

                // Close modal and reset
                setShowPhoneModal(false)
                setNewPhoneNumber("")
                setOtp("")
                setOtpSent(false)
                setOtpTimer(0)

                toast.success("Phone number updated successfully!")

                // Refresh profile
                await fetchProfile()
            } else {
                console.log("handleVerifyOtp: OTP verification failed", verifyResponse.data);
                toast.error("Invalid OTP. Please try again.")
            }
        } catch (error: any) {
            console.error("handleVerifyOtp: Error occurred", {
                message: error.message,
                response: error.response,
                status: error.response?.status,
                data: error.response?.data
            })
            toast.error(error.response?.data?.message || "Failed to verify OTP")
        } finally {
            setIsVerifyingOtp(false)
        }
    }

    const closePhoneModal = () => {
        setShowPhoneModal(false)
        setNewPhoneNumber("")
        setOtp("")
        setOtpSent(false)
        setOtpTimer(0)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        )
    }

    return (
        <div id="account" className="animate-in fade-in duration-500 scroll-mt-20">
            <div className="mb-10 pb-8 border-b border-slate-100">
                <h2 className="text-3xl font-semibold text-slate-900 mb-1">Profile Information</h2>
                <p className="text-slate-500 text-base">Update your personal details and public profile.</p>
            </div>

            <div className="space-y-12">
                <div className="flex items-center gap-8">
                    <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-50 ring-1 ring-slate-100 shrink-0">
                        {profileImage ? (
                            <div className="relative w-full h-full">
                                <ImageWithBlur
                                    src={profileImage}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <User className="w-14 h-14" />
                            </div>
                        )}
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-slate-900">Profile Photo</h3>
                        <p className="text-sm text-slate-500 font-medium">Recommended: 400x400px, JPG or PNG.</p>
                        <div className="flex gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                variant="outline"
                                className="h-10 px-6 bg-[#EFF6FF] border-transparent text-[#2563EB] hover:bg-blue-100 rounded-xl text-[13px] font-bold transition-all shadow-sm shadow-blue-50"
                            >
                                Change Photo
                            </Button>
                            <Button
                                onClick={handleRemovePhoto}
                                variant="ghost"
                                className="font-bold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl h-10 px-4 transition-all"
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div className="space-y-2.5">
                        <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative group opacity-70">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <User className="w-4 h-4" />
                            </div>
                            <Input
                                readOnly
                                value={`${formData.firstName} ${formData.lastName}`}
                                className="bg-[#F8FAFC] border-slate-100 h-12 rounded-xl pl-11 pr-4 text-[14px] text-slate-500 font-semibold cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group opacity-70">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Mail className="w-4 h-4" />
                            </div>
                            <Input
                                readOnly
                                value={formData.email}
                                className="bg-[#F8FAFC] border-slate-100 h-12 rounded-xl pl-11 pr-4 text-[14px] text-slate-500 font-semibold cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="relative group opacity-70">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Phone className="w-4 h-4" />
                            </div>
                            <Input
                                readOnly
                                value={formData.phoneNumber || "Not provided"}
                                className="bg-[#F8FAFC] border-slate-100 h-12 rounded-xl pl-11 pr-20 text-[14px] text-slate-500 font-semibold cursor-not-allowed"
                            />
                            <button
                                onClick={() => setShowPhoneModal(true)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors px-2 py-1 hover:bg-blue-50 rounded-lg"
                            >
                                {formData.phoneNumber ? "Change" : "Add"}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest ml-1">Date of Birth</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none z-10">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <Input
                                type="text"
                                value={dobDisplay}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const prevValue = dobDisplay;

                                    // Remove all non-numeric characters first
                                    let digitsOnly = inputValue.replace(/[^0-9]/g, '');

                                    // Limit to 8 digits (ddmmyyyy)
                                    digitsOnly = digitsOnly.slice(0, 8);

                                    // Auto-format as dd-mm-yyyy
                                    let formatted = '';
                                    if (digitsOnly.length > 0) {
                                        formatted = digitsOnly.slice(0, 2);
                                        if (digitsOnly.length >= 3) {
                                            formatted += '-' + digitsOnly.slice(2, 4);
                                        }
                                        if (digitsOnly.length >= 5) {
                                            formatted += '-' + digitsOnly.slice(4, 8);
                                        }
                                    }

                                    // Update display value
                                    setDobDisplay(formatted);

                                    // Convert dd-mm-yyyy to yyyy-mm-dd for storage when complete
                                    if (digitsOnly.length === 8) {
                                        const day = digitsOnly.slice(0, 2);
                                        const month = digitsOnly.slice(2, 4);
                                        const year = digitsOnly.slice(4, 8);
                                        const isoDate = `${year}-${month}-${day}`;

                                        // Validate date
                                        const date = new Date(isoDate);
                                        if (!isNaN(date.getTime())) {
                                            setFormData({ ...formData, dob: isoDate });
                                        }
                                    } else {
                                        // Clear formData if incomplete
                                        if (formData.dob) {
                                            setFormData({ ...formData, dob: '' });
                                        }
                                    }
                                }}
                                placeholder="dd-mm-yyyy"
                                className="bg-[#F8FAFC] border-slate-100 h-12 rounded-xl pl-11 pr-12 text-[14px] text-slate-700 font-semibold placeholder:text-slate-300 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all shadow-sm block w-full"
                            />
                            {/* Hidden date input for calendar picker */}
                            <input
                                type="date"
                                value={formData.dob}
                                onChange={(e) => {
                                    setFormData({ ...formData, dob: e.target.value });
                                    // Update display when calendar is used
                                    if (e.target.value) {
                                        setDobDisplay(new Date(e.target.value).toLocaleDateString('en-GB').split('/').join('-'));
                                    }
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 w-8 h-8 cursor-pointer"
                                style={{ colorScheme: 'light' }}
                            />
                            {/* Calendar icon button that triggers the hidden date picker */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const dateInput = e.currentTarget.parentElement?.querySelector('input[type="date"]') as HTMLInputElement;
                                    if (dateInput) {
                                        dateInput.showPicker?.();
                                    }
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-blue-50 z-10"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest ml-1">Gender</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                <User className="w-4 h-4" />
                            </div>
                            <select
                                className="w-full h-12 bg-[#F8FAFC] border border-slate-100 rounded-xl pl-11 pr-10 text-[14px] text-slate-700 font-semibold appearance-none outline-none hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all shadow-sm"
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            >
                                <option value="Select">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest ml-1">Address</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <Input
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="City, State - Zip"
                                className="bg-[#F8FAFC] border-slate-100 h-12 rounded-xl pl-11 pr-4 text-[14px] text-slate-700 font-semibold placeholder:text-slate-300 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest ml-1">About / Bio</label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full min-h-[140px] p-5 rounded-2xl border border-slate-100 bg-[#F8FAFC] text-[14px] text-slate-700 font-semibold placeholder:text-slate-300 hover:border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all shadow-sm resize-none"
                        placeholder="Tell us about yourself..."
                    />
                </div>
            </div>

            <div className="flex justify-end items-center gap-6 mt-12 pt-8 border-t border-slate-50">
                <button
                    onClick={() => fetchProfile()}
                    className="text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                    Cancel
                </button>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-11 px-8 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-100 transition-all transform active:scale-[0.98] disabled:opacity-70"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </div>

            {/* Phone Verification Modal */}
            {showPhoneModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closePhoneModal} />
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8  animate-in zoom-in-95 duration-200">
                        <button
                            onClick={closePhoneModal}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                {formData.phoneNumber ? "Change Phone Number" : "Add Phone Number"}
                            </h3>
                            <p className="text-sm text-slate-500">
                                {otpSent ? "Enter the OTP sent to your phone" : "Verify your phone number with OTP"}
                            </p>
                        </div>

                        {!otpSent ? (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                                    <Input
                                        type="tel"
                                        value={newPhoneNumber}
                                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                                        placeholder="+91 1234567890"
                                        className="h-12 text-base"
                                    />
                                </div>
                                <Button
                                    onClick={handleSendOtp}
                                    disabled={isSendingOtp}
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                                >
                                    {isSendingOtp ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Sending OTP...
                                        </>
                                    ) : (
                                        "Send OTP"
                                    )}
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Enter OTP</label>
                                    <Input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="000000"
                                        maxLength={6}
                                        className="h-12 text-center text-2xl tracking-widest font-bold"
                                    />
                                </div>
                                <Button
                                    onClick={handleVerifyOtp}
                                    disabled={isVerifyingOtp}
                                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl"
                                >
                                    {isVerifyingOtp ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4 mr-2" />
                                            Verify & Update
                                        </>
                                    )}
                                </Button>
                                <button
                                    onClick={handleSendOtp}
                                    disabled={otpTimer > 0 || isSendingOtp}
                                    className="w-full text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:text-slate-400 transition-colors"
                                >
                                    {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
