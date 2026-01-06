import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, PenTool, Users, Calendar, Settings } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const TeacherSidebar = ({ isCollapsed, onHover }: {
    isCollapsed: boolean,
    onHover?: (name: string | null, event?: React.MouseEvent) => void
}) => {
    const pathname = usePathname();
    const activeDesignRef = useRef<HTMLDivElement>(null);

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

    useGSAP(() => {
        if (isCollapsed && activeDesignRef.current) {
            gsap.fromTo(activeDesignRef.current, {
                x: 100,
                opacity: 0,
            }, {
                duration: 0.3,
                x: 0,
                opacity: 1,
                delay: 0.5,
                ease: 'power2.out',
                clearProps: "all"
            })
        }
    }, [isCollapsed]);

    return (
        <nav className={`space-y-2 ${isCollapsed ? 'flex flex-col items-center gap-2' : ''}`}>
            {teacherMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                    <div
                        key={item.href}
                        className={`relative group w-full ${isCollapsed ? 'flex flex-col items-center justify-center h-16' : ''}`}
                        onMouseEnter={(e) => onHover?.(item.name, e)}
                        onMouseLeave={() => onHover?.(null)}
                    >
                        <Link
                            href={item.href}
                            className={`
                                flex z-50 items-center rounded-xl transition-all duration-300
                                ${isCollapsed
                                    ? `w-10 h-10 justify-center ${item.isActive ? 'ml-3' : ''}`
                                    : 'gap-3 px-4 py-3'
                                }
                                ${item.isActive
                                    ? 'bg-linear-to-r from-[#0066FF] to-[#E056FD] text-white shadow-lg shadow-blue-200/50 font-semibold'
                                    : 'text-slate-600 hover:bg-white/50 hover:text-slate-900 font-medium'
                                }
                            `}
                        >
                            <Icon
                                className={`w-5 h-5 z-50 transition-colors ${isCollapsed ? 'shrink-0' : ''} ${item.isActive
                                    ? 'text-white'
                                    : 'text-slate-400 group-hover:text-slate-600'
                                    }`}
                            />
                            {!isCollapsed && <span className="text-sm">{item.name}</span>}
                        </Link>

                        {item.isActive && isCollapsed && <div ref={activeDesignRef} className="absolute w-20 h-16 ml-6 rounded-3xl bg-[#DBF1FE] z-0">
                            <div className="relative w-12 bg-transparent h-full ">
                                <div className="absolute w-11 h-5 -translate-y-5 left-7 rounded-br-2xl bg-[#ffffff] z-10" />
                                <div className="absolute w-11 h-5 translate-y-16 left-7 rounded-tr-2xl bg-[#ffffff] z-10" />
                                <div className="absolute w-10 -translate-y-4 left-7 h-5 bg-[#DBF1FE] z-5" />
                                <div className="absolute w-10 h-5 translate-y-15 left-7 bg-[#DBF1FE] z-5" />
                            </div>
                        </div>}
                    </div>
                );
            })}
        </nav>
    );
};