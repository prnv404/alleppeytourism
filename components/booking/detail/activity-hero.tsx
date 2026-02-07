'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Star, MapPin, Share2, Heart, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Activity, ActivityImage } from '@/lib/packages-data';

interface ActivityHeroProps {
  activity: Activity;
  title?: string;
}

export function ActivityHero({ activity, title }: ActivityHeroProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const images: ActivityImage[] = activity.images && activity.images.length > 0
    ? activity.images
    : [
      { src: '/images/houseboats/houseboat-hero.jpg', alt: 'Alleppey houseboat on backwaters' },
      { src: '/images/shikara/shikara-hero.jpg', alt: 'Shikara boat in Kerala' },
      { src: '/images/kayak/kayak-hero.jpg', alt: 'Kayaking in Alleppey' }
    ];

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

  const swipe = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prevIndex => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsPaused(true);
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsPaused(false), 5000);
  }, [currentIndex]);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      swipe(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, swipe]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        swipe(-1);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 5000);
      } else if (e.key === 'ArrowRight') {
        swipe(1);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 5000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [swipe]);

  // Touch/Swipe handlers
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      swipe(-1);
    } else if (info.offset.x < -swipeThreshold) {
      swipe(1);
    }
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <div className="relative w-full mb-8">
      <div
        ref={containerRef}
        className="relative w-full h-[60vh] md:h-[70vh] min-h-[450px] max-h-[800px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl md:shadow-2xl bg-black group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
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

        {/* Image Counter Badge */}
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 md:hidden z-30 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-medium cursor-pointer"
          onClick={() => setShowThumbnails(true)}
        >
          {currentIndex + 1} / {images.length}
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
            className="absolute inset-0 w-full h-full touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
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
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  fill
                  className="object-cover pointer-events-none"
                  priority={currentIndex === 0}
                  draggable={false}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 md:opacity-80" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 z-20 pointer-events-none pb-20 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 md:gap-3 text-amber-400 mb-3 md:mb-4">
              {title?.toLowerCase().includes('premium') && (
                <span className="bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  Premium
                </span>
              )}
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

        {/* Navigation Arrows - Always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 pointer-events-none z-20">
          <button
            onClick={() => {
              swipe(-1);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 5000);
            }}
            className={cn(
              "pointer-events-auto h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/30 md:bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all border border-white/20",
              "opacity-100 md:opacity-0 md:group-hover:opacity-100"
            )}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={() => {
              swipe(1);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 5000);
            }}
            className={cn(
              "pointer-events-auto h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/30 md:bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all border border-white/20",
              "opacity-100 md:opacity-0 md:group-hover:opacity-100"
            )}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        {/* Progress Indicators - Enhanced for touch */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 flex gap-2 md:gap-3 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "relative rounded-full overflow-hidden cursor-pointer transition-all duration-300 ease-out",
                "h-2 md:h-1.5",
                currentIndex === index
                  ? "w-8 md:w-8 bg-white"
                  : "w-2 md:w-2 bg-white/40 hover:bg-white/60"
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
            >
              {currentIndex === index && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-white"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Thumbnail Strip - Desktop */}
        {images.length > 1 && (
          <div className="hidden md:flex absolute bottom-8 left-8 gap-2 z-30">
            {images.slice(0, 5).map((img, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 border-2",
                  currentIndex === index
                    ? "border-white/90 ring-2 ring-white/30 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
            {images.length > 5 && (
              <button
                onClick={() => setShowThumbnails(true)}
                className="w-16 h-12 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-xs font-medium hover:bg-black/70 transition-all"
              >
                +{images.length - 5}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Full Thumbnail Modal - Mobile/All Images */}
      <AnimatePresence>
        {showThumbnails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-semibold">All Photos ({images.length})</h3>
              <button
                onClick={() => setShowThumbnails(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      goToSlide(index);
                      setShowThumbnails(false);
                    }}
                    className={cn(
                      "relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-200",
                      currentIndex === index
                        ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                        : "hover:ring-2 hover:ring-white/50 hover:ring-offset-1 hover:ring-offset-black"
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                    {currentIndex === index && (
                      <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                        <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded-full">Current</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
