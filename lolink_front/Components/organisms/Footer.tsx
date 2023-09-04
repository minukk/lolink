import React, { FC } from 'react'
import TypoP from '../atoms/TypoP'

const Footer: FC = () => {
  return (
    <footer className='flex justify-center align-middle p-10 border-t-2'>
      <TypoP text='Footer' />
    </footer>
  )
}

export default Footer