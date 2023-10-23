import HeadTitle from '@/components/atoms/HeadTitle'
import SignBox from '@/components/molecules/SignBox'
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react'
import { signAlertState, userState } from '../../stores/user';
import { signInApi } from '../api/user';
import Alert from '../../components/atoms/Alert';

const SignIn = () => {
  const { setState } = userState();
  const { state: isSignAlert, setState: setIsSignAlert } = signAlertState();
  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });
  const router = useRouter()

  const onSignIn = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const email = signIn.email;
    const password = signIn.password;
    try {
      const data = await signInApi(email, password);
      setState(data.user);
      sessionStorage.setItem('lolink', data.access_token);
      setIsSignAlert(true);
      router.push('/');
    } catch (error) {
      console.error('로그인 처리 중 에러 발생: ', error);
    }
  }, [signIn]);

  const onChangeSignIn = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const value = event.target.value;
    setSignIn((prev) => ({
      ...prev,
      [category]: value,
    }));
  }
  
  return (
    <>
      <HeadTitle title="LoLink | 로그인" />
      <section className='py-60 mobile:py-0'>
        <SignBox sign={signIn} onSign={onSignIn} onChangeSign={onChangeSignIn}/>
      </section>
      {isSignAlert && <Alert message='회원가입 되었습니다.' onClose={() => setIsSignAlert(false)} color='allow' />}
    </>
  )
}

export default SignIn