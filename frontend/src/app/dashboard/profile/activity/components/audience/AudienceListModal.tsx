'use client'

import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { X, MapPin, Briefcase, UserCheck, UserPlus, Clock } from 'lucide-react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface AudienceMember {
    id: string
    name: string
    role: string
    location: string
    image: string
    status: 'Connected' | 'Pending' | 'Connect'
}

interface AudienceListModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    data: AudienceMember[]
}

const AudienceListModal = ({ isOpen, onClose, title, data }: AudienceListModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-white p-0 overflow-hidden rounded-2xl gap-0 border-none shadow-2xl">
                <VisuallyHidden>
                    <DialogTitle>{title}</DialogTitle>
                </VisuallyHidden>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                    <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="max-h-[600px] overflow-y-auto p-4 space-y-2 bg-white scrollbar-hide">
                    {data.map((member) => (
                        <div key={member.id} className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10 md:h-12 md:w-12 border border-gray-100">
                                    <AvatarImage src={member.image} alt={member.name} />
                                    <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>

                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm leading-tight flex items-center gap-2">
                                        {member.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
                                        <Briefcase className="w-3 h-3 text-gray-400" />
                                        {member.role}
                                    </p>
                                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                        <MapPin className="w-3 h-3 text-gray-300" />
                                        {member.location}
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant={member.status === 'Connect' ? "default" : "outline"}
                                size="sm"
                                disabled={member.status === 'Pending'}
                                className={`rounded-lg px-3 h-8 text-xs font-semibold shadow-sm transition-all min-w-[100px] ${member.status === 'Connected'
                                    ? 'text-green-600 border-green-200 bg-green-50/50 hover:bg-green-100 hover:text-green-700 hover:border-green-300'
                                    : member.status === 'Pending'
                                        ? 'text-gray-500 border-gray-200 bg-gray-50'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                {member.status === 'Connected' && (
                                    <span className="flex items-center gap-1.5">
                                        <UserCheck className="w-3.5 h-3.5" />
                                        Connected
                                    </span>
                                )}
                                {member.status === 'Pending' && (
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        Pending
                                    </span>
                                )}
                                {member.status === 'Connect' && (
                                    <span className="flex items-center gap-1.5">
                                        <UserPlus className="w-3.5 h-3.5" />
                                        Connect
                                    </span>
                                )}
                            </Button>
                        </div>
                    ))}

                    <div className="pt-4 text-center sticky bottom-0 bg-white pb-2 border-t border-gray-50">
                        <Button variant="ghost" className="text-blue-600 text-sm font-bold hover:text-blue-700 hover:bg-blue-50 w-full">
                            View All Results
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AudienceListModal
