import { useReducer, useContext, useEffect } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import AlertContext from '../Alert/AlertContext';
import clientAxios from '../../config/axios';
import getToken from '../../config/token';

const UserState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    loading: true
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);
  const { setAlert } = useContext(AlertContext);

  // Sincronizar estado cuando cualquier petición recibe 401 (token expirado/inválido)
  useEffect(() => {
    const onUnauthorized = () => dispatch({ type: 'AUTH_ERROR' });
    window.addEventListener('auth:unauthorized', onUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', onUnauthorized);
  }, []);

  const registerUser = async (formData) => {
    try {
      const res = await clientAxios.post('/api/users/register', formData);
      const jwt = res.data.token;
      dispatch({ type: 'REGISTER_SUCCESS', payload: jwt });
      await getAuthUser(jwt);
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
      setAlert(error.response?.data?.message || 'Registration failed', 'error');
    }
  };

  const loginUser = async (formData) => {
    try {
      const res = await clientAxios.post('/api/users/login', formData);
      const jwt = res.data.token;
      dispatch({ type: 'LOGIN_SUCCESS', payload: jwt });
      await getAuthUser(jwt);
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
      let msg = error.response?.data?.message || 'Login failed';
      if (error.code === 'ERR_NETWORK') {
        msg = 'No se pudo conectar al servidor. ¿Está corriendo en http://localhost:5000?';
      } else if (msg === 'Invalid credentials') {
        try {
          await clientAxios.get('/api/users/seed-demo');
        } catch (_) {}
        msg = 'Usuario demo creado o ya existía. Intenta de nuevo: demo@urbanthreads.com / demo123';
      }
      setAlert(msg, 'error');
    }
  };

  // tokenOverride: used right after login/register when localStorage may not be read yet by interceptor
  const getAuthUser = async (tokenOverride) => {
    const jwt = tokenOverride || localStorage.getItem('token');
    if (!jwt) {
      dispatch({ type: 'AUTH_ERROR' });
      return;
    }
    try {
      const res = await clientAxios.get('/api/users/verify', {
        headers: { 'x-auth-token': jwt }
      });
      dispatch({ type: 'GET_USER', payload: res.data });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const ensureDemoUser = async () => {
    try {
      const res = await clientAxios.get('/api/users/seed-demo');
      setAlert(res.data.message || 'Usuario demo listo.', 'success');
    } catch (error) {
      setAlert(error.response?.data?.message || 'No se pudo crear el usuario demo.', 'error');
    }
  };

  const setLoading = (value) => {
    dispatch({ type: 'SET_LOADING', payload: value });
  };

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        registerUser,
        loginUser,
        getAuthUser,
        logout,
        setLoading,
        ensureDemoUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
