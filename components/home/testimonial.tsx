"use client";

import { Star, Quote, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";

const testimonials = [
    {
        id: 1,
        name: "Sarah & Tom",
        location: "London, UK",
        tripImage: "/images/hero-1.jpg",
        userImage: "/images/hero-1.jpg",
        rating: 5,
        review: "Waking up to the sunrise over the backwaters was pure magic. The houseboat was luxurious and the food was incredible.",
        badge: "Luxury Houseboat",
        date: "Dec 2025"
    },
    {
        id: 2,
        name: "The Mehta Family",
        location: "Mumbai",
        tripImage: "/images/hero-2.jpg",
        userImage: "/images/hero-2.jpg",
        rating: 5,
        review: "Kids loved the shikara ride! The captain showed us rare birds and village life we would have missed otherwise.",
        badge: "Shikara Ride",
        date: "Jan 2026"
    },
    {
        id: 3,
        name: "Elena's Group",
        location: "Spain",
        tripImage: "/images/hero-3.jpg",
        userImage: "/images/hero-3.jpg",
        rating: 5,
        review: "Kayaking is a must-do! It felt so authentic. The guide knew every hidden canal. We felt completely safe.",
        badge: "Kayak Adventure",
        date: "Nov 2025"
    },
    {
        id: 4,
        name: "David Chen",
        location: "Singapore",
        tripImage: "/images/hero-1.jpg",
        userImage: "/images/hero-1.jpg",
        rating: 4,
        review: "Excellent service. The overnight stay was comfortable with AC. A fantastic way to disconnect from the world.",
        badge: "Premium Cruise",
        date: "Jan 2026"
    },
    {
        id: 5,
        name: "James & Alisha",
        location: "Dubai",
        tripImage: "/images/hero-2.jpg",
        userImage: "/images/hero-2.jpg",
        rating: 5,
        review: "Sunset canoe ride was the most romantic part of our trip. Just silence, water, and beautiful colors.",
        badge: "Canoe Trip",
        date: "Dec 2025"
    }
];

export function Testimonials() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-12 md:py-16 bg-gray-50 overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                            Stories from <span className="text-emerald-600">Paradise</span>
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base">
                            Join thousands of happy travelers who have explored Alleppey with us.
                        </p>
                    </div>

                    {/* Nav Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll('left')}
                            className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                            aria-label="Previous"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                            aria-label="Next"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Cards Container - Horizontal Scroll */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative -mx-4 px-4 md:mx-0 md:px-0"
                >
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {testimonials.map((item) => (
                            <div
                                key={item.id}
                                className="min-w-[280px] md:min-w-[340px] snap-start"
                            >
                                <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col group border border-gray-100">

                                    {/* Trip Image Header - Compact */}
                                    <div className="relative h-36 w-full overflow-hidden">
                                        <Image
                                            src={item.tripImage}
                                            alt={item.badge}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                                        {/* Badge on Image */}
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-white/95 backdrop-blur-md text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                                                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                                {item.badge}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-3 left-3 text-white flex items-center gap-1 text-[10px] font-medium">
                                            <MapPin className="w-3 h-3" />
                                            {item.location}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-grow relative">
                                        <Quote className="absolute top-4 right-5 w-6 h-6 text-emerald-100 fill-emerald-100/50" />

                                        <div className="flex gap-0.5 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3.5 h-3.5 ${i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                                            ))}
                                        </div>

                                        <p className="text-gray-700 text-sm leading-relaxed mb-4 font-medium line-clamp-3">
                                            "{item.review}"
                                        </p>

                                        {/* User Footer */}
                                        <div className="mt-auto flex items-center gap-2.5 pt-4 border-t border-gray-50">
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                                                <Image
                                                    src={item.userImage}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                                                <p className="text-[10px] text-gray-400">{item.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
