import React, { FC } from 'react'
import Typograph from '../atoms/Typograph'

const Footer: FC = () => {
  return (
    <footer className='flex justify-center w-full p-10 align-middle border-t-2 border-sky'>
      <Typograph tag='p'>Footer</Typograph>
    </footer>
  )
}

export default React.memo(Footer);
