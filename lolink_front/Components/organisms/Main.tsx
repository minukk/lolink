import React from 'react'
import Head from 'next/head'
import MainProductList from './MainProductList'
import MainPostList from './MainPostList'
import MainImage from '../atoms/MainImage'

const Main = () => {
  return (
    <>
      <Head>
        <title>LoLink</title>
        <meta name="description" content="Local Link Communication and Trade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className='w-screen font-noto'>
          <MainImage />
          {/* <div className='bg-blush h-1/5'>최신 상품</div>
          <div className='bg-sugar h-1/5'>인기 상품</div>
          <div className='h-1/5'>추천 상품(개인)</div> */}
          {/* <div className='bg-mint h-1/5'>인기 글</div>
          <div className='bg-periwinkle h-1/5'>최신 글</div> */}
          <MainPostList title='인기글'/>
          <MainPostList title='최신글'/>
          <MainProductList title='인기 상품'/>
          <MainProductList title='최신 상품'/>
          <MainProductList title='추천 상품'/>
      </main>
    </>
  )
}

export default Main