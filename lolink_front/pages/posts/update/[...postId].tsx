import React, { useCallback, useEffect, useState } from 'react'
import QuillComponent from '../../../components/organisms/QuillComponent';
import TypoH2 from '@/components/atoms/TypoH2';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { getPostApi, updatePostApi } from '@/pages/api/post';
import { BiHash } from 'react-icons/bi';

const UpdatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const router = useRouter();

  const postId = router.query?.postId?.[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPostApi(postId);
        setTitle(res.data.title);
        setContent(res.data.body);
        setHashtags(res.data.hashtags.map((hashtag: { tag: string; }) => hashtag.tag));
      } catch(error) {
        console.error('게시글을 불러오는데 실패했습니다.', error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    const post = {
      title: title,
      body: content,
      category: '일반',
      hashtags: hashtags,
    }
    
    try {
      await updatePostApi(postId, post);
      router.push('/posts');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('글 수정 실패', axiosError.response?.data);
    }
  }, [title, content, hashtags]);

  if (!postId) {
    return <div>로딩중...</div>
  }

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

  return (
    <div className='my-20 text-center'>
      <TypoH2 title='게시글 글 수정' />
      <section className='p-4 my-10 border-2 rounded-lg border-sky'>
        <div className='border rounded-lg border-sky'>
          <input className='w-full p-2 rounded-lg border-sky' value={title} onChange={handleTitle}/>
        </div>
        <div className='mt-10 mb-20'>
          <QuillComponent setContent={setContent} content={content}/>
        </div>
        <div>
          <div className='flex flex-wrap mx-2 my-4'>
            {hashtags && hashtags.map((hashtag, i) => <p key={hashtag + i} className='flex items-center mr-4 text-sky' onDoubleClick={() => removeHashtag(hashtag)}><BiHash />{hashtag}</p>)}
          </div>
          <input placeholder='해시태그를 입력해주세요.' className='border-sky text-sky' onKeyDown={handleHashtags} onChange={handleHashtag} value={hashtag}/>
        </div>
        <div className='flex justify-between'>
          <Link href={`/posts/${postId}`}>
            <button className='w-24 py-4 border-2 rounded-lg text-red border-red hover:text-white hover:bg-red'>뒤로가기</button>
          </Link>
          <button className='w-24 py-4 border-2 rounded-lg text-green border-green hover:text-white hover:bg-green' onClick={onSubmit}>수정하기</button>
        </div>
      </section>
    </div>
  )
}

export default UpdatePost