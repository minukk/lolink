import React from 'react'
import TypoP from '../atoms/TypoP'

const PostList = () => {
  return (
    <li className='flex border border-green w-4/5 text-left m-6 p-6 rounded-lg'>
      <div className='w-20 h-20 bg-black mr-4'>image</div>
      <div className='w-full flex justify-between items-center'>
        <TypoP text='title' />
        <span className=''>nickname</span>
        <span>date</span>
      </div>
    </li>
  )
}

export default PostList