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
      <div className='flex justify-between mx-10 w-72'>
        <Link href='/posts' aria-label='커뮤니티 페이지 이동'>
          <Typograph tag='h2'>커뮤니티</Typograph>
        </Link>
        <Link href='/products' aria-label='중고 거래 페이지 이동'>
          <Typograph tag='h2'>중고 거래</Typograph>
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
