import { MetadataRoute } from 'next';
import { activities, PACKAGES } from '@/lib/packages-data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://alleppeytourism.com';
    const currentDate = new Date().toISOString();

    // Static pages with their priorities and change frequencies
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/houseboats`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/shikara`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/kayak`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/speedboat`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms-and-conditions`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Houseboat variant pages (individual booking pages with clean URLs)
    const houseboatActivity = PACKAGES['houseboat'];
    const houseboatVariantPages: MetadataRoute.Sitemap = houseboatActivity?.variants?.map((variant) => ({
        url: `${baseUrl}/book/houseboat/${variant.id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    })) || [];

    // Time-based activity booking pages
    const timeBasedActivities = activities.filter(a => a.type === 'time-based');
    const activityBookingPages: MetadataRoute.Sitemap = timeBasedActivities.map((activity) => ({
        url: `${baseUrl}/book/${activity.id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...houseboatVariantPages, ...activityBookingPages];
}
