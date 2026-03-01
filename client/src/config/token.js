import clientAxios from './axios';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    clientAxios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete clientAxios.defaults.headers.common['x-auth-token'];
  }
};

export default getToken;
