const Countdown = ({ daysLeft, timeLeft }: { daysLeft: number, timeLeft: string }) => {
  return (
    <div className='text-white flex flex-col items-center space-y-1 justify-center'>
      <div style={{ fontFamily: 'var(--font-primary)' }} className='text-5xl sm:text-6xl md:text-7xl text-center text-neutral-300 tracking-tight mb-3'>{daysLeft} {daysLeft === 1 ? 'Day' : 'Days'} Left</div>
      <div className='text-neutral-400/70'>{timeLeft}</div>
    </div>
  )
}

export default Countdown