import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import ConfirmationModal from "../ui/ConfirmationModal";

const LogoutButton = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);

        // Give the user enough time to see the beautiful loading animation
        setTimeout(async () => {
            try {
                const result = await signOut({ redirect: false, callbackUrl: "/login" });
                if (result?.url) {
                    window.location.href = result.url;
                }
            } catch (error) {
                console.error("Logout error:", error);
                setIsLoggingOut(false);
            }
        }, 500); // 500ms delay for a premium feedback feel
    };

    return (
        <div className={`shrink-0 ${isCollapsed ? 'px-3 pb-4 pt-1' : 'px-6 pb-2 pt-1 shadow-2xl'}`}>
            <button
                onClick={() => setIsLogoutModalOpen(true)}
                className={`flex items-center rounded-xl w-full transition-all duration-500 ease-in-out group text-slate-600 hover:bg-red-50 hover:text-red-500 relative ${isCollapsed ? 'justify-center py-3' : 'gap-4 px-4 py-3'
                    }`}
            >
                <LogOut size={20} className="text-slate-400 group-hover:text-red-500 transition-colors shrink-0" />

                {/* Collapsed Tooltip */}
                {isCollapsed && (
                    <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 z-50">
                        <div className="bg-white border border-red-100 py-2 px-4 rounded-full shadow-xl shadow-red-500/10 flex items-center gap-2 whitespace-nowrap">
                            <div className="w-1 h-3 bg-red-500 rounded-full" />
                            <span className="text-red-600 font-semibold text-[14px]">Logout</span>
                        </div>
                    </div>
                )}

                <div className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100'
                    }`}>
                    <span className="font-medium text-[15px] whitespace-nowrap">
                        Logout
                    </span>
                </div>
            </button>

            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                onConfirm={handleLogout}
                onCancel={() => setIsLogoutModalOpen(false)}
                title="Logout Confirmation"
                message="Are you sure you want to log out? You will need to sign in again to access your dashboard."
                confirmLabel="Log Out"
                cancelLabel="Cancel"
                type="danger"
                isLoading={isLoggingOut}
            />
        </div>
    );
};

export default LogoutButton;
