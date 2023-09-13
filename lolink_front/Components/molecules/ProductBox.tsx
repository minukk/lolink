import React from 'react'
import TypoP from '../atoms/TypoP'

const ProductBox = () => {
  return (
    <div className='w-80 h-96 m-8 rounded-lg text-left'>
      <div className='bg-black w-80 h-80 rounded-lg my-2'>Image</div>
      <TypoP text='Title' />
      <TypoP text='Price' />
      <TypoP text='Location' />
      <TypoP text='관심 & 좋아요' />
    </div>
  )
}

export default ProductBox