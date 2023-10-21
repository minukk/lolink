import Image from 'next/image'
import React from 'react'
import bg01 from '../../public/images/bg-image01.jpg';

const MainImage = () => {
  return (
    <section className='flex py-44 justify-evenly bg-gradient-to-r from-bg-5 via-bg-3 to-bg-1'>
      <div className='flex flex-wrap items-center text-white'>
        <b className='text-5xl font-bold leading-loose tracking-widest whitespace-pre-wrap lg:text-3xl sm:text-base'>지금 여러분의<br/>주변과 LINK하세요!</b>
      </div>
    </section>
  )
}

export default MainImage