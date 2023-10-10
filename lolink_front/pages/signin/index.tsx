import HeadTitle from '@/components/atoms/HeadTitle'
import SignBox from '@/components/molecules/SignBox'
import React from 'react'

const SignIn = () => {
  return (
    <>
      <HeadTitle title="LoLink | 로그인" />
      <section className='py-60'>
        <SignBox />
      </section>
    </>
  )
}

export default SignIn