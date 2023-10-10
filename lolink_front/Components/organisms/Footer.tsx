import React, { FC } from 'react'
import TypoP from '../atoms/TypoP'

const Footer: FC = () => {
  return (
    <footer className='flex justify-center w-full p-10 align-middle border-t-2 border-sky'>
      <TypoP text='Footer' />
    </footer>
  )
}

export default Footer