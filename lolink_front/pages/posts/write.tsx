import React, { useCallback, useState } from 'react'
import QuillComponent from '../../components/organisms/QuillComponent';
import TypoH2 from '@/components/atoms/TypoH2';
import Link from 'next/link';
import { userState } from '@/stores/user';
import { AxiosError } from 'axios';

import { usePostMutation } from '../api/post';
import HashtagInput from '@/components/molecules/HashtagInput';
import { BiHash } from 'react-icons/bi';

const write = () => {
  const { state } = userState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const postMutation = usePostMutation();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  }

  const handleHashtags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      if (hashtags.length < 5) {
        setHashtags((prev: string[]) => [...prev, hashtag]);
      }
      setHashtag('');
    }
  }

  const removeHashtag = (hashtag: string) => {
    setHashtags((prev: string[]) => prev.filter((prevHash) => prevHash !== hashtag));
  }

  const onSubmit = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const post = {
      email: state?.email,
      userId: state?.id,
      title: title,
      body: content,
      category: '일반',
      hashtags: hashtags,
      imageUrls: '',
    }
    console.log(post);
    try {
      postMutation.mutate(post);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('글등록 실패', axiosError.response?.data);
    }
  }, [title, content, hashtags]);

  return (
    <div className='my-20 text-center'>
      <TypoH2 title='게시글 글쓰기' />
      <section className='p-4 my-10 border-2 rounded-lg border-sky'>
        <div className='border rounded-lg border-sky'>
          <input className='w-full p-2 rounded-lg border-sky' placeholder='제목을 입력해주세요.' onChange={handleTitle}/>
        </div>
        <div className='mt-10 mb-20'>
          <QuillComponent content={content} setContent={setContent} />
        </div>
        <div>
          <div className='flex flex-wrap mx-2 my-4'>
            {hashtags && hashtags.map((hashtag, i) => <p key={hashtag + i} className='flex items-center mr-4 text-sky' onDoubleClick={() => removeHashtag(hashtag)}><BiHash />{hashtag}</p>)}
          </div>
          <input placeholder='해시태그를 입력해주세요.' className='border-sky text-sky' onKeyDown={handleHashtags} onChange={handleHashtag} value={hashtag}/>
        </div>
        <div className='flex justify-between'>
          <Link href='/posts'>
            <button className='w-24 py-4 border-2 rounded-lg text-red border-red hover:text-white hover:bg-red'>뒤로가기</button>
          </Link>
          <button className='w-24 py-4 border-2 rounded-lg text-green border-green hover:text-white hover:bg-green' onClick={onSubmit}>글등록</button>
        </div>
      </section>
    </div>
  )
}

export default write