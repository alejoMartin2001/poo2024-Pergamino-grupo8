import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "src/contexts/AuthProvider";
import { useImage } from "src/hooks/useImage";

export const MenuUser = () => {

  const { user, isArtist, logout } = useAuth();
  const [avatar, setAvatar] = useState("");
  const {} = useImage({ setAvatar });
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-screen-xl flex items-center justify-between p-3 mx-auto">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-sm bg-gray-800 rounded-full cursor-pointer"
          >
            <img
              className="w-10 h-10 rounded-full"
              src={!isArtist ? avatar : ""}
              alt="Foto de usuario"
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 z-50 mt-4 w-48 bg-white rounded-lg shadow-md dark:bg-gray-700">
              <span className="block text-sm px-2 py-1 text-gray-900 dark:text-white">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="block text-sm px-2 py-1 text-gray-800 dark:text-white">
                {user?.username}
              </span>

              <ul className="py-1">
              <li>
                  <button
                    onClick={() => navigate("/configUser")}
                    className="w-full text-left block px-2 py-1 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 cursor-pointer"
                  >
                    Configuración
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-2 py-1 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 cursor-pointer">Cerrar sesión</button>
                </li>
              </ul>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

