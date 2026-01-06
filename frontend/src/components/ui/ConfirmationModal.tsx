import React, { useRef } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    type?: "warning" | "danger" | "info";
    isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onConfirm,
    onCancel,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    type = "warning",
    isLoading = false
}) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            // Entrance Animation
            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power3.out'
                }
            );
            gsap.fromTo(modalRef.current,
                {
                    scale: 0.7,
                    opacity: 0,
                    y: 40,
                    rotateX: -15
                },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.75)',
                    delay: 0.1
                }
            );
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const getIconStyles = () => {
        switch (type) {
            case "danger": return "bg-red-50 text-red-500 border-red-100";
            case "info": return "bg-blue-50 text-blue-500 border-blue-100";
            default: return "bg-amber-50 text-amber-500 border-amber-100";
        }
    };

    return (
        <div ref={overlayRef} className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div ref={modalRef} className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 perspective-1000">
                <div className="p-8 flex flex-col items-center text-center gap-6">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-inner border ${getIconStyles()}`}>
                        <IoWarningOutline className="text-4xl" />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h3>
                        <p className="text-gray-500 text-base leading-relaxed max-w-xs mx-auto">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="flex border-t border-gray-100 bg-gray-50/50 p-6 gap-4">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 px-6 py-3.5 text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all duration-300 active:bg-gray-200 rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex-1 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 active:scale-[0.98] rounded-2xl shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${type === "danger" ? "bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-red-200" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-200"
                            }`}
                    >
                        {isLoading && (
                            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin shadow-sm" />
                        )}
                        {isLoading ? 'Processing...' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
