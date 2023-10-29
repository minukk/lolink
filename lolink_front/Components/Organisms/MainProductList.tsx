import React from 'react'
import ProductBox from '../Molecules/ProductBox'
import Typograph from '../Atoms/Typograph';

interface IProps {
  title: string;
}

const MainBox = ({ title }: IProps) => {
  return (
    <section className='p-10 my-8 text-center border-t-2 border-gray sm:p-2'>
      <Typograph tag='h3'>{title}</Typograph>
      <div className='flex flex-wrap justify-center my-10'>
          {Array(5).fill(0).map((e, i) => (
            <ProductBox key={i}/>
          ))}
        </div>
    </section>
  )
}

export default MainBox