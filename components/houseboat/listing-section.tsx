'use client';

import { ActivityVariant } from '@/types';
import { HouseboatCard } from './houseboat-card';
import { SectionHeader } from './section-header';
import { Button } from '@/components/ui/button';
import { SectionDivider } from '../ui/section-divider';

interface ListingSectionProps {
    id: string;
    title: string;
    subtitle?: string;
    badge?: string;
    sectionTitle?: string;
    boats: (ActivityVariant & { parentImage: string; parentId: string })[];
    viewMode?: 'grid' | 'list';
}

export function ListingSection({ id, title, subtitle, badge, sectionTitle, boats }: ListingSectionProps) {
    return (
        <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 scroll-mt-24">
            <SectionHeader title={title} subtitle={subtitle} badge={badge}>
                <div className="flex gap-2">
                    {/* Placeholder for future specific filters for this section */}
                    <Button variant="outline" size="sm" className="rounded-full hidden md:flex">All</Button>
                    <Button variant="ghost" size="sm" className="rounded-full hidden md:flex text-gray-500">Deluxe</Button>
                    <Button variant="ghost" size="sm" className="rounded-full hidden md:flex text-gray-500">Premium</Button>
                </div>
            </SectionHeader>

            {sectionTitle && (
                <div className="mb-6">
                    <SectionDivider title={sectionTitle} />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {boats.map((boat) => (
                    <HouseboatCard key={boat.id} boat={boat} />
                ))}
            </div>
        </section>
    );
}
