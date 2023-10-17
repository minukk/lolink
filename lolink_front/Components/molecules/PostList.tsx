import React from 'react'
import Link from 'next/link';
import TypoP from '../atoms/TypoP'
import { displayCreatedAt, getFormatDate } from '../../utils/dateForm';

const PostList = ({ ...item }) => {
  const { id, title, createdAt, nickname, views, recommend, category } = item;

  return (
    <Link href={`/posts/${id}`} className='w-full'>
      <li className='flex p-6 text-xl text-left text-post-gray hover:text-white hover:bg-sky lg:text-base lg:p-2'>
        <div className='flex items-center justify-between w-full'>
          {/* <TypoP text={title} /> */}
          <div className='flex'>
            {/* <p className='px-2 mr-2 border rounded-lg lg:mr-0'>{category}</p> */}
            <p className='px-2 mr-2 border rounded-lg turncate lg:mr-1 md:w-18'>미스테리</p>
            <h3 className='truncate md:w-48 bg-red'>{title}fdsfasfasdfasdfasdfadsfsdfsdasfdsfsd</h3>
          </div>
          <div className='flex items-center'>
            {/* <span>{nickname}</span> */}
            <span className='truncate md:hidden'>dfodsfdsofsdof |</span>
            <div className='w-20 px-2 text-base text-center lg:px-0'>
              <p>{getFormatDate(createdAt)[0]}</p>
              <p>{getFormatDate(createdAt)[1]}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default PostList