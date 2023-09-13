import HeadTitle from '@/Components/atoms/HeadTitle'
import SignBox from '@/Components/molecules/SignBox'
import React from 'react'

const SignIn = () => {
  return (
    <>
      <HeadTitle title="LoLink | 로그인" />
      <main className='pt-60 pb-96'>
        <SignBox />
      </main>
    </>
  )
}

export default SignIn