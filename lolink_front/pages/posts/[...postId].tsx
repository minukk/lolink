import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { BiLike, BiTimeFive, BiMessageRounded, BiHash } from 'react-icons/bi';
import { userState } from '@/stores/user';
import { IPost } from '@/types/post';
import { displayCreatedAt, getFormatDate } from '@/utils/dateForm';
import Link from 'next/link';
import { deletePostApi, getPostApi } from '../api/post';
import { GetServerSidePropsContext } from 'next';
import CommentInput from '@/components/molecules/CommentInput';
import CommentItem from '@/components/molecules/CommentItem';
import { getCommentsApi } from '../api/comment';
import { useQuery } from 'react-query';
import Loading from '@/components/atoms/Loading';
import DOMPurify from 'dompurify';

interface IPostPage {
  initialPostData: IPost;
}

const PostPage: React.FC<IPostPage> = ({ initialPostData }) => {
  const { state } = userState();
  const [currentPage, setCurrentPage] = useState(1);
  const [post, setPost] = useState<IPost>(initialPostData);
  
  const router = useRouter();

  const postId = router.query?.postId?.[0];

  if (!postId) {
    return <div>로딩중...</div>
  }

  const { isLoading, data } = useQuery(['comments', currentPage], () => getCommentsApi(postId, currentPage));
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPostApi(postId);
        setPost(res.data);
      } catch(error) {
        console.error('게시글을 불러오는데 실패했습니다.', error);
      }
    };
    fetchData();
  }, []);

  const onDeletePost = async () => {
    await deletePostApi(postId);
    router.replace('/posts');
  }

  if (!post || isLoading) {
    return <Loading />
  }
  
  const { id, title, nickname, body, updatedAt, category, recommend, userId } = post;

  const isMyPost = state?.id === userId;

  return (
    <section className='flex flex-col flex-wrap items-center justify-center'>
      <div className='py-8 my-8 w-160 lg:w-4/5'>
        <h3 className='py-8 text-3xl'>{title}</h3>
        <div className='flex text-lg'>
          <span className='mr-2 text-gray'>{nickname}</span>
          <div className='flex items-center mx-2 text-gray'>
            <BiTimeFive />
            <span className='mx-1'>{displayCreatedAt(updatedAt)}</span>
          </div>
          <div className='flex items-center mx-2 text-gray'>
            <BiLike />
            <span className='mx-1'>{recommend}</span>
          </div>
          <div className='flex items-center mx-2 text-gray'>
            <BiMessageRounded />
            <span className='mx-1'>댓글수</span>
          </div>
        </div>
        <p className='py-8' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}/>
        <div className='flex items-center text-sky'>
          <BiHash />
          <div>hashtag</div>
        </div>
        <div className='flex justify-end mt-4 text-white'>
          {isMyPost &&
            <>
              <button className='px-4 py-2 mr-2 rounded-lg bg-red hover:bg-onred' onClick={onDeletePost}>삭제</button>
              <Link href={`/posts/update/${id}`}>
                <button className='px-4 py-2 ml-2 rounded-lg bg-green hover:bg-ongreen'>수정</button>
              </Link>
            </>
          }
        </div>
      </div>
      <div className='pb-2 mb-20 border-2 rounded-lg w-160 lg:w-4/5 border-sky'>
        <div className='flex flex-wrap items-center p-2 text-white bg-sky'>
          <BiMessageRounded />
          <h4 className='mx-2'>댓글창</h4>
        </div>
        <div>
          {data?.data?.data &&
            <>
              <ul className='p-2'>
                {data?.data?.data?.map((item: IComment, i: number) => <CommentItem key={i} {...item} />)}
              </ul>
              <div className='flex justify-center'>
                {Array.from({ length: data?.data?.meta?.last_page }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className='px-4 py-2 m-2 rounded-lg text-sky hover:text-white hover:bg-sky'
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          }
          <div className='p-2'>
            <CommentInput />
          </div>
        </div>
    </div>
    </section>
  )
}

export default PostPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const postId = context.params?.postId?.[0]; // 라우터 매개 변수에서 postId를 가져옵니다.
    
    if (!postId) {
      console.error('postId가 존재하지 않습니다.');
      return {
        notFound: true,
      };
    }

    const res = await getPostApi(postId);
    console.log(res.data);
    return {
      props: {
        initialPostData: res.data, // 초기 데이터를 props로 전달합니다.
      }
    };
  } catch (error) {
    console.error('게시글을 불러오는데 실패했습니다.', error);
    return {
      notFound: true, // 에러가 발생하면 404 페이지를 표시합니다.
    };
  }
}