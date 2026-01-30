import { Skeleton } from '@/components/ui/skeleton';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';

export default function Loading() {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* Top Spacing */}
      <div className="h-[25px] md:h-0" />

      {/* Hero Skeleton */}
      <div className="relative h-[650px] md:h-screen w-full bg-gray-100 mb-10">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Quick Access Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative -mt-20 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32 rounded-2xl bg-white shadow-lg" />
          ))}
        </div>
      </div>

      {/* Sections Skeleton */}
      {[1, 2].map(section => (
        <section key={section} className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-64" />
            </div>
            <Skeleton className="h-6 w-24 hidden md:block" />
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
        </section>
      ))}

      <div className="py-20" />
      <Footer />
    </div>
  );
}
