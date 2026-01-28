import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50/50 pb-24 md:pb-12 md:pt-24 font-sans">
            <Navbar className="hidden md:block" />

            {/* Mobile Header Skeleton */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white z-50 flex items-center px-4 border-b border-gray-100">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-32 ml-4" />
            </div>

            <main className="max-w-7xl mx-auto md:px-6 md:pt-8 min-h-screen">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column: Content */}
                    <div className="flex-1 w-full">
                        {/* Activity Hero Skeleton */}
                        <div className="relative w-full h-[50vh] md:h-[600px] md:rounded-[1rem] overflow-hidden mb-8">
                            <Skeleton className="w-full h-full" />
                        </div>

                        {/* Content Container */}
                        <div className="relative z-10 -mt-4 md:mt-10 bg-white rounded-t-[1.5rem] md:rounded-none px-5 py-6 md:p-0 md:bg-transparent">
                            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6 md:hidden" />

                            {/* Header Info */}
                            <div className="mb-8">
                                <div className="flex gap-2 mb-4">
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                </div>
                                <Skeleton className="h-10 w-3/4 mb-2" />
                                <Skeleton className="h-5 w-1/2 mb-6" />
                            </div>

                            {/* Highlights Grid Skeleton */}
                            <div className="mb-8">
                                <Skeleton className="h-4 w-24 mb-4" />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="h-16 rounded-2xl bg-gray-100 border border-gray-100 p-2 flex items-center gap-3">
                                            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                                            <div className="space-y-1 w-full">
                                                <Skeleton className="h-3 w-3/4" />
                                                <Skeleton className="h-2 w-1/2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description Text */}
                            <div className="space-y-4 mb-8">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Sidebar (Desktop) */}
                    <div className="hidden lg:block lg:w-[380px] lg:shrink-0">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-[1rem] shadow-xl border border-gray-100 p-6 h-[500px]">
                                <Skeleton className="h-8 w-1/2 mb-2" />
                                <Skeleton className="h-4 w-1/3 mb-8" />

                                <Skeleton className="h-12 w-full rounded-xl mb-4" />
                                <Skeleton className="h-12 w-full rounded-xl mb-6" />

                                <div className="space-y-3 mb-8">
                                    <Skeleton className="h-10 w-full rounded-xl" />
                                    <Skeleton className="h-10 w-full rounded-xl" />
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    <Skeleton className="h-12 flex-1 rounded-xl" />
                                    <Skeleton className="h-12 flex-1 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
