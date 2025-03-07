import { LabelProfile } from "@shared/profile/LabelProfile";
import { Code, Mail, Pill, User } from "lucide-react";
import { useAuth } from "src/contexts/AuthProvider";

export const InfoProfile = () => {
  const bgEnthusiast: string = "from-[#9333ea] to-[#db2777]";
  const bgArtist: string = "from-blue-600 to-[#48E5C2]";

  const { isArtist, user } = useAuth();

  return (
    <div className="flex flex-row w-5/6 h-120 bg-gray-800 rounded-3xl shadow-lg p-8 gap-4 max-md:flex-col max-md:h-full max-md:gap-6">
      {/* Sección izquierda */}
      <div className="w-1/2 max-md:w-full flex flex-col items-start px-6 max-md:items-start">
        <span
          className={`
            text-3xl max-md:text-2xl font-bold
            bg-gradient-to-tr ${isArtist ? bgArtist : bgEnthusiast}
            bg-clip-text text-transparent
          `}
        >
          Información de Perfil
        </span>
        <p className="text-gray-100 mt-2 text-lg max-md:text-base">
          Esta información la ingresó el usuario cuando registró su perfil.
        </p>
      </div>

      {/* Sección derecha */}
      <div className="w-1/2 max-md:w-full flex flex-col items-start px-6 text-gray-100 gap-2 max-md:items-start">
        <LabelProfile
          className="text-xl max-md:text-base font-medium m-1 break-all"
          nombreL={`${user!.firstName} ${user!.lastName}`}
          icono={Code}
        />
        <LabelProfile
          className="text-xl max-md:text-base font-medium m-1 break-all"
          nombreL={user!.username}
          icono={User}
        />
        <LabelProfile
          className="text-xl max-md:text-base font-medium m-1 break-all"
          nombreL={user!.email}
          icono={Mail}
        />
        {user?.bio && (
          <LabelProfile
            className="text-xl max-md:text-sm font-medium m-1 break-all"
            nombreL={user!.bio}
            icono={Pill}
          />
        )}
      </div>
    </div>
  );
};
