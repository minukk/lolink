import HeadTitle from '../../Components/Atoms/HeadTitle'
import PostList from '../../Components/Molecules/PostList'
import TopPost from '../../Components/Organisms/TopPost'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { getPostsApi } from '../api/post'
import { IPost } from '../../types/post'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '../../Components/Atoms/Loading'
import Typograph from '../../Components/Atoms/Typograph'
import Modal from '../../Components/Molecules/Modal'
import Button from '../../Components/Atoms/Button'
import { userState } from '../../stores/user'
import { GetServerSidePropsContext } from 'next'

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const { state } = userState();
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const { data, isLoading } = useQuery(['posts', page], () => getPostsApi(page));

  const handleWriteButton = () => {
    if (state && router.asPath === '/posts') {
      router.push('/posts/write');
    }
    else {
      setShowModal(true);
    }
  }
  const posts = data.data;

  console.log(data);

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <HeadTitle title='LoLink | 게시판' />
      <div className='flex justify-center'>
        <section className='text-center w-320 2xl:w-2/3 lg:w-4/5 sm:w-screen'>
          <TopPost />
          <Typograph tag='h3'>커뮤니티</Typograph>
          <div className='flex justify-end my-12 md:my-4'>
            <Button onClick={handleWriteButton} disabled={!state} label='글쓰기'>글쓰기</Button>
          </div>
          <ul className='flex flex-wrap justify-center border-y-2 border-sky'>
            {posts?.map((item: IPost, i: number) => (
              <PostList key={item.title + i} {...item} />
            ))}
          </ul>
          <div className='mb-16 md:mb-0'>
            {Array.from({ length: data?.data?.meta?.last_page || 0 }).map((_, index) => (
              <button key={index} onClick={() => router.push(`/posts?page=${index + 1}`)} className='px-4 py-2 m-2 rounded-lg text-sky hover:text-white hover:bg-sky'>
                {index + 1}
              </button>
            ))}
          </div>
        </section>
      </div>
      {showModal && <Modal onclose={() => setShowModal(false)}/>}
    </>
  )
}

export default Posts;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(['posts', 1], () => getPostsApi(1));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
