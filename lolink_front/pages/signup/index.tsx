import SignBox from '@/Components/molecules/SignBox'
import TypoH2 from '@/Components/atoms/TypoH2'
import React from 'react'

const Signup = () => {
  console.log('re-render');
  return (
    <main className='text-center p-20'>
      {/* <TypoH2 title='로그인' /> */}
      <SignBox />
    </main>
  )
}

export default Signup