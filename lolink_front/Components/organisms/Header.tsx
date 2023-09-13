import React, { FC } from 'react'
import TypoH1 from '../atoms/TypoH1'
import MenuIcon from '../atoms/MenuIcon'
import Link from 'next/link'
import UserIcon from '../atoms/UserIcon'
import TypoH2 from '../atoms/TypoH2'

const Header: FC = () => {
  return (
    <header className='flex justify-between p-8 bg-sky'>
      <Link href='/'>
        <TypoH1 title='LoLink' />
      </Link>
      <Link href='posts'>
        <TypoH2 title='게시글' color='white'/>
      </Link>
      <Link href='products'>
        <TypoH2 title='중고 거래' color='white'/>
      </Link>
      <div className='flex justify-between'>
        <UserIcon />
        <MenuIcon />
      </div>
    </header>
  )
}

export default Header