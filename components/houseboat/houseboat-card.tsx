'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { ActivityVariant } from '@/types';
import { cn } from '@/lib/utils';

interface HouseboatCardProps {
    boat: ActivityVariant & { parentImage: string; parentId: string };
}

export function HouseboatCard({ boat }: HouseboatCardProps) {
    // Determine text based on boat name/type
    const isShared = boat.name.toLowerCase().includes('shared');
    const typeText = isShared ? 'Shared' : 'Private';

    // Clean up name for title (remove "Houseboat in Alleppey" etc if desired, or keep as is)
    // The screenshot shows short names like "Royal Waves", "Vembanad Queen". 
    // Our data has long names like "Deluxe Shared Houseboat in Alleppey".
    // We'll try to simplify the display name or just use the full name. 
    // For now, let's use the full name but clamp it if needed.

    // Fake data for visual matching since backend doesn't provide these yet
    const originalPrice = Math.round(boat.price * 1.25);
    const discount = Math.round(((originalPrice - boat.price) / originalPrice) * 100);
    const rating = 4.5 + (Number(boat.id.length) % 5) / 10; // Deterministic fake rating

    // Badge logic
    const isPremium = boat.name.toLowerCase().includes('premium');
    const isLuxury = boat.name.toLowerCase().includes('luxury');
    const badgeText = isLuxury ? 'LUXURY' : isPremium ? 'PREMIUM' : 'DELUXE';

    return (
        <Link href={`/book/houseboat/${boat.id}`} className="group flex flex-col gap-3 cursor-pointer">
            {/* Image Container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                <Image
                    src={boat.parentImage}
                    alt={boat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Heart Icon */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-transform active:scale-95 hover:bg-white shadow-sm z-10">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 hover:fill-red-500 transition-colors" />
                </button>

                {/* Badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                        {badgeText}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
                {/* Title & Rating */}
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {boat.name.replace(' Houseboat in Alleppey', '').replace(' Houseboat', '')}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0 bg-yellow-50 px-1.5 py-0.5 rounded-md border border-yellow-100">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-gray-700">{rating.toFixed(1)}</span>
                    </div>
                </div>

                {/* Subtitle */}
                <div className="text-xs font-medium text-gray-500">
                    {typeText} • {badgeText.charAt(0) + badgeText.slice(1).toLowerCase()}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {(boat.description || "Experience the serene beauty of Alleppey's backwaters.").replace('Looking for a ', 'Enjoy a ').substring(0, 100)}...
                </p>

                {/* Price Block */}
                <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-black text-lg text-emerald-600">₹{boat.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 line-through decoration-gray-400">₹{originalPrice.toLocaleString()}</span>
                    <span className="text-xs font-bold text-orange-500">({discount}% OFF)</span>
                </div>


            </div>
        </Link>
    );
}
