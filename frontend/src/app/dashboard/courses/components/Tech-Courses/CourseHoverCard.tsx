import React, { useState } from "react";
import { Crown, Check, Heart, PlayCircle, FileText, Code, Smartphone } from "lucide-react";

export interface CourseHoverCardProps {
    title: string;
    updatedDate?: string;
    duration?: string;
    level?: string;
    subtitles?: string;
    description?: string;
    learningOutcomes?: string[];
    premium?: boolean;
    position: { top: number; left: number };
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const CourseHoverCard: React.FC<CourseHoverCardProps> = ({
    title,
    updatedDate = "September 2025",
    duration = "97 total hours",
    level = "All Levels",
    subtitles = "Subtitles",
    description = "Only web development course that you will need. Covers HTML, CSS, Tailwind, Node, React, MongoDB, Prisma, Deployment etc",
    learningOutcomes = [
        "Become a full stack developer",
        "Master of Javascript ecosystem",
        "Build any project for your company or for freelance projects",
        "Master backend development with Node",
        "Learn modern React with Hooks"
    ],
    premium,
    position,
    onMouseEnter,
    onMouseLeave
}) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    return (
        <div
            className="absolute z-50 w-[380px] bg-white p-5 rounded-xl shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 ring-1 ring-gray-900/5"
            style={{
                top: position.top,
                left: position.left,
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <h3 className="font-bold text-xl text-gray-900 leading-snug mb-3">
                {title}
            </h3>

            <div className="flex items-center gap-2 mb-3">
                {premium ? (
                    <span className="bg-gradient-to-r from-pink-600 to-blue-600 text-white font-semibold text-[11px] px-1.5 py-[3px] flex items-center gap-1 rounded">
                        <Crown size={10} className="fill-white" />
                        Premium
                    </span>
                ) : (
                    <span className="bg-green-200 text-black text-xs font-bold px-2 py-1 rounded-sm">
                        Bestseller
                    </span>
                )}
                <span className="text-xs text-green-700 font-semibold">
                    Updated <span className="font-bold">{updatedDate}</span>
                </span>
            </div>

            <div className="text-xs text-gray-500 mb-4 flex items-center gap-1 font-medium">
                <span>{duration}</span>
                <span>•</span>
                <span>{level}</span>
                <span>•</span>
                <span>{subtitles}</span>
            </div>

            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {description}
            </p>

            <div className="mb-4">
                <div className="space-y-2">
                    {learningOutcomes.slice(0, 3).map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Check size={16} className="text-gray-900 mt-0.5 shrink-0" />
                            <span className="text-sm text-gray-600 leading-tight">{outcome}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                        <PlayCircle size={14} className="text-gray-400" />
                        <span>650 lectures</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FileText size={14} className="text-gray-400" />
                        <span>45 articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Code size={14} className="text-gray-400" />
                        <span>120 coding exercises</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Smartphone size={14} className="text-gray-400" />
                        <span>Access on mobile and TV</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-sm transition-colors shadow-md">
                    Add to cart
                </button>
                <button
                    onClick={toggleWishlist}
                    className={`w-12 h-12 flex items-center justify-center rounded-sm border transition-colors ${isWishlisted
                        ? "bg-blue-50 border-blue-500"
                        : "border-gray-300 hover:bg-gray-50"
                        }`}
                >
                    <Heart
                        size={20}
                        className={`transition-colors ${isWishlisted
                            ? "fill-blue-500 text-blue-500"
                            : "text-gray-400"
                            }`}
                    />
                </button>
            </div>
        </div>
    );
};

export default CourseHoverCard;
