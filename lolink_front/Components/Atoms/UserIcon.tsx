import Link from 'next/link';
import { BiUserCircle } from 'react-icons/bi';

const UserIcon = () => {
  return (
    <Link href='/profile'>
      <div className='mx-4'>
        <i className='text-5xl text-sky 2xl:text-3xl lg:hidden'><BiUserCircle /></i>
      </div>
    </Link>
  )
}

export default UserIcon;