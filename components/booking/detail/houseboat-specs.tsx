import { Ship, Shield, Zap, Anchor, Users, Music, UtensilsCrossed } from 'lucide-react';

export function HouseboatSpecs() {
    const specs = [
        {
            icon: Ship,
            label: 'Boat Type',
            value: 'Houseboat',
            subtext: 'Certified Safety',
        },
        {
            icon: Shield,
            label: 'Tourism Dept.',
            value: 'Approved & Licensed',
            subtext: 'Official Certification',
        },
        {
            icon: Zap,
            label: 'Power & AC',
            value: 'Silent Generator',
            subtext: '+ Battery Backup',
        },
        {
            icon: Anchor,
            label: 'Deck',
            value: 'Upper Deck',
            subtext: '& Sunbeds Available',
        },
        {
            icon: Users,
            label: 'Crew',
            value: 'Captain, Chef',
            subtext: '& Engine Driver',
        },
        {
            icon: Shield,
            label: 'Safety',
            value: 'Life Jackets',
            subtext: 'Fire Extinguishers, First Aid',
        },
        {
            icon: Music,
            label: 'Entertainment',
            value: 'Bluetooth Sound',
            subtext: 'TV in Dining Area',
        },
        {
            icon: UtensilsCrossed,
            label: 'Food',
            value: 'Veg, Non-Veg',
            subtext: '& Seafood Options',
        },
    ];

    return (
        <div className="mt-12 py-8 border-t border-gray-100">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-8 tracking-tight">Boat Specifications</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                {specs.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0 text-emerald-600">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                            <h4 className="text-base font-bold text-gray-900 leading-tight">{item.value}</h4>
                            <p className="text-xs font-medium text-gray-500 mt-0.5">{item.subtext}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
