import axios from 'axios';
import router from 'next/router';
import {  useMutation, useQueryClient } from 'react-query';
import { ICreatePost, IUpdatePost } from '@/types/post';

const API = process.env.NEXT_PUBLIC_API;

export async function getPosts(page: number) {
  console.log(page);
  const data = await axios.get(`${API}/post?page=${page}`);

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

export function getPostApi(postId: string) {
  return axios.get(`${API}/post/${postId}`);
}

export function createPostApi(post: ICreatePost) {
  return axios.post(`${API}/post/write`, post, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}

export function updatePostApi(postId: string, post: IUpdatePost) {
  return axios.patch(`${API}/post/${postId}`, post, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}

export function deletePostApi(postId: string) {
  return axios.post(`${API}/post/delete/${postId}`, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}

export function recommendApi(postId: string, userId: string) {
  return axios.post(`${API}/post/${postId}/recommend`, { userId: userId }, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}

export function notRecommendApi(postId: string, userId: string) {
  return axios.post(`${API}/post/${postId}/not-recommend`, { userId: userId }, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}

// export const useGetUser = async (userId: string, options: QueryOptions) => {
//   const queryKey = `https://api.test.com/user`;
//   const queryFn = await axios.get(`${queryKey}?userId=${userId}`).then((res) => res.data);
//   return useQuery([queryKey, userId], queryFn, { ...options });
// };

// // useMutation 예시
// export const usePutUser = async (data: IUser, options: QueryOptions) => {
//   const queryKey = `https://api.test.com/user`;
//   const queryFn = await axios.put(`${queryKey}?userId=${data.id}`, data).then((res) => res.data);
//   return useMutation([queryKey, data.id], queryFn, { ...options });
// };