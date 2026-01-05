import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, Cloud, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

const RotatingNebula = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Using simple meshes with soft textures or cloud abstraction if cloud is heavy. 
                 Using Sparkles for performance instead of Volumetric Clouds for now unless requested. */}
            <Sparkles count={200} scale={12} size={6} speed={0.4} opacity={0.5} color="#4f90ff" />
            <Sparkles count={200} scale={10} size={10} speed={0.3} opacity={0.3} color="#a020f0" />
        </group>
    )
}

const CosmicScene = () => {
    return (
        <>
            <color attach="background" args={['#000000']} />

            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <RotatingNebula />
            </Float>

            {/* Center piece - Abstract Black Hole / Void */}
            <mesh position={[0, 0, -2]}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshBasicMaterial color="black" />
            </mesh>

            {/* Accretion Disk */}
            <mesh rotation={[Math.PI / 2.5, 0, 0]} position={[0, 0, -2]}>
                <torusGeometry args={[3, 0.1, 16, 100]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[Math.PI / 2.5, 0, 0]} position={[0, 0, -2]}>
                <torusGeometry args={[3.2, 0.05, 16, 100]} />
                <meshBasicMaterial color="#ffaa00" />
            </mesh>

            <EffectComposer>
                <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.0} radius={0.8} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    );
};

export default CosmicScene;
