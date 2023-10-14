import React from 'react'
import Link from 'next/link';
import TypoP from '../atoms/TypoP'
import { IProduct } from '@/types/product';
import { BiHeart, BiFlag, BiMoney } from 'react-icons/bi';
import Image from 'next/image';

const ProductBox = ({ ...item }) => {
  const { id, title, updatedAt, nickname, location, location_detail, like, price, imageUrls } = item;

  const productPrice = price?.toLocaleString('ko-KR') || 0;
  const imageUrl = imageUrls?.split(',')[0];

  return (
    <Link href={`/products/${id}`} className='rounded-lg hover:shadow-lg hover:translate-y-[-2px] transition-transform duration-300'>
      <li className='m-8 text-lg text-left list-none rounded-lg w-80'>
        <div className='relative my-2 bg-black rounded-lg w-80 h-80'>
          {imageUrl &&
            <Image alt={title} src={imageUrl} layout="fill" objectFit='cover' className='rounded-lg' sizes='320'/>
          }   
        </div>
        <div className='flex'>
          <p className='mr-4'>{title}</p>
          <span className='text-gray'>{nickname}</span>
        </div>
        <div className='flex items-center'>
          <BiMoney className='mr-2 text-green' />
          <TypoP text={`${productPrice} 원`} />
        </div>
        <div className='flex items-center'>
          <BiFlag className='mr-2 text-sky' />
          <TypoP text={location} />
          <span className='mx-2'>{location_detail}</span>
        </div>
        <div className='flex items-center'>
          <BiHeart className='mr-2 text-red'/>
          <TypoP text={like} />
        </div>
      </li>
    </Link>
  )
}

export default ProductBox