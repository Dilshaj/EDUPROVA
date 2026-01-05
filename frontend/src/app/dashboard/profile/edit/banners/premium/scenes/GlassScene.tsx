import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, MeshTransmissionMaterial, Float, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

const GlassShape = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={512}
                    thickness={0.5}
                    roughness={0.1}
                    ior={1.5}
                    chromaticAberration={0.1}
                    anisotropy={0.1}
                    background={new THREE.Color('#ffffff')}
                    color="#e0f7fa"
                />
            </mesh>
        </Float>
    )
}

const BackgroundShapes = () => {
    return (
        <group>
            <mesh position={[-3, 2, -5]}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color="#ff9aa2" roughness={0.4} />
            </mesh>
            <mesh position={[4, -1, -4]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#b5ead7" roughness={0.4} />
            </mesh>
            <mesh position={[0, -2, -3]}>
                <boxGeometry args={[10, 0.2, 10]} />
                <meshStandardMaterial color="#f0f0f0" />
            </mesh>
        </group>
    )
}

const GlassScene = () => {
    return (
        <>
            <color attach="background" args={['#fafafa']} />

            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

            <GlassShape />
            <BackgroundShapes />

            {/* Studio Lighting Environment */}
            <Environment preset="city" />
        </>
    );
};

export default GlassScene;
