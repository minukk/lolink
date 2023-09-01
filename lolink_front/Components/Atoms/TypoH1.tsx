import React from 'react'

interface ITypo {
  title: string;
}

const TypoH1 = ({ title }: ITypo) => {
  return (
    <h1 className='text-3xl md:text-5xl font-roboto text-white'>{title}</h1>
  )
}

export default TypoH1