import { MapPin, Star, ShieldCheck, Award } from "lucide-react";
import { Activity } from "@/lib/packages-data";

interface ActivityHeaderProps {
    activity: Activity;
}

export function ActivityHeader({ activity }: ActivityHeaderProps) {
    return (
        <div className="hidden md:block mb-8">
            <div className="flex items-start justify-between">
                <div className="space-y-4">
                    {/* Breadcrumb-ish / Badge */}
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                            Signature
                        </span>
                        <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-xs font-bold text-gray-400 ml-2 text-black/60">4.96 (128 Reviews)</span>
                        </div>
                    </div>

                    <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-[1.1]">
                        {activity.name}
                    </h1>

                    <div className="flex items-center gap-8 pt-2">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="p-2 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors">
                                <MapPin className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                                <p className="text-sm font-bold text-gray-900">Alleppey Backwaters</p>
                            </div>
                        </div>

                        <div className="w-px h-8 bg-gray-100" />

                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                                <ShieldCheck className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Safety</p>
                                <p className="text-sm font-bold text-gray-900">100% Verified</p>
                            </div>
                        </div>

                        <div className="w-px h-8 bg-gray-100" />

                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="p-2 bg-amber-50 rounded-full group-hover:bg-amber-100 transition-colors">
                                <Award className="w-4 h-4 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Experience</p>
                                <p className="text-sm font-bold text-gray-900">Premium Tier</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
