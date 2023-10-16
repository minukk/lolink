import React, { useCallback, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import SignInput from '../atoms/SignInput'
import SignButton from '../atoms/Button'
import TypoH2 from '../atoms/TypoH2';
import TypoP from '../atoms/TypoP';
import Link from 'next/link';
import { userState } from '@/stores/user';
import { signInApi, signUpApi } from '@/pages/api/user';

const SignBox = () => {
  const { setState } = userState();
  const router = useRouter()
  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });

  const [signUp, setSignUp] = useState({
    nick: '',
    phone: ''
  });

  const onSignin = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const email = signIn.email;
    const password = signIn.password;
    try {
      const data = await signInApi(email, password);
      setState(data.user);
      sessionStorage.setItem('lolink', data.access_token);
      router.push('/');
    } catch (error) {
      console.error('로그인 처리 중 에러 발생: ', error);
    }
  }, [signIn]);

  const onSignup = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const email = signIn.email;
    const password = signIn.password;

    const sign = {
      email,
      password,
      nickname: signUp.nick,
      phone: signUp.phone,
    };
    
    try {
      await signUpApi(sign);
      router.push('/signin');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('회원가입 실패', axiosError.response?.data);
    }
  }, [signIn, signUp]);

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
      <form className='p-10 text-center border-4 rounded-lg w-148 border-sky md:w-96'>
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
        <div className='mt-10'>
          <SignButton onclick={signTransText() ? onSignin : onSignup} title={signTransText() ? '로그인' : '회원가입'} color='green' />
        </div>
      </form>
    </div>
  )
}

export default SignBox;
