import axios, { AxiosError } from 'axios';

const API = process.env.NEXT_PUBLIC_API;

export const signUpApi = (sign: ICreateUser) => {
  const { email, password, nickname, phone } = sign;
  return axios.post(`${API}/user/signup`, { email, password, nickname, phone });
}

export const signInApi = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API}/user/signin`, { email, password });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('로그인 실패: ', axiosError.response?.data);
    throw error;
  }
}

export const getUserInfo = () => {
  const user = axios.get(`http://localhost:3333/user/me`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
    }
  });

  return user;
}

