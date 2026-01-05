'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, PenTool, Users, Calendar, Settings } from 'lucide-react';

export const TeacherSidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const pathname = usePathname();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const teacherMenuItems = [
        {
            name: 'Dashboard',
            icon: Home,
            href: '/dashboard/teacher',
            isActive: pathname === '/dashboard/teacher'
        },
        {
            name: 'My Courses',
            icon: BookOpen,
            href: '/dashboard/teacher/courses',
            isActive: pathname.startsWith('/dashboard/teacher/courses')
        },
        {
            name: 'Assessments',
            icon: PenTool,
            href: '/dashboard/teacher/assessments',
            isActive: pathname.startsWith('/dashboard/teacher/assessments')
        },
        {
            name: 'Students',
            icon: Users,
            href: '/dashboard/teacher/students',
            isActive: pathname.startsWith('/dashboard/teacher/students')
        },
        {
            name: 'Schedule',
            icon: Calendar,
            href: '/dashboard/teacher/schedule',
            isActive: pathname.startsWith('/dashboard/teacher/schedule')
        }
    ];

    return (
        <nav className={`space-y-2 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
            {teacherMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                    <div
                        key={item.href}
                        className="relative group"
                        onMouseEnter={() => setHoveredItem(item.name)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <Link
                            href={item.href}
                            className={`
                                flex items-center rounded-xl transition-all duration-300
                                ${isCollapsed
                                    ? 'w-12 h-12 justify-center'
                                    : 'gap-3 px-4 py-3'
                                }
                                ${item.isActive
                                    ? 'bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-200/50 font-semibold'
                                    : 'text-slate-600 hover:bg-white/50 hover:text-slate-900 font-medium'
                                }
                            `}
                        >
                            <Icon
                                className={`w-5 h-5 transition-colors ${isCollapsed ? 'shrink-0' : ''} ${item.isActive
                                    ? 'text-white'
                                    : 'text-slate-400 group-hover:text-slate-600'
                                    }`}
                            />
                            {!isCollapsed && <span className="text-sm">{item.name}</span>}
                        </Link>

                        {/* Tooltip for collapsed state */}
                        {isCollapsed && hoveredItem === item.name && (
                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap z-50 pointer-events-none">
                                {item.name}
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};