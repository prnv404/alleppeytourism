"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Activity, activities } from "@/lib/packages-data";
import { useSearchParams } from "next/navigation";
import { ListingGrid, ListingItem } from "@/components/ui/listing-grid";

import { ActivityNavbar } from "./detail/activity-navbar";
import { ActivityHero } from "./detail/activity-hero";
import { ActivityHeader } from "./detail/activity-header";
import { ActivityHighlights } from "./detail/activity-highlights";
import { ActivityInfo } from "./detail/activity-info";
import { MobileSelectionSection } from "./detail/mobile-selection-section";
import { CruiseItinerary } from "./detail/cruise-itinerary";
import { BookingWidget } from "./detail/booking-widget";
import { MobileBottomBar } from "./detail/mobile-bottom-bar";
import { CRUISE_TYPES, StayType } from "./detail/shared";

interface ActivityDetailProps {
    activity: Activity;
}

export function ActivityDetail({ activity }: ActivityDetailProps) {
    const searchParams = useSearchParams();
    const paramVariant = searchParams.get('variant');
    const paramDuration = searchParams.get('duration');

    const [selectedVariantId, setSelectedVariantId] = useState<string>(
        paramVariant || (activity.variants ? activity.variants[0].id : "")
    );
    const [selectedDurationId, setSelectedDurationId] = useState<string>(
        paramDuration || (activity.durations ? activity.durations[0].id : "")
    );
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [peopleCount, setPeopleCount] = useState(2);
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [stayType, setStayType] = useState<StayType>("overnight");

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
    const isPerPerson = activity.id === 'kayak' || activity.id === 'speedboat'; // Ideally this should be in the data model

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
            const multiplier = CRUISE_TYPES[stayType].multiplier;
            base = v ? v.price * multiplier : 0;
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
            message += `*Cruise:* ${CRUISE_TYPES[stayType].label}\n`;
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

        if (!date) {
            alert("Please select a travel date to check availability.");
            return;
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

    // Prepare cross-sell items (All items flattened)
    const crossSellItems: ListingItem[] = activities.flatMap(act => {
        if (act.type === "houseboat" && act.variants) {
            return act.variants.map(v => ({
                id: v.id,
                title: v.name,
                description: v.description || act.description,
                price: v.price,
                priceUnit: "/ night",
                image: act.image,
                href: `/book/houseboat?variant=${v.id}`,
                rating: 4.8
            }));
        }
        return [{
            id: act.id,
            title: act.name,
            description: act.description,
            price: act.basePrice,
            priceUnit: "/ trip",
            image: act.image,
            href: `/houseboats/book/${act.id}`,
            rating: 4.7
        }];
    });

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24 md:pb-12 md:pt-24 font-sans">
            <ActivityNavbar activity={activity} isScrolled={isScrolled} />

            <main className="max-w-7xl mx-auto md:px-6 md:pt-8 min-h-screen">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column: Visuals & Info */}
                    <div className="flex-1 w-full">
                        <ActivityHero activity={activity} />

                        {/* Content Container - Overlaps on Mobile */}
                        <div className="relative z-10 -mt-4 md:mt-10 bg-white rounded-t-[1.5rem] md:rounded-none px-5 py-6 md:p-0">
                            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6 md:hidden" />

                            <ActivityHeader activity={activity} />

                            <div className="space-y-8 md:space-y-12">
                                <ActivityHighlights specs={activity.specs} features={activity.features} />

                                <MobileSelectionSection
                                    activity={activity}
                                    selectedVariantId={selectedVariantId}
                                    setSelectedVariantId={setSelectedVariantId}
                                    selectedDurationId={selectedDurationId}
                                    setSelectedDurationId={setSelectedDurationId}
                                    peopleCount={peopleCount}
                                    setPeopleCount={setPeopleCount}
                                    date={date}
                                    setDate={setDate}
                                    availableAddons={availableAddons}
                                    selectedAddons={selectedAddons}
                                    toggleAddon={toggleAddon}
                                    getAddonPrice={getAddonPrice}
                                    stayType={stayType}
                                    setStayType={setStayType}
                                />

                                <ActivityInfo activity={activity} />

                                {activity.type === "houseboat" && <CruiseItinerary />}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Desktop Booking Widget */}
                    <BookingWidget
                        activity={activity}
                        peopleCount={peopleCount}
                        setPeopleCount={setPeopleCount}
                        date={date}
                        setDate={setDate}
                        selectedVariantId={selectedVariantId}
                        setSelectedVariantId={setSelectedVariantId}
                        selectedDurationId={selectedDurationId}
                        setSelectedDurationId={setSelectedDurationId}
                        availableAddons={availableAddons}
                        selectedAddons={selectedAddons}
                        toggleAddon={toggleAddon}
                        getAddonPrice={getAddonPrice}
                        currentPrice={currentPrice}
                        handleWhatsAppClick={handleWhatsAppClick}
                        stayType={stayType}
                        setStayType={setStayType}
                    />
                </div>
            </main>

            {/* Explore More - Cross Sell Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 border-t border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Explore More</h2>
                <ListingGrid items={crossSellItems} />
            </section>

            <MobileBottomBar
                peopleCount={peopleCount}
                currentPrice={currentPrice}
                handleWhatsAppClick={handleWhatsAppClick}
            />


        </div>
    );
}
