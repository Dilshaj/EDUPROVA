import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import CosmicScene from './scenes/CosmicScene';
import SphereScene from './scenes/SphereScene';
import NetworkScene from './scenes/NetworkScene';
import WaveScene from './scenes/WaveScene';
import GalacticOrbitScene from './scenes/GalacticOrbitScene';
import LiquidSilkScene from './scenes/LiquidSilkScene';
import NeuralCoreScene from './scenes/NeuralCoreScene';
import VoxelStormScene from './scenes/VoxelStormScene';

export type PremiumBannerType = 'COSMIC' | 'SPHERE' | 'NETWORK' | 'WAVE' | 'GALACTIC_BLUE' | 'GALACTIC_ORANGE' | 'SILK' | 'NEURAL' | 'VOXEL';

interface PremiumBannerProps {
    type: PremiumBannerType;
}

const BannerContent = ({ type }: { type: PremiumBannerType }) => {
    switch (type) {
        case 'COSMIC':
            return <CosmicScene />;
        case 'SPHERE':
            return <SphereScene />;
        case 'NETWORK':
            return <NetworkScene />;
        case 'WAVE':
            return <WaveScene />;
        case 'GALACTIC_BLUE':
            return <GalacticOrbitScene variant="BLUE" />;
        case 'GALACTIC_ORANGE':
            return <GalacticOrbitScene variant="ORANGE" />;
        case 'SILK':
            return <LiquidSilkScene />;
        case 'NEURAL':
            return <NeuralCoreScene />;
        case 'VOXEL':
            return <VoxelStormScene />;
        default:
            return <GalacticOrbitScene variant="BLUE" />;
    }
};

const PremiumBanner: React.FC<PremiumBannerProps> = ({ type }) => {
    return (
        <div className="w-full h-full relative bg-gray-900">
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false }}
                className="absolute inset-0 w-full h-full"
            >
                <Suspense fallback={null}>
                    <BannerContent type={type} />
                </Suspense>
            </Canvas>
            <Loader containerStyles={{ background: 'transparent' }} innerStyles={{ width: '100px', height: '2px' }} barStyles={{ height: '2px', background: 'white' }} dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`} />

            {/* Overlay for text readability if needed, though scenes are designed to be backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
    );
};

export default PremiumBanner;
