

const Header = ({ date }: { date: string }) => {
  return (
    <div className='text-neutral-500 dark:text-neutral-500 font-medium  tracking-wider'>{date}</div>
  )
}

export default Header