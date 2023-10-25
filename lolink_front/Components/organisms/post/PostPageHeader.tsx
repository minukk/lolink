import React from 'react';
import { BiLike, BiTimeFive, BiMessageRounded, BiShow, BiBookOpen } from 'react-icons/bi';
import Typograph from '../../../components/atoms/Typograph';
import { getFormatDate } from '../../../utils/dateForm';

interface PostHeaderProps {
  title: string;
  nickname: string;
  createdAt: Date;
  views: number;
  recommendCount: number;
  commentsCount: number;
  readingTime: number;
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, nickname, createdAt, views, recommendCount, commentsCount, readingTime }) => {

  console.log(title);
  return (
    <>
      <Typograph tag='h3'>{title}</Typograph>
      <div className='flex text-lg'>
          <span className='mr-2 text-gray'>{nickname}</span>
          <div className='flex items-center mx-2 text-gray'>
            <BiTimeFive />
            <span className='mobile:hidden'>{getFormatDate(createdAt)[0]}</span>
            <span className='mx-1'>{getFormatDate(createdAt)[1]}</span>
          </div>
          <div className='flex items-center mx-2 text-gray'>
            <BiShow />
            <span className='mx-1'>{views}</span>
          </div>
          <div className='flex items-center mx-2 text-gray'>
            <BiLike />
            <span className='mx-1'>{recommendCount}</span>
          </div>
          <div className='flex items-center mx-2 text-gray'>
            <BiMessageRounded />
            <span className='mx-1 sm:hidden'>댓글수</span>
            <span>{commentsCount || 0}</span>
          </div>
          <div className='flex items-center mx-2 text-gray'>
            <BiBookOpen />
            <span className='mx-2 text-gray'>약{readingTime} 분</span>
          </div>
        </div>
    </>
  );
};

export default React.memo(PostHeader);
