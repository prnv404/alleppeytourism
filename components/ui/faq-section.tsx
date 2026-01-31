'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FaqItem {
    q: string;
    a: string;
}

interface FaqSectionProps {
    items: FaqItem[];
    title?: string;
    className?: string;
}

export function FaqSection({ items, title = 'Frequently Asked Questions', className }: FaqSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className={cn('max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20', className)}>
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10 md:mb-16 text-gray-900 tracking-tight">
                {title}
            </h2>
            <div className="space-y-4">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className={cn(
                            'bg-white rounded-2xl border transition-all duration-300 overflow-hidden',
                            openIndex === i
                                ? 'border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                                : 'border-gray-200 hover:border-gray-300'
                        )}
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex items-start justify-between gap-4 focus:outline-none"
                        >
                            <span
                                className={cn(
                                    'font-bold text-base md:text-lg leading-relaxed select-none',
                                    openIndex === i ? 'text-gray-900' : 'text-gray-700'
                                )}
                            >
                                {item.q}
                            </span>
                            <span
                                className={cn(
                                    'flex-shrink-0 mt-0.5 p-1 rounded-full border transition-colors duration-300',
                                    openIndex === i ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-200 text-gray-400'
                                )}
                            >
                                {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </span>
                        </button>
                        <AnimatePresence initial={false}>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                                        <div className="h-px w-full bg-gray-100 mb-4" />
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                            {item.a}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
