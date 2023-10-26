import React from 'react'
import { IHashtag } from '../../../types/hashtag'
import { BiHash } from 'react-icons/bi';

interface PostPageHashtagProps {
  hashtags: IHashtag[];
}

const PostPageHashtag: React.FC<PostPageHashtagProps> = ({ hashtags }) => {
  return (
    <div className='flex'>
      {hashtags && hashtags.map((hashtag: IHashtag) => (
        <div key={hashtag.id} className='flex items-center mr-4 text-sky'>
          <BiHash />
          <span>{hashtag.tag}</span>
        </div>
      ))}
    </div>
  )
}

export default React.memo(PostPageHashtag);