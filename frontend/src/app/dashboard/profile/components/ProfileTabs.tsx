'use client'

interface ProfileTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
    const tabs = ['About', 'Posts', 'Activity', 'Certificates']

    return (
        <div className="w-full bg-white border-b border-gray-100">
            <div className="flex gap-8 px-0">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`py-4 px-2 font-medium text-sm relative transition-colors ${activeTab === tab
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ProfileTabs
