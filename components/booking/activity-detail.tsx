"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    Share2,
    ShieldCheck,
    Star,
    Check,
    MapPin,
    Info,
    Sparkles,
    Plus,
    Minus
} from "lucide-react";
import { Activity, activities } from "@/lib/packages-data";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    );
}

interface ActivityDetailProps {
    activity: Activity;
}

export function ActivityDetail({ activity }: ActivityDetailProps) {
    const [selectedVariantId, setSelectedVariantId] = useState<string>(
        activity.variants ? activity.variants[0].id : ""
    );
    const [selectedDurationId, setSelectedDurationId] = useState<string>(
        activity.durations ? activity.durations[0].id : ""
    );
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [peopleCount, setPeopleCount] = useState(2);
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    // Calendar Popover State
    const [isMobileCalendarOpen, setIsMobileCalendarOpen] = useState(false);
    const [isDesktopCalendarOpen, setIsDesktopCalendarOpen] = useState(false);

    // Scroll listener for header background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper for selected variant/duration details
    const selectedVariant = activity.variants?.find(v => v.id === selectedVariantId);
    const selectedDuration = activity.durations?.find(d => d.id === selectedDurationId);

    // Is per-person pricing?
    const isPerPerson = activity.id === 'kayak'; // Ideally this should be in the data model

    // Helper to get add-on price
    const getAddonPrice = (addon: Activity) => {
        let price = addon.basePrice;
        if (addon.type === "houseboat" && addon.variants) {
            price = addon.variants[0].price;
        } else if (addon.type === "time-based" && addon.durations) {
            price = addon.basePrice * addon.durations[0].multiplier;
        }
        return price;
    };

    // Calculate Price
    const getPrice = () => {
        let price = 0;

        // Base Activity Price
        let base = 0;
        if (activity.type === "houseboat" && activity.variants) {
            const v = activity.variants.find(v => v.id === selectedVariantId);
            base = v ? v.price : 0;
        } else if (activity.type === "time-based" && activity.durations) {
            const d = activity.durations.find(d => d.id === selectedDurationId);
            base = d ? activity.basePrice * d.multiplier : 0;
        } else {
            base = activity.basePrice;
        }

        if (isPerPerson) {
            price += base * peopleCount;
        } else {
            price += base;
        }

        // Add-ons Price
        selectedAddons.forEach(addonId => {
            const addon = activities.find(a => a.id === addonId);
            if (addon) {
                price += getAddonPrice(addon);
            }
        });

        return price;
    };

    const currentPrice = getPrice();

    const handleWhatsAppClick = () => {
        let message = `Hi Alleppey Tourism! 👋\nI'm interested in booking: *${activity.name}*\n`;

        if (activity.type === "houseboat") {
            const v = activity.variants?.find(x => x.id === selectedVariantId);
            message += `*Type:* ${v?.name}\n`;
        } else {
            const d = activity.durations?.find(x => x.id === selectedDurationId);
            message += `*Duration:* ${d?.name}\n`;
        }

        message += `*Guests:* ${peopleCount}\n`;

        if (selectedAddons.length > 0) {
            message += `\n*Added Extras:*\n`;
            selectedAddons.forEach(addonId => {
                const addon = activities.find(a => a.id === addonId);
                if (addon) message += `+ ${addon.name} (Just Added)\n`;
            });
        }

        if (date) {
            message += `\n*Date:* ${format(date, "PPP")}\n`;
        }

        message += `\n*Total Estimated Price:* ₹${currentPrice.toLocaleString()}\n\nPlease confirm availability.`;
        window.open(`https://wa.me/919567296056?text=${encodeURIComponent(message)}`, '_blank');
    };

    // Filter available add-ons (exclude current activity)
    const availableAddons = activities.filter(a => a.id !== activity.id);

    const toggleAddon = (addonId: string) => {
        setSelectedAddons(prev =>
            prev.includes(addonId)
                ? prev.filter(id => id !== addonId)
                : [...prev, addonId]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24 md:pb-12 font-sans">

            {/* Mobile Header (Floating) */}
            <div className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 transition-all duration-300 md:hidden",
                isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
            )}>
                <Link
                    href="/"
                    className={cn(
                        "p-2 rounded-full backdrop-blur-md transition-colors",
                        isScrolled ? "bg-gray-100 text-gray-900" : "bg-black/20 text-white"
                    )}
                >
                    <ChevronLeft className="w-5 h-5" />
                </Link>

                <div className={cn(
                    "flex items-center gap-2 transition-opacity duration-300",
                    isScrolled ? "opacity-100" : "opacity-0"
                )}>
                    <span className="font-bold text-sm text-gray-900 truncate max-w-[150px]">{activity.name}</span>
                </div>

                <div className={cn(
                    "p-2 rounded-full backdrop-blur-md transition-colors",
                    isScrolled ? "bg-gray-100 text-gray-900" : "bg-black/20 text-white"
                )}>
                    <Share2 className="w-5 h-5" />
                </div>
            </div>

            <main className="max-w-7xl mx-auto md:px-6 md:pt-8 min-h-screen">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column: Visuals & Info */}
                    <div className="flex-1 w-full">

                        {/* Hero Image Section - Reduced Height on Mobile */}
                        <div className="relative w-full h-[40vh] md:h-[600px] md:rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-gray-200/50">
                            <Image
                                src={activity.image}
                                alt={activity.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                priority
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 md:to-transparent" />

                            {/* Desktop Back Button */}
                            <Link href="/" className="absolute top-8 left-8 z-10 hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all border border-white/20">
                                <ChevronLeft className="w-4 h-4" /> Back to Explorations
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

                        {/* Content Container - Overlaps on Mobile */}
                        <div className="relative z-10 -mt-4 md:mt-10 bg-white rounded-t-[1.5rem] md:rounded-none px-5 py-6 md:p-0">
                            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6 md:hidden" />

                            {/* Desktop Title Header */}
                            <div className="hidden md:block mb-10 border-b border-gray-100 pb-8">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase mb-2 block">Premium Experience</span>
                                        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4">{activity.name}</h1>
                                        <div className="flex items-center gap-6 text-gray-500">
                                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                                                <MapPin className="w-4 h-4 text-emerald-600" />
                                                <span className="font-medium text-gray-700">Alleppey Backwaters</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex -space-x-2">
                                                    {[1, 2, 3, 4].map((i) => (
                                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                                                    ))}
                                                </div>
                                                <span className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4">120+ Happy Travelers</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                            <span className="font-bold text-amber-700">4.8 Rating</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 md:space-y-12">
                                {/* Highlights Grid - Compact on Mobile */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                    {activity.features.map((feature, idx) => (
                                        <div key={idx} className="bg-gray-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 flex flex-col items-center text-center gap-2 hover:border-emerald-200 hover:shadow-md transition-all group">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                                            </div>
                                            <span className="text-[10px] md:text-xs font-bold text-gray-900 uppercase tracking-wide leading-tight">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Mobile Selection Area - Moved Up & Compacted */}
                                <div className="md:hidden space-y-6 pt-4 border-t border-gray-100">
                                    {/* Category Select */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">{activity.type === "houseboat" ? "Choose Category" : "Choose Duration"}</h3>
                                        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
                                            {activity.type === "houseboat" ? (
                                                activity.variants?.map(variant => (
                                                    <div
                                                        key={variant.id}
                                                        onClick={() => setSelectedVariantId(variant.id)}
                                                        className={cn(
                                                            "min-w-[240px] snap-center relative p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between",
                                                            selectedVariantId === variant.id
                                                                ? "border-emerald-500 bg-emerald-50/50"
                                                                : "border-gray-100 bg-white"
                                                        )}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="font-bold text-gray-900 text-sm">{variant.name}</h4>
                                                                <p className="text-[10px] text-gray-500 line-clamp-2 mt-0.5">{variant.description}</p>
                                                            </div>
                                                            {selectedVariantId === variant.id && (
                                                                <Check className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded-full p-0.5 shrink-0" />
                                                            )}
                                                        </div>
                                                        <div className="font-bold text-emerald-700 text-sm mt-2">₹{variant.price.toLocaleString()}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                activity.durations?.map(duration => (
                                                    <div
                                                        key={duration.id}
                                                        onClick={() => setSelectedDurationId(duration.id)}
                                                        className={cn(
                                                            "min-w-[120px] snap-center p-3 rounded-xl border-2 transition-all cursor-pointer text-center flex flex-col justify-center",
                                                            selectedDurationId === duration.id
                                                                ? "border-emerald-500 bg-emerald-50/50"
                                                                : "border-gray-100 bg-white"
                                                        )}
                                                    >
                                                        <div className="font-bold text-gray-900 text-sm">{duration.name}</div>
                                                        <div className="text-xs font-semibold text-emerald-600 mt-0.5">
                                                            ₹{(activity.basePrice * duration.multiplier).toLocaleString()}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Guests & Date Row */}
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-gray-900 mb-2">Guests</h3>
                                            <div className="flex items-center justify-between h-12 px-3 rounded-xl border border-gray-200 bg-gray-50">
                                                <button
                                                    onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-100 text-gray-600"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="font-bold text-gray-900">{peopleCount}</span>
                                                <button
                                                    onClick={() => setPeopleCount(peopleCount + 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-100 text-gray-600"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex-[1.5]">
                                            <h3 className="text-sm font-bold text-gray-900 mb-2">Date</h3>
                                            <Popover open={isMobileCalendarOpen} onOpenChange={setIsMobileCalendarOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start h-12 rounded-xl border-gray-200 text-left font-normal bg-gray-50 text-sm px-3",
                                                            !date && "text-gray-500"
                                                        )}
                                                    >
                                                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                        {date ? <span className="font-semibold text-gray-900 truncate">{format(date, "MMM dd")}</span> : <span>Pick date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="center">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={(d) => {
                                                            setDate(d);
                                                            setIsMobileCalendarOpen(false);
                                                        }}
                                                        initialFocus
                                                        className="rounded-lg border shadow-lg"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>

                                    {/* Add-ons Section Mobile */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <Plus className="w-4 h-4 text-emerald-600" />
                                            Adventures Add-ons
                                        </h3>
                                        <div className="grid grid-cols-1 gap-2">
                                            {availableAddons.map(addon => (
                                                <div
                                                    key={addon.id}
                                                    onClick={() => toggleAddon(addon.id)}
                                                    className={cn(
                                                        "flex items-center p-3 rounded-xl border transition-all cursor-pointer",
                                                        selectedAddons.includes(addon.id)
                                                            ? "border-emerald-500 bg-emerald-50/30"
                                                            : "border-gray-100 bg-white hover:border-gray-200"
                                                    )}
                                                >
                                                    <div className="h-10 w-10 relative rounded-lg overflow-hidden shrink-0 bg-gray-200">
                                                        <Image src={addon.image} alt={addon.name} fill className="object-cover" />
                                                    </div>
                                                    <div className="ml-3 flex-1">
                                                        <h4 className="text-sm font-bold text-gray-900">{addon.name}</h4>
                                                        <p className="text-[10px] text-gray-500">Add for ₹{getAddonPrice(addon).toLocaleString()}</p>
                                                    </div>
                                                    <div className={cn(
                                                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                                        selectedAddons.includes(addon.id)
                                                            ? "bg-emerald-500 border-emerald-500 text-white"
                                                            : "border-gray-300 bg-white"
                                                    )}>
                                                        {selectedAddons.includes(addon.id) && <Check className="w-3 h-3" />}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* About Section */}
                                <div className="prose prose-gray max-w-none pt-4 md:pt-0 border-t md:border-none border-gray-100">
                                    <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <Info className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                                        Experience Details
                                    </h3>
                                    <p className="text-sm md:text-lg text-gray-600 leading-relaxed font-medium">
                                        {activity.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Desktop Booking Widget (Sticky) */}
                    <div className="hidden lg:block lg:w-[450px] lg:shrink-0">
                        <div className="sticky top-5 bg-white rounded-[1rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
                            {/* Widget Header */}
                            <div className="bg-[#050505] p-6 text-white flex justify-between items-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-emerald-600/20 blur-xl" />
                                <div className="relative z-10">
                                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">Starting from</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black">₹{currentPrice.toLocaleString()}</span>
                                        <span className="text-sm text-gray-400">/total</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center relative z-10 backdrop-blur-md border border-white/10">
                                    <Sparkles className="w-6 h-6 text-emerald-400" />
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Configuration Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Guests */}
                                    <div className="col-span-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Guests</label>
                                        <div className="flex items-center justify-between p-2 rounded-xl border border-gray-200 hover:border-emerald-500 transition-colors bg-white">
                                            <button
                                                onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="text-lg font-bold text-gray-900">{peopleCount} Adults</span>
                                            <button
                                                onClick={() => setPeopleCount(peopleCount + 1)}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="col-span-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Date</label>
                                        <Popover open={isDesktopCalendarOpen} onOpenChange={setIsDesktopCalendarOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-between h-14 rounded-xl border-gray-200 text-left font-normal hover:bg-gray-50 px-4",
                                                        !date && "text-gray-500"
                                                    )}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                                                        {date ? format(date, "PPP") : "Select Trip Date"}
                                                    </span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={(d) => {
                                                        setDate(d);
                                                        setIsDesktopCalendarOpen(false);
                                                    }}
                                                    initialFocus
                                                    className="rounded-lg border shadow-lg"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Variant/Duration Selector */}
                                    <div className="col-span-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                {activity.type === "houseboat" ? "Boat Type" : "Duration"}
                                            </label>
                                        </div>
                                        <div className="space-y-2">
                                            {activity.type === "houseboat" ? (
                                                activity.variants?.map(variant => (
                                                    <div
                                                        key={variant.id}
                                                        onClick={() => setSelectedVariantId(variant.id)}
                                                        className={cn(
                                                            "group flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-gray-50 transition-all",
                                                            selectedVariantId === variant.id
                                                                ? "border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500"
                                                                : "border-gray-200"
                                                        )}
                                                    >
                                                        <div>
                                                            <div className="font-bold text-gray-900 text-sm">{variant.name}</div>
                                                            <div className="text-[10px] text-gray-500">{variant.description}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-bold text-emerald-700 text-sm">₹{variant.price.toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="grid grid-cols-2 gap-2">
                                                    {activity.durations?.map(duration => (
                                                        <div
                                                            key={duration.id}
                                                            onClick={() => setSelectedDurationId(duration.id)}
                                                            className={cn(
                                                                "p-3 rounded-xl border cursor-pointer text-center",
                                                                selectedDurationId === duration.id
                                                                    ? "border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500"
                                                                    : "border-gray-200 hover:border-gray-300"
                                                            )}
                                                        >
                                                            <div className="font-bold text-gray-900 text-sm">{duration.name}</div>
                                                            <div className="text-xs text-emerald-600 font-semibold mt-1">₹{(activity.basePrice * duration.multiplier).toLocaleString()}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Add-ons Desktop Grid */}
                                <div className="pt-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                                        Complete your trip with add-ons
                                    </label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {availableAddons.map(addon => (
                                            <div
                                                key={addon.id}
                                                onClick={() => toggleAddon(addon.id)}
                                                className={cn(
                                                    "flex items-center p-2 rounded-xl border cursor-pointer hover:bg-gray-50 transition-all group",
                                                    selectedAddons.includes(addon.id)
                                                        ? "border-emerald-500 bg-emerald-50/20"
                                                        : "border-dashed border-gray-300"
                                                )}
                                            >
                                                <div className="h-8 w-8 relative rounded overflow-hidden shrink-0 bg-gray-200">
                                                    <Image src={addon.image} alt={addon.name} fill className="object-cover" />
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{addon.name}</h4>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-emerald-700">+₹{getAddonPrice(addon).toLocaleString()}</span>
                                                    <div className={cn(
                                                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                                                        selectedAddons.includes(addon.id)
                                                            ? "bg-emerald-500 border-emerald-500 text-white"
                                                            : "border-gray-300 bg-white"
                                                    )}>
                                                        {selectedAddons.includes(addon.id) && <Check className="w-3 h-3" />}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Main CTA */}
                                <Button
                                    onClick={handleWhatsAppClick}
                                    className="group relative w-full h-16 bg-[#25D366] hover:bg-[#128C7E] text-white text-lg font-bold rounded-xl shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="relative flex items-center justify-center gap-3">
                                        <WhatsAppIcon className="w-8 h-8 fill-white" />
                                        <div className="flex flex-col items-start leading-none gap-0.5">
                                            <span className="text-[10px] font-bold opacity-90 uppercase tracking-widest text-white/90">Click to Book</span>
                                            <span className="text-xl font-bold">WhatsApp</span>
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Premium Mobile Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-white/100 border-t border-gray-200 md:hidden z-40 supports-[backdrop-filter]:bg-white/90 supports-[backdrop-filter]:backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Est. ({peopleCount} Guests)</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-gray-900">₹{currentPrice.toLocaleString()}</span>
                        </div>
                    </div>
                    <Button
                        onClick={handleWhatsAppClick}
                        className="flex-1 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] transition-all active:scale-95"
                    >
                        <div className="flex items-center gap-2">
                            <WhatsAppIcon className="w-6 h-6 fill-white" />
                            <span className="font-bold text-base">Check Availability</span>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
}
