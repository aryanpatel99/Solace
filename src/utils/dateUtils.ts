// Firstly think of what are the requirements - 
// 1.Today's date in the format of "Sat, Jan 1, 2022"
// 2. Number of days left
// 3. Time left for the next day in the format of "5 hours, 30 minutes, 20 seconds remaining"
// 4. Percentage of year completed


// is leap year function
export const isLeapYear = (year:number):boolean =>{
    return (year % 4 === 0 && year % 100 !==0 ) || (year % 400 === 0);
}

// get total days in a year
export const getTotalDaysInYear = (year:number):number =>{
    return isLeapYear(year) ? 366 : 365; 
}

// get day of the year
// Jan 1 → Day 1
// Feb 1 → Day 32
// Dec 31 → Day 365 (or 366 in leap year)

export const getDayOfYear = (date:Date):number =>{
    const start = new Date(date.getFullYear(),0,1);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;

    return Math.floor(diff/oneDay) + 1; // +1 because we want to include the current day
}

// get day left in the year
// If today is:
// Jan 1 → ~365 days left
// Dec 31 → ~1 day left
// Dec 31 late night → still counts properly
export const getDaysLeftInYear = (date:Date):number =>{
    const end = new Date(date.getFullYear()+1,0,1); // Jan 1 of next year
    const diff = end.getTime() - date.getTime();
    const oneDay = 1000 * 60 * 60 * 24;

    return Math.ceil(diff/oneDay); // ceil to count the current day if it's not over yet
}

// get time left for the next day
// If it's 11:00 PM → 1 hour left
// If it's 11:59 PM → 1 minute left

export const getTimeLeftToday = (date:Date):string =>{
    const nextMidnight =  new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1); // next day at 00:00
    const diff = nextMidnight.getTime() - date.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m remaining`;
}

// year progress percentage
// If it's Jan 1 → 0% completed
// If it's Dec 31 → 100% completed
export const getYearProgress = (date:Date):number =>{
    const total = getTotalDaysInYear(date.getFullYear());
    const current = getDayOfYear(date) - 1; // -1 because we want to count completed days only

    return Math.floor((current / total) * 100);
}

// formatting
export const formatFullDate = (date:Date):string =>{
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}