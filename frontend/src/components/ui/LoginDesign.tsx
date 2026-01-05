'use client'
import React, { useEffect } from 'react'
import gsap from 'gsap';

// --- Icon Imports ---
import {
    FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaJsSquare, FaJava,
} from 'react-icons/fa';
import {
    SiTailwindcss, SiMongodb, SiPostgresql, SiKubernetes, SiRedux, SiTerraform,
    SiAwsamplify, SiNextdotjs, SiOpenai, SiScikitlearn, SiKeras, SiOpencv, SiTensorflow,
} from 'react-icons/si';
import { BsRobot } from 'react-icons/bs';
import { MdPsychology } from 'react-icons/md';

// Helper function to calculate style for positioning an icon on the border
const getIconStyle = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    // Round to 6 decimal places to ensure consistent values between server and client
    const cosValue = Math.round(Math.cos(radians) * 1000000) / 1000000;
    const sinValue = Math.round(Math.sin(radians) * 1000000) / 1000000;
    return {
        left: `calc(50% + ${cosValue * 50}%)`,
        top: `calc(50% - ${sinValue * 50}%)`, // Note: CSS Y-axis is inverted
    };
};

// --- Icon Data Grouped by Circle ---
const iconData = [
    // Circle 1: Innermost (3 icons)
    [
        { Icon: FaReact, color: 'text-cyan-500', angle: 270, border: '[#0066ffe7]' }, // Top
        { Icon: FaJsSquare, color: 'text-blue-600', angle: 30, border: '[#0066ffe7]', classes: 'rounded-full' }, // Bottom-Right - FIX APPLIED
        { Icon: SiTailwindcss, color: 'text-cyan-500', angle: 150, border: '[#0066ffe7]' }, // Bottom-Left
    ],
    // Circle 2 (5 icons)
    [
        { Icon: FaPython, color: 'text-yellow-500', angle: 0, border: '[#0066ff98]' }, // Right
        { Icon: BsRobot, color: 'text-blue-600', angle: 72, border: '[#0066ff98]', classes: 'rounded-full' }, // Bottom-Right - FIX APPLIED
        { Icon: FaJava, color: 'text-yellow-500', angle: 144, border: '[#0066ff98]' }, // Bottom-Left
        { Icon: FaDocker, color: 'text-green-600', angle: 216, border: '[#0066ff98]' }, // Top-Left
        { Icon: SiPostgresql, color: 'text-blue-400', angle: 288, border: '[#0066ff98]' }, // Top-Right
    ],
    // Circle 3 (5 icons)
    [
        { Icon: FaAws, color: 'text-blue-900', angle: 45, border: '[#0066ff6b]' }, // Bottom-Right
        { Icon: SiMongodb, color: 'text-green-500', angle: 135, border: '[#0066ff6b]' }, // Bottom-Left
        { Icon: SiKubernetes, color: 'text-blue-600', angle: 225, border: '[#0066ff6b]' }, // Top-Left
        { Icon: SiRedux, color: 'text-purple-700', angle: 315, border: '[#0066ff6b]' }, // Top-Right
        { Icon: SiNextdotjs, color: 'text-black', angle: 0, border: '[#0066ff6b]' }, // Right
    ],
    // Circle 4 (4 icons)
    [
        { Icon: SiOpenai, color: 'text-blue-700', angle: 90, border: '[#0066ff3d]' }, // Bottom
        { Icon: SiTerraform, color: 'text-blue-400', angle: 180, border: '[#0066ff3d]' }, // Left
        { Icon: SiAwsamplify, color: 'text-orange-600', angle: 270, border: '[#0066ff3d]' }, // Top
        { Icon: BsRobot, color: 'text-green-700', angle: 0, border: '[#0066ff3d]' }, // Right
    ],
    // Circle 5: Outermost (4 icons) - Angles are already well distributed.
    [
        { Icon: SiTensorflow, color: 'text-pink-600', angle: 45, border: '[#0066ff21]' }, // Top-Right quadrant
        { Icon: SiScikitlearn, color: 'text-orange-700', angle: 135, border: '[#0066ff21]' }, // Top-Left quadrant
        { Icon: SiOpencv, color: 'text-indigo-700', angle: 225, border: '[#0066ff21]' }, // Bottom-Left quadrant
        { Icon: MdPsychology, color: 'text-purple-700', angle: 315, border: '[#0066ff21]' }, // Bottom-Right quadrant
    ],
    [

    ],
];

const circleSizes = [
    { base: 'w-20 h-20', md: 'md:w-48 md:h-48', borderColor: '[#0066ffe7]' }, // C1: Innermost
    { base: 'w-40 h-40', md: 'md:w-80 md:h-80', borderColor: '[#0066ff98]' }, // C2
    { base: 'w-60 h-60', md: 'md:w-112 md:h-112', borderColor: '[#0066ff6b]' }, // C3
    { base: 'w-80 h-80', md: 'md:w-144 md:h-144', borderColor: '[#0066ff3d]' }, // C4
    // REVERTED SIZE (176) AND WILL USE A WRAPPER MAX-WIDTH FIX
    { base: 'w-100 h-100', md: 'md:w-176 md:h-176', borderColor: '[#0066ff21]' }, // C5: Outermost
    { base: 'w-100 h-100', md: 'md:w-176 md:h-176', borderColor: '[#0066ff21]' }, // C5: Outermost (Redundant entry, but kept as per user request)
];

const LoginDesign: React.FC = () => {
    useEffect(() => {
        const circles = gsap.utils.toArray<HTMLElement>(".animate");
        const maxDuration = 40; // slowest
        // Note: minDuration should be less than maxDuration for effect to work as intended (min=20 was used before)
        const minDuration = 100; // This value is higher than maxDuration (40), meaning outer circles will spin faster.
        const length = circles.length;

        circles.forEach((el, index) => {
            const duration = maxDuration - ((maxDuration - minDuration) / (length - 1)) * index;

            gsap.to(el, {
                rotate: -360,
                repeat: -1,
                ease: "none",
                duration,
                transformOrigin: "50% 50%",
            });
        });
    }, []);

    const renderCircles = (index: number): React.ReactElement => {
        if (index >= circleSizes.length || index >= iconData.length) {
            return <></>;
        }

        const { base, md } = circleSizes[index];
        const icons = iconData[index];

        return (
            <div
                className={`animate circle relative ${base} ${md} rounded-full border-2 border-[#0066ff21] flex items-center justify-center bg-transparent shrink-0`}
            >
                {icons.map((item, iconIndex) => {
                    const Style = getIconStyle(item.angle);
                    const Icon = item.Icon;
                    const extraClasses = item.classes || '';

                    return (
                        <div
                            key={iconIndex}
                            style={Style}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${item.color} bg-[#F7F7F7] border-${item.border} border-2 rounded-3xl ${extraClasses} text-lg lg:text-2xl p-1`}
                        >
                            <Icon />
                        </div>
                    );
                })}

                {renderCircles(index + 1)}
            </div>
        );
    };

    return (
        <div className='absolute top-[135%] left-1/2 md:top-1/2 md:left-full transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit flex items-center justify-center pointer-events-none'>
            {renderCircles(0)}
        </div>
    );
}

export default LoginDesign;