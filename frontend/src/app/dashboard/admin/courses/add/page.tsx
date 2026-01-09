'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Save, ChevronDown, Image as ImageIcon, PlayCircle, Plus, Trash2, GripVertical, CheckCircle2, Info, X, FileText, DollarSign, Sparkles, Check, Circle, Send, Star, Pencil, Search, Tag, Wallet, Percent, Home, Eye, Monitor } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';


const CustomDropdown = ({
    label,
    options,
    value,
    onChange,
    name
}: {
    label: string,
    options: string[],
    value: string,
    onChange: (name: string, value: string) => void,
    name: string
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {label && (
                <label className="block text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1 mb-4">
                    {label}
                </label>
            )}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-8 py-3.5 bg-white border ${isOpen ? 'border-indigo-400 ring-4 ring-indigo-500/10' : 'border-slate-200'} rounded-xl cursor-pointer flex items-center justify-between transition-all`}
            >
                <span className="text-slate-700 text-sm font-medium">{value}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div
                    onWheel={(e) => e.stopPropagation()}
                    className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 max-h-60 overflow-y-auto thin-scrollbar"
                >
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => {
                                onChange(name, option);
                                setIsOpen(false);
                            }}
                            className={`px-8 py-3 text-sm font-medium cursor-pointer transition-colors ${value === option ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-blue-400 hover:text-white'
                                }`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const SuccessView = ({ onGoToDashboard }: { onGoToDashboard: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Icon animation
        tl.fromTo(iconRef.current,
            { scale: 0, opacity: 0, rotate: -45 },
            { scale: 1, opacity: 1, rotate: 0, duration: 4.0, ease: 'back.out(1.2)' }
        );

        // BG effect animation
        tl.to(bgRef.current, {
            opacity: 0.8,
            scale: 1.5,
            duration: 3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        }, 0);

        // Floating particles or secondary bg elements
        gsap.to('.bg-particle', {
            y: 'random(-20, 20)',
            x: 'random(-20, 20)',
            duration: 'random(2, 4)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.2
        });

        // Text content animation
        tl.from('.success-content > *', {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out'
        }, 1.2);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 z-100 flex items-center justify-center bg-white overflow-hidden">
            <div ref={bgRef} className="absolute w-[800px] h-[800px] bg-linear-to-br from-indigo-500/5 via-purple-500/5 to-emerald-500/5 rounded-full blur-[120px] opacity-0 scale-75" />
            <div className="bg-particle absolute top-[20%] left-[15%] w-32 h-32 bg-yellow-200/20 rounded-full blur-3xl" />
            <div className="bg-particle absolute bottom-[25%] right-[10%] w-48 h-48 bg-indigo-200/20 rounded-full blur-[100px]" />
            <div className="bg-particle absolute top-[60%] left-[5%] w-24 h-24 bg-emerald-200/20 rounded-full blur-2xl" />
            <div className="relative z-10 text-center space-y-10 max-w-xl px-8 success-content">
                <div ref={iconRef} className="relative inline-block z-20 mb-12">
                    <div className="w-28 h-28 rounded-full bg-emerald-50 flex items-center justify-center relative z-10">
                        <div className="w-22 h-22 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Check className="w-12 h-12 text-emerald-500 stroke-[4px]" />
                        </div>
                    </div>
                    <div className="absolute -top-1 -left-1 w-5 h-5 bg-yellow-300 rounded-full opacity-60 border-4 border-white shadow-sm" />
                    <div className="absolute top-2 -right-3 w-4 h-4 bg-indigo-400 rounded-full opacity-60 border-4 border-white shadow-sm" />
                </div>
                <div className="space-y-6">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">You&apos;re Live!</h1>
                    <p className="text-slate-500 font-bold text-lg leading-relaxed px-4">Your course has been successfully submitted and is now under review. You&apos;ll receive an email once it&apos;s published.</p>
                </div>
                <button onClick={onGoToDashboard} className="inline-flex items-center gap-4 px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all hover:bg-slate-800 hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-100 group">
                    <Home className="w-5 h-5 text-indigo-400 opacity-50 group-hover:opacity-100 transition-all duration-300" />
                    Go to Dashboard
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
};

interface CourseFormData {
    title: string;
    subtitle: string;
    category: string;
    level: string;
    language: string;
    description: string;
    currency: string;
    originalPrice: string;
    discountedPrice: string;
    thumbnail: string | null;
    video: string | null;
    bundleDiscount: string | null;
}

interface Lecture {
    id: number;
    title: string;
    description: string;
    video: string | null;
    videoName: string | null;
    coverImage: string | null;
    freePreview: boolean;
    isUploading?: boolean;
    uploadProgress?: number;
}

interface CurriculumSection {
    id: number;
    title: string;
    lectures: Lecture[];
}

export default function AddCoursePage() {
    const STORAGE_KEY = 'eduprova_add_course_data';
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isLoaded, setIsLoaded] = useState(false);

    const [activeStep, setActiveStep] = useState<number>(0);
    const [formData, setFormData] = useState<CourseFormData>({
        title: '',
        subtitle: '',
        category: 'Development',
        level: 'Beginner',
        language: 'English',
        description: '',
        currency: 'USD',
        originalPrice: '',
        discountedPrice: '',
        thumbnail: null,
        video: null,
        bundleDiscount: null
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFinalReview, setIsFinalReview] = useState<boolean>(false);
    const [isBundleEnabled, setIsBundleEnabled] = useState<boolean>(false);
    const [bundleCourses, setBundleCourses] = useState<string[]>(['']);
    const [curriculumSections, setCurriculumSections] = useState<CurriculumSection[]>([
        { id: 1, title: '', lectures: [] }
    ]);
    const [expandedSectionId, setExpandedSectionId] = useState<number | null>(1);
    const [learningPoints, setLearningPoints] = useState<string[]>(['']);
    const [requirements, setRequirements] = useState<string[]>(['']);
    const [courseIncludes, setCourseIncludes] = useState<string[]>(['']);

    // Bundle Search State
    const [bundleSearchQuery, setBundleSearchQuery] = useState('');
    const [isSearchingBundle, setIsSearchingBundle] = useState(false);
    const mockLibraryCourses = [
        { id: 'c1', title: 'Modern JavaScript (ES6+)', level: 'Intermediate', originalPrice: '89', category: 'Development' },
        { id: 'c2', title: 'Advanced React Patterns', level: 'Expert', originalPrice: '129', category: 'Development' },
        { id: 'c3', title: 'UI/UX Design Masterclass', level: 'Beginner', originalPrice: '79', category: 'Design' },
        { id: 'c4', title: 'Node.js Backend Bootcamp', level: 'Intermediate', originalPrice: '119', category: 'Development' }
    ];
    const [addedBundleCourses, setAddedBundleCourses] = useState<any[]>([]);

    const [isUploadingVideo, setIsUploadingVideo] = useState(false);
    const [videoUploadProgress, setVideoUploadProgress] = useState(0);
    const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);

    const generateVideoThumbnail = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = URL.createObjectURL(file);
            video.muted = true;
            video.playsInline = true;

            video.onloadedmetadata = () => {
                video.currentTime = 1;
            };

            video.onseeked = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
                const thumbnail = canvas.toDataURL('image/jpeg');
                URL.revokeObjectURL(video.src);
                resolve(thumbnail);
            };
        });
    };

    // Initial load from session storage
    useEffect(() => {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.formData) setFormData(data.formData);
                if (data.activeStep !== undefined) setActiveStep(data.activeStep);
                if (data.isFinalReview !== undefined) setIsFinalReview(data.isFinalReview);
                if (data.isBundleEnabled !== undefined) setIsBundleEnabled(data.isBundleEnabled);
                if (data.bundleCourses) setBundleCourses(data.bundleCourses);
                if (data.curriculumSections) {
                    const migratedSections = data.curriculumSections.map((s: any) => ({
                        ...s,
                        lectures: s.lectures || []
                    }));
                    setCurriculumSections(migratedSections);
                }
                if (data.learningPoints) setLearningPoints(data.learningPoints);
                if (data.requirements) setRequirements(data.requirements);
                if (data.courseIncludes) setCourseIncludes(data.courseIncludes);
                if (data.videoThumbnail) setVideoThumbnail(data.videoThumbnail);
                if (data.addedBundleCourses) setAddedBundleCourses(data.addedBundleCourses);
            } catch (e) {
                console.error('Failed to load persisted data', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to session storage whenever any state changes
    useEffect(() => {
        if (!isLoaded) return;

        const dataToSave = {
            activeStep,
            formData,
            isFinalReview,
            isBundleEnabled,
            bundleCourses,
            curriculumSections,
            learningPoints,
            requirements,
            courseIncludes,
            videoThumbnail,
            addedBundleCourses
        };
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        } catch (e) {
            // Handle quota exceeded or other errors
            console.warn('Failed to save data to sessionStorage', e);
        }
    }, [isLoaded, activeStep, formData, isFinalReview, isBundleEnabled, bundleCourses, curriculumSections, learningPoints, requirements, courseIncludes, videoThumbnail, addedBundleCourses]);

    // Handle clearing storage only on navigation away
    useEffect(() => {
        return () => {
            // We use a small timeout to check if we are actually at a different URL
            // because on reload, this cleanup might run but the pathname doesn't change relative to the app
            setTimeout(() => {
                if (window.location.pathname !== pathname) {
                    sessionStorage.removeItem(STORAGE_KEY);
                }
            }, 100);
        };
    }, [pathname]);

    const categories = [
        'Development',
        'Business',
        'Finance',
        'Design',
        'Marketing',
        'Lifestyle',
        'Photography',
        'Health'
    ];

    const levels = ['Beginner', 'Intermediate', 'Expert', 'All Levels'];
    const languages = ['English', 'Hindi', 'Spanish', 'French'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Comprehensive Price Validation & Fallbacks
        if (name === 'originalPrice' || name === 'discountedPrice') {
            const rawValue = value.replace(/[^0-9.]/g, ''); // Ensure only numbers and dots
            const numericValue = parseFloat(rawValue);

            setFormData(prev => {
                const listPrice = name === 'originalPrice' ? numericValue : parseFloat(prev.originalPrice || '0');
                const discPrice = name === 'discountedPrice' ? numericValue : parseFloat(prev.discountedPrice || '0');

                let updatedValue = rawValue;

                // Fallback: Prevent negative values
                if (numericValue < 0) updatedValue = '0';

                // Fallback: Discounted price cannot exceed original price
                if (name === 'discountedPrice' && !isNaN(numericValue) && !isNaN(listPrice) && numericValue > listPrice) {
                    updatedValue = prev.originalPrice;
                }

                return { ...prev, [name]: updatedValue };
            });
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDropdownChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1 && !isFinalReview) {
            setIsFinalReview(true);
        } else if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        if (isFinalReview) {
            setIsFinalReview(false);
        } else if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const isStepValid = (stepId: number) => {
        switch (stepId) {
            case 0:
                return formData.title.trim() !== '' && formData.category !== '' && formData.level !== '' && formData.description.trim() !== '';
            case 1:
                return curriculumSections.length > 0 && curriculumSections.some(s => s.title.trim() !== '');
            case 2:
                return learningPoints.some(p => p.trim() !== '') &&
                    requirements.some(r => r.trim() !== '') &&
                    courseIncludes.some(c => c.trim() !== '');
            case 3:
                return formData.originalPrice.trim() !== '';
            default:
                return true;
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSavingDraft, setIsSavingDraft] = useState(false);

    const handleSaveDraft = () => {
        setIsSavingDraft(true);
        // Add a small delay for better UX feel
        setTimeout(() => {
            try {
                const draftData = {
                    id: Date.now(),
                    title: formData.title || 'Untitled Course',
                    category: formData.category,
                    thumbnail: formData.thumbnail,
                    lastUpdated: new Date().toISOString(),
                    data: {
                        activeStep,
                        formData,
                        isFinalReview,
                        isBundleEnabled,
                        bundleCourses,
                        curriculumSections,
                        learningPoints,
                        requirements,
                        courseIncludes,
                        videoThumbnail,
                        addedBundleCourses
                    }
                };

                const existingDraftsJson = localStorage.getItem('eduprova_course_drafts');
                const existingDrafts = existingDraftsJson ? JSON.parse(existingDraftsJson) : [];

                // For simplicity, we just add a new draft. 
                // In a production app, we'd check if we're editing an existing draft.
                existingDrafts.unshift(draftData);

                // Limit to 20 drafts
                if (existingDrafts.length > 20) existingDrafts.pop();

                localStorage.setItem('eduprova_course_drafts', JSON.stringify(existingDrafts));

                // Show success feedback
                const notification = document.createElement('div');
                notification.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 animate-bounce font-bold text-sm';
                notification.innerText = '✨ Draft saved successfully!';
                document.body.appendChild(notification);
                setTimeout(() => notification.remove(), 3000);

            } catch (error) {
                console.error('Failed to save draft:', error);
                alert('Failed to save draft. Your browser storage might be full.');
            } finally {
                setIsSavingDraft(false);
            }
        }, 800);
    };

    const handleSubmit = async () => {
        // Final validation before submitting
        const allStepsValid = [0, 1, 2, 3].every(id => isStepValid(id));
        if (!allStepsValid) {
            alert('Please fill in all required details in all steps before submitting.');
            return;
        }

        setIsSubmitting(true);
        try {
            const courseData = {
                ...formData,
                originalPrice: Number(formData.originalPrice),
                discountedPrice: formData.discountedPrice ? (Number(formData.originalPrice) - Number(formData.discountedPrice)) : undefined,
                curriculum: curriculumSections.map(s => ({
                    title: s.title,
                    lectures: s.lectures.map(l => ({
                        title: l.title,
                        description: l.description,
                        video: l.video,
                        coverImage: l.coverImage,
                        freePreview: l.freePreview
                    }))
                })),
                learningPoints: learningPoints.filter(p => p.trim() !== ''),
                requirements: requirements.filter(r => r.trim() !== ''),
                courseIncludes: courseIncludes.filter(c => c.trim() !== ''),
                bundleCourses: isBundleEnabled ? addedBundleCourses.map(c => c.id) : [],
                isBundleEnabled
            };

            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Note: Auth token should be handled by interceptors or next-auth session
                },
                body: JSON.stringify(courseData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit course');
            }

            console.log('Course submitted successfully');
            sessionStorage.removeItem(STORAGE_KEY); // Clear explicitly on success
            setIsSubmitted(true);
        } catch (error: any) {
            console.error('Submission error:', error);
            alert(error.message || 'Something went wrong during submission.');
        } finally {
            setIsSubmitting(false);
        }
    };


    const addSection = () => {
        setCurriculumSections((prev: CurriculumSection[]) => [
            ...prev,
            { id: Date.now(), title: '', lectures: [] }
        ]);
    };

    const removeSection = (id: number) => {
        setCurriculumSections((prev: CurriculumSection[]) => prev.filter((s: CurriculumSection) => s.id !== id));
    };

    const updateSectionTitle = (id: number, title: string) => {
        setCurriculumSections((prev: CurriculumSection[]) => prev.map((s: CurriculumSection) => s.id === id ? { ...s, title } : s));
    };

    const addLecture = (sectionId: number) => {
        setCurriculumSections((prev: CurriculumSection[]) => prev.map((s: CurriculumSection) => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    lectures: [
                        ...s.lectures,
                        {
                            id: Date.now(),
                            title: '',
                            description: '',
                            video: null,
                            videoName: null,
                            coverImage: null,
                            freePreview: false
                        }
                    ]
                };
            }
            return s;
        }));
    };

    const removeLecture = (sectionId: number, lectureId: number) => {
        setCurriculumSections((prev: CurriculumSection[]) => prev.map((s: CurriculumSection) => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    lectures: s.lectures.filter(l => l.id !== lectureId)
                };
            }
            return s;
        }));
    };

    const updateLecture = (sectionId: number, lectureId: number, updates: Partial<Lecture>) => {
        setCurriculumSections((prev: CurriculumSection[]) => prev.map((s: CurriculumSection) => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    lectures: s.lectures.map(l => l.id === lectureId ? { ...l, ...updates } : l)
                };
            }
            return s;
        }));
    };

    const handleLearningPointChange = (index: number, value: string) => {
        const newPoints = [...learningPoints];
        newPoints[index] = value;
        setLearningPoints(newPoints);
    };

    const addLearningPoint = () => setLearningPoints([...learningPoints, '']);
    const removeLearningPoint = (index: number) => setLearningPoints(learningPoints.filter((_: string, i: number) => i !== index));

    const handleRequirementChange = (index: number, value: string) => {
        const newReqs = [...requirements];
        newReqs[index] = value;
        setRequirements(newReqs);
    };

    const addRequirement = () => setRequirements([...requirements, '']);
    const removeRequirement = (index: number) => setRequirements(requirements.filter((_: string, i: number) => i !== index));

    const handleCourseIncludesChange = (index: number, value: string) => {
        const newIncludes = [...courseIncludes];
        newIncludes[index] = value;
        setCourseIncludes(newIncludes);
    };

    const addCourseIncludesPoint = () => setCourseIncludes([...courseIncludes, '']);
    const removeCourseIncludesPoint = (index: number) => setCourseIncludes(courseIncludes.filter((_: string, i: number) => i !== index));

    const handleBundleCourseChange = (index: number, value: string) => {
        const newCourses = [...bundleCourses];
        newCourses[index] = value;
        setBundleCourses(newCourses);
    };

    const addBundleCourse = () => setBundleCourses([...bundleCourses, '']);
    const removeBundleCourse = (index: number) => setBundleCourses(bundleCourses.filter((_: string, i: number) => i !== index));

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const newSections = [...curriculumSections];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= newSections.length) return;
        [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
        setCurriculumSections(newSections);
    };

    const moveLecture = (sectionId: number, lectureIndex: number, direction: 'up' | 'down') => {
        setCurriculumSections(prev => prev.map(s => {
            if (s.id === sectionId) {
                const newLectures = [...(s.lectures || [])];
                const newIndex = direction === 'up' ? lectureIndex - 1 : lectureIndex + 1;
                if (newIndex < 0 || newIndex >= newLectures.length) return s;
                [newLectures[lectureIndex], newLectures[newIndex]] = [newLectures[newIndex], newLectures[lectureIndex]];
                return { ...s, lectures: newLectures };
            }
            return s;
        }));
    };

    const steps = [
        { id: 0, name: 'Basic Information' },
        { id: 1, name: 'Curriculum' },
        { id: 2, name: 'Course Details' },
        { id: 3, name: 'Pricing and Bundles' },
        { id: 4, name: 'Review and Submit' }
    ];

    if (isSubmitted) {
        return <SuccessView onGoToDashboard={() => window.location.href = '/dashboard/admin'} />;
    }

    return (

        <div className="min-h-screen bg-white p-8 md:p-14">
            <div className="w-full">
                {/* Breadcrumbs / Progress Tracker */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 no-scrollbar">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div
                                onClick={() => {
                                    if (step.id <= activeStep) {
                                        setActiveStep(step.id);
                                        setIsFinalReview(false);
                                    }
                                }}
                                className={`flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer group ${activeStep === step.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'
                                    }`}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold transition-all relative ${activeStep === step.id
                                        ? 'bg-slate-900 text-white'
                                        : activeStep > step.id
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-slate-50 text-slate-400 border border-slate-100'
                                        }`}
                                >
                                    {activeStep > step.id ? (
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        index + 1
                                    )}

                                    {/* Validation Warning Indicator */}
                                    {!isStepValid(step.id) && step.id < activeStep && (
                                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                                    )}
                                </div>
                                <span
                                    className={`text-[10px] font-bold uppercase tracking-tighter sm:tracking-widest ${activeStep === step.id ? 'text-slate-900' : (step.id < activeStep && !isStepValid(step.id)) ? 'text-rose-500' : 'text-slate-400 group-hover:text-slate-700'
                                        }`}
                                >
                                    {step.name}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`w-6 h-px shrink-0 transition-all ${activeStep > step.id ? 'bg-indigo-200' : 'bg-slate-50'
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {(activeStep as number) === 0 && (
                    <>
                        {/* Header Section Step 1 */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-10">
                            <div>
                                <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Basic Information</h1>
                                <p className="text-slate-500 text-lg font-medium">Let's start with the fundamentals of your course.</p>
                            </div>
                        </div>

                        {/* Form Section Step 1 */}
                        <div className="flex flex-col gap-10">
                            {/* Course Title */}
                            <div className="space-y-4">
                                <label className="block text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1">Course Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Complete Web Development Bootcamp"
                                    className="w-full px-8 py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 text-sm placeholder:text-slate-400 font-medium"
                                />
                            </div>

                            {/* Subtitle */}
                            <div className="space-y-4">
                                <label className="block text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1">Subtitle</label>
                                <input
                                    type="text"
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                    placeholder="Give your course a catchy subtitle"
                                    className="w-full px-8 py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 text-sm placeholder:text-slate-400 font-medium"
                                />
                            </div>

                            {/* 3-Column Selects */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                <CustomDropdown
                                    label="Category"
                                    name="category"
                                    options={categories}
                                    value={formData.category}
                                    onChange={handleDropdownChange}
                                />
                                <CustomDropdown
                                    label="Level"
                                    name="level"
                                    options={levels}
                                    value={formData.level}
                                    onChange={handleDropdownChange}
                                />
                                <CustomDropdown
                                    label="Language"
                                    name="language"
                                    options={languages}
                                    value={formData.language}
                                    onChange={handleDropdownChange}
                                />
                            </div>

                            {/* Course Description */}
                            <div className="space-y-4">
                                <label className="block text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1">Course Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={10}
                                    placeholder="Describe what your students will learn in detail..."
                                    className="w-full px-8 py-5 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 text-sm placeholder:text-slate-400 resize-none font-medium"
                                />
                            </div>

                            {/* Upload Sections */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="block text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1">Course Thumbnail</label>
                                    <div className="relative group">
                                        <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center gap-4 transition-all hover:border-indigo-400 hover:bg-slate-50 cursor-pointer overflow-hidden">
                                            {formData.thumbnail ? (
                                                <div className="relative w-full h-full">
                                                    <img src={formData.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                                            <ImageIcon className="w-5 h-5" />
                                                        </div>
                                                        <span className="text-white text-xs font-black uppercase tracking-widest">Change Image</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                                                        <ImageIcon className="w-8 h-8 font-light" />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-slate-900 font-bold text-sm mb-1 uppercase tracking-wider">Upload Thumbnail</p>
                                                        <p className="text-slate-400 text-xs font-semibold">1280x720 (16:9) recommended</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setFormData(prev => ({ ...prev, thumbnail: reader.result as string }));
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1">Promotional Video</label>
                                    <div className="relative group">
                                        <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center gap-4 transition-all hover:border-indigo-400 hover:bg-slate-50 cursor-pointer overflow-hidden">
                                            {isUploadingVideo ? (
                                                <div className="w-full h-full bg-indigo-50/30 flex flex-col items-center justify-center px-10 gap-6">
                                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-indigo-600 animate-bounce">
                                                        <PlayCircle className="w-8 h-8" />
                                                    </div>
                                                    <div className="w-full space-y-3">
                                                        <div className="flex justify-between items-end">
                                                            <p className="text-indigo-900 font-black text-[10px] uppercase tracking-[0.2em]">Uploading Video...</p>
                                                            <p className="text-indigo-600 font-black text-sm">{Math.round(videoUploadProgress)}%</p>
                                                        </div>
                                                        <div className="w-full h-2.5 bg-indigo-100 rounded-full overflow-hidden shadow-inner">
                                                            <div
                                                                className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
                                                                style={{ width: `${videoUploadProgress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : formData.video ? (
                                                <div className="relative w-full h-full">
                                                    {videoThumbnail ? (
                                                        <img src={videoThumbnail} alt="Video preview" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                                            <PlayCircle className="w-12 h-12 text-white/20" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-indigo-600/20 flex flex-col items-center justify-center gap-4 group-hover:bg-indigo-600/40 transition-all">
                                                        <div className="w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                                            <PlayCircle className="w-7 h-7" />
                                                        </div>
                                                        <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                                                            <p className="text-indigo-900 font-black text-[10px] uppercase tracking-widest">{formData.video}</p>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] bg-white/10 backdrop-blur-xl px-6 py-3 rounded-xl border border-white/20">Replace Video</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                                                        <PlayCircle className="w-8 h-8 font-light" />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-slate-900 font-bold text-sm mb-1 uppercase tracking-wider">Upload Demo Video</p>
                                                        <p className="text-slate-400 text-xs font-semibold">Short teaser for your course</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="video/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setIsUploadingVideo(true);
                                                    setVideoUploadProgress(0);

                                                    // Simulate upload progress
                                                    const interval = setInterval(() => {
                                                        setVideoUploadProgress(prev => {
                                                            if (prev >= 95) {
                                                                clearInterval(interval);
                                                                return prev;
                                                            }
                                                            return prev + Math.random() * 10;
                                                        });
                                                    }, 200);

                                                    try {
                                                        const thumbnail = await generateVideoThumbnail(file);
                                                        setVideoThumbnail(thumbnail);

                                                        // Complete simulated upload
                                                        setTimeout(() => {
                                                            clearInterval(interval);
                                                            setVideoUploadProgress(100);
                                                            setTimeout(() => {
                                                                setIsUploadingVideo(false);
                                                                setFormData(prev => ({ ...prev, video: file.name }));
                                                            }, 500);
                                                        }, 1500);
                                                    } catch (error) {
                                                        console.error("Failed to generate thumbnail", error);
                                                        setIsUploadingVideo(false);
                                                        clearInterval(interval);
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {(activeStep as number) === 1 && (
                    <>
                        {/* Header Section Step 2 */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-10">
                            <div>
                                <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Curriculum</h1>
                                <p className="text-slate-500 text-lg font-medium">Structure your course into sections and lectures.</p>
                            </div>
                            <button
                                onClick={addSection}
                                className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
                            >
                                <Plus className="w-5 h-5" />
                                Add Section
                            </button>
                        </div>

                        {/* Curriculum Content */}
                        <div className="flex flex-col gap-6">
                            {curriculumSections.map((section, index) => (
                                <div
                                    key={section.id}
                                    className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:border-slate-200 transition-all"
                                >
                                    {/* Section Header Bar */}
                                    <div
                                        onClick={() => setExpandedSectionId(expandedSectionId === section.id ? null : section.id)}
                                        className="p-6 flex items-center justify-between cursor-pointer group hover:bg-slate-50/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-6 flex-1">
                                            <div className="flex flex-col gap-1 pr-2 border-r border-slate-100">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); moveSection(index, 'up'); }}
                                                    disabled={index === 0}
                                                    className={`p-1 hover:bg-slate-100 rounded transition-colors ${index === 0 ? 'opacity-20 cursor-not-allowed' : 'text-slate-400'}`}
                                                >
                                                    <ChevronLeft className="w-3 h-3 rotate-90" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); moveSection(index, 'down'); }}
                                                    disabled={index === curriculumSections.length - 1}
                                                    className={`p-1 hover:bg-slate-100 rounded transition-colors ${index === curriculumSections.length - 1 ? 'opacity-20 cursor-not-allowed' : 'text-slate-400'}`}
                                                >
                                                    <ChevronLeft className="w-3 h-3 -rotate-90" />
                                                </button>
                                            </div>
                                            <div className="cursor-grab text-slate-300 hover:text-slate-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                                <GripVertical className="w-5 h-5" />
                                            </div>
                                            <div className="flex items-center gap-1.5 min-w-[120px]">
                                                <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                                                    SECTION {index + 1}
                                                </span>
                                                <ChevronRight className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-300 ${expandedSectionId === section.id ? 'rotate-90' : ''}`} />
                                            </div>
                                            <input
                                                type="text"
                                                value={section.title}
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                                                placeholder="Enter section title (e.g. Introduction)"
                                                className="w-full bg-transparent border-none focus:outline-none text-slate-700 font-black text-lg placeholder:text-slate-300"
                                            />
                                        </div>

                                        <div className="flex items-center gap-8 pl-4">
                                            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em] whitespace-nowrap">
                                                {(section.lectures || []).length} Lectures
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeSection(section.id);
                                                }}
                                                className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Section Content (Expanded View) */}
                                    {expandedSectionId === section.id && (
                                        <div className="p-8 pt-0 border-t border-slate-50 bg-white space-y-6">
                                            <div className="flex flex-col gap-6 pt-8">
                                                {(section.lectures || []).map((lecture, lIndex) => (
                                                    <div
                                                        key={lecture.id}
                                                        className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-xs hover:border-slate-200 transition-all"
                                                    >
                                                        {/* Accent bar on the left */}
                                                        <div className="absolute left-0 top-6 bottom-6 w-1 bg-indigo-200 rounded-full" />

                                                        <div className="flex flex-col gap-6">
                                                            {/* Lecture Top Row */}
                                                            <div className="flex items-center justify-between gap-4">
                                                                <div className="flex items-center gap-6 flex-1">
                                                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 font-black text-xs">
                                                                        {lIndex + 1}
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        value={lecture.title}
                                                                        onChange={(e) => updateLecture(section.id, lecture.id, { title: e.target.value })}
                                                                        placeholder="Lecture title"
                                                                        className="flex-1 bg-transparent border-none focus:outline-none text-slate-600 font-bold text-base placeholder:text-slate-300"
                                                                    />
                                                                </div>

                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex items-center gap-1 border-r border-slate-100 pr-2">
                                                                        <button
                                                                            onClick={() => moveLecture(section.id, lIndex, 'up')}
                                                                            disabled={lIndex === 0}
                                                                            className={`p-1.5 hover:bg-slate-50 rounded-lg transition-all ${lIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'text-slate-400 hover:text-indigo-600'}`}
                                                                        >
                                                                            <ChevronLeft className="w-4 h-4 rotate-90" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => moveLecture(section.id, lIndex, 'down')}
                                                                            disabled={lIndex === (section.lectures || []).length - 1}
                                                                            className={`p-1.5 hover:bg-slate-50 rounded-lg transition-all ${lIndex === (section.lectures || []).length - 1 ? 'opacity-20 cursor-not-allowed' : 'text-slate-400 hover:text-indigo-600'}`}
                                                                        >
                                                                            <ChevronLeft className="w-4 h-4 -rotate-90" />
                                                                        </button>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => updateLecture(section.id, lecture.id, { freePreview: !lecture.freePreview })}
                                                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${lecture.freePreview ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                                                                    >
                                                                        <div className={`w-4 h-4 rounded-sm flex items-center justify-center transition-colors ${lecture.freePreview ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                                                                            <Check className="w-3 h-3 text-white" />
                                                                        </div>
                                                                        <Eye className="w-4 h-4" />
                                                                        <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Free Preview</span>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => removeLecture(section.id, lecture.id)}
                                                                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                                                    >
                                                                        <Trash2 className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Lecture Description */}
                                                            <input
                                                                type="text"
                                                                value={lecture.description}
                                                                onChange={(e) => updateLecture(section.id, lecture.id, { description: e.target.value })}
                                                                placeholder="What is this lecture about? (Optional)"
                                                                className="w-full bg-slate-50/50 border border-slate-50 rounded-xl px-4 py-3 text-slate-500 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/5 placeholder:text-slate-300"
                                                            />

                                                            {/* Media Upload Options */}
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                {/* Video Upload Container */}
                                                                <div className="relative group/media">
                                                                    <div className={`w-full h-32 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 overflow-hidden cursor-pointer ${lecture.video ? 'border-indigo-200 bg-indigo-50/10' : 'border-slate-100 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-200'}`}>
                                                                        {lecture.isUploading ? (
                                                                            <div className="w-full h-full flex flex-col items-center justify-center p-4 space-y-2">
                                                                                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-indigo-600 animate-bounce">
                                                                                    <Monitor className="w-4 h-4" />
                                                                                </div>
                                                                                <div className="w-full max-w-[120px] h-1.5 bg-indigo-100 rounded-full overflow-hidden shadow-inner">
                                                                                    <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${lecture.uploadProgress || 0}%` }} />
                                                                                </div>
                                                                                <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">{Math.round(lecture.uploadProgress || 0)}%</span>
                                                                            </div>
                                                                        ) : lecture.video ? (
                                                                            <div className="relative w-full h-full group">
                                                                                {lecture.coverImage ? (
                                                                                    <img src={lecture.coverImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt="Video preview" />
                                                                                ) : (
                                                                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                                                                        <PlayCircle className="w-8 h-8 text-white/20" />
                                                                                    </div>
                                                                                )}
                                                                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                                                                                    <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-indigo-600 shadow-lg">
                                                                                        <Check className="w-4 h-4" />
                                                                                    </div>
                                                                                    <span className="bg-slate-900/80 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md max-w-[90%] truncate">
                                                                                        {lecture.videoName || 'Video Uploaded'}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover/media:scale-110 transition-transform">
                                                                                    <Monitor className="w-5 h-5" />
                                                                                </div>
                                                                                <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Upload Video</p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <input
                                                                        type="file"
                                                                        accept="video/*"
                                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                                        onChange={async (e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                // Start simulation
                                                                                updateLecture(section.id, lecture.id, { isUploading: true, uploadProgress: 0, videoName: file.name });

                                                                                // Extract thumbnail first
                                                                                const extractedThumbnail = await generateVideoThumbnail(file);

                                                                                let progress = 0;
                                                                                const interval = setInterval(() => {
                                                                                    progress += Math.random() * 20;
                                                                                    if (progress >= 100) {
                                                                                        progress = 100;
                                                                                        clearInterval(interval);
                                                                                        updateLecture(section.id, lecture.id, {
                                                                                            isUploading: false,
                                                                                            uploadProgress: 100,
                                                                                            video: file.name,
                                                                                            coverImage: lecture.coverImage || extractedThumbnail
                                                                                        });
                                                                                    } else {
                                                                                        updateLecture(section.id, lecture.id, { uploadProgress: progress });
                                                                                    }
                                                                                }, 150);
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>

                                                                {/* Cover Image Upload Container */}
                                                                <div className="relative group/media">
                                                                    <div className={`w-full h-32 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 overflow-hidden cursor-pointer ${lecture.coverImage ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-100 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-200'}`}>
                                                                        {lecture.coverImage ? (
                                                                            <div className="relative w-full h-full group">
                                                                                <img src={lecture.coverImage} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Lecture cover" />
                                                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                                                                        <ImageIcon className="w-4 h-4" />
                                                                                    </div>
                                                                                    <span className="text-white text-[8px] font-black uppercase tracking-widest">Change Cover</span>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover/media:scale-110 transition-transform">
                                                                                    <ImageIcon className="w-5 h-5" />
                                                                                </div>
                                                                                <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Cover Image</p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                const reader = new FileReader();
                                                                                reader.onloadend = () => {
                                                                                    updateLecture(section.id, lecture.id, { coverImage: reader.result as string });
                                                                                };
                                                                                reader.readAsDataURL(file);
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Add Lecture Button */}
                                            <button
                                                onClick={() => addLecture(section.id)}
                                                className="w-full h-16 bg-white border-2 border-dashed border-slate-100 rounded-[2rem] flex items-center justify-center gap-3 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center">
                                                    <Plus className="w-3 h-3" />
                                                </div>
                                                Add Lecture Content
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {curriculumSections.length === 0 && (
                                <div className="text-center py-20 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                                    <p className="text-slate-400 font-bold">No sections added yet. Click "Add Section" to get started.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {(activeStep as number) === 2 && (
                    <>
                        {/* Header Section Step 3 */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-10">
                            <div>
                                <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Course Details</h1>
                                <p className="text-slate-500 text-lg font-medium">Provide additional information to help students decide.</p>
                            </div>
                        </div>

                        <div className="max-w-4xl space-y-10">
                            {/* What You Will Learn Card */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xs">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">What You Will Learn</h3>
                                    </div>
                                    <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-full">{learningPoints.length} items</span>
                                </div>

                                <div className="space-y-4">
                                    {learningPoints.map((point, index) => (
                                        <div key={index} className="relative group">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2">
                                                <CheckCircle2 className="w-4 h-4 text-slate-300" />
                                            </div>
                                            <input
                                                type="text"
                                                value={point}
                                                onChange={(e) => handleLearningPointChange(index, e.target.value)}
                                                placeholder="e.g., Build full-stack applications with React and Node.js"
                                                className="w-full pl-14 pr-14 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all text-slate-700 font-bold placeholder:text-slate-300"
                                            />
                                            {learningPoints.length > 1 && (
                                                <button
                                                    onClick={() => removeLearningPoint(index)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-slate-100/50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        onClick={addLearningPoint}
                                        className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest mt-6 hover:text-indigo-700 transition-colors ml-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add New Item
                                    </button>
                                </div>
                            </div>

                            {/* Requirements Card */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xs">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                            <Info className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Requirements</h3>
                                    </div>
                                    <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-full">{requirements.length} items</span>
                                </div>

                                <div className="space-y-4">
                                    {requirements.map((req, index) => (
                                        <div key={index} className="relative group">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2">
                                                <CheckCircle2 className="w-4 h-4 text-slate-300" />
                                            </div>
                                            <input
                                                type="text"
                                                value={req}
                                                onChange={(e) => handleRequirementChange(index, e.target.value)}
                                                placeholder="e.g., Basic understanding of HTML & CSS"
                                                className="w-full pl-14 pr-14 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all text-slate-700 font-bold placeholder:text-slate-300"
                                            />
                                            {requirements.length > 1 && (
                                                <button
                                                    onClick={() => removeRequirement(index)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-slate-100/50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        onClick={addRequirement}
                                        className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest mt-6 hover:text-indigo-700 transition-colors ml-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add New Item
                                    </button>
                                </div>
                            </div>

                            {/* This Course Includes Card */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xs">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">This Course Includes</h3>
                                    </div>
                                    <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-full">{courseIncludes.length} items</span>
                                </div>

                                <div className="space-y-4">
                                    {courseIncludes.map((point, index) => (
                                        <div key={index} className="relative group">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2">
                                                <CheckCircle2 className="w-4 h-4 text-slate-300" />
                                            </div>
                                            <input
                                                type="text"
                                                value={point}
                                                onChange={(e) => handleCourseIncludesChange(index, e.target.value)}
                                                placeholder="e.g., Full lifetime access"
                                                className="w-full pl-14 pr-14 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all text-slate-700 font-bold placeholder:text-slate-300"
                                            />
                                            {courseIncludes.length > 1 && (
                                                <button
                                                    onClick={() => removeCourseIncludesPoint(index)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-slate-100/50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        onClick={addCourseIncludesPoint}
                                        className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest mt-6 hover:text-indigo-700 transition-colors ml-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add New Item
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {(activeStep as number) === 3 && (
                    <div className="max-w-7xl">
                        <div className="mb-12">
                            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Pricing Strategy</h1>
                            <p className="text-slate-500 text-lg font-medium">Define how students access and purchase your content.</p>
                        </div>

                        <div className="space-y-8">
                            {/* Course Price Card */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-10 shadow-xs relative group">
                                <div className="flex flex-col lg:flex-row gap-12">
                                    <div className="flex-1 space-y-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                                <Tag className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Course Price</h3>
                                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-0.5">Set the value for your knowledge.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="flex-1">
                                                <CustomDropdown
                                                    label="Currency"
                                                    options={['USD', 'INR', 'EUR', 'GBP']}
                                                    name="currency"
                                                    value={formData.currency}
                                                    onChange={(name, val) => setFormData({ ...formData, [name]: val })}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1 mb-4">List Price</label>
                                                <div className="relative group/input">
                                                    <span className={`absolute left-6 top-1/2 -translate-y-1/2 font-black transition-colors ${formData.originalPrice ? 'text-indigo-600' : 'text-slate-300'} group-focus-within/input:text-indigo-600`}>
                                                        {formData.currency === 'USD' ? '$' : '₹'}
                                                    </span>
                                                    <input
                                                        type="number"
                                                        name="originalPrice"
                                                        value={formData.originalPrice}
                                                        onChange={handleChange}
                                                        min="0"
                                                        placeholder="0"
                                                        className="w-full pl-12 pr-6 py-3.5 bg-slate-50/50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all text-slate-900 font-black placeholder:text-slate-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-slate-50">
                                            <label className="block text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1">Discount Amount <span className="text-slate-300 ml-1 font-bold lowercase italic">(Optional)</span></label>
                                            <div className="relative group/input">
                                                <span className={`absolute left-6 top-1/2 -translate-y-1/2 font-black transition-colors ${formData.discountedPrice ? 'text-emerald-600' : 'text-slate-300'} group-focus-within/input:text-emerald-600`}>
                                                    {formData.currency === 'USD' ? '$' : '₹'}
                                                </span>
                                                <input
                                                    type="number"
                                                    name="discountedPrice"
                                                    value={formData.discountedPrice}
                                                    onChange={handleChange}
                                                    min="0"
                                                    max={formData.originalPrice}
                                                    placeholder="0"
                                                    className={`w-full pl-12 pr-6 py-4 bg-slate-50/50 border rounded-xl focus:outline-none focus:ring-4 transition-all text-slate-900 font-black placeholder:text-slate-200 ${Number(formData.discountedPrice) > Number(formData.originalPrice) ? 'border-rose-400 focus:ring-rose-500/10 focus:border-rose-500' : 'border-slate-100 focus:ring-emerald-500/10 focus:border-emerald-400'}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Revenue Simulator */}
                                    <div className="lg:w-80">
                                        <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-8 space-y-8">
                                            <div className="flex items-center gap-3 text-emerald-600">
                                                <Wallet className="w-5 h-5" />
                                                <h4 className="text-[10px] font-black uppercase tracking-widest">Revenue Simulator</h4>
                                            </div>

                                            {(() => {
                                                const currencySymbol = formData.currency === 'USD' ? '$' : '₹';
                                                const listPrice = Number(formData.originalPrice || 0);
                                                const discountedPrice = Number(formData.discountedPrice || 0);

                                                // Bundle Calculation: Always based on List Price
                                                let bundleDiscountPercent = 0;
                                                if (isBundleEnabled && formData.bundleDiscount) {
                                                    const match = formData.bundleDiscount.match(/(\d+)%/);
                                                    bundleDiscountPercent = match ? parseInt(match[1]) / 100 : 0;
                                                }
                                                const bundleDiscountValue = listPrice * bundleDiscountPercent;

                                                // Manual Discount Calculation: Input is treated as the deduction
                                                const manualDiscountValue = (formData.discountedPrice !== '' && discountedPrice <= listPrice)
                                                    ? discountedPrice
                                                    : 0;

                                                // Gross sale calculation: Bundle takes priority if enabled, otherwise Manual Discount
                                                const activeDiscountValue = isBundleEnabled ? bundleDiscountValue : manualDiscountValue;
                                                const grossSale = listPrice - activeDiscountValue;

                                                const platformFee = grossSale * 0.05;
                                                const processingFee = grossSale * 0.03;
                                                const netEarnings = grossSale - platformFee - processingFee;

                                                return (
                                                    <div className="space-y-6">
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between text-sm font-bold text-slate-400">
                                                                <span>List Price</span>
                                                                <span className="text-slate-600">{currencySymbol}{listPrice.toFixed(2)}</span>
                                                            </div>

                                                            {isBundleEnabled ? (
                                                                <div className="flex items-center justify-between text-sm font-bold text-indigo-400 animate-in fade-in slide-in-from-right-2">
                                                                    <span className="flex items-center gap-1.5">
                                                                        <Percent className="w-3.5 h-3.5" />
                                                                        Bundle Discount ({Math.round(bundleDiscountPercent * 100)}%)
                                                                    </span>
                                                                    <span>-{currencySymbol}{bundleDiscountValue.toFixed(2)}</span>
                                                                </div>
                                                            ) : formData.discountedPrice !== '' && manualDiscountValue > 0 ? (
                                                                <div className="flex items-center justify-between text-sm font-bold text-emerald-400 animate-in fade-in slide-in-from-right-2">
                                                                    <span className="flex items-center gap-1.5">
                                                                        <Tag className="w-3.5 h-3.5" />
                                                                        Discount Amount ({Math.round((manualDiscountValue / listPrice) * 100)}%)
                                                                    </span>
                                                                    <span>-{currencySymbol}{manualDiscountValue.toFixed(2)}</span>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center justify-between text-sm font-bold text-slate-200 opacity-40">
                                                                    <span className="flex items-center gap-1.5">
                                                                        <Percent className="w-3.5 h-3.5" />
                                                                        No Active Discount
                                                                    </span>
                                                                    <span>{currencySymbol}0.00</span>
                                                                </div>
                                                            )}

                                                            <div className="h-px bg-emerald-100/50" />
                                                            <div className="flex items-center justify-between font-black text-slate-900">
                                                                <span>Gross Sale</span>
                                                                <span>{currencySymbol}{grossSale.toFixed(2)}</span>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3 opacity-50">
                                                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tighter text-slate-400">
                                                                <span>Platform Fee (5%)</span>
                                                                <span>-{currencySymbol}{platformFee.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tighter text-slate-400">
                                                                <span>Processing (3%)</span>
                                                                <span>-{currencySymbol}{processingFee.toFixed(2)}</span>
                                                            </div>
                                                        </div>

                                                        <div className="pt-4 border-t border-emerald-100/50">
                                                            <div className="flex flex-col items-end">
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Net Earnings per sale</span>
                                                                <span className="text-4xl font-black text-emerald-600 tracking-tight">
                                                                    {currencySymbol}{netEarnings.toFixed(2)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Create a Bundle Card */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-1 shadow-xs group">
                                <div className="p-9 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                                            <Sparkles className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Create a Bundle</h3>
                                                <div className="px-3 py-1 bg-indigo-50 text-indigo-500 text-[8px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                                                    Active Offer: 10% DISCOUNT AUTO-APPLIED
                                                </div>
                                            </div>
                                            <div className="h-1" />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsBundleEnabled(!isBundleEnabled)}
                                        className={`w-16 h-8 rounded-full transition-all duration-500 relative ${isBundleEnabled ? 'bg-indigo-500' : 'bg-slate-200'}`}
                                    >
                                        <div className={`absolute top-1.5 w-5 h-5 bg-white rounded-full transition-all duration-500 shadow-sm ${isBundleEnabled ? 'left-9' : 'left-1.5'}`} />
                                    </button>
                                </div>

                                {isBundleEnabled && (
                                    <div className="px-9 pb-9 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-top-4 duration-700">
                                        <div className="space-y-10">
                                            <div className="space-y-4">
                                                <label className="block text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1">Select Courses to Bundle</label>
                                                <div className="relative">
                                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                                    <input
                                                        type="text"
                                                        value={bundleSearchQuery}
                                                        onChange={(e) => setBundleSearchQuery(e.target.value)}
                                                        onFocus={() => setIsSearchingBundle(true)}
                                                        placeholder="Search your library..."
                                                        className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all text-slate-900 font-bold placeholder:text-slate-300"
                                                    />
                                                    {isSearchingBundle && bundleSearchQuery && (
                                                        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                                            <div className="max-h-60 overflow-y-auto thin-scrollbar">
                                                                {mockLibraryCourses
                                                                    .filter(c => c.title.toLowerCase().includes(bundleSearchQuery.toLowerCase()) && !addedBundleCourses.find(a => a.id === c.id))
                                                                    .map(course => (
                                                                        <div
                                                                            key={course.id}
                                                                            onClick={() => {
                                                                                setAddedBundleCourses([...addedBundleCourses, course]);
                                                                                setBundleSearchQuery('');
                                                                                setIsSearchingBundle(false);
                                                                            }}
                                                                            className="p-4 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-50 last:border-none group"
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="w-10 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-400">
                                                                                    <PlayCircle className="w-4 h-4" />
                                                                                </div>
                                                                                <div>
                                                                                    <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{course.title}</p>
                                                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{course.level}</p>
                                                                                </div>
                                                                            </div>
                                                                            <span className="text-xs font-black text-slate-900">${course.originalPrice}</span>
                                                                        </div>
                                                                    ))}
                                                                {mockLibraryCourses.filter(c => c.title.toLowerCase().includes(bundleSearchQuery.toLowerCase()) && !addedBundleCourses.find(a => a.id === c.id)).length === 0 && (
                                                                    <div className="p-8 text-center text-slate-400 font-bold text-sm">No courses found matching "{bundleSearchQuery}"</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {isSearchingBundle && (
                                                        <div className="fixed inset-0 z-40" onClick={() => setIsSearchingBundle(false)} />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-indigo-50/30 border border-indigo-100/50 rounded-xl p-6 flex gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
                                                    <Info className="w-5 h-5" />
                                                </div>
                                                <p className="text-xs text-indigo-600/80 font-bold leading-relaxed">
                                                    <span className="text-indigo-600 font-black uppercase tracking-widest block mb-1">Pro Tip: </span>
                                                    Offering a discount on bundles encourages students to buy more, increasing your overall revenue per sale.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1">Bundle Discount Offer</label>
                                                <CustomDropdown
                                                    label="Offer"
                                                    options={[
                                                        '5% OFF - Starter Offer',
                                                        '10% OFF - Recommended',
                                                        '15% OFF - High Volume',
                                                        '20% OFF - Flash Sale',
                                                        '25% OFF - Clearance',
                                                        '30% OFF - Professional',
                                                        '40% OFF - Seasonal',
                                                        '50% OFF - Half Price',
                                                        '75% OFF - Mega Sale',
                                                        '90% OFF - Limited Entry'
                                                    ]}
                                                    name="bundleDiscount"
                                                    value={formData.bundleDiscount || ''}
                                                    onChange={(name, val) => setFormData({ ...formData, [name]: val })}
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-slate-50/50 border border-slate-100/50 rounded-2xl p-8 space-y-8">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bundle Contents</h4>
                                                <span className="px-3 py-1 bg-white shadow-sm rounded-full text-[10px] font-black text-slate-600 border border-slate-100">{addedBundleCourses.length} Items</span>
                                            </div>

                                            <div className="space-y-4">
                                                {addedBundleCourses.map((course) => (
                                                    <div key={course.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4 group/item relative overflow-hidden">
                                                        <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500 opacity-100 transition-opacity" />
                                                        <div className="w-5 flex flex-col items-center gap-1 shrink-0 opacity-20 group-hover/item:opacity-40 transition-opacity">
                                                            <div className="flex gap-0.5"><div className="w-1 h-1 bg-slate-900 rounded-full" /><div className="w-1 h-1 bg-slate-900 rounded-full" /></div>
                                                            <div className="flex gap-0.5"><div className="w-1 h-1 bg-slate-900 rounded-full" /><div className="w-1 h-1 bg-slate-900 rounded-full" /></div>
                                                            <div className="flex gap-0.5"><div className="w-1 h-1 bg-slate-900 rounded-full" /><div className="w-1 h-1 bg-slate-900 rounded-full" /></div>
                                                        </div>
                                                        <div className="w-16 h-12 rounded-xl bg-slate-900 overflow-hidden shrink-0">
                                                            <div className="w-full h-full bg-linear-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                                                                <Sparkles className="w-5 h-5 text-indigo-400 opacity-50" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h5 className="font-black text-sm text-slate-900 truncate">{course.title}</h5>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className="text-[10px] font-bold text-slate-400">${course.originalPrice}</span>
                                                                <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{course.level}</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => setAddedBundleCourses(addedBundleCourses.filter(c => c.id !== course.id))}
                                                            className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                                {addedBundleCourses.length === 0 && (
                                                    <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl gap-4">
                                                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                                            <Monitor className="w-6 h-6" />
                                                        </div>
                                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No courses added yet</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="pt-8 border-t border-slate-200/50 space-y-4">
                                                <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                                                    <span>Subtotal</span>
                                                    <span className="text-slate-600">${(addedBundleCourses.reduce((acc, curr) => acc + Number(curr.originalPrice), 0)).toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Value (+ Current Course)</p>
                                                        <p className="text-2xl font-black text-slate-900">${(addedBundleCourses.reduce((acc, curr) => acc + Number(curr.originalPrice), 0) + Number(formData.originalPrice || 0)).toFixed(2)}</p>
                                                    </div>
                                                    <p className="text-base font-black text-indigo-500 mb-0.5">
                                                        Bundle Price ({formData.bundleDiscount ? formData.bundleDiscount.split(' ')[0] : '0%'})
                                                        <span className="ml-3 text-lg">
                                                            {(() => {
                                                                const match = formData.bundleDiscount?.match(/(\d+)%/);
                                                                const percent = match ? parseInt(match[1]) / 100 : 0;
                                                                const totalValue = addedBundleCourses.reduce((acc, curr) => acc + Number(curr.originalPrice), 0) + Number(formData.originalPrice || 0);
                                                                return (totalValue * (1 - percent)).toFixed(2);
                                                            })()}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {(activeStep as number) === 4 && (
                    <>
                        {/* Header Section Step 5 */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-10">
                            <div>
                                <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Review & Submit</h1>
                                <p className="text-slate-500 text-lg font-medium">
                                    {isFinalReview ? "Double-check everything before launching." : "Preview your course card before publishing."}
                                </p>
                            </div>
                            {isFinalReview && (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl text-sm font-black shadow-2xl shadow-emerald-200/50 hover:bg-emerald-700 transition-all active:scale-95 cursor-pointer ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Submit Course
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl">
                            {/* Left: Course Card Preview */}
                            <div className="lg:col-span-4 space-y-6">
                                <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1">Course Card Preview</h3>
                                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40 group hover:border-indigo-100 transition-all group">
                                    <div className="aspect-video bg-slate-50 relative flex items-center justify-center overflow-hidden">
                                        {formData.thumbnail ? (
                                            <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                                <ImageIcon className="w-8 h-8 text-slate-200" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest border border-slate-100 shadow-sm">
                                            {formData.level}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-lg font-black text-indigo-600 mb-2 group-hover:text-indigo-700 transition-colors line-clamp-2 min-h-12">
                                            {formData.title || 'Untitled Course'}
                                        </h4>
                                        <p className="text-slate-400 font-bold text-sm line-clamp-1 mb-6 leading-relaxed">
                                            {formData.subtitle || 'No subtitle provided.'}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50 gap-2">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                {(() => {
                                                    const listPrice = Number(formData.originalPrice || 0);

                                                    // Unified Discount Logic
                                                    let activeDiscountValue = 0;
                                                    if (isBundleEnabled && formData.bundleDiscount) {
                                                        const match = formData.bundleDiscount.match(/(\d+)%/);
                                                        const bundlePercent = match ? parseInt(match[1]) / 100 : 0;
                                                        activeDiscountValue = listPrice * bundlePercent;
                                                    } else {
                                                        activeDiscountValue = Number(formData.discountedPrice || 0);
                                                    }

                                                    const finalPrice = Math.max(0, listPrice - activeDiscountValue);
                                                    const currencySymbol = formData.currency === 'USD' ? '$' : '₹';

                                                    return (
                                                        <>
                                                            <span className="text-xl font-black text-slate-900">
                                                                {currencySymbol}{finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </span>
                                                            {activeDiscountValue > 0 && (
                                                                <span className="text-sm font-bold text-slate-300 line-through mt-1">
                                                                    {currencySymbol}{listPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                </span>
                                                            )}
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                            <div className="flex items-center gap-1 bg-amber-50/50 px-2.5 py-1 rounded-full shrink-0">
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                                                    ))}
                                                </div>
                                                <span className="text-[9px] font-black text-amber-600 tracking-tighter whitespace-nowrap">(New)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="lg:col-span-8 space-y-10">
                                {!isFinalReview ? (
                                    <>
                                        <div className="space-y-6">
                                            <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1">Submission Checklist</h3>
                                            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xs">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {[
                                                        { label: 'Course Title & Subtitle', status: !!(formData.title && formData.subtitle) },
                                                        { label: 'Thumbnail Uploaded', status: !!formData.thumbnail },
                                                        { label: 'Promo Video Uploaded', status: !!formData.video },
                                                        { label: 'At least 1 Section', status: curriculumSections.length > 0 && curriculumSections[0].title !== '' },
                                                        { label: 'Pricing Set', status: !!(formData.originalPrice && formData.discountedPrice) },
                                                        { label: 'Learning Objectives', status: learningPoints.length > 0 && learningPoints[0] !== '' }
                                                    ].map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${item.status
                                                                ? 'bg-emerald-50/30 border-emerald-100 text-emerald-700'
                                                                : 'bg-slate-50 border-slate-100 text-slate-400'
                                                                }`}
                                                        >
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.status ? 'bg-white shadow-sm' : ''}`}>
                                                                {item.status ? <Check className="w-4 h-4" /> : <Circle className="w-3 h-3 fill-slate-200 text-slate-200" />}
                                                            </div>
                                                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Card */}
                                        <div className="bg-indigo-50/40 border border-indigo-100/50 rounded-3xl p-8 relative overflow-hidden group">
                                            <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-700" />
                                            <div className="flex items-start gap-6 relative">
                                                <div className="w-14 h-14 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-xl shadow-indigo-200 group-hover:scale-110 transition-transform duration-500">
                                                    <Sparkles className="w-7 h-7" />
                                                </div>
                                                <div className="flex-1 space-y-6">
                                                    <div>
                                                        <h4 className="text-xl font-black text-slate-900 mb-2">Ready to Launch?</h4>
                                                        <p className="text-indigo-600/80 font-bold text-sm leading-relaxed">
                                                            Your course looks great! Once you submit, our team will review it within 24 hours.
                                                        </p>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="h-3 w-full bg-indigo-100 rounded-full overflow-hidden p-0.5">
                                                            <div
                                                                className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                                                style={{
                                                                    width: `${Math.round(([
                                                                        !!(formData.title && formData.subtitle),
                                                                        !!formData.thumbnail,
                                                                        !!formData.video,
                                                                        curriculumSections.length > 0 && curriculumSections[0].title !== '',
                                                                        !!(formData.originalPrice && formData.discountedPrice),
                                                                        learningPoints.length > 0 && learningPoints[0] !== ''
                                                                    ].filter(Boolean).length / 6) * 100)}%`
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm border border-indigo-50">
                                                                {Math.round(([
                                                                    !!(formData.title && formData.subtitle),
                                                                    !!formData.thumbnail,
                                                                    !!formData.video,
                                                                    curriculumSections.length > 0 && curriculumSections[0].title !== '',
                                                                    !!(formData.originalPrice && formData.discountedPrice),
                                                                    learningPoints.length > 0 && learningPoints[0] !== ''
                                                                ].filter(Boolean).length / 6) * 100)}% Complete
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest ml-1">Content Summary</h3>

                                        {/* Basics Card */}
                                        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xs relative group overflow-hidden">
                                            <div className="absolute right-0 top-0 w-2 h-full bg-indigo-500/10 group-hover:bg-indigo-500 transition-all" />
                                            <div className="flex items-center justify-between mb-8">
                                                <h4 className="text-xl font-black text-slate-900">Basics</h4>
                                                <button
                                                    onClick={() => { setActiveStep(0); setIsFinalReview(false); }}
                                                    className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs transition-colors uppercase tracking-widest"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Title</span>
                                                    <p className="font-bold text-slate-700 leading-tight">{formData.title || 'Not set'}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Category</span>
                                                    <p className="font-bold text-slate-700">{formData.category}</p>
                                                </div>
                                                <div className="col-span-2 space-y-2">
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Description</span>
                                                    <p className="text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed">
                                                        {formData.description || 'No description set'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Curriculum Card */}
                                        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xs relative group overflow-hidden">
                                            <div className="absolute right-0 top-0 w-2 h-full bg-indigo-500/10 group-hover:bg-indigo-500 transition-all" />
                                            <div className="flex items-center justify-between mb-8">
                                                <h4 className="text-xl font-black text-slate-900">Curriculum</h4>
                                                <button
                                                    onClick={() => { setActiveStep(1); setIsFinalReview(false); }}
                                                    className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs transition-colors uppercase tracking-widest"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-10">
                                                <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100/50">
                                                    <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-500">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-black text-slate-900">{curriculumSections.length}</p>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sections</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100/50">
                                                    <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-500">
                                                        <PlayCircle className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-black text-slate-900">
                                                            {curriculumSections.reduce((acc, curr) => acc + (curr.lectures?.length || 0), 0)}
                                                        </p>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lectures</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Pricing Card */}
                                        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xs relative group overflow-hidden">
                                            <div className="absolute right-0 top-0 w-2 h-full bg-indigo-500/10 group-hover:bg-indigo-500 transition-all" />
                                            <div className="flex items-center justify-between mb-8">
                                                <h4 className="text-xl font-black text-slate-900">Pricing</h4>
                                                <button
                                                    onClick={() => { setActiveStep(3); setIsFinalReview(false); }}
                                                    className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs transition-colors uppercase tracking-widest"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <span className="text-4xl font-black text-emerald-600">
                                                    {(() => {
                                                        const listPrice = Number(formData.originalPrice || 0);
                                                        let activeDiscountValue = 0;
                                                        if (isBundleEnabled && formData.bundleDiscount) {
                                                            const match = formData.bundleDiscount.match(/(\d+)%/);
                                                            const bundlePercent = match ? parseInt(match[1]) / 100 : 0;
                                                            activeDiscountValue = listPrice * bundlePercent;
                                                        } else {
                                                            activeDiscountValue = Number(formData.discountedPrice || 0);
                                                        }
                                                        const finalPrice = Math.max(0, listPrice - activeDiscountValue);
                                                        const currencySymbol = formData.currency === 'USD' ? '$' : '₹';
                                                        return `${currencySymbol}${finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                                                    })()}
                                                </span>
                                                <span className="text-sm font-bold text-slate-300 mb-2 uppercase tracking-widest">
                                                    {formData.currency}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Footer Actions */}
                <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        className={`flex items-center gap-2 font-black transition-colors uppercase text-xs tracking-[0.2em] cursor-pointer ${activeStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>

                    <div className="flex items-center gap-8">
                        <button
                            onClick={handleSaveDraft}
                            disabled={isSavingDraft || isSubmitting}
                            className={`text-slate-500 font-bold hover:text-slate-900 transition-colors text-sm cursor-pointer tracking-wide flex items-center gap-2 ${isSavingDraft ? 'opacity-50' : ''}`}
                        >
                            {isSavingDraft ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Draft
                                </>
                            )}
                        </button>
                        {!isFinalReview && (
                            <button
                                onClick={handleNext}
                                className={`flex items-center gap-3 px-10 py-5 rounded-2xl text-sm font-black transition-all active:scale-95 cursor-pointer shadow-2xl ${activeStep === steps.length - 1
                                    ? 'bg-emerald-600 text-white shadow-emerald-200/50 hover:bg-emerald-700'
                                    : 'bg-linear-to-r from-[#4f46e5] to-[#7c3aed] text-white shadow-indigo-200/50 hover:opacity-90'
                                    }`}
                            >
                                {activeStep === steps.length - 1 ? (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Submit for Review
                                    </>
                                ) : (
                                    <>
                                        Next Step
                                        <ChevronRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        )}
                        {isFinalReview && (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`flex items-center gap-3 px-10 py-5 rounded-2xl text-sm font-black transition-all active:scale-95 cursor-pointer shadow-2xl bg-emerald-600 text-white shadow-emerald-200/50 hover:bg-emerald-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        {(session?.user as any)?.role === 'ADMIN' || (session?.user as any)?.role === 'SUPER_ADMIN'
                                            ? 'Publish Course'
                                            : 'Submit Course'}
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
