import axios from 'axios';
import { tratarErro } from '../shared/lib/ref/toast/notificacoes';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 16000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    tratarErro(error);
    return Promise.reject(error);
  }
);

export default api;