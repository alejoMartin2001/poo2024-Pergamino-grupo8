
import { useEffect } from 'react';
import { useAlert } from 'src/contexts/AlertProvider';

import { LoginForm } from '@components/login';

import pattern from '../images/bg-pattern.svg';

export const Login = () => {

  const { showAlert } = useAlert();

  // Esto aparecerá solamente cuando nos registremos exitosamente.
  useEffect(() => {
    const message = localStorage.getItem("alertMessage");
    const type = localStorage.getItem("alertType") as "success" | "error" | "warning" | "info";
    const title = localStorage.getItem("alertTitle");

    if (title && message && type) {
      showAlert(title, message, type);
      localStorage.removeItem("alertMessage");
      localStorage.removeItem("alertType");
      localStorage.removeItem("alertTitle");
    }
  }, [showAlert]);

  return (
    <div className="flex w-full h-screen text-white">
      <div className={`w-full flex items-center justify-center bg-[#1A1B25] bg-cover bg-center h-full`}
        style={{ 
          backgroundImage: `linear-gradient(to top, rgba(26,27,37,1), rgba(26,27,37,0)), url(${pattern})`,
        }}>
        <LoginForm/>
      </div>
    </div>
  );
};