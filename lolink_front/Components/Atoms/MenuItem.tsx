import Link from 'next/link'
import React from 'react'

interface IProps {
  text: string
  href?: string;
}

const MenuItem = ({ text, href }: IProps) => {
  return (
    <Link href={href}>
      <li className='p-4 text-3xl text-sky hover:text-white hover:bg-sky lg:text-xl sm:text-base'>{text}</li>
    </Link>
  )
}

export default MenuItem