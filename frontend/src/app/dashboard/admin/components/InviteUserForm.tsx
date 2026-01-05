'use client';

import { useState } from 'react';
import apiClient from '@/lib/api-client';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import { IoMailOutline, IoPersonAddOutline, IoCheckmarkCircleOutline, IoAlertCircleOutline } from 'react-icons/io5';

const InviteUserForm = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'TEACHER' | 'MONITOR'>('TEACHER');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        try {
            await apiClient.post('/invite/send', { email, role });
            setSuccess(`Invitation sent successfully to ${email}`);
            setEmail('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send invitation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <IoPersonAddOutline className="text-xl" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Invite Team Member</h3>
                    <p className="text-sm text-slate-500">Add a new Teacher or Monitor</p>
                </div>
            </div>

            <form onSubmit={handleInvite} className="flex flex-col gap-5">
                <FloatingLabelInput
                    type="email"
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500 ml-1">Select Role</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => setRole('TEACHER')}
                            className={`py-2 px-4 rounded-lg text-sm font-semibold transition-all border ${role === 'TEACHER'
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200'
                                }`}
                        >
                            Teacher
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('MONITOR')}
                            className={`py-2 px-4 rounded-lg text-sm font-semibold transition-all border ${role === 'MONITOR'
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200'
                                }`}
                        >
                            Monitor
                        </button>
                    </div>
                </div>

                {success && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-600 text-xs rounded-lg border border-emerald-100 animate-in fade-in slide-in-from-top-1">
                        <IoCheckmarkCircleOutline className="text-lg shrink-0" />
                        <span>{success}</span>
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1">
                        <IoAlertCircleOutline className="text-lg shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <IoMailOutline className="text-lg" />
                            Send Invitation
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default InviteUserForm;
