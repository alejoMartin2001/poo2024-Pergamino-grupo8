
import { X } from "lucide-react";
import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "xs" | "small" | "medium" | "large" | "xl" | "xxl";
}

export const Modal = ({ isOpen, onClose, title, children, size = "medium" }: Props) => {

  if (!isOpen) return null;

  let modalSize = "w-96 p-3"; // "medium"
  if (size === "xs") modalSize = "w-48 p-2"; 
  if (size === "small") modalSize = "w-64 p-2";
  if (size === "large") modalSize = "w-[32rem] p-4";
  if (size === "xl") modalSize = "w-[40rem] p-5";  
  if (size === "xxl") modalSize = "w-[50rem] p-6"; 

// backdrop-blur-xs
  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-30 z-50">
      <div className={`bg-gray-800 rounded-lg shadow-lg ${modalSize}`}>
        {title &&
          <div className="flex justify-between items-center max-lg:mb-2">
            <h2 className="text-xl text-white font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-600 cursor-pointer"
            >
              <X />
            </button>
          </div>
        }

        <div>{children}</div>

        {/* <div className="mt-4 w-full flex justify-end">
          <button
            onClick={onClose}
            className="w-1/2 bg-[#db2777] text-white py-2 rounded-lg font-medium max-lg:w-full"
          >
            Guardar
          </button>

        </div> */}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}