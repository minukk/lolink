import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex space-x-2 text-4xl font-bold text-sky">
          <span className='animate-bounce100'>L</span>
          <span className='animate-bounce200'>o</span>
          <span className='animate-bounce300'>L</span>
          <span className='animate-bounce400'>i</span>
          <span className='animate-bounce500'>n</span>
          <span className='animate-bounce600'>k</span>
      </div>
    </div>
  )
}

export default Loading