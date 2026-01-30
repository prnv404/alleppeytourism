'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Users, ArrowRight, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface VisualHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  price?: string;
  priceUnit?: string;
  rating?: number;
  reviews?: number;
  location?: string;
  stats?: Stat[];
  badges?: string[];
}

export function VisualHero({
  title,
  subtitle,
  image,
  price,
  priceUnit = '/ person',
  rating,
  reviews,
  location,
  stats,
  badges,
}: VisualHeroProps) {
  return (
    <div className="relative md:h-[85vh] md:min-h-[600px] w-full bg-black group flex flex-col">
      {/* Background Image Container - Restrained height on mobile */}
      <div className="relative w-full h-[65vh] md:absolute md:inset-0 md:h-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-90 transition-transform duration-[2s] ease-in-out group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 md:to-black/80" />

        {/* Content Overlay - Positioned over image on mobile */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 md:pb-40 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-5xl pointer-events-auto"
          >
            {/* Minimal Location/Rating Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-white/90">
              {location && (
                <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-wide uppercase bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {location}
                </div>
              )}
              {rating && (
                <div className="flex items-center gap-2 text-xs md:text-sm font-bold bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {rating} <span className="opacity-70 font-medium">({reviews} Reviews)</span>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-4 md:mb-6 leading-[1.1] md:leading-[0.9] drop-shadow-2xl">
              {title}
            </h1>

            {subtitle && (
              <p className="text-sm md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed drop-shadow-lg line-clamp-3 md:line-clamp-none">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Glassmorphic Stats Bar - Relative Flow on Mobile, Absolute on Desktop */}
      <div className="relative z-10 bg-zinc-900 border-b border-white/5 md:bg-black/40 md:backdrop-blur-md md:absolute md:bottom-0 md:left-0 md:right-0 md:border-t md:border-b-0 md:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-6">
            {/* Stats Row - Grid on Mobile */}
            {stats && (
              <div className="grid grid-cols-2 gap-4 w-full md:flex md:w-auto md:gap-16">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-white p-3 md:p-0 bg-white/5 md:bg-transparent rounded-xl md:rounded-none"
                  >
                    <div className="text-emerald-400 shrink-0">{stat.icon}</div>
                    <div>
                      <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">{stat.label}</p>
                      <p className="font-bold text-sm md:text-lg leading-none mt-0.5">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Price & Action - Integrated into bar */}
            <div className="flex flex-row items-center justify-between gap-4 w-full md:w-auto md:justify-end border-t border-white/10 pt-4 md:border-t-0 md:pt-0 mt-2 md:mt-0">
              {price && (
                <div className="text-left md:text-right">
                  <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Starting From</p>
                  <div className="flex items-baseline gap-1 md:justify-end">
                    <span className="text-xl md:text-2xl font-bold text-white">{price}</span>
                    <span className="text-[10px] md:text-xs text-white/60 font-medium">{priceUnit}</span>
                  </div>
                </div>
              )}
              <Button
                size="lg"
                className="flex-1 md:flex-none h-12 md:h-14 rounded-full bg-white text-black hover:bg-emerald-500 hover:text-white border-0 font-bold px-6 shadow-xl transition-all text-sm md:text-base uppercase tracking-wide"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
