import React, { useState } from 'react'
import Link from 'next/link'
import { userState } from '@/stores/user';
import Modal from '../molecules/Modal';
import { useRouter } from 'next/router';
import Buttons from './Buttons';

interface IProps {
  text: string;
}

const WriteButton = ({ text }: IProps) => {
  const router = useRouter();
  const { state, setState } = userState();
  const [showModal, setShowModal] = useState(false);

  const handleWriteButton = () => {
    if (state && router.asPath === '/posts') {
      router.push('/posts/write');
    }
    if (state && router.asPath === '/products') {
      router.push('/products/write');
    }
    else {
      setShowModal(true);
    }
  }

  return (
    <>
      {/* <button className='p-4 text-xl bg-white border rounded-lg text-sky border-sky hover:text-white hover:bg-sky md:p-2' onClick={handleWriteButton}>{text}</button> */}
      <Buttons onClick={handleWriteButton}>{text}</Buttons>
      {showModal && <Modal onclose={() => setShowModal(false)}/>}
    </>
  )
}

export default WriteButton