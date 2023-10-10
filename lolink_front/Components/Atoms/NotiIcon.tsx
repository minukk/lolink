import Link from 'next/link';
import { BiSolidBell } from 'react-icons/bi';

const NotiIcon = () => {
  return (
    <Link href='/profile'>
      <div className='mx-4'>
        <i className='text-5xl text-sky 2xl:text-3xl lg:hidden'><BiSolidBell /></i>
      </div>
    </Link>
  )
}

export default NotiIcon;