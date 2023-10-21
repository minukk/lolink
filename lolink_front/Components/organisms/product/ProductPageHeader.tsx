import React from 'react'
import Typograph from '../../atoms/Typograph'
import { BiChat, BiFlag, BiHeart, BiMoney, BiShow, BiSolidHeart, BiTimeFive } from 'react-icons/bi'
import { displayCreatedAt } from '../../../utils/dateForm'

interface ProductPageHeaderProps {
  title: string;
  nickname: string;
  price: number;
  createdAt: Date;
  views: number;
  isLiked: boolean;
  like: number;
  location: string;
  location_detail: string;
}

const ProductPageHeader: React.FC<ProductPageHeaderProps> = ({ title, nickname, price, createdAt, views, isLiked, like, location, location_detail }) => {
  return (
    <>
      <Typograph tag='h3'>{title}</Typograph>
      <div className='flex items-center'>
        <span className='mr-8 text-xl text-gray'>{nickname}</span>
        <div className='flex items-center text-xl font-bold text-green'>
          <BiMoney />
          <span className='mx-2'>{price.toLocaleString('ko-KR')} 원</span>
        </div>
      </div>
      <div className='flex items-center my-4'>
        <div className='flex items-center text-gray'>
          <BiTimeFive />
          <span className='mx-2'>{displayCreatedAt(createdAt)}</span>
        </div>
        <div className='flex items-center text-gray'>
          <BiShow />
          <span className='mx-2'>{views}</span>
        </div>
        <div className='flex items-center mx-2 text-red'>
          {isLiked ? <BiSolidHeart /> : <BiHeart />}
          <span className='mx-2'>{like}</span>
        </div>
        <div className='flex items-center mx-2 text-sky'>
          <BiFlag />
          <span className='mx-2'>{location}</span>
          <span className='mr-2'>{location_detail}</span>
        </div>
        <div className='flex items-center mx-2 text-green'>
          <BiChat />
          <span className=''>채팅</span>
        </div>
      </div>
    </>
  )
}

export default ProductPageHeader