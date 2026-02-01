'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Star, MapPin, Share2, Heart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Activity } from '@/lib/packages-data';

interface ActivityHeroProps {
  activity: Activity;
  title?: string;
}

export function ActivityHero({ activity, title }: ActivityHeroProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const images = [activity.image, '/images/hero-1.jpg', '/images/hero-2.jpg', '/images/hero-3.jpg'];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipe = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prevIndex => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      swipe(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full mb-8">
      <div className="relative w-full h-[60vh] md:h-[70vh] min-h-[450px] max-h-[800px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl md:shadow-2xl bg-black group">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 md:top-8 md:left-8 z-30 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        {/* Floating Action Buttons */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 flex gap-3 z-30">
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all">
            <Heart className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Image Layer with Ken Burns Effect */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: 'linear' }}
                className="w-full h-full"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${activity.name} ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 md:opacity-80" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 z-20 pointer-events-none pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 md:gap-3 text-amber-400 mb-3 md:mb-4">
              <span className="bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Premium
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-white">4.9 (128 Reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-7xl font-black text-white leading-[1.1] md:leading-[0.95] tracking-tight mb-4 md:mb-6 drop-shadow-lg">
              {title || activity.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-white/90 text-sm md:text-base font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                <span>Vembanad Lake, Alleppey</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span>100% Verified</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => swipe(-1)}
            className="pointer-events-auto h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => swipe(1)}
            className="pointer-events-auto h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 right-8 flex gap-3 z-30">
          {images.map((_, index) => (
            <div
              key={index}
              className="relative h-1.5 rounded-full overflow-hidden bg-white/20 cursor-pointer"
              style={{ width: currentIndex === index ? '2rem' : '0.5rem', transition: 'width 0.3s ease' }}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            >
              {currentIndex === index && (
                <motion.div layoutId="activeIndicator" className="absolute inset-0 bg-white" transition={{ duration: 0.3 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
