"use client";
import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaReact, FaPython, FaJava, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaDocker, FaAws } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiNextdotjs, SiTailwindcss, SiFlutter, SiKotlin, SiOpenai } from "react-icons/si";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const ReadyToStart = () => {
    const arc1Ref = useRef<HTMLDivElement>(null);
    const arc2Ref = useRef<HTMLDivElement>(null);
    const arc3Ref = useRef<HTMLDivElement>(null);
    const arc4Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        // Arc 1: Rotate Counter-Clockwise
        gsap.to(arc1Ref.current, {
            rotation: -360,
            duration: 80,
            repeat: -1,
            ease: "linear",
        });

        // Arc 2: Rotate Clockwise
        gsap.to(arc2Ref.current, {
            rotation: 360,
            duration: 60,
            repeat: -1,
            ease: "linear",
        });

        // Arc 3: Rotate Counter-Clockwise
        gsap.to(arc3Ref.current, {
            rotation: -360,
            duration: 80,
            repeat: -1,
            ease: "linear",
        });

        // Arc 4 (Largest): Rotate Clockwise
        gsap.to(arc4Ref.current, {
            rotation: 360,
            duration: 60,
            repeat: -1,
            ease: "linear",
        });
    }, []);

    return (
        <section className="relative pt-24 pb-0 bg-transparent overflow-hidden flex flex-col items-center justify-end min-h-[850px]">

            {/* Content Header */}
            <div className="absolute  top-20 left-0 w-full z-30 text-center px-4">
                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                    Ready to Start Learning?
                </h2>
                <p className="text-black font-medium text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Join thousands of learners gaining real skills and accelerating their careers — one lesson at a time
                </p>
            </div>

            <button
                className="relative group mx-auto inline-flex items-center bg-[#056AFF] text-white rounded-full font-bold md:mt-50  md:text-lg text-sm px-10 py-3"
                aria-label="Get Premium Courses"
            >
                <span className="pr-6">Get Premium Courses</span>

                <span className="absolute right-2 top-1/2 group-hover:rotate-45 -translate-y-1/2 p-2 md:p-3 bg-white text-[#056AFF] rounded-full flex items-center justify-center shadow transition-transform group-hover:translate-x-1">
                    <ArrowUpRight size={18} />
                </span>
            </button>

            {/* Main Visual Container */}
            <div className="relative w-full max-w-[800px] h-[400px] sm:h-[600px] md:h-[800px] flex items-end justify-center mt-22 md:mt-0">

                {/* Concentric Arcs Background */}
                <div className="absolute md:bottom-[-35%] -bottom-50 left-1/2 -translate-x-1/2 w-[800px] h-[800px] flex items-center justify-center z-0 pointer-events-none scale-[0.4] sm:scale-75 md:scale-100 origin-center">

                    {/* Arc 4 (Largest) */}
                    <div ref={arc4Ref} className="absolute w-[1200px] h-[1200px] rounded-full bg-[#edf4ff] flex items-center justify-center">
                        {/* Center Icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                            <SiFlutter size={35} className="text-purple-600" />
                        </div>
                        {/* Distributed Icons */}
                        <IconWrapper icon={<SiFlutter size={28} className="text-purple-600 opacity-40" />} angle={0} radius={600} />
                        <IconWrapper icon={<SiKotlin size={28} className="text-purple-700 opacity-40" />} angle={60} radius={600} />
                        <IconWrapper icon={<FaJava size={28} className="text-red-600 opacity-40" />} angle={120} radius={600} />
                        <IconWrapper icon={<SiOpenai size={28} className="text-black opacity-40" />} angle={180} radius={600} />
                        <IconWrapper icon={<FaPython size={28} className="text-yellow-600 opacity-40" />} angle={240} radius={600} />
                        <IconWrapper icon={<FaReact size={28} className="text-blue-500 opacity-40" />} angle={300} radius={600} />
                    </div>

                    {/* Arc 3 */}
                    <div ref={arc3Ref} className="absolute w-[1000px] h-[1000px] rounded-full bg-[#cfe4ff] flex items-center justify-center ">
                        {/* Center Icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                            <FaAws size={35} className="text-orange-500" />
                        </div>
                        {/* Distributed Icons */}
                        <IconWrapper icon={<FaAws size={28} className="text-orange-500 opacity-50" />} angle={0} radius={500} />
                        <IconWrapper icon={<FaDocker size={28} className="text-blue-600 opacity-50" />} angle={60} radius={500} />
                        <IconWrapper icon={<SiTypescript size={28} className="text-blue-700 opacity-50" />} angle={120} radius={500} />
                        <IconWrapper icon={<FaJs size={28} className="text-yellow-500 opacity-50" />} angle={180} radius={500} />
                        <IconWrapper icon={<SiMongodb size={28} className="text-green-600 opacity-50" />} angle={240} radius={500} />
                        <IconWrapper icon={<FaNodeJs size={28} className="text-green-700 opacity-50" />} angle={300} radius={500} />
                    </div>

                    {/* Arc 2 */}
                    <div ref={arc2Ref} className="absolute w-[800px] h-[800px] rounded-full  flex items-center justify-center bg-[#a9cdfc]">

                        {/* Distributed Icons */}
                        <IconWrapper icon={<SiMongodb size={30} className="text-green-600 opacity-70" />} angle={0} radius={400} />
                        <IconWrapper icon={<FaNodeJs size={30} className="text-green-700 opacity-70" />} angle={45} radius={400} />
                        <IconWrapper icon={<SiNextdotjs size={30} className="text-black opacity-70" />} angle={90} radius={400} />
                        <IconWrapper icon={<FaReact size={30} className="text-blue-500 opacity-70" />} angle={135} radius={400} />
                        <IconWrapper icon={<SiTypescript size={30} className="text-blue-700 opacity-70" />} angle={180} radius={400} />
                        <IconWrapper icon={<FaJs size={30} className="text-yellow-500 opacity-70" />} angle={225} radius={400} />
                        <IconWrapper icon={<FaPython size={30} className="text-yellow-600 opacity-70" />} angle={270} radius={400} />
                        <IconWrapper icon={<FaJava size={30} className="text-red-600 opacity-70" />} angle={315} radius={400} />
                    </div>

                    {/* Arc 1 (Innermost) */}
                    <div ref={arc1Ref} className="absolute w-[600px] h-[600px] rounded-full bg-[#86B8FC] flex items-center justify-center opacity-100">

                        {/* Distributed Icons */}
                        <IconWrapper icon={<SiNextdotjs size={35} className="text-black" />} angle={0} radius={300} />
                        <IconWrapper icon={<SiTailwindcss size={35} className="text-cyan-500" />} angle={45} radius={300} />
                        <IconWrapper icon={<FaCss3Alt size={35} className="text-blue-600" />} angle={90} radius={300} />
                        <IconWrapper icon={<FaHtml5 size={35} className="text-orange-500" />} angle={135} radius={300} />
                        <IconWrapper icon={<FaReact size={35} className="text-blue-500" />} angle={180} radius={300} />
                        <IconWrapper icon={<SiTypescript size={35} className="text-blue-700" />} angle={225} radius={300} />
                        <IconWrapper icon={<FaJs size={35} className="text-yellow-500" />} angle={270} radius={300} />
                        <IconWrapper icon={<FaPython size={35} className="text-yellow-600" />} angle={315} radius={300} />
                    </div>
                </div>

                {/* Student Image */}
                <div className="relative z-10 w-[300px] md:w-[400px] h-[300px] md:h-[500px]">
                    <Image
                        src="/landingPage/student.png"
                        alt="Student with books"
                        fill
                        className="object-cover object-top drop-shadow-2xl"
                        style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
                    />
                </div>
            </div >
        </section >
    );
};

// Helper to position icons on the circle
const IconWrapper = ({ icon, angle, radius }: { icon: React.ReactNode; angle: number; radius: number }) => {
    return (
        <div
            className="absolute top-1/2 left-1/2 w-14 h-14 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
            style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
            }}
        >
            {icon}
        </div>
    );
};

export default ReadyToStart;