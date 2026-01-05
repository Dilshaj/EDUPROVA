import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, PerspectiveCamera, Ring, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

interface GalacticOrbitProps {
    variant?: 'BLUE' | 'ORANGE';
}

const AsteroidBelt = ({ count = 60, radius = 5, color = "#ffffff" }) => {
    const asteroids = useMemo(() => {
        return new Array(count).fill(0).map(() => {
            const angle = Math.random() * Math.PI * 2;
            const r = radius + (Math.random() - 0.5) * 2;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const y = (Math.random() - 0.5) * 1.5;
            const scale = 0.05 + Math.random() * 0.15;
            return { pos: [x, y, z] as [number, number, number], scale };
        });
    }, [count, radius]);

    return (
        <group rotation={[0.2, 0, 0]}>
            {asteroids.map((data, i) => (
                <Float key={i} speed={1} rotationIntensity={2} floatIntensity={1}>
                    <mesh position={data.pos} scale={data.scale}>
                        <dodecahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial color={color} roughness={0.8} />
                    </mesh>
                </Float>
            ))}
        </group>
    )
}

const EnergyRings = ({ color }: { color: string }) => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z += 0.002;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    })

    return (
        <group ref={ref}>
            <Ring args={[3.5, 3.55, 64]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[3.8, 3.82, 64]} rotation={[Math.PI / 1.8, 0, 0]}>
                <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
            </Ring>
        </group>
    )
}

const Planet = ({ color, type }: { color: string, type: 'BLUE' | 'ORANGE' }) => {
    return (
        <group>
            {/* Core Planet */}
            <Sphere args={[2, 64, 64]}>
                <meshStandardMaterial
                    color={type === 'BLUE' ? "#1a2b4b" : "#4b1a1a"}
                    roughness={0.7}
                    metalness={0.2}
                />
            </Sphere>
            {/* Atmosphere Glow */}
            <Sphere args={[2.1, 64, 64]}>
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>
        </group>
    )
}

const GalacticOrbitScene: React.FC<GalacticOrbitProps> = ({ variant = 'BLUE' }) => {
    const mainColor = variant === 'BLUE' ? '#00ffff' : '#ffaa00';
    const ambientColor = variant === 'BLUE' ? '#001133' : '#331100';

    return (
        <>
            <color attach="background" args={['#000000']} />

            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={55} />

            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 5, 5]} intensity={1.5} color={mainColor} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />

            <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={0.5} />

            {/* Background Nebula Cloud (simulated with points) */}
            <Sparkles
                count={500}
                scale={15}
                size={10}
                speed={0.2}
                opacity={0.2}
                color={variant === 'BLUE' ? "#0044aa" : "#aa2200"}
            />

            <group position={[0, 0, 0]}>
                <Planet color={mainColor} type={variant} />
                <EnergyRings color={mainColor} />
                <AsteroidBelt color="#888888" />
            </group>

            <EffectComposer>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} radius={0.6} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    );
};

export default GalacticOrbitScene;
