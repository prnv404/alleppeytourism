"use client";

import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";
import { WhatsAppIcon } from "./shared";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
        <div className={`fixed bottom-0 left-0 right-0 p-4 pb-8 bg-white border-t border-gray-100 md:hidden z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 ${showMobileBar ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="flex flex-col gap-3">
                {/* Price & Info Row */}
                <div className="flex items-end justify-between px-1">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total Estimate</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-gray-900 leading-none">₹{currentPrice.toLocaleString()}</span>
                            <span className="text-xs font-semibold text-gray-500">/ {peopleCount} guests</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-700">Pay ₹{(currentPrice * 0.25).toLocaleString()} to book</span>
                    </div>
                </div>

                {/* Buttons Row */}
                <div className="flex gap-3 h-14">
                    <Button
                        onClick={handleWhatsAppClick}
                        className="bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-200 w-14 h-full rounded-xl flex items-center justify-center shadow-sm shrink-0"
                        title="Chat on WhatsApp"
                    >
                        <WhatsAppIcon className="w-6 h-6 fill-current" />
                    </Button>

                    <Button
                        className="flex-1 h-full bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-all border-t border-white/20 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={handlePayment}
                        disabled={isLoading}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                        <div className="relative flex flex-col items-start pl-1">
                            <div className="flex items-center gap-2">
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 text-blue-100 animate-spin" />
                                ) : (
                                    <Lock className="w-4 h-4 text-blue-100" />
                                )}
                                <span className="text-base font-bold">{isLoading ? "Processing..." : "Pay 25% Advance"}</span>
                            </div>
                            <span className="text-[10px] text-blue-100 font-medium ml-6 opacity-90">Secure Checkout</span>
                        </div>
                    </Button>
                </div>
            </div>


        </div>
    );
}
