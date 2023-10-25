import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiSolidChat } from 'react-icons/bi';
import Alert from './Alert';
import { userState } from '@/stores/user';
import { useRouter } from 'next/router';

const ChatIcon = () => {
  const { state } = userState();
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const handleAlert = () => {
    if (!state) {
      setShowAlert(true);
      return;
    }
    router.push('/chat');
  }

  return (
    <>
      <div className='mx-4' onClick={handleAlert} data-testid='chat-icon'>
        <i className='text-5xl text-sky 2xl:text-3xl lg:hidden'><BiSolidChat /></i>
      </div>
      {showAlert && <Alert message='로그인 후 이용해주세요!' onClose={() => setShowAlert(false)} color='warn' />}
    </>
  )
}

export default ChatIcon;