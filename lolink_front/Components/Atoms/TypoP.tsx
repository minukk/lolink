import React from 'react'

interface IProps {
  text: string;
}

const TypoP = ({ text }: IProps) => {
  return (
    <p className='text-black'>{text}</p>
  )
}

export default TypoP