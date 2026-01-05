import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Instance, Instances, Float } from '@react-three/drei';
import * as THREE from 'three';

const Voxels = () => {
    const grid = 15;
    const count = grid * grid * 2;
    const instancesRef = useRef<any>(null);

    const voxels = useMemo(() => {
        const temp = [];
        for (let i = 0; i < grid; i++) {
            for (let j = 0; j < grid; j++) {
                temp.push({
                    position: [i - grid / 2, Math.random(), j - grid / 2],
                    phase: Math.random() * Math.PI * 2,
                    speed: 1 + Math.random()
                });
            }
        }
        return temp;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Since we are using individual Instance components, we can't easily animate them all at once without a custom ref or state
        // For performance and simplicity in this example, we'll just let the group rotate
    });

    return (
        <group rotation={[Math.PI / 6, Math.PI / 4, 0]}>
            <Instances>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshStandardMaterial color="#333333" roughness={0.1} metalness={0.8} />
                {voxels.map((v, i) => (
                    <VoxelInstance key={i} {...v} />
                ))}
            </Instances>
        </group>
    );
};

const VoxelInstance = ({ position, phase, speed }: any) => {
    const ref = useRef<any>();
    useFrame((state) => {
        if (ref.current) {
            const time = state.clock.getElapsedTime();
            ref.current.position.y = Math.sin(time * speed + phase) * 0.5;
            const s = (Math.sin(time * speed + phase) + 1.2) * 0.5;
            ref.current.scale.setScalar(s);
        }
    });
    return <Instance ref={ref} position={position} />;
};

const VoxelStormScene = () => {
    return (
        <>
            <color attach="background" args={['#0a0a0a']} />
            <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <spotLight position={[-10, 10, 10]} angle={0.3} intensity={2} color="#00ff00" />

            <Voxels />
        </>
    );
};

export default VoxelStormScene;
