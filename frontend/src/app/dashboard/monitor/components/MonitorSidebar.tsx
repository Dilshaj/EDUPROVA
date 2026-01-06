'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, Activity, ClipboardList, ShieldAlert } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const MonitorSidebar = ({ isCollapsed, onHover }: {
  isCollapsed: boolean,
  onHover?: (name: string | null, event?: React.MouseEvent) => void
}) => {
  const pathname = usePathname();
  const activeDesignRef = useRef<HTMLDivElement>(null);

  const monitorMenuItems = [
    {
      name: 'Dashboard',
      icon: Home,
      href: '/dashboard/monitor',
      isActive: pathname === '/dashboard/monitor'
    },
    {
      name: 'System Stats',
      icon: BarChart3,
      href: '/dashboard/monitor/stats',
      isActive: pathname.startsWith('/dashboard/monitor/stats')
    },
    {
      name: 'Activity Logs',
      icon: Activity,
      href: '/dashboard/monitor/activity',
      isActive: pathname.startsWith('/dashboard/monitor/activity')
    },
    {
      name: 'Reports',
      icon: ClipboardList,
      href: '/dashboard/monitor/reports',
      isActive: pathname.startsWith('/dashboard/monitor/reports')
    },
    {
      name: 'Incidents',
      icon: ShieldAlert,
      href: '/dashboard/monitor/incidents',
      isActive: pathname.startsWith('/dashboard/monitor/incidents')
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
      {monitorMenuItems.map((item) => {
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

            {item.isActive && isCollapsed && <div ref={activeDesignRef} className="absolute w-20 h-16 ml-6 rounded-3xl bg-[#F3F8FF] z-0">
              <div className="relative w-12 bg-transparent h-full ">
                <div className="absolute w-11 h-5 -translate-y-5 left-7 rounded-br-2xl bg-[#ffffff] z-10" />
                <div className="absolute w-11 h-5 translate-y-16 left-7 rounded-tr-2xl bg-[#ffffff] z-10" />
                <div className="absolute w-10 -translate-y-4 left-7 h-5 bg-[#F3F8FF] z-5" />
                <div className="absolute w-10 h-5 translate-y-15 left-7 bg-[#F3F8FF] z-5" />
              </div>
            </div>}
          </div>
        );
      })}
    </nav>
  );
};

export default MonitorSidebar;