export interface BannerInfo {
    id: string;
    type: string;
    name?: string;
    role?: string;
    preview: string;
}

export const BANNER_PRESETS = [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80", // Luxury Dark Car (Kept)
    "https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?w=1200&q=80", // Luxury Dark Car (Kept)
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=80", // Neon Supercar Rear
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80", // Car Interior Cockpit
    "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1200&q=80", // Dark Night Drive (Kept)
]

export const LEGACY_BANNERS: BannerInfo[] = [
    {
        id: "fluid:architect",
        type: "ARCHITECT",
        name: "The Architect",
        role: "Coder / Developer",
        preview: "/banners/architect-preview.png"
    },
    {
        id: "premium:cosmic",
        type: "COSMIC",
        name: "Deep Nexus",
        role: "The Neuro",
        preview: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80" // Deep Blue/Purple
    },
    {
        id: "premium:network",
        type: "NETWORK",
        name: "Neural Mesh",
        role: "System Grid",
        preview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" // Earth Network
    },
    {
        id: "premium:wave",
        type: "WAVE",
        name: "Data Flow",
        role: "Digital Stream",
        preview: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" // Circuit/Chip Green
    },
]

export const LIVE_BANNERS: BannerInfo[] = [
    {
        id: "premium:sphere",
        type: "SPHERE",
        preview: "/banners/sphere-preview.png" // Liquid Gold Abstract
    },
]

export const ALL_BANNERS = [...LIVE_BANNERS, ...LEGACY_BANNERS];
