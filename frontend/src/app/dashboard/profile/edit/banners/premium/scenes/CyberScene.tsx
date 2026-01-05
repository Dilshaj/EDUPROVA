import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Text, Trail } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Scanline } from '@react-three/postprocessing';
import * as THREE from 'three';

const MovingGrid = () => {
    const gridRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
        }
    });

    return (
        <group ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <gridHelper args={[60, 60, 0xff00ff, 0x220044]} position={[0, 0, 0]} />
            <gridHelper args={[60, 60, 0xff00ff, 0x220044]} position={[0, 0, -60]} />
        </group>
    );
};

const FloatingGeo = () => {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group position={[0, 0, -5]}>
                {/* Main Crystal */}
                <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    <octahedronGeometry args={[1.5, 0]} />
                    <meshBasicMaterial color="#00ffff" wireframe />
                </mesh>

                {/* Inner Glow */}
                <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={[0.9, 0.9, 0.9]}>
                    <octahedronGeometry args={[1.5, 0]} />
                    <meshBasicMaterial color="#ff00ff" transparent opacity={0.1} />
                </mesh>

                {/* Orbiting particles */}
                <group rotation={[0, 0, Math.PI / 3]}>
                    <mesh position={[2.5, 0, 0]}>
                        <boxGeometry args={[0.2, 0.2, 0.2]} />
                        <meshBasicMaterial color="#00ff00" />
                    </mesh>
                </group>
            </group>
        </Float>
    )
}

const CyberScene = () => {
    return (
        <>
            <color attach="background" args={['#050510']} />
            <fog attach="fog" args={['#050510', 5, 25]} />

            <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={75} />

            <ambientLight intensity={0.5} />
            <MovingGrid />
            <FloatingGeo />

            {/* Decorative distant lines */}
            <mesh position={[-8, 2, -10]} rotation={[0, 0, Math.PI / 4]}>
                <cylinderGeometry args={[0.1, 0.1, 10]} />
                <meshBasicMaterial color="#ff00ff" />
            </mesh>
            <mesh position={[8, 2, -10]} rotation={[0, 0, -Math.PI / 4]}>
                <cylinderGeometry args={[0.1, 0.1, 10]} />
                <meshBasicMaterial color="#00ffff" />
            </mesh>

            <EffectComposer>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
                <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
                <Scanline density={1.5} opacity={0.3} />
            </EffectComposer>
        </>
    );
};

export default CyberScene;
