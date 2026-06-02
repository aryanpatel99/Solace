const Countdown = ({ daysLeft, timeLeft }: { daysLeft: number, timeLeft: string }) => {
  return (
    <div className='flex flex-col items-start space-y-1 justify-center'>
      <div style={{ fontFamily: 'var(--font-primary)' }} className='text-5xl sm:text-6xl md:text-6xl text-center text-stone-700 dark:text-neutral-300 tracking-tight '>{daysLeft} {daysLeft === 1 ? 'Day' : 'Days'} Left</div>
      <div className='text-stone-500  dark:text-neutral-400/70 mb-2'>{timeLeft}</div>
    </div>
  )
}

export default Countdown