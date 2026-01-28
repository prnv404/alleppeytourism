"use client";

import { Clock, Anchor, Coffee, Sun, Moon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const schedules = [
    {
        id: "overnight",
        title: "Overnight Cruise",
        icon: Moon,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        border: "border-indigo-100",
        description: "Exclusive private houseboat experience tailored for relaxation.",
        duration: "21 Hours",
        checkin: "12:00 PM",
        sailsAt: "Upon Check-in",
        checkout: "09:00 AM",
        checkoutNote: "(next day)",
        meals: ["Welcome Drink", "Kerala Lunch", "Delicious Dinner", "Breakfast"]
    },
    {
        id: "day",
        title: "Day Cruise",
        icon: Sun,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-100",
        description: "Explore Punnamada Lake, Vembanad Lake, and narrow canals.",
        duration: "5.5 Hours",
        checkin: "11:00 AM",
        sailsAt: "Upon Check-in",
        checkout: "05:00 PM",
        checkoutNote: "(same day)",
        meals: ["Welcome Drink", "Kerala Lunch", "Tea/Coffee & Snacks"]
    },
    {
        id: "night",
        title: "Night Stay",
        icon: Anchor,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        description: "Anchored experience in the serene backwaters under the stars.",
        duration: "15.5 Hours",
        checkin: "05:30 PM",
        sailsAt: "Upon Check-in",
        checkout: "09:00 AM",
        checkoutNote: "(next day)",
        meals: ["Delicious Dinner", "Refreshing Breakfast"]
    }
];

export function CruiseItinerary() {
    return (
        <div className="pt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Cruise Schedules
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:mx-0 scrollbar-hide">
                {schedules.map((item) => (
                    <div
                        key={item.id}
                        className={cn(
                            "min-w-[280px] md:min-w-0 md:w-auto snap-center rounded-2xl border p-5 transition-all hover:shadow-lg relative overflow-hidden group bg-white",
                            item.border
                        )}
                    >
                        {/* Header */}
                        <div className={cn("absolute top-0 right-0 p-3 rounded-bl-2xl", item.bg)}>
                            <item.icon className={cn("w-5 h-5", item.color)} />
                        </div>

                        <div className="mb-6 pr-8">
                            <h4 className="text-lg font-black text-gray-900 mb-2">{item.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                {item.description}
                            </p>
                        </div>

                        {/* Timeline Grid */}
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
                            <div className="bg-gray-50 rounded-lg p-2.5">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Check-in</p>
                                <p className="text-sm font-bold text-gray-900">{item.checkin}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2.5">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Duration</p>
                                <p className="text-sm font-bold text-gray-900">{item.duration}</p>
                            </div>
                            <div className="col-span-2 bg-gray-50 rounded-lg p-2.5">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Check-out</p>
                                <div className="flex items-baseline gap-1">
                                    <p className="text-sm font-bold text-gray-900">{item.checkout}</p>
                                    <span className="text-[10px] font-medium text-gray-500">{item.checkoutNote}</span>
                                </div>
                            </div>
                        </div>

                        {/* Meals */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Coffee className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Meals Included</span>
                            </div>
                            <ul className="space-y-2">
                                {item.meals.map((meal, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs font-medium text-gray-600">
                                        <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", item.bg.replace('bg-', 'bg-').replace('50', '400'))} />
                                        {meal}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
