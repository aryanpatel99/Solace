import React from 'react'

const YearProgress = ({ progress, year }: { progress: number, year: number }) => {
  return (
    <div className='text-white'>
      <div className='text-xs text-neutral-600 font-normal'>{progress}% of {year} Completed</div>
    </div>
  )
}

export default YearProgress