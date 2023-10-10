import React from 'react'

interface ITypo {
  title: string;
}

const TypoH3 = ({ title }: ITypo) => {
  return (
    <h3 className='text-xl lg:text-lg sm:text-base'>{title}</h3>
  )
}

export default TypoH3