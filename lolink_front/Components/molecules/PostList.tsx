import React from 'react'
import TypoP from '../atoms/TypoP'

const PostList = () => {
  return (
    <li className='flex w-full p-6 m-6 text-left border rounded-lg border-green'>
      <div className='w-20 h-20 mr-4 bg-black'>image</div>
      <div className='flex items-center justify-between w-full'>
        <TypoP text='title' />
        <span className=''>nickname</span>
        <span>date</span>
      </div>
    </li>
  )
}

export default PostList