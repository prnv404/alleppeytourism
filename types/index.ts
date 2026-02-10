/**
 * Core Types
 * All shared TypeScript interfaces and types
 */

// ============================================
// Activity Types
// ============================================

export type ActivityType = 'houseboat' | 'time-based';

export interface ActivityImage {
    src: string;
    alt: string;
}

export interface ActivitySpec {
    label: string;
    value: string;
    iconKey: string;
}

export interface CruiseType {
    id: string;
    label: string;
    multiplier: number;
    description: string;
}

export interface ActivityVariant {
    id: string;
    name: string;
    price: number;
    description?: string;
    specs?: ActivitySpec[];
    images?: ActivityImage[];
    cruiseTypes?: CruiseType[];
}

export interface ActivityDuration {
    id: string;
    name: string;
    multiplier: number;
    minPrice?: number;
    maxPrice?: number;
    image?: string;
}

export interface Activity {
    id: string;
    name: string;
    description: string;
    type: ActivityType;
    images: ActivityImage[];
    basePrice: number;
    maxGuests?: number;
    features: string[];
    specs?: ActivitySpec[];
    variants?: ActivityVariant[];
    durations?: ActivityDuration[];
}

// ============================================
// Destination Types
// ============================================

export interface Destination {
    id: string;
    name: string;
    image: string;
    alt: string;
    description: string;
}

// ============================================
// Booking Types
// ============================================

export interface BookingSelection {
    activityId: string;
    variantId?: string;
    durationId?: string;
    cruiseType?: string;
    date?: Date;
    guests: number;
    addons?: string[];
}

export interface BookingFormData {
    name: string;
    phone: string;
    email?: string;
    date: Date;
    guests: number;
    message?: string;
}

// ============================================
// UI Types
// ============================================

export interface ListingItem {
    id: string;
    title: string;
    description?: string;
    price: number;
    priceUnit?: string;
    pricePrefix?: string;
    image: string;
    href: string;
    rating?: number;
    isGuestFavorite?: boolean;
}

export interface FaqItem {
    q: string;
    a: string;
}

export interface HeroSlide {
    image: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonUrl: string;
}

// ============================================
// Testimonial Types
// ============================================

export interface Testimonial {
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    avatar?: string;
}

// ============================================
// ElevenLabs Types (Voice Widget)
// ============================================

export interface ElevenLabsConfig {
    agentId: string;
}
