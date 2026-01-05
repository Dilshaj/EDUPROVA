export const mockProfileData = {
    general: {
        firstName: "Varahanarasimha",
        lastName: "Logisa",
        email: "varaha.logisa@example.com",
        phone: "+91 98765 43210",
        location: "Andhra Pradesh, India",
        bio: "Passionate Product Designer with 5+ years of experience in creating user-centric digital experiences. I love solving complex problems with simple, elegant solutions.",
        profilePicture: "",
        coverBanner: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=80"
    },
    professional: {
        headline: "Product Designer @ Eduprova",
        availability: "open",
        skills: [
            { name: "UI Design" },
            { name: "UX Research" },
            { name: "Figma" },
            { name: "React" }
        ],
        experiences: [
            {
                role: "Senior Product Designer",
                company: "Eduprova",
                dates: "Jan 2022 - Present",
                description: "Leading the design team for the core e-learning platform. Improved user retention by 25%."
            }
        ],
        education: [
            {
                school: "Stanford University",
                degree: "Bachelor of Computer Science",
                year: "2018 - 2022"
            }
        ],
        languages: [
            { name: "English", level: "Native" },
            { name: "Hindi", level: "Fluent" }
        ],
        interests: ["AI in UX", "Typography", "Sustainability"],
        projects: [
            {
                name: "E-Learning App",
                role: "Lead Designer",
                description: "Designed a comprehensive mobile app for online courses."
            }
        ],
        resume: null
    },
    socials: {
        website: "https://varahadesigns.com",
        linkedin: "https://linkedin.com/in/username",
        github: "https://github.com/username",
        twitter: "https://twitter.com/username"
    }
};

export const getInitialEditData = (data: any) => {
    // Check if we have data in localStorage first to keep it consistent
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('userProfileData');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved profile data", e);
            }
        }
    }

    return {
        general: { ...data.general },
        professional: { ...data.professional },
        socials: { ...data.socials }
    };
};
