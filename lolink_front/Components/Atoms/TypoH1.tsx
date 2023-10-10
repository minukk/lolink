import React from 'react'

interface ITypo {
  title: string;
}

const TypoH1 = ({ title }: ITypo) => {
  return (
    <h1 className='text-5xl font-bold text-sky lg:text-3xl font-roboto sm:text-lg'>{title}</h1>
  )
}

export default TypoH1