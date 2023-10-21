import React from 'react'
import Typograph from '../atoms/Typograph'

const TopPost = () => {
  return (
    <article className='flex justify-center py-24 lg:flex-wrap sm:py-0 sm:mb-24'>
      <div className='my-4 mr-4 border-2 rounded-lg w-160 h-128 lg:w-full border-sky lg:mr-0 lg:h-80 sm:my-0 sm:rounded-none'>
        <Typograph tag='h3' secondary>인기글</Typograph>
      </div>
      <div className='my-4 border-2 rounded-lg w-160 h-128 lg:w-full border-sky lg:h-80 sm:my-0 sm:rounded-none'>
        <Typograph tag='h3' secondary>최신글</Typograph>
      </div>
    </article>
  )
}

export default TopPost