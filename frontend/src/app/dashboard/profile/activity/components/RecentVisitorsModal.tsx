'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { X, MapPin, Briefcase } from 'lucide-react'

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
    }
]

const RecentVisitorsModal = ({ isOpen, onClose }: RecentVisitorsModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-white p-0 overflow-hidden rounded-2xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Recent Visitors</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="max-h-[600px] overflow-y-auto p-4 space-y-4">
                    {visitors.map((visitor) => (
                        <div key={visitor.id} className="flex items-center justify-between p-2">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 border border-gray-100">
                                    <AvatarImage src={visitor.image} alt={visitor.name} />
                                    <AvatarFallback>{visitor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{visitor.name}</h4>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <Briefcase className="w-3 h-3" />
                                        {visitor.role} {visitor.company && `@ ${visitor.company}`}
                                    </p>
                                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                        <MapPin className="w-3 h-3" />
                                        {visitor.location}
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant={visitor.isConnected ? "outline" : "default"}
                                size="sm"
                                className={`rounded-full px-4 h-8 text-xs font-medium ${visitor.isConnected
                                        ? 'text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                {visitor.isConnected ? (
                                    <>
                                        {/* Simple connected icon/text */}
                                        Connected
                                    </>
                                ) : (
                                    "Connect"
                                )}
                            </Button>
                        </div>
                    ))}

                    <div className="pt-4 text-center">
                        <Button variant="ghost" className="text-blue-600 text-sm hover:text-blue-700 hover:bg-blue-50">
                            View All Results
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RecentVisitorsModal
