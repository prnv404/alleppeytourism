"use client";

import {
    Menu,
    X,
    Phone,
    Search,
    Home,
    Ship,
    Package,
    Compass,
    Info,
    MessageCircle,

} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Houseboats", href: "/houseboats", icon: Ship },
    { label: "Shikara", href: "/shikara", icon: Ship },
    { label: "Kayak", href: "/kayak", icon: Ship },
    { label: "SpeedBoat", href: "/speedboat", icon: Ship },
    { label: "Contact", href: "/contact", icon: MessageCircle },
];

const carouselItems = [
    "Alleppey Tourism",
    "Blazing Houseboat",
    "Cruise Shikara",
    "Delight Kayak",
    "Crazy SpeedBoat"
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Home");
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 pt-3 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* NAV CONTAINER */}
                    <div className={`backdrop-blur-lg rounded-full px-5 h-[56px] flex items-center justify-between shadow-sm border transition-all duration-500
                        ${isScrolled
                            ? "bg-black/90 border-white/10 text-white"
                            : "bg-white/80 border-black/5 text-black"
                        }`}
                    >

                        {/* Logo Carousel */}
                        <a
                            href="/"
                            className={`relative h-6 w-40 overflow-hidden text-lg lg:text-xl font-bold leading-none tracking-tight flex items-center transition-colors duration-300
                                ${isScrolled ? "text-white" : "text-black"}
                            `}
                        >
                            Alleppey <span className="text-emerald-500 ml-1">Tourism</span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setActiveTab(item.label)}
                                    className={`group relative h-9 px-4 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all
                                        ${activeTab === item.label
                                            ? isScrolled
                                                ? "bg-white text-black shadow-md shadow-white/10"
                                                : "bg-black text-white shadow-md shadow-black/20"
                                            : isScrolled
                                                ? "text-gray-300 hover:text-white hover:bg-white/10"
                                                : "text-gray-600 hover:text-black hover:bg-black/5"
                                        }
                                    `}
                                >
                                    <item.icon className={`h-4 w-4 transition-colors
                                        ${activeTab === item.label
                                            ? "text-emerald-500"
                                            : isScrolled ? "text-gray-400 group-hover:text-white" : "text-gray-500 group-hover:text-black"
                                        }
                                    `} />
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-2">

                            {/* CTA */}
                            <button
                                className={`hidden md:inline-flex h-9 items-center gap-2 px-4 rounded-full text-sm font-semibold transition shadow
                                    ${isScrolled
                                        ? "bg-white text-black hover:bg-gray-200"
                                        : "bg-black text-white hover:bg-black/80"
                                    }
                                `}
                                aria-label="Choose Your Experience"
                            >
                                Choose Your Experience
                                <span className="bg-emerald-500 rounded-full p-1">
                                    <Search className="h-3.5 w-3.5 text-white" />
                                </span>
                            </button>

                            {/* Call */}
                            <a
                                href="tel:+919567296056"
                                className={`h-9 w-9 inline-flex items-center justify-center rounded-full transition
                                    ${isScrolled
                                        ? "text-white hover:bg-white/10"
                                        : "text-black hover:bg-black/5"
                                    }
                                `}
                                aria-label="Call"
                            >
                                <Phone className="h-4.5 w-4.5" />
                            </a>

                            {/* Mobile toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-full transition
                                    ${isScrolled
                                        ? "text-white hover:bg-white/10"
                                        : "text-black hover:bg-black/5"
                                    }
                                `}
                                aria-expanded={isOpen}
                            >
                                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed top-[4.6rem] right-4 z-40 w-72 transition-all duration-300 origin-top-right ${isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible pointer-events-none"
                    }`}
            >
                <div className={`backdrop-blur-lg rounded-3xl shadow-xl p-2 border transition-colors duration-300
                    ${isScrolled
                        ? "bg-black/90 border-white/10"
                        : "bg-white/90 border-black/5"
                    }
                `}>
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => {
                                setActiveTab(item.label);
                                setIsOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition
                                ${activeTab === item.label
                                    ? isScrolled
                                        ? "bg-white/10 text-white font-semibold"
                                        : "bg-gray-100 text-black font-semibold"
                                    : isScrolled
                                        ? "text-gray-400 hover:text-white hover:bg-white/5"
                                        : "text-gray-600 hover:text-black hover:bg-black/5"
                                }
                            `}
                        >
                            <item.icon className={`h-4 w-4 ${activeTab === item.label ? "text-emerald-500" : isScrolled ? "text-gray-500" : "text-gray-500"}`} />
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
