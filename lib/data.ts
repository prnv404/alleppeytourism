/**
 * Static Data
 * All static content for activities, destinations, testimonials
 */

import type { Activity, Destination, Testimonial } from '@/types';

// ============================================
// Activities Data
// ============================================

export const ACTIVITIES: Record<string, Activity> = {
    houseboat: {
        id: 'houseboat',
        name: 'Houseboats',
        description: 'Choose between private luxury boats or budget-friendly shared experiences.',
        type: 'houseboat',
        images: [
            { src: '/images/houseboats/premium-hosueboat-1.jpg', alt: 'Alleppey houseboat cruise on Kerala backwaters' },
            { src: '/images/houseboats/premium-houseboat-2.jpg', alt: 'Premium houseboat with AC bedroom in Alleppey' },
            { src: '/images/houseboats/delux-shared.jpg', alt: 'Deluxe shared houseboat interior in Kerala' }
        ],
        basePrice: 4999,
        features: ['Private & Shared Options', 'All Meals Included', 'Scenic Route', 'AC Bedrooms'],
        specs: [
            { label: 'Max Occupancy (Day Cruise)', value: '6 Guests', iconKey: 'users' },
            { label: 'AC Cabins', value: '1 Bedroom', iconKey: 'bed' },
            { label: 'Style', value: 'Houseboat', iconKey: 'boat' },
            { label: 'Authentic Cuisine', value: 'Chef Onboard', iconKey: 'chef' },
            { label: 'Safety', value: 'Certified', iconKey: 'shield' },
            { label: 'Spoken', value: 'English', iconKey: 'language' },
        ],
        variants: [
            {
                id: 'shared-standard',
                name: 'Deluxe Shared Houseboat in Alleppey',
                price: 5499,
                description: 'Looking for a cheap houseboat in Alleppey without compromising on comfort? Our Shared Houseboat package is the smart choice. You get your own Deluxe Private Bedroom with an attached washroom, while enjoying the large open deck and dining area with other travelers. Perfect for budget couples, families, and backpackers, this Alleppey boat house experience lets you enjoy the beauty of the backwaters at a fraction of the cost',
                specs: [
                    { label: 'AC availability', value: '9pm-6am', iconKey: 'bed' },
                    { label: '1 bedroom', value: '3 person allowed', iconKey: 'users' },
                    { label: 'Boat Type', value: 'Shared', iconKey: 'boat' },
                    { label: 'Meals', value: 'All meals', iconKey: 'chef' },
                ],
                cruiseTypes: [
                    { id: 'overnight', label: 'Overnight Cruise', multiplier: 1, description: '12 PM - 9 AM Next Day' },
                    { id: 'day', label: 'Day Cruise', multiplier: 0.75, description: '11 AM - 5 PM' },
                    { id: 'night', label: 'Night Stay', multiplier: 0.85, description: '5:30 PM - 9 AM Next Day' },
                ],
                images: [{ src: '/images/houseboats/premium-room-1.jpeg', alt: 'Deluxe shared houseboat bedroom in Alleppey' }],
            },
            {
                id: 'shared-premium',
                name: 'Premium Shared Houseboat in Alleppey',
                price: 7499,
                description: 'Looking for a premium houseboat experience at a sharing price? Our Premium Shared Houseboat package offers the perfect upgrade. You get your own Spacious Premium Bedroom with Full-Time AC (exclusive to your room) and an attached washroom, while enjoying the superior dining and lounge areas with other guests. Perfect for couples and families who want extra comfort, this Alleppey boat house experience delivers premium quality at a fraction of the cost.',
                specs: [
                    { label: 'AC Hours', value: '24 Hours', iconKey: 'bed' },
                    { label: 'Room Type', value: 'Premium', iconKey: 'star' },
                    { label: 'Boat Type', value: 'Shared', iconKey: 'boat' },
                    { label: 'Meals', value: 'Premium Menu', iconKey: 'chef' },
                ],
                cruiseTypes: [
                    { id: 'overnight', label: 'Overnight Cruise', multiplier: 1, description: '12 PM - 9 AM Next Day' },
                    { id: 'day', label: 'Day Cruise', multiplier: 0.75, description: '11 AM - 5 PM' },
                    { id: 'night', label: 'Night Stay', multiplier: 0.85, description: '5:30 PM - 9 AM Next Day' },
                ],
                images: [
                    { src: '/images/houseboats/premium-room-4.jpeg', alt: 'Premium shared houseboat AC room in Alleppey' }
                ],
            },
            {
                id: 'private-deluxe',
                name: 'Private Deluxe Houseboat in Alleppey',
                price: 8500,
                description: 'Want the whole boat to yourself? Our Private Deluxe Houseboat package offers complete privacy and comfort for your Alleppey boat trip. You get the entire houseboat exclusively for your group, including a private living area, dining deck, and bedrooms with attached washrooms. Enjoy freshly cooked Kerala meals served by your personal chef. This package includes AC Sleeping Hours (9:00 PM - 6:00 AM), making it the best value-for-money private houseboat in Alleppey.',
                specs: [
                    { label: 'Exclusivity', value: 'Private Boat', iconKey: 'shield' },
                    { label: 'Capacity', value: '1-3 Bedrooms', iconKey: 'users' },
                    { label: 'AC Hours', value: 'On-Demand', iconKey: 'bed' },
                    { label: 'Style', value: 'Traditional', iconKey: 'boat' },
                ],
                cruiseTypes: [
                    { id: 'overnight', label: 'Overnight Cruise', multiplier: 1, description: '12 PM - 9 AM Next Day' },
                    { id: 'day', label: 'Day Cruise', multiplier: 0.75, description: '11 AM - 5 PM' },
                    { id: 'night', label: 'Night Stay', multiplier: 0.85, description: '5:30 PM - 9 AM Next Day' },
                ],
                images: [{ src: '/images/houseboats/premium-hosueboat-1.jpg', alt: 'Private deluxe houseboat on Alleppey backwaters' }],
            },
            {
                id: 'private-premium',
                name: 'Private Premium Houseboat in Alleppey',
                price: 15999,
                description: 'Upgrade your backwater experience with our Private Premium Houseboat. Unlike standard boats, this category offers Full-Time AC in the bedroom and a premium Glass-Covered Living Area for unobstructed views. You get the entire boat exclusively for your group, ensuring total privacy. Enjoy superior interiors, a dedicated crew, and a customized food menu. Perfect for honeymoon couples and families who want a luxury houseboat experience in Alleppey without the heat or humidity.',
                specs: [
                    { label: 'Design', value: 'Glass-Covered', iconKey: 'sparkles' },
                    { label: 'AC', value: 'Full-time', iconKey: 'bed' },
                    { label: 'Luxury', value: 'Premium Crew', iconKey: 'users' },
                    { label: 'Cuisine', value: 'Multi-course', iconKey: 'chef' },
                ],
                cruiseTypes: [
                    { id: 'overnight', label: 'Overnight Cruise', multiplier: 1, description: '12 PM - 9 AM Next Day' },
                    { id: 'day', label: 'Day Cruise', multiplier: 0.75, description: '11 AM - 5 PM' },
                    { id: 'night', label: 'Night Stay', multiplier: 0.85, description: '5:30 PM - 9 AM Next Day' },
                ],
                images: [{ src: '/images/houseboats/premium-houseboat-2.jpg', alt: 'Private premium glass-covered houseboat Alleppey' }],
            },
            {
                id: 'private-luxury',
                name: 'Private Luxury Houseboat in Alleppey',
                price: 21999,
                description: 'The Private Luxury Houseboat is the most exclusive boating option in Alleppey. This premium vessel features Full-Time Air Conditioning in both the Bedroom and the Glass-Enclosed Living Area—keeping you cool and comfortable all day long. You will enjoy total privacy in a luxury floating suite with elite interiors, premium service from uniformed staff, and an upgraded Special Food Menu (often featuring Jumbo Prawns or Pearl Spot). Designed for seeking 5-star standards, this package guarantees a luxury cruise through the Alleppey backwaters.',
                specs: [
                    { label: 'Tier', value: 'Ultra Luxury', iconKey: 'star' },
                    { label: 'Design', value: 'Full Glass', iconKey: 'sparkles' },
                    { label: 'Butler', value: 'Personalized', iconKey: 'users' },
                    { label: 'Dining', value: 'Chef Special', iconKey: 'chef' },
                ],
                cruiseTypes: [
                    { id: 'overnight', label: 'Overnight Cruise', multiplier: 1, description: '12 PM - 9 AM Next Day' },
                    { id: 'day', label: 'Day Cruise', multiplier: 0.75, description: '11 AM - 5 PM' },
                    { id: 'night', label: 'Night Stay', multiplier: 0.85, description: '5:30 PM - 9 AM Next Day' },
                ],
                images: [{ src: '/images/houseboats/premium-room-2.jpg', alt: 'Luxury 5-star houseboat cruise in Alleppey' }],
            },
        ],
    },
    shikara: {
        id: 'shikara',
        name: 'Shikara Ride',
        description: 'A traditional open canoe ride through narrow canals where houseboats cannot reach.',
        type: 'time-based',
        images: [
            { src: '/images/shikara/shikara-hero.jpg', alt: 'Shikara boat ride in Alleppey backwaters' },
            { src: '/images/shikara/IMG-20250517-WA0011.jpg', alt: 'Traditional shikara canoe in Kerala backwaters' },
            { src: '/images/shikara/IMG-20250517-WA0012.jpg', alt: 'Scenic shikara ride through Alleppey canals' }
        ],
        basePrice: 800,
        features: ['Narrow Canal Access', 'Open Roof View', 'Village Life Tour', 'Peaceful Ride'],
        durations: [
            { id: '1hr', name: '1 Hour', multiplier: 1 },
            { id: '2hr', name: '2 Hours', multiplier: 2 },
            { id: '3hr', name: '3 Hours', multiplier: 3 },
        ],
    },
    kayak: {
        id: 'kayak',
        name: 'Kayaking',
        description: "Paddle your way through the heart of Alleppey's villages. Perfect for adventure seekers.",
        type: 'time-based',
        images: [
            { src: '/images/kayak/IMG_20241117_080932200_HDR.jpg', alt: 'Kayaking through Alleppey village backwaters' },
            { src: '/images/kayak/IMG-20241023-WA0034.jpg', alt: 'Sunrise kayak tour in Kerala backwaters' },
            { src: '/images/kayak/IMG-20251212-WA0001.jpg', alt: 'Solo kayaker in peaceful Alleppey canals' },
            { src: '/images/kayak/IMG-20251212-WA0008.jpg', alt: 'Guided kayaking adventure in Alleppey' }
        ],
        basePrice: 500,
        features: ['Self-Paddled', 'Guided Tours', 'Morning/Evening Slots', 'Close to Nature'],
        durations: [
            { id: '1hr', name: '1 Hour: "Quick Trial"', multiplier: 1 },
            { id: 'sunrise', name: 'Sunrise (2 Hrs): Most Popular', multiplier: 2 },
            { id: 'sunset', name: 'Sunset (2 Hrs): Golden Hour', multiplier: 2 },
        ],
    },
    speedboat: {
        id: 'speedboat',
        name: 'Speed Boat',
        description: 'Feel the thrill of speed on the serene backwaters. Quick and exciting tours.',
        type: 'time-based',
        images: [
            { src: '/images/speedboat/speedboat-hero.jpg', alt: 'Speed boat ride on Alleppey lake' },
            { src: '/images/speedboat/WhatsApp Image 2026-01-19 at 12.31.09 PM.jpeg', alt: 'Thrilling speedboat tour in Kerala backwaters' }
        ],
        basePrice: 900,
        maxGuests: 7,
        features: ['High Speed', 'Lake Round', 'Adventure', 'Quick Trip'],
        durations: [
            { id: '10min', name: '10 Minutes Ride', multiplier: 1, minPrice: 900, maxPrice: 1500, image: '/images/speedboat/hero-3.jpg' },
            { id: '30min', name: '30 Mins Lake Loop', multiplier: 2, minPrice: 2500, maxPrice: 3000, image: '/images/speedboat/hero-2.jpg' },
            { id: '1hr', name: '1-Hour Village Safari', multiplier: 4, minPrice: 5000, maxPrice: 6000, image: '/images/speedboat/speedboat-hero.jpg' },
        ],
    },
};

