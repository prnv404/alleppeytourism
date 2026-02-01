import { Clock, Anchor, VolumeX, Cigarette, Ban, FileCheck, Wallet, AlertCircle } from 'lucide-react';

export function HouseboatRules() {
    const rules = [
        {
            icon: Clock,
            label: 'AC Timings',
            text: 'AC available between 9 PM and 6 AM',
        },
        {
            icon: Anchor,
            label: 'Cruising',
            text: 'Boats anchor by 5:30 PM as per local gov rules',
        },
        {
            icon: VolumeX,
            label: 'Music',
            text: 'No loud music after 10 PM',
        },
        {
            icon: Cigarette,
            label: 'Smoking',
            text: 'Smoking allowed in designated areas only',
        },
        {
            icon: Ban,
            label: 'Pets',
            text: 'Pets are not allowed on board',
        },
    ];

    return (
        <div className="mt-8 py-8 border-t border-gray-100 space-y-10">

            {/* Header */}
            <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">House Rules & Policies</h3>

            {/* On-Board Rules Grid */}
            <div>
                <h4 className="text-lg font-bold text-gray-800 mb-5">On-Board Rules</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rules.map((rule, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <rule.icon className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                            <div>
                                <p className="font-bold text-gray-900 text-sm">{rule.label}</p>
                                <p className="text-sm text-gray-600 leading-snug">{rule.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Important Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-5">Important Information</h4>

                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-center p-3 bg-emerald-50 rounded-xl border border-emerald-100 min-w-[100px]">
                            <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Check-in</p>
                            <p className="text-2xl font-black text-emerald-600">12:00</p>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-xl border border-red-100 min-w-[100px]">
                            <p className="text-xs font-bold text-red-800 uppercase tracking-wider">Check-out</p>
                            <p className="text-2xl font-black text-red-600">09:00</p>
                        </div>
                    </div>

                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                            <FileCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                            Valid Government ID is mandatory for all guests.
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                            <Wallet className="w-4 h-4 text-emerald-500 shrink-0" />
                            Balance payment must be cleared before check-in.
                        </li>
                        <li className="flex items-start gap-3 text-sm text-amber-800 font-bold bg-amber-50 p-3 rounded-lg border border-amber-100/50">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                            <span className="leading-snug">
                                Note: If you arrive late after the boat has started cruising, a speedboat transfer will be required at an <u>extra charge</u> to board the houseboat.
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Cancellation Policy */}
                <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100">
                    <h4 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Cancellation Policy
                    </h4>
                    <p className="text-sm font-bold text-red-800 mb-3">Standard Cancellation Policy:</p>
                    <ul className="space-y-2">
                        <li className="flex justify-between text-sm">
                            <span className="text-red-700">15 days before</span>
                            <span className="font-bold text-red-900">100% Refund</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-red-700">7 days before</span>
                            <span className="font-bold text-red-900">50% Refund</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-red-700">Less than 7 days</span>
                            <span className="font-bold text-red-900">No Refund</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
