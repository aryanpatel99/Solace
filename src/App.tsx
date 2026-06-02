import './App.css'
import Countdown from './components/Countdown.js'
import DotCalendar from './components/DotCalendar.js'
import Header from './components/Header.js'
import YearProgress from './components/YearProgress.js'
import ShortcutDock from './components/ShortcutDock.js'
import ModeToggle from './components/ModeToggle.js'
import Greeting from './components/Greeting.js'
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
      <div className='flex flex-row items-center justify-center bg-stone-200 dark:bg-black min-h-screen gap-7 overflow-x-hidden p-4 transition-colors duration-300 '>
        <div className='flex  items-center justify-center gap-10 w-full max-w-6xl px-2 border border-stone-200 dark:border-neutral-800 rounded-lg py-2'>

          <div className='flex items-center justify-center gap-10 w-full max-w-6xl px-2 border border-stone-200 dark:border-neutral-800 rounded-lg py-10'>
            {/* left */}
            <div className='fixed top-6 right-8'>
              <ModeToggle />
            </div>
            <div className='flex flex-col  items-start justify-center'>
              <Header date={formattedDate} />
              <Greeting now={now} />
              <Countdown daysLeft={daysLeft} timeLeft={timeLeft} />
              <YearProgress progress={progress} year={now.getFullYear()} />
            </div>
            {/* right */}
            <div className='px-4'>
              <DotCalendar year={now.getFullYear()} currentDate={now} />
            </div>

          </div>
        </div>
      </div>

      <ShortcutDock />

      {/* <div className='flex flex-col items-center justify-center bg-white dark:bg-black/50 min-h-screen gap-6 overflow-x-hidden p-4 transition-colors duration-300'>
      <div className='fixed top-6 right-8'>
        <ModeToggle />
      </div>
      <Header date={formattedDate}/>
      <Greeting now={now}/>
      <Countdown daysLeft={daysLeft} timeLeft={timeLeft}/>
      <YearProgress progress={progress} year={now.getFullYear()}/>
      <DotCalendar year={now.getFullYear()} currentDate={now}/>
      <ShortcutDock />
    </div> */}
    </>
  )
}

export default App
