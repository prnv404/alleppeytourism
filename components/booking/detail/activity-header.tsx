import { MapPin, Star } from "lucide-react";
import { Activity } from "@/lib/packages-data";

interface ActivityHeaderProps {
    activity: Activity;
}

export function ActivityHeader({ activity }: ActivityHeaderProps) {
    return (
        <div className="hidden md:block mb-10 border-b border-gray-100 pb-8">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase mb-2 block">Premium Experience</span>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4">{activity.name}</h1>
                    <div className="flex items-center gap-6 text-gray-500">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                            <MapPin className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium text-gray-700">Alleppey Backwaters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                                ))}
                            </div>
                            <span className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4">120+ Happy Travelers</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-amber-700">4.8 Rating</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
