import React from 'react'
import MenuItem from '../atoms/MenuItem'

const MenuBar = () => {
  return (
    <aside className='bg-sky w-80 absolute top-28 right-0 delay-1000'>
      <ul className='text-center'>
        {MENU_ITEMS.map((item, i) => (
          <MenuItem text={item} key={item + i} />
        ))}
      </ul>
    </aside>
  )
}

const MENU_ITEMS = ['내 글', '내 거래', '채팅', '고객센터', '로그인 / 로그아웃'];

export default MenuBar