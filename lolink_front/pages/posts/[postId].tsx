import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { userState } from '@/stores/user';
import { IPost } from '@/types/post';
import { deletePostApi, getCookieApi, getPostApi, getPostsApi, useNotRecommendMutation, useRecommendMutation } from '../api/post';
import { getCommentsApi } from '../api/comment';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import Loading from '@/Components/Atoms/Loading';
import DOMPurify from 'dompurify';
import Alert from '@/Components/Atoms/Alert';
import { IComment } from '@/types/comment';
import { calculateReadingTime } from '../../utils/readingTime';
import PostPageHeader from '../../Components/Organisms/post/PostPageHeader';
import PostPageButton from '../../Components/Organisms/post/PostPageButton';
import PostPageHashtag from '../../Components/Organisms/post/PostPageHashtag';
import PostPageRecommend from '../../Components/Organisms/post/PostPageRecommend';
import PostPageCommentsSection from '../../Components/Organisms/post/PostPageComments';
import { GetStaticPropsContext } from 'next';
import HeadTitle from '../../Components/Atoms/HeadTitle';

const PostPage = () => {
  const { state } = userState();
  const [currentPage, setCurrentPage] = useState(1);
  const useRecommend = useRecommendMutation();
  const useNotRecommend = useNotRecommendMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  const router = useRouter();

  const postId = parseInt(router.query?.postId as string);

  const { data: post, isLoading: postLoading } = useQuery(['post', postId], () => getPostApi(postId));
  const { data: comments, isLoading: commentLoading } = useQuery(['comments', currentPage], () => getCommentsApi(postId, currentPage));

  useEffect(() => {
    getCookieApi(postId);
  }, [])

  const onDeletePost = async () => {
    await deletePostApi(postId);
    router.replace('/posts');
  }

  const handleRecommend = useCallback(() => {
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
  }, [state, postId]);
  
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

  const readingTime = useMemo(() => calculateReadingTime(post?.body) || 0, [post?.body]);
  
  if (!postId || postLoading || commentLoading) {
    return <Loading />
  }

  const { id, title, nickname, body, createdAt, category, recommendCount, userId, hashtags, views } = post;
  
  const isMyPost = state?.id === userId;  

  const postProps = {
    title,
    nickname,
    views,
    recommendCount,
    commentsCount: comments?.data?.data?.length,
    createdAt,
    readingTime
  };
  
  return (
    <>
      <HeadTitle title={`LoLink | ${title}`} />
      <section className='flex flex-col flex-wrap items-center justify-center h-screen'>
        <div className='py-8 my-8 w-160 lg:w-full'>
          <PostPageHeader {...postProps} />
          <p className='py-8' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}/>
          <PostPageHashtag hashtags={hashtags} />
          <PostPageButton isMyPost={isMyPost} onDeletePost={onDeletePost} id={id} />
        </div>
        <PostPageRecommend handleRecommend={handleRecommend} handleNotRecommend={handleNotRecommend} />
        <PostPageCommentsSection comments={comments?.data?.data} lastPage={comments?.data?.lastPage} onPageChange={setCurrentPage} />
        {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
      </section>
    </>
  )
}

export default PostPage;

export async function getStaticPaths() {
  const posts = await getPostsApi(1);
  const paths = posts.data.map((post: IPost) => ({
    params: { postId: post.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const queryClient = new QueryClient();
  const postId = Number(context?.params?.postId);
  await queryClient.prefetchQuery(['post', postId], () => getPostApi(postId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}
