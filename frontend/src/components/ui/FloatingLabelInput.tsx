import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FloatingLabelInputProps {
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    className?: string;
    disabled?: boolean;
    error?: boolean;
    rightElement?: React.ReactNode;
    required?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
    type = "text",
    value,
    onChange,
    label,
    className = "",
    disabled = false,
    error = false,
    rightElement,
    required = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const handlePaste = (e: React.ClipboardEvent) => {
        if (isPassword) {
            e.preventDefault();
        }
    };

    return (
        <div className={`relative ${className}`}>
            <input
                type={inputType}
                value={value}
                onChange={onChange}
                onPaste={handlePaste}
                style={{ backgroundColor: 'white' }}
                className={`block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white! rounded-lg appearance-none focus:outline-none focus:ring-0 peer transition-all duration-200 
                    ${error
                        ? 'border-red-500! focus:border-red-500! border-2'
                        : 'border-2 border-gray-300! focus:border-blue-400!'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                placeholder=" "
                required={required}
                disabled={disabled}
            />
            <label className={`absolute text-sm duration-300 transform -translate-y-3 scale-75 top-2 z-10 origin-left bg-white rounded-md px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto left-4 pointer-events-none
                ${error ? 'text-red-500! peer-focus:text-red-500!' : 'text-gray-500 peer-focus:text-blue-600'}
            `}>
                {label}
            </label>
            {isPassword ? (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none z-20 
                        ${error ? 'text-red-500!' : 'text-gray-500 hover:text-gray-700'}
                    `}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            ) : rightElement && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20">
                    {rightElement}
                </div>
            )}
        </div>
    );
};

export default FloatingLabelInput;
