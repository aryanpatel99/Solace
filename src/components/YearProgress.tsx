const YearProgress = ({ progress, year }: { progress: number, year: number }) => {
  return (
    <div className='text-white'>
      <div className='text-xs text-stone-400 dark:text-neutral-600 font-normal'>{progress}% of {year} Completed</div>
    </div>
  )
}

export default YearProgress