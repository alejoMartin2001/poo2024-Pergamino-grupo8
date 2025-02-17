import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  type?: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
}

export const Alert = ({ title, type = "info", message, duration = 5000 }: Props) => {

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const icons = {
    success: <CheckCircle className="text-green-500" />,
    error: <XCircle className="text-red-500" />,
    warning: <AlertTriangle className="text-yellow-500" />,
    info: <Info className="text-blue-500" />,
  };

  if (!visible) return null;

  const colors = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
  };

  return (
    <div
      className={`fixed bottom-4 right-4  p-2 border-l-4 rounded-md shadow-lg transition-all duration-300 ease-in-out
        ${colors[type]} ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
      `}
    >
      <div className="flex items-center">
        {icons[type]}
        <div className='flex flex-col'>
          <h4 className='ml-3 font-medium '>{title}</h4>
          <div className="ml-3 ">{message}</div>
        </div>
        
        <button onClick={() => setVisible(false)} className="ml-4 mr-2 text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
    </div>
  )
}
