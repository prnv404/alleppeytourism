import { Check, X } from 'lucide-react';

export function HouseboatInclusions() {
    const inclusions = [
        'Welcome Drink on Arrival',
        'All Meals (Lunch, Dinner, Breakfast)',
        'Evening Tea/Coffee with Snacks',
        'Cruise, Crew & Fuel Charges',
        'Clean Bed Linen, Towels & Toiletries',
    ];

    const exclusions = [
        'Alcohol & Soft Drinks',
        'Airport / Hotel Transfers',
        'Special Dishes / Seafood Promos',
        'Laundry Service',
        'Tips & Gratuities',
    ];

    return (
        <div className="mt-8 py-8 border-t border-gray-100">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-8 tracking-tight">What&apos;s Included</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Inclusions */}
                <div>
                    <h4 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                        </span>
                        Inclusions
                    </h4>
                    <ul className="space-y-3">
                        {inclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Exclusions */}
                <div>
                    <h4 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                            <X className="w-3.5 h-3.5 text-red-700 stroke-[3]" />
                        </span>
                        Exclusions
                    </h4>
                    <ul className="space-y-3">
                        {exclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <X className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                                <span className="text-gray-500 font-medium text-sm md:text-base">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
