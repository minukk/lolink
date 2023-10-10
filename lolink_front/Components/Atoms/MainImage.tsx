import Image from 'next/image'
import React from 'react'
import bg01 from '../../public/images/bg-image01.jpg';

const MainImage = () => {
  return (
    <section className='flex py-44 justify-evenly bg-sky'>
      <div className='flex flex-wrap items-center text-white'>
        <p className='text-5xl font-bold leading-loose tracking-widest whitespace-pre-wrap lg:text-3xl sm:text-base'>지금 여러분의<br/>주변과 LINK하세요!</p>
      </div>
      {/* <div className='relative w-1/2 lg:1/3 sm:1/5'>
        <Image src={bg01} alt='main image' fill priority objectFit='cover'/>
      </div> */}
    </section>
  )
}

export default MainImage