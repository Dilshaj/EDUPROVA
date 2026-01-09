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
            className="absolute z-100 w-[380px] bg-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 animate-in fade-in zoom-in-95 duration-200 -translate-y-1/2"
            style={{
                top: position.top,
                left: position.left,
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <h3 className="font-bold text-[19px] text-gray-900 leading-tight mb-3">
                {title}
            </h3>

            <div className="flex items-center gap-2 mb-4">
                {premium ? (
                    <span className="bg-linear-to-r from-[#1E62FF] to-[#D659FF] text-white font-bold text-[10px] px-2.5 py-1 flex items-center gap-1.5 rounded-md uppercase tracking-wide">
                        <Crown size={12} className="fill-white" />
                        Premium
                    </span>
                ) : (
                    <span className="bg-[#e3f2fd] text-[#1e88e5] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                        Bestseller
                    </span>
                )}
                <span className="text-[11px] text-[#2e7d32] font-bold">
                    Updated <span className="text-[#2e7d32]">{updatedDate}</span>
                </span>
            </div>

            <div className="text-[11px] text-gray-500 mb-4 flex items-center gap-2 font-semibold">
                <span>{duration}</span>
                <span className="text-gray-300">•</span>
                <span>{level}</span>
                <span className="text-gray-300">•</span>
                <span>{subtitles}</span>
            </div>

            <p className="text-[13px] text-gray-600 mb-5 leading-relaxed font-medium">
                {description}
            </p>

            <div className="mb-5">
                <div className="space-y-3">
                    {learningOutcomes.slice(0, 3).map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Check size={16} className="text-gray-900 mt-0.5 shrink-0" />
                            <span className="text-[13px] text-gray-600 leading-tight font-medium">{outcome}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <div className="grid grid-cols-2 gap-y-3 text-[11px] text-gray-500 font-bold">
                    <div className="flex items-center gap-2.5">
                        <PlayCircle size={16} className="text-gray-400" />
                        <span>650 lectures</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <FileText size={16} className="text-gray-400" />
                        <span>45 articles</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Code size={16} className="text-gray-400" />
                        <span>120 coding exercises</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Smartphone size={16} className="text-gray-400" />
                        <span>Mobile and TV access</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="flex-1 bg-linear-to-r from-[#1E62FF] to-[#D659FF] hover:opacity-90 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-[0_10px_20px_-5px_rgba(30,98,255,0.3)] active:scale-95 cursor-pointer">
                    Add to cart
                </button>
                <button
                    onClick={toggleWishlist}
                    className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 transition-all cursor-pointer ${isWishlisted
                        ? "bg-blue-50 border-[#1E62FF]"
                        : "border-gray-100 hover:bg-gray-50 hover:border-gray-200"
                        }`}
                >
                    <Heart
                        size={24}
                        className={`transition-colors ${isWishlisted
                            ? "fill-[#1E62FF] text-[#1E62FF]"
                            : "text-gray-400"
                            }`}
                    />
                </button>
            </div>
        </div>
    );
};

export default CourseHoverCard;
