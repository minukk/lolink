import React from 'react'
import { BiHash } from 'react-icons/bi'
import { IHashtag } from '../../../types/hashtag'

interface ProductPageHashtagProps {
  hashtags: IHashtag[];
}

const ProductPageHashtag: React.FC<ProductPageHashtagProps> = ({ hashtags }) => {
  return (
    <div className='flex truncate'>
      {hashtags && hashtags.map((hashtag: IHashtag) => (
        <div key={hashtag.id} className='flex items-center mr-4 text-sky'>
          <BiHash />
          <span>{hashtag.tag}</span>
        </div>
      ))}
    </div>
  )
}

export default React.memo(ProductPageHashtag);
