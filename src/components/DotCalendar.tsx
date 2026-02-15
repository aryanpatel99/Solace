import { useMemo } from 'react'
import { formatMonthDay } from '../utils/dateUtils';
import TooltipDot from './TooltipDot';
import type { DotStatus } from '../types/dot';

interface DotCalenderProps {
    totalDays: number;
    currentDay: number;
    year: number;
}

export default function DotCalender({totalDays, currentDay, year}: DotCalenderProps) {
    const dots = useMemo(()=>{
        return Array.from({length: totalDays}, (_, i) => {
            const dayNumber = i + 1;

            const date = new Date(year, 0, dayNumber); // January 1st of the year + dayNumber
            const dateLabel = formatMonthDay(date);

            let status: DotStatus = "future"; // default to future

            if(dayNumber < currentDay) {
                status = "passed";
            }else if(dayNumber === currentDay) {
                status = "today";
            }

            return { id: i, status, dateLabel };

        })
    }, [totalDays, currentDay, year]);

  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-6xl">
      {dots.map((dot) => (
        <TooltipDot
          key={dot.id}
          status={dot.status}
          dateLabel={dot.dateLabel}
        />
      ))}
    </div>
  )
}

// export default DotCalender