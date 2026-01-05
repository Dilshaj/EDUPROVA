'use client';

import React from 'react';
import InviteUserForm from '@/app/dashboard/admin/components/InviteUserForm';
import { Users, BookOpen, Mail, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const AdminPage = () => {
    const stats = [
        {
            title: 'Total Users',
            value: '2,543',
            change: '+12.5%',
            isPositive: true,
            icon: Users,
            color: 'blue'
        },
        {
            title: 'Active Courses',
            value: '48',
            change: '+3',
            isPositive: true,
            icon: BookOpen,
            color: 'purple'
        },
        {
            title: 'Pending Invites',
            value: '7',
            change: '-2',
            isPositive: true,
            icon: Mail,
            color: 'orange'
        },
        {
            title: 'Revenue',
            value: '$45,231',
            change: '+8.2%',
            isPositive: true,
            icon: DollarSign,
            color: 'green'
        }
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            blue: 'bg-blue-50 text-blue-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600',
            green: 'bg-green-50 text-green-600'
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    return (
        <div className="p-8 flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-600">Manage your institution and team invites</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.isPositive ? TrendingUp : TrendingDown;
                    return (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                    <TrendIcon className="w-4 h-4" />
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">
                                {stat.value}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium">
                                {stat.title}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <InviteUserForm />
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white border border-slate-200 rounded-2xl h-[400px] flex items-center justify-center shadow-sm">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-500 font-medium">
                                Administrative Overview & Analytics Dashboard
                            </p>
                            <p className="text-slate-400 text-sm mt-2">(Coming Soon)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
