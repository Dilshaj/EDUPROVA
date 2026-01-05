import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';

const SoftNebula = () => {
    return (
        <group>
            {/* Soft Gradient Blob 1 - Purple/Blue */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh position={[-2, 0, -5]}>
                    <sphereGeometry args={[4, 32, 32]} />
                    <meshBasicMaterial color="#6a4c93" transparent opacity={0.3} toneMapped={false} />
                </mesh>
            </Float>

            {/* Soft Gradient Blob 2 - Teal/Cyan */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
                <mesh position={[3, 1, -6]}>
                    <sphereGeometry args={[5, 32, 32]} />
                    <meshBasicMaterial color="#1982c4" transparent opacity={0.2} toneMapped={false} />
                </mesh>
            </Float>

            {/* Soft Gradient Blob 3 - Pink/Magenta Accent */}
            <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
                <mesh position={[0, -2, -4]}>
                    <sphereGeometry args={[3, 32, 32]} />
                    <meshBasicMaterial color="#ff595e" transparent opacity={0.15} toneMapped={false} />
                </mesh>
            </Float>
        </group>
    )
}

const LightTrails = () => {
    // Simulated sleek light lines
    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            <mesh position={[0, 0, -2]}>
                <torusGeometry args={[6, 0.02, 16, 100]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, 0, -2]} rotation={[0.2, 0, 0]}>
                <torusGeometry args={[8, 0.01, 16, 100]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
        </group>
    )
}

const GalaxyScene = () => {
    return (
        <>
            <color attach="background" args={['#0f172a']} /> {/* Slate-900 like deep background */}

            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

            {/* Subtle Stars - minimal count, slow fade */}
            <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />

            {/* Floating Particles - clean and white */}
            <Sparkles count={150} scale={8} size={2} speed={0.3} opacity={0.8} color="#ffffff" />

            <SoftNebula />
            <LightTrails />

            <EffectComposer>
                {/* Soft dreamy bloom */}
                <Bloom luminanceThreshold={0} mipmapBlur intensity={0.5} radius={0.8} />
                {/* Very subtle noise for texture */}
                <Noise opacity={0.05} />
            </EffectComposer>
        </>
    );
};

export default GalaxyScene;
