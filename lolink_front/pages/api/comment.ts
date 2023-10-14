import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const API = process.env.NEXT_PUBLIC_API;

// export async function commentQueryFn(postId: string) {
//   const data = await axios.get(`${API}/comment/${postId}`);

//   return data;
// }

export function createCommentApi (comment: ICreateComment) {
  return axios.post(`${API}/comment/write`, comment);
}

export async function getCommentsApi(postId: string, page: number) {
  return axios.get(`${API}/comment/${postId}?page=${page}`);
}

export const useCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (comment) => axios.post(`${API}/comment/write`, comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments']);
      }
    }
  )
}
