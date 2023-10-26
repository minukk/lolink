import React from 'react'

interface IProps {
  type: string;
  text: string;
  value: string;
  category: string;
  onchange: any;
  label?: string;
}

const SignInput = ({ type, text, onchange, value, category, label }: IProps) => {
  return (
    <input className='p-2 my-4 border rounded-md w-96 border-gray mobile:w-72' type={type} placeholder={text} alt={text} value={value} onChange={(e) =>onchange(e, category)} aria-label={label}/>
  )
}

export default SignInput