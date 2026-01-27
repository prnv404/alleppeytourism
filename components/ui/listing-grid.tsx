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
}

export function ListingGrid({ items, className }: ListingGridProps) {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 ${className || ""}`}>
            {items.map((item, index) => {
                // If rating is not provided, generate a fake plausible one or hide
                const rating = item.rating || 4.8 + (index * 0.05);
                const isGuestFavorite = item.isGuestFavorite ?? (index === 0 || index === 2);

                return (
                    <Link href={item.href} key={item.id} className="group block cursor-pointer">
                        {/* Image Carousel Wrapper */}
                        <div className="relative aspect-[20/19] bg-gray-200 rounded-xl overflow-hidden mb-3">
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
