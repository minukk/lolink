import Link from 'next/link';
import { BiSolidChat } from 'react-icons/bi';

const ChatIcon = () => {
  return (
    <Link href='/chat'>
      <div className='mx-4'>
        <i className='text-5xl text-sky 2xl:text-3xl lg:hidden'><BiSolidChat /></i>
      </div>
    </Link>
  )
}

export default ChatIcon;