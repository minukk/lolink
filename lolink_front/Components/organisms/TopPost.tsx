import React from 'react'

const TopPost = () => {
  return (
    <article className='flex justify-center py-24 lg:flex-wrap md:py-4'>
      <div className='my-4 mr-4 border-2 rounded-lg w-160 lg:w-4/5 h-128 border-sky md:mr-0 lg:h-80'>
        <h3 className='p-4 text-xl text-white bg-sky'>인기글</h3>
      </div>
      <div className='my-4 border-2 rounded-lg w-160 lg:w-4/5 h-128 border-sky lg:h-80'>
        <h3 className='p-4 text-xl text-white bg-sky'>최신글</h3>
      </div>
    </article>
  )
}

export default TopPost