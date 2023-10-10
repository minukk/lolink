import React, { useRef } from 'react'
import ReactQuill from 'react-quill';
import QuillComponent from '../../components/organisms/QuillComponent';
import WriteButton from '@/components/atoms/WriteButton';
import TypoH2 from '@/components/atoms/TypoH2';
import Link from 'next/link';

const write = () => {
  const quillInstance = useRef<ReactQuill>(null);

  return (
    <div className='my-20 text-center'>
      <TypoH2 title='게시글 글쓰기' />
      <section className='p-4 my-10 border-2 rounded-lg border-sky'>
        <div className='border rounded-lg border-sky'>
          <input className='w-full p-2 rounded-lg border-sky' placeholder='제목을 입력해주세요.'/>
        </div>
        <div className='mt-10 mb-20'>
          <QuillComponent />
        </div>
        <div className='flex justify-between'>
          <Link href='/posts'>
            <button className='w-24 py-4 border-2 rounded-lg text-red border-red hover:text-white hover:bg-red'>뒤로가기</button>
          </Link>
          <button className='w-24 py-4 border-2 rounded-lg text-green border-green hover:text-white hover:bg-green'>글등록</button>
        </div>
      </section>
    </div>
  )
}

export default write