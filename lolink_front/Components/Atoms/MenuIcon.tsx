import { BiMenu } from 'react-icons/bi';
import MenuBar from '../molecules/MenuBar';
import { useState } from 'react';
import Alert from './Alert';

const MenuIcon = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <div className='px-4' onClick={() => setIsMenu((prev) => !prev)} data-testid='menu-icon' aria-label='메뉴 드롭 아이콘'>
        <i className='text-5xl text-sky 2xl:text-3xl sm:text-xl'><BiMenu /></i>
        {isMenu && <MenuBar setShowAlert={setShowAlert}/>}
      </div>
      {showAlert &&<Alert message='로그아웃 되었습니다.' onClose={() => setShowAlert(false)} />}
    </>
  )
}

export default MenuIcon