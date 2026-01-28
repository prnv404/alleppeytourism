import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { activities } from "@/lib/packages-data";
import { Clock, Users, Check, MapPin, Zap, Shield, Camera, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Speed Boat Rides | Alleppey Adventure",
    description: "Feel the thrill of speed on the Vembanad Lake. The fastest way to see the backwaters.",
};

export default function SpeedboatPage() {
    const activity = activities.find((a) => a.id === "speedboat");
    if (!activity) return null;

    return (
        <div className="bg-white min-h-screen font-sans text-gray-900">
            <Navbar />

            {/* Standard Hero Section */}
            <div className="pt-16 md:pt-19 mb-8 md:mb-12">
                <Hero
                    slides={[
                        {
                            image: "/images/hero-1.jpg",
                            title: "UNLEASH THE POWER",
                            subtitle: "Zero to thrill in seconds. The fastest way to see Alleppey backwaters.",
                            buttonText: "Choose Your Machine",
                            buttonUrl: "#rates"
                        }
                    ]}
                />
            </div>

            {/* High Energy White Grid Section (Pricing) */}
            <div id="rates" className="bg-white py-12 md:py-16 mb-0 relative overflow-hidden rounded-2xl mx-4 md:mx-6 border border-gray-100 shadow-xl z-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-3xl md:text-6xl font-black italic tracking-tighter text-gray-900 uppercase mb-3">
                            Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Machine</span>
                        </h2>
                        <p className="text-gray-500 font-medium text-sm md:text-base">Choose your duration and intensity level.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                        {activity.durations?.map((d) => {
                            const price = Math.round(activity.basePrice * d.multiplier);
                            const isPopular = d.id === 'round';
                            return (
                                <div key={d.id} className="group relative flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10">
                                    {/* Card Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        <Image
                                            src="/images/hero-1.jpg"
                                            alt={`${d.name} Speedboat`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                                        {isPopular && (
                                            <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 text-[10px] font-black italic uppercase tracking-wider shadow-lg">
                                                Best Value
                                            </div>
                                        )}
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <h3 className="text-2xl font-black italic uppercase text-white mb-2 leading-none">{d.name}</h3>
                                            <div className="flex items-center gap-3 text-gray-300 text-xs font-bold uppercase tracking-wider">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-500" /> {d.id === 'round' ? '60 Mins' : '30 Mins'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 flex items-center justify-between bg-white">
                                        <div>
                                            <p className="text-2xl font-black text-gray-900 italic tracking-tight">₹{price}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">per boat</p>
                                        </div>

                                        <Button asChild className="bg-black text-white hover:bg-emerald-600 hover:text-white rounded-xl h-10 px-6 font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-emerald-500/20">
                                            <Link href={`/book/${activity.id}?duration=${d.id}`}>Book Now</Link>
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 1. Feature Banner (Zig Zag) */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-32">
                <div className="grid md:grid-cols-2 gap-8 md:gap-24 items-center mb-16 md:mb-24">
                    <div className="order-2 md:order-1 space-y-6 md:space-y-8">
                        <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
                            Full Throttle
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase text-gray-900 leading-[0.9]">
                            Cover More.<br />
                            <span className="text-gray-300">Faster.</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium">
                            Speed boats are the only way to reach distant attractions like Pathiramanal Island and the Kumarakom Bird Sanctuary in a short span of time. While others drift, you fly.
                        </p>
                        <ul className="space-y-3">
                            {['Max Speed: 60km/h', 'Licensed Drivers', 'Life Jackets Mandatory'].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-gray-900 font-bold text-sm md:text-base">
                                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-1 md:order-2 relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl skew-y-3 md:skew-y-0 md:skew-x-3 transition-transform hover:skew-x-0 duration-500">
                        <Image src="/images/hero-2.jpg" alt="Speedboat Action" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 md:mb-24">
                    {[
                        { icon: Zap, label: "High Speed", desc: "Adrenaline pumping" },
                        { icon: Camera, label: "Sightseeing", desc: "Great photos" },
                        { icon: Shield, label: "100% Safe", desc: "Certified gear" },
                        { icon: Anchor, label: "Anywhere Drop", desc: "Resort transfer" },
                    ].map((h, i) => (
                        <div key={i} className="bg-gray-50 p-6 md:p-8 rounded-2xl hover:bg-black hover:text-white group transition-colors duration-300">
                            <h.icon className="w-8 h-8 md:w-10 md:h-10 mb-4 text-emerald-600 group-hover:text-emerald-500" />
                            <h4 className="font-bold text-lg md:text-xl mb-1">{h.label}</h4>
                            <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-400">{h.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Dark Safety Section */}
            <div className="bg-zinc-950 text-white py-16 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black italic uppercase mb-6 text-white">
                                Safety First.<br />
                                <span className="text-emerald-500">Always.</span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                We don't compromise on safety. Every boat is inspected daily, and every passenger gets a certified life jacket.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="border-l-4 border-emerald-500 pl-6">
                                    <span className="block text-3xl md:text-4xl font-black text-white mb-1">100%</span>
                                    <span className="text-xs md:text-sm font-bold uppercase text-gray-500 tracking-widest">Licensed Pilots</span>
                                </div>
                                <div className="border-l-4 border-emerald-500 pl-6">
                                    <span className="block text-3xl md:text-4xl font-black text-white mb-1">Zero</span>
                                    <span className="text-xs md:text-sm font-bold uppercase text-gray-500 tracking-widest">Accidents</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-white/10">
                            <Image src="/images/hero-1.jpg" alt="Safety" fill className="object-cover opacity-50 hover:opacity-100 transition-all duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-600 flex items-center justify-center animate-pulse">
                                    <Shield className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Popular Stops (Waypoints) */}
            <div className="py-16 md:py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-emerald-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Route Map</span>
                        <h2 className="text-3xl md:text-5xl font-black italic text-gray-900 uppercase">Popular Waypoints</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { title: "Pathiramanal", subtitle: "Sands of Night", desc: "Mysterious island." },
                            { title: "Thanneermukkom", subtitle: "Salt Barrier", desc: "Longest mud regulator." },
                            { title: "Kumarakom", subtitle: "Bird Sanctuary", desc: "Siberian cranes." },
                            { title: "R-Block", subtitle: "Reclaimed Land", desc: "Farming below sea level." }
                        ].map((stop, i) => (
                            <div key={i} className="group bg-white p-6 md:p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl border border-gray-100 relative overflow-hidden">
                                <span className="absolute top-6 right-6 text-5xl md:text-6xl font-black text-gray-100 group-hover:text-emerald-50 transition-colors pointer-events-none">
                                    0{i + 1}
                                </span>
                                <h3 className="font-black text-xl md:text-2xl mb-1 group-hover:text-emerald-600 transition-colors uppercase italic">{stop.title}</h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{stop.subtitle}</p>
                                <p className="text-sm md:text-base text-gray-600 font-medium relative z-10">{stop.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Information & FAQ */}
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="bg-black text-white rounded-2xl p-8 md:p-12 mb-12 md:mb-16 relative overflow-hidden text-center">
                    <div className="relative z-10">
                        <MapPin className="w-10 h-10 md:w-12 md:h-12 text-emerald-500 mx-auto mb-6" />
                        <h3 className="text-2xl md:text-3xl font-black uppercase italic mb-2">Boat Jetty Location</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm md:text-base">Located near KSRTC Bus Stand. Operates 9 AM - 6 PM.</p>
                        <Button className="bg-white text-black hover:bg-emerald-600 hover:text-white rounded-xl px-8 font-bold h-12 uppercase">
                            Get Directions
                        </Button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl md:text-2xl font-black text-center mb-8 uppercase italic">Common Questions</h3>
                    {[
                        { q: "Do we get wet?", a: "There might be a light spray of water depending on the wind, but you won't get soaked. It is part of the fun!" },
                        { q: "Is it suitable for seniors?", a: "The ride can be bumpy at high speeds. We recommend Shikara or Houseboat for guests with back pain or mobility issues." },
                        { q: "Can we stop for photos?", a: "Yes! The driver will slow down or stop at scenic spots like Pathiramanal island for photography." }
                    ].map((faq, i) => (
                        <div key={i} className="border-b border-gray-100 pb-6">
                            <h4 className="font-bold text-base md:text-lg mb-2">{faq.q}</h4>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
