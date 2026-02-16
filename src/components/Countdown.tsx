const Countdown = ({ daysLeft, timeLeft }: { daysLeft: number, timeLeft: string}) => {
  return (
    <div className='text-white flex flex-col items-center space-y-2 justify-center'>
      <div className='text-7xl font-medium'>{daysLeft} {daysLeft === 1 ? 'Day' : 'Days'} Left</div>
      <div className='text-neutral-400/70'>{timeLeft}</div>
    </div>
  )
}

export default Countdown