import React from 'react'

interface ITypo {
  title: string;
}

const TypoH2 = ({ title }: ITypo) => {
  return (
    <h2 className={`text-3xl 2xl:text-xl lg:hidden text-sky font-bold`}>{title}</h2>
  )
}

export default TypoH2