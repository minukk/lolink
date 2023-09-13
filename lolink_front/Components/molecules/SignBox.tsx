import React, { useRef, useState } from 'react'
import SignInput from '../atoms/SignInput'
import Button from '../atoms/Button'
import TypoH2 from '../atoms/TypoH2';
import TypoP from '../atoms/TypoP';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignBox = () => {
  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });

  const [signUp, setSignUp] = useState({
    nick: '',
    phone: ''
  });
  
  const router = useRouter();

  const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log('sign');
  }

  const onChangeSignIn = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const value = event.target.value;
    setSignIn((prev) => ({
      ...prev,
      [category]: value,
    }));
  }

  const onChangeSignUp = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const value = event.target.value;
    setSignUp((prev) => ({
      ...prev,
      [category]: value,
    }));
  }

  const signTransText = () => {
    return router.pathname === '/signin';
  }

  return (
    <div className='flex justify-center m-16'>
      <form className='border-2 border-gray text-center rounded-lg w-full md:w-full lg:w-1/5'>
        <div className='my-10'>
          <TypoH2 title={signTransText() ? '로그인' : '회원가입'} />
        </div>
        <div>
          <SignInput text='이메일' type='email' value={signIn.email} onchange={onChangeSignIn} category='email'/>
        </div>
        <div>
          <SignInput text='비밀번호' type='password' value={signIn.password} onchange={onChangeSignIn} category='password' />
        </div>
        {!signTransText() && (
          <>
            <div>
              <SignInput text='닉네임' type='text' value={signUp.nick} onchange={onChangeSignUp} category='nick'/>
            </div>
            <div>
              <SignInput text='휴대폰' type='tel' value={signUp.phone} onchange={onChangeSignUp} category='phone'/>
            </div>
          </>
        )}
        <div className='my-4'>
          <Link href={signTransText() ? '/signup' : 'signin'}>
            <TypoP text={signTransText() ? '회원가입 이동' : '로그인 이동'} />
          </Link>
        </div>
        <div className='my-10'>
          <Button onclick={onSubmit} title={signTransText() ? '로그인' : '회원가입'} color='green' />
        </div>
      </form>
    </div>
  )
}

export default SignBox