"use client"

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageWithBlurProps extends Omit<ImageProps, 'onLoad'> {
    src: string
    alt: string
    className?: string
}

export function ImageWithBlur({ src, alt, className = '', ...props }: ImageWithBlurProps) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <Image
            src={src}
            alt={alt}
            className={`transition-all duration-500 ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'
                } ${className}`}
            onLoad={() => setIsLoading(false)}
            {...props}
        />
    )
}
