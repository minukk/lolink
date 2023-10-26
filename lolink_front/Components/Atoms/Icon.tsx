import Link from 'next/link';
import React from 'react'

interface IconProps {
  children: React.ReactNode;
  href?: string;
  size?: string;
}

const Icon = ({ children, href }: IconProps) => {
  return (
    <Link href={`/${href}`}>
      <div className='mx-4'>
        <i className='text-5xl text-sky tablet:text-xl mobile:text-base'>{children}</i>
      </div>
    </Link>
  )
}

export default Icon