const YearProgress = ({ progress, year }: { progress: number, year: number }) => {
  return (
    <div className='text-white'>
      <div className='text-xs text-stone-500/90 dark:text-neutral-500 font-normal'>{progress}% of {year} Completed</div>
    </div>
  )
}

export default YearProgress