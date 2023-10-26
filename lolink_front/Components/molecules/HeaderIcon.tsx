import React, { useState } from 'react'
import { BiMenu, BiSolidBell, BiSolidChat, BiUserCircle } from 'react-icons/bi'
import Icon from '../Atoms/Icon'
import { userState } from '../../stores/post';
import { useRouter } from 'next/router';
import Alert from '../Atoms/Alert';

const HeaderIcon = () => {
  const { state } = userState();
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const handleAlert = () => {
    if (!state) {
      setShowAlert(true);
      return;
    }
    // router.push('/chat');
  }

  return (
    <>
      <div className='flex justify-between'>
        <Icon>
          <BiSolidBell />
        </Icon>
        <Icon href='chat'>
          <BiSolidChat />
        </Icon>
        <Icon href='profile'>
          <BiUserCircle />
        </Icon>
        <Icon>
          <BiMenu />
        </Icon>
      </div>
      {showAlert && <Alert message='로그인 후 이용해주세요!' onClose={() => setShowAlert(false)} color='warn' />}
    </>
  )
}

export default HeaderIcon