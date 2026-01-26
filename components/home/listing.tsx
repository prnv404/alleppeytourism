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
        title: "Luxury Houseboat",
        description: "Experience the Venice of the East in a premium floating palace. Overnight stays with all meals included.",
        image: "/images/hero-1.jpg",
        price: "₹8,500",
        unit: "/ night",
        rating: 4.8,
        reviews: 124,
        features: ["AC Bedrooms", "All Meals", "Private Deck"],
        icon: Ship,
        color: "text-emerald-500",
        href: "/houseboats",
        highlights: ["✨ 20% Off Today", "🍽️ Breakfast + Lunch", "🌅 Sunset Cruise", "👨‍✈️ Private Captain"]
    },
    {
        id: "shikara",
        title: "Shikara Ride",
        description: "Drift through narrow canals and witness village life up close. Perfect for couples and small families.",
        image: "/images/hero-2.jpg",
        price: "₹800",
        unit: "/ hour",
        rating: 4.9,
        reviews: 85,
        features: ["Open Deck", "Guided Tour", "Sunset View"],
        icon: Anchor,
        color: "text-orange-500",
        href: "/shikara",
        highlights: ["💑 Couple Special", "📸 Photo Stops", "🛶 Village Tour", "🕒 Flexible Timings"]
    },
    {
        id: "kayak",
        title: "Kayaking Adventure",
        description: "Paddle your way through the serene backwaters. Get close to nature in the most eco-friendly way.",
        image: "/images/hero-3.jpg",
        price: "₹500",
        unit: "/ person",
        rating: 4.7,
        reviews: 42,
        features: ["Training", "Safety Gear", "Morning/Evening"],
        icon: Users,
        color: "text-blue-500",
        href: "/kayak",
        highlights: ["🚣 Beginner Friendly", "🌅 Sunrise Special", "🌿 Eco Tour", "🥤 Refreshments"]
    },
    {
        id: "speedboat",
        title: "Speed Boat",
        description: "Feel the thrill of speed on the vast Vembanad Lake. Experience the rush of the waves.",
        image: "/images/hero-1.jpg",
        price: "₹1,500",
        unit: "/ trip",
        rating: 4.6,
        reviews: 38,
        features: ["High Speed", "Life Jackets", "Lake Round"],
        icon: Zap,
        color: "text-red-500",
        href: "/speedboat",
        highlights: ["⚡ Adrenaline Rush", "🌊 Lake Crossing", "👷 Safety First", "👨‍👩‍👧‍👦 Group Fun"]
    }
];

export function BookingListings() {
    const [highlightIndex, setHighlightIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightIndex((prev) => (prev + 1) % 4); // Assuming 4 highlights max for simplicity
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                        Curated Alleppey Experiences
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bookings.map((item) => (
                        <div key={item.id} className="block group h-full">
                            <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl h-full flex flex-col group-hover:-translate-y-1 overflow-hidden">
                                {/* Link wrapper for top part only to keep button distinct if needed, or wrap whole card. 
                                    Request implies button on right, text on left. Often clearer if button is the primary action.
                                    We'll make the whole card clickable except maybe the footer? 
                                    Or just wrap the whole thing in Link but style the button visually.
                                */}
                                <Link href={item.href} className="contents">
                                    {/* Image Section - Round top corners are handled by card rounded-3xl + overflow-hidden */}
                                    <div className="relative h-48 md:h-72 w-full overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                                        {/* Rating Badge */}
                                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm z-10">
                                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                            <span className="text-sm font-bold text-gray-900">{item.rating}</span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <CardContent className="pt-4 px-4 md:px-5 flex-grow flex flex-col">
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className={`p-1.5 rounded-lg bg-gray-50/80 w-fit ${item.color}`}>
                                                    <item.icon className="w-4 h-4" />
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-base md:text-lg font-bold text-gray-900 leading-none">{item.price}</p>
                                                    <p className="text-[10px] text-gray-500 font-medium">{item.unit}</p>
                                                </div>
                                            </div>

                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Feature Pills */}
                                        <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
                                            {item.features.map((feature, idx) => (
                                                <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-100">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Footer */}
                                        <div className="border-t border-gray-100 pt-3 mt-1 flex items-center justify-between h-10">
                                            {/* Left: Text Motion Carousel */}
                                            <div className="flex-1 relative h-full overflow-hidden flex items-center">
                                                <AnimatePresence mode="wait">
                                                    <motion.p
                                                        key={highlightIndex}
                                                        initial={{ y: 15, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        exit={{ y: -15, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-[10px] md:text-xs font-medium text-emerald-600 absolute w-full truncate pr-2"
                                                    >
                                                        {item.highlights[highlightIndex % item.highlights.length]}
                                                    </motion.p>
                                                </AnimatePresence>
                                            </div>

                                            {/* Right: Book Button */}
                                            <Button className="rounded-full bg-black hover:bg-emerald-600 text-white transition-all shadow-sm hover:shadow-md px-4 h-8 text-xs font-semibold group-hover:shadow-emerald-500/20">
                                                Book
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Link>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
