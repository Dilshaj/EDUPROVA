import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const SilkMesh = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
            meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[2, 128, 128]} />
                <MeshDistortMaterial
                    color="#ffd700"
                    speed={2}
                    distort={0.4}
                    radius={1}
                    metalness={0.9}
                    roughness={0.1}
                    emissive="#552200"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
};

const LiquidSilkScene = () => {
    return (
        <>
            <color attach="background" args={['#050510']} />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />

            <SilkMesh />

            <Environment preset="city" />
        </>
    );
};

export default LiquidSilkScene;
