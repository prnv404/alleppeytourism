import { Sparkles } from "lucide-react";

interface ActivityHighlightsProps {
    features: string[];
}

export function ActivityHighlights({ features }: ActivityHighlightsProps) {
    return (
        <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Highlights</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory">
                {features.map((feature, idx) => (
                    <div key={idx} className="min-w-[140px] md:min-w-[160px] snap-center bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center gap-3 hover:border-emerald-200 hover:shadow-md transition-all group">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-gray-900 uppercase tracking-wide leading-tight">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
