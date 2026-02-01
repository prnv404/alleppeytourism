'use client';

import { Check, Clock, Anchor, Calendar, Moon, Sun, Coffee, ChevronDown, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Activity } from '@/lib/packages-data';
import { StayType } from './shared';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface CruisePackagesProps {
    activity: Activity;
    selectedVariantId: string;
    stayType: StayType | null;
    setStayType: (type: StayType) => void;
}

export function CruisePackages({ activity, selectedVariantId, stayType, setStayType }: CruisePackagesProps) {
    const [expandedRoute, setExpandedRoute] = useState<string | null>(null);

    // Helper to get price for a specific cruise type
    const getPrice = (typeId: string) => {
        const variant = activity.variants?.find(v => v.id === selectedVariantId);
        if (!variant) return 0;
        const cruiseType = variant.cruiseTypes?.find(ct => ct.id === typeId);
        return cruiseType ? Math.round(variant.price * cruiseType.multiplier) : 0;
    };

    const packages = [
        {
            id: 'overnight',
            name: 'Overnight Cruise',
            description: 'Extended cruise through the serene backwaters with overnight stay.',
            price: getPrice('overnight'),
            color: 'emerald',
            icon: Moon,
            specs: [
                { label: 'Duration', value: '21 hours' },
                { label: 'Check-in', value: '12:00 PM' },
                { label: 'Sails at', value: '01:30 PM' },
                { label: 'Check-out', value: '09:00 AM' },
            ],
            meals: ['Welcome Drink', 'Traditional Kerala Lunch', 'Delicious Dinner', 'Refreshing Breakfast'],
            route: 'Alleppey Round -> Punnamada Lake -> Vembanad Lake -> Kainakary -> Nedumudi -> Moonnattinu Mukham (Night Stay)',
        },
        {
            id: 'day',
            name: 'Day Cruise',
            description: 'Perfect for exploring the backwaters in a shorter duration without stay.',
            price: getPrice('day'),
            color: 'amber',
            icon: Sun,
            specs: [
                { label: 'Duration', value: '5.5 hours' },
                { label: 'Check-in', value: '12:00 PM' },
                { label: 'Sails at', value: '01:30 PM' },
                { label: 'Check-out', value: '05:30 PM' },
            ],
            meals: ['Welcome Drink', 'Traditional Kerala Lunch', 'Tea or Coffee / Snacks'],
            route: 'Alleppey Round -> Punnamada Lake -> Vembanad Lake -> Kainakary -> Aleppey Finishing Point',
        },
        {
            id: 'night',
            name: 'Night Stay',
            description: 'Experience the silence of the lake at night on an anchored houseboat.',
            price: getPrice('night'),
            color: 'blue',
            icon: Anchor,
            specs: [
                { label: 'Duration', value: '15.5 hours' },
                { label: 'Check-in', value: '05:30 PM' },
                { label: 'Sails at', value: 'Upon Check-in' },
                { label: 'Check-out', value: '09:00 AM' },
            ],
            meals: ['Delicious Dinner', 'Refreshing Breakfast'],
            route: 'Anchored at specific scenic points in the backwaters (Stationary experience).',
        },
    ];

    return (
        <div className="mt-12 space-y-8">
            <div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">Choose Your Experience</h3>
                <p className="text-gray-500 mt-2">Compare our cruise packages to find your perfect journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => {
                    const isSelected = stayType === pkg.id;
                    const config = {
                        emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900', icon: 'text-emerald-600', ring: 'ring-emerald-500' },
                        amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', icon: 'text-amber-600', ring: 'ring-amber-500' },
                        blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', icon: 'text-blue-600', ring: 'ring-blue-500' },
                    }[pkg.color] || { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-900', icon: 'text-gray-600', ring: 'ring-gray-500' };

                    return (
                        <div
                            key={pkg.id}
                            onClick={() => setStayType(pkg.id as StayType)}
                            className={cn(
                                "relative rounded-[2rem] p-6 cursor-pointer border-2 transition-all duration-300 flex flex-col h-full group",
                                isSelected ? `${config.bg} ${config.border} shadow-xl scale-[1.02] ring-1 ${config.ring}` : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg"
                            )}
                        >
                            {/* Header */}
                            <div className="mb-6">
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors", isSelected ? "bg-white shadow-sm" : "bg-gray-50")}>
                                    <pkg.icon className={cn("w-6 h-6", config.icon)} />
                                </div>
                                <div className="flex justify-between items-start">
                                    <h4 className="text-xl font-bold text-gray-900">{pkg.name}</h4>
                                    <span className="text-lg font-black text-gray-900">₹{pkg.price.toLocaleString()}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2 leading-relaxed h-[40px] line-clamp-2">{pkg.description}</p>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mb-6 pb-6 border-b border-gray-100/50">
                                {pkg.specs.map((spec, i) => (
                                    <div key={i}>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{spec.label}</p>
                                        <p className="font-bold text-gray-900">{spec.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Meals */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <Coffee className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs font-bold text-gray-900 uppercase">Meals Included</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {pkg.meals.map((meal, i) => (
                                        <span key={i} className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border", isSelected ? "bg-white/60 border-black/5" : "bg-gray-50 border-gray-100")}>
                                            {meal}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* View Route Accordion */}
                            <div className="mt-6 pt-4 border-t border-black/5">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedRoute(expandedRoute === pkg.id ? null : pkg.id);
                                    }}
                                    className="flex items-center justify-between w-full text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        View Full Route
                                    </span>
                                    <ChevronDown className={cn("w-4 h-4 transition-transform", expandedRoute === pkg.id ? "rotate-180" : "")} />
                                </button>
                                <AnimatePresence>
                                    {expandedRoute === pkg.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pt-3 text-xs leading-relaxed text-gray-600 font-medium">
                                                {pkg.route}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Selection Check (Mobile/Desktop Visual Cue) */}
                            <div className={cn("absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all", isSelected ? `${config.icon} border-current` : "border-gray-200")}>
                                {isSelected && <div className={cn("w-3 h-3 rounded-full bg-current")} />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
