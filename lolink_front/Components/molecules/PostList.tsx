import React from 'react'
import Link from 'next/link';
import TypoP from '../atoms/TypoP'
import { displayCreatedAt } from '../../utils/dateForm';

const PostList = ({ ...item }) => {
  const { id, title, updatedAt, nickname } = item;

  return (
    <Link href={`/posts/${id}`} className='w-full'>
      <li className='flex p-6 my-4 text-left border rounded-lg border-green hover:text-white hover:bg-green'>
        <div className='w-20 h-20 mr-4 bg-black'>image</div>
        <div className='flex items-center justify-between w-full'>
          <TypoP text={title} />
          <div className='flex items-center'>
            <span className=''>{nickname}</span>
            <p className='mx-4'> | </p>
            <div className='px-2 text-center text-gray'>
              <p>{displayCreatedAt(updatedAt)}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default PostList