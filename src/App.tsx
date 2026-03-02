import './App.css'
import Countdown from './components/Countdown.js'
import DotCalendar from './components/DotCalendar.js'
import Header from './components/Header.js'
import YearProgress from './components/YearProgress.js'
import { useTime } from './hooks/useTime.js'
import { formatFullDate, getDaysLeftInYear, getTimeLeftToday, getYearProgress } from './utils/dateUtils.js'

function App() {
  const now = useTime()

  const daysLeft = getDaysLeftInYear(now);
  const progress = getYearProgress(now);
  const timeLeft = getTimeLeftToday(now);
  const formattedDate = formatFullDate(now);

  return (
    <>
    <div className='flex flex-col items-center justify-center bg-black min-h-screen gap-6 overflow-x-hidden p-4'>
      <Header date={formattedDate}/>
      <Countdown daysLeft={daysLeft} timeLeft={timeLeft}/>
      <YearProgress progress={progress} year = {now.getFullYear()}/>
      <DotCalendar   year={now.getFullYear()}
  currentDate={now}/>
    </div>

    </>
  )
}

export default App
