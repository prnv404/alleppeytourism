import { cn } from '@/lib/utils';

interface SectionDividerProps {
    title: string;
    className?: string;
    lineClassName?: string;
}

export function SectionDivider({ title, className, lineClassName }: SectionDividerProps) {
    return (
        <div className={cn("flex items-center gap-4 w-full", className)}>
            <h3 className="text-xl font-bold text-gray-900 whitespace-nowrap">
                {title}
            </h3>
            <div className={cn("h-px bg-gray-200 flex-grow rounded-full", lineClassName)} />
        </div>
    );
}
