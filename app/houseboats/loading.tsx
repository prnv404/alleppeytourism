import { Skeleton } from '@/components/ui/skeleton';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';

export default function Loading() {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* Top Spacing for Fixed Navbar */}
      <div className="h-[25px] md:h-[60px]" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Skeleton */}
        <div className="mb-10 hidden md:block">
          <Skeleton className="w-full aspect-[32/9] rounded-2xl" />
        </div>

        {/* Filter Skeleton */}
        <div className="max-w-7xl mx-auto pt-8 pb-4 mb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-24 hidden md:block" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full hidden md:block" />
              <Skeleton className="h-9 w-24 rounded-full hidden md:block" />
            </div>
          </div>
        </div>

        {/* Shared Houseboats Section Skeleton */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-7 w-48" />
          </div>
          {/* Listings Grid Skeleton - Mobile Scroll / Desktop Grid */}
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-4 md:gap-6 md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="min-w-[280px] md:w-auto shrink-0 md:shrink">
                <Skeleton className="aspect-square rounded-xl w-full mb-3" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-5 w-10" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <div className="flex items-end gap-2 mt-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Houseboats Section Skeleton */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-7 w-48" />
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-4 md:gap-6 md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="min-w-[280px] md:w-auto shrink-0 md:shrink">
                <Skeleton className="aspect-square rounded-xl w-full mb-3" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-5 w-10" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <div className="flex items-end gap-2 mt-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
