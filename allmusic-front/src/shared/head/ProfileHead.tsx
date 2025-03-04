
import { LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useImage } from 'src/hooks/useImage';
import { UserResponseDto } from 'src/interfaces/user-interface';

interface Props {
  isArtist: boolean;
  user: UserResponseDto | null;
  logout: () => void;
}

export const ProfileHead = ({ logout, user, isArtist }: Props) => {

  const navigate = useNavigate();
  const { getAvatarEnthusiast } = useImage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 cursor-pointer hover:text-[#db2777] transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={ getAvatarEnthusiast(user!.profilePicture) }
          alt="Perfil"
          className="w-9 h-9 rounded-full object-cover"
        />
        <span className="font-medium hidden md:block">{`${user?.firstName} ${user?.lastName}`}</span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 py-2 bg-gray-800/30 backdrop-blur-md shadow-lg rounded-lg overflow-hidden z-50 border border-gray-700">
          {isArtist && <p>Artista</p>}
          <button className="flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-gray-700/50 transition cursor-pointer">
            <User size={18} />
            Tu Perfil
          </button>
          <button 
            className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-gray-700/50 transition cursor-pointer"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}