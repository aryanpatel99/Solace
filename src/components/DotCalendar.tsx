import { useMemo } from "react";
import TooltipDot from "./TooltipDot";
import { MONTHS, getDaysInMonth } from "../utils/dateUtils";
import type { DotStatus } from "../types/dot";

interface DotCalendarProps {
  year: number;
  currentMonth: number;
  currentDay: number;
}

export default function DotCalendar({
  year,
  currentMonth,
  currentDay,
}: DotCalendarProps) {
  const monthGrid = useMemo(() => {
    return MONTHS.map((monthName, monthIndex) => {
      const totalDays = getDaysInMonth(year, monthIndex);

      const days = Array.from({ length: totalDays }, (_, i) => {
        const dayNumber = i + 1;

        let status: DotStatus = "future";

        if (monthIndex < currentMonth) status = "passed";
        else if (monthIndex === currentMonth) {
          if (dayNumber < currentDay) status = "passed";
          else if (dayNumber === currentDay) status = "today";
        }

        return {
          id: `${monthIndex}-${dayNumber}`,
          status,
          dateLabel: `${monthName} ${dayNumber}`,
        };
      });

      return { monthName, days };
    });
  }, [year, currentMonth, currentDay]);

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-6xl">
      {monthGrid.map((month) => (
        <div key={month.monthName} className="flex flex-col gap-3">
          <span className="text-xs text-zinc-500 tracking-widest uppercase">
            {month.monthName}
          </span>

          <div className="flex flex-wrap gap-2">
            {month.days.map((day) => (
              <TooltipDot
                key={day.id}
                status={day.status}
                dateLabel={day.dateLabel}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
