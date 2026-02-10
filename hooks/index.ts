'use client';

import { useState, useEffect } from 'react';

// Breakpoints matching Tailwind defaults
const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * useIsMobile
 * Returns true if viewport is below the specified breakpoint
 * Default: 'md' (768px)
 */
export function useIsMobile(breakpoint: Breakpoint = 'md'): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < BREAKPOINTS[breakpoint]);
        };

        // Check immediately
        checkMobile();

        // Listen for resize
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
}

/**
 * useScrollPosition
 * Returns current scroll Y position
 */
export function useScrollPosition(): number {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollY;
}

/**
 * useScrolledPast
 * Returns true if scrolled past a threshold
 */
export function useScrolledPast(threshold: number = 100): boolean {
    const scrollY = useScrollPosition();
    return scrollY > threshold;
}

/**
 * useLockBodyScroll
 * Locks body scroll when active (useful for modals)
 */
export function useLockBodyScroll(lock: boolean): void {
    useEffect(() => {
        if (lock) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [lock]);
}

/**
 * useMediaQuery
 * Generic media query hook
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        const listener = () => setMatches(media.matches);
        listener(); // Check immediately

        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}

/**
 * usePrefersReducedMotion
 * Returns true if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
    return useMediaQuery('(prefers-reduced-motion: reduce)');
}
