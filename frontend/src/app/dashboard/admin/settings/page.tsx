'use client';

import React from 'react';
import { Bell, Shield, Palette, Database } from 'lucide-react';

const AdminSettingsPage = () => {
    const settingsSections = [
        {
            title: 'Notifications',
            icon: Bell,
            description: 'Manage notification preferences',
            settings: [
                { label: 'Email notifications', type: 'toggle', value: true },
                { label: 'Push notifications', type: 'toggle', value: false },
            ]
        },
        {
            title: 'Security',
            icon: Shield,
            description: 'Security and privacy settings',
            settings: [
                { label: 'Two-factor authentication', type: 'toggle', value: false },
                { label: 'Session timeout (minutes)', type: 'input', value: '30' },
            ]
        },
        {
            title: 'Appearance',
            icon: Palette,
            description: 'Customize the look and feel',
            settings: [
                { label: 'Dark mode', type: 'toggle', value: false },
                { label: 'Compact view', type: 'toggle', value: false },
            ]
        },
        {
            title: 'Data Management',
            icon: Database,
            description: 'Manage your data and storage',
            settings: [
                { label: 'Auto-save drafts', type: 'toggle', value: true },
                { label: 'Storage limit (GB)', type: 'input', value: '100' },
            ]
        }
    ];

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
                    <p className="text-slate-600">Manage your application preferences</p>
                </div>

                <div className="space-y-6">
                    {settingsSections.map((section, idx) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <Icon className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            {section.title}
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            {section.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 pl-14">
                                    {section.settings.map((setting, settingIdx) => (
                                        <div
                                            key={settingIdx}
                                            className="flex items-center justify-between py-2"
                                        >
                                            <span className="text-sm font-medium text-slate-700">
                                                {setting.label}
                                            </span>
                                            {setting.type === 'toggle' ? (
                                                <button
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${setting.value ? 'bg-blue-600' : 'bg-slate-200'
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${setting.value ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                    />
                                                </button>
                                            ) : (
                                                <input
                                                    type="text"
                                                    defaultValue={String(setting.value)}
                                                    className="w-24 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button className="px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsPage;
