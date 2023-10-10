import React from 'react'
import TypoP from '../atoms/TypoP'

const ProductBox = () => {
  const images = [];

  return (
    <li className='m-8 text-left list-none rounded-lg w-80 h-96'>
      <div className='my-2 bg-black rounded-lg w-80 h-80'>Image</div>
      <TypoP text='Title' />
      <TypoP text='Price' />
      <TypoP text='Location' />
      <TypoP text='관심 & 좋아요' />
    </li>
  )
}

export default ProductBox