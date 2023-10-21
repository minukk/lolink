import React, { useMemo, useState } from 'react'
import Link from 'next/link';
import TypoP from '../atoms/TypoP'
import { BiHeart, BiFlag, BiMoney, BiSolidHeart } from 'react-icons/bi';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getUserInfo } from '@/pages/api/user';
import { ILike } from '@/types/like';
import { displayCreatedAt } from '@/utils/dateForm';
import Typograph from '../atoms/Typograph';

const ProductBox = ({ ...item }) => {
  const { data: userData, isLoading: userLoading } = useQuery(['users'], getUserInfo);
  const { id, title, createdAt, nickname, location, location_detail, like, price, imageUrls } = item;

  const productPrice = price?.toLocaleString('ko-KR') || 0;
  const imageUrl = imageUrls?.split(',')[0];

  const isLike = userData?.data?.likes?.some((like: ILike) => like.productId === id && like.type === 'like');

  return (
    <Link href={`/products/${id}`} className='rounded-lg hover:shadow-lg hover:translate-y-[-2px] transition-transform duration-300 sm:rounded-none sm:border-b-2 sm:border-border-gray'>
      <li className='m-8 text-lg text-left list-none rounded-lg w-80 '>
        <div className='relative my-2 bg-black rounded-lg w-80 h-80'>
          {imageUrl &&
            <Image alt={title} src={imageUrl} fill className='rounded-lg' sizes='320'/>
          }   
        </div>
        <Typograph tag='h4'>{title}</Typograph>
        <Typograph tag='span'>{nickname}</Typograph>
        <div className='flex items-center mt-2'>
          <BiMoney className='mr-2 text-green' />
          <Typograph tag='p' color='green'>{`${productPrice} 원`}</Typograph>
        </div>
        <div className='flex items-center mt-2'>
          <BiFlag className='mr-2 text-sky' />
          <div className='mr-2'>
            <Typograph tag='p' color='sky'>{location}</Typograph>
          </div>
          <Typograph tag='p' color='sky'>{location_detail}</Typograph>
        </div>
        <div className='flex items-center mt-2'>
          {isLike 
            ? <BiSolidHeart className='mr-2 text-red'/>
            : <BiHeart className='mr-2 text-red'/>
          }
          <Typograph tag='p' color='red'>{like}</Typograph>
        </div>
        <div className='px-2 text-right text-gray'>
          <Typograph tag='p' color='text-3'>{displayCreatedAt(createdAt)}</Typograph>
        </div>
      </li>
    </Link>
  )
}

export default ProductBox