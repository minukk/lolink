import HeadTitle from '@/Components/Atoms/HeadTitle'
import SignBox from '@/Components/Molecules/SignBox'
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react'
import { signUpAlertState, userState, signInAlertState } from '../../stores/user';
import { signInApi } from '../api/user';
import Alert from '../../Components/Atoms/Alert';

const SignIn = () => {
  const { setState } = userState();
  const { state: isSignUpAlert, setState: setIsSignUpAlert } = signUpAlertState();
  const { state: isSignInAlert, setState: setIsSignInAlert } = signInAlertState();
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
      setIsSignInAlert(true);
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
      {isSignUpAlert && <Alert message='회원가입 되었습니다.' onClose={() => setIsSignUpAlert(false)} color='allow' />}
    </>
  )
}

export default SignIn