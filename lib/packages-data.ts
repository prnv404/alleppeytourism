export type ActivityType = 'houseboat' | 'time-based';

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
  variants?: {
    id: string;
    name: string;
    price: number;
    description?: string;
    specs?: { label: string; value: string; iconKey: string }[];
    cruiseTypes?: { id: string; label: string; multiplier: number; description: string }[];
  }[];
  durations?: { id: string; name: string; multiplier: number; minPrice?: number; maxPrice?: number }[];
}

export const PACKAGES: Record<string, Activity> = {
  houseboat: {
    id: 'houseboat',
    name: 'Houseboats',
    description: 'Choose between private luxury boats or budget-friendly shared experiences.',
    type: 'houseboat',
    image: '/images/hero-1.jpg',
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
        name: 'Deluxe Shared Houseboat in Alleppey – Budget AC Boat House',
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
      },
      {
        id: 'shared-premium',
        name: 'Shared Premium',
        price: 7499,
        description: 'Premium private room in a shared boat with full-time AC.',
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
      },
      {
        id: 'private-deluxe',
        name: 'Private Deluxe',
        price: 8500,
        description: 'Entire boat to yourself. AC Options available.',
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
      },
      {
        id: 'private-premium',
        name: 'Private Premium',
        price: 15999,
        description: 'Glass-covered premium boat with premium amenities.',
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
      },
      {
        id: 'private-luxury',
        name: 'Private Luxury',
        price: 21999,
        description: 'Glass-covered luxury boat with premium amenities.',
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
      },
    ],
  },
  shikara: {
    id: 'shikara',
    name: 'Shikara Ride',
    description: 'A traditional open canoe ride through narrow canals where houseboats cannot reach.',
    type: 'time-based',
    image: '/images/hero-2.jpg',
    basePrice: 800,
    features: ['Narrow Canal Access', 'Open Roof View', 'Village Life Tour', 'Peaceful Ride'],
    durations: [
      { id: '1hr', name: '1 Hour', multiplier: 1 },
      { id: '2hr', name: '2 Hours', multiplier: 2 },
      { id: '3hr', name: '3 Hours', multiplier: 3 },
      { id: 'sunset', name: 'Sunset (2.5 Hrs)', multiplier: 2.5 },
    ],
  },
  kayak: {
    id: 'kayak',
    name: 'Kayaking',
    description: "Paddle your way through the heart of Alleppey's villages. Perfect for adventure seekers.",
    type: 'time-based',
    image: '/images/hero-3.jpg',
    basePrice: 500,
    features: ['Self-Paddled', 'Guided Tours', 'Morning/Evening Slots', 'Close to Nature'],
    durations: [
      { id: '1hr', name: '1 Hour', multiplier: 1 },
      { id: 'sunrise', name: 'Sunrise (Morning)', multiplier: 1.5 },
      { id: 'sunset', name: 'Sunset (Evening)', multiplier: 1.5 },
    ],
  },
  speedboat: {
    id: 'speedboat',
    name: 'Speed Boat',
    description: 'Feel the thrill of speed on the serene backwaters. Quick and exciting tours.',
    type: 'time-based',
    image: '/images/hero-1.jpg',
    basePrice: 1500,
    maxGuests: 7,
    features: ['High Speed', 'Lake Round', 'Adventure', 'Quick Trip'],
    durations: [
      { id: '10min', name: '10 Minutes Ride', multiplier: 1, minPrice: 1000, maxPrice: 1500 },
      { id: '30min', name: '30 Mins Lake Loop', multiplier: 2, minPrice: 2500, maxPrice: 3000 },
      { id: '1hr', name: '1-Hour Village Safari', multiplier: 4, minPrice: 5000, maxPrice: 6000 },
    ],
  },
};

export const activities: Activity[] = Object.values(PACKAGES);


export const destinations = [
  { id: 'temple', name: 'Ambalappuzha', image: '/images/hero-2.jpg' },
  { id: 'church', name: 'Pulinkunnu', image: '/images/hero-3.jpg' },
  { id: 'beach', name: 'Alleppey Beach', image: '/images/hero-1.jpg' },
  { id: 'museum', name: 'Revi Museum', image: '/images/hero-2.jpg' },
  { id: 'kuttanad', name: 'Kuttanad', image: '/images/hero-3.jpg' },
];
