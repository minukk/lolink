import React from 'react'

interface IProps {
  text: string
}

const MenuItem = ({ text }: IProps) => {
  return (
    <li className='text-white text-3xl p-4 hover:text-sky hover:bg-white'>{text}</li>
  )
}

export default MenuItem