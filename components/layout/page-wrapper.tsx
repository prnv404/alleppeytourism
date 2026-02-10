'use client';

import { ReactNode } from 'react';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';

interface PageWrapperProps {
    children: ReactNode;
    showNavbar?: boolean;
    showFooter?: boolean;
    className?: string;
}

/**
 * PageWrapper
 * Wraps pages with common layout (navbar, footer)
 * Use this for consistent page structure
 */
export function PageWrapper({
    children,
    showNavbar = true,
    showFooter = true,
    className = '',
}: PageWrapperProps) {
    return (
        <>
            {showNavbar && <Navbar />}
            <main className={className}>{children}</main>
            {showFooter && <Footer />}
        </>
    );
}
