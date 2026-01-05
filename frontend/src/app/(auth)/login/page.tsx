'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import { IoAlertCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
const Login: React.FC = () => {
    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    // UI States
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [gloading, setGloading] = useState(false);

    const router = useRouter();

    // Warn on unsaved changes
    const hasUnsavedChanges = !!(email || password) && !loading && !gloading;
    const { showModal, confirmLeave, cancelLeave } = useUnsavedChanges(hasUnsavedChanges);

    // Handle Email/Password Login
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Please fill in all details.');
            return;
        }

        setLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
                remember: remember.toString(),
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                const session = await getSession();
                const userRole = (session?.user as any)?.role;

                const dashboardMap: Record<string, string> = {
                    ADMIN: "/dashboard/admin",
                    TEACHER: "/dashboard/teacher",
                    MONITOR: "/dashboard/monitor",
                    STUDENT: "/dashboard/home",
                };

                router.push(dashboardMap[userRole || "STUDENT"] || "/dashboard/home");
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setGloading(true);
            await signIn("google");
        } catch (error) {
            console.error(error);
            setGloading(false);
        }
    };

    const ErrorAlert = ({ msg }: { msg: string }) => (
        <div className="flex items-center gap-2 p-3.5 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1 duration-200">
            <IoAlertCircleOutline className="text-xl shrink-0" />
            <span className="font-medium">{msg}</span>
        </div>
    );

    return (
        <div className='w-full h-auto flex flex-col items-start justify-center gap-6 pb-4' >
            <div className='relative w-full max-w-xl flex flex-col gap-6 items-start'>
                <div className="text-start mb-0 w-full">
                    <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-sm text-gray-500">Please sign in to your account</p>
                </div>

                <form onSubmit={handleEmailLogin} className='w-full flex flex-col gap-5'>
                    <FloatingLabelInput
                        type="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error && error.includes('email')}
                    />
                    <FloatingLabelInput
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error && error.includes('password')}
                    />

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember-email"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="remember-email" className="text-sm text-gray-600 cursor-pointer">
                            Remember me
                        </label>
                    </div>

                    {error && <ErrorAlert msg={error} />}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 mt-2 flex items-center justify-center rounded-lg text-white font-semibold bg-blue-600 transition-all duration-200 ease-in-out shadow-md ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:shadow-lg active:scale-95 cursor-pointer"}`}
                    >
                        {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Sign In"}
                    </button>
                </form>

                <div className="flex items-center gap-3 my-1 w-full">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <p className="text-gray-400 text-xs uppercase font-medium">Or continue with</p>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full py-3 flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group cursor-pointer"
                >
                    {gloading ? (
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <FcGoogle className="text-xl group-hover:scale-110 transition-transform duration-200" />
                            <span className="text-gray-700 font-medium">Sign in with Google</span>
                        </>
                    )}
                </button>

                <div className="text-center w-full text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline font-medium">
                        Sign up
                    </Link>
                </div>

            </div>
            <ConfirmationModal
                isOpen={showModal}
                onConfirm={confirmLeave}
                onCancel={cancelLeave}
                message="Logging in... your progress will be lost if you leave now."
            />
        </div >
    )
}

export default Login