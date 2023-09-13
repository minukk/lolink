import HeadTitle from '@/Components/atoms/HeadTitle'
import TypoH2 from '@/Components/atoms/TypoH2'
import PostList from '@/Components/molecules/PostList'

const Posts = () => {
  return (
    <>
      <HeadTitle title='LoLink | 게시판' />
      <main className='p-36 text-center'>
        <TypoH2 title='게시판' />
        <ul className='flex flex-wrap justify-center my-8'>
        {Array(20).fill().map((i) => (
          <PostList key='i' />
        ))}
        </ul>
      </main>
    </>
  )
}

export default Posts