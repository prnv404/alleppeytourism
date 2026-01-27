
export type ActivityType = "houseboat" | "time-based";

export interface Activity {
    id: string;
    name: string;
    description: string;
    type: ActivityType;
    image: string;
    basePrice: number;
    features: string[];
    variants?: { id: string; name: string; price: number; description?: string }[];
    durations?: { id: string; name: string; multiplier: number }[];
}

export const activities: Activity[] = [
    {
        id: "houseboat",
        name: "Private Houseboat",
        description: "Experience the tranquility of the backwaters in a private luxury houseboat. All meals included.",
        type: "houseboat",
        image: "/images/hero-1.jpg",
        basePrice: 0,
        features: ["Private Bedroom", "AC Options", "All Meals Included", "Scenic Route"],
        variants: [
            { id: "deluxe", name: "Deluxe (AC 9pm-6am)", price: 8500, description: "Classic houseboat experience with AC in bedroom during sleeping hours." },
            { id: "premium", name: "Premium (AC Full Time)", price: 12000, description: "Enjoy full-time air conditioning in the bedroom for maximum comfort." },
            { id: "luxury", name: "Luxury (Glass Covered)", price: 18000, description: "High-end glass-covered boat with premium amenities and full-time AC." }
        ]
    },
    {
        id: "shikara",
        name: "Shikara Ride",
        description: "A traditional open canoe ride through narrow canals where houseboats cannot reach.",
        type: "time-based",
        image: "/images/hero-2.jpg",
        basePrice: 800,
        features: ["Narrow Canal Access", "Open Roof View", "Village Life Tour", "Peaceful Ride"],
        durations: [
            { id: "1hr", name: "1 Hour", multiplier: 1 },
            { id: "2hr", name: "2 Hours", multiplier: 2 },
            { id: "3hr", name: "3 Hours", multiplier: 3 },
            { id: "sunset", name: "Sunset (2.5 Hrs)", multiplier: 2.5 }
        ]
    },
    {
        id: "kayak",
        name: "Kayaking",
        description: "Paddle your way through the heart of Alleppey's villages. Perfect for adventure seekers.",
        type: "time-based",
        image: "/images/hero-3.jpg",
        basePrice: 500,
        features: ["Self-Paddled", "Guided Tours", "Morning/Evening Slots", "Close to Nature"],
        durations: [
            { id: "1hr", name: "1 Hour", multiplier: 1 },
            { id: "sunrise", name: "Sunrise (Morning)", multiplier: 1.5 },
            { id: "sunset", name: "Sunset (Evening)", multiplier: 1.5 }
        ]
    },
    {
        id: "speedboat",
        name: "Speed Boat",
        description: "Feel the thrill of speed on the serene backwaters. Quick and exciting tours.",
        type: "time-based",
        image: "/images/hero-1.jpg",
        basePrice: 1500,
        features: ["High Speed", "Lake Round", "Adventure", "Quick Trip"],
        durations: [
            { id: "round", name: "Lake Round", multiplier: 1 },
            { id: "hour", name: "1 Hour Blast", multiplier: 2 }
        ]
    },
];

export const destinations = [
    { id: "temple", name: "Ambalappuzha", image: "/images/hero-2.jpg" },
    { id: "church", name: "Pulinkunnu", image: "/images/hero-3.jpg" },
    { id: "beach", name: "Alleppey Beach", image: "/images/hero-1.jpg" },
    { id: "museum", name: "Revi Museum", image: "/images/hero-2.jpg" },
    { id: "kuttanad", name: "Kuttanad", image: "/images/hero-3.jpg" },
];
