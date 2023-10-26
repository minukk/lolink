import React from 'react'
import { useRouter } from 'next/router';
import SignInput from '../Atoms/SignInput'
import Link from 'next/link';
import Typograph from '../Atoms/Typograph';
import Button from '../Atoms/Button';

interface IProps {
  sign: {
    email: string;
    password: string;
    nickname?: string;
    phone?: string;
  };
  onSign: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onChangeSign: (e: React.ChangeEvent<HTMLInputElement>, category: string) => void;
}

const SignBox: React.FC<IProps> = ({ sign, onSign, onChangeSign }) => {
  const router = useRouter();

  const signTransText = router.pathname === '/signin';

  return (
    <>
      <form className='flex flex-wrap justify-center p-10 border-4 rounded-lg w-148 border-sky mobile:w-88 mobile:border-none'>
        <div className='flex justify-center w-full my-10'>
          <Typograph tag='h2'>{signTransText ? '로그인' : '회원가입'}</Typograph>
        </div>
        <div>
          <SignInput text='이메일' type='email' value={sign.email} onchange={onChangeSign} category='email' label='이메일 입력'/>
        </div>
        <div>
          <SignInput text='비밀번호' type='password' value={sign.password} onchange={onChangeSign} category='password' label='비밀번호 입력'/>
        </div>
        {(sign.nickname !== undefined && sign.phone !== undefined) && (
          <>
            <div>
              <SignInput text='닉네임' type='text' value={sign.nickname} onchange={onChangeSign} category='nickname' label='닉네임 입력'/>
            </div>
            <div>
              <SignInput text='휴대폰' type='tel' value={sign.phone} onchange={onChangeSign} category='phone' label='휴대폰 번호 입력'/>
            </div>
          </>
        )}
        <div className='w-full my-4 text-center'>
          <Link href={signTransText ? '/signup' : 'signin'}>
            <Typograph tag='h4'>{signTransText ? '회원가입 이동' : '로그인 이동'}</Typograph>
          </Link>
        </div>
        <div>
          <Button onClick={onSign} color='sign' size='full' label={signTransText ? '로그인' : '회원가입'}>{signTransText ? '로그인' : '회원가입'}</Button>
        </div>
      </form>
    </>
  )
}

export default React.memo(SignBox);
