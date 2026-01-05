"use client";

const StudentBackgroundPattern = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.15] text-slate-900 dark:text-slate-200">
            <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                className="block"
            >
                <defs>
                    <pattern
                        id="study-pattern"
                        x="0"
                        y="0"
                        width="800"
                        height="800"
                        patternUnits="userSpaceOnUse"
                    >
                        {/* DR Logo - Doodle Style (Scattered) */}
                        <g transform="translate(100, 100) rotate(-15) scale(1.5)">
                            {/* D */}
                            <path d="M10 10 L10 50 M10 10 Q 40 10, 40 30 Q 40 50, 10 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            {/* R */}
                            <path d="M50 10 L50 50 M50 10 Q 80 10, 80 30 Q 80 40, 50 40 M65 40 L 80 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <g transform="translate(500, 600) rotate(10) scale(1.5)">
                            {/* D */}
                            <path d="M10 10 L10 50 M10 10 Q 40 10, 40 30 Q 40 50, 10 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            {/* R */}
                            <path d="M50 10 L50 50 M50 10 Q 80 10, 80 30 Q 80 40, 50 40 M65 40 L 80 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>

                        {/* Laptop */}
                        <g transform="translate(600, 150) scale(1.8) rotate(15)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="5" y="5" width="30" height="20" rx="2" />
                            <path d="M2 25 H38 L35 30 H5 L2 25 Z" />
                        </g>

                        {/* Clock */}
                        <g transform="translate(150, 400) scale(2.2) rotate(-10)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="20" cy="20" r="15" />
                            <path d="M20 5 V10 M20 35 V30 M5 20 H10 M35 20 H30" />
                            <path d="M20 20 L28 20" />
                            <path d="M20 20 L20 12" />
                            <path d="M10 5 L5 2" />
                            <path d="M30 5 L35 2" />
                            <path d="M8 32 L5 38" />
                            <path d="M32 32 L35 38" />
                        </g>

                        {/* Bulb Doodle */}
                        <g transform="translate(400, 300) scale(2.0) rotate(5)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 5 Q25 5 25 15 Q25 20 20 25 H10 Q5 20 5 15 Q5 5 15 5" />
                            <path d="M12 25 V28 H18 V25" />
                            <path d="M15 28 V30" />
                            <path d="M10 10 L12 15 M15 8 L15 15 M20 10 L18 15" strokeWidth="1" opacity="0.6" /> {/* Filament details */}
                        </g>

                        {/* Pen (Specific Image Match) */}
                        <g transform="translate(300, 600) scale(2.0) rotate(-45)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            {/* Tip */}
                            <path d="M5 15 L15 10 L15 20 Z" />
                            {/* Cap Section */}
                            <path d="M15 8 H40 V22 H15 Z" />
                            {/* Clip */}
                            <path d="M18 12 H35" strokeWidth="1" />
                            {/* Body */}
                            <path d="M40 10 H85 A5 5 0 0 1 85 20 H40 Z" />
                            {/* Cap/Body Separator */}
                            <path d="M40 8 V22" />
                        </g>
                        {/* Another Book (Open) */}
                        <g transform="translate(600, 450) scale(1.9) rotate(20)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 20 Q15 25 25 20 Q35 25 45 20" />
                            <path d="M5 20 V35 Q15 40 25 35 V20" />
                            <path d="M45 20 V35 Q35 40 25 35" />
                            <path d="M25 20 V35" />
                        </g>

                        {/* Calculator Doodle (Specific Image Match) */}
                        <g transform="translate(350, 50) scale(1.8) rotate(-5)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            {/* Outer Body */}
                            <rect x="5" y="2" width="40" height="60" rx="5" />
                            {/* Top Line */}
                            <path d="M10 6 H40" />
                            {/* Screen */}
                            <rect x="10" y="10" width="30" height="15" rx="2" />
                            {/* Buttons Grid */}
                            {/* Row 1 */}
                            <rect x="10" y="30" width="6" height="6" rx="1" />
                            <rect x="18" y="30" width="6" height="6" rx="1" />
                            <rect x="26" y="30" width="6" height="6" rx="1" />
                            <rect x="34" y="30" width="6" height="6" rx="1" />
                            {/* Row 2 */}
                            <rect x="10" y="38" width="6" height="6" rx="1" />
                            <rect x="18" y="38" width="6" height="6" rx="1" />
                            <rect x="26" y="38" width="6" height="6" rx="1" />
                            <rect x="34" y="38" width="6" height="6" rx="1" />
                            {/* Row 3 */}
                            <rect x="10" y="46" width="6" height="6" rx="1" />
                            <rect x="18" y="46" width="6" height="6" rx="1" />
                            <rect x="26" y="46" width="6" height="6" rx="1" />
                            {/* Vertical Button (Enter/Plus) */}
                            <rect x="34" y="46" width="6" height="14" rx="1" />
                            {/* Row 4 */}
                            <rect x="10" y="54" width="6" height="6" rx="1" />
                            <rect x="18" y="54" width="6" height="6" rx="1" />
                            <rect x="26" y="54" width="6" height="6" rx="1" />
                        </g>

                        {/* Clock Doodle (Wall/Stopwatch Style) */}
                        <g transform="translate(100, 650) scale(1.8) rotate(10)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="20" cy="20" r="15" />
                            <path d="M20 20 L 25 15" />
                            <path d="M20 20 L 20 30" />
                            <path d="M20 5 M 35 20 M 20 35 M 5 20" strokeWidth="2" strokeLinecap="round" /> {/* Ticks */}
                        </g>

                    </pattern>
                </defs>

                <rect width="100%" height="100%" fill="url(#study-pattern)" />
            </svg>
        </div>
    );
};

export default StudentBackgroundPattern;
