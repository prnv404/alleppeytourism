"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { activities } from "@/lib/packages-data";
import {
    Clock,
    Users,
    Star,
    Check,
    ArrowRight,
    MapPin,
    Shield,
    Zap,
    Gauge
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SpeedboatClientPage() {
    const speedboatActivity = activities.find((a) => a.id === "speedboat");

    if (!speedboatActivity) return <div>Activity not found</div>;

    return (
        <div className="bg-white min-h-screen font-sans text-gray-900">
            <Navbar />

            {/* Hero Section - Matching Home Page Style */}
            <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="space-y-4 mb-8">
                    <span className="text-rose-600 font-bold tracking-widest text-xs uppercase">
                        Thrill & Adventure
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
                        Speed Boat Rides in <br className="hidden md:block" />
                        <span className="text-gray-400">Alleppey Backwaters</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl font-medium leading-relaxed">
                        For those who want to cover more distance in less time. Feel the wind in your hair as you zip across the vast Vembanad Lake.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                            <Gauge className="w-4 h-4 text-rose-600" /> High Speed
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                            <Users className="w-4 h-4 text-rose-600" /> Max 4-6 Pax
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                            <Star className="w-4 h-4 text-rose-600" /> 4.8 Rating
                        </div>
                    </div>
                </div>

                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-gray-100">
                    <Image
                        src="/images/hero-1.jpg"
                        alt="Speedboat Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Experience Overview */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Explore the Lake Fast</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Speed boats are perfect if you are short on time but want to see the vast expanse of the backwaters. You can reach Pathiramanal Island and other distant spots quickly.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            We use modern boats with powerful engines and experienced captains to ensure both thrill and safety.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Cover vast distances in short time",
                                "Visit Pathiramanal Island & Kumarakom side",
                                "Life jackets mandatory for all ages",
                                "Thrilling experience for adventure lovers"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-rose-600" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mt-12">
                            <Image src="/images/hero-1.jpg" alt="Detail 1" fill className="object-cover" />
                        </div>
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
                            <Image src="/images/hero-2.jpg" alt="Detail 2" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Packages */}
            <section className="py-16 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <span className="text-rose-600 font-bold tracking-widest text-xs uppercase">Packages</span>
                        <h2 className="text-3xl font-bold mt-2">Speed Boat Rates</h2>
                        <p className="text-gray-500 mt-2">Pricing is per boat. Includes driver and fuel.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                        {speedboatActivity.durations?.map((duration) => {
                            const price = Math.round(speedboatActivity.basePrice * duration.multiplier);
                            const isPopular = duration.id === 'round';

                            return (
                                <div
                                    key={duration.id}
                                    className={`bg-white p-6 rounded-2xl border transition-all hover:shadow-lg ${isPopular ? 'border-rose-500 ring-1 ring-rose-500' : 'border-gray-200'}`}
                                >
                                    {isPopular && (
                                        <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-4">
                                            Recommended
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{duration.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-3xl font-bold">₹{price}</span>
                                        <span className="text-gray-500 text-sm">/ boat</span>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Zap className="w-4 h-4" /> Full Throttle
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Shield className="w-4 h-4" /> Safety Gear Included
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Clock className="w-4 h-4" /> Quick & Fun
                                        </div>
                                    </div>

                                    <Button asChild className={`w-full h-12 rounded-xl font-semibold ${isPopular ? 'bg-rose-600 hover:bg-rose-700' : 'bg-gray-900 hover:bg-black'} text-white`}>
                                        <Link href={`/book/${speedboatActivity.id}?duration=${duration.id}`}>
                                            Book Now
                                        </Link>
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Location/Info */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-rose-400" />
                        </div>
                        <h2 className="text-3xl font-bold">Speed Boat Jetty</h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Located near the main DTPC boat jetty. It's the central hub for all boat services in Alleppey.
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div>
                                <span className="block text-sm text-rose-400 font-bold uppercase tracking-wider mb-1">Open</span>
                                <span className="block text-xl font-semibold">09:00 AM</span>
                            </div>
                            <div>
                                <span className="block text-sm text-rose-400 font-bold uppercase tracking-wider mb-1">Close</span>
                                <span className="block text-xl font-semibold">06:00 PM</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full aspect-video rounded-2xl overflow-hidden bg-gray-800 relative">
                        <Image src="/images/hero-1.jpg" alt="Location" fill className="object-cover opacity-60 hover:opacity-80 transition-all duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Button variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white hover:text-black">
                                Get Directions
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
