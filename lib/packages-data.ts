export type ActivityType = 'houseboat' | 'time-based';

export interface Activity {
  id: string;
  name: string;
  description: string;
  type: ActivityType;
  images: string[];
  basePrice: number;
  maxGuests?: number;
  features: string[];
  specs?: { label: string; value: string; iconKey: string }[];
  variants?: {
    id: string;
    name: string;
    price: number;
    description?: string;
    specs?: { label: string; value: string; iconKey: string }[];
    images?: string[];
    cruiseTypes?: { id: string; label: string; multiplier: number; description: string }[];
  }[];
  durations?: { id: string; name: string; multiplier: number; minPrice?: number; maxPrice?: number; image?: string }[];
}

export const PACKAGES: Record<string, Activity> = {
  houseboat: {
    id: 'houseboat',
    name: 'Houseboats',
    description: 'Choose between private luxury boats or budget-friendly shared experiences.',
    type: 'houseboat',
    images: [
      '/images/houseboats/IMG-20241008-WA0006.jpg',
      '/images/houseboats/IMG-20251212-WA0013.jpg',
      '/images/houseboats/IMG-20251217-WA0003.jpg'
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
        images: ['/images/houseboats/IMG-20241008-WA0006.jpg'],
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
        images: ['/images/houseboats/IMG-20251212-WA0013.jpg'],
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
        images: ['/images/houseboats/IMG-20251217-WA0003.jpg'],
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
        images: ['/images/houseboats/houseboat-hero.jpg'],
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
        images: ['/images/houseboats/houseboat-hero.jpg'],
      },
    ],
  },
  shikara: {
    id: 'shikara',
    name: 'Shikara Ride',
    description: 'A traditional open canoe ride through narrow canals where houseboats cannot reach.',
    type: 'time-based',
    images: [
      '/images/shikara/shikara-hero.jpg',
      '/images/shikara/IMG-20250517-WA0011.jpg',
      '/images/shikara/IMG-20250517-WA0012.jpg'
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
      '/images/kayak/kayak-hero.jpg',
      '/images/kayak/IMG-20241023-WA0034.jpg',
      '/images/kayak/IMG-20251212-WA0001.jpg',
      '/images/kayak/IMG-20251212-WA0008.jpg'
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
      '/images/speedboat/speedboat-hero.jpg',
      '/images/speedboat/WhatsApp Image 2026-01-19 at 12.31.09 PM.jpeg'
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

export const activities: Activity[] = Object.values(PACKAGES);


export const destinations = [
  {
    id: 'temple',
    name: 'Ambalappuzha Temple',
    image: '/images/shikara/IMG-20250517-WA0012.jpg',
    description: 'Ancient temple famous for its Palpayasam (sweet pudding) and architecture.',
  },
  {
    id: 'church',
    name: 'Champakulam Church',
    image: '/images/houseboats/IMG-20251212-WA0013.jpg',
    description: 'One of the oldest churches in Kerala, located on the river Pamba.',
  },
  {
    id: 'beach',
    name: 'Alleppey Beach',
    image: '/images/speedboat/hero-1.jpg',
    description: 'Historic beach with a 150-year-old pier and an old lighthouse.',
  },
  {
    id: 'museum',
    name: 'Revi Karuna Karan Museum',
    image: '/images/speedboat/hero-2.jpg',
    description: 'A private museum displaying crystal, ivory, and art collections.',
  },
  {
    id: 'kuttanad',
    name: 'Kuttanad Paddy Fields',
    image: '/images/speedboat/hero-3.jpg',
    description: 'The "Rice Bowl of Kerala", famous for farming below sea level.',
  },
];
