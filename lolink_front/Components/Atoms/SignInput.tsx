import React from 'react'

interface IProps {
  type: string;
  text: string;
  value: string;
  category: string;
  onchange: any;
}

const SignInput = ({ type, text, onchange, value, category }: IProps) => {
  return (
    <input className='inline-block w-2/3 m-4' type={type} placeholder={text} alt={text} value={value} onChange={(e) =>onchange(e, category)}/>
  )
}

export default SignInput