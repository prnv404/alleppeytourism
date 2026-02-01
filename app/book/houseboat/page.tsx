import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Book Alleppey Houseboat | Shared & Private Options',
    description: 'Book the best houseboats in Alleppey. Choose from Shared Deluxe, Premium, Private Deluxe, Premium & Luxury houseboats. All meals included. Best rates guaranteed.',
    robots: {
        index: true,
        follow: true,
    },
};

// Redirect to the most popular option (shared-standard as default)
export default function HouseboatPage() {
    redirect('/book/houseboat/shared-standard');
}
