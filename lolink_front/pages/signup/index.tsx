import SignBox from '@/components/molecules/SignBox'
import TypoH2 from '@/components/atoms/TypoH2'
import React from 'react'
import { Head } from 'next/document';
import HeadTitle from '@/components/atoms/HeadTitle';

const Signup = () => {
  console.log('re-render');
  return (
    <>
      <HeadTitle title='LoLink | 회원가입' />
      <main className='pt-60 pb-96'>
        <SignBox />
      </main>
    </>
  )
}

export default Signup