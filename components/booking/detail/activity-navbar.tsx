'use client';

import Link from 'next/link';
import { ChevronLeft, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Activity } from '@/lib/packages-data';

interface ActivityNavbarProps {
  activity: Activity;
  isScrolled: boolean;
}

export function ActivityNavbar({ activity, isScrolled }: ActivityNavbarProps) {
  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 transition-all duration-300 md:hidden',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
      )}
    >
      <Link
        href="/"
        className={cn(
          'p-2 rounded-full backdrop-blur-md transition-colors',
          isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-black/20 text-white'
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      <div className={cn('flex items-center gap-2 transition-opacity duration-300', isScrolled ? 'opacity-100' : 'opacity-0')}>
        <span className="font-bold text-sm text-gray-900 truncate max-w-[150px]">{activity.name}</span>
      </div>

      <div
        className={cn(
          'p-2 rounded-full backdrop-blur-md transition-colors',
          isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-black/20 text-white'
        )}
      >
        <Share2 className="w-5 h-5" />
      </div>
    </div>
  );
}
