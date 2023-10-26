import React from 'react'
import Typograph from '../Atoms/Typograph';

interface IProps {
  title: string;
}

const MainPostList = ({ title }: IProps) => {
  return (
    <section className='p-10 my-8 text-center sm:p-2'>
      <Typograph tag='h3'>{title}</Typograph>
      <div className='flex flex-wrap justify-center my-8'>
        {Array(5).fill().map((e, i) => (
          <div key={i} className='relative m-8 border-2 rounded-md w-80 h-80 lg:m-2'>
            <div className=''>Image</div>
            <p className='absolute text-white bg-black bottom-2 w-80 opacity-70'>Text</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MainPostList