// Helper: Get all activities as array
export const activities: Activity[] = Object.values(ACTIVITIES);

// Helper: Get activity by ID
export const getActivityById = (id: string): Activity | undefined => ACTIVITIES[id];

// Helper: Get activities by type
export const getActivitiesByType = (type: Activity['type']): Activity[] =>
    activities.filter(a => a.type === type);

// ============================================
// Destinations Data
// ============================================

export const DESTINATIONS: Destination[] = [
    {
        id: 'temple',
        name: 'Ambalappuzha Temple',
        image: '/images/places/temple.jpeg',
        alt: 'Ambalappuzha Sri Krishna Temple in Alleppey Kerala',
        description: 'Ancient temple famous for its Palpayasam (sweet pudding) and architecture.',
    },
    {
        id: 'church',
        name: 'Pulikunnu Church',
        image: '/images/places/pulikunnu-church.jpeg',
        alt: 'Pulikunnu Church near Alleppey backwaters',
        description: 'A beautiful church located on the serene backwaters of Alleppey.',
    },
    {
        id: 'beach',
        name: 'Alleppey Beach',
        image: '/images/places/beach.jpeg',
        alt: 'Alleppey Beach with historic pier and lighthouse',
        description: 'Historic beach with a 150-year-old pier and an old lighthouse.',
    },
    {
        id: 'kuttanad',
        name: 'Kuttanad Paddy Fields',
        image: '/images/places/paddy-field.jpeg',
        alt: 'Kuttanad paddy fields below sea level in Kerala',
        description: 'The "Rice Bowl of Kerala", famous for farming below sea level.',
    },
];

