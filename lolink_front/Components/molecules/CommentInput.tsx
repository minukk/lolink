import React, { useState } from 'react'
import { createCommentApi, useCommentMutation } from '@/pages/api/comment'
import { userState } from '@/stores/user';
import { useRouter } from 'next/router';

const CommentInput = () => {
  const { state } = userState();
  const [content, setContent] = useState('');
  const router = useRouter();
  const commentMutation = useCommentMutation();

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      onCreateComment();
    }
  }

  const onCreateComment = () => {
    if (!content || !state?.id || !router.query?.postId?.[0]) {
      console.error('댓글 생성을 위한 필수 정보가 누락되었습니다.');
      return;  // 필수 값이 누락된 경우 함수를 종료합니다.
    }  

    const comment = {
      content: content,
      userId: state.id,
      postId: router.query?.postId?.[0]
    }

    try {
      commentMutation.mutate(comment);
      setContent('');
    } catch (error) {
      console.error('댓글 등록 실패: ', error);
    }
  }

  return (
    <div className='flex items-center justify-between p-2 border rounded-lg border-sky'>
      <input type='text' placeholder='댓글을 입력해주세요!' className='w-4/5 outline-none' onChange={handleComment} value={content} onKeyDown={handleEnter}/>
      <button className='px-3 py-2 text-white rounded-lg bg-sky' onClick={onCreateComment}>확인</button>
    </div>
  )
}

export default CommentInput;
