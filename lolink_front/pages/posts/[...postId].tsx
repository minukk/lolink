import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BiLike, BiTimeFive, BiMessageRounded, BiHash, BiDislike, BiShow } from 'react-icons/bi';
import { userState } from '@/stores/user';
import { IPost } from '@/types/post';
import { getFormatDate } from '@/utils/dateForm';
import Link from 'next/link';
import { deletePostApi, getPostApi, useNotRecommendMutation, useRecommendMutation } from '../api/post';
import CommentInput from '@/components/molecules/CommentInput';
import CommentItem from '@/components/molecules/CommentItem';
import { getCommentsApi } from '../api/comment';
import { useQuery } from 'react-query';
import Loading from '@/components/atoms/Loading';
import DOMPurify from 'dompurify';
import { IHashtag } from '@/types/hashtag';
import Alert from '@/components/atoms/Alert';
import { IComment } from '@/types/comment';
import { calculateReadingTime } from '../../utils/readingTime';

interface IPostPage {
  initialPostData: IPost;
  initialComments: IComment;
}

const PostPage: React.FC<IPostPage> = ({ initialPostData, initialComments }) => {
  const { state } = userState();
  const [currentPage, setCurrentPage] = useState(1);
  const useRecommend = useRecommendMutation();
  const useNotRecommend = useNotRecommendMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // const [post, setPost] = useState<IPost>();
  
  const router = useRouter();

  const postId = Number(router.query?.postId?.[0]);

  if (!postId) {
    return <Loading />
  }

  const { data: post, isLoading: postLoading } = useQuery(['posts', postId], () => getPostApi(postId));
  const { data: comments, isLoading: commentLoading } = useQuery(['comments', currentPage], () => getCommentsApi(postId, currentPage));

  if (postLoading || commentLoading) {
    return <Loading />
  }

  const onDeletePost = async () => {
    await deletePostApi(postId);
    router.replace('/posts');
  }

  const handleRecommend = () => {
    try {
      if (!state) {
        setAlertMessage('로그인 후 이용해주세요!');
        setShowAlert(true);
        return;
      }
      useRecommend.mutate({ postId: postId, userId: state?.id });
    } catch (error) {
      setAlertMessage('이미 추천하셨습니다!');
      setShowAlert(true);
      console.error('추천에 실패했습니다.', error);
    }
  };
  
  const handleNotRecommend = () => {
    try {
      if (!state) {
        setAlertMessage('로그인 후 이용해주세요!');
        setShowAlert(true);
        return;
      }
      useNotRecommend.mutate({ postId: postId, userId: state?.id });
    } catch (error) {
      setAlertMessage('이미 비추천하셨습니다!');
      setShowAlert(true);
      console.error('비추천에 실패했습니다.', error);
    }
  };
  
  const { id, title, nickname, body, createdAt, category, recommendCount, userId, hashtags, views } = post?.data;

  const isMyPost = state?.id === userId;

  const readingTime = calculateReadingTime(body);
  
  return (
    <section className='flex flex-col flex-wrap items-center justify-center'>
      <div className='py-8 my-8 w-160 lg:w-full'>
        <h3 className='py-8 text-3xl'>{title}</h3>
        <div className='flex text-lg'>
          <span className='mr-2 text-gray'>{nickname}</span>
          <div className='flex items-center mx-2 text-gray'>
            <BiTimeFive />
            <span>{getFormatDate(createdAt)[0]}</span>
            <span className='mx-1'>{getFormatDate(createdAt)[1]}</span>
          </div>
          <div className='flex items-center mx-2 text-gray'>
            <BiShow />
            <span className='mx-1'>{views}</span>
          </div>
          <div className='flex items-center mx-2 text-gray'>
            <BiLike />
            <span className='mx-1'>{recommendCount}</span>
          </div>
          <div className='flex items-center mx-2 text-gray'>
            <BiMessageRounded />
            <span className='mx-1 sm:hidden'>댓글수</span>
            <span>{comments?.data?.data?.length || 0}</span>
          </div>
          <div>
            <span className='mx-2 text-gray'>소요시간: {readingTime} 분</span>
          </div>
        </div>
        <p className='py-8' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}/>
        <div className='flex'>
          {hashtags && hashtags.map((hashtag: IHashtag) => (
            <div key={hashtag.id} className='flex items-center mr-4 text-sky'>
              <BiHash />
              <span>{hashtag.tag}</span>
            </div>
          ))}
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
      <div className='flex mb-10 text-xl text-sky'>
        <button className='flex items-center p-2 mx-4 rounded-lg hover:text-white hover:bg-sky' onClick={handleRecommend}><BiLike />추천</button>
        <button className='flex items-center p-2 mx-4 rounded-lg hover:text-white hover:bg-sky' onClick={handleNotRecommend}><BiDislike />비추천</button>
      </div>
      <div className='pb-2 mb-20 border-2 rounded-lg w-160 lg:w-full border-sky'>
        <div className='flex flex-wrap items-center p-2 text-white bg-sky'>
          <BiMessageRounded />
          <h4 className='mx-2'>댓글</h4>
          <span>{comments?.data?.data?.length || 0}개</span>
        </div>
        <div>
          {comments?.data?.data &&
            <>
              <ul className='p-2'>
                {comments?.data?.data?.map((item: IComment, i: number) => <CommentItem key={i} {...item} />)}
              </ul>
              <div className='flex justify-center'>
                {Array.from({ length: comments?.data?.meta?.last_page }).map((_, index) => (
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
    {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
    </section>
  )
}

export default PostPage;

// getServerSideProps 함수 추가
export const getServerSideProps = async (context) => {
  const postId = Number(context.query.postId?.[0]);
  
  // postId가 유효하지 않으면 404 에러 페이지를 표시
  if (!postId) {
    return {
      notFound: true,
    };
  }

  // 게시글과 댓글에 대한 초기 데이터를 가져옴
  const post = await getPostApi(postId);
  const comments = await getCommentsApi(postId, 1); // 1 페이지의 댓글만 가져옴

  return {
    props: {
      initialPostData: post.data,
      initialComments: comments.data,
    }
  };
};