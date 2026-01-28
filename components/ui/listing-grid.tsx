"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart } from "lucide-react";

export interface ListingItem {
    id: string;
    title: string;
    description: string;
    price: number;
    priceUnit: string;
    image: string;
    rating?: number;
    href: string;
    features?: string[];
    isGuestFavorite?: boolean;
}

interface ListingGridProps {
    items: ListingItem[];
    className?: string;
    scrollable?: boolean | "mobile";
}

export function ListingGrid({ items, className, scrollable = false }: ListingGridProps) {
    const isMobileScroll = scrollable === "mobile";
    const isAlwaysScroll = scrollable === true;

    // specific classes for the scrollable behavior
    const scrollContainerClasses = "flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 scroll-pl-4 sm:gap-6 sm:mx-0 sm:px-0 sm:scroll-pl-0";
    const gridContainerClasses = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10";

    // specific classes for items in scroll mode
    const scrollItemClasses = "w-[280px] sm:w-[320px] shrink-0 snap-start";

    let containerClasses = "";
    let itemClasses = "";

    if (isAlwaysScroll) {
        containerClasses = scrollContainerClasses;
        itemClasses = scrollItemClasses;
    } else if (isMobileScroll) {
        // Mobile: Scroll, Desktop: Grid
        containerClasses = `${scrollContainerClasses} md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-x-6 md:gap-y-10 md:overflow-visible md:pb-0`;
        itemClasses = `${scrollItemClasses} md:w-auto md:shrink-0 md:snap-align-none`;
    } else {
        containerClasses = gridContainerClasses;
    }

    return (
        <div className={`${containerClasses} ${className || ""}`}>
            {items.map((item, index) => {
                // If rating is not provided, generate a fake plausible one or hide
                const rating = item.rating || 4.8 + (index * 0.05);
                const isGuestFavorite = item.isGuestFavorite ?? (index === 0 || index === 2);

                return (
                    <Link
                        href={item.href}
                        key={item.id}
                        className={`
                            ${itemClasses}
                            group block cursor-pointer
                        `}
                    >
                        {/* Image Carousel Wrapper */}
                        <div className="relative aspect-square bg-gray-200 rounded-xl overflow-hidden mb-3">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                            />

                            {/* Favorite Button */}
                            <button className="absolute top-3 right-3 p-1.5 hover:scale-110 transition-transform z-10">
                                <Heart className="w-6 h-6 text-white fill-black/40 hover:fill-red-500 hover:text-red-500 transition-colors drop-shadow-md" />
                            </button>

                            {/* Guest Favorite Badge */}
                            {isGuestFavorite && (
                                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full shadow-sm z-10">
                                    <span className="text-xs font-bold text-gray-900">Guest favorite</span>
                                </div>
                            )}

                            {/* Pagination Dots (Visual only) */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-sm" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-sm" />
                            </div>
                        </div>

                        {/* Content Info */}
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="font-semibold text-base text-gray-900 leading-tight truncate">{item.title}</h3>
                                <div className="flex items-center gap-1 shrink-0">
                                    <Star className="w-3.5 h-3.5 fill-black text-black" />
                                    <span className="text-sm font-light text-gray-800">{rating.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="text-sm text-gray-500 leading-snug">
                                <p className="line-clamp-1">{item.description}</p>
                                {/* Optional: Date range or other metadata */}
                                {/* <p>Aug 25 - 30</p> */}
                            </div>

                            <div className="flex items-end gap-1.5 mt-1.5">
                                <span className="font-semibold text-gray-900 text-base">₹{item.price.toLocaleString()}</span>
                                <span className="text-gray-900 font-light text-sm">{item.priceUnit}</span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
