import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const SphereParticles = () => {
    const ref = useRef<THREE.Points>(null);

    const count = 12000;
    const radius = 2.8;

    const [positions, colors, sizes] = useMemo(() => {
        const p = new Float32Array(count * 3);
        const c = new Float32Array(count * 3);
        const s = new Float32Array(count);

        const goldColors = [
            new THREE.Color('#ffd700'), // Gold
            new THREE.Color('#ffcc33'), // Sunglow
            new THREE.Color('#e5b80b'), // Harvest Gold
            new THREE.Color('#ffdf00'), // Golden Yellow
            new THREE.Color('#ffffff'), // White (for glints)
        ];

        for (let i = 0; i < count; i++) {
            // Random point within a sphere volume with higher density towards center
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);

            // Random distance with a slight bias towards the surface for a "shell" look but with volume
            const r = radius * (0.8 + Math.random() * 0.4) * Math.pow(Math.random(), 0.1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            p[i * 3] = x;
            p[i * 3 + 1] = y;
            p[i * 3 + 2] = z;

            // Varied gold colors
            const chosenColor = goldColors[Math.floor(Math.random() * goldColors.length)];
            c[i * 3] = chosenColor.r;
            c[i * 3 + 1] = chosenColor.g;
            c[i * 3 + 2] = chosenColor.b;

            // Varied sizes
            s[i] = Math.random() * 0.05 + 0.01;
        }
        return [p, c, s];
    }, [count, radius]);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.05;
            ref.current.rotation.x += delta * 0.02;

            // Add a slight oscillation
            const time = state.clock.getElapsedTime();
            ref.current.position.y = Math.sin(time * 0.5) * 0.1;

            // Pulsing effect
            const scale = 1 + Math.sin(time * 0.3) * 0.05;
            ref.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.035}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
};

const SphereScene = () => {
    return (
        <>
            <color attach="background" args={['#020202']} />

            {/* Subtle ambient light */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" />

            <SphereParticles />
        </>
    );
};

export default SphereScene;
