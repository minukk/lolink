import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>LoLink</title>
        <meta name="description" content="Local Link Communication and Trade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className='font-noto h-screen'>
        <div className='bg-sugar h-1/5'>인기 상품</div>
        <div className='h-1/5'>추천 상품(개인)</div>
        <div className='bg-mint h-1/5'>인기 글</div>
        <div className='h-1/5'>추천 글(개인)</div>
      </main>
    </>
  )
}
