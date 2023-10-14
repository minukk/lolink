import axios, { AxiosError } from 'axios';

const API = process.env.NEXT_PUBLIC_API;

export function signUpApi (sign: ICreateUser) {
  const { email, password, nickname, phone } = sign;
  return axios.post(`${API}/user/signup`, { email, password, nickname, phone });
}

export async function signInApi (email: string, password: string) {
  try {
    const res = await axios.post(`${API}/user/signin`, { email, password });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('로그인 실패: ', axiosError.response?.data);
    throw error;
  }
    // .then((res) => { sessionStorage.setItem('lolink', res.data.token) });
}
