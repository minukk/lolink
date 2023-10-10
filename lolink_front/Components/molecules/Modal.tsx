import { useRouter } from 'next/router';
import React from 'react'

interface IProps {
  onclose: () => void;
}

const Modal = ({ onclose }: IProps) => {
  const router = useRouter();

  const handleClose = () => {
    onclose();
  }

  const moveSigninPage = () => {
    onclose();
    router.push('/signin');
  }

  return (
    <div className='absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black opacity-50'>
      <div className='opacity-100 w-128 h-96'>
          <div className='p-4 bg-white rounded-lg'>
          <p className='my-10 text-3xl text-red'>로그인이 필요합니다.</p>
          <div>
            <button className='w-full p-4 my-4 text-2xl text-white rounded-lg bg-sky' onClick={handleClose}>확인</button>
            <button className='text-2xl underline' onClick={moveSigninPage}>로그인하러 가기</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal