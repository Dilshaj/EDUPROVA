import Image from 'next/image'
import React from 'react'

import StudentBackgroundPattern from '@/components/ui/StudentBackgroundPattern';
import LoginDesign from '@/components/ui/LoginDesign';

const Authlayout: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-screen overflow-hidden flex-col flex md:flex-row items-center justify-start gap-3 p-3 md:py-0 relative'>
            {/* <StudentBackgroundPattern /> */}
            <div className='relative w-full md:w-1/3 h-[25vh] md:h-[97vh] rounded-2xl overflow-hidden bg-[#e5f0ff]/50 flex items-start justify-start shrink-0'>
                <div className='relative h-10 w-full flex items-start justify-start p-4'>
                    <Image
                        src="/eduprova.png"
                        loading="eager"
                        alt="student-auth"
                        width={120}
                        height={120}
                        className='object-contain z-1000 bg-[#f7f7f72d] backdrop-blur-md rounded-lg '
                    />
                </div>
                <LoginDesign />
            </div>

            <div
                className="relative w-full md:h-[97vh] flex-1 overflow-y-auto no-scrollbar rounded-2xl bg-linear-to-t md:bg-linear-to-r from-[#e5f0ff]/50 to-[#e5f0ff]/40"
                data-lenis-prevent
                style={{ overscrollBehavior: 'contain' }}
            >
                <div className="w-full min-h-full flex flex-col items-center justify-center px-4 md:px-14 lg:px-20 py-12 md:py-20">
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col items-start justify-start gap-6">
                        {/* <div className="w-full flex flex-col md:gap-3">
                            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight'>Turn your aspirations</h1>
                            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight'>into achievements</h1>
                            <p className='text-sm md:text-md opacity-80 text-[#383838] py-1'>Access over <span className='text-[#08b808]'>1000+ courses</span> and unlock your potential.</p>
                        </div> */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authlayout
