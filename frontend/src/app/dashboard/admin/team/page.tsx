'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Clock, X, Loader2, Trash2 } from 'lucide-react';
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
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    useEffect(() => {
        fetchCurrentUser();
        fetchTeamMembers();
        fetchPendingInvites();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const response = await apiClient.get('/users/profile');
            setCurrentUser(response.data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

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

    const handleRemoveMember = async () => {
        if (!memberToRemove) return;

        try {
            setIsLoading(true);
            await apiClient.delete(`/users/team-member/${memberToRemove.id}`);
            toast.success('Team member removed successfully');
            fetchTeamMembers();
        } catch (error: any) {
            console.error('Error removing member:', error);
            toast.error(error.userMessage || 'Failed to remove team member');
        } finally {
            setIsLoading(false);
            setIsRemoveModalOpen(false);
            setMemberToRemove(null);
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
        <div className="p-8 bg-[#DBF1FE] min-h-screen">
            <div className="w-full">
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
                                    className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 bg-slate-50/50 text-sm transition-all placeholder:text-slate-400"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendInvite()}
                                />
                            </div>

                            {/* Role Selection */}
                            <div className="mb-4">
                                <div className="flex bg-slate-100 p-1.5 rounded-2xl relative h-[48px] items-center">
                                    {roles.map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => setSelectedRole(role)}
                                            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer z-10 ${selectedRole === role
                                                ? 'text-slate-900'
                                                : 'text-slate-500 hover:text-slate-700'
                                                }`}
                                        >
                                            {role.charAt(0) + role.slice(1).toLowerCase()}
                                        </button>
                                    ))}
                                    {/* Sliding background pill */}
                                    <div
                                        className="absolute top-1.5 bottom-1.5 rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out"
                                        style={{
                                            width: `calc((100% - 12px) / 3)`,
                                            left: `calc(6px + (${roles.indexOf(selectedRole)} * (100% - 12px) / 3))`
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Role Description */}
                            <p className="text-[11px] text-slate-500 mb-6 px-1">
                                {getRoleDescription(selectedRole)}
                            </p>

                            {/* Send Invite Button */}
                            <button
                                onClick={handleSendInvite}
                                disabled={isSending || !email}
                                className="w-full cursor-pointer bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                                                className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100"
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
                                                        <p className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                                                            {member.email}
                                                            {member.id === currentUser?.id && (
                                                                <span className="text-[10px] bg-slate-100 text-slate-500 py-0.5 px-1.5 rounded-md font-bold uppercase tracking-wider">
                                                                    You
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-slate-500">{member.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className={`flex items-center gap-3 ${member.id !== currentUser?.id ? 'group-hover:hidden' : ''}`}>
                                                        <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                                                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                                            Active
                                                        </span>
                                                    </div>
                                                    {member.id !== currentUser?.id && (
                                                        <button
                                                            onClick={() => {
                                                                setMemberToRemove(member);
                                                                setIsRemoveModalOpen(true);
                                                            }}
                                                            className="hidden group-hover:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-all cursor-pointer"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                            Remove
                                                        </button>
                                                    )}
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
                                            key={invite.id + index}
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
                    isOpen={isRemoveModalOpen}
                    onConfirm={handleRemoveMember}
                    onCancel={() => {
                        setIsRemoveModalOpen(false);
                        setMemberToRemove(null);
                    }}
                    title="Remove Team Member"
                    message={`Are you sure you want to remove ${memberToRemove?.email}? Their account and data will be permanently deleted from the database.`}
                    confirmLabel="Remove"
                    cancelLabel="Cancel"
                    type="danger"
                    isLoading={isLoading}
                />

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
