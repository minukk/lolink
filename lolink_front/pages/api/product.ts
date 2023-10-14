import { ICreateProduct, IUpdateProduct } from '@/types/product';
import axios from 'axios';
import router from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

const API = process.env.NEXT_PUBLIC_API;

export async function getProducts(page: number) {
  const data = await axios.get(`${API}/product?page=${page}`);

  return data;
}

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ICreateProduct, any>(
    (product) => axios.post(`${API}/product/write`, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products']);
        router.push('/products');
      }
    }
  )
}

export function sendImage(formData: any) {
  // console.log('----formData ----');
  // for (let [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }

  return axios.post(`${API}/product/images`, formData, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    },
  });
}

export function getProductApi(productId: string) {
  return axios.get(`${API}/product/${productId}`);
}

export function updateProductApi(productId: string, product: IUpdateProduct) {
  return axios.patch(`${API}/product/${productId}`, product, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}

export function deleteProductApi(productId: string) {
  return axios.post(`${API}/product/delete/${productId}`, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });
}