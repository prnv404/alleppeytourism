"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Minus, Plus, Calendar as CalendarIcon, Sparkles, Check } from "lucide-react";
import { Activity } from "@/lib/packages-data";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { WhatsAppIcon, CRUISE_TYPES, StayType } from "./shared";

interface BookingWidgetProps {
    activity: Activity;
    peopleCount: number;
    setPeopleCount: (count: number) => void;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    selectedVariantId: string;
    setSelectedVariantId: (id: string) => void;
    selectedDurationId: string;
    setSelectedDurationId: (id: string) => void;
    availableAddons: Activity[];
    selectedAddons: string[];
    toggleAddon: (id: string) => void;
    getAddonPrice: (addon: Activity) => number;
    currentPrice: number;
    handleWhatsAppClick: () => void;
    stayType: StayType;
    setStayType: (type: StayType) => void;
}

export function BookingWidget({
    activity,
    peopleCount,
    setPeopleCount,
    date,
    setDate,
    selectedVariantId,
    setSelectedVariantId,
    selectedDurationId,
    setSelectedDurationId,
    availableAddons,
    selectedAddons,
    toggleAddon,
    getAddonPrice,
    currentPrice,
    handleWhatsAppClick,
    stayType,
    setStayType
}: BookingWidgetProps) {
    const [isDesktopCalendarOpen, setIsDesktopCalendarOpen] = useState(false);

    // Calculate base price for display (Houseboat)
    const getBasePrice = () => {
        if (activity.type === "houseboat" && activity.variants) {
            const v = activity.variants.find(v => v.id === selectedVariantId) || activity.variants[0];
            return v ? v.price : 0;
        }
        return activity.basePrice;
    };
    const basePrice = getBasePrice();

    return (
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
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Date <span className="text-red-500">*</span></label>
                            <Popover open={isDesktopCalendarOpen} onOpenChange={setIsDesktopCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-between h-14 rounded-xl border-gray-200 text-left font-normal hover:bg-gray-50 px-4",
                                            !date && "text-gray-500",
                                            !date && "border-red-200 bg-red-50/50" // simple error state hint
                                        )}
                                    >
                                        <span className="flex items-center gap-3">
                                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                                            {date ? format(date, "PPP") : "Select Trip Date *"}
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
                                    {activity.type === "houseboat" ? "Cruise Type" : "Duration"}
                                </label>
                            </div>
                            <div className="space-y-2">
                                {activity.type === "houseboat" ? (
                                    (Object.keys(CRUISE_TYPES) as StayType[]).map((type) => {
                                        const info = CRUISE_TYPES[type];
                                        return (
                                            <div
                                                key={type}
                                                onClick={() => setStayType(type)}
                                                className={cn(
                                                    "group flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-gray-50 transition-all",
                                                    stayType === type
                                                        ? "border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500"
                                                        : "border-gray-200"
                                                )}
                                            >
                                                <div>
                                                    <div className="font-bold text-gray-900 text-sm">{info.label}</div>
                                                    <div className="text-[10px] text-gray-500">{info.desc}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-emerald-700 text-sm">₹{(basePrice * info.multiplier).toLocaleString()}</div>
                                                </div>
                                            </div>
                                        );
                                    })
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
    );
}
