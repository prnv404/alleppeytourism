import { Metadata } from 'next';
import { PACKAGES } from '@/lib/packages-data';
import { ActivityDetail } from '@/components/booking/activity-detail';
import { Navbar } from '@/components/home/navbar';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ variant: string }>;
}

const houseboatActivity = PACKAGES['houseboat'];
const variants = houseboatActivity?.variants || [];

export async function generateStaticParams() {
    return variants.map(variant => ({
        variant: variant.id,
    }));
}

// SEO metadata for each variant
const variantMeta: Record<string, { title: string; description: string }> = {
    'shared-standard': {
        title: 'Shared Deluxe Houseboat in Alleppey | Budget Backwater Stay',
        description: 'Book a Shared Deluxe Houseboat in Alleppey from ₹5,499. Private bedroom, all meals included. Perfect for budget couples & backpackers. Day cruise & overnight packages.',
    },
    'shared-premium': {
        title: 'Premium Shared Houseboat in Alleppey | 24Hr AC & Premium Dining',
        description: 'Book a Premium Shared Houseboat in Alleppey from ₹7,499. Full-time AC, premium interiors & gourmet meals. Best value luxury experience on Kerala backwaters.',
    },
    'private-deluxe': {
        title: 'Private Deluxe Houseboat in Alleppey | Exclusive Boat for Groups',
        description: 'Book a Private Deluxe Houseboat in Alleppey from ₹8,500. Exclusive boat for your group, 1-3 bedrooms, personal chef. Overnight & day cruise packages available.',
    },
    'private-premium': {
        title: 'Private Premium Houseboat in Alleppey | Glass-Covered Luxury',
        description: 'Book a Private Premium Houseboat in Alleppey from ₹15,999. Glass-covered living area, 24hr AC, premium crew. Perfect for honeymoons & special occasions.',
    },
    'private-luxury': {
        title: 'Private Luxury Houseboat in Alleppey | 5-Star Backwater Experience',
        description: 'Book the most exclusive Luxury Houseboat in Alleppey from ₹21,999. Full glass design, butler service, chef-special cuisine. The ultimate Kerala backwater experience.',
    },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { variant } = await params;
    const variantData = variants.find(v => v.id === variant);

    if (!variantData) {
        return {
            title: 'Houseboat Not Found | Alleppey Tourism',
        };
    }

    const meta = variantMeta[variant] || {
        title: `${variantData.name} | Alleppey Tourism`,
        description: variantData.description || houseboatActivity.description,
    };

    return {
        title: meta.title,
        description: meta.description,
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: meta.title,
            description: meta.description,
            type: 'website',
            images: ['/images/hero-1.jpg'],
        },
    };
}

export default async function HouseboatVariantPage({ params }: PageProps) {
    const { variant } = await params;
    const variantData = variants.find(v => v.id === variant);

    if (!variantData || !houseboatActivity) {
        notFound();
    }

    return (
        <>
            <Navbar className="hidden md:block" />
            <ActivityDetail activity={houseboatActivity} initialVariant={variant} />
        </>
    );
}
