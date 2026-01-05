'use client'

import React, { useState, useEffect } from 'react'
import apiClient from '@/lib/api-client';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import { IoAlertCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

const Signup: React.FC = () => {
    // Steps: 'REGISTER' (Phone/OTP handled in Login page)
    const [step, setStep] = useState<'REGISTER'>('REGISTER');

    // Form States
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    // Auth States
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [loadingOtp, setLoadingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [timer, setTimer] = useState(0);
    const [success, setSuccess] = useState('');

    // UI States
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [gloading, setGloading] = useState(false)

    const router = useRouter();
    const searchParams = useSearchParams();

    // Check for redirects from Login (Optional phone/otp)
    useEffect(() => {
        const phoneFromUrl = searchParams?.get('phone');
        const otpFromUrl = searchParams?.get('otp');

        if (phoneFromUrl && otpFromUrl) {
            setPhone(phoneFromUrl);
            setOtp(otpFromUrl);
            setIsVerified(true);
        }
    }, [searchParams]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleSendOtp = async () => {
        if (!phone || phone.length < 10) {
            setError("Please enter a valid phone number.");
            return;
        }
        setLoadingOtp(true);
        setError("");
        try {
            await apiClient.post('/otp/phone/send-otp', { phone });
            setIsOtpSent(true);
            setTimer(30);
            setSuccess("OTP sent successfully!");
            setTimeout(() => setSuccess(""), 5000);
        } catch (err: any) {
            setError(err.response?.data?.message || err.response?.data?.error || "Failed to send OTP.");
        } finally {
            setLoadingOtp(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length < 4) {
            setError("Please enter a valid OTP.");
            return;
        }
        setVerifyingOtp(true);
        setError("");
        try {
            const verifyRes = await apiClient.post('/auth/verify-pre-login', { phone, otp });
            if (verifyRes.data.success) {
                setIsVerified(true);
                setSuccess("Phone number verified successfully!");
                setTimeout(() => setSuccess(""), 5000);
            } else {
                setError(verifyRes.data.error || "Invalid OTP.");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.response?.data?.error || "Verification failed.");
        } finally {
            setVerifyingOtp(false);
        }
    };

    // Warn on unsaved changes - Disable guard when submitting to allow redirects
    const hasUnsavedChanges = !!(firstName || lastName || email || password) && !loading && !gloading;
    const { showModal, confirmLeave, cancelLeave } = useUnsavedChanges(hasUnsavedChanges);

    // Handle Register
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            setError("Please fill in all your details correctly.");
            return;
        }

        if (!phone.trim()) {
            setError("Phone number is required.");
            return;
        }

        if (!isVerified) {
            setError("Please verify your phone number using the OTP first.");
            return;
        }

        if (!agreedToTerms) {
            setError("You must agree to the Terms and Conditions to proceed.");
            return;
        }

        setLoading(true);

        try {
            // Register User
            await apiClient.post('/auth/register', {
                firstName,
                lastName,
                email,
                password,
                role: 'STUDENT',
                userAgreement: agreedToTerms,
                phoneNumber: phone,
                otp: otp // Pass the verified OTP
            });

            // Sign In immediately
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
                phone, // Pass phone for context if needed
            });

            if (result?.error) {
                setError('Registration successful but login failed. Please try logging in.');
                router.push('/login');
            } else {
                router.push('/dashboard/home');
            }

        } catch (error: any) {
            const message = error.response?.data?.message || error.response?.data?.error;
            if (message) {
                setError(message);
            } else {
                setError("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setGloading(true);
            await signIn("google", { callbackUrl: "/" });
        } catch (error) {
            console.error(error);
            setGloading(false);
        }
    };

    const SuccessAlert = ({ msg }: { msg: string }) => (
        <div className="flex items-center gap-2 p-3.5 bg-emerald-50 text-emerald-600 text-sm rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-top-1 duration-200">
            <IoCheckmarkCircleOutline className="text-xl shrink-0" />
            <span className="font-medium">{msg}</span>
        </div>
    );

    const ErrorAlert = ({ msg }: { msg: string }) => (
        <div className="flex items-center gap-2 p-3.5 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1 duration-200">
            <IoAlertCircleOutline className="text-xl shrink-0" />
            <span className="font-medium">{msg}</span>
        </div>
    );

    return (
        <div className='w-full h-auto flex flex-col items-start justify-start gap-6 pb-4'>
            <div className='relative w-full max-w-xl flex flex-col gap-5 items-start'>

                <div className="text-start mb-2 w-full">
                    <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-sm text-gray-500">Please fill in your details to continue</p>
                </div>

                {/* STEP 3: REGISTRATION FORM */}
                <form onSubmit={handleRegister} className='w-full flex flex-col gap-5'>
                    <div className='flex gap-4'>
                        <FloatingLabelInput
                            type="text"
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-1/2"
                        />
                        <FloatingLabelInput
                            type="text"
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-1/2"
                            error={!!error && error.includes('Last Name')}
                        />
                    </div>

                    <FloatingLabelInput
                        type="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error && (error.includes('email') || error.includes('exists'))}
                    />

                    <FloatingLabelInput
                        type="tel"
                        label="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={isOtpSent || isVerified}
                        rightElement={
                            isVerified ? (
                                <div className="p-1 bg-emerald-100 rounded-full">
                                    <IoCheckmarkCircleOutline className="text-emerald-600 text-xl" />
                                </div>
                            ) : !isOtpSent ? (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={loadingOtp || phone.length < 10}
                                    className="text-blue-600 text-xs font-semibold pb-2 disabled:text-gray-400 cursor-pointer"
                                >
                                    {loadingOtp ? (
                                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "Get OTP"
                                    )}
                                </button>
                            ) : null
                        }
                    />

                    {isOtpSent && !isVerified && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-2">
                            <FloatingLabelInput
                                type="text"
                                label="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                rightElement={
                                    <button
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        disabled={verifyingOtp || otp.length < 4}
                                        className="text-blue-600 text-xs font-semibold hover:underline disabled:text-gray-400 cursor-pointer"
                                    >
                                        {verifyingOtp ? (
                                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            "Verify"
                                        )}
                                    </button>
                                }
                            />
                            <div className="flex justify-end px-1">
                                {timer > 0 ? (
                                    <p className="text-xs text-gray-500 font-medium">
                                        Resend OTP in <span className="text-blue-600 font-bold w-5 inline-block text-center">{timer}s</span>
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={loadingOtp}
                                        className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer disabled:text-gray-400"
                                    >
                                        {loadingOtp ? "Resending..." : "Resend OTP"}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

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
                            id="terms"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                            I agree to the <Link href="#" className="text-blue-600 hover:underline">Terms and Conditions</Link>
                        </label>
                    </div>

                    {success && <SuccessAlert msg={success} />}
                    {error && <ErrorAlert msg={error} />}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 flex items-center justify-center rounded-lg text-white font-semibold bg-blue-600 transition-all duration-200 ease-in-out shadow-md ${loading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-700 hover:shadow-lg active:scale-95 cursor-pointer"
                            }`}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Register & Login"
                        )}
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
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline font-medium">
                        Sign in
                    </Link>
                </div>

            </div>
            <ConfirmationModal
                isOpen={showModal}
                onConfirm={confirmLeave}
                onCancel={cancelLeave}
                message="You are in the middle of registration. Leaving now will clear your progress."
            />
        </div >
    )
}

export default Signup
