import { Activity, activities } from './packages-data';
import { StayType } from '@/components/booking/detail/shared';

interface PricingParams {
    activity: Activity;
    selectedVariantId?: string;
    selectedDurationId?: string | null;
    stayType?: StayType | null;
    peopleCount: number;
    selectedAddons?: string[];
}

export function calculateTotalPrice(params: PricingParams): number {
    const { activity, selectedAddons = [] } = params;
    let basePrice = 0;

    switch (activity.id) {
        case 'houseboat':
            basePrice = calculateHouseboatPrice(params);
            break;
        case 'shikara':
            basePrice = calculateShikaraPrice(params);
            break;
        case 'speedboat':
            basePrice = calculateSpeedboatPrice(params);
            break;
        case 'kayak':
            basePrice = calculateKayakPrice(params);
            break;
        default:
            basePrice = calculateDefaultPrice(params);
    }

    // Add-ons calculation
    const addonsTotal = selectedAddons.reduce((total, addonId) => {
        const addon = activities.find(a => a.id === addonId);
        if (!addon) return total;
        return getAddonPrice(addon);
    }, 0);

    return basePrice + addonsTotal;
}

function calculateHouseboatPrice({ activity, selectedVariantId, stayType }: PricingParams): number {
    if (!stayType || !activity.variants) return 0;

    const variant = activity.variants.find(v => v.id === selectedVariantId);
    if (!variant) return 0;

    const cruiseType = variant.cruiseTypes?.find(ct => ct.id === stayType);
    const multiplier = cruiseType?.multiplier || 1;
    const price = variant.price * multiplier;

    // Round to nearest 100 for clean numbers if needed, but keeping exact for now
    return Math.round(price);
}

function calculateShikaraPrice({ activity, selectedDurationId, peopleCount }: PricingParams): number {
    if (!selectedDurationId || !activity.durations) return 0;

    const duration = activity.durations.find(d => d.id === selectedDurationId);
    if (!duration) return 0;

    // Shikara Logic: 800 for 1hr (base), +100 per extra pax > 4
    const baseRate = activity.basePrice; // 800
    let price = baseRate * duration.multiplier;

    if (peopleCount > 4) {
        const extraPeople = peopleCount - 4;
        price += extraPeople * 100 * duration.multiplier;
    }

    return Math.round(price);
}

function calculateSpeedboatPrice({ activity, selectedDurationId, peopleCount }: PricingParams): number {
    if (!selectedDurationId || !activity.durations) return 0;

    const duration = activity.durations.find(d => d.id === selectedDurationId);
    if (!duration) return 0;

    let price = 0;
    const pax = peopleCount;

    if (selectedDurationId === '10min') {
        // 10 minutes: 1-3 pax 900, above 3 pax 300 extra per person
        price = 900;
        if (pax > 3) {
            price += (pax - 3) * 300;
        }
    } else if (selectedDurationId === '30min') {
        // 30 minutes: 1-4 pax 2500, above 4 pax 300 extra per person
        price = 2500;
        if (pax > 4) {
            price += (pax - 4) * 300;
        }
    } else if (selectedDurationId === '1hr') {
        // 1 Hour: 1-4 pax 5000, above 4 pax 200 extra per person
        price = 5000;
        if (pax > 4) {
            price += (pax - 4) * 200;
        }
    } else {
        // Fallback
        price = Math.round(activity.basePrice * duration.multiplier);
    }

    return price;
}

function calculateKayakPrice({ activity, selectedDurationId, peopleCount }: PricingParams): number {
    if (!selectedDurationId || !activity.durations) return 0;

    const duration = activity.durations.find(d => d.id === selectedDurationId);
    if (!duration) return 0;

    // Kayak is usually PER PERSON
    const perPersonPrice = activity.basePrice * duration.multiplier;
    return Math.round(perPersonPrice * peopleCount);
}

function calculateDefaultPrice({ activity, selectedDurationId, peopleCount }: PricingParams): number {
    // Default to per person if time based, or flat if not specified
    if (activity.type === 'time-based' && activity.durations && selectedDurationId) {
        const duration = activity.durations.find(d => d.id === selectedDurationId);
        if (duration) {
            return Math.round(activity.basePrice * duration.multiplier * peopleCount);
        }
    }
    return activity.basePrice;
}

export function getAddonPrice(addon: Activity): number {
    let price = addon.basePrice;
    if (addon.type === 'houseboat' && addon.variants) {
        price = addon.variants[0].price; // Base variant price
    } else if (addon.type === 'time-based' && addon.durations) {
        price = addon.basePrice * addon.durations[0].multiplier; // Base duration price
    }
    return price;
}
