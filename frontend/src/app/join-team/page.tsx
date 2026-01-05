'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import { IoAlertCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

const JoinTeamPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams?.get('token');

    const [isValidating, setIsValidating] = useState(true);
    const [inviteData, setInviteData] = useState<any>(null);
    const [error, setError] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (token) {
            validateInvite();
        } else {
            setError('Invalid invitation link');
            setIsValidating(false);
        }
    }, [token]);

    const validateInvite = async () => {
        try {
            const response = await apiClient.get(`/auth/validate-invite?token=${token}`);
            setInviteData(response.data);
            setIsValidating(false);
        } catch (error: any) {
            console.error('Validation error:', error);
            setError(error.userMessage || error.response?.data?.message || 'Invalid or expired invitation link');
            setIsValidating(false);
        }
    };

    const handleAcceptInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (!firstName.trim()) {
            setError('Please enter your first name');
            return;
        }

        if (!lastName.trim()) {
            setError('Please enter your last name');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        try {
            await apiClient.post('/auth/accept-invite', {
                token,
                firstName,
                lastName,
                password
            });

            toast.success('Account created successfully! Please log in.');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error: any) {
            console.error('Error accepting invite:', error);
            setError(error.response?.data?.message || 'Failed to accept invitation');
        } finally {
            setIsSubmitting(false);
        }
    };

    const ErrorAlert = ({ msg }: { msg: string }) => (
        <div className="flex items-center gap-2 p-3.5 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1 duration-200">
            <IoAlertCircleOutline className="text-xl shrink-0" />
            <span className="font-medium">{msg}</span>
        </div>
    );

    if (isValidating) {
        return (
            <div className="flex flex-col items-center justify-center w-full py-24">
                <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="mt-6 text-gray-500 font-medium animate-pulse">Validating Invitation...</p>
            </div>
        );
    }

    if (error && !isValidating && !inviteData) {
        return (
            <div className='w-full max-w-xl flex flex-col gap-6 items-start'>
                <div className="text-start mb-0 w-full">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Invalid Invitation</h2>
                    <p className="text-sm text-gray-500 mt-1">{error}</p>
                </div>
                <button
                    onClick={() => router.push('/login')}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-100"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className='w-full h-auto flex flex-col items-start justify-center gap-6 pb-4'>
            <div className='relative w-full max-w-xl flex flex-col gap-6 items-start'>
                <div className="text-start mb-0 w-full">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Accept Invitation</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        You've been invited to join the team as a <span className="font-bold text-blue-400">{(inviteData?.role || 'Member').replace('_', ' ')}</span>
                    </p>
                </div>

                <form onSubmit={handleAcceptInvite} className='w-full flex flex-col gap-5'>
                    <div className="flex gap-4">
                        <FloatingLabelInput
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            error={!!error && error.toLowerCase().includes('first name')}
                            className="flex-1"
                        />
                        <FloatingLabelInput
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            error={!!error && error.toLowerCase().includes('last name')}
                            className="flex-1"
                        />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Email Address</p>
                        <p className="text-sm font-semibold text-gray-700">{inviteData?.email || 'Loading...'}</p>
                    </div>

                    <FloatingLabelInput
                        type="password"
                        label="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        error={!!error && error.toLowerCase().includes('password') && !error.toLowerCase().includes('match')}
                    />

                    <FloatingLabelInput
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        error={!!error && error.toLowerCase().includes('match')}
                    />

                    {error && <ErrorAlert msg={error} />}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3.5 mt-2 flex items-center justify-center rounded-xl text-white font-bold bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:shadow-xl active:scale-[0.98] cursor-pointer"}`}
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            "Accept & Create Account"
                        )}
                    </button>
                </form>

                <div className="text-center w-full mt-4">
                    <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                        By creating an account, you agree to our <span className="text-blue-600 font-semibold cursor-pointer">Terms of Service</span> and <span className="text-blue-600 font-semibold cursor-pointer">Privacy Policy</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JoinTeamPage;
