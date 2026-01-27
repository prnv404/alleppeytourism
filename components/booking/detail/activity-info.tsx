import { Info } from "lucide-react";
import { Activity } from "@/lib/packages-data";

interface ActivityInfoProps {
    activity: Activity;
}

export function ActivityInfo({ activity }: ActivityInfoProps) {
    return (
        <div className="prose prose-gray max-w-none pt-4 md:pt-0 border-t md:border-none border-gray-100">
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                Experience Details
            </h3>
            <p className="text-sm md:text-lg text-gray-600 leading-relaxed font-medium">
                {activity.description}
            </p>
        </div>
    );
}
