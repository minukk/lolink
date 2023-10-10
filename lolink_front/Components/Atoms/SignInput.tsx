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
    <input className='p-2 m-4 border rounded-md w-96 border-gray md:w-72' type={type} placeholder={text} alt={text} value={value} onChange={(e) =>onchange(e, category)}/>
  )
}

export default SignInput