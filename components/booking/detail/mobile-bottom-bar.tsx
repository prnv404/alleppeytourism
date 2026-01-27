"use client";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./shared";

interface MobileBottomBarProps {
    peopleCount: number;
    currentPrice: number;
    handleWhatsAppClick: () => void;
}

export function MobileBottomBar({ peopleCount, currentPrice, handleWhatsAppClick }: MobileBottomBarProps) {
    return (
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
    );
}
