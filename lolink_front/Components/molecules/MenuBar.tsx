import React from 'react';
import MenuItem from '../atoms/MenuItem';
import { userState } from '@/stores/user';

const MenuBar = () => {
  const { state, setState } = userState();

  const logoutHandler = () => {
    setState(null);
    sessionStorage.removeItem('lolink');
  }

  return (
    <aside className='absolute right-0 delay-1000 bg-white border-b rounded-b-lg w-80 top-28 sm:w-32 sm:top-10'>
      <ul className='text-center'>
        {MENU_ITEMS.map((item, i) => (
          <MenuItem text={item.text} key={item.text + i} href={item.href}/>
        ))}
        {state
          ? 
            <div onClick={logoutHandler}>
              <li className='p-4 text-3xl text-sky hover:text-white hover:bg-sky lg:text-xl sm:text-base'>로그아웃</li>
            </div>
          : 
            <>
              <MenuItem text='로그인' href='/signin' />
              <MenuItem text='회원가입' href='/signup' />
            </>
        }
      </ul>
    </aside>
  )
}

const MENU_ITEMS = [{ text: '내 글', href: ''}, { text: '내 거래', href: '' }, { text: '채팅', href: '' }, { text: '고객센터', href: '' }];

export default MenuBar