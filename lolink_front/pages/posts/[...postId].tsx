import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'
import { BiLike, BiTimeFive, BiMessageRounded, BiHash, BiDislike, BiShow } from 'react-icons/bi';
import { userState } from '@/stores/user';
import { IPost } from '@/types/post';
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
import Typograph from '../../components/atoms/Typograph';
import PostPageHeader from '../../components/organisms/post/PostPageHeader';
import PostPageButton from '../../components/organisms/post/PostPageButton';
import PostPageHashtag from '../../components/organisms/post/PostPageHashtag';
import PostPageRecommend from '../../components/organisms/post/PostPageRecommend';
import PostPageCommentsSection from '../../components/organisms/post/PostPageComments';

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

  const { data: post, isLoading: postLoading } = useQuery(['posts', postId], () => getPostApi(postId));
  const { data: comments, isLoading: commentLoading } = useQuery(['comments', currentPage], () => getCommentsApi(postId, currentPage));

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

  if (!postId || postLoading || commentLoading) {
    return <Loading />
  }
  
  const { id, title, nickname, body, createdAt, category, recommendCount, userId, hashtags, views } = post?.data;

  const isMyPost = state?.id === userId;

  const readingTime = calculateReadingTime(body);

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
    <section className='flex flex-col flex-wrap items-center justify-center'>
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