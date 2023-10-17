import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API;

export const getSearchApi = (search: string) => {
  return axios.get(`${API}/search?query=${search}`);
}