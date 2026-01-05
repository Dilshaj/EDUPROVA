'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { X, MapPin, Briefcase, UserCheck, UserPlus } from 'lucide-react'

interface Visitor {
    id: string
    name: string
    role: string
    company: string
    location: string
    image: string
    isConnected: boolean
}

interface RecentVisitorsModalProps {
    isOpen: boolean
    onClose: () => void
}

const visitors: Visitor[] = [
    {
        id: '1',
        name: 'Ravi Kumar',
        role: 'HR Manager',
        company: 'TechCorp',
        location: 'Hyderabad, India',
        image: 'https://i.pravatar.cc/150?u=ravi',
        isConnected: false
    },
    {
        id: '2',
        name: 'Sneha Reddy',
        role: 'Frontend Developer',
        company: '',
        location: 'Bangalore, India',
        image: 'https://i.pravatar.cc/150?u=sneha',
        isConnected: true
    },
    {
        id: '3',
        name: 'Meera Nair',
        role: 'Content Strategist',
        company: '',
        location: 'Kochi, India',
        image: 'https://i.pravatar.cc/150?u=meera',
        isConnected: true
    },
    {
        id: '4',
        name: 'Rahul Verma',
        role: 'Recruiter',
        company: 'MNC Global',
        location: 'Gurgaon, India',
        image: 'https://i.pravatar.cc/150?u=rahul',
        isConnected: false
    },
    {
        id: '5',
        name: 'Priya Sharma',
        role: 'Talent Acquisition',
        company: 'StartUp Inc',
        location: 'Delhi, India',
        image: 'https://i.pravatar.cc/150?u=priya',
        isConnected: false
    },
    {
        id: '6',
        name: 'Vikram Singh',
        role: 'Tech Lead',
        company: '',
        location: 'Bangalore, India',
        image: 'https://i.pravatar.cc/150?u=vikram',
        isConnected: true
    },
    // Duplicate Data for Scrolling 
    {
        id: '7',
        name: 'Ravi Kumar',
        role: 'HR Manager',
        company: 'TechCorp',
        location: 'Hyderabad, India',
        image: 'https://i.pravatar.cc/150?u=ravi',
        isConnected: false
    },
    {
        id: '8',
        name: 'Sneha Reddy',
        role: 'Frontend Developer',
        company: '',
        location: 'Bangalore, India',
        image: 'https://i.pravatar.cc/150?u=sneha',
        isConnected: true
    },
    {
        id: '9',
        name: 'Meera Nair',
        role: 'Content Strategist',
        company: '',
        location: 'Kochi, India',
        image: 'https://i.pravatar.cc/150?u=meera',
        isConnected: true
    },
    {
        id: '10',
        name: 'Rahul Verma',
        role: 'Recruiter',
        company: 'MNC Global',
        location: 'Gurgaon, India',
        image: 'https://i.pravatar.cc/150?u=rahul',
        isConnected: false
    }
]

// Helper to check for recruiter role
const isRecruiter = (role: string) => {
    const recruiterRoles = ['HR Manager', 'Recruiter', 'Talent Acquisition'];
    return recruiterRoles.some(r => role.includes(r));
};

const RecentVisitorsModal = ({ isOpen, onClose }: RecentVisitorsModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white p-0 gap-0 border-none shadow-2xl rounded-2xl overflow-hidden">
                <DialogHeader className="px-6 py-5 border-b border-gray-100 bg-white">
                    <DialogTitle className="text-xl font-bold text-gray-900 text-left">Recent Visitors</DialogTitle>
                </DialogHeader>

                <div className="max-h-[450px] overflow-y-auto p-2 space-y-1 bg-white">
                    {visitors.map((visitor) => (
                        <div key={visitor.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group mx-2">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                        <AvatarImage src={visitor.image} alt={visitor.name} />
                                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">{visitor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {isRecruiter(visitor.role) && (
                                        <div className="absolute -bottom-1 -right-1 bg-purple-600 text-[10px] font-bold text-white px-1.5 py-0.5 rounded-md uppercase flex items-center justify-center border-2 border-white leading-none tracking-wide">
                                            REC
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">
                                        {visitor.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mb-0.5">
                                        <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                                        {visitor.role} {visitor.company && <span className="text-gray-400">@ {visitor.company}</span>}
                                    </p>
                                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 text-gray-300" />
                                        {visitor.location}
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant={visitor.isConnected ? "outline" : "default"}
                                size="sm"
                                className={`rounded-lg px-4 h-9 text-xs font-bold transition-all min-w-[110px] ${visitor.isConnected
                                    ? 'text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700 hover:border-green-300 border'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
                                    }`}
                            >
                                {visitor.isConnected ? (
                                    <span className="flex items-center gap-2">
                                        <UserCheck className="w-4 h-4" />
                                        Connected
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <UserPlus className="w-4 h-4" />
                                        Connect
                                    </span>
                                )}
                            </Button>
                        </div>
                    ))}

                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <Button variant="ghost" className="text-blue-600 text-sm font-bold hover:text-blue-700 hover:bg-blue-100 w-full">
                        View All Results
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RecentVisitorsModal
