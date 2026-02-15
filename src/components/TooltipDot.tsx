import type { DotStatus } from "../types/dot";

interface TooltipDotProps {
    status: DotStatus;
    dateLabel : string; // e.g. "Jan 1", "Feb 14", etc.
}

export default function TooltipDot({status, dateLabel}: TooltipDotProps) {
    const base = "rounded-full transition-all duration-300 ease-in-out";
    const size = "w-2 h-2";
    
    let color = "";

    if(status === "passed") {
        color = "bg-zinc-400";
    }else if(status === "today") {
        color = "bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.3)]";
    }else {
        color = "bg-zinc-900 border border-zinc-800/60";
    }
  return (
    <div className="relative group">
      <div className={`${base} ${size} ${color}`} />

      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                      bg-zinc-800 text-xs text-zinc-200 rounded opacity-0 
                      group-hover:opacity-100 transition pointer-events-none">
        {dateLabel}
      </div>
    </div>
  )
}

