'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type HeroSlide = {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
};

interface HeroProps {
  slides: HeroSlide[];
}

export function Hero({ slides }: HeroProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 1,
    }),
  };

  const swipe = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prevIndex => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;
      return newIndex;
    });
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      swipe(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full mt-5 px-4 sm:px-6 lg:px-8 mb-5">
      <div className="relative w-full h-[75vh] min-h-[600px] max-h-[900px] rounded-[1.2rem] overflow-hidden shadow-2xl mx-auto max-w-7xl bg-black group">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'tween', ease: 'easeInOut', duration: 0.5 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipeValue = swipePower(offset.x, velocity.x);

              if (swipeValue < -swipeConfidenceThreshold) {
                swipe(1);
              } else if (swipeValue > swipeConfidenceThreshold) {
                swipe(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Image Layer with Ken Burns Effect */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
              <motion.img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: 'linear' }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90" />
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 pointer-events-none">
              <div className="max-w-4xl mx-auto w-full pointer-events-auto">
                {slides[currentIndex].title && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-[1.1]">
                      {slides[currentIndex].title}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h2 className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl font-light leading-relaxed drop-shadow-md">
                    {slides[currentIndex].subtitle}
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button
                    asChild
                    className="h-12 px-8 rounded-lg bg-white text-black hover:bg-emerald-600 hover:text-white transition-all duration-300 text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-white/10"
                  >
                    <a href={slides[currentIndex].buttonUrl}>
                      {slides[currentIndex].buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows (Visible on Hover) */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => swipe(-1)}
            onPointerDownCapture={e => e.stopPropagation()}
            className="pointer-events-auto h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => swipe(1)}
            onPointerDownCapture={e => e.stopPropagation()}
            className="pointer-events-auto h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 right-8 md:right-20 flex gap-3 z-20">
          {slides.map((_, index) => (
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
