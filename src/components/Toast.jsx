import { useApp } from '../context/AppContext';

const Toast = () => {
  const { toast } = useApp();

  return (
    <div className={`toast ${toast.show ? 'show' : ''}`}>
      {toast.message}
    </div>
  );
};

export default Toast;
