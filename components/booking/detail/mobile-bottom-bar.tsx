import { Button } from "@/components/ui/button";
import { Lock, Loader2, Phone } from "lucide-react";
import { WhatsAppIcon } from "./shared";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MobileBottomBarProps {
    peopleCount: number;
    currentPrice: number;
    activityName: string;
    activityId: string;
    date: Date | undefined;
    handleWhatsAppClick: () => void;
    handlePayment: () => void;
    isLoading: boolean;
    showMobileBar: boolean;
}

export function MobileBottomBar({ peopleCount, currentPrice, activityName, activityId, date, handleWhatsAppClick, handlePayment, isLoading, showMobileBar }: MobileBottomBarProps) {

    return (
        <div className={`fixed bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-100 md:hidden z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 ${showMobileBar ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="flex items-center gap-3 justify-between">

                {/* Price Section */}
                <div className="flex-1 min-w-0">
                    {currentPrice > 0 ? (
                        <>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 truncate">Total Estimate</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-black text-gray-900 leading-none">₹{currentPrice.toLocaleString()}</span>
                            </div>
                        </>
                    ) : (
                        <div className="leading-tight">
                            <span className="text-sm font-black text-gray-900 block">Select Option</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">To view price</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                    <a
                        href="tel:+919567296056"
                        className="bg-gray-50 hover:bg-emerald-50 text-gray-600 border border-gray-200 w-11 h-11 rounded-xl flex items-center justify-center shadow-sm transition-colors"
                        title="Call Us"
                    >
                        <Phone className="w-4 h-4 fill-current" />
                    </a>
                    <Button
                        onClick={handleWhatsAppClick}
                        disabled={currentPrice === 0}
                        className={cn(
                            "h-11 px-5 rounded-xl shadow-md transition-all border border-transparent relative overflow-hidden group flex items-center gap-2",
                            currentPrice > 0
                                ? "bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-emerald-100"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                        )}
                    >
                        <WhatsAppIcon className={cn("w-5 h-5", currentPrice > 0 ? "fill-white" : "fill-gray-400")} />
                        <span className="text-sm font-bold">Book Now</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
