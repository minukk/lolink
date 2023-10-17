import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react'

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
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
      <div className='absolute top-0 left-0 z-40 flex items-center justify-center w-screen h-screen bg-black opacity-50'></div>    
      <div className='absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
        <div ref={modalRef} className='opacity-100 w-128'>
            <div className='p-4 bg-white rounded-lg'>
              <p className='my-10 text-3xl text-red'>로그인이 필요합니다.</p>
            <div>
              <button className='w-4/5 p-4 my-4 text-2xl text-white rounded-lg bg-sky' onClick={handleClose}>확인</button>
              <button className='text-2xl underline' onClick={moveSigninPage}>회원가입하러 가기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal