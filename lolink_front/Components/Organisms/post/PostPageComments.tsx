import { BiMessageRounded } from 'react-icons/bi';
import { IComment } from '../../../types/comment';
import CommentInput from '../../Molecules/CommentInput';
import Typograph from '../../Atoms/Typograph';
import CommentItem from '../../Molecules/CommentItem';
import React from 'react';

interface PostPageCommentsSectionProps {
  comments: IComment[];
  lastPage: number;
  onPageChange: (page: number) => void;
}

const PostPageCommentsSection: React.FC<PostPageCommentsSectionProps> = ({ comments, lastPage, onPageChange }) => (
  <div className='pb-2 mb-20 border-2 rounded-lg w-160 lg:w-full border-sky'>
    <div className='flex flex-wrap items-center p-2 text-xl text-white bg-sky'>
      <BiMessageRounded />
      <div className='ml-1 mr-2'>
        <Typograph tag='h4' color='white'>댓글</Typograph>
      </div>
      <span>{comments.length || 0}개</span>
    </div>
    <div>
      {comments &&
        <>
          <ul className='p-2'>
            {comments.map((item: IComment, i: number) => <CommentItem key={i} {...item} />)}
          </ul>
          <div className='flex justify-center'>
            {Array.from({ length: lastPage }).map((_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index + 1)}
                className='px-4 py-2 m-2 rounded-lg text-sky hover:text-white hover:bg-sky'
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      }
      <div className='px-6 py-4'>
        <CommentInput />
      </div>
    </div>
  </div>
);

export default React.memo(PostPageCommentsSection);
