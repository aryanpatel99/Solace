import type { DotStatus } from "../types/dot";

interface TooltipDotProps {
    status: DotStatus;
    dateLabel: string;
}

export default function TooltipDot({ status, dateLabel }: TooltipDotProps) {
    const base = "rounded-full transition-all duration-300 ease-in-out";
    const size = "w-2 h-2";

    let color = "";

    if (status === "passed") {
        color = "bg-stone-500 dark:bg-zinc-400";
    } else if (status === "today") {
        color = "bg-stone-800 dark:bg-white scale-125 shadow-[0_0_8px_rgba(0,0,0,0.15)] dark:shadow-[0_0_8px_rgba(255,255,255,0.3)] animate-pulse shadow-slate-900/30 ";
    } else {
        color = "bg-stone-100 border border-stone-200 dark:bg-zinc-900 dark:border-zinc-800/60 rounded-full shadow-sm";
    }

    return (
        <div className="relative group">
            <div className={`${base} ${size} ${color}`} />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1
                            bg-stone-800 dark:bg-zinc-800 text-xs text-stone-100 dark:text-zinc-200
                            rounded-full opacity-0 group-hover:opacity-100 transition z-10 pointer-events-none whitespace-nowrap">
                {dateLabel}
            </div>
        </div>
    );
}
