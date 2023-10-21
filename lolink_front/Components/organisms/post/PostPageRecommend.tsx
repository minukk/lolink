import React from 'react'
import { BiDislike, BiLike } from 'react-icons/bi'

interface PostPageRecommendProps {
  handleRecommend: () => void;
  handleNotRecommend: () => void;
}

const PostPageRecommend: React.FC<PostPageRecommendProps> = ({ handleRecommend, handleNotRecommend }) => {
  return (
    <div className='flex mb-10 text-xl text-sky'>
      <button className='flex items-center p-2 mx-4 rounded-lg hover:text-white hover:bg-sky' onClick={handleRecommend}><BiLike />추천</button>
      <button className='flex items-center p-2 mx-4 rounded-lg hover:text-white hover:bg-sky' onClick={handleNotRecommend}><BiDislike />비추천</button>
    </div>
  )
}

export default React.memo(PostPageRecommend);