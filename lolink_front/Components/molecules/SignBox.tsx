import React, { useRef, useState } from 'react'
import SignInput from '../atoms/SignInput'
import Button from '../atoms/Button'
import TypoH2 from '../atoms/TypoH2';

const SignBox = () => {
  const [sign, setSign] = useState({
    email: '',
    password: '',
  });

  const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(sign);
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const value = event.target.value;
    setSign((prev) => ({
      ...prev,
      [category]: value,
    }));
  }


  return (
    <div className='p-10 w-1/3'>
      <form className='flex flex-wrap border-2 border-gray'>
        <TypoH2 title='로그인' />
        <SignInput text='이메일' type='email' value={sign.email} onchange={onChange} category='email'/>
        <SignInput text='비밀번호' type='password' value={sign.password} onchange={onChange} category='password' />
        <Button onclick={onSubmit} title='로그인' color='green' />
      </form>
    </div>
  )
}

export default SignBox