import React from 'react'

interface ITypo {
  title: string;
}

const TypoH3 = ({ title }: ITypo) => {
  return (
    <h1 className='text-lg md:text-xl'>{title}</h1>
  )
}

export default TypoH3