import React, { useMemo } from 'react';
import { Float, Line, Sphere, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const Connections = ({ count = 60 }) => {
    // Generate random nodes
    const nodes = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 18,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 8
            ] as [number, number, number]
        }))
    }, [count]);

    // Generate lines between close nodes
    const lines = useMemo(() => {
        const l: any[] = [];
        // Chain them loosely
        for (let i = 0; i < nodes.length - 1; i++) {
            // Draw more lines for a dense network
            if (Math.random() > 0.3) {
                l.push([nodes[i].position, nodes[i + 1].position]);
            }
            // Random jump connections
            if (Math.random() > 0.7) {
                const target = Math.floor(Math.random() * nodes.length);
                l.push([nodes[i].position, nodes[target].position]);
            }
            // Another random jump
            if (Math.random() > 0.9) {
                const target = Math.floor(Math.random() * nodes.length);
                l.push([nodes[i].position, nodes[target].position]);
            }
        }
        return l;
    }, [nodes]);

    return (
        <group>
            {/* Draw Lines */}
            {lines.map((line, i) => (
                <Line
                    key={i}
                    points={line}
                    color="#00ffff"
                    opacity={0.3} // Increased opacity
                    transparent
                    lineWidth={1.5} // Thicker lines
                />
            ))}

            {/* Draw Nodes */}
            {nodes.map((node, i) => (
                <group key={i} position={node.position}>
                    <Sphere args={[0.08, 16, 16]}>
                        <meshBasicMaterial color="#ffffff" />
                    </Sphere>
                    {/* Glow */}
                    <Sphere args={[0.25, 16, 16]}>
                        <meshBasicMaterial color="#00aaff" transparent opacity={0.4} />
                    </Sphere>
                </group>
            ))}
        </group>
    )

}

const NetworkScene = () => {
    return (
        <>
            <color attach="background" args={['#02020a']} />

            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.2}>
                <Connections />
            </Float>

            {/* Background mist */}
            <fog attach="fog" args={['#02020a', 5, 25]} />

            <EffectComposer>
                <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} radius={0.4} />
            </EffectComposer>
        </>
    );
};

export default NetworkScene;
