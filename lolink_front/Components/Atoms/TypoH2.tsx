import React from 'react'

interface ITypo {
  title: string;
  color?: string;
}

const TypoH2 = ({ title, color }: ITypo) => {
  return (
    <h2 className={`text-xl md:text-3xl text-${color}`}>{title}</h2>
  )
}

export default TypoH2