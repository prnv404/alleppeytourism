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
        title: 'Shared Deluxe Houseboat Alleppey | Budget Backwater Stay',
        description: 'Shared Houseboat Alleppey starts ₹5,499. Private AC room with attached bath & all meals included. Best choice for budget couples & backpackers',
    },
    'shared-premium': {
        title: 'Premium Shared Houseboat Alleppey | 24Hr AC & All Meals',
        description: 'Book Premium Shared Houseboat Alleppey (₹7,499). Enjoy Full-time AC bedroom, premium interiors & gourmet meals. Top luxury choice for couples',
    },
    'private-deluxe': {
        title: 'Private Deluxe Houseboat Alleppey | Exclusive Group Boat',
        description: 'Private Deluxe Houseboat Alleppey from ₹8,500. Exclusive boat for your group with personal chef & AC bedroom. Perfect for families & friends',
    },
    'private-premium': {
        title: 'Private Premium Houseboat Alleppey | Glass-Covered Luxury',
        description: 'Book Private Premium Houseboat Alleppey from ₹15,999. Glass-covered living area, 24hr AC, premium crew. Perfect for honeymoons & special occasions.',
    },
    'private-luxury': {
        title: 'Luxury Private Houseboat Alleppey | 5-Star Experience',
        description: 'Book Luxury Houseboat Alleppey (₹21,999). Full glass-enclosed AC living area, butler service & premium cuisine. The ultimate 5-star experience',
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
