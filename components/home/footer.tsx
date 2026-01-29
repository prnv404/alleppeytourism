"use client";

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-black text-white pt-10 pb-6 rounded-t-[2rem] mt-10">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* 1. Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold tracking-tight">
                            Alleppey <span className="text-emerald-500">Tourism</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Experience the serenity of the backwaters with our premium houseboats and adventures.
                        </p>
                        <div className="flex gap-3 pt-2">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"
                                >
                                    <Icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 2. Links Section */}
                    <div>
                        <h3 className="text-sm font-bold mb-3 text-emerald-500 uppercase tracking-wider">Experiences</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {["Houseboats", "Shikara Rides", "Kayaking", "Speed Boat", "About Us"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-emerald-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Contact Section */}
                    <div>
                        <h3 className="text-sm font-bold mb-3 text-emerald-500 uppercase tracking-wider">Contact</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-emerald-600" />
                                <span>+91 95672 96056</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-emerald-600" />
                                <span>hello@alleppeytourism.com</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-emerald-600 mt-0.5" />
                                <span className="leading-tight">Finishing Point Road, Alappuzha</span>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Map Section - Restored but Compact */}
                    <div className="w-full h-32 md:h-full min-h-[120px] rounded-xl overflow-hidden shadow-lg border border-white/10 relative group">
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
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow pointer-events-none">
                            📍 Location
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© 2026 Alleppey Tourism.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
