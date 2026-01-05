'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Clock, X, Loader2 } from 'lucide-react';
import apiClient from '@/lib/api-client';
import { toast } from 'sonner';

type Role = 'ADMIN' | 'TEACHER' | 'MONITOR';

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: 'active';
    avatar?: string;
    joinedAt?: string;
}

interface PendingInvite {
    id: string;
    email: string;
    role: Role;
    createdAt: string;
    expiresAt: string;
}

import ConfirmationModal from '@/components/ui/ConfirmationModal';

const TeamAccessPage = () => {
    const [email, setEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState<Role>('ADMIN');
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [activeMembers, setActiveMembers] = useState<TeamMember[]>([]);
    const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
    const [processingInviteId, setProcessingInviteId] = useState<string | null>(null);

    const [isUserExistsModalOpen, setIsUserExistsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    useEffect(() => {
        fetchTeamMembers();
        fetchPendingInvites();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get<TeamMember[]>('/users/team-members');
            setActiveMembers(response.data);
        } catch (error: any) {
            console.error('Error fetching team members:', error);
            toast.error(error.userMessage || 'Failed to load team members');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPendingInvites = async () => {
        try {
            const response = await apiClient.get<PendingInvite[]>('/invite/pending');
            setPendingInvites(response.data);
        } catch (error: any) {
            console.error('Error fetching pending invites:', error);
        }
    };

    const handleSendInvite = async () => {
        if (!email || !email.includes('@')) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsSending(true);
        try {
            await apiClient.post('/invite/send', {
                email,
                role: selectedRole
            });

            toast.success('Invitation sent successfully!');
            setEmail('');
            fetchPendingInvites();
        } catch (error: any) {
            console.log('Invite error response:', error.response?.data);
            const errorMessage = error.response?.data?.message || '';
            const status = error.response?.status;

            // Handle specific 400 errors with a modal
            if (status === 400) {
                if (errorMessage === 'User with this email already exists') {
                    setModalContent({
                        title: 'User Already Exists',
                        message: `The user with email "${email}" is already a member of Eduprova.`
                    });
                    setIsUserExistsModalOpen(true);
                    return;
                }

                if (errorMessage.includes('already sent') || errorMessage.includes('wait before sending')) {
                    setModalContent({
                        title: 'Invitation Already Sent',
                        message: `An invite was already sent to "${email}" in the last 24 hours. Please wait before sending another.`
                    });
                    setIsUserExistsModalOpen(true);
                    return;
                }
            }

            toast.error(error.userMessage || errorMessage || 'Failed to send invitation');
        } finally {
            setIsSending(false);
        }
    };

    const handleResendInvite = async (inviteId: string) => {
        setProcessingInviteId(inviteId);
        try {
            await apiClient.post(`/invite/resend/${inviteId}`);
            toast.success('Invitation resent successfully!');
            fetchPendingInvites();
        } catch (error: any) {
            console.error('Error resending invite:', error);
            toast.error(error.userMessage || 'Failed to resend invitation');
        } finally {
            setProcessingInviteId(null);
        }
    };

    const handleCancelInvite = async (inviteId: string) => {
        setProcessingInviteId(inviteId);
        try {
            await apiClient.delete(`/invite/cancel/${inviteId}`);
            toast.success('Invitation cancelled');
            fetchPendingInvites();
        } catch (error: any) {
            console.error('Error canceling invite:', error);
            toast.error(error.userMessage || 'Failed to cancel invitation');
        } finally {
            setProcessingInviteId(null);
        }
    };

    const roles: Role[] = ['ADMIN', 'TEACHER', 'MONITOR'];

    const getRoleDescription = (role: Role) => {
        const descriptions = {
            ADMIN: 'Can create courses, assessments, and view student data',
            TEACHER: 'Can create and manage courses and assessments',
            MONITOR: 'Can view courses and student progress'
        };
        return descriptions[role];
    };

    const getAvatarColor = (index: number) => {
        const colors = [
            'bg-blue-100 text-blue-600',
            'bg-green-100 text-green-600',
            'bg-purple-100 text-purple-600',
            'bg-orange-100 text-orange-600',
            'bg-pink-100 text-pink-600',
        ];
        return colors[index % colors.length];
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="p-8 bg-linear-to-br from-slate-50 to-slate-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Team Access</h1>
                    <p className="text-slate-600">Control who can access your Eduprova workspace</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Invite Member */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                                Invite Member
                            </h2>

                            {/* Email Input */}
                            <div className="mb-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email address"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendInvite()}
                                />
                            </div>

                            {/* Role Selection */}
                            <div className="mb-4">
                                <div className="grid grid-cols-3 gap-2">
                                    {roles.map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => setSelectedRole(role)}
                                            className={`px-3b cursor-pointer py-2.5 rounded-lg text-xs font-semibold transition-all ${selectedRole === role
                                                ? 'bg-slate-900 text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Role Description */}
                            <p className="text-xs text-slate-500 mb-6">
                                {getRoleDescription(selectedRole)}
                            </p>

                            {/* Send Invite Button */}
                            <button
                                onClick={handleSendInvite}
                                disabled={isSending || !email}
                                className="w-full cursor-pointer bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Invite'
                                )}
                            </button>

                            {/* Pending Count */}
                            {pendingInvites.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-slate-200">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                        <span className="font-bold text-slate-700">{pendingInvites.length} PENDING</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {pendingInvites.length} invitation{pendingInvites.length !== 1 ? 's' : ''} awaiting response
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Team Members */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Active Members */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Team Members · {activeMembers.length}
                                </h2>
                            </div>

                            {isLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                                </div>
                            ) : activeMembers.length === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    No team members yet
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-sm font-semibold text-slate-900 mb-4">Active Members</h3>

                                    <div className="space-y-3">
                                        {activeMembers.map((member, index) => (
                                            <div
                                                key={member.id}
                                                className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${getAvatarColor(index)}`}>
                                                        {member.avatar ? (
                                                            <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                                        ) : (
                                                            getInitials(member.name)
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900 text-sm">
                                                            {member.email}
                                                        </p>
                                                        <p className="text-xs text-slate-500">{member.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                                                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                                        Active
                                                    </span>
                                                    {/* <button className="text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors">
                                                        Remove
                                                    </button> */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Pending Invitations */}
                        {pendingInvites.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                        Pending Invitations ({pendingInvites.length})
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {pendingInvites.map((invite, index) => (
                                        <div
                                            key={invite.id}
                                            className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 border-orange-200 bg-orange-50 text-orange-600`}>
                                                    {invite.email.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 text-sm">
                                                        {invite.email}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        {invite.role} · Invited {formatDate(invite.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleResendInvite(invite.id)}
                                                    disabled={processingInviteId === invite.id}
                                                    className="text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors disabled:opacity-50"
                                                >
                                                    {processingInviteId === invite.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                                                    ) : (
                                                        'Resend'
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleCancelInvite(invite.id)}
                                                    disabled={processingInviteId === invite.id}
                                                    className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <ConfirmationModal
                    isOpen={isUserExistsModalOpen}
                    onConfirm={() => setIsUserExistsModalOpen(false)}
                    onCancel={() => setIsUserExistsModalOpen(false)}
                    title={modalContent.title}
                    message={modalContent.message}
                    confirmLabel="Okay"
                    cancelLabel="Close"
                    type="info"
                />
            </div>
        </div>
    );
};

export default TeamAccessPage;
