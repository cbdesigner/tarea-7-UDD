import { useReducer } from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';

const AlertState = ({ children }) => {
  const initialState = { alert: null };
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (message, type = 'error') => {
    dispatch({ type: 'SET_ALERT', payload: { message, type } });
    setTimeout(() => dispatch({ type: 'CLEAR_ALERT' }), 4000);
  };

  return (
    <AlertContext.Provider value={{ alert: state.alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
