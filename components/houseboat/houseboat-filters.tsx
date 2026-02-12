'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// ... (existing constants)

interface FilterOption {
    value: string;
    label: string;
}

const TRIP_TYPES: FilterOption[] = [
    { value: 'overnight', label: 'Overnight Cruise' },
    { value: 'day', label: 'Day Cruise' },
    { value: 'night', label: 'Night Stay' },
];

const BEDROOMS: FilterOption[] = [
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4+', label: '4+ Bedrooms' },
];

const CATEGORIES: FilterOption[] = [
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'premium', label: 'Premium' },
    { value: 'luxury', label: 'Luxury' },
];

export function HouseboatFilters() {
    const [filters, setFilters] = useState({
        tripType: '',
        bedrooms: '',
        category: '',
    });

    const [showFixed, setShowFixed] = useState(false);
    const staticFilterBarRef = useRef<HTMLDivElement>(null);

    const updateFilter = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // Show fixed bottom filters after static filters scroll out of view
    useEffect(() => {
        const handleScroll = () => {
            if (staticFilterBarRef.current) {
                const rect = staticFilterBarRef.current.getBoundingClientRect();
                // Show fixed bar when the bottom of the container is above the viewport (scrolled past)
                // We add a small buffer (e.g. -10) to make sure it's fully gone
                setShowFixed(rect.bottom < 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const FilterContent = () => (
        <>
            <div className="flex-1 overflow-x-auto scrollbar-hide flex items-center gap-1 sm:gap-2 mask-linear-fade">
                <FilterTrigger
                    label="Trip Type"
                    value={filters.tripType}
                    options={TRIP_TYPES}
                    onChange={(v) => updateFilter('tripType', v)}
                />
                <FilterTrigger
                    label="Bedrooms"
                    value={filters.bedrooms}
                    options={BEDROOMS}
                    onChange={(v) => updateFilter('bedrooms', v)}
                />
                <FilterTrigger
                    label="Category"
                    value={filters.category}
                    options={CATEGORIES}
                    onChange={(v) => updateFilter('category', v)}
                />
            </div>

            <div className="h-8 w-px bg-gray-200 hidden sm:block shrink-0" />

            <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 sm:px-6 h-10 shadow-sm shrink-0 cursor-pointer">
                <Search className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Apply</span>
            </Button>
        </>
    );

    return (
        <div className="relative z-30 mb-8 min-h-[60px] pointer-events-none">
            {/* 1. Static Filter Bar (Initially Visible, Non-Sticky) */}
            <div
                ref={staticFilterBarRef}
                className={cn(
                    "relative w-full flex justify-center px-4 transition-all duration-300",
                    showFixed ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                )}>
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 p-1.5 flex items-center gap-2 w-fit max-w-full mx-auto ring-1 ring-black/5">
                    <FilterContent />
                </div>
            </div>

            {/* 2. Fixed Bottom Filter Bar (Visible on Scroll) - All Devices */}
            <div className={cn(
                "fixed bottom-6 left-0 right-0 px-4 z-40 flex justify-center transition-all duration-500 transform",
                showFixed ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-20 opacity-0 pointer-events-none"
            )}>
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 p-1.5 flex items-center gap-2 w-fit max-w-full mx-auto ring-1 ring-black/5">
                    <FilterContent />
                </div>
            </div>
        </div>
    );
}

function FilterTrigger({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (val: string) => void;
}) {
    const selectedLabel = options.find((o) => o.value === value)?.label;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50 focus:outline-none whitespace-nowrap cursor-pointer hover:bg-emerald-50 shrink-0",
                        value ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 ring-1 ring-emerald-500/20" : "text-gray-600 border border-transparent hover:border-gray-200"
                    )}
                >
                    {selectedLabel || label}
                    <ChevronDown className={cn("w-3.5 h-3.5 text-gray-400 transition-transform", value && "text-emerald-500")} />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-1 rounded-2xl" align="start">
                <div className="grid gap-0.5">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => onChange(option.value === value ? '' : option.value)}
                            className={cn(
                                "flex items-center w-full px-3 py-2 text-sm font-medium rounded-xl transition-colors text-left",
                                value === option.value
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            {option.label}
                            {value === option.value && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
