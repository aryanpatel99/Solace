import { useEffect, useState } from "react"

export const useTime = (intervalMs: number = 60000) => {
    const [now, setNow] = useState<Date>(new Date());

    useEffect(()=>{
        const timer = setInterval(()=>{
            setNow(new Date());
        },intervalMs);

        return () => clearInterval(timer);
    },[intervalMs]);

    return now;
}