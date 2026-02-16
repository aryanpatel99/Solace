import './App.css'
import Countdown from './components/Countdown.js'
import DotCalender from './components/DotCalendar.js'
import Header from './components/Header.js'
import YearProgress from './components/YearProgress.js'
import { useTime } from './hooks/useTime.js'
import { formatFullDate, getDayOfYear, getDaysLeftInYear, getTimeLeftToday, getTotalDaysInYear, getYearProgress } from './utils/dateUtils.js'

function App() {
  const now = useTime()

  const totalDays = getTotalDaysInYear(now.getFullYear())
  const currentDay = getDayOfYear(now);
  const daysLeft = getDaysLeftInYear(now);
  const progress = getYearProgress(now);
  const timeLeft = getTimeLeftToday(now);
  const formattedDate = formatFullDate(now);

  return (
    <>
    <div className='flex flex-col items-center justify-center bg-black min-h-screen gap-8 overflow-x-hidden p-4'>
      <Header date={formattedDate}/>
      <Countdown daysLeft={daysLeft} timeLeft={timeLeft}/>
      <YearProgress progress={progress} year = {now.getFullYear()}/>
      <DotCalender totalDays={totalDays} currentDay={currentDay} year={now.getFullYear()}/>
    </div>

    </>
  )
}

export default App
