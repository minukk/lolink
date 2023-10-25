import React from 'react';
import MenuItem from '../atoms/MenuItem';
import { userState } from '@/stores/user';
import { useQueryClient } from 'react-query';

interface MenuBarProps {
  setShowAlert: (value: boolean) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ setShowAlert }) => {
  const queryClient = useQueryClient();
  const { state, setState } = userState();

  const logoutHandler = () => {
    setState(null);
    queryClient.clear();
    sessionStorage.removeItem('lolink');
    setShowAlert(true);
  }

  return (
    <aside className='absolute right-0 delay-1000 bg-white border-b rounded-b-lg w-80 top-28 mobile:w-32 mobile:top-16'>
      <ul className='text-center'>
        <div className='hidden mobile:block'>
          <MenuItem text='내 정보' href='profile' label='내 정보 이동'/>
          <MenuItem text='채팅' href='chat' label='내 채팅 이동'/>
        </div>
        {MENU_ITEMS.map((item, i) => (
          <MenuItem text={item.text} key={item.text + i} href={item.href} label={item.text}/>
        ))}
        {state
          ? 
            <div onClick={logoutHandler} aria-label='로그아웃' >
              <li className='p-4 text-3xl text-sky hover:text-white hover:bg-sky lg:text-xl sm:text-base'>로그아웃</li>
            </div>
          : 
            <>
              <MenuItem text='로그인' href='signin' label='로그인 이동'/>
              <MenuItem text='회원가입' href='signup' label='회원가입 이동'/>
            </>
        }
      </ul>
    </aside>
  )
}

const MENU_ITEMS = [{ text: '내 글', href: ''}, { text: '내 거래', href: '' }, { text: '고객센터', href: '' }];

export default MenuBar