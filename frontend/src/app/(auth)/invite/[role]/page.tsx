'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import apiClient from '@/lib/api-client';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import { IoAlertCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

const InviteAcceptPage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const role = (params.role as string)?.toUpperCase();
    const token = searchParams.get('token');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!token) {
            setError('Missing invitation token.');
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);

        try {
            await apiClient.post('/auth/accept-invite', {
                token,
                firstName,
                lastName,
                password,
            });

            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to accept invitation. The link may have expired.');
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100 max-w-md">
                    <IoAlertCircleOutline className="text-4xl text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Invalid Invite</h2>
                    <p className="text-gray-600">This invitation link is missing a valid token. Please contact the administrator.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl mx-auto flex flex-col gap-6 py-8">
            <div className="text-start">
                <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
                <p className="text-sm text-gray-500">You've been invited as a <strong>{role}</strong>. Please set up your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex gap-4">
                    <FloatingLabelInput
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="flex-1"
                    />
                    <FloatingLabelInput
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="flex-1"
                    />
                </div>

                <FloatingLabelInput
                    type="password"
                    label="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <FloatingLabelInput
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {error && (
                    <div className="flex items-center gap-2 p-3.5 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                        <IoAlertCircleOutline className="text-xl shrink-0" />
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-2 p-3.5 bg-emerald-50 text-emerald-600 text-sm rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-top-1">
                        <IoCheckmarkCircleOutline className="text-xl shrink-0" />
                        <span className="font-medium">{success}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !!success}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                        'Complete Registration'
                    )}
                </button>
            </form>
        </div>
    );
};

export default InviteAcceptPage;
