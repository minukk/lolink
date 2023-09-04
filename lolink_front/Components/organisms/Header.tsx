import React, { FC } from 'react'
import TypoH1 from '../atoms/TypoH1'
import MenuIcon from '../atoms/MenuIcon'

const Header: FC = () => {
  return (
    <header className='flex justify-between p-8 bg-sky'>
      <TypoH1 title='LoLink' />
      <MenuIcon />
    </header>
  )
}

export default Header