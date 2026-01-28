"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Activity } from "@/lib/packages-data";

interface ActivityHeroProps {
    activity: Activity;
}

export function ActivityHero({ activity }: ActivityHeroProps) {
    const [imageIndex, setImageIndex] = useState(0);

    return (
        <div className="relative w-full h-[50vh] md:h-[600px] md:rounded-[1rem] overflow-hidden group shadow-2xl shadow-gray-200/50">
            {/* Images Slider */}
            <div className="absolute inset-0 flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${imageIndex * 100}%)` }}>
                {[activity.image, "/images/hero-1.jpg", "/images/hero-2.jpg", "/images/hero-3.jpg"].map((img, idx) => (
                    <div key={idx} className="relative w-full h-full flex-shrink-0">
                        <Image
                            src={img}
                            alt={`${activity.name} ${idx + 1}`}
                            fill
                            className="object-cover"
                            priority={idx === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows (Desktop) */}
            <div className="absolute inset-0 hidden md:flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.preventDefault(); setImageIndex(prev => prev === 0 ? 3 : prev - 1); }}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-black flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); setImageIndex(prev => prev === 3 ? 0 : prev + 1); }}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-black flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg rotate-180"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            </div>

            {/* Image Dots Indicators */}
            <div className="absolute bottom-24 md:bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
                {[0, 1, 2, 3].map(idx => (
                    <button
                        key={idx}
                        onClick={() => setImageIndex(idx)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all shadow-sm",
                            imageIndex === idx ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                        )}
                    />
                ))}
            </div>

            {/* Desktop Back Button */}
            <Link href="/houseboats" className="absolute top-8 left-8 z-30 hidden md:flex items-center gap-2 bg-white/90 hover:bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:scale-105 active:scale-95 group">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Explorations
            </Link>

            {/* Mobile Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center gap-2 text-amber-300 mb-1">
                        <Star className="w-3 h-3 fill-amber-300" />
                        <span className="text-xs font-bold">4.9 (124 reviews)</span>
                    </div>
                    <h1 className="text-3xl font-black text-white leading-[0.9] tracking-tight mb-1">
                        {activity.name}
                    </h1>
                    <div className="flex items-center gap-1 text-white/90 text-xs font-medium">
                        <MapPin className="w-3 h-3" />
                        <span>Alleppey, Kerala</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
