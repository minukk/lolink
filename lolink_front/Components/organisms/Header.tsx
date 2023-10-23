import React, { FC } from 'react'
import MenuIcon from '../atoms/MenuIcon'
import Link from 'next/link'
import UserIcon from '../atoms/UserIcon'
import SearchForm from '../molecules/SearchForm'
import ChatIcon from '../atoms/ChatIcon'
import Typograph from '../atoms/Typograph'

const Header: FC = () => {
  return (
    <header className='flex items-center w-full py-8 border-b-2 justify-evenly border-sky sm:py-4 sm:px-2'>
      <Link href='/' className='mobile:mr-8'>
        <Typograph tag='h1'>LoLink</Typograph>
      </Link>
      <div className='flex justify-between w-72'>
        <Link href='/posts'>
          <Typograph tag='h2'>게시글</Typograph>
        </Link>
        <Link href='/products'>
          <Typograph tag='h2'>상품</Typograph>
        </Link>
        {/* <Link href='/sports'>
          <Typograph tag='h2'>스포츠</Typograph>
        </Link> */}
      </div>
      <SearchForm />
      <div className='flex justify-end w-72'>
        <ChatIcon />
        <UserIcon />
        <MenuIcon />
      </div>
    </header>
  )
}

export default React.memo(Header);
