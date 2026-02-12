import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function HouseboatHero() {
    return (
        <div className="relative pt-32 pb-12 md:pt-48 md:pb-24 bg-[url('/grid-pattern.svg')] bg-fixed bg-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/20 pointer-events-none" />

            <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-700 tracking-wide uppercase">Welcome to Alleppey</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight mb-6 leading-[1.1]">
                    Experience the Magic of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Backwaters</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
                    Choose from our curated fleet of premium houseboats. Whether you're looking for a romantic private cruise or a fun group adventure, we have the ideal boat for you.
                </p>
            </ScrollReveal>
        </div>
    );
}
