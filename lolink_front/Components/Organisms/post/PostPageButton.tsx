import React from 'react';
import Link from 'next/link';

interface PostPageButtonProps {
  isMyPost: boolean;
  onDeletePost: () => void;
  id: number;
}

const PostPageButton: React.FC<PostPageButtonProps> = ({ isMyPost, onDeletePost, id }) => {
  return (
    <div className='flex justify-end mt-4 text-white'>
      {isMyPost && (
        <>
          <button className='px-4 py-2 mr-2 rounded-lg bg-red hover:bg-onred' onClick={onDeletePost}>삭제</button>
          <Link href={`/posts/update/${id}`}>
            <button className='px-4 py-2 ml-2 rounded-lg bg-green hover:bg-ongreen'>수정</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default React.memo(PostPageButton);
