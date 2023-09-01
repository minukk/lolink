import React from 'react'

interface ITypo {
  title: string;
}

const TypoH2 = ({ title }: ITypo) => {
  return (
    <h2 className='text-xl md:text-3xl'>{title}</h2>
  )
}

export default TypoH2