import React from 'react'
import QuillComponent from '../QuillComponent';
import { BiHash } from 'react-icons/bi';
import { IHashtag } from '../../../types/hashtag';

interface PostPageWriteProps {
  content: string;
  setContent: (content: string) => void;
  hashtag: string;
  setHashtag: (hashtag: string) => void;
  hashtags: string[];
  setHashtags: (hashtags: string[]) => void;
  removeHashtag: (hashtag: string) => void;
}

const PostPageWrite: React.FC<PostPageWriteProps> = ({ content, setContent, hashtags, setHashtags, removeHashtag, hashtag, setHashtag }) => {
  const handleHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  }

  const handleHashtags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      if (hashtags.length < 5) {
        const newHashtags = [...hashtags, hashtag];
        setHashtags(newHashtags);
      }
      setHashtag('');
    }
  }

  return (
    <>
      <div className='mt-10 mb-20'>
        <QuillComponent content={content} setContent={setContent} />
      </div>
      <div>
        <div className='flex flex-wrap mx-2 my-4'>
          {hashtags && hashtags.map((hashtag, i) => <p key={hashtag + i} className='flex items-center mr-4 text-sky' onDoubleClick={() => removeHashtag(hashtag)}><BiHash />{hashtag}</p>)}
        </div>
        <input placeholder='해시태그를 입력해주세요.' className='border-sky text-sky' onKeyDown={handleHashtags} onChange={handleHashtag} value={hashtag}/>
      </div>
      
    </>
  )
}

export default React.memo(PostPageWrite);
