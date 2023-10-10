import HeadTitle from '@/components/atoms/HeadTitle'
import TypoH2 from '@/components/atoms/TypoH2'
import WriteButton from '@/components/atoms/WriteButton'
import PostList from '@/components/molecules/PostList'
import TopPost from '@/components/organisms/TopPost'
import { userState } from '@/stores/user'


const Posts = () => {
  const { state } = userState();

  return (
    <>
      <HeadTitle title='LoLink | 게시판' />
      <div className='flex justify-center'>
        <section className='text-center w-320 2xl:w-2/3 lg:w-4/5'>
          <TopPost />
          <h2 className='text-3xl font-bold text-sky'>게시글</h2>
          <div className='flex justify-end my-12 md:my-4'>
            <WriteButton text='글쓰기'/>
          </div>
          <ul className='flex flex-wrap justify-center mb-16 border-2 rounded-lg border-sky'>
          {Array(20).fill().map((i) => (
            <PostList key='i' />
          ))}
          </ul>
        </section>
      </div>
    </>
  )
}

export default Posts