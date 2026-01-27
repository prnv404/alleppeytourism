"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Plus, Minus, Check, Calendar as CalendarIcon } from "lucide-react";
import { Activity } from "@/lib/packages-data";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CRUISE_TYPES, StayType } from "./shared";

interface MobileSelectionSectionProps {
    activity: Activity;
    selectedVariantId: string;
    setSelectedVariantId: (id: string) => void;
    selectedDurationId: string;
    setSelectedDurationId: (id: string) => void;
    peopleCount: number;
    setPeopleCount: (count: number) => void;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    availableAddons: Activity[];
    selectedAddons: string[];
    toggleAddon: (id: string) => void;
    getAddonPrice: (addon: Activity) => number;
    stayType: StayType;
    setStayType: (type: StayType) => void;
}

export function MobileSelectionSection({
    activity,
    selectedVariantId,
    setSelectedVariantId,
    selectedDurationId,
    setSelectedDurationId,
    peopleCount,
    setPeopleCount,
    date,
    setDate,
    availableAddons,
    selectedAddons,
    toggleAddon,
    getAddonPrice,
    stayType,
    setStayType
}: MobileSelectionSectionProps) {
    const [isMobileCalendarOpen, setIsMobileCalendarOpen] = useState(false);

    // Calculate base price for display (Houseboat)
    const getBasePrice = () => {
        if (activity.type === "houseboat" && activity.variants) {
            // Assume first variant or currently selected variant (though selector is hidden)
            const v = activity.variants.find(v => v.id === selectedVariantId) || activity.variants[0];
            return v ? v.price : 0;
        }
        return activity.basePrice;
    };
    const basePrice = getBasePrice();

    return (
        <div className="md:hidden space-y-6 pt-4 border-t border-gray-100">
            {/* Category/Type Select */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{activity.type === "houseboat" ? "Choose Cruise Type" : "Choose Duration"}</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
                    {activity.type === "houseboat" ? (
                        (Object.keys(CRUISE_TYPES) as StayType[]).map((type) => {
                            const info = CRUISE_TYPES[type];
                            return (
                                <div
                                    key={type}
                                    onClick={() => setStayType(type)}
                                    className={cn(
                                        "min-w-[200px] snap-center relative p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between",
                                        stayType === type
                                            ? "border-emerald-500 bg-emerald-50/50"
                                            : "border-gray-100 bg-white"
                                    )}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{info.label}</h4>
                                            <p className="text-[10px] text-gray-500 line-clamp-2 mt-0.5">{info.desc}</p>
                                        </div>
                                        {stayType === type && (
                                            <Check className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded-full p-0.5 shrink-0" />
                                        )}
                                    </div>
                                    <div className="font-bold text-emerald-700 text-sm mt-2">
                                        ₹{(basePrice * info.multiplier).toLocaleString()}
                                    </div>
                                </div>
                            );
                        })
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
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Date <span className="text-red-500">*</span></h3>
                    <Popover open={isMobileCalendarOpen} onOpenChange={setIsMobileCalendarOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start h-12 rounded-xl border-gray-200 text-left font-normal bg-gray-50 text-sm px-3",
                                    !date && "text-gray-500",
                                    !date && "border-red-200 bg-red-50" // simple error state hint
                                )}
                            >
                                <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                                {date ? <span className="font-semibold text-gray-900 truncate">{format(date, "MMM dd")}</span> : <span>Pick date *</span>}
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
    );
}
