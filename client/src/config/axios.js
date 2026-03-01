import axios from 'axios';

const envUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const baseURL = envUrl !== undefined && envUrl !== '' ? envUrl : '';

const clientAxios = axios.create({ baseURL });

// Asegurar que cada petición lleve el token si existe (evita "No token, authorization denied")
clientAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Ante 401: token expirado o inválido → limpiar y notificar para cerrar sesión
clientAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject(err);
  }
);

export default clientAxios;
