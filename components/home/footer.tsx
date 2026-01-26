"use client";

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-black text-white pt-10 md:pt-16 pb-8 rounded-t-[2rem] md:rounded-t-[3rem] mt-8 md:mt-10">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-10">
                    {/* Left Column: Brand & Info */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                                Alleppey <span className="text-emerald-500">Tourism</span>
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                                Experience the serenity of the backwaters with our premium houseboats, shikara rides, and kayaking adventures.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-300 group cursor-pointer hover:text-emerald-400 transition-colors">
                                <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-emerald-500/20 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-sm md:text-base font-medium">+91 95672 96056</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300 group cursor-pointer hover:text-emerald-400 transition-colors">
                                <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-emerald-500/20 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-sm md:text-base font-medium">hello@alleppeytourism.com</span>
                            </div>
                            <div className="flex items-start gap-3 text-gray-300 group cursor-pointer hover:text-emerald-400 transition-colors">
                                <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-emerald-500/20 transition-colors mt-0.5">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="text-sm md:text-base font-medium leading-relaxed">
                                    Finishing Point Road, Punnamada,<br />
                                    Alappuzha, Kerala 688006
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Links & Map */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <h3 className="text-base md:text-lg font-bold">Quick Links</h3>
                                <ul className="space-y-2 text-sm">
                                    {["Home", "Houseboats", "Shikara", "Kayak", "About Us"].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-base md:text-lg font-bold">Experiences</h3>
                                <ul className="space-y-2 text-sm">
                                    {["Luxury Cruise", "Sunset Ride", "Village Tour", "Canoe Trip"].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Google Map */}
                        <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10 h-40 md:h-56 w-full relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.2592476906233!2d76.33703965!3d9.486008899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08845f09675271%3A0x2805463f82167664!2sFinishing%20Point!5e0!3m2!1sen!2sin!4v1672323282245!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="transition-all duration-700"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-black text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg pointer-events-none">
                                📍 Finishing Point
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© 2026 Alleppey Tourism. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
