import { Users, Bed, Ship, ChefHat, ShieldCheck, Languages, Sparkles } from "lucide-react";

interface ActivityHighlightsProps {
    specs?: { label: string; value: string; iconKey: string }[];
    features?: string[];
}

const iconMap: Record<string, any> = {
    users: Users,
    bed: Bed,
    boat: Ship,
    chef: ChefHat,
    shield: ShieldCheck,
    language: Languages
};

export function ActivityHighlights({ specs, features }: ActivityHighlightsProps) {
    if (specs && specs.length > 0) {
        return (
            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Highlights</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {specs.map((spec, idx) => {
                        const Icon = iconMap[spec.iconKey] || Sparkles;
                        return (
                            <div key={idx} className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 flex items-start gap-3 hover:border-emerald-100 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-600 shrink-0">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col pt-0.5">
                                    <span className="text-sm font-bold text-gray-900 leading-tight">{spec.value}</span>
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 font-medium leading-tight mt-1">{spec.label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Highlights</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory">
                {features?.map((feature, idx) => (
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
