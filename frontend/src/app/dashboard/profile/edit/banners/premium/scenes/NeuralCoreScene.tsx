import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

const NeuralNodes = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 500;

    const [positions, colors] = useMemo(() => {
        const p = new Float32Array(count * 3);
        const c = new Float32Array(count * 3);
        const coreColor = new THREE.Color('#00ffff');
        const pulseColor = new THREE.Color('#ff00ff');

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2 + Math.random() * 0.5;

            p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            p[i * 3 + 2] = r * Math.cos(phi);

            const mixedColor = coreColor.clone().lerp(pulseColor, Math.random());
            c[i * 3] = mixedColor.r;
            c[i * 3 + 1] = mixedColor.g;
            c[i * 3 + 2] = mixedColor.b;
        }
        return [p, c];
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.005;
            const time = state.clock.getElapsedTime();
            pointsRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
            <PointMaterial
                transparent
                vertexColors
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

const NeuralCoreScene = () => {
    return (
        <>
            <color attach="background" args={['#000510']} />
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />

            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#00ffff" />

            <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                <mesh>
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <meshBasicMaterial color="#00ffff" transparent opacity={0.2} wireframe />
                </mesh>
                <NeuralNodes />
            </Float>
        </>
    );
};

export default NeuralCoreScene;
