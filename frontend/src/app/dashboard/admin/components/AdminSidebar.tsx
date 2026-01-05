'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Settings } from 'lucide-react';

const AdminSidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const adminMenuItems = [
    {
      name: 'Dashboard',
      icon: Home,
      href: '/dashboard/admin',
      isActive: pathname === '/dashboard/admin'
    },
    {
      name: 'Team Access',
      icon: Users,
      href: '/dashboard/admin/team',
      isActive: pathname.startsWith('/dashboard/admin/team')
    },
    {
      name: 'Settings',
      icon: Settings,
      href: '/dashboard/admin/settings',
      isActive: pathname.startsWith('/dashboard/admin/settings')
    }
  ];

  return (
    <nav className={`space-y-2 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
      {adminMenuItems.map((item) => {
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

export default AdminSidebar;
