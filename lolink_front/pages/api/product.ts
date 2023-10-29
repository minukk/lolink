import { ICreateProduct, IProduct, IUpdateProduct } from '../../types/product';
import axios from 'axios';
import router from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

const API = process.env.NEXT_PUBLIC_API;

export const getProductsApi = async (page: number) => {
  try {
    const data = await axios.get(`${API}/product?page=${page}`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export const useProductMutation = (): any => {
  const queryClient = useQueryClient();

  return useMutation<ICreateProduct, any>(
    (product) => axios.post(`${API}/product/write`, product, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
      }
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products']);
        router.push('/products');
      }
    }
  )
}

export const sendImage = (formData: any) => {
  return axios.post(`${API}/product/images`, formData, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    },
  });
}

export const getProductApi = async (productId: string) => {
  try {
    const data = await axios.get(`${API}/product/${productId}`, {
      withCredentials: true,
    });
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export const updateProductApi = (productId: string, product: IUpdateProduct) => {
  return axios.patch(`${API}/product/${productId}`, product, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}

export const deleteProductApi = (productId: string) => {
  return axios.post(`${API}/product/delete/${productId}`, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}

/**
 * 이미지를 서버로 전송하는 함수
 * @param imageUrls 이미지 URL 배열
 * @param sendImage 이미지를 서버로 전송하는 함수
 * @returns 서버 응답에 포함된 이미지 URL 배열
 */
export const sendImagesToServer = async (imageUrls: string[]) => {
  const formData = new FormData();

  for (let i = 0; i < imageUrls.length; i++) {
    // 이미지 데이터를 Blob 형태로 가져오기
    const response = await fetch(imageUrls[i]);
    const blob = await response.blob();
    // FormData에 Blob 데이터 추가
    formData.append(`images`, blob);
  }

  // 서버에 POST 요청 보내기
  try {
    const res = await sendImage(formData);
    console.log('이미지 전송 성공');
    return res.data.imageUrls;
  } catch (error) {
    console.error('이미지 전송 실패:', error);
  }
}

export const useLikeMutation = (): any => {
  const queryClient = useQueryClient();

  return useMutation(
    (data : { id: string, likeId: string }) =>  axios.post(`${API}/product/like/${data.id}`, { userId: data.likeId }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
      }
    }),
    {
      onSuccess: () => queryClient.invalidateQueries(['product'])
    }
  )
}

export const useUnlikeMutation = (): any => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { id: string, likeId: string }) =>  axios.post(`${API}/product/unlike/${data.id}`, { userId: data.likeId }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
      }
    }),
    {
      onSuccess: () => queryClient.invalidateQueries(['product'])
    }
  )
}

export const getCookieApi = async (id: string)  => {
  return await axios.get(`${API}/product/cookie/${id}`, { withCredentials: true });
}