// ============================================
// Testimonials Data
// ============================================

export const TESTIMONIALS: Testimonial[] = [
    {
        id: '1',
        name: 'Rahul Sharma',
        location: 'Mumbai, India',
        rating: 5,
        text: 'Amazing houseboat experience! The crew was extremely friendly and the food was delicious. Highly recommend the premium package.',
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        location: 'London, UK',
        rating: 5,
        text: 'The kayaking tour at sunrise was absolutely magical. Our guide was knowledgeable and showed us hidden spots in the backwaters.',
    },
    {
        id: '3',
        name: 'Priya Menon',
        location: 'Chennai, India',
        rating: 5,
        text: 'Perfect family trip! The kids loved the shikara ride through the village canals. Great value for money.',
    },
];

// ============================================
// FAQ Data
// ============================================

export const HOME_FAQS = [
    {
        q: 'What is the best way to explore Alleppey Backwaters?',
        a: 'It depends on your time and budget. For a complete overnight experience with food, choose a Houseboat Stay. If you have only 2-3 hours and want to see narrow canals, a Shikara Ride or Kayaking is best. For thrill-seekers, we recommend our Speed Boat Cruise.',
    },
    {
        q: 'What is the difference between a Houseboat and a Shikara?',
        a: 'A Houseboat is like a floating hotel with AC bedrooms, toilets, and a kitchen, designed for overnight stays. A Shikara is a smaller, open-roof boat with comfortable seating, perfect for hourly cruises through village canals.',
    },
    {
        q: 'Is it safe for couples, families, children, and elders?',
        a: 'Yes, absolutely. All our boats are Government-licensed and 100% safe for all age groups. We specialize in hosting couples, families with small children, and senior citizens.',
    },
    {
        q: 'Do I need to book in advance?',
        a: 'Yes, we highly recommend booking in advance, especially for Houseboats and Shikara rides during weekends and peak season. Booking online guarantees your reservation and saves you from last-minute high prices.',
    },
    {
        q: 'How do I reach the boarding point?',
        a: 'Our main boarding point is at Finishing Point Road, Alappuzha. It is just 4 km from the Alappuzha Railway Station and 2 km from the KSRTC Bus Stand. We share the exact Google Maps location via WhatsApp once your booking is confirmed.',
    },
];
