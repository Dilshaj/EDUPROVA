import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const ParticleWave = () => {
    const count = 5000;
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Grid layout
    const particles = useMemo(() => {
        const temp = [];
        const rows = 50;
        const cols = 100;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                temp.push({
                    x: (j - cols / 2) * 0.2,
                    z: (i - rows / 2) * 0.2,
                    row: i,
                    col: j
                });
            }
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        particles.forEach((p, i) => {
            // Wave calculation
            const y = Math.sin(p.x * 0.5 + time) * Math.cos(p.z * 0.5 + time) * 0.5 + Math.sin(p.z * 1 + time * 1.5) * 0.2;

            dummy.position.set(p.x, y, p.z);
            dummy.scale.setScalar(0.03);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]}>
            <circleGeometry args={[1, 6]} />
            <meshBasicMaterial color="#00d1ff" transparent opacity={0.4} depthWrite={false} />
        </instancedMesh>
    );
};

const WaveScene = () => {
    return (
        <>
            <color attach="background" args={['#000810']} />
            <PerspectiveCamera makeDefault position={[0, 4, 12]} fov={50} />

            <ambientLight intensity={0.5} />
            <pointLight position={[0, 8, 0]} intensity={2} color="#00ffcc" />

            <group rotation={[0.2, 0, 0]}>
                <ParticleWave />
            </group>
        </>
    );
};

export default WaveScene;
