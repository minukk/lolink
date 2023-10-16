import React, { useMemo, useState } from 'react'
import Link from 'next/link';
import TypoP from '../atoms/TypoP'
import { BiHeart, BiFlag, BiMoney, BiSolidHeart } from 'react-icons/bi';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getUserInfo } from '@/pages/api/user';
import { ILike } from '@/types/like';
import { displayCreatedAt } from '@/utils/dateForm';

const ProductBox = ({ ...item }) => {
  const { data: userData, isLoading: userLoading } = useQuery(['users'], getUserInfo);
  const { id, title, createdAt, nickname, location, location_detail, like, price, imageUrls } = item;

  const productPrice = price?.toLocaleString('ko-KR') || 0;
  const imageUrl = imageUrls?.split(',')[0];

  const isLike = userData?.data?.likes?.some((like: ILike) => like.productId === id && like.type === 'like');

  return (
    <Link href={`/products/${id}`} className='rounded-lg hover:shadow-lg hover:translate-y-[-2px] transition-transform duration-300'>
      <li className='m-8 text-lg text-left list-none rounded-lg w-80'>
        <div className='relative my-2 bg-black rounded-lg w-80 h-80'>
          {imageUrl &&
            <Image alt={title} src={imageUrl} fill className='rounded-lg' sizes='320'/>
          }   
        </div>
        <div className='flex'>
          <p className='mt-2 mr-4'>{title}</p>
          <span className='text-gray'>{nickname}</span>
        </div>
        <div className='flex items-center mt-2'>
          <BiMoney className='mr-2 text-green' />
          <TypoP text={`${productPrice} 원`} />
        </div>
        <div className='flex items-center mt-2'>
          <BiFlag className='mr-2 text-sky' />
          <TypoP text={location} />
          <span className='mx-2'>{location_detail}</span>
        </div>
        <div className='flex items-center mt-2'>
          {isLike 
            ? <BiSolidHeart className='mr-2 text-red'/>
            : <BiHeart className='mr-2 text-red'/>
          }
          <TypoP text={like} />
        </div>
        <div className='px-2 text-right text-gray'>
          <p>{displayCreatedAt(createdAt)}</p>
        </div>
      </li>
    </Link>
  )
}

export default ProductBox