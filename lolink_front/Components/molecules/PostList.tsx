import React from 'react'
import Link from 'next/link';
import { displayCreatedAt, getFormatDate } from '../../utils/dateForm';
import Typograph from '../Atoms/Typograph';

const PostList = ({ ...item }) => {
  const { id, title, createdAt, nickname, views, recommend, category } = item;

  return (
    <Link href={`/posts/${id}`} className='w-full'>
      <li className='flex py-4 text-xl text-left lg:text-base lg:p-2'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex'>
            <div className='px-2 mr-2 border rounded-lg border-gray-5 mobile:hidden'>
              <Typograph tag='p'>카테고리</Typograph>
            </div>  
            <div className='truncate md:w-48'>
              <Typograph tag='h4'>{title}</Typograph>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='mr-4'>
              <Typograph tag='span'>{nickname}</Typograph>
            </div>
            <div className='text-center'>
              <Typograph tag='p'>{getFormatDate(createdAt)[0]}</Typograph>
              <Typograph tag='p'>{getFormatDate(createdAt)[1]}</Typograph>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default PostList