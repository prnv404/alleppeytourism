/**
 * Site Configuration
 * Central place for all site-wide settings
 */

export const siteConfig = {
    name: 'Alleppey Tourism',
    url: 'https://www.alleppeytourism.in',
    description: 'Book Deluxe to Luxury Houseboats in Alleppey, Shikara rides, Kayaking & Speed Boat adventures.',

    // Contact
    phone: '+91-XXXXXXXXXX',
    whatsapp: '+91XXXXXXXXXX',
    email: 'info@alleppeytourism.in',

    // Social
    social: {
        instagram: '',
        facebook: '',
        youtube: '',
    },

    // Location
    location: {
        address: 'Finishing Point Road, Alappuzha, Kerala',
        googleMaps: '',
    },

    // Analytics
    gtmId: 'G-YCEJZLEGE7',
} as const;

/**
 * SEO Defaults
 * Used across all pages
 */
export const seoConfig = {
    titleTemplate: '%s',
    defaultTitle: 'Alleppey Houseboat Booking | Shikara, Kayak & Speed Boat',
    defaultDescription: 'Plan your complete trip. Book Deluxe to Luxury Alleppey Houseboats, Shikara rides, Kayaking, and Speed Boat adventures.',
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'Alleppey Tourism',
    },
    twitter: {
        cardType: 'summary_large_image',
    },
} as const;

/**
 * Navigation Links
 */
export const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Houseboats', href: '/houseboats' },
    { label: 'Shikara', href: '/shikara' },
    { label: 'Kayak', href: '/kayak' },
    { label: 'Speedboat', href: '/speedboat' },
] as const;

/**
 * Routes
 */
export const routes = {
    home: '/',
    houseboats: '/houseboats',
    shikara: '/shikara',
    kayak: '/kayak',
    speedboat: '/speedboat',
    book: (activity: string, variant?: string) =>
        variant ? `/book/${activity}/${variant}` : `/book/${activity}`,
    privacyPolicy: '/privacy-policy',
    termsAndConditions: '/terms-and-conditions',
} as const;
