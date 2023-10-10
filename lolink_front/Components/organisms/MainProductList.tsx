import React from 'react'
import ProductBox from '../molecules/ProductBox'
import TypoH3 from '../atoms/TypoH3'

interface IProps {
  title: string;
}

const MainBox = (props: IProps) => {
  return (
    <section className='p-10 my-8 text-center border-t-2 border-gray sm:p-2'>
      <TypoH3 title={props.title} />
      <div className='flex flex-wrap justify-center my-10'>
          {Array(5).fill().map((e, i) => (
            <ProductBox key={i}/>
          ))}
        </div>
    </section>
  )
}

export default MainBox