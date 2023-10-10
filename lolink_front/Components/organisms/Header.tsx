import React, { FC } from 'react'
import TypoH1 from '../atoms/TypoH1'
import MenuIcon from '../atoms/MenuIcon'
import Link from 'next/link'
import UserIcon from '../atoms/UserIcon'
import TypoH2 from '../atoms/TypoH2'
import SearchForm from '../molecules/SearchForm'
import ChatIcon from '../atoms/ChatIcon'
import NotiIcon from '../atoms/NotiIcon'

const Header: FC = () => {
  return (
    <header className='flex items-center w-full py-8 border-b-2 justify-evenly border-sky sm:justify-between sm:py-4 sm:px-2'>
      <Link href='/'>
        <TypoH1 title='LoLink' />
      </Link>
      <div className='flex justify-between w-1/5'>
        <Link href='/posts'>
          <TypoH2 title='게시글'/>
        </Link>
        <Link href='/products'>
          <TypoH2 title='중고 거래'/>
        </Link>
        <Link href='/sports'>
          <TypoH2 title='스포츠'/>
        </Link>
      </div>
      <SearchForm />
      <div className='flex justify-between'>
        <NotiIcon />
        <ChatIcon />
        <UserIcon />
        <MenuIcon />
      </div>
    </header>
  )
}

export default Header