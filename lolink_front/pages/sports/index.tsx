import React from 'react'
import { userState } from '../../stores/user'

const index = () => {
  const { state } = userState();

  return (
    <section className='py-20'>
      <h2 className='my-10 text-3xl font-bold text-sky'>스포츠!</h2>
      {state &&
        <span className=''>내 포인트: {state.point}</span>
      }
      <ul className=' w-320'>
        {Array(20).fill().map((e, i) => (
          <li className='flex justify-between p-4 my-4 border-2 rounded-lg text-gray border-sky hover:text-white hover:bg-sky' key={i}>
            <span>한국 vs 일본</span>
            <div className='flex justify-between w-1/4'>
              <span>point</span>
              <span>0000/00/00</span>
            </div>
          </li>
        ))}
        
      </ul>
    </section>
  )
}

export default index