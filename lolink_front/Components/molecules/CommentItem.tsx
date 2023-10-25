import { displayCreatedAt } from '@/utils/dateForm';
import React from 'react'

const CommentItem = ({ ...item }: any) => {
  const { content, createdAt } = item;

  return (
    <li className='flex flex-wrap items-center justify-between py-2'>
      <div className='w-full'>
        <span className='mx-2 font-bold'>닉네임</span>
        <span className='text-gray'>{displayCreatedAt(createdAt)}</span>
      </div>
      <p className='px-2'>{content}</p>
    </li>
  )
}

export default CommentItem