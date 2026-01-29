
export type ActivityType = "houseboat" | "time-based";

export interface Activity {
    id: string;
    name: string;
    description: string;
    type: ActivityType;
    image: string;
    basePrice: number;
    maxGuests?: number;
    features: string[];
    specs?: { label: string; value: string; iconKey: string }[];
    variants?: { id: string; name: string; price: number; description?: string }[];
    durations?: { id: string; name: string; multiplier: number; minPrice?: number; maxPrice?: number }[];
}

export const activities: Activity[] = [
    {
        id: "houseboat",
        name: "Houseboat Stay",
        description: "Choose between private luxury boats or budget-friendly shared experiences.",
        type: "houseboat",
        image: "/images/hero-1.jpg",
        basePrice: 4999,
        features: ["Private & Shared Options", "All Meals Included", "Scenic Route", "AC Bedrooms"],
        specs: [
            { label: "Max Occupancy (Day Cruise)", value: "6 Guests", iconKey: "users" },
            { label: "AC Cabins", value: "1 Bedroom", iconKey: "bed" },
            { label: "Style", value: "Houseboat", iconKey: "boat" },
            { label: "Authentic Cuisine", value: "Chef Onboard", iconKey: "chef" },
            { label: "Safety", value: "Certified", iconKey: "shield" },
            { label: "Spoken", value: "English", iconKey: "language" }
        ],
        variants: [
            { id: "shared-standard", name: "Shared Standard", price: 4999, description: "Private bedroom in a shared boat (AC 9pm-6am)." },
            { id: "shared-premium", name: "Shared Premium", price: 6500, description: "Premium private room in a shared boat with full-time AC." },
            { id: "private-deluxe", name: "Private Deluxe", price: 12000, description: "Entire boat to yourself. AC Options available." },
            { id: "private-premium", name: "Private Premium", price: 18000, description: "Glass-covered premium boat with premium amenities." },
            { id: "private-luxury", name: "Private Luxury", price: 24000, description: "Glass-covered luxury boat with premium amenities." }

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
        maxGuests: 7,
        features: ["High Speed", "Lake Round", "Adventure", "Quick Trip"],
        durations: [
            { id: "10min", name: "10 Minutes Ride", multiplier: 1, minPrice: 1000, maxPrice: 1500 },
            { id: "30min", name: "30 Mins Lake Loop", multiplier: 2, minPrice: 2500, maxPrice: 3000 },
            { id: "1hr", name: "1-Hour Village Safari", multiplier: 4, minPrice: 5000, maxPrice: 6000 }
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
