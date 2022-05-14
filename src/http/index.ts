import { store } from '@/store';
import axios, { AxiosInstance } from 'axios';

const clienteHttp: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Content-Type": "application/json;charset=UTF-8",
    'X-Requested-With': 'XMLHttpRequest'
  }
});

clienteHttp.interceptors.request.use((config) => {
  const token = store.state.token
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return config
}, (erro) => Promise.reject(erro))


export default clienteHttp;