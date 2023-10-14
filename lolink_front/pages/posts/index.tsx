import HeadTitle from '@/components/atoms/HeadTitle'
import WriteButton from '@/components/atoms/WriteButton'
import PostList from '@/components/molecules/PostList'
import TopPost from '@/components/organisms/TopPost'
import { useQuery } from 'react-query'
import { getPosts } from '../api/post'
import { IPost } from '@/types/post'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import Loading from '@/components/atoms/Loading'

const Posts = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const { data, isLoading } = useQuery(['posts', page], () => getPosts(page));

  const posts = useMemo(() => data?.data.data, [data]);

  if (isLoading) {
    return <Loading />
  }

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
          <ul className='flex flex-wrap justify-center'>
            {posts?.map((item: IPost, i: number) => (
              <PostList key={item.title + i} {...item} />
            ))}
          </ul>
          <div className='mb-16'>
            {Array.from({ length: data?.data.meta.last_page }).map((_, index) => (
              <button key={index} onClick={() => router.push(`/posts?page=${index + 1}`)} className='px-4 py-2 m-2 rounded-lg text-sky hover:text-white hover:bg-sky'>
                {index + 1}
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Posts

// export const getServerSideProps: GetServerSideProps = async () => {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(['posts'], queryFn);
//   return {
//     props: {
//       dehydratedProps: dehydrate(queryClient),
//       post,
//     },
//   };
// };