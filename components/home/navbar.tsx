'use client';

import { Menu, X, Phone, Search, Home, Ship, Package, Compass, Info, MessageCircle, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Houseboats', href: '/houseboats', icon: Ship },
  { label: 'Shikara', href: '/shikara', icon: Ship },
  { label: 'Kayak', href: '/kayak', icon: Ship },
  { label: 'SpeedBoat', href: '/speedboat', icon: Ship },
];

const aboutUsItems = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms and Conditions', href: '/terms-and-conditions' },
];

const carouselItems = ['Alleppey Tourism', 'Blazing Houseboat', 'Cruise Shikara', 'Delight Kayak', 'Crazy SpeedBoat'];

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 pt-3 transition-all duration-300 ${className || ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* NAV CONTAINER */}
          <div
            className={`backdrop-blur-lg rounded-[1rem] px-5 h-[56px] flex items-center justify-between shadow-sm border transition-all duration-500
                        ${isScrolled ? 'bg-black/90 border-white/10 text-white' : 'bg-white/80 border-black/5 text-black'}`}
          >
            {/* Logo Carousel */}
            <Link
              href="/"
              className={`relative h-6 w-40 overflow-hidden text-lg lg:text-xl font-bold leading-none tracking-tight flex items-center transition-colors duration-300
                                ${isScrolled ? 'text-white' : 'text-black'}
                            `}
            >
              Alleppey <span className="text-emerald-500 ml-1">Tourism</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`group relative h-9 px-4 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all
                                            ${isActive
                        ? isScrolled
                          ? 'bg-white text-black shadow-md shadow-white/10'
                          : 'bg-black text-white shadow-md shadow-black/20'
                        : isScrolled
                          ? 'text-gray-300 hover:text-white hover:bg-white/10'
                          : 'text-gray-600 hover:text-black hover:bg-black/5'
                      }
                                        `}
                  >
                    <item.icon
                      className={`h-4 w-4 transition-colors
                                            ${isActive
                          ? 'text-emerald-500'
                          : isScrolled
                            ? 'text-gray-400 group-hover:text-white'
                            : 'text-gray-500 group-hover:text-black'
                        }
                                        `}
                    />
                    {item.label}
                  </Link>
                );
              })}

              <div className="relative group">
                <button
                  className={`group relative h-9 px-4 inline-flex items-center justify-center gap-1 rounded-full text-sm font-medium transition-all
                    ${isScrolled
                      ? 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                    }
                  `}
                >
                  <Info
                    className={`h-4 w-4 transition-colors mr-1
                      ${isScrolled ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-black'}
                    `}
                  />
                  About Us
                  <ChevronDown
                    className={`h-4 w-4 transition-colors
                      ${isScrolled ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-black'}
                    `}
                  />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                  <div className={`backdrop-blur-lg rounded-2xl shadow-xl p-2 border ${isScrolled ? 'bg-black/90 border-white/10' : 'bg-white/90 border-black/5'}`}>
                    {aboutUsItems.map(item => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all
                            ${isActive
                              ? isScrolled
                                ? 'bg-white/10 text-white font-semibold'
                                : 'bg-gray-100 text-black font-semibold'
                              : isScrolled
                                ? 'text-gray-300 hover:text-white hover:bg-white/10'
                                : 'text-gray-600 hover:text-black hover:bg-black/5'
                            }
                          `}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Call */}
              <a
                href="tel:+919947753154"
                className={`h-9 inline-flex items-center justify-center rounded-full transition px-3 gap-2
                                    ${isScrolled ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'}
                                `}
                aria-label="Call"
              >
                <Phone className="h-4 w-4" />
                <span className="text-xs font-semibold">CALL</span>
              </a>

              {/* Mobile toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-full transition
                                    ${isScrolled ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'}
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
        className={`lg:hidden fixed top-[4.6rem] right-4 z-40 w-72 transition-all duration-300 origin-top-right ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'
          }`}
      >
        <div
          className={`backdrop-blur-lg rounded-3xl shadow-xl p-2 border transition-colors duration-300
                    ${isScrolled ? 'bg-black/90 border-white/10' : 'bg-white/90 border-black/5'}
                `}
        >
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => {
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition
                                    ${isActive
                    ? isScrolled
                      ? 'bg-white/10 text-white font-semibold'
                      : 'bg-gray-100 text-black font-semibold'
                    : isScrolled
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                  }
                                `}
              >
                <item.icon
                  className={`h-4 w-4 ${isActive ? 'text-emerald-500' : isScrolled ? 'text-gray-500' : 'text-gray-500'}`}
                />
                {item.label}
              </Link>
            );
          })}

          <div className={`my-2 border-t ${isScrolled ? 'border-white/10' : 'border-black/5'}`} />

          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">About Us</div>
          {aboutUsItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition
                  ${isActive
                    ? isScrolled
                      ? 'bg-white/10 text-white font-semibold'
                      : 'bg-gray-100 text-black font-semibold'
                    : isScrolled
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
