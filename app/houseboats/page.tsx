
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { activities } from "@/lib/packages-data";
import { Star, Heart, SlidersHorizontal, Map, ChevronDown } from "lucide-react";
import { ListingGrid, ListingItem } from "@/components/ui/listing-grid";
import { cn } from "@/lib/utils";

export default function HouseboatsPage() {
    // Filter for houseboats
    // Filter for houseboats (Private & Shared)
    const houseboatActivities = activities.filter(a => a.type === "houseboat");

    // Flatten all variants from all houseboat activities
    const items: ListingItem[] = houseboatActivities.flatMap(activity => {
        return (activity.variants || []).map(v => ({
            id: v.id,
            title: v.name,
            description: v.description || activity.description,
            price: v.price,
            priceUnit: "night",
            image: activity.image,
            href: `/book/${activity.id}?variant=${v.id}`,
        }));
    });

    const sharedItems = items.filter(i => i.title.toLowerCase().includes("shared"));
    const privateItems = items.filter(i => !i.title.toLowerCase().includes("shared"));

    // Scroll handling is removed to keep Navbar always visible

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            {/* Top Spacing for Fixed Navbar */}
            <div className="h-[25px] md:h-[60px]" />

            {/* Main Listings Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero / Promo Banner (Optional, keeping it subtle) */}
                <div className="mb-10 relative rounded-2xl overflow-hidden aspect-[21/6] md:aspect-[32/9] hidden md:block">
                    <Image
                        src="/images/hero-3.jpg"
                        alt="Alleppey Backwaters"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-10 text-white">
                        <h2 className="text-3xl font-bold mb-2">Guest Favorites</h2>
                        <p className="opacity-90 max-w-md text-lg">The most loved houseboats with top ratings from travelers worldwide.</p>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 mb-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 whitespace-nowrap">Stays in Alleppey</h1>
                            <span className="hidden md:block text-gray-300">|</span>
                            <span className="text-sm text-gray-500 font-medium whitespace-nowrap">{items.length}+ houseboats available</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-black rounded-full text-sm font-medium transition-all">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>
                            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-black rounded-full text-sm font-medium transition-all">
                                <span className="text-xs font-bold bg-black text-white px-1.5 py-0.5 rounded-full">3</span>
                                Guests
                            </button>
                            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-black rounded-full text-sm font-medium transition-all">
                                Price
                                <ChevronDown className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Shared Houseboats Section */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs uppercase tracking-wide">Budget Friendly</span>
                        Shared Houseboats
                    </h2>
                    <ListingGrid items={sharedItems} />
                </div>

                {/* Private Houseboats Section */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="bg-black text-white px-3 py-1 rounded-full text-xs uppercase tracking-wide">Premium & Private</span>
                        Private Houseboats
                    </h2>
                    <ListingGrid items={privateItems} />
                </div>
            </main>

            <Footer />
        </div>
    );
}

