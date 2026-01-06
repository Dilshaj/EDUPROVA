import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import ConfirmationModal from "../ui/ConfirmationModal";

const LogoutButton = ({ isCollapsed, onHover }: {
    isCollapsed: boolean,
    onHover?: (name: string | null, event?: React.MouseEvent) => void
}) => {
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
                onMouseEnter={(e) => onHover?.("Logout", e)}
                onMouseLeave={() => onHover?.(null)}
                className={`flex items-center rounded-xl w-full transition-all duration-500 ease-in-out group text-slate-600 hover:bg-red-50 hover:text-red-500 relative ${isCollapsed ? 'justify-center py-3' : 'gap-4 px-4 py-3'
                    }`}
            >
                <LogOut size={20} className="text-slate-400 group-hover:text-red-500 transition-colors shrink-0" />

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
