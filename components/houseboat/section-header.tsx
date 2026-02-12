import { cn } from '@/lib/utils';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    className?: string;
    children?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, badge, className, children }: SectionHeaderProps) {
    return (
        <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8", className)}>
            <div className="space-y-2">
                {badge && (
                    <span className="inline-block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide mb-1">
                        {badge}
                    </span>
                )}
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{title}</h2>
                {subtitle && <p className="text-lg text-gray-500 font-medium max-w-xl">{subtitle}</p>}
            </div>
            {children}
        </div>
    );
}
