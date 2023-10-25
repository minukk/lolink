import SignBox from '@/components/molecules/SignBox'
import React, { useCallback, useState } from 'react'
import { Head } from 'next/document';
import HeadTitle from '@/components/atoms/HeadTitle';
import { signUpApi } from '../api/user';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { Sign } from 'crypto';
import { signUpAlertState } from '../../stores/user';
import { set } from 'lodash';

const Signup = () => {
  const { setState: setIsSignUpAlert } = signUpAlertState();
  const [signUp, setSignUp] = useState({
    email: '',
    password: '',
    nickname: '',
    phone: ''
  });
  const router = useRouter()

  const onSignUp = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const sign = {
      email: signUp.email,
      password: signUp.password,
      nickname: signUp.nickname,
      phone: signUp.phone,
    };
    
    try {
      await signUpApi(sign);
      setIsSignUpAlert(true);
      router.push('/signin');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('회원가입 실패', axiosError.response?.data);
    }
  }, [signUp]);

  const onChangeSignUp = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const value = event.target.value;
    setSignUp((prev) => ({
      ...prev,
      [category]: value,
    }));
  }

  return (
    <>
      <HeadTitle title='LoLink | 회원가입' />
      <main className='pt-60 pb-96 mobile:p-0'>
        <SignBox sign={signUp} onSign={onSignUp} onChangeSign={onChangeSignUp} />
      </main>
    </>
  )
}

export default Signup