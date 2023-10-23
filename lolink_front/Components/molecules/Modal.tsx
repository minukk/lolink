import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react'
import Button from '../atoms/Button';
import Typograph from '../atoms/Typograph';

interface IProps {
  onclose: () => void;
}

const Modal = ({ onclose }: IProps) => {
  const modalRef = useRef(null);
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    // modalRef가 현재 DOM에 존재하며, 클릭된 요소가 modalRef의 외부에 있을 때
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onclose(); // 모달 닫기 함수 호출
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    onclose();
    router.push('/signin');
  }

  const moveSigninPage = () => {
    onclose();
    router.push('/signup');
  }

  return (
    <>
      <div className='absolute top-0 left-0 z-40 flex items-center justify-center w-screen h-full bg-black opacity-50'></div>    
      <div className='absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-full'>
        <div ref={modalRef} className='opacity-100 w-96'>
          <div className='flex flex-wrap justify-center py-10 bg-white rounded-lg'>
            <Typograph tag='p' color='red'>로그인이 필요합니다.</Typograph>
            <div className='flex justify-center w-full py-6'>
              <Button onClick={handleClose} size='xlarge'>확인</Button>
            </div>
            <Button onClick={moveSigninPage} size='underline'>회원가입하러 가기</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal