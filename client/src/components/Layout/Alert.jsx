import { useContext } from 'react';
import AlertContext from '../../context/Alert/AlertContext';

const Alert = () => {
  const { alert } = useContext(AlertContext);

  if (!alert) return null;

  const bgColor = alert.type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`fixed top-20 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transition-all`}>
      {alert.message}
    </div>
  );
};

export default Alert;
