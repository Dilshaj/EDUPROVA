"use client"
import React from 'react'
import Navbar from '../LandingPage/Navbar'
import { usePathname } from 'next/navigation'

const ShowNavbar = () => {
    const pathname = usePathname()
    return (
        <>
            {pathname === "/" && <Navbar />}
        </>
    )
}

export default ShowNavbar