import Link from 'next/link';
import { BiUserCircle } from 'react-icons/bi';

const UserIcon = () => {
  return (
    <Link href='/profile'>
      <div className='mx-4'>
        <i className='text-white text-3xl md:text-5xl'><BiUserCircle /></i>
      </div>
    </Link>
  )
}

export default UserIcon;