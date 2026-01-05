import React, { useEffect, useRef } from 'react';

type FluidType = 'ARCHITECT' | 'GUARDIAN' | 'CREATOR' | 'NEURO' | 'CORE';

interface FluidBannerProps {
    type: FluidType;
}

const FluidBanner: React.FC<FluidBannerProps> = ({ type }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0, active: false });

    // Configuration based on type
    const getConfig = (t: FluidType) => {
        switch (t) {
            case 'ARCHITECT': // Matrix Green, vertical flow
                return {
                    colorBase: 'hsla(120, 100%, 25%, ',
                    colorVar: 40, // Hue variance
                    speed: 1.5,
                    curve: 20, // Straight lines
                    alpha: 0.1,
                    density: 1500
                };
            case 'GUARDIAN': // Electric Blue, shielding flow
                return {
                    colorBase: 'hsla(210, 100%, 50%, ',
                    colorVar: 30,
                    speed: 1,
                    curve: 400, // Swirly
                    alpha: 0.05,
                    density: 2000
                };
            case 'CREATOR': // Magenta/Gold, turbulent
                return {
                    colorBase: 'hsla(320, 80%, 60%, ',
                    colorVar: 60,
                    speed: 2,
                    curve: 800, // Very swirly
                    alpha: 0.08,
                    density: 1800
                };
            case 'NEURO': // White/Silver, synapse flow
                return {
                    colorBase: 'hsla(220, 20%, 90%, ',
                    colorVar: 0,
                    speed: 0.8,
                    curve: 100, // Gentle
                    alpha: 0.06,
                    density: 1200
                };
            case 'CORE': // Molten Orange, intense
                return {
                    colorBase: 'hsla(20, 100%, 50%, ',
                    colorVar: 30,
                    speed: 2.5,
                    curve: 50, // Fast streams
                    alpha: 0.15,
                    density: 1600
                };
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];
        let time = 0;
        const config = getConfig(type);

        // Simple Simplex Noise (Inline for performance/no-deps)
        // A fast pseudo-random noise generator
        const noise = (x: number, y: number, z: number) => {
            const p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
            const X = Math.floor(x) & 255;
            const Y = Math.floor(y) & 255;
            const Z = Math.floor(z) & 255;
            // Simplified result for flow direction
            return (p[X] ^ p[Y] ^ p[Z]) / 255.0;
        };

        const resize = () => {
            if (!container) return;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                active: true
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < config.density; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: 0,
                    vy: 0,
                    age: Math.random() * 100,
                    life: Math.random() * 100 + 50,
                    hueOffset: Math.random() * config.colorVar
                });
            }
        };

        const draw = () => {
            // Fade out effect for trails
            ctx.fillStyle = 'rgba(5, 5, 20, 0.2)'; // Dark deep background with trail persistence
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.005;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Get Noise Value
                // We map noise to an angle (0 to 2PI)
                const noiseVal = noise(p.x / config.curve, p.y / config.curve, time);
                const angle = noiseVal * Math.PI * 4;

                // Base velocity
                p.vx += Math.cos(angle) * 0.1;
                p.vy += Math.sin(angle) * 0.1;

                // Mouse Interaction (Vortex/Push)
                if (mouseRef.current.active) {
                    const dx = p.x - mouseRef.current.x;
                    const dy = p.y - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const force = (150 - dist) / 150;
                        p.vx += (dx / dist) * force * 2; // Repel
                        p.vy += (dy / dist) * force * 2;
                    }
                }

                // Apply Speed Limit & Friction
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > config.speed) {
                    p.vx = (p.vx / speed) * config.speed;
                    p.vy = (p.vy / speed) * config.speed;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Wrap around screen
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw Particle
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3); // Draw tail
                ctx.strokeStyle = `${config.colorBase}${config.alpha})`;
                // Add hue variation logic if needed, simplified for speed
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [type]);

    return (
        <div ref={containerRef} className="w-full h-full bg-[#050514] relative overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full" />

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        </div>
    );
};

export default FluidBanner;
