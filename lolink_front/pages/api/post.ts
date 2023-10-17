import axios from 'axios';
import router from 'next/router';
import {  useMutation, useQueryClient } from 'react-query';
import { ICreatePost, IUpdatePost } from '@/types/post';

const API = process.env.NEXT_PUBLIC_API;

export const getPosts = (page: number) => {
  const data = axios.get(`${API}/post?page=${page}`);

  return data;
}

export const usePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (post) => axios.post(`${API}/post/write`, post, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
      }
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        router.push('/posts');
      }
    }
  )
}

export const getPostApi = (postId: number) => {
  return axios.get(`${API}/post/${postId}`, { withCredentials: true });
}

export const createPostApi = (post: ICreatePost) => {
  return axios.post(`${API}/post/write`, post, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}

export const updatePostApi = (postId: string, post: IUpdatePost) => {
  return axios.patch(`${API}/post/${postId}`, post, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}

export const deletePostApi = (postId: number) => {
  return axios.post(`${API}/post/delete/${postId}`, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}

export const recommendApi = (postId: number, userId: string) => (
  axios.post(`${API}/post/${postId}/recommend`, { userId: userId }, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  })
);

export const notRecommendApi = (postId: number, userId: string) => (
  axios.post(`${API}/post/${postId}/not-recommend`, { userId: userId }, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  })
);

export const useRecommendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ postId, userId }: { postId: number, userId: string }) => recommendApi(postId, userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
      }
    }
  )
}

export const useNotRecommendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ postId, userId }: { postId: number, userId: string }) => recommendApi(postId, userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
      }
    }
  )
}
