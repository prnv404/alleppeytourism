"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Zap, Ship, Anchor, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bookings = [
    {
        id: "houseboat",
        title: "Houseboat",
        description: "Experience the Venice of the East in a floating palace.",
        image: "/images/hero-1.jpg",
        price: "₹4,999",
        unit: "/ night",
        rating: 4.8,
        reviews: 124,
        features: ["AC Bedrooms", "All Meals", "Private Deck"],
        icon: Ship,
        color: "text-emerald-600 bg-emerald-50",
        badgeColor: "bg-emerald-500",
        href: "/houseboats",
        highlights: ["✨ 20% Off Today", "🍽️ All Meals Inc.", "🌅 Sunset Cruise"]
    },
    {
        id: "shikara",
        title: "Shikara Ride",
        description: "Drift through narrow canals and witness village life up close.",
        image: "/images/hero-2.jpg",
        price: "₹800",
        unit: "/ hour",
        rating: 4.9,
        reviews: 85,
        features: ["Open Deck", "Guided Tour", "Sunset"],
        icon: Anchor,
        color: "text-orange-600 bg-orange-50",
        badgeColor: "bg-orange-500",
        href: "/shikara",
        highlights: ["💑 Couple Special", "📸 Photo Stops", "🛶 Village Tour"]
    },
    {
        id: "kayak",
        title: "Kayaking",
        description: "Paddle your way through the serene backwaters nature tour.",
        image: "/images/hero-3.jpg",
        price: "₹500",
        unit: "/ person",
        rating: 4.7,
        reviews: 42,
        features: ["Training", "Safety Gear", "Eco Friendly"],
        icon: Users,
        color: "text-blue-600 bg-blue-50",
        badgeColor: "bg-blue-500",
        href: "/kayak",
        highlights: ["🚣 Beginner Friendly", "🌅 Sunrise Special", "🌿 Eco Tour"]
    },
    {
        id: "speedboat",
        title: "Speed Boat",
        description: "Feel the thrill of speed on the vast Vembanad Lake.",
        image: "/images/hero-1.jpg",
        price: "₹1,500",
        unit: "/ trip",
        rating: 4.6,
        reviews: 38,
        features: ["High Speed", "Life Jackets", "Lake Round"],
        icon: Zap,
        color: "text-red-600 bg-red-50",
        badgeColor: "bg-red-500",
        href: "/speedboat",
        highlights: ["⚡ Adrenaline Rush", "🌊 Lake Crossing", "👷 Safety First"]
    }
];

export function BookingListings() {
    const [highlightIndex, setHighlightIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightIndex((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
                    <div className="space-y-2">
                        <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase">Unforgettable Journeys</span>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">
                            FEATURED EXPERIENCES
                        </h2>
                    </div>
                    <Button variant="outline" className="hidden md:flex rounded-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all font-medium px-6">
                        Explore All <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>

                {/* Wireless scrolling container for mobile, Grid for desktop */}
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {bookings.map((item) => (
                        <div key={item.id} className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center md:snap-align-none h-full">
                            <Link href={item.href} className="group block h-full relative">
                                {/* Immersive Card Container */}
                                <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden rounded-[1rem] bg-gray-200 isolate">
                                    {/* Full Background Image */}
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-out"
                                    />

                                    {/* Gradient Overlays for Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

                                    {/* Top Floating Elements */}
                                    <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
                                        <span className="bg-white/95 backdrop-blur-md text-gray-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                                            {item.title.split(' ')[0]}
                                        </span>
                                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full text-white text-xs font-bold border border-white/10">
                                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                            {item.rating}
                                        </div>
                                    </div>

                                    {/* Bottom Content Area */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 flex flex-col justify-end">

                                        {/* Main Text */}
                                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-none tracking-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-white/80 text-sm font-medium line-clamp-2 md:line-clamp-none mb-4 leading-relaxed mix-blend-plus-lighter">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Features Row - Hidden on mobile initial, visible on hover/desktop preference? 
                                            Actually let's keep it visible but minimal 
                                        */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {item.features.slice(0, 2).map((feature, idx) => (
                                                <span key={idx} className="text-[10px] font-bold text-white/90 uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20">
                                                    {feature}
                                                </span>
                                            ))}
                                            {item.features.length > 2 && (
                                                <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20">
                                                    +{item.features.length - 2} More
                                                </span>
                                            )}
                                        </div>

                                        {/* Interactive Footer */}
                                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/20">
                                            <div>
                                                <div className="flex items-baseline gap-1 text-white">
                                                    <span className="text-lg font-bold">{item.price}</span>
                                                    <span className="text-xs text-white/70 font-medium uppercase">{item.unit}</span>
                                                </div>
                                                {/* Animated Highlight */}
                                                <div className="h-4 overflow-hidden mt-1">
                                                    <AnimatePresence mode="wait">
                                                        <motion.p
                                                            key={highlightIndex}
                                                            initial={{ y: 20 }}
                                                            animate={{ y: 0 }}
                                                            exit={{ y: -20 }}
                                                            className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider truncate"
                                                        >
                                                            {item.highlights[highlightIndex % item.highlights.length]}
                                                        </motion.p>
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            <Button size="icon" className="h-12 w-12 rounded-full bg-white text-black hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-xl border-none">
                                                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

                    {/* View All - Styles matched to immersive card size
                    <div className="min-w-[200px] snap-center md:hidden flex items-center justify-center p-4">
                        <Link href="/all-activities" className="group relative w-full h-full aspect-[3/4] rounded-[2rem] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                <ArrowRight className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold tracking-widest uppercase text-gray-900">View All</span>
                        </Link>
                    </div> */}
                </div>
            </div>
        </section>
    );
